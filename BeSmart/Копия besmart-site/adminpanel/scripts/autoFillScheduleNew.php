<?php
header('Content-type: text/plain;');
include '../../core/DBmanager.php';
DBmanager::init();
set_time_limit(600);
// Автозаполнение рассписания по дням шаблонам
$startDate = '22.06.2015';
$weekCount = 22; // 8


// Query to clear test lessons:
/*
DELETE `lessons` FROM `lessons` 
LEFT OUTER JOIN `roomtime` rt ON rt.id = `lessons`.`roomtimeID` 
LEFT OUTER JOIN `rooms` r ON r.id = rt.room
LEFT OUTER JOIN `schools` s ON s.id = r.school
WHERE 
s.id = 1 AND rt.timestart > '2014-10-27 00:00:00'
 */
/*
DELETE `lessons` FROM `lessons` 
LEFT OUTER JOIN `roomtime` rt ON rt.id = `lessons`.`roomtimeID` 
LEFT OUTER JOIN `rooms` r ON r.id = rt.room
LEFT OUTER JOIN `schools` s ON s.id = r.school
WHERE 
s.id = 1 AND (
    (rt.timestart > '2015-01-12 00:00:00' AND rt.timestart < '2015-01-17 00:00:00')
    OR (rt.timestart > '2015-01-19 00:00:00' AND rt.timestart < '2015-01-24 00:00:00')
    OR (rt.timestart > '2015-01-26 00:00:00' AND rt.timestart < '2015-01-31 00:00:00')
    OR (rt.timestart > '2015-02-02 00:00:00' AND rt.timestart < '2015-02-07 00:00:00')
    OR (rt.timestart > '2015-02-09 00:00:00')
    )
        
        */


// 1 - elementary
// 2 - pre-inter
// 3 - inter
// 4 - upper-inter
// 6 - beginner
// 1 - complex
// 2 - gramma
// 3 - Disc
// 4 - Pron
// 5 - Writing
// 6 - Event
// 7 - List

// Слепок уроков на неделю Тимошенко
if (false) {
    $less = array(
        // DAY OF THE WEEK
        'Mon' => array(
            '3' => array( // Mr.Cyclop
                '16' => array('level' => '1', 'type' => '1'),
                '17' => array('level' => '2', 'type' => '1'),
                '18' => array('level' => '1', 'type' => '1'),
                '19' => array('level' => '2', 'type' => '1'),
                '20' => array('level' => '1', 'type' => '1'),
                '21' => array('level' => '2', 'type' => '1')
            ),
            '4' => array( // Mr.Kid
                '16' => array('level' => '4', 'type' => '1'),
                '17' => array('level' => '3', 'type' => '1'),
                '18' => array('level' => '3', 'type' => '1'),
                '19' => array('level' => '3', 'type' => '1'),
                '20' => array('level' => '4', 'type' => '1'),
                '21' => array('level' => '3', 'type' => '1')
            )
        ),
        'Tue' => array(
            '3' => array( // Mr.Cyclop
                '16' => array('level' => '2', 'type' => '2'),
                '17' => array('level' => '1', 'type' => '2'),
                '18' => array('level' => '2', 'type' => '2'),
                '19' => array('level' => '1', 'type' => '2'),
                '20' => array('level' => '2', 'type' => '2'),
                '21' => array('level' => '1', 'type' => '2')
            ),
            '4' => array( // Mr. Kid
                '16' => array('level' => '3', 'type' => '2'),
                '17' => array('level' => '4', 'type' => '2'),
                '18' => array('level' => '3', 'type' => '2'),
                '19' => array('level' => '4', 'type' => '2'),
                '20' => array('level' => '3', 'type' => '2'),
                '21' => array('level' => '3', 'type' => '2')
            )
        ),
        'Wed' => array(
            '3' => array( // Mr.Cyclop
                '16' => array('level' => '1', 'type' => '7'),
                '17' => array('level' => '2', 'type' => '7'),
                '18' => array('level' => '1', 'type' => '7'),
                '19' => array('level' => '2', 'type' => '7'),
                '20' => array('level' => '1', 'type' => '7'),
                '21' => array('level' => '2', 'type' => '7')
            ),
            '4' => array( // Mr.Kid
                '16' => array('level' => '4', 'type' => '7'),
                '17' => array('level' => '3', 'type' => '7'),
                '18' => array('level' => '3', 'type' => '7'),
                '19' => array('level' => '3', 'type' => '7'),
                '20' => array('level' => '4', 'type' => '7'),
                '21' => array('level' => '3', 'type' => '7')
            )
        ),
        'Thu' => array(
            '3' => array( // Mr.Cyclop
                '16' => array('level' => '2', 'type' => '1'),
                '17' => array('level' => '1', 'type' => '1'),
                '18' => array('level' => '2', 'type' => '1'),
                '19' => array('level' => '1', 'type' => '1'),
                '20' => array('level' => '2', 'type' => '1'),
                '21' => array('level' => '1', 'type' => '1')
            ),
            '4' => array( // Mr. Kid
                '16' => array('level' => '3', 'type' => '1'),
                '17' => array('level' => '4', 'type' => '1'),
                '18' => array('level' => '3', 'type' => '1'),
                '19' => array('level' => '4', 'type' => '1'),
                '20' => array('level' => '3', 'type' => '1'),
                '21' => array('level' => '3', 'type' => '1')
            )
        ),
        'Fri' => array(
            '3' => array( // Mr.Cyclop
                '16' => array('level' => '1', 'type' => '2'),
                '17' => array('level' => '2', 'type' => '2'),
                '18' => array('level' => '1', 'type' => '2'),
                '19' => array('level' => '2', 'type' => '2'),
                '20' => array('level' => '1', 'type' => '2'),
                '21' => array('level' => '2', 'type' => '2')
            ),
            '4' => array( // Mr.Kid
                '16' => array('level' => '4', 'type' => '2'),
                '17' => array('level' => '3', 'type' => '2'),
                '18' => array('level' => '3', 'type' => '2'),
                '19' => array('level' => '3', 'type' => '2'),
                '20' => array('level' => '4', 'type' => '2'),
                '21' => array('level' => '3', 'type' => '2')
            )
        )
    );
}

// Слепок уроков на неделю Горького
if (true) {
    $less = array(
        'Mon' => array(
            '1' => array(  // Mr.Smart
                '16' => array('level' => '2', 'type' => '1'),
                '17' => array('level' => '1', 'type' => '1'),
                '18' => array('level' => '2', 'type' => '1'),
                '19' => array('level' => '1', 'type' => '1'),
                '20' => array('level' => '2', 'type' => '1'),
                '21' => array('level' => '1', 'type' => '1')
            ),
            '2' => array( // Mr. Brain
                '16' => array('level' => '3', 'type' => '1'),
                '17' => array('level' => '3', 'type' => '1'),
                '18' => array('level' => '6', 'type' => '1'),
                '19' => array('level' => '4', 'type' => '1'),
                '20' => array('level' => '3', 'type' => '1'),
                '21' => array('level' => '3', 'type' => '1')
            )
        ),
        'Tue' => array(
            '1' => array( // Mr.Smart
                '16' => array('level' => '1', 'type' => '2'),
                '17' => array('level' => '2', 'type' => '2'),
                '18' => array('level' => '1', 'type' => '2'),
                '19' => array('level' => '2', 'type' => '2'),
                '20' => array('level' => '1', 'type' => '2'),
                '21' => array('level' => '2', 'type' => '2')
            ),
            '2' => array( // Mr. Brain
                '16' => array('level' => '3', 'type' => '2'),
                '17' => array('level' => '3', 'type' => '2'),
                '18' => array('level' => '6', 'type' => '1'),
                '19' => array('level' => '3', 'type' => '2'),
                '20' => array('level' => '4', 'type' => '2'),
                '21' => array('level' => '3', 'type' => '2')
            )
        ),
        'Wed' => array(
            '1' => array(  // Mr.Smart
                '16' => array('level' => '2', 'type' => '7'),
                '17' => array('level' => '1', 'type' => '7'),
                '18' => array('level' => '2', 'type' => '7'),
                '19' => array('level' => '1', 'type' => '7'),
                '20' => array('level' => '2', 'type' => '7'),
                '21' => array('level' => '1', 'type' => '7')
            ),
            '2' => array( // Mr. Brain
                '16' => array('level' => '3', 'type' => '7'),
                '17' => array('level' => '3', 'type' => '7'),
                '18' => array('level' => '6', 'type' => '1'),
                '19' => array('level' => '4', 'type' => '7'),
                '20' => array('level' => '3', 'type' => '7'),
                '21' => array('level' => '3', 'type' => '7')
            )
        ),
        'Thu' => array(
            '1' => array( // Mr.Smart
                '16' => array('level' => '1', 'type' => '1'),
                '17' => array('level' => '2', 'type' => '1'),
                '18' => array('level' => '1', 'type' => '1'),
                '19' => array('level' => '2', 'type' => '1'),
                '20' => array('level' => '1', 'type' => '1'),
                '21' => array('level' => '2', 'type' => '1')
            ),
            '2' => array( // Mr. Brain
                '16' => array('level' => '3', 'type' => '1'),
                '17' => array('level' => '3', 'type' => '1'),
                '18' => array('level' => '6', 'type' => '1'),
                '19' => array('level' => '3', 'type' => '1'),
                '20' => array('level' => '4', 'type' => '1'),
                '21' => array('level' => '3', 'type' => '1')
            )
        ),
        'Fri' => array(
            '1' => array(  // Mr.Smart
                '16' => array('level' => '2', 'type' => '2'),
                '17' => array('level' => '1', 'type' => '2'),
                '18' => array('level' => '2', 'type' => '2'),
                '19' => array('level' => '1', 'type' => '2'),
                '20' => array('level' => '2', 'type' => '2'),
                '21' => array('level' => '1', 'type' => '2')
            ),
            '2' => array( // Mr. Brain
                '16' => array('level' => '3', 'type' => '2'),
                '17' => array('level' => '3', 'type' => '2'),
                '18' => array('level' => '6', 'type' => '1'),
                '19' => array('level' => '4', 'type' => '2'),
                '20' => array('level' => '3', 'type' => '2'),
                '21' => array('level' => '3', 'type' => '2')
            )
        )
    );
}

// Слепок уроков на неделю Астана
if (false) {
    $less = array(
        'Tue' => array(
            '14' => array( // Каб 1
                '10' => array('level' => '1', 'type' => '1'),
                '11' => array('level' => '2', 'type' => '1'),
                '12' => array('level' => '1', 'type' => '1'),
                '13' => array('level' => '2', 'type' => '1'),
                '14' => array('level' => '1', 'type' => '1'),
                '15' => array('level' => '2', 'type' => '1'),
                '16' => array('level' => '1', 'type' => '1'),
                '17' => array('level' => '2', 'type' => '1'),
                '18' => array('level' => '1', 'type' => '1'),
                '19' => array('level' => '2', 'type' => '1'),
                '20' => array('level' => '1', 'type' => '1'),
                '21' => array('level' => '2', 'type' => '1')
            ),
            '15' => array( // Каб 2
                '10' => array('level' => '4', 'type' => '1'),
                '11' => array('level' => '3', 'type' => '1'),
                '12' => array('level' => '6', 'type' => '1'),
                '13' => array('level' => '3', 'type' => '1'),
                '14' => array('level' => '4', 'type' => '1'),
                '15' => array('level' => '3', 'type' => '1'),
                '16' => array('level' => '4', 'type' => '1'),
                '17' => array('level' => '3', 'type' => '1'),
                '18' => array('level' => '4', 'type' => '1'),
                '19' => array('level' => '3', 'type' => '1'),
                '20' => array('level' => '6', 'type' => '1'),
                '21' => array('level' => '3', 'type' => '1')
            ),
            '16' => array( // Каб 3
                '15' => array('level' => '1,2,3,4', 'type' => '3'),
                '16' => array('level' => '1,2,3,4', 'type' => '3'),
                '17' => array('level' => '1,2,3,4', 'type' => '3'),
                '18' => array('level' => '1,2,3,4', 'type' => '3'),
                '19' => array('level' => '1,2,3,4', 'type' => '3'),
                '20' => array('level' => '1,2,3,4', 'type' => '3')
            )
        ),
        'Wed' => array(
            '14' => array( // Каб 1
                '10' => array('level' => '2', 'type' => '1'),
                '11' => array('level' => '1', 'type' => '1'),
                '12' => array('level' => '2', 'type' => '1'),
                '13' => array('level' => '1', 'type' => '1'),
                '14' => array('level' => '2', 'type' => '1'),
                '15' => array('level' => '1', 'type' => '1'),
                '16' => array('level' => '2', 'type' => '1'),
                '17' => array('level' => '1', 'type' => '1'),
                '18' => array('level' => '2', 'type' => '1'),
                '19' => array('level' => '1', 'type' => '1'),
                '20' => array('level' => '2', 'type' => '1'),
                '21' => array('level' => '1', 'type' => '1')
            ),
            '15' => array( // Каб 2
                '10' => array('level' => '3', 'type' => '1'),
                '11' => array('level' => '6', 'type' => '1'),
                '12' => array('level' => '3', 'type' => '1'),
                '13' => array('level' => '4', 'type' => '1'),
                '14' => array('level' => '3', 'type' => '1'),
                '15' => array('level' => '4', 'type' => '1'),
                '16' => array('level' => '3', 'type' => '1'),
                '17' => array('level' => '4', 'type' => '1'),
                '18' => array('level' => '3', 'type' => '1'),
                '19' => array('level' => '6', 'type' => '1'),
                '20' => array('level' => '3', 'type' => '1'),
                '21' => array('level' => '4', 'type' => '1')
            ),
            '16' => array( // Каб 3
                '15' => array('level' => '1,2,3,4', 'type' => '3'),
                '16' => array('level' => '1,2,3,4', 'type' => '3'),
                '17' => array('level' => '1,2,3,4', 'type' => '3'),
                '18' => array('level' => '1,2,3,4', 'type' => '3'),
                '19' => array('level' => '1,2,3,4', 'type' => '3'),
                '20' => array('level' => '1,2,3,4', 'type' => '3')
            )
        ),
        'Thu' => array(
            '14' => array( // Каб 1
                '10' => array('level' => '1', 'type' => '1'),
                '11' => array('level' => '2', 'type' => '1'),
                '12' => array('level' => '1', 'type' => '1'),
                '13' => array('level' => '2', 'type' => '1'),
                '14' => array('level' => '1', 'type' => '1'),
                '15' => array('level' => '2', 'type' => '1'),
                '16' => array('level' => '1', 'type' => '1'),
                '17' => array('level' => '2', 'type' => '1'),
                '18' => array('level' => '1', 'type' => '1'),
                '19' => array('level' => '2', 'type' => '1'),
                '20' => array('level' => '1', 'type' => '1'),
                '21' => array('level' => '2', 'type' => '1')
            ),
            '15' => array( // Каб 2
                '10' => array('level' => '4', 'type' => '1'),
                '11' => array('level' => '3', 'type' => '1'),
                '12' => array('level' => '6', 'type' => '1'),
                '13' => array('level' => '3', 'type' => '1'),
                '14' => array('level' => '4', 'type' => '1'),
                '15' => array('level' => '3', 'type' => '1'),
                '16' => array('level' => '4', 'type' => '1'),
                '17' => array('level' => '3', 'type' => '1'),
                '18' => array('level' => '4', 'type' => '1'),
                '19' => array('level' => '3', 'type' => '1'),
                '20' => array('level' => '6', 'type' => '1'),
                '21' => array('level' => '3', 'type' => '1')
            ),
            '16' => array( // Каб 3
                '15' => array('level' => '1,2,3,4', 'type' => '3'),
                '16' => array('level' => '1,2,3,4', 'type' => '3'),
                '17' => array('level' => '1,2,3,4', 'type' => '3'),
                '18' => array('level' => '1,2,3,4', 'type' => '3'),
                '19' => array('level' => '1,2,3,4', 'type' => '3'),
                '20' => array('level' => '1,2,3,4', 'type' => '3')
            )
        ),
        'Fri' => array(
            '14' => array( // Каб 1
                '10' => array('level' => '2', 'type' => '1'),
                '11' => array('level' => '1', 'type' => '1'),
                '12' => array('level' => '2', 'type' => '1'),
                '13' => array('level' => '1', 'type' => '1'),
                '14' => array('level' => '2', 'type' => '1'),
                '15' => array('level' => '1', 'type' => '1'),
                '16' => array('level' => '2', 'type' => '1'),
                '17' => array('level' => '1', 'type' => '1'),
                '18' => array('level' => '2', 'type' => '1'),
                '19' => array('level' => '1', 'type' => '1'),
                '20' => array('level' => '2', 'type' => '1'),
                '21' => array('level' => '1', 'type' => '1')
            ),
            '15' => array( // Каб 2
                '10' => array('level' => '3', 'type' => '1'),
                '11' => array('level' => '6', 'type' => '1'),
                '12' => array('level' => '3', 'type' => '1'),
                '13' => array('level' => '4', 'type' => '1'),
                '14' => array('level' => '3', 'type' => '1'),
                '15' => array('level' => '4', 'type' => '1'),
                '16' => array('level' => '3', 'type' => '1'),
                '17' => array('level' => '4', 'type' => '1'),
                '18' => array('level' => '3', 'type' => '1'),
                '19' => array('level' => '6', 'type' => '1'),
                '20' => array('level' => '3', 'type' => '1'),
                '21' => array('level' => '4', 'type' => '1')
            ),
            '16' => array( // Каб 3
                '15' => array('level' => '1,2,3,4', 'type' => '3'),
                '16' => array('level' => '1,2,3,4', 'type' => '3'),
                '17' => array('level' => '1,2,3,4', 'type' => '3'),
                '18' => array('level' => '1,2,3,4', 'type' => '3'),
                '19' => array('level' => '1,2,3,4', 'type' => '3'),
                '20' => array('level' => '1,2,3,4', 'type' => '3')
            )
        ),
        'Sat' => array(
            '14' => array( // Каб 1
                '10' => array('level' => '1', 'type' => '1'),
                '11' => array('level' => '2', 'type' => '1'),
                '12' => array('level' => '1', 'type' => '1'),
                '13' => array('level' => '2', 'type' => '1'),
                '14' => array('level' => '1', 'type' => '1'),
                '15' => array('level' => '2', 'type' => '1'),
                '16' => array('level' => '1', 'type' => '1'),
                '17' => array('level' => '2', 'type' => '1'),
                '18' => array('level' => '1', 'type' => '1'),
                '19' => array('level' => '2', 'type' => '1'),
                '20' => array('level' => '1', 'type' => '1'),
                '21' => array('level' => '2', 'type' => '1')
            ),
            '15' => array( // Каб 2
                '10' => array('level' => '4', 'type' => '1'),
                '11' => array('level' => '3', 'type' => '1'),
                '12' => array('level' => '6', 'type' => '1'),
                '13' => array('level' => '3', 'type' => '1'),
                '14' => array('level' => '4', 'type' => '1'),
                '15' => array('level' => '3', 'type' => '1'),
                '16' => array('level' => '4', 'type' => '1'),
                '17' => array('level' => '3', 'type' => '1'),
                '18' => array('level' => '4', 'type' => '1'),
                '19' => array('level' => '3', 'type' => '1'),
                '20' => array('level' => '6', 'type' => '1'),
                '21' => array('level' => '3', 'type' => '1')
            ),
            '16' => array( // Каб 3
                '15' => array('level' => '1,2,3,4', 'type' => '3'),
                '16' => array('level' => '1,2,3,4', 'type' => '3'),
                '17' => array('level' => '1,2,3,4', 'type' => '3'),
                '18' => array('level' => '1,2,3,4', 'type' => '3'),
                '19' => array('level' => '1,2,3,4', 'type' => '3'),
                '20' => array('level' => '1,2,3,4', 'type' => '3')
            )
        )
    );
}

function insertOrUpdateRoomTime($roomID, $timeStart) {
    $DB_date_format = 'Y-m-d H:i:s';
    $lessonStartTime = date($DB_date_format, $timeStart);
    $lessonEndTime = date($DB_date_format, $timeStart + 3600);

    $qRT = sprintf('INSERT INTO `' . cnf::$db_prefix . 'roomtime`(`room`,`timestart`,`timeend`) VALUES(%d,"%s","%s") ON DUPLICATE KEY UPDATE `id`=LAST_INSERT_ID(`id`)', $roomID, $lessonStartTime, $lessonEndTime);

    mysql_query($qRT) or die(mysql_error() . "\n" . $qRT);

    return mysql_insert_id();
}

function insertNewLesson($lesson_type, $levelID, $roomtimeID, $topic) {
    $qL = sprintf('INSERT INTO `' . cnf::$db_prefix . 'lessons`(`lesson_type`, `level`, `roomtimeID`,`teacher`,`status`,`lessonTopicID`) VALUES(%d, %d, %d, %s, %d, %d)', $lesson_type, $levelID, $roomtimeID, 'NULL', 1, $topic
    );

    mysql_query($qL) or die(mysql_error() . $qL);
}

$TP = array();
$topics = DBmanager::getTable('lesson_topics', 0, null);
for ($i = 0; $i < count($topics); $i ++) {
    if ($topics[$i]['deleted'] == 0) {
        if (!$TP[$topics[$i]['levelID']]) {
            $TP[$topics[$i]['levelID']] = array();
        }
        if (!$TP[$topics[$i]['levelID']][$topics[$i]['lessontypeID']]) {
            $TP[$topics[$i]['levelID']][$topics[$i]['lessontypeID']] = array();
        }

        $TP[$topics[$i]['levelID']][$topics[$i]['lessontypeID']][] = $topics[$i]['id'];
    }
}

$all = 0;
$lessonInc = array();
$lessons = array();

// Сдвиг в темах {уровень}_{тип урока}
// Complex
$lessonInc['1_1'] = 56;
$lessonInc['2_1'] = 56;
$lessonInc['3_1'] = 56;
$lessonInc['4_1'] = 56;
$lessonInc['6_1'] = 7;

// Grammar
$lessonInc['1_2'] = 16;
$lessonInc['2_2'] = 16;
$lessonInc['3_2'] = 16;
$lessonInc['4_2'] = 16;

// Listening
$lessonInc['1_7'] = 8;
$lessonInc['2_7'] = 8;
$lessonInc['3_7'] = 8;
$lessonInc['4_7'] = 8;

// Disscursion
$lessonInc['0_3'] = 0; 

for ($i = 0; $i < $weekCount * 7; $i++) {
    $keysToIncrease = array();
    $time = strtotime($startDate . " +$i days");
    $day = date('D', $time);
    $sch = $less[$day];
    if (!$sch) {
        continue;
    }
    
    foreach ($sch as $roomID => $timeArr) {
        $rooms = explode(',', $roomID);
        
        for ($j = 0, $n = count($rooms); $j < $n; $j++) {
            foreach ($timeArr as $hour => $data) {
                $levelIDs = $data['level'];
                $lessonTypeID = $data['type'];
                $lessonStartTime = strtotime($startDate . ' +'. $i . ' days +'. $hour . ' hours');

                $roomtimeID = insertOrUpdateRoomTime($rooms[$j], $lessonStartTime);

                $levelIDs = explode(",", $levelIDs);
                for ($ii = 0; $ii < count($levelIDs); $ii ++) {
                    $levelID = $levelIDs[$ii];
                    $levelIDForTopic = $levelID;
                    if ($lessonTypeID == 3) {
                        // Discussion - for all levels same topics
                        $incKey = '0_' . $lessonTypeID;
                        $levelIDForTopic = 0;
                    } else {
                        $incKey = $levelID . '_' . $lessonTypeID;
                    }

                    if (!$lessonInc[$incKey] || $lessonInc[$incKey] >= count($TP[$levelIDForTopic][$lessonTypeID])) {
                        $lessonInc[$incKey] = 0;
                    }
                    
                    $topicID = $TP[$levelIDForTopic][$lessonTypeID][$lessonInc[$incKey]];

                    if ($levelID == 6) {
                        $lessonInc[$incKey] ++;
                    } else {
                        if (!in_array($incKey, $keysToIncrease)) {
                            $keysToIncrease[] = $incKey;
                        }
                    }

                    insertNewLesson($lessonTypeID, $levelID, $roomtimeID, $topicID);

                    $all ++;
                }
            }
        }
    }
    foreach($keysToIncrease as $key) {
        $lessonInc[$key] ++;
    }
}

echo $all;