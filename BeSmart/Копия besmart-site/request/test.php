<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once '../core/preinit.php';
include_once '../core/functions.php';

require_once '../core/DBmanager.php';
require_once '../core/Mailer.php';
require_once '../core/User.php';
require_once '../core/Test.php';


DBmanager::init();
User::init();


$action = $_POST['action'];
$success = false;
$info = '';
$tmp;

if (!User::$authorized) {
    $info = 'Вы не авторизированы';
} else {
    switch($action)  {
        case 'start_test':
            if (is_numeric($_POST['testType'])) {
                $output = Test::start($_POST['testType'], $_POST['testId']);
            } else {
                $info = 'Не указан тип теста';
            }
            break;
        case 'submit_question':
            if (is_numeric($_POST['transactionId']) && is_numeric($_POST['questionId'])) {
                $output = Test::submitQuestion($_POST['transactionId'], $_POST['questionId'], $_POST['answer']);
            } else {
                $info = 'Данные не корректны';
            }
            break;
        default: 
            $info = 'Запрошено неизвестное действие';
            break;
    }
}

if (!$output) {
    $output = array(
        'success' => $success,
        'info' => $info
    );
}

if ($errorno) {
    $output['errorno'] = $errorno;
}

//start output
if ($_REQUEST['callback']) {
    header('Content-Type: text/javascript');
    echo $_REQUEST['callback'] . '(' . json_encode($output) . ');';
} else {
    header('Content-Type: application/x-json');
    echo json_encode($output);
}
