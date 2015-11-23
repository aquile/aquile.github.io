<?php

include './db.php';

$res = mysql_query('SELECT * FROM `' . $db_old . '`.`nv_testresult`') or die(mysql_error());

$q = 'INSERT INTO `' . $db_new .'`.`testresult`(id, level, name, tel, email, time) VALUES';

$i = 0;
while($row = mysql_fetch_assoc($res)) {
    $i++;
    if ($i > 1) $q .= ',';
    $q .= sprintf('(%d, %d, "%s", "%s", "%s", "%s")',
            $row['id'],
            $row['level'],
            $row['name'],
            $row['tel'],
            $row['email'],
            $row['time']
        );
}

mysql_query($q) or die(mysql_error());
?>
