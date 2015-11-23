<?php

include_once '../core/preinit.php';
include_once '../core/constants.php';
include_once '../core/Mailer.php';
include_once '../core/DBmanager.php';
include_once '../core/functions.php';
include_once 'db.php';

DBmanager::init();

$deps = DBmanager::getTable('departments', 0, null, 'code');

if ($_REQUEST['department']) {
    switch ($_REQUEST['department']) {
        case 1:
            $department = 'kiev';
            break;
        case 2:
            $department = 'dnepr';
            break;
        case 3: 
            $department = 'kz';
            break;
    }
} else if ($_GET['dep']) {
    $department = $_GET['dep'];
}

if (isset($deps[$department])) {
    SystemSettings::set('DEPARTMENT', $deps[$department]['id']);
} else {
    SystemSettings::set('DEPARTMENT', 1);
}

$callback = $_REQUEST['callback'];
$entity = $_GET['entity'];
$act = $_GET['action'];
if ($entity) {
    $entity_path = $_SERVER['DOCUMENT_ROOT'] . '/adminpanel/datahandlers/' . $entity . '.php';
    if (file_exists($entity_path)) {
        include $entity_path;
    }
}

$output['department'] = SystemSettings::getByName('DEPARTMENT');
//start output
if ($callback) {
    header('Content-Type: text/javascript');
    echo $callback . '(' . json_encode($output) . ');';
} else {
    header('Content-Type: application/x-json');
    echo json_encode($output);
}
?>
