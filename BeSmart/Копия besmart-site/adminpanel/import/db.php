<?php


include '../../core/cnf.php';

$db_old = 'besmart_old';
$db_new = cnf::$db_name;

// Try Connect into DB
$db_inst = mysql_connect(cnf::$db_host, cnf::$db_user, cnf::$db_pass) or die('DB connection failed');

// Select DB
//mysql_select_db(cnf::$db_name, $db_inst) or die('Can\'t change DB');

// Set charset
mysql_query('SET NAMES "utf8";');
mysql_query('SET CHARACTER SET "utf8";');
mysql_query('SET SESSION collation_connection = "utf8_general_ci";');


?>
