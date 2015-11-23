<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TopMenu
 *
 * @author Мой дом-моя крепость
 */
class TopMenu implements iWidget {
    public static function render($var = null) {
        if (is_array($var)) {
            $menu = array(
                array(
                    'href' => '/children',
                    'text' => 'ДЕТИ'
                ),
                array(
                    'href' => '/schedule',
                    'text' => 'РАСПИСАНИЕ'
                ),
                array(
                    'href' => '/abonementy',
                    'text' => 'ЦЕНЫ'
                ),
                array(
                    'href' => '/testy',
                    'text' => 'ТЕСТЫ'
                ),
                array(
                    'href' => '/franchising',
                    'text' => 'ФРАНЧАЙЗИНГ'
                ),
                array(
                    'href' => '/otzyvy',
                    'text' => 'ОТЗЫВЫ'
                ),
                array(
                    'href' => '/news',
                    'text' => 'НОВОСТИ'
                ),
                array(
                    'href' => '/kontakty',
                    'text' => 'КОНТАКТЫ'
                )
            );
            $info = $var['info'];
        }
        echo '<div id="top_menu">
    <div class="login_form">
        <div class="page_field">
            <a href="/" ><div class="logo" style="position: fixed"></div></a>
            <div class="new_login">
                <div style="padding-left: 175px;">';
        Widget::renderWidget('TopLogin', $info);
                echo '</div>
            </div>
            <div style="float:left; width: 120px; text-align: right; overflow: hidden; height: 28px;" class="sociallinks">
                <a href="http://www.facebook.com/BeSmartEnglishCommunity" target="_blank"><img height="24" style="padding-top: 2px" src="/templates/general/images/facebook.png" /></a><a href="http://vk.com/besmart_englishcommunity" target="_blank"><img height="24" style="padding-top: 4px" src="/templates/general/images/vk.png" /></a><a href="http://www.youtube.com/channel/UCWAuKeddVnbgCg1IHNMrCyQ?feature=watch" target="_blank"><img height="24" style="padding-top: 4px" src="/templates/general/images/youtube.png" /></a><a href="http://instagram.com/besmart_englishcommunity" target="_blank"><img height="24" style="padding-top: 4px" src="/templates/general/images/instagram_icon.jpg" /></a>
            </div>
            <div class="clr"></div>
        </div>
    </div>
    <div class="hmenu">
        <div class="page_field"><ul>';
        if (is_array($menu)) {
            for ($i = 0, $n = count($menu); $i <$n; $i++) {
                echo '<li><a class="menuitemlink" href="' . $menu[$i]['href'] . '" pageindex="' . $menu[$i]['pageindex'] . '">' . $menu[$i]['text'] . '</a></li>';
            }
        }
        echo '</ul></div></div></div>';
    }
}
