<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Footer
 *
 * @author Мой дом-моя крепость
 */
class Footer implements iWidget {
    public static function render($var = null) {
        
        
        echo '<div class="footer_bg"><div id="footer_bottom">
            <!-- right menu !-->
            <div class="footer_menu">
                <div class="footer_menu_inner">
                    <ul class="menu">
                        <li><a href="/abonementy">Цены</a></li>
                        <li><a href="/teachers">Преподаватели</a></li>
                        <li><a href="/kontakty">Контакты</a></li>
                    </ul>
                    <ul class="menu">
                        <li><a href="/news">Новости</a></li>
                        <li><a href="/otzyvy">Отзывы</a></li>
                        <li><a href="/franchising">Франчайзинг</a></li>
                    </ul>
                    <div class="clr"></div>
                </div>
            </div>
            <!-- order form !-->
            <div class="main_order_form">
                <div class="main_order_form_inner">
                    <form action="new_order" class="proxyform">
                        <div class="main_order_form_header"><b>БЕСПЛАТНЫЙ</b> абонемент<br/></div>
                        <div class="main_order_form_line">
                            ВЫБЕРИТЕ ФИЛИАЛ:<br/>' . self::getSchoolCombo() . '
                        </div>
                        <div class="main_order_form_line">
                            ИМЯ И ФАМИЛИЯ:<br/>
                            <input type="text" name="name" required="1" errortext="Вы не указали ваше имя"/>
                        </div>
                        <div class="main_order_form_line">
                            E-MAIL:<br/>
                            <input type="text" name="email" required="1" errortext="Вы не указали ваш e-mail"/>
                        </div>
                        <div class="main_order_form_line">
                            ТЕЛЕФОН:<br/>
                            <input type="text" name="tel"  required="1" errortext="Вы не указали ваш телефон"/>
                        </div>
                        <div style="text-align: center; padding-top: 10px;">
                            <div class="new_button white submitbutton" progresstext="Отправка...">Отправить</div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="clr" style="padding-bottom: 10px; text-align: center; color: #fff">
                '. date('Y').' &#9426; Be Smart English Community
            </div>
        </div></div>';
    }
    
    public static function getSchoolCombo () {
        $schools = DBmanager::getTable('schools');
        $html = '<select name="school">';
        
        for ($i = 0, $n = count($schools); $i < $n; $i++) {
            if ($schools[$i]['department'] == 2) {
                continue;
            }
            
            $html .= '<option value="' . $schools[$i]['id'] . '">' . $schools[$i]['name'] . '</option>';
        }
        
        $html .= '</select>';
        return $html;
    }
}