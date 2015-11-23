<?php
include_once '../core/functions.php';
include_once '../core/DBmanager.php';
include_once '../core/Mailer.php';

DBmanager::init();

DBmanager::startTransaction();

$q = 'SELECT l.id, l.roomtimeID, lv.name as level, rt.timestart as lesson_time, r.name as room, t.firstname, t.lastname, t.email as teacher_email
    FROM `lessons` l 
    LEFT OUTER JOIN `roomtime` rt ON `rt`.`id` = `l`.`roomtimeID`
    LEFT OUTER JOIN `rooms` r ON `r`.`id` = `rt`.`room`
    LEFT OUTER JOIN `levels` lv ON `lv`.`id` = `l`.`level`
    LEFT OUTER JOIN `teachers` t ON `t`.`id` = `l`.`teacher`
    WHERE `rt`.`timestart` <= NOW() + INTERVAL 1 DAY
    AND `rt`.`timestart` > NOW()
    AND `l`.`status` = 1';

$res = mysql_query($q) or die(mysql_error());

$lessonToUpdate = array();

while($row = mysql_fetch_assoc($res)) {
    $users = DBmanager::getUserOnRoom($row['roomtimeID'], array(1, 2));
    if (!count($users)) {
        $row['teacher'] = $row['lastname'] . ' ' . $row['firstname'];
        $lessonToUpdate[] = $row;
    } else {
        
    }
}

if (count($lessonToUpdate)) {
    // Отменяем урок
    $q = 'UPDATE `lessons` SET `status` = 2 WHERE `id` IN (' . implode(',', array_pluck($lessonToUpdate, 'id')) . ')';
        mysql_query($q) or die(mysql_error());

    for($i = 0, $n = count($lessonToUpdate); $i < $n; $i++) {
        $mail = array_merge(Mailer::$emails['schedule'], array($lessonToUpdate[$i]['teacher_email']));
        Mailer::sendEmail(Mailer::$CHECKLESSONS, array($lessonToUpdate[$i]), $mail);
    }
}


DBmanager::commitTransaction();
?>
