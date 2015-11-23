<?php

include './db.php';

$res = mysql_query('SELECT * FROM `' . $db_old . '`.`nv_orders`') or die(mysql_error());

$q = 'INSERT INTO `' . $db_new .'`.`orders`(id, `name`, `email`, `tel`, `order_time`, `read`) VALUES';

$i = 0;
while($row = mysql_fetch_assoc($res)) {
    $i++;
    if ($i > 1) $q .= ',';
    $q .= sprintf('(%d, "%s", "%s", "%s", "%s", "%s")
        ',
            $row['id'],
            mysql_real_escape_string($row['name']),
            mysql_real_escape_string($row['email']),
            mysql_real_escape_string($row['tel']),
            mysql_real_escape_string($row['order_time']),
            mysql_real_escape_string($row['read'])
        );
}

mysql_query($q) or die(mysql_error());
?>
