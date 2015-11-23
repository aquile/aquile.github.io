<?php
header('Content-type: text/html; charset=utf-8');
include_once '../core/DBmanager.php';
DBmanager::init();


$CURRENTSCHOOL = isset($_GET['school']) ? $_GET['school'] : 1;
$CURRENTTYPE = isset($_GET['type']) ? $_GET['type'] : 'week';
$CURRENTPAGE = isset($_GET['page']) ? $_GET['page'] : '';

$sql = 'SELECT u.contractNumber, u.lastName, u.login, count(*) as count, u.userTypeID, l.lesson_type  FROM `userlesson` ul
LEFT OUTER JOIN `lessons` l ON l.id = ul.lesson 
LEFT OUTER JOIN `roomtime` rt ON rt.id = l.roomtimeID
LEFT OUTER JOIN `rooms` r ON r.id = rt.room
LEFT OUTER JOIN `schools` s ON s.id = r.school
LEFT OUTER JOIN `users` u ON u.id = ul.user
WHERE rt.timestart >= "%s" AND rt.timestart < "%s" AND (ul.status = 2 OR ul.status = 1)
AND s.id = ' . $CURRENTSCHOOL . ' 
AND l.lesson_type != 3 AND u.userTypeID != 17
GROUP BY `ul`.user
ORDER BY count DESC';

$format = 'Y-m-d';

function getLink ($info) {
    global $CURRENTSCHOOL;
    global $CURRENTTYPE;
    global $CURRENTPAGE;
    
    $link = '?page=' . (isset($info['page']) ? $info['page'] : $CURRENTPAGE)
            . '&type=' . (isset($info['type']) ? $info['type'] : $CURRENTTYPE)
            . '&school=' . (isset($info['school']) ? $info['school'] : $CURRENTSCHOOL);
    
    return $link;
}


$weeksToDisplay = 6;
$nowW = date('w');
if ($nowW == 0) {
    $nowW = 7;
}
$nowW --;

$nowD = date('j');

$nowD --;

$currentWeekStart = strtotime('-' . $nowW . ' days');
$currentMonthStart = strtotime('-' . $nowD . 'days');

$schools = DBmanager::getTable('schools');


function getTable($from, $to) {
    global $sql;
    $data = array(
        'from' => date('d.m.Y', strtotime($from)),
        'to' =>  date('d.m.Y', strtotime($to. ' -1 day')),
        'noTrialCount' => 0, 
        'noDiscursion' => 0, 
        'users' => array(),
        'allVisits' => 0
    );
    //2014-06-02 06:00:00
    $q = sprintf($sql, $from, $to);
    $res = mysql_query($q) or die (mysql_error() . '<br>' . $q);
    while($row = mysql_fetch_assoc($res)) {
        $data['noDiscursion'] ++;
        $data['allVisits'] += $row['count'];
        $data['users'][] = $row;
    }
    
    
    $html = '<table style="float: left;">';
    $html .= '<tr><td colspan="3" style="text-align: center; font-weight: bold">' . $data['from'] . ' - ' . $data['to'] . '</td></tr>'; 
    $html .= '<!--<tr><td colspan="2">Всего</td><td>' . $data['allCount'] . '</td></tr>';
    $html .= '<tr><td colspan="2">Без пробных</td><td>' . $data['noTrialCount'] . '</td></tr>!-->';
    $html .= '<tr><td colspan="2">Уникальных студентов</td><td>' . $data['noDiscursion'] . '</td></tr>';
    $html .= '<tr><td colspan="2">Посещений на 1 студ.</td><td>' . ($data['noDiscursion'] > 0 ? round($data['allVisits'] / $data['noDiscursion'], 2) : '0') . '</td></tr>';
    $html .= '<tr><td colspan="2">Посещений всего</td><td>' . $data['allVisits'] . '</td></tr>';
    $html .= '<tr class="users" style="font-weight: bold"><td># Договора</td><td>Имя</td><td>Кол-во посещений</td></tr>';
    
    for ($i = 0, $n = count($data['users']); $i < $n; $i++) {
        $html .= '<tr class="users"><td>' . $data['users'][$i]['contractNumber'] . '</td><td>' . $data['users'][$i]['login'] . '. ' . $data['users'][$i]['lastName'] . '</td><td>' . $data['users'][$i]['count'] . '</td></tr>';
    }
    $html .= '</table>';
    return $html;
}

?>
<html>
    <head>
        <title>Статистика посещений</title>
        <style>
            body, table tr td {
                font-family: Verdana; font-size: 12px;
            }
            table {
                margin: 8px;
                border-left: 1px solid #ccc;
                border-top: 1px solid #ccc;
                border-collapse: collapse;
            }
            table tr td{
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                padding: 1px 4px;
            }
            table tr.users td {
                font-size: 10px;
            }
            
            table.last-changes {
                width: 900px;
                margin: 20px auto 0 auto;
            }
            table.last-changes tr td {
                padding: 5px;
            }
            a {
                color: #0464BB;
            }
        </style>
    </head>
    <body>
        <div style="padding: 10px 0 20px 10px; font-size: 18px; border-bottom: 1px solid #ccc; margin-bottom: 8px;">
            <a href="<?php echo getLink(array('page' => '')) ?>" style="display: inline-block; margin-right: 40px; <?php echo ($_GET['page'] != 'last_changes' ? 'font-weight: bold;' : ''); ?>">Статистика посещений</a>
            <a href="<?php echo getLink(array('page' => 'last_changes')) ?>" style="display: inline-block; <?php echo ($_GET['page'] == 'last_changes' ? 'font-weight: bold;' : ''); ?>">Последние изменення</a>
        </div>
        <div style="padding: 0 0 8px 10px; border-bottom: 1px solid #ccc;">
            <?php 
                if ($CURRENTPAGE != 'last_changes') {
            ?>
            <a href="<?php echo getLink(array('type' => 'week')) ?>" <?php echo ($CURRENTTYPE != 'month') ? 'style="font-weight: bold"' : ''; ?>>По неделям</a> | <a href="<?php echo getLink(array('type' => 'month')) ?>" <?php echo ($CURRENTTYPE == 'month') ? 'style="font-weight: bold"' : ''; ?>>По месяцам</a> <div style="display:inline-block; width: 50px;"></div>
            <?php 
                }
            ?>
            Школа: 
            <?php
                for ($i = 0, $n = count($schools); $i < $n; $i++) {
                    $style = ($CURRENTSCHOOL == $schools[$i]['id'] ? 'style="font-weight: bold"' : '');
                    echo '<a href="' . getLink(array('school' => $schools[$i]['id'])) . '" ' . $style . '>' . $schools[$i]['name'] . '</a> | ';
                }
            ?>
        </div>
        <div style="width: 2130px">
            
        <?php
            if ($CURRENTPAGE == 'last_changes') {
        ?>
            <table class='last-changes'>
                <tr style='font-weight: bold'>
                    <td>id</td>
                    <td>Login</td>
                    <td># договора</td>
                    <td>Абонемент</td>
                    <td>ФИО</td>
                    <td>Дата изменений</td>
                </tr>
        <?php
                $q = 'SELECT u.*, ut.name as userTypeName FROM ' . cnf::$db_prefix .'`users` u'
                        . ' LEFT OUTER JOIN `usertypes` ut ON ut.id = u.userTypeID'
                        . ' WHERE u.school = ' . $CURRENTSCHOOL . ' AND u.`modificationDate` > "' . date('Y-m-d 00:00:00', strtotime('-1 month')) . '"'
                        . ' ORDER BY u.`modificationDate` DESC';
                
                $res = DBmanager::doQuery($q);
                
                while ($row = mysql_fetch_assoc($res)) {
                    echo '<tr><td>' . $row['id'] . '</td><td>' . $row['login'] . '</td><td>' . $row['contractNumber'] . '</td><td>' . $row['userTypeName'] . '</td><td>' . $row['lastname'] . ' ' . $row['firstname'] . '</td><td>' . $row['modificationDate'] . '</td></tr>';
                }
        ?>
            </table>
        <?php
            } else {
        ?> 
            <div style="padding: 8px 10px 0 8px; color: #cc0033">В статистике не учтены Пробные абонементы и Дискуссии!</div>
            <?php 

                for ($i = 0; $i < $weeksToDisplay; $i++) {
                    if ($_GET['type'] == 'month') {
                        $from = date($format, strtotime('-' . $i . ' month', $currentMonthStart));
                        $to = date($format, strtotime('-' . $i . ' month +1 month', $currentMonthStart));
                    } else {
                        $from = date($format, strtotime('-' . $i . ' weeks', $currentWeekStart));
                        $to = date($format, strtotime('-' . $i . ' weeks +7 days', $currentWeekStart));
                    }
                    echo getTable($from, $to);
                }

            ?>
            <div style="clear: both; "></div>
        <?php
            }
        ?>
        </div>
    </body>
</html>


