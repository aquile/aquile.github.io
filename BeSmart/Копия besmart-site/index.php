<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
session_start();

require_once 'core/constants.php';
require_once 'core/functions.php';
require_once 'core/Router.php';
require_once 'core/DBmanager.php';
require_once 'core/User.php';
require_once 'core/Template.php';
require_once 'core/Widget.php';

header("Content-type: text/html; charset=utf-8");

//$r = new DBmanager();
new Router();

?>