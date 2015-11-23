<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AboutUS
 *
 * @author PC
 */
class SiteBlock implements iWidget {
    private static $texts = array(
        'aboutus' => '<b>English Community "BE SMART"</b> - это место где ты сможешь не только начать говорить на английском языке благодаре эстественной методике изучения английского языка, но и завести новых друзей, провести весело и увлекательно свое время в кругу новых или старых друзей. <br><br>English Community - место где ты хочешь жить!'
    );

    private static $titles = array(
        'aboutUs' => 'О НАС',
        'yourBenefits' => 'ТВОИ ВЫГОДЫ',
        'useInJuly' => 'ПОЛЬЗА ПРИ ЗАПИСИ'
    );

    public static function render($blockName = null) {
        echo self::getContent($blockName);
    }    
    
    private static function getContent($blockName) {
        switch ($blockName) {
            case 'aboutUs':
                $html = self::getAboutUs();
                break;
            case 'yourBenefits':
                $html = self::getYourBenefits();
                break;
            case 'useInJuly':
                $html = self::getUseInJuly();
                break;
            default:
                break;
        }
        return $html;
    }
    
    private static function getAboutUs () {
//        return '<div class="block-container aboutus"><div class="block-header"></div>
//            <div class="aboutusitem"><div class="inner">' . self::$texts['aboutus'] . '</div></div>
//        </div>';
        return '<div class="block-container aboutus"><div class="block-header"></div>
            
            <div class="aboutusitem2">
                <div class="aboutusitem2-inner">
                    <div class="aboutusitem2-top"><div class="aboutusitem2-text">English Community - это:</div></div>
                    <div class="aboutusitem2-middle">
                        <div class="aboutusitem2-left"></div>
                        <div class="aboutusitem2-logo"></div>
                        <div class="aboutusitem2-right"></div>
                        <div class="clr"></div>
                    </div>
                    <div class="aboutusitem2-bottom"></div>
                </div>
            </div>
            
        </div>';
    }
    private static function getYourBenefits () {
        return '<div class="block-container yourbenefits"><div class="block-header"></div>
            <div style="margin: 0 auto; width: 900px">
                <div class="benefitsitem">
                    <div class="inner"><div class="benefitsitem-header">Свободный старт</div>начни обучение в любой<br/>удобный день</div>
                </div>
                <div class="benefitsitem">
                    <div class="inner"><div class="benefitsitem-header">Безлимитное посещение</div>посещай любое количество<br/>уроков</div>
                </div>
                <div class="benefitsitem">
                    <div class="inner"><div class="benefitsitem-header">Свободный график</div>приходи когда тебе удобно<br/>с утра до ночи</div>
                </div>
                <div class="clr"></div>
            </div>
        </div>';
    }
    private static function getUseInJuly () {
        return '<div class="block-container useinjuly"><div class="block-header"></div>
            <div class="useinjulyitem">
                <div class="inner first">
                    от <span class="whitefont">7</span> дней<br/>
                    за <span class="whitefont">0</span> грн
                </div>
            </div>
            <div class="useinjulyitem">
                <div class="inner second">
                    Получи сегодня БЕСПЛАТНЫЙ гостевой абонемент и стань частью English Community.<br/>
                    Ты ничего не теряешь, а только приобретаешь!
                </div>
            </div>
            <div class="clr"></div>
        </div>';
    }
}

?>