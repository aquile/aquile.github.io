<?php

header('Content-type: text/html; charset=utf-8');
include_once '../../core/DBmanager.php';
DBmanager::init();

$startDate = strtotime('2015-06-29');
$lastDate = '2015-11-14';


$roomIDs = array(6, 9);

function insertOrUpdateRoomTime($roomID, $time) {
    $DB_date_format = 'Y-m-d';
    $lessonStartTime = date($DB_date_format . ' 15:00:00', $time);
    $lessonEndTime = date($DB_date_format . ' 21:00:00', $time);

    $qRT = sprintf('INSERT INTO `' . cnf::$db_prefix . 'roomtime`(`room`,`timestart`,`timeend`) VALUES(%d,"%s","%s") ON DUPLICATE KEY UPDATE `id`=LAST_INSERT_ID(`id`)', $roomID, $lessonStartTime, $lessonEndTime);

    mysql_query($qRT) or die(mysql_error() . "\n" . $qRT);

    return mysql_insert_id();
}

function addLesson($roomTimeID) {
    $q = 'INSERT INTO `' . cnf::$db_prefix . 'lessons`(`lesson_type`, `level`, `roomtimeID`,`status`) VALUES(3, 11, ' . $roomTimeID . ', 1)';

    DBmanager::doQuery($q);
}


for ($i = 0;; $i++) {
    $currentDate = strtotime('+' . $i . ' days',  $startDate);
    $weekDay = date('w', $currentDate);
    
    if (date_diff(new DateTime(date('Y-m-d', $currentDate)), new DateTime($lastDate)) -> days == 0 ) {
        break;
    }
    
    if ($weekDay > 0 && $weekDay < 6) {
        
        foreach($roomIDs as $roomID) {
            $roomtimeID = insertOrUpdateRoomTime($roomID, $currentDate);
            
            addLesson($roomtimeID);
        }
    }
}

