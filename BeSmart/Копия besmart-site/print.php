<?php
header ('Content-type: text/html; charset=utf-8');

include_once 'core/preinit.php';
include_once 'core/functions.php';
include_once 'core/DBmanager.php';
$levels = array(
    1=> 'Elemen.',
    2=> 'PreInt.',
    3=> 'Inter.',
    4=> 'Upper.',
    6=> 'Beginner'
);
DBmanager::init();

$id = $_GET['id'];

if (!is_numeric($id)) {
    exit('Incorrect ID');
}
function getUserOnRoom($roomtimeID, $statusID = null) {
	$result = array();

    $q = 'SELECT ut.name as userType, ul.status as userLessonStatus, u.* FROM  `' . cnf::$db_prefix . 'userlesson` `ul` 
    LEFT OUTER JOIN  `' . cnf::$db_prefix . 'lessons` `l` ON `l`.`roomtimeID` = ' . $roomtimeID . '
    LEFT OUTER JOIN `' . cnf::$db_prefix . 'users` `u` ON `u`.`id` = `ul`.`user`
    LEFT OUTER JOIN `' . cnf::$db_prefix . 'usertypes` `ut` ON `ut`.`id` = `u`.`userTypeID`
    WHERE `ul`.`lesson` = l.id' . ($statusID ? (' AND `ul`.`status` = ' . $statusID) : '');

	$res = mysql_query($q) or die (mysql_error());
	
//	echo $q;
	while($row = mysql_fetch_assoc($res)) {
		$result[] = $row;
	}

	return $result;
}

$less = DBmanager::getLessons(array('id' => $id));

if (!count($less)) {
    exit('Урок #' . $id . ' не найден');
}
$lesson = $less[0];
$lesson['teacherFullName'] = ($lesson['teacherLastName'] ? $lesson['teacherFirstName'] . ' ' . $lesson['teacherLastName'] : '');
$users = getUserOnRoom($lesson['roomtimeID']);

$registered = array();
$waiting = array();

for ($i = 0, $n = count($users); $i < $n; $i++) {
    switch ($users[$i]['userLessonStatus']) {
        case 1: 
        case 2:
            $registered[] = $users[$i];
            break;
        case 4: 
            $waiting[] = $users[$i];
            break;
    }
}

?>
<style>
    table {
        font: 500 10px Verdana;
        border-collapse: collapse;
        border-left: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
        width: 100%;
    }
    table tr td {
        border-right: 1px solid #bbb;
        border-top: 1px solid #bbb;
        padding: 4px;
    }
	.intext {
		background: none;
		border: none;
		width: 100%;
		font-weight: bold;
	}
</style>
<div style="font: 500 10px Verdana; width: 120mm; margin: 0 auto;">
	<h3>Урок №<?php echo $lesson['id'] ?></h3>
    <table>
        <tr><td style="width: 120px">Время: </td><td><?php echo date('<b>H:i</b>', strtotime($lesson['time'])) . '-' . rus_date('<b>H:i</b> l <b>d</b> F Y', strtotime($lesson['timeend'])) ?></td></tr>
        <tr><td>Уровень: </td><td><b><?php echo $lesson['levelName'] ?></b></td></tr>
        <tr><td>Тип: </td><td><b><?php echo $lesson['name'] ?></b></td></tr>
        <tr><td>Аудитория: </td><td><b><?php echo $lesson['roomName'] ?></b></td></tr>
		<tr><td>Преподаватель: </td><td><input type="text" class="intext" value="<?php echo $lesson['teacherFullName']; ?>"/></td></tr>
    </table>
    <h3>Список студентов</h3>
    <?php 
        if (!count($registered)) {
            echo 'Студенты не зарегистрированы';
        } else {
            echo '<table>';
            for ($i = 0, $n = count($registered); $i < $n; $i++) {
				$userInfo = $registered[$i];
                echo '<tr><td style="width: 20px">' . ($i + 1) . '</td><td>' . $userInfo['lastname'] . ' ' . $userInfo['firstname'] . '</td><td>' . $userInfo['login'] . '</td><td>' . $userInfo['tel'] . '</td><td>' . $levels[$userInfo['level']] . '</td><td>' . $userInfo['userType'] . '</td><td style="width: 20px;">&nbsp;</td></tr>';
            }
            echo '</table>';
        }
    ?>
    <!--
    <h3>Резерв</h3>
    <?php
        if (!count($waiting)) {
            echo 'Резерв пуст';
        } else {
            echo '<table>';
            for ($i = 0, $n = count($waiting); $i < $n; $i++) {
				$userInfo = $waiting[$i];
                echo '<tr><td style="width: 20px">' . ($i + 1) . '</td><td>' . $userInfo['lastname'] . ' ' . $userInfo['firstname'] . '</td><td>' . $userInfo['login'] . '</td><td>' . $userInfo['tel'] . '</td><td>' . $levels[$userInfo['level']] . '</td><td style="width: 20px;">&nbsp;</td></tr>';
            }
            echo '</table>';
        }
    ?>
    !-->
</div>