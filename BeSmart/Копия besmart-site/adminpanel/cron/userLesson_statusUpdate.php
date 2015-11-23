<?php
include '/home/besmarti/public_html/core/DBmanager.php';
DBmanager::init();
set_time_limit(600);


$q = sprintf("UPDATE `userlesson` ul 
    LEFT OUTER JOIN `lessons` l ON l.id = ul.lesson
    LEFT OUTER JOIN `roomtime` rt ON rt.id = l.roomtimeID
    SET `ul`.`status` = '2'
    WHERE `rt`.timestart <= '%s' AND ul.status = '1'",
    date('Y-m-d H:i:00'));


DBmanager::doQuery($q);

echo "<div style='font-family: Tahoma;'><table border=1 cellpadding=5 style='font-size: 14px;'>"
. "<tr><td style='font-weight: bold'>SQL query</td><td>$q</td></tr>"
. "<tr><td style='font-weight: bold'>Rows updated</td><td>" . mysql_affected_rows() . "</td></tr><table></div>";
