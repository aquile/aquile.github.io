<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Schedule
 *
 * @author Мой дом-моя крепость
 */
class Schedule implements iWidget {

    private static $hours = array(9,10,11,12,13,14,15,16,17,18,19,20,21);
    private static $buttonText = array(
        'reg'         => 'Посетить занятие',  
        'unreg'       => 'Отказаться',  
        'wait'        => 'В очередь',
        'unwait'      => 'Снять с очереди',
        'votefornew'  => 'Активировать занятие',
        'unvotefornew'  => 'Отменить активацию',
    );
    private static $registeredDays = array();
    
    // Список уроков по дням на которые зарегистрирован студент
    private static $registrations = array();
    private static $currentSchool = 1;
    public static function render($page_info = null) {
//        self::$currentSchool = is_numeric($_COOKIE['st_current_school']) ? $_COOKIE['st_current_school'] : 1;
        
        if (User::$userInfo['multischool'] == 0) {
            self::$currentSchool = User::$userInfo['school'];
        } else if (is_numeric($_GET['param'])) {
            self::$currentSchool = $_GET['param'];
        } else {
            self::$currentSchool = User::$userInfo['school'];
        }
        
        
        if (!User::$authorized) {
            echo self::getUnauthorizedMessage();
        } else {
            self::initPolls();
            if (User::$blocked) {
                echo self::getUserBlockedMessage();
            } else {
                echo self::getAuthorizedMessage();
                if (User::$notYetAvailable) {
                    echo self::getUserNotYetAvailableMessage();
                } else if (User::$expired) {
                    echo self::getUserExpiredMessage();
                }
            }
            echo self::getCalendar($page_info['level']);
        }
        
        self::echoScripts();
    }
    
    private static function echoScripts () {
        echo "<script type='text/javascript'>var userRegistrations = " . json_encode(self::$registrations) . "</script>";
    } 
    
    private static function getDayCount () {
        if (!User::$authorized) {
            return 5;
        } else {
            if (User::$userInfo['visibleDays']) {
                return User::$userInfo['visibleDays'];
            } else {
                return 5;
            }
        }
    }

    public static function getUnauthorizedMessage() {
        return '<div class="lesson_unauthorized_message">Для записи на урок Вам нужно авторизироваться</div>';
    }

    public static function getUserBlockedMessage() {
        return '<div class="lesson_unauthorized_message">Ваш абонемент был заблокирован до <b>' . User::$userInfo['blockedTill'] . '</b>, в связи с нарушением правил бронирования мест на занятиях</div>';
    }
    public static function getUserExpiredMessage() {
        return '<div class="lesson_unauthorized_message">Cрок действия Вашего абонемента истек <b>' . User::$userInfo['availableTo'] . '</b>!
</div>';
    }
    public static function getUserNotYetAvailableMessage() {
        return '<div class="lesson_unauthorized_message">Вы можете бронировать места начиная с <b>' . User::$userInfo['availableFrom'] . '</b></div>';
    }
    public static function getAuthorizedMessage() {
//        return '';
        return '<div class="lesson_authorized_message">
            <div style="color: #000">
            <div style="padding: 8px;">Перед бронированием места на занятие ознакомтесь с <a style="text-decoration:underline; color: #4fb6d8" href="/rules">ПРАВИЛАМИ РЕГИСТРАЦИИ</a></div>
            </div>
            </div>';
    }

    private static function getLessons($type, $time) {
        $condition = array(
            'level' => array($type, 11)
        );
        if (User::$userInfo['userTypeID'] == 25) { // Только дискусии
            $condition['lesson_type'] = 3;
        }
        $lessons = DBmanager::getLessons($condition, $time, strtotime('+' . self::getDayCount() . ' days', $time), false, self::$currentSchool, User::$userInfo['department']);

        return $lessons;
    }
    
    private static function getUserCount ($roomtimeID) {
    	return count(DBManager::getUserOnRoom($roomtimeID, array(1 ,2, 3)));
    }
    
    private static function getSchoolCombo () {
        $schools = DBmanager::getTable('schools');
        $html = '<div class="schedule_schoolcombo">';
        for ($i = 0, $n = count($schools); $i < $n; $i++) {
            if ($schools[$i]['department'] != User::$userInfo['department'] || User::$userInfo['multischool'] == 0 && $schools[$i]['id'] != User::$userInfo['school']) {
                continue;
            }
            $html .= '<a href="/' . $_GET['page'] . '/' . $_GET['subpage'] . '/'. $schools[$i]['id'] . '" ' . (self::$currentSchool == $schools[$i]['id'] ? 'class="selected"' : '') . '>' . $schools[$i]['name'] . '</a>';
        }
        $html .= '</div>';
        
        return $html;
    }
    
    private static function getRegistrationInfo () {
        $html = '';
        if (User::$userInfo['userTypeID'] == 33) {
            $userLessonLimit = self::getUserLessonLimit();
            $daysAvailable = $userLessonLimit - self::$registeredDays['all'];
            
            if ($daysAvailable < 0) {
                $daysAvailable = 0;
            }
            
            $html = '<div class="st_register_p">Доступно дней для регистрации: <b>' . ($daysAvailable) . '</b></div>';
        } else {
            $daysVisitInCurrentMonth = count(self::$registeredDays[date('Y/m')]);
            $daysAvailable = User::$userInfo['daysPerMonth'] - ($daysVisitInCurrentMonth);

            $html = '<div class="st_register_p">Доступно дней в текущем месяце для регистрации: <b>' . ($daysAvailable) . '</b></div>';
        }
        
        return $html;
    } 
    private static function getUserLessonLimit() {
        $limit = 0;
        $payments = DBmanager::getPayments(array(
            'user' => User::$userInfo['id']
        ));
        
        for ($i = 0, $n = count($payments); $i < $n; $i++) {
            $limit += $payments[$i]['days'];
        }
        
        return $limit;
    }
    
    private static function getCalendar($type) {
        if (date('H') >= 21) {
            $today = strtotime('tomorrow midnight');
        } else {
            $today = strtotime('today midnight');
        }
        $extra = strtotime('00:00 16.09.2013');
        $dayCount = self::getDayCount();
        $userLessons = array();

        if ($today < $extra) {
            $today = $extra;
        }
        
        $lessons = self::getLessons($type, $today);
        if (User::$authorized) {
            $userLessons = DBmanager::getUserLessons(array(
                'user' => User::$userInfo['id']
            ), 'lesson');
            self::createRegisteredDaysMap($userLessons);
        }
        
        $html = self::getSchoolCombo();
                
        $html .= self::getRegistrationInfo();
        
        if (User::$userInfo['department'] == 1) {
            $html .= self::getDiscussionsTable($lessons, $userLessons) . '<div class="header">REGULAR LESSONS</div>';
        }
        
        if (User::$userInfo['department'] != 1 || (User::$userInfo['department'] == 1 && User::$userInfo['userTypeID'] !== 25)) { // not for Discussion accounts
            $html .= '<div class="abs_shadow"><table class="abs schedule">' . self::getCalendarHeader($today);

            $html .= '<tbody>';

            for ($line = 0, $n = count(self::$hours); $line < $n; $line++) {
                $cur_time = strtotime('+' . self::$hours[$line]  . ' hours', $today);
                $next_time = strtotime('+' . (self::$hours[$line] + 1)  . ' hours', $today);

                $html .= '<tr class="' . ($line % 2 ? 'ovv' : '') . ' ' . ($line + 1 == $n ? 'last' : '') . '">';
                for ($column = 0; $column <= $dayCount; $column++) {
                    if ($column == 0) {
                        // Покавываем дату
                        $html .= '<td class="day_time_header"><div class="day_time_header_line">' . self::$hours[$line] . ':00</div><!--<div class="day_time_header_line">' . self::$hours[$line] . ':30</div>!--></td>';
                    } else {
                        // Показываем урок если есть
                        $currentDayLessons = self::findLesson($lessons, $cur_time, $next_time, null, (User::$userInfo['department'] != 1));
                        $html .= '<td class="lesson_container_td">';
                        if (count($currentDayLessons)) {
                            for ($lessI = 0, $lessN = count($currentDayLessons); $lessI < $lessN; $lessI++) {
                                $lesson = $currentDayLessons[$lessI];
                                $html .= self::getLessonCell($lesson, $userLessons[$lesson['id']], $lessI);
                            }
                        } else {
                            $html .= self::getEmptyLessonCell($cur_time, $next_time, $type);
                        }
                        $html .= '</td>';
                        // Переходить к след. дню
                        $cur_time = strtotime('+1 days', $cur_time);
                        $next_time = strtotime('+1 days', $next_time);
                    }
                }
                $html .= '</tr>';
            }
            $html .= '</tbody></table></div>';
        
        }
        
        return $html;
    }
    
    private static function isInDate($lessonTime, $from, $to) {
        return (($lessonTime >= $from) && ($lessonTime < $to));
    }

    private static function getCalendarHeader($today) {
        $html = '<thead><tr><td class="day_header">&nbsp;</td>';
        $currTime = $today;
        for ($i = 0, $n = self::getDayCount(); $i < $n; $i++) {
            $html .= '<td class="day_header">' . rus_date('D d.m', $currTime) . '</td>';
            $currTime = strtotime('+1 day', $currTime);
        }
        
        return $html;
    }

    private static function getLessonCell($lessonInfo, $userLessonInfo, $i, $onlyButton = false) {
        $canReg = User::$authorized && !User::$blocked && !User::$expired
            && strtotime(User::$userInfo['availableFrom']) < strtotime($lessonInfo['time'])
            && (!User::$userInfo['availableTo'] || strtotime(User::$userInfo['availableTo'] . '23:59:59') > strtotime($lessonInfo['time']));
        $cellCls = '';
        $mintime = strtotime('+' . SystemSettings::getByName('minLessonActionHours') . ' hours');
        $userCount = self::getUserCount($lessonInfo['roomtimeID']);
        $freePlaces = $lessonInfo['roomLimit'] - $userCount;
        if ($freePlaces <= 0 && User::$authorized) {
            $freePlaces = 0;
            $cellCls .= 'disabled';
        }
        $button = '';

        if ($canReg) {
            if ($lessonInfo['status'] == 1) {
            // Урок запланирован
                if ($userLessonInfo['status'] == 1) { 
                // Студент уже зарегистрирован на этот урок
                    $day = date('d', strtotime($lessonInfo['time']));
                    if (!isset(self::$registrations[$day])) {
                       self::$registrations[$day] = array(); 
                    }
                    self::$registrations[$day][] = $lessonInfo['lesson_type'];

                    $button = self::getButton('unreg', $lessonInfo);
                    $cellCls .= ' subscribed';
                } else if ($userLessonInfo['status'] == 4) {
                // Студент стоит в очереди на регистрацию
                    if ($freePlaces) {
                    // Если есть доступные места, то предлагаем зарегистрироваться
                        $button = self::getButton('reg', $lessonInfo);
                    } else {
                    // Если нет доступных мест то предлагаем отписаться от уведомлений
                        $button = self::getButton('unwait', $lessonInfo);
                    }
                    $cellCls .= ' wait';
                    $title = 'Вы подписаны на уведомления о доступных местах';
                } else {
                    if ($freePlaces) {
                        $button = self::getButton('reg', $lessonInfo);
                    } else {
                        $button = self::getButton('wait', $lessonInfo);
                    }
                }
            } else if ($lessonInfo['status'] == 2) {
            // Если урок отменен
            	$cellCls .= ' disabled';
            	$button = '<span style="color: #ff0000">Урок отменен</span>';
            } else if ($lessonInfo['status'] == 4) {
            // Если урок "На голосовании"
                if ($userLessonInfo['status'] == 1) {
                // Если юзер уже зарегистрирован на урок
                    $button = self::getButton('unvotefornew', $lessonInfo);
                }
            }
        }
        
        if ($lessonInfo['status'] == 4) {
            $minActivationLimit = cnf::$minActivationLimit - $userCount;
            $infoText = $canReg ? '<div class="activation_text">До активации <br> осталось <b>' . $minActivationLimit . '</b> чел.</div>' : '';
            $cellCls .= ' inactivelesson';
        } else {
            $infoText = ($canReg ? '<div class="lesson_info">Свободно: <b style="color: ' . ($freePlaces == 0 ? '#ff0000' : 'green') . '">' . $freePlaces . '</b></div>' : '');
        }

        if (date('i', strtotime($lessonInfo['time'])) > 0) {
            $halfhour = 'halfhour ';
        } else {
            $halfhour = '';
        }

        if ($onlyButton) {
            return $button . $dp;
        } else {
            return '<div class="lesson_container '. $halfhour . $cellCls . ' ' . ($i > 0 ? 'topborder' : '') . '" ' . ($title ? 'title="' . $title . '"' : '') . '>
                <div class="lesson_name">' . $lessonInfo['name'] . '</div>'.
                (($canReg && $lessonInfo['topicName']) ? '<div class="lesson_topic">' . $lessonInfo['topicName'] . '</div>' : '') .
                (($canReg && $lessonInfo['roomName']) ? '<div class="lesson_info_t">' . $lessonInfo['roomName'] . '</div>' : '') .
                (($canReg && $lessonInfo['teacher']) ? '<div class="lesson_teacher"><a target="_blank" href="/teachers/info/'.$lessonInfo['teacher'].'">' . $lessonInfo['teacherFullName'] . '</a></div>' : '') .
                $infoText . $button . '</div>';
        }
    }

    private static function findLesson($lessons, $cur_time, $next_time, $lessonType = null, $includeAllLevels = false) {
        $result = array();
        for ($i = 0, $n = count($lessons); $i < $n; $i++) {
            if (!$includeAllLevels && $lessons[$i]['level'] == 11) {
                continue;
            }
            if ($lessonType && $lessons[$i]['lesson_type'] != $lessonType) {
                continue;
            }
            if (self::isInDate(strtotime($lessons[$i]['time']), $cur_time, $next_time)) {
                $result[] = $lessons[$i];                
            }
        }
        return $result;
    }

    private static function getButton($type, $lessonInfo) {
        $mintime = strtotime('+' . SystemSettings::getByName('minLessonActionHours') . ' hours');
        $minRegTime = strtotime('+' . SystemSettings::getByName('minLessonRegActionHours') . ' hours');
        $minCreateTime = strtotime('+' . SystemSettings::getByName('minLessonCreationHours') . ' hours');
        $isLessonHourInRange = self::lessonHourInRange($lessonInfo['time'], User::$userInfo['timeFrom'], User::$userInfo['timeTo']);
        $canRegister = self::canRegOnLesson($lessonInfo);
        
        $button = '';
        if (!User::$userInfo['allowRegister'] || !$isLessonHourInRange 
                || (($type == 'votefornew' || $type == 'unvotefornew') 
                    && strtotime($lessonInfo['time']) < $minCreateTime)
                || ($type === 'reg' && !$canRegister)) {
            
            return $button;
        }
       
        if ($lessonInfo['level'] == User::$userInfo['level'] || $lessonInfo['level'] == 11) {
            if ((($type === 'reg' || $type === 'wait') && ($minRegTime < strtotime($lessonInfo['time']))) 
                    || ($type !== 'reg' && $mintime < strtotime($lessonInfo['time']))
                    ) {
                $button = '<div class="lesson_button ' . ($type == 'votefornew' || $type == 'unvotefornew' ? 'new_lesson' : '') . '" lessonact="' . $type . '" lessonid="' . $lessonInfo['id'] . '" lessontype="' . $lessonInfo['lesson_type'] . '" lessonday="' . date('d', strtotime($lessonInfo['time'])) . '">' . self::$buttonText[$type] . '</div>';
            } else {
                $button = '<div class="lesson_closed">Регистрация закрыта</div>';
            }
        }
        
        return $button;
    }
    
    private static function getEmptyLessonCell($curr_time, $next_time, $level) {
        // Show empty cell in case when user can't register on this day
        return '&nbsp;';
    }
    
    private static function lessonHourInRange($baseTime, $rangeHourFrom, $rangeHourTo) {
        $lessonHour = (Int) date('H', strtotime($baseTime));
        return ($rangeHourFrom <= $lessonHour && $lessonHour < $rangeHourTo);
    }
    
    public static function canRegOnLesson($lessonInfo) {
        $stmp = strtotime($lessonInfo['time']);
        $year = date('Y', $stmp);
        $month = date('m', $stmp);
        $day = date('d', $stmp);
        $key = $year . '/' . $month;
        
        if (User::$userInfo['userTypeID'] == 33) {
            $userLessonLimit = self::getUserLessonLimit();
            $daysAvailable = $userLessonLimit - self::$registeredDays['all'];
            
            if ($daysAvailable < 0) {
                $daysAvailable = 0;
            }
            
            if (is_array(self::$registeredDays[$key])) {
                if (!in_array($day, self::$registeredDays[$key]) && !$daysAvailable) {
                    return false;
                }
            }
        } else {
            if (User::$userInfo['daysPerMonth'] > 0 && is_array(self::$registeredDays[$key])) {
                if (!in_array($day, self::$registeredDays[$key]) && count(self::$registeredDays[$key]) >= User::$userInfo['daysPerMonth']) {
                    return false;
                }
            }
        }
        return true;
    }

    public static function createRegisteredDaysMap($userLessons) {
        self::$registeredDays['all'] = 0;
        
        foreach ($userLessons as $usID => $usData) {
            $stmp = strtotime($usData['timestart']);
            $year = date('Y', $stmp);
            $month = date('m', $stmp);
            $day = date('d', $stmp);
            $key = $year . '/' . $month;
            
            // Skip Disscursion and all statuses except of visited and registered
            if ($usData['status'] != 1 && $usData['status'] != 2) {
                continue;
            }
            
            if (!self::$registeredDays[$key]) {
                self::$registeredDays[$key] = array();
            }

            if (!in_array($day, self::$registeredDays[$key])) {
                self::$registeredDays[$key][] = $day;
                self::$registeredDays['all'] ++;
            }
            
        }
    }

    public static function initPolls() {
        $polls = DBmanager::getPulls(array('active' => 1, 'department' => User::$userInfo['department']));
        if (count($polls)) {
            for ($i = 0, $n = count($polls); $i < $n; $i++) {
                $showPoll = count(DBmanager::getPollResults(array('user' => User::$userInfo['id'], 'question' => $polls[$i]['id']))) == 0;
                if ($showPoll) {
                    echo '<script> var pollToShow = ' . json_encode($polls[$i]) . '</script>';
                    break;
                }
            }
        }
    }

    public static function getDiscussionsTable($lessons, $userLessons) {
        $dayCount = self::getDayCount();
        if (date('H') >= 21) {
            $today = strtotime('tomorrow midnight');
        } else {
            $today = strtotime('today midnight');
        }
        $currentTime = $today;
        
        $html = '<div class="header">DISCUSSIONS</div><div class="abs_shadow"><table class="abs schedule">'
                . '<thead><tr><td class="day_header" style="width: 15%">Дата</td>'
                . '<td class="day_header" style="width: 10%">Время</td>'
                . '<td class="day_header">Тема</td>'
                . '<td class="day_header" style="width: 10%">Преподаватель</td>'
                . '<td class="day_header" style="width: 10%">&nbsp;</td></tr></thead>';
        
        for ($row = 0; $row <= $dayCount; $row++) {
            
            
            $currentTime = strtotime('+'. $row . ' days', $today);
            $currentTimeNext = strtotime('+'. ($row+1) . ' days', $today);
            
            $currentDayLessons = self::findLesson($lessons, $currentTime, $currentTimeNext, 3, true);
            
            if (count($currentDayLessons)) {
                $cdL = $currentDayLessons[0];
                $date = rus_date('l<\b\r/>d F Y', strtotime($cdL['time']));
                $time = date('H:i', strtotime($cdL['time'])) . '-' . date('H:i', strtotime($cdL['timeend']));
                $ulInfo = $userLessons[$cdL['id']];
                $button = self::getLessonCell($cdL, $ulInfo, 0, true);
                $html .= '<tr class="' . ($ulInfo['status'] == 1 ? 'subscribed' : '') . '"><td>' . $date . '</td><td>' . $time . '</td><td>' . $cdL['topicName'] . '</td><td>' . $cdL['teacherFullName'] . '</td><td>' . $button . '</td></tr>';
            }
        }
        
        $html .= '</table></div>';
        
        return $html;
    }

}