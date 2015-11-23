<?php
/**
 * Для отправки запроса нужно просто создать форму с классом proxyform
 * Значение полей придей сюда в массиве, где ключ - это название поля
 * <form action="{$action}" class="proxyform" successtext="succes text" failuretext="Some failure text">
 *     <input name="$_POST['somename']" required="1" errortext="Some error text"/>
 *     <SOMETAG class="submitbutton"></SOMETAG>
 * </form>
 *
 * @author Viktor Protsenko <pro.victorr@gmail.com>
 */
include_once '../core/preinit.php';
include_once '../core/functions.php';

require_once '../core/DBmanager.php';
require_once '../core/Mailer.php';
require_once '../core/User.php';

DBmanager::init();
User::init();

$action = $_POST['action'];
$success = false;
$info = '';
$tmp;
$emails = null;
$levelNames = array(
    0 => 'Beginner',
    1 => 'Elementary',
    2 => 'Pre-intermediate',
    3 => 'Intermediate',
    4 => 'Upper-intermediate'
);

switch ($action) {
    case 'add_comment': 
        if (!User::$authorized) {
            $info = 'Вы не авторизированы';
        } else if (!is_numeric($_POST['page'])) {
            $info = 'Некорректные данные';
        } else {
            $comment = array(
                'name'      => User::$userInfo['firstname'],
                'rating'    => htmlspecialchars(strip_tags($_POST['rating'])),
                'page'      => htmlspecialchars(strip_tags($_POST['page'])),
                'content'   => nl2br(htmlspecialchars(strip_tags($_POST['content']))),
                'teacherID' => 0,
                'read'      => cnf::$comments['autopublish'],
                'userID'    => User::$userInfo['id']
            );

            if (!$comment['name'] || !$comment['rating'] || !$comment['content'] || !is_numeric($comment['page'])) {
                $info = 'Данные не полные';
                break;
            }
            $success = DBmanager::addCommentRequest($comment);
            if ($success) {
                $info = '<div style="color: green; padding-bottom:5px;">Комментарий успешно отправлен!</div>После проверки администрацией он будет опубликован на сайте';
            } else {
                $info = 'Произошла ошибка - Ваш комментарий не сохранен';
            }
        }
        break;
    case 'new_order':
        $order = array(
            'name' => strip_tags(htmlspecialchars($_POST['name'])),
            'email' => strip_tags(htmlspecialchars($_POST['email'])),
            'tel' => strip_tags(htmlspecialchars($_POST['tel'])),
            'abtype' => $_POST['abtype'] ? strip_tags(htmlspecialchars($_POST['abtype'])) : '-',
            'school' => strip_tags(htmlspecialchars($_POST['school']))
        );
        
        $schools = DBmanager::getTable('schools', 0, null, 'id');
        if ($_POST['type'] == 'children') {
            $emails = Mailer::$emails['orderchild'];
        } else if ($schools[$order['school']]['department'] == 2) {
            $emails = Mailer::$emails['orderdnepr'];
        } else if ($schools[$order['school']]['department'] == 3) {
            $emails = Mailer::$emails['orderkz'];
        }
        $order['school'] = $schools[$order['school']]['name'];
        
        if (!$order['name'] || (!$order['email'] && $_POST['type'] != 'children') || !$order['tel']) {
            $info = 'Отправлены не все обязательные данные';
            break;
        }
        $orderID = DBmanager::addNewOrder($order);
        if ($orderID) {
            $success = true;
            $order['id'] = $orderID;
        }
        if ($success) {
            Mailer::sendEmail(Mailer::$ORDER, $order, $emails);
            $info = 'Ваша заявка успешно отправлена! Мы свяжемся с Вами в ближайшее время';
        } else {
            $info = 'Ошибка при запросе к базе данных! Обратитеть к администратору сайта';
        }
        break;
    case 'login':
        if (session_id() === $_POST['SID']) {
            if ($userINF = User::processLogin($_POST['login'], $_POST['pass'])) {
                include '../core/Widget.php';
                include '../widgets/TopLogin.php';
                $success = true;
//                $info = $userINF[0]['level'];
                $info = TopLogin::$levels[$userINF[0]['level']];
                $hideNotification = true;
            } else {
                $info = 'Логин или пароль введены неправильно';
            }
        } else {
            $info = 'Логин или(и) пароль введены неправильно';
        }
        break;
    case 'logout':
        if (User::processLogout()) {
            $success = true;
//            $info = 'Logout successful';
        }
        break;
    case 'lesson_unvotefornew':
    case 'lesson_unreg':
        if (!User::$authorized) {
            $info = 'Вы не авторизированы';
        } else if (!is_numeric($_POST['lessonID'])) {
            $info = 'Не корректные данные';
        } else {
            $tmp = User::processLessonUnreg($_POST['lessonID']);
            if ($tmp['success']) {
                $success = true;
            } else {
                $info = $tmp['info'];
            }
        } 
        break;
    case 'lesson_reg':
        if (!User::$authorized) {
            $info = 'Вы не авторизированы';
        } else if (!is_numeric($_POST['lessonID'])) {
            $info = 'Не корректные данные';
        } else {
            $tmp = User::processLessonReg($_POST['lessonID']);
            if ($tmp['success']) {
                $success = true;
            } else {
                $info = $tmp['info'];
                $errorno = $tmp['errorno'];
            }
        }
        break;
    case 'lesson_wait':
        if (!User::$authorized) {
            $info = 'Вы не авторизированы';
        } else if (!is_numeric($_POST['lessonID'])) {
            $info = 'Не корректные данные';
        } else {
            $tmp = User::processLessonWait($_POST['lessonID']);
            if ($tmp['success']) {
                $success = true;
            } else {
                $info = $tmp['info'];
            }
        }
        break;
    case 'lesson_unwait':
        if (!User::$authorized) {
            $info = 'Вы не авторизированы';
        } else if (!is_numeric($_POST['lessonID'])) {
            $info = 'Некорректные данные';
        } else {
            $tmp = User::processLessonUnwait($_POST['lessonID']);
            if ($tmp['success']) {
                $success = true;
            } else {
                $info = $tmp['info'];
            }
        }
        break;
    case 'test_finished_gov':
        $data = array(
            'level' => filter_input(INPUT_POST, 'level'),
            'name' => filter_input(INPUT_POST, 'name'),
            'tel' => preg_replace('/\D+/', '', filter_input(INPUT_POST, 'tel')),
            'email' => filter_input(INPUT_POST, 'email'),
            'department' => filter_input(INPUT_POST, 'department'),
            'organization' => filter_input(INPUT_POST, 'organization')
        );
        $orderID = DBmanager::insertNewGovTestRusult($data);
        $data['level'] = $levelNames[$data['level']];
        Mailer::sendEmail(Mailer::$TEST_FINISHED_GOV, $data, $data['email']);
        $_SESSION['gov_test_complete'] = true;
        $hideNotification= true;
        $success = true;
        break;
    case 'test_finished':
        $data = array(
            'level' => $_POST['level'],
            'name' => $_POST['name'],
            'tel' => preg_replace('/\D+/', '', $_POST['tel']),
            'email' => $_POST['email'],
            'school' => $_POST['school']
        );
        
        $orderID = DBmanager::insertNewTestRusult($data);
        if ($orderID) {
            $schools = DBmanager::getTable('schools', 0, null, 'id');
            if ($schools[$data['school']]['department'] == 2) {
                $emails = Mailer::$emails['orderdnepr'];
            } else if ($schools[$data['school']]['department'] == 3) {
                $emails = Mailer::$emails['orderkz'];
            }
            $success = true;
            $info = 'Ваша заявка принята. Мы свяжемся с вами в ближайшее время';
            $data['level'] = $levelNames[$data['level']];
            $data['school'] = $schools[$data['school']]['name'];
            $data['tel'] = $data['tel'] ? $data['tel'] : '-';
            $data['id'] = $orderID;
            
            Mailer::sendEmail(Mailer::$TEST_FINISHED, $data, $emails);

        } else {
            $info = 'Ошибка при записи результата теста в базу данных';
        }
        break;
    case 'add_teacher_comment': 
        if (!User::$authorized) {
            $info = 'Вы не авторизированы';
        } else if (!is_numeric($_POST['teacherID'])) {
            $info = 'Некорректные данные';
        } else {
            $success = DBmanager::addCommentRequest(array(
                'name'      => User::$userInfo['firstname'],
                'rating'    => htmlspecialchars(strip_tags($_POST['rating'])),
                'teacherID' => htmlspecialchars(strip_tags($_POST['teacherID'])),
                'page'      => 0,
                'content'   => nl2br(htmlspecialchars(strip_tags($_POST['content']))),
                'read'      => cnf::$comments['autopublish'],
                'userID'    => User::$userInfo['id']
            ));
            
            // Send email to teacher
            $teacher = DBmanager::getTeachers(array('id' => $_POST['teacherID']));
            
            if (count($teacher)) {
                Mailer::sendEmail(Mailer::$TEACHER_COMMENT, array(
                    'id' => $_POST['teacherID'],
                    'name' => User::$userInfo['firstname'],
                    'rating' => $_POST['rating'],
                    'comment' => $_POST['content']
                ), $teacher[0]['email']);
            }
            if ($success) {
                $info = '<div style="color: green; padding-bottom:5px;">Комментарий успешно отправлен!</div>После проверки администрацией он будет опубликован на сайте';
            } else {
                $info = 'Произошла ошибка - Ваш комментарий не сохранен';
            }
        }
        break;
    case 'lesson_votefornew': 
        if (!User::$authorized) {
            $info = 'Вы не авторизированы';
        } else if (!is_numeric($_POST['lessonID'])) {
            $info = 'Некорректные данные';
        } else {
            $tmp = User::processLessonCreate($_POST['lessonID']);
            if ($tmp['success']) {
                $success = true;
            } else {
                $info = $tmp['info'];
            }
        }
        break;
    case 'answer_poll':
        if (!User::$authorized) {
            $info = 'Вы не авторизированы';
        } else if (!is_numeric($_POST['answer'])) {
            $info = 'Некорректные данные';
        } else {
            $success = true;
            DBmanager::addPollAnswer(User::$userInfo['id'], $_POST['question'], $_POST['answer']);
        }
        break;
    default :
        $info = 'Запрошено неизвестное действие';
        break;
}

$output = array(
    'success' => $success,
    'info' => $info
);

if ($hideNotification) {
    $output['hideNotification'] = true;
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
?>