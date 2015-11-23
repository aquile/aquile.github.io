<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Authorization logic
 *
 */
class User {
    public static $authorized = false;
    public static $blocked = false;
    public static $expired = false;
    public static $notYetAvailable = false;
    
    public static $userInfo = array();
    private static $sol = 'gLUey*oVa@pixIE87PAW';
    private static $passwordInMD5 = false;

    public static function init() {
        self::$userInfo['id'] = $_SESSION['userid'];

        if (self::$userInfo['id']) {
            // Already authorized
            if (self::checkUser()) {
                self::$authorized = true;
            } else {
                unset($_SESSION['userid']);
            }
        }
    }
    
    public static function processLogin ($login, $password) {
        $users = DBmanager::getUser(array(
            'login' => $login
        ), 0, 1);
        
        if (count($users) > 0) {
            $user = $users[0];
            // Check password
            if (User::$passwordInMD5) {
                if (md5(md5($password) . User::$sol) === $user['pass']) {
                    // Password correct - save user ID into session
                    $_SESSION['userid'] = $user['id'];
                    return $users;
                } else {
                    // Incorrect password
                    return false;
                }
            } else {
                if ($password === $user['pass']) {
                    // Password correct - save user ID into session
                    $_SESSION['userid'] = $user['id'];
                    return $users;
                } else {
                    // Incorrect password
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    
    public static function processLogout () {
        unset($_SESSION['userid']);
        return true;
    }

    private static function checkUser () {
        $users = DBmanager::getUser(array('id' => self::$userInfo['id']));

        if (count($users) > 0) {
            foreach ($users[0] as $key => $value) {
                self::$userInfo[$key] = $value;
            }
            if (self::$userInfo['blockedTill'] && strtotime(self::$userInfo['blockedTill'] . '23:59:59') > time()) {
                self::$blocked = true;
            }
            if (self::$userInfo['availableFrom'] && strtotime(self::$userInfo['availableFrom']) > time()) {
                self::$notYetAvailable = true;
            } else if (self::$userInfo['availableTo'] && strtotime(self::$userInfo['availableTo'] . ' 23:59:59') < time()) {
                self::$expired = true;
            }
            return true;
        } else {
            return false;
        }
    }

    public static function  processLessonReg ($lessonID) {
        $result = array('info' => '', 'success' => false);
        
        // Стартуем транзакцию
        DBmanager::startTransaction();
        $lessons = DBmanager::getLessons(array(
            'id' => $lessonID
        ));
        
        if (count($lessons)) {
            $lesson = $lessons[0];
            $users = DBManager::getUserOnRoom($lesson['roomtimeID'], 1);
            $userCount = count($users);

            // Если временный рамки не позволяют зарегистрироваться
            if (strtotime('+' . SystemSettings::getByName('minLessonRegActionHours') . ' hours') > strtotime($lesson['time'])) {
                $result['success'] = false;
                $result['errorno'] = 201;
                $result['info'] = 'Вы не можете зарегистрироваться от урок, так как до него осталось меньше ' . SystemSettings::getByName('minLessonRegActionHours') . ' часов';
                
            // Если свободных мест хватает нет
            } else if ($userCount >= $lesson['roomLimit']) {
                $result['success'] = false;
                $result['errorno'] = 202;
                $result['info'] = 'Вы не можете зарегистрироваться на урок, так как максимальное количество учеников(' . $lesson['roomLimit'] . ') уже зарегистрировано';
            // Регистрируем если все проверки пройдены
            } else {
                $userlessons = DBmanager::getUserLessons(array(
                    'user' => User::$userInfo['id'],
                    'lesson' => $lesson['id']
                ));
                // Если пользователь уже зарегистрирован на урок
                if (count($userlessons) && $userlessons[0]['status'] == 1) {
                    $result['success'] = false;
                    $result['info'] = 'Вы уже зарегистрированы на этот урок';

                // Если пользователь не зарегистрирован
                } else {
                    $userlessonID = DBManager::userLessonInsertOrUpdate(User::$userInfo['id'], $lesson['id'], 1);
                
                    // Если произошла ошибка при обновлении записи в БД
                    if ($userlessonID === false) {
                        $result['info'] = 'Ошибка при обновлении записей в базе данных';
                        $result['success'] = false;

                    } else {
                        // Увеличиваем информацию о количестве мест в комнате на данное время
                        /*if (DBmanager::updateUserCountInRoom(1, $lesson['roomtimeID']) === false) {
                            $result['success'] = false;
                            $result['info'] = 'Ошибка при обновлении количества мест в базе данных';
                        } else {*/
                            $result['success'] = true;
                       /* }*/
                    }
                }
            }
        } else {
            $result['info'] = 'Урок не найден в базе данных';
            $result['success'] = false;
        }

        if ($result['success']) {
            // Коммитим транзакцию
            DBmanager::commitTransaction();
            Mailer::sendEmail(Mailer::$LESSON_REG, array(
                'lesson_name'   => $lesson['name'],
                'topic' => $lesson['topicName'],
                'lesson_time'   => rus_date('H:i l, d F Y', strtotime($lesson['time'])),
                'level'         => $lesson['levelName']
            ), User::$userInfo['email']);
        } else {
            // Отменяем транзакцию
            DBmanager::rollbackTransaction();
        }

        return $result;
    }

    public static function processLessonUnreg ($lessonID) {
        $result = array('info' => '', 'success' => false);
        
        // Стартуем транзакцию
        DBmanager::startTransaction();
        $lessons = DBmanager::getLessons(array(
            'id' => $lessonID
        ));
        
        if (count($lessons)) {
            $lesson = $lessons[0];
            
            // Если временные рамки не позволяют сняться с регистрации
            if (strtotime('+' . SystemSettings::getByName('minLessonActionHours') . ' hours') > strtotime($lesson['time'])) {
                $result['success'] = false;
                $result['info'] = 'Вы не можете отписаться от урока, так как до него осталось меньше ' . SystemSettings::getByName('minLessonActionHours') . ' часов';
                
            // Регистрируем если все проверки пройдены
            } else {
                $userlessons = DBmanager::getUserLessons(array(
                    'user' => User::$userInfo['id'],
                    'lesson' => $lesson['id']
                ));
                // Если пользователь уже зарегистрирован на урок
                if (count($userlessons) && $userlessons[0]['status'] == 1) {
                    $userlessonID = DBManager::userLessonInsertOrUpdate(User::$userInfo['id'], $lesson['id'], 5);
                
                    // Если произошла ошибка при обновлении записи в БД
                    if ($userlessonID === false) {
                        $result['info'] = 'Ошибка при обновлении записей в базе данных';
                        $result['success'] = false;

                    } else {
                        // Изменяем информацию о количестве мест в комнате на данное время
                        /*if (DBmanager::updateUserCountInRoom(-1, $lesson['roomtimeID']) === false) {
                            $result['success'] = false;
                            $result['info'] = 'Ошибка при обновлении количества мест в базе данных';
                        } else {*/
                            $result['success'] = true;
                            
                            // Уведомляем пользователей о освободившемся месте
                             $waitingUsers = DBmanager::getUsersOnLesson($lesson['id'], 4);
                             if ($waitingUsers && count($waitingUsers)) {
                                 Mailer::sendEmail(Mailer::$FREE_PLACE, array(
                                    'lesson_time' => rus_date('H:i l, d F Y', strtotime($lesson['time'])),
                                    'lesson_name' => $lesson['name'],
                                    'topic' => $lesson['topicName'],
                                    'level' => $lesson['levelName']
                                ), array_pluck($waitingUsers, 'email'));
                             }
                       /* }*/
                    }
                // Если пользователь не зарегистрирован
                } else {
                    $result['success'] = false;
                    $result['info'] = 'Вы не зарегистрированы на этот урок';
                }
            }
        } else {
            $result['info'] = 'Урок не найден в базе данных';
            $result['success'] = false;
        }

        if ($result['success']) {
            // Коммитим транзакцию
            DBmanager::commitTransaction();
        } else {
            // Отменяем транзакцию
            DBmanager::rollbackTransaction();
        }

        return $result;
    }

    public static function processLessonWait ($lessonID) {
        $result = array('info' => '', 'success' => false);

        $lessons = DBmanager::getLessons(array(
            'id' => $lessonID
        ));
        
        if (count($lessons)) {
            $lesson = $lessons[0];
            if (strtotime('+' . SystemSettings::getByName('minLessonRegActionHours') . ' hours') > strtotime($lesson['time'])) {
                $result['success'] = false;
                $result['info'] = 'Вы не можете подписаться на обновления этого урока так как регистрация на него уже завершена';
            } else {
                if (DBmanager::userLessonInsertOrUpdate(User::$userInfo['id'], $lesson['id'], 4) === false) {
                    $result['success'] = false;
                    $result['info'] = 'Ошибка при обновлении записей в базе данных';
                } else {
                    $result['success'] = true;
                }
            }
        } else {
            $result['info'] = 'Урок не найден в базе данных';
        }
        
        return $result;
    }

    public static function processLessonUnwait ($lessonID) {
        $result = array('info' => '', 'success' => false);

        $lessons = DBmanager::getLessons(array(
            'id' => $lessonID
        ));
        
        if (count($lessons)) {
            $lesson = $lessons[0];
            if (strtotime('+' . SystemSettings::getByName('minLessonActionHours') . ' hours') > strtotime($lesson['time'])) {
                $result['success'] = false;
                $result['info'] = 'Вы не можете отписаться об обновления этого урока так как регистрация на него уже завершена';
            } else {
                if (DBmanager::userLessonInsertOrUpdate(User::$userInfo['id'], $lesson['id'], 6) === false) {
                    $result['success'] = false;
                    $result['info'] = 'Ошибка при обновлении записей в базе данных';
                } else {
                    $result['success'] = true;
                }
            }
        } else {
            $result['info'] = 'Урок не найден в базе данных';
        }
        
        return $result;
    }
    public static function  processLessonCreate ($lessonID) {
        $result = array(
            'success' => true
        );
        $levelRoomMap = array(
            1 => 1,    // Elementary
            2 => 2,      // Pre-intermediate
            3 => 3,      // Intermediate
            4 => 4,      // Upper
            6 => 1       // Beginner
        );
        $roomID = $levelRoomMap[User::$userInfo['level']];
        
        DBmanager::startTransaction();
        
        //$roomTimeID = DBmanager::createRoomTime($timeStart, $roomID);
        
        $lessons = DBmanager::getLessons(array('id' => $lessonID));
        
        if (count($lessons)) {
            $lesson = $lessons[0];
            
            $userlessons = DBmanager::getUserLessons(array(
                'user' => User::$userInfo['id'],
                'lesson' => $lesson['id']
            ));
//            if (!count($userlessons)) {
            DBmanager::userLessonInsertOrUpdate(User::$userInfo['id'], $lesson['id'], 1);

            $userInRoom = DBManager::getUserOnRoom($lesson['roomtimeID'], 1);

            if (count($userInRoom) > 1) {
                if ($lesson['status'] == 4) {
                    DBmanager::updateLesson($lesson['id'], array('status' => 1));

                    // Отсылаем уведомление пользователям и администрации о том что новый урок добавлен
                    $emails = array_merge(array_pluck($userInRoom, 'email'), Mailer::$emails['schedule']);
                    Mailer::sendEmail(Mailer::$LESSONCREATED, array(
                        'lesson_name' => $lesson['name'],
                        'level' => $lesson['levelName'],
                        'lesson_time' => rus_date('H:i l, d F Y', strtotime($lesson['time'])),
                        'teacher' => $lesson['teacherFullName'],
                        'topic' => $lesson['topic']
                    ), $emails);
                } else if ($lesson['status'] == 1) {
                    Mailer::sendEmail(Mailer::$LESSON_REG, array(
                        'lesson_name' => $lesson['name'],
                        'topic' => $lesson['topicName'],
                        'lesson_time' => rus_date('H:i l, d F Y', strtotime($lesson['time'])),
                        'level' => $lesson['levelName']
                    ), User::$userInfo['email']);
                }
            }
//            } else {
//                if ($userlessons[0]['status'] != 1) {
//                    DBmanager::userLessonInsertOrUpdate(User::$userInfo['id'], $lesson['id'], 1);
//                }
//            }
        } else {
            if ($timeStart > strtotime('+'. cnf::$minLessonCreateHours . ' hours')) {
                // Insert new lesson
                $lessonID = DBmanager::insertNewLesson($roomTimeID, User::$userInfo['level'], 4);

                // Insert new userlesson
                DBmanager::userLessonInsertOrUpdate(User::$userInfo['id'], $lessonID, 1);
            } else {
                $result['success'] = false;
                $result['info'] = 'Вы не можете активировать урок на это время, так как до него осталось меньше ' . cnf::$minLessonCreateHours . ' часов';
            }
        }

        DBmanager::commitTransaction();
        
        return $result;
    }
}

?>