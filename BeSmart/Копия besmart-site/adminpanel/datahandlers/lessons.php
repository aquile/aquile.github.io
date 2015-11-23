<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
$DB_date_format = 'Y-m-d H:i:s';
$FE_date_format = 'H:i:s m/d/Y';
if ($_GET['action'] == "new") {
// INSERT request
    $values = (array) json_decode($_POST['data']);
    $page = insertNewEntity($values);

    $output = array('success' => 'true', 'data' => $page);

} else if ($_GET['action'] == "update") {
// UPDATE request
    $values = (array) json_decode($_POST['data']);
    $page = updateEntity($values);

    $output = array('success' => 'true'/*, 'data' => $page['data'][0]*/);

} else if ($_GET['action'] == "delete") {
// DELETE request
    $id = $_GET['id'];
    $success = true;
    if (is_numeric($id)) {
        deleteEntity($id);
    } else {
        $success = false;
    }
    
    $output = array('success' => $success);

} else {
// VIEW request
    $lessons = getEntityList(array(), $_POST['start'], $_POST['end']);
    $output = array('success' => 'true', 'data' => $lessons['data'], 'count' => $lessons['count']);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getEntityList($WHERE, $start = null, $end = null) {
    global $DB_date_format;
    global $FE_date_format;
    
    if (is_numeric($_REQUEST['school'])) {
        $school = $_REQUEST['school'];
    } else {
        $school = 1;
    }
    $result = array();
    $q = 'SELECT l.*, `rt`.`timestart`, `rt`.`timeend`, `rt`.`room` 
        FROM `' . cnf::$db_prefix . 'lessons` l 
        LEFT OUTER JOIN `' . cnf::$db_prefix . 'roomtime` rt ON `rt`.`id`=`l`.`roomtimeID`'
            . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'rooms` rm ON `rm`.id=`rt`.`room`'
            . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'schools` sc ON `sc`.id=`rm`.`school`';
    

    $q_where = ' WHERE sc.id = ' . $school;
    
    foreach ($WHERE as $field => $value) {
        if (strlen($q_where) > 0) $q_where .= ' AND ';
        $q_where .= 'l.`' . $field .'` = "' . $value . '"';
    }
    if ($start) {
        $q_where .= ' AND `rt`.`timestart` >= "' . date($DB_date_format, strtotime($start)) . '"';
    }
    if ($end) {
        $q_where .= ' AND `rt`.`timeend` <= "' . date($DB_date_format, strtotime($end . ' 23:59:59')) . '"';
    }

    $q .= $q_where;

    $res = mysql_query($q) or die(mysql_error() . '\n'. $q);
    
    while($row = mysql_fetch_assoc($res)) {
        // Get list of users
        $allUsers = getUserOnRoom($row['roomtimeID']);
        $regUsers = array();
        $waitingUsers = array();
        for ($i = 0, $n = count($allUsers); $i < $n; $i++) {
            if ($allUsers[$i]['status'] == 1 || $allUsers[$i]['status'] == 2 || $allUsers[$i]['status'] == 3) {
                $regUsers[] = $allUsers[$i];
            } else if ($allUsers[$i]['status'] == 4) {
                $waitingUsers[] = $allUsers[$i];
            }
        }
        // Modify outcomming data
        $row['timeend'] = date($FE_date_format, strtotime($row['timeend']));
        $row['timestart'] = date($FE_date_format, strtotime($row['timestart']));
        $row['userCount'] = count($regUsers);
        $row['waitingCount'] = count($waitingUsers);
        $result[] = $row;
    }

    return array('data' => $result, 'count' => count($result));
}

function updateEntity($info) {
    global $DB_date_format;
    $id = $info['id'];

    $lessonsInfo = getEntityList(array(
        'id' => $id
    ));
    $lessonInfo = $lessonsInfo['data'][0];
    if (($info['timestart'] && $info['timeend']) || $info['room']) {
        $lessonRoom = $info['room'] ? $info['room'] : $lessonInfo['room'];

        if ($info['timestart']) {
            $lessonStartTime = date($DB_date_format, strtotime($info['timestart']));
        } else {
            $lessonStartTime = date($DB_date_format, strtotime($lessonInfo['timestart']));
        }
        if ($info['timeend']) {
            $lessonEndTime = date($DB_date_format, strtotime($info['timeend']));
        } else {
            $lessonEndTime = date($DB_date_format, strtotime($lessonInfo['timeend']));
        }

        $qRT = sprintf('INSERT INTO `' . cnf::$db_prefix . 'roomtime`(`room`,`timestart`,`timeend`) VALUES(%d,"%s","%s") ON DUPLICATE KEY UPDATE `id`=LAST_INSERT_ID(`id`)',
                $lessonRoom, 
                $lessonStartTime,
                $lessonEndTime);
        mysql_query($qRT) or die(mysql_error());

        $info['roomtimeID'] = mysql_insert_id();
    }
    unset ($info['id'], $info['timestart'], $info['timeend'], $info['room']);
    
    if ($info && count($info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'lessons` SET ';
        $q_sub = '';
        foreach ($info as $field => $value) {
            if (strlen($q_sub) != 0) {
                $q_sub .= ", ";
            }
            if ($field == 'teacher' && !$value) {
                $q_sub .= '`' . $field . '` = NULL';
            } else {
                $q_sub .= '`' . $field . '` = "' . mysql_real_escape_string($value) . '"';
            }
        }

        $q .= $q_sub . ' WHERE `id` = ' . $id;
        mysql_query($q) or die(mysql_error() . $q);
    }

    //return getEntityList(array('id' => $id), 0, 1);
}

function insertNewEntity($info) {
    global $DB_date_format;
    $lessonStartTime = date($DB_date_format, strtotime($info['timestart']));
    $lessonEndTime = date($DB_date_format, strtotime($info['timeend']));
    // Добавляем связку roomtime
    $qRT = sprintf('INSERT INTO `' . cnf::$db_prefix . 'roomtime`(`room`,`timestart`,`timeend`) VALUES(%d,"%s","%s") ON DUPLICATE KEY UPDATE `id`=LAST_INSERT_ID(`id`)',
            $info['room'], $lessonStartTime, $lessonEndTime);
    
    mysql_query($qRT) or die(mysql_error() . "\n" . $qRT);
    
    $roomtimeID = mysql_insert_id();
    
    
    // Добавляем новый урок
    $qL = sprintf('INSERT INTO `' . cnf::$db_prefix . 'lessons`(`lesson_type`, `level`, `roomtimeID`,`teacher`,`status`,`lessonTopicID`) VALUES(%d, %d, %d, %s, %d, %d)', 
            $info['lesson_type'], 
            $info['level'], 
            $roomtimeID,
            ($info['teacher'] ? $info['teacher'] : 'NULL'),
            ($info['status'] ? $info['status'] : 1),
            $info['lessonTopicID']
        );

    mysql_query($qL) or die(mysql_error() . $qL);

    $info['id'] = mysql_insert_id();

    return $info;
}

function deleteEntity($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'lessons` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}

    function getUserOnRoom($roomtimeID, $statusID = null) {
	$result = array();
/*	$q = 'SELECT ul.* FROM  `' . cnf::$db_prefix . 'roomtime` rt
		LEFT OUTER JOIN  `' . cnf::$db_prefix . 'lessons` l ON l.roomtimeID = rt.id
		LEFT OUTER JOIN  `' . cnf::$db_prefix . 'userlesson` ul ON ul.lesson = l.id AND ul.status ='.$statusID.'
		WHERE rt.id =' . $roomtimeID;
		*/
$q = 'SELECT ul.* FROM  `' . cnf::$db_prefix . 'userlesson` `ul` 
LEFT OUTER JOIN  `' . cnf::$db_prefix . 'lessons` `l` ON `l`.`roomtimeID` = ' . $roomtimeID . ' 
WHERE `ul`.`lesson` = l.id' . ($statusID ? (' AND `ul`.`status` = ' . $statusID) : '');

	$res = mysql_query($q) or die (mysql_error());
	
//	echo $q;
	while($row = mysql_fetch_assoc($res)) {
		$result[] = $row;
	}

	return $result;
    }

?>