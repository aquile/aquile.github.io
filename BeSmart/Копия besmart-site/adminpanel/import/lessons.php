<?php

set_time_limit(120);
include './db.php';

$res = mysql_query('SELECT * FROM `' . $db_old . '`.`nv_lessons`') or die(mysql_error());

$users = getUsers();

while($lesson = mysql_fetch_assoc($res)) {
    
    echo '--------<br>Lesson: '. $lesson['id'] . '<br/>';
    $lessonStart = date('Y-m-d H:i:s', $lesson['time']);
    $lessonEnd = date('Y-m-d H:i:s', $lesson['end_time']);
    $room = $lesson['room'];
    $level = $lesson['level'];
    $lesson_type = $lesson['lesson_type'];
    $registered = json_decode($lesson['users']);
    $waiting = json_decode($lesson['waiting']);
    

//    echo $lessonStart . ' ; ' . $lessonEnd. ' ; ' .count($registered) . " ; $room ; $level ; $lesson_type; " . count($waiting) . "<br>";
    // Создаем datetime
    $roomtimeID = createDateTime($lessonStart, $lessonEnd, $room, count($registered));
    
    $lessonID = createLesson($lesson_type, $level, $roomtimeID);
    
    createUsers($registered, $waiting, $lessonID);
}


function createDateTime($start, $end, $room, $count) {
    global $db_new;
    $q = sprintf('INSERT INTO `'. $db_new .'`.`roomtime` (`room`,`timestart`,`timeend`,`count`) VALUES(%d,"%s","%s",%d) ON DUPLICATE KEY UPDATE `id`=LAST_INSERT_ID(`id`)',
            $room,
            $start,
            $end,
            $count
        );
    
    mysql_query($q) or die(mysql_error());
    
    return mysql_insert_id();
}

function createLesson($lesson_type, $level, $roomtimeID) {
    global $db_new;
    $q = sprintf('INSERT INTO `'. $db_new .'`.`lessons` (`lesson_type`,`level`,`roomtimeID`) VALUES(%d,%d,%d)',
            $lesson_type,
            $level,
            $roomtimeID
        );
    
    mysql_query($q) or die(mysql_error());
    
    return mysql_insert_id();
}

function createUsers($registered, $waiting, $lessonID) {
    global $db_new;
    global $users;

    $q = 'INSERT INTO `'. $db_new .'`.`userlesson` (`user`,`lesson`,`status`) VALUES ';
    
    $glI = false;
    for ($i = 0, $n = count($registered); $i < $n; $i++) {
        $userID = $registered[$i];

        if (!in_array($userID, $users)) {
            continue;
        }

        if ($glI) $q .= ',';
        $q .= '(' . $userID . ', ' . $lessonID . ', 1)';
        
        $glI = true;
    }

    for ($i = 0, $n = count($waiting); $i < $n; $i++) {
        $userID = $waiting[$i];

        if (!in_array($userID, $users)) {
            continue;
        }

        if ($glI) $q .= ',';
        $q .= '(' . $userID . ', ' . $lessonID . ', 4)';
        
        $glI = true;
    }

    if ($glI) {
        mysql_query($q) or die(mysql_error() . '<br>'. $q);
    }

}

function getUsers () {
    global $db_new;
    $result = array();
    $res = mysql_query('SELECT * FROM `' . $db_new . '`.`users`') or die(mysql_error());
    
    while($row = mysql_fetch_assoc($res)) {
        $result[] = $row['id'];
    }
    
    return $result;
}
//////////////////////////////////////////////////////////////////////







?>
