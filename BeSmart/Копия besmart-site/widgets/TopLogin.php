<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TopLogin
 *
 * @author Мой дом-моя крепость
 */
class TopLogin implements iWidget {
    public static $levels = array(
        0 => '/schedule',
        1 => '/schedule/elementary',
        2 => '/schedule/pre-intermediate',
        3 => '/schedule/intermediate',
        4 => '/schedule/upper-intermediate',
        6 => '/schedule/beginner',
        7 => '/schedule/5-6',
        8 => '/schedule/7-9',
        9 => '/schedule/10-13',
        10 => '/schedule/14-15'
    );
    
    public static function render($page_info = null) {
        if (User::$authorized) {
            echo self::getHTML(User::$userInfo);
        } else {
            echo self::getLoginForm();
        }
    }
            
    private static function getLoginForm () {
        return '<div id="login_form">
            <form action="login" onsuccess="window.location.reload()" class="proxyform">
                <input type="hidden" name="SID" value="'. session_id() . '"/>
                Логин: <input type="text" name="login" required="1" errortext="Вы не указали ваш логин"/>
                Пароль: <input type="password" name="pass" required="1" errortext="Вы не ввели пароль"/> | <button style="padding: 2px 5px" href="javascript:void(0)" class="submitbutton" progresstext="Вход...">Вход</button>
            </form>
        </div>';
    }

    public static function getUserMenu($user_info) {
        return '<ul class="main_menu menu">
            <li class="top_menu_item calendar_reg"><a href="' . self::$levels[$user_info['level']] . '">Регистрация на занятие</a></li>
            <li class="top_menu_item my_lessons"><a href="/my_lessons">Мои занятия </a></li>
            <li class="top_menu_item kabinet"><a href="/account">Мой профиль</a></li>
            </ul>';
    }
    public static function getHTML($user_info) {
        $menu = $user_info['userTypeID'] == 9 ? self::getTeacherMenu($user_info) : self::getUserMenu($user_info);
        return '<div class="user_info"><div style="float: left">' . $menu . '</div>
            <div style="float: right; height: 33px;"><form action="logout" class="proxyform" onFinish="window.location.reload()"><span class="user_name_string">' . $user_info['firstname'] . ' ' . $user_info['lastname'] . '</span> <span style="display: inline-block; overflow: hidden"> (' . $user_info['login'] . ') | <a href="javascript:void(0)" class="submitbutton">Выход</a></span></form></div><div class="clr"></div></div>';
    }
    
    public static function getTeacherMenu ($teacher_info) {
        return '<ul class="main_menu menu">
            <li class="top_menu_item calendar_reg"><a href="/teacher_planner">Мое расписание</a></li>
            <li class="top_menu_item kabinet"><a href="/teacher_statistics">Статистика</a></li>
            </ul>';
        
    }
}

?>
