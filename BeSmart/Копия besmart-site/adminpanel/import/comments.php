<?php

include './db.php';

$res = mysql_query('SELECT * FROM `' . $db_old . '`.`nv_comments`') or die(mysql_error());

$q = 'INSERT INTO `' . $db_new .'`.`comments`(id, `page`, `posted_time`, `name`, `content`, `rating`, `read`, `answer`) VALUES';

$i = 0;
while($row = mysql_fetch_assoc($res)) {
    $i++;
    if ($i > 1) $q .= ',';
    $q .= sprintf('(%d, "%s", "%s", "%s", "%s", "%s", "%s", "%s")
        ',
            $row['id'],
            mysql_real_escape_string($row['page']),
            mysql_real_escape_string($row['posted_time']),
            mysql_real_escape_string($row['name']),
            mysql_real_escape_string($row['content']),
            mysql_real_escape_string($row['rating']),
            mysql_real_escape_string($row['read']),
            mysql_real_escape_string($row['answer'])
        );
}

mysql_query($q) or die(mysql_error());
?>
