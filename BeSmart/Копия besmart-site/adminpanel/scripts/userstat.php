<?phpdie();
header('Content-type: text/html; charset=utf-8');
include_once '../../core/DBmanager.php';
DBmanager::init();

$payments = DBmanager::getTable('payments', 0, null, 'user', true);
$userlessons = DBmanager::getUserLessons(array(
    'status' => 2
));
$uls = array();

$accTypes = array();

for ($i = 0, $n = count($userlessons); $i < $n; $i++) {
    if (!$uls[$userlessons[$i]['user']]) {
        $uls[$userlessons[$i]['user']] = array();
    }
    $uls[$userlessons[$i]['user']][] = $userlessons[$i];
}

$weekDays = array(
    '8' => 3,   // REGULAR 
    '2' => 5,   // UNLIMITED
    '7' => 2    // BASIC
);

$users = DBmanager::getUser(array(
    'school' => array(1, 2),
    'userTypeID' => array(2, 7, 8)
));

$html = '<table><tr><td>ID</td><td>name</td><td>Тип абонемента</td><td>Статус</td><td>Дней пройдено</td><td>Дней оплачено</td><td>Нужно оплатить</td><td>Осталось дней</td></tr>';
for ($i = 0, $n = count($users); $i < $n; $i++) {
    $daysPayed = 0;
    $daysToPay = 0;
    $user = $users[$i];
    $userID = $user['id'];
    $isActive = (!$user['availableTo'] || strtotime($user['availableTo']) > time());
    $tmp = array();
    $cls = '';
    $toADD = array();
    $q = '';
    
    $ul = $uls[$userID];
    
    for ($i2 = 0, $n2 = count($ul); $i2 < $n2; $i2++) {
        $d = date('Y-m-d', strtotime($ul[$i2]['timestart']));
        if (!in_array($d, $tmp)) {
            $tmp[$d] = $ul[$i2];
        }
    }
    
    $visitedDays = count($tmp);
    
    $pays = $payments[$userID];
    
    if (is_array($pays)) { 
        foreach ($pays as $key => $pay) {
            $daysPayed += $pay['days'];
        }
    }
    
    $daysToPay = $visitedDays - $daysPayed;
        
    if (!$isActive) {
        $cls = 'inactive';
    }
    
    if ($daysToPay > 0) {
        $toADD[] = '(' . $userID . ', "' . date('Y-m-d') . '", 0, "Обнуление", ' . $daysToPay . ')';
    }
    if ($isActive) {
        $calendarDays = date_diff(new DateTime(date('Y-m-d')), new DateTime($user['availableTo']))->days;
        $weeks = ceil($calendarDays / 7);
        $daysLeft = $weeks * $weekDays[$user['userTypeID']];
        
        if ($daysToPay >=0 && $daysLeft) {
            $toADD[] = '(' . $userID . ', "' . date('Y-m-d') . '", 0, "Перевод на новый тариф", ' . $daysLeft . ')';
        }

        $html .= '<tr class="' . $cls . '"><td>' . $userID . '</td><td>' . $user['lastname'] . '</td><td>' . $user['userTypeName'] . '</td><td>' . ($isActive ? 'ACTIVE' : 'not active') . '</td><td>' . $visitedDays . '</td><td>' . $daysPayed . '</td><td>' . $daysToPay . '</td><td>' . $daysLeft . '</td></tr>';
    }
    
    if (count($toADD)) {
        $q = 'INSERT INTO `payments`(`user`, `date`, `amount`,`comment`, `days`) VALUES' . implode(',', $toADD);
        
        
        $html .= '<tr class="inactive"><td colspan="8">' . $q . '</td></tr>';
        
        DBmanager::doQuery($q);
    }
    if ($isActive) {
        DBmanager::updateUsers($userID, array(
            'userTypeID' => 33,
            'availableTo' => null,
            'blockedTill' => null
        ));
    }
}

$html .= '</table>';



?>

<style>
    table {
        font: 500 12px Arial;
        border-right: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
    }
    table tr td{
        padding: 2px 5px;
        border-left: 1px solid #aaa;
        border-top: 1px solid #aaa;
    }
    .inactive {
        color: #ccc;
    }
</style>

<?php
echo $html;
?>