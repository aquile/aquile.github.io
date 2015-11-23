<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
// INSERT request
    $values = (array) json_decode($_POST['data']);
    $page = insertNewLessonType($values);

    $output = array('success' => 'true', 'data' => $page);

} else if ($_GET['action'] == "update") {
// UPDATE request
    $values = (array) json_decode($_POST['data']);
    $page = updateLessonType($values);

    $output = array('success' => 'true', 'data' => $page['data'][0]);

} else if ($_GET['action'] == "delete") {
// DELETE request
    $id = $_GET['id'];
    $success = true;
    if (is_numeric($id)) {
        deleteLessonType($id);
    } else {
        $success = false;
    }
    
    $output = array('success' => $success);

} else {
// VIEW request
    $where = array();
    if (is_numeric($_POST['lessonID'])) {
        $where['lesson'] = $_POST['lessonID'];
    }
    $pages = getUserLesson($where, $_POST['start'], $_POST['limit']);
    $output = array('success' => 'true', 'data' => $pages['data'], 'count' => $pages['count'][0]);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getUserLesson($WHERE, $start = null, $limit = null) {
    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS ul.*, u.firstname, u.lastname, u.login FROM `' . cnf::$db_prefix . 'userlesson` ul
        LEFT OUTER JOIN `' . cnf::$db_prefix . 'users` u ON u.id = ul.user ';
    
    $q_where = ' WHERE 1 ';
    foreach ($WHERE as $field => $value) {
        $q_where .= ' AND ' . $field .' = "' . $value . '"';
    }
    
    $q .= $q_where . ' ORDER BY id ASC';
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    $res = mysql_query($q) or die(mysql_error() . '\n'. $q);

    while($row = mysql_fetch_assoc($res)) {
        $row['fullname'] = $row['lastname'] . ' ' . $row['firstname'];
        if ($row['status'] == 7) {
         	$row['status'] = 3;
        }
        $result[] = $row;
    }

    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updateLessonType($info) {
    $id = $info['id'];

    if ($info && count($info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'userlesson` SET ';
        $q_sub = '';
        foreach ($info as $field => $value) {
            if (strlen($q_sub) != 0) {
                $q_sub .= ", ";
            }
            $q_sub .= '`' . $field . '` = "' . mysql_real_escape_string($value) . '"';
        }

        $q .= $q_sub . ' WHERE `id` = ' . $id;
        mysql_query($q) or die(mysql_error() . $q);
    }

    $ulInfo = getUserLesson(array('ul.id' => $id), 0, 1);
    
    if ($info['status'] == 3) {
    // Студент пропустил урок
        checkUser($ulInfo['data'][0]['user']);
    } else if ($info['status'] == 5 || $info['status'] == 6) {
    // Студент отказался или отписан уведомляем подписаных пользователей о освободившемся месте
        $lessonId = $ulInfo['data'][0]['lesson'];
        $waitingUsers = DBmanager::getUsersOnLesson($lessonId, 4);
        $lesson = DBmanager::getLessons(array(
           'id' => $lessonId
        ));
        $lesson = $lesson[0];
        if ($waitingUsers && count($waitingUsers)) {
            Mailer::sendEmail(Mailer::$FREE_PLACE, array(
               'lesson_time' => rus_date('H:i l, d F Y', strtotime($lesson['time'])),
               'lesson_name' => $lesson['name'],
               'topic' => $lesson['topicName'],
               'level' => $lesson['levelName']
           ), array_pluck($waitingUsers, 'email'));
        }
    }
    return $ulInfo;
}

function insertNewLessonType($info) {
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'userlesson`(`user`, `lesson`, `status`) VALUES(%d, %d, %d)', 
            mysql_real_escape_string($info['user']),
            mysql_real_escape_string($info['lesson']),
            mysql_real_escape_string($info['status']));

    mysql_query($q) or die(mysql_error() . $q);

    $info['id'] = mysql_insert_id();

    return $info;
}

function deleteLessonType($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'userlesson` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}

function checkUser($userID) {
    $q = 'SELECT * FROM `' . cnf::$db_prefix . 'userlesson` WHERE `user` = ' . $userID . ' AND `status` = 3';
    $res = mysql_query($q);
    while ($row = mysql_fetch_assoc($res)) {
        $uls[] = $row['id'];
    }
    if (count($uls) > 1) {
        // Блокируем абонемент на 3 дня
        mysql_query('UPDATE `' . cnf::$db_prefix . 'users` SET `blockedTill` = "' . date('Y-m-d', strtotime('+2 days')) . '" WHERE `id`=' . $userID) or die(mysql_error());
        
        
        // Удаляем регистрации на уроки в будущем
        $q = 'UPDATE `' . cnf::$db_prefix . 'userlesson` ul
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'lessons` l ON l.id = ul.lesson
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'roomtime` rt ON rt.id = l.roomtimeID
            SET ul.`status` = 6
            WHERE `rt`.timestart >= CURDATE() AND ul.user = ' . $userID;
        mysql_query($q) or die(mysql_error());
        
        
        // Обновляем статус у пропущеных уроков
        $q = 'UPDATE `' . cnf::$db_prefix . 'userlesson` SET `status` = 7 WHERE `id` IN (' . implode(',', $uls) . ')';
        mysql_query($q) or die(mysql_error());
    }
}
?>