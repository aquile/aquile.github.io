<?php
include './db.php';

$users = array();
$res = mysql_query('SELECT * FROM `' . $db_old . '`.`nv_users`') or die(mysql_error());

while($row = mysql_fetch_assoc($res)) {
    $users[] = $row;
}


$q = 'INSERT INTO `' . $db_new . '`.`users`(id, login, pass, firstname, lastname, tel, email, level, userTypeID) VALUES';

for ($i = 0, $n = count($users); $i < $n; $i++) {
    $user = $users[$i];
    if ($i > 0) $q .= ',';
    $q .= sprintf('(%d, "%s", "%s", "%s", "%s", "%s", "%s", %d, %d)',
            $user['id'],
            $user['login'],
            $user['pass'],
            $user['firstname'],
            $user['lastname'],
            $user['tel'],
            $user['email'],
            $user['level'],
            $user['ptype']
            );
}

mysql_query($q) or die(mysql_error());
?>
