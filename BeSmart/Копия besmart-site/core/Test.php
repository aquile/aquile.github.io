<?php

/**
 * Description of Test
 *
 */
class Test {
    //put your code here
    public static function start($testType, $testID) {
        $info = '';
        $testInfo = array();
        
        // Пытаемся найти активный тест этого пользователя
        $test = self::getActiveUserTest($testType, $testID);
        if ($test) {
            $testInfo = self::generateResponse($test);
        } else {
            if (is_numeric($testID)) {
                $testInfo = self::generateResponse(self::startTrainingTest($testID));
            } else {
                $testInfo = self::generateResponse(self::startNextLevelTest());
            }
        }
        if ($testInfo) {
            return array(
                'success' => true,
                'info' => $info,
                'data' => $testInfo
            );
        } else {
            return array(
                'success' => false,
                'info' => 'Тест не найден'
            );
        }
        
    }
    
    private static function generateResponse($testTransaction) {
        if (!$testTransaction) {
            return array(
                'action' => 'display_message',
                'msg' => 'Вы не можете пройти этот тест, так как исчерпали все попытки'
            );
        }
        $history = $testTransaction['history'];
        
        $lastQuestion = self::findLastQuestionInHistory($history);
        
        if (!$lastQuestion || is_array($lastQuestion['answer'])) {
//            echo "\nLast question not found or found answered question: ";
//            print_r($lastQuestion);
            // Get new question
            $qnumber = $lastQuestion ? $lastQuestion['qnumber'] + 1 : 1;
            
            $lastQuestion = self::getQuestion(array(
                'tq.qnumber' => $qnumber,
                'tq.test' => $testTransaction['test']
            ));
            
            if ($lastQuestion) {
//                echo "\nFound next question: ";
//                print_r($lastQuestion);
                $history[] = array(
                    'qnumber' => $lastQuestion['qnumber'],
                    'id' => $lastQuestion['id'],
                    'answer' => ''
                );
                self::updateTestTransaction($testTransaction['id'], array(
                    'history' => $history
                ));
            } else {
//                echo "\nTest has no more questions ";
                // Случай когда нет следующих вопросов
                return self::finishTest($testTransaction);
            }
        } else {
//            echo "\nНашли вопрос, на который юзер еще не ответил";
            
            $lastQuestion = self::getQuestion(array(
                'tq.id' => $lastQuestion['id']
            ));
            
//            print_r($lastQuestion);
//            print_r($testTransaction);
        }
        
        return array(
            'action'        => 'next_question',
            'transactionId' => $testTransaction['id'],
            'testName'      => $testTransaction['testName'],
            'successRate'   => $testTransaction['successRate'],
            'points'        => $testTransaction['points'],
            'timeLeft'      => strtotime($testTransaction['starttime']) + ($testTransaction['timeLimit'] * 60) - time(),
            'questionInfo'  => $lastQuestion
        );
    }
    
    private static function updateTestTransaction($id, $info) {
        DBmanager::updateUserTestsTransaction($id, $info);
    }
    
    private static function findLastQuestionInHistory ($history) {
        $lastQuestion = null;
        if ($history) {
            foreach ($history as $value) {
                if (!$lastQuestion || $lastQuestion['qnumber'] < $value['qnumber']) {
                    $lastQuestion = $value;
                }
            }
        }
        return $lastQuestion;
    }
    
    private static function startNextLevelTest() {
        $tests = DBmanager::getTest(array(
            'level' => User::$userInfo['level'],
            'type' => 1
        ));
        $testsTransactions = DBmanager::getUserTestsTransactions(array(
            'tt.user' => User::$userInfo['id'],
            't.type' => 1,
            't.level' => User::$userInfo['level']
        ), 'tt.id DESC');

        $lessons = DBmanager::getLessonsForUser(User::$userInfo['id'], array(2), array(
            'l.lesson_type' => 1,
            'l.level' => User::$userInfo['level']
        ));
        
        $testsAllowed = floor(count($lessons) / SystemSettings::getByName('nextLevelTestInterval')) - count($testsTransactions);
        if ($testsAllowed < 0) {
            $testsAllowed = 0;
        }
        
        if ($testsAllowed && count($tests)) {
            return DBmanager::insertNewTestTransaction(array(
                'user' => User::$userInfo['id'],
                'test' => $tests[0]['id']
            ));
        } else {
            return false;
        }
    }
    
    private static function startTrainingTest($testId) {
        $tests = DBmanager::getTest(array(
            'id' => $testId
        ));
        if (count($tests)) {
            return DBmanager::insertNewTestTransaction(array(
                'user' => User::$userInfo['id'],
                'test' => $testId
            ));
        } else {
            return false;
        }
    }
    private static function getActiveUserTest($testType, $testId) {
        $result = null;
        $params = array(
            '`tt`.`user`' => User::$userInfo['id'],
            '`tt`.`status`' => 3,
//            'tests.level' => User::$userInfo['level'],
            '`t`.`type`' => $testType
        );
        if (is_numeric($testId)) {
            $params['`t`.`id`'] = $testId;
        }
        $tests = DBmanager::getUserTestsTransactions($params);
        for ($i = 0, $n = count($tests); $i < $n; $i++) {
            $test = $tests[$i];
            if ((strtotime($test['starttime']) + $test['timeLimit'] * 60) > time()) {
                $result = $test;
                break;
            } else {
//                echo "GET ACTIVE TEST";
//                print_r($test);
                self::finishTest($test);
            }
        }
        return $result;
    }
    
    public static function finishTest ($testTransaction) {
        $timeSpent = time() - strtotime($testTransaction['starttime']);
        if ($timeSpent > $testTransaction['timeLimit'] * 60) {
            $timeSpent = $testTransaction['timeLimit'] * 60;
        }
        
        $points = $testTransaction['points'];
        $successRate = $testTransaction['successRate'];
        $testTotalPoints = self::getTestTotalPoints($testTransaction['test']);
        
        if ($points >= $testTotalPoints * ($successRate / 100)) {
            $status = 2;
        } else {
            $status = 1;
        }
//        print_r($testTransaction);
//        echo "\n $points";
//        echo "\n $successRate";
//        echo "\n $testTotalPoints";
        DBmanager::updateUserTestsTransaction($testTransaction['id'], array(
            'status' => $status,
            'timespent' => $timeSpent
        ));
        $testTransaction['status'] = $status;
        $testTransaction['timespent'] = $timeSpent;

        return array(
            'action'    => 'finish',
            'testInfo'  => $testTransaction
        );
    }
    
    private static function getQuestion($info, $removeAnswer = true) {
        $questions = DBmanager::getTestQuestions($info);
        
        if (count($questions)) {
            $ques = $questions[mt_rand(0, count($questions) - 1)];
            if ($removeAnswer) {
                $ques['body'] = preg_replace('/\\{[^}]*\\}/i', '{}', $ques['body']);
            }

            return $ques;
        } else {
            return false;
        }
    }

    public static function submitQuestion ($transactionId, $questionId, $answer) {
        if (!$answer) {
            $answer = array();
        }
        $output = array (
            'success' => false
        );
        $testTransactions = DBmanager::getUserTestsTransactions(array(
            '`tt`.`id`' => $transactionId
        ));
        
        if (count($testTransactions)) {
            $testTransaction = $testTransactions[0];
            if ($testTransaction['status'] == 3) {
                if ((strtotime($testTransaction['starttime']) + $testTransaction['timeLimit'] * 60) > time()) {
                    $lastQuestion = self::findLastQuestionInHistory($testTransaction['history']);
                    if ($lastQuestion && $lastQuestion['id'] == $questionId) {
                        if (!is_array($lastQuestion['answer'])) {
                            $questionInfo = self::getQuestion(array(
                                'tq.id' => $questionId 
                            ), false);
                            
                            $history = self::updateQuestionInHistory($lastQuestion['id'], $answer, $testTransaction['history']);

                            $points = $testTransaction['points'];
                            if (self::checkAnswer($answer, $questionInfo['body'])) {
                                // Если ответил привильно
                                $points += $questionInfo['points'];
                            }

                            self::updateTestTransaction($testTransaction['id'], array(
                                'history' => $history,
                                'points' => $points
                            ));
                            
                            $testTransaction['history'] = $history;
                            $testTransaction['points'] = $points;
                            
                            // get next question
                            $testInfo = self::generateResponse($testTransaction);
                        } else {
                            $output['info'] = 'Вы уже отвечали на этой вопрос в текущем тесте';
                        }
                    } else {
                        $output['info'] = 'Вопрос не найден';
                        $testInfo = self::generateResponse($testTransaction);
                    }
                } else {
//                    echo "\nSUBMIT QUESTION ";
//                    print_r($testTransaction);
                    $testInfo = self::finishTest($testTransaction);
                }
            } else {
                $output['info'] = 'Тест уже завершен';
            }
        } else {
            $output['info'] = 'Тест не найден';
        }
        
        if ($testInfo) {
            $output['success'] = true;
            $output['data'] = $testInfo;
        }
        
        return $output;
    }
    
    private static function checkAnswer ($answer, $questionBody) {
        $trueAnswers = array();
        preg_match_all('/\\{([^}]*)\\}/i', $questionBody, $trueAnswers, PREG_SET_ORDER);
        
//        echo "\nПроверка ответа: $questionBody";
//        print_r($answer);
//        print_r($trueAnswers);
//        if (!is_array($answer) && count($trueAnswers) > 0) {
//            return false;
//        }

        for ($i = 0, $n = count($trueAnswers); $i < $n; $i++) {
            $possibleAnswers = explode('|', $trueAnswers[$i][1]);
            $hasCorrectAnswer = false;
            foreach($possibleAnswers as $value) {
                if (strcasecmp(trim($answer[$i]), trim($value)) == 0) {
                    $hasCorrectAnswer = true;
                }
            }
            if (!$hasCorrectAnswer) {
                return false;
            }
        }
        return true;
    }
    
    private static function updateQuestionInHistory ($questionId, $answer, $history) {
        for ($i = 0, $n = count($history); $i < $n; $i++) {
            if ($history[$i]['id'] == $questionId) {
                $history[$i]['answer'] = $answer;
                return $history;
            }
        }
        return $history;
    }
    
    public static function getTestTotalPoints ($testId) {
        return DBmanager::getTestTotalPoints($testId);
    }
}
