<?php

include_once 'phpmailer/class.phpmailer.php';

/**
 * Description of Mailer
 *
 * @author Viktor Protsenko <pro.victorr@gmail.com>
 */
class Mailer {
    public static $ORDER = 1;
    public static $CALLBACK = 2;
    public static $COMMENT = 3;
    public static $LESSON_REG = 4;
    public static $USER_REG = 5;
    public static $TEST_FINISHED = 6;
    public static $FREE_PLACE = 7;
    public static $TEACHER_COMMENT = 8;
    public static $CHECKLESSONS = 9;
    public static $LESSONCREATED = 10;
    public static $TEST_FINISHED_GOV = 11;
    
    public static $emails = array(
       'general' => array(
            'dir@besmart.in.ua',
            'protsenko.victor@gmail.com',
        ),
       'order' => array(
            'dir@besmart.in.ua',
            'zakaz@besmart.in.ua',
            'protsenko.victor@gmail.com',
            'ira@besmart.in.ua',
            'admin@besmart.in.ua'
        ),
        'orderdnepr' => array(
            'dir@besmart.in.ua',
            'dnepr@besmart.in.ua',
            'protsenko.victor@gmail.com'
        ),
        'orderkz' => array(
            'info@bsec.kz',
            'protsenko.victor@gmail.com'
        ),
        'orderchild' => array(
            'besmartmetodist@gmail.com',
            'protsenko.victor@gmail.com'
        ),
        'schedule' => array(
            'dir@besmart.in.ua',
            'le@besmart.in.ua',
            'admin@besmart.in.ua',
            'protsenko.victor@gmail.com'
        )
   );

    private static $field_mapping = array(
            'name'      => 'Имя',
            'tel'       => 'Телефон',
            'email'     => 'e-mail',
            'comment'   => 'Комментарий',
            'user_name' => 'Имя',
            'user_tel'  => 'Телефон',
            'user_mail' => 'e-mail',
            'comments'  => 'Комментарии',
            'name'      => 'Имя',
            'rating'    => 'Оценка',
            'page'      => null,
            'content'   => 'Комментарий',
            'read'      => null,
            'topic'     => 'Тема',
            'lesson_name'=>'Тип урока',
            'lesson_time'=>'Время начала занятия',
            'login'     => 'Логин',
            'pass'      => 'Пароль',
            'level'     => 'Уровень',
            'rating'    => 'Оценка',
            'room'      => 'Аудитория',
            'teacher'   => 'Преподаватель',
            'abtype'    => 'Тип абонемента',
            'school'    => 'Школа'
    );
    
    public static function sendEmail($type, $data, $email = null) {
        $mail = new PHPMailer();
        $emailList = array();
        $emailsCount = 0;
        if (!$email) {
            $emailList = self::$emails[(($type === self::$ORDER || $type === self::$TEST_FINISHED) ? 'order' : 'general')];
        } else if (is_array($email)) {
            $emailList = $email;
        } else if (is_string($email)){
            $emailList[] = $email;
        } else {
            return;
        }
        $pars = self::getParamsByType($type, $data);
        $replyTo = ($data['email'] || $data['user_mail']);
        if (!PHPMailer::ValidateAddress($replyTo)) {
            $replyTo = cnf::$email_from;
        }
        if(!count($emailList)) {
            return;
        }
        try {
            $mail->SetFrom(cnf::$email_from, cnf::$mailer['companyName']);
            $mail->AddReplyTo($replyTo);
            
            foreach ($emailList as $value) {
                if (PHPMailer::ValidateAddress($value)) {
                    $mail->AddBCC($value);
                    $emailsCount++;
                }
            }
            if (!$emailsCount) {
                return;
            }
            $mail->Subject = $pars['subject'];
            $mail->Body = $pars['body'];
            $mail->isHTML(true);
            $mail->Send();
            $mail->ClearAddresses();
        } catch (phpmailerException $e) { } catch (Exception $e) { }
    }
    
    private static function getParamsByType ($type, $data){
        $subject = 'Default subject';
        $body = 'Default body';
        $res = self::createTableFromObject($data);
        switch ($type) {
            case self::$ORDER: 
                $subject = 'Заказ абонемента #' . $data['id'];
                $body    = '<h2>Заказ абонемента #' . $data['id'] . '</h2><div>'.$res['res'].'</div>';
                break;
            case self::$CALLBACK :
                $subject = 'Перезвоните мне';
                $body    = '<h2>Запрос "Перезвоните мне"</h2><div>'.$res['res'].'</div>';
                break;
            case self::$COMMENT :
                $subject = 'Новый Комментарий';
                $body    = '<h2>Новый комментарий</h2><div>'.$res['res'].'</div>';
                break;
            case self::$LESSON_REG:
                $subject = 'Регистрация на урок';
                $body    = '<div>Вы успешно зарегистрировались на урок:</div><br/><div>'.$res['res'].'</div>';
                break;
            case self::$USER_REG:
                $subject = 'Регистрация';
                $body    = '<p>Здравствуйте, ' . $data['firstname'] . ' ' . $data['lastname'] . '</p>
<p>Вас приветствует школа английского языка "BE SMART English Community"!</p>
<p>Для входа в свой личный кабинет и регистрации на занятия используйте следующую информацию:
<ul>
<li>Сайт: <a href="http://www.besmart.in.ua/login">http://www.besmart.in.ua/login</a></li>
<li>Логин: ' . $data['login'] . '</li>
<li>Пароль: ' . $data['pass'] . '</li>
</ul>
</p>

<p style="padding-top:40px">
<a href="https://www.youtube.com/watch?v=DGjAgTSuT7o">Видео презентация</a>
Сайт "<a href="http://www.besmart.in.ua/">BE SMART English Community Ukraine</a>"<br/>
Сайт "<a href="http://bsec.kz/">BE SMART English Community Kazakhstan</a>"
</p>
 
<p style="padding-top: 20px">
<div><b><u>Почему выбирают BE SMART?</u></b></div>
1) <b>Удобное расписание</b>: Посещай любое количество занятий в удобное для тебя время, выбирая преподавателя и тему занятия.<br/>
2) <b>Интенсивность обучения</b>: Выбирай комфортную для себя интенсивность посещения. Можешь занимать один раз в неделю или хоть каждый день и целый день.<br/>
3) <b>Свободный старт</b>: Не нужно ждать набора группы. Приступи к изучения сразу после получения своего абонемента.<br/>
4) <b>Результат не избежен</b>: ты всегда сможешь бесплатно повторить курс обучения если что-то тебе помешало осилить его с первого раза.<br/>
</p> 

<p style="padding-top: 20px">
<div><b><u>Чем ты можешь заниматься в BE SMART?</u></b></div>
1) Изучай английский в группах до 8 человек;<br/>
2) Практикуй английский ежедневно с носителями языка на дискуссиях;<br/>
3) Играй в игры и отвлекайся от серых будней с друзьями;
</p>
<p> 
<div style="padding-top: 40px"><u><b>Контакты школ английского языка:</b></u></div>
Украина, Киев, Тимошенко 18. тел (044)222-88-77, (066)001-97-94, (067)247-67-27<br/>
Украина, Киев, Горького 48-б, оф.13. тел (044)222-88-77, (066)001-97-94, (067)247-67-27
</p>';
                break;
            case self::$TEST_FINISHED:
                $subject = 'Новая заявка(После теста) #' . $data['id'];
                $body    = '<h2>Новая заявка(После теста) #' . $data['id'] . '</h2><div>'.$res['res'].'</div>';
                break;
            case self::$TEST_FINISHED_GOV:
                $subject = 'Тест успешно пройден';
                $body    = '<p>Поздравляем, Вы успешно прошли тест!</p><br/><div>'.$res['res'].'</div>';
                break;
            case self::$FREE_PLACE:
                $subject = 'Доступное место';
                $body    = '<div>Появилось доступное место на урок:</div><br/><div>'.$res['res'].'</div>';
                break;
            case self::$TEACHER_COMMENT:
                $subject = 'Отзыв о Вас';
                $body    = '<div>О Вас был оставлен отзыв на сайте <a href="http://www.besmart.in.ua">http://www.besmart.in.ua</a></div><br/><div>'. $res['res'].'</div><br/><a href="http://www.besmart.in.ua/teachers/info/' . $data['id'] . '">Просмотреть все отзывы о Вас</a>';
                break;
            case self::$CHECKLESSONS:
                $subject = 'Отмена уроков';
                $body = 'Следующие уроки были отменены: <br/><br/>';
                
                for ($i = 0, $n = count($data); $i < $n; $i++) {
                    $tmp = self::createTableFromObject($data[$i]);

                    $body .= $tmp['res'] . '<hr/>';
                }
                    
                break;
            case self::$LESSONCREATED:
                $tmp = self::createTableFromObject($data);
                $subject = 'Урок активирован: ' . $data['lesson_name'] . ', ' . $data['lesson_time'];
                $body = '<p>Уважаемый участник <a href="http://www.besmart.in.ua">English Community BE SMART</a>!</p>
<p>Урок, на который Вы подавали заявку был АКТИВИРОВАН</p>
<p>Детали урока:</p> ' . $tmp['res'] . '    
<p><a href="http://www.besmart.in.ua/schedule">Перейти к расписанию</a></p>
<br/>
<p><b>ВНИМАНИЕ</b>: Отказаться от данного урока можно не позже чем за <strong>24</strong> часа до его начала</p>';
                break;
        }
        
        $body = $res['css'] . $body;
        $subject = cnf::$mailer['companyName'] . ' ::: ' . $subject;

        return array('subject' => $subject, 'body' => $body);
    }
    
    
    private static function createTableFromObject ($data){
        $css = '<style>*{ font: 500 12px Tahoma; } h2 { text-transform: uppercase; font-size : 18px; font-weight: bold; color: #333; } table { box-shadow: 2px 2px 5px #555; width: 100%; border-top: 1px solid #bbb; border-left: 1px solid #bbb; } table tr td { border-right: 1px solid #bbb; border-bottom: 1px solid #bbb; } .label { background: #eee; width: 150px; font-weight: bold}</style>';
        $res = '<table cellpadding="8" cellspacing="0">';
        foreach($data as $key => $value){
            $name = self::$field_mapping[$key];
            if ($name) {
                $res .= '<tr><td class="label">'.$name.'</td><td class="value">'.nl2br($value).'</td></tr>';
            }
        }
        $res .= '</table>';
        
        return array('res' => $res, 'css' => $css);
    }
}
?>