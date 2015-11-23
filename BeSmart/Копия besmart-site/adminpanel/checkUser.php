<?php

include_once '../core/preinit.php';
include_once '../core/constants.php';
include_once '../core/Mailer.php';
include_once '../core/DBmanager.php';

DBmanager::init();

function canRegister ($info) {
    $result     = array('success' => true, 'msg' => '');
    $userID     = $info['user'];
    $lessonID   = $info['lesson'];
    
    DBmanager::startTransaction();

    $res = DBmanager::doQuery('SELECT ut.daysPerMonth, ut.timeTo, ut.timeFrom, rt.timestart FROM `' . cnf::$db_prefix . 'lessons` l'
            . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'roomtime` rt ON rt.id = l.roomtimeID'
            . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'users` u ON u.id = ' . $userID
            . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'usertypes` ut ON ut.id = u.userTypeID'
            . ' WHERE l.id = ' . $lessonID);
    
   
    $row = mysql_fetch_assoc($res);
    // Проверяем наличие урока
    if (!$row) {
        $result['success'] = false;
        $result['msg'] = 'Урок не найден в базе данных. Возможно, была допущена логическая ошибка в коде. Свяжитесь с разработчиком сайта';
        return $result;
    }
    
    $lessonStmp = strtotime($row['timestart']);
    $lessonMonth = date('m', $lessonStmp);
    $lessonDay = date('d', $lessonStmp);
    $lessonHour = date('H', $lessonStmp);
    
    // Проверяем время регистрации
    if ($row['timeTo'] < $lessonHour || $row['timeFrom'] > $lessonHour) {
        $result['success'] = false;
        $result['msg'] = 'Ограничение абонемента не позволяеют зарегистрироваться на данное время. Доступна регистрация только на уроки с ' . $row['timeFrom'] . ':00 до ' . $row['timeTo'] . ':00';
        return $result;
    }
    
    // Проверяем колчество регистраций
    $allowedDaysPerMonth = $row['daysPerMonth'];
    if ($allowedDaysPerMonth == 0) {
        // В случае безлимита
        return $result;
    }
    
    $uls = DBmanager::getUserLessons(array(
        'user'      => $userID,
        'status'    => array(1, 2)
    ), 'timestart');
    
    // Create hashmap of registered lessons
    $HM = array();
    foreach ($uls as $time => $data) {
        $stmp = strtotime($time);
        $month = date('m', $stmp);
        $day = date('d', $stmp);
        if (!$HM[$month]) {
            $HM[$month] = array();
        }
        
        if (!in_array($day, $HM[$month])) {
            $HM[$month][] = $day;
        }
    }
    
    if (is_array($HM[$lessonMonth]) && count($HM[$lessonMonth]) >= $allowedDaysPerMonth && !in_array($lessonDay, $HM[$lessonMonth])) {
        $result['success'] = false;
        $result['msg'] = 'Ограничения абонемента не позволяют зарегистрироваться на данный урок. Исчерпано максимальное количество дней (' . $allowedDaysPerMonth . ') в этом месяце';
        return $result;
    }

    return  $result;
}

$output = array();
if (!is_numeric($_POST['lesson']) && is_numeric($_POST['user'])) {
    $output['success'] = false;
    $output['msg'] = 'Не указаны все обязательные параметры';
} else {
    $output = canRegister(array(
        'lesson' => $_POST['lesson'],
        'user'  => $_POST['user']
    ));
}

//start output
if ($callback) {
    header('Content-Type: text/javascript');
    echo $callback . '(' . json_encode($output) . ');';
} else {
    header('Content-Type: application/x-json');
    echo json_encode($output);
}
