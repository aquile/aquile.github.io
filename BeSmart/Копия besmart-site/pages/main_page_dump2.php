<?php
    Widget::renderWidget('TopMenu', array(
        'info' => $this->info,
        'menu' => array(
            array(
                'href' => '/englishschool',
//                'pageindex' => '0',
                'text' => 'ШКОЛА'
            ),
            array(
                'href' => '/englishcafe',
//                'pageindex' => '1',
                'text' => 'ДИСКУССИИ'
            ),
            array(
                'href' => '/abonementy',
//                'pageindex' => '1',
                'text' => 'ЦЕНЫ'
            ),
            array(
                'href' => '/testy',
//                'pageindex' => '1',
                'text' => 'ТЕСТЫ'
            ),
            array(
                'href' => '/schedule',
//                'pageindex' => '1',
                'text' => 'РАСПИСАНИЕ'
            ),
            array(
                'href' => '/otzyvy',
//                'pageindex' => '0',
                'text' => 'ОТЗЫВЫ'
            ),
            array(
                'href' => '/news',
//                'pageindex' => '0',
                'text' => 'НОВОСТИ'
            ),
            array(
                'href' => '/teachers',
//                'pageindex' => '0',
                'text' => 'ПРЕПОДАВАТЕЛИ'
            )
        )
    ));
    
    $count = DBmanager::getCount('users');
    
    $numlen = strlen($count . '');
    
    for ($i = 0, $n = (5 - $numlen); $i < $n; $i++) {
        $count = '0' . $count;
    }
?>
<div id='pageholder'>
    <div class="page school2">
        <div style="height:165px; background: #21afd6">
            <div style="text-decoration: underline; padding-top: 85px; font-family: Verdana, Century Gothic; text-align: center; font-size:48px; color: #fff;">
                <span>ВЫДАНО АБОНЕМЕНТОВ</span><span style="display: inline-block; margin-left: 40px; border: 4px solid #fff; padding: 0 13px;"><?php echo $count; ?></span>
            </div>
        </div>
        <div class="page_field" style="text-align: center; padding-top: 20px;">
            <div style="float: left; width: 649px; border-right: 1px dashed #fff">
                <h2 class="">ШКОЛА АНГЛИЙСКОГО</h2>
                <div class="page_text" style="padding: 10px 80px;">
                    Инновационная методика школы Be Smart поможет<br />
в кратчайшие сроки раскрыть твой внутренний потенциал<br />
и научит тебя <b>думать по-английски</b>
                </div>
                <div style="padding-top: 20px; padding-bottom: 30px; width: 610px; margin: 0 auto;">
                    <div class="school_sq" style="margin-right: 70px;">
                        <div class="school_sq_inn">
                            <div>от <span class="cafe_price">45</span></div>
                            <div>грн/день</div>
                        </div>
                    </div>
                    <div class="school_sq">
                        <div class="school_sq_inn">
                            <div>до <span class="cafe_price">60</span></div>
                            <div>грн/день</div>
                        </div>
                    </div>
                    <div class="clr"></div>
                </div>
                <a class="new_button" href="/abonementy">ВСЕ ЦЕНЫ</a>
            </div>
            <div style='float: left; width: 350px;'>
                <div style='padding-left: 30px; padding-top: 10px'>
                    <div style='color: #fff; font-size: 20px;'>ПОЛУЧИ <b>БЕСПЛАТНЫЙ</b><br/>АБОНЕМЕНТ</div>
                    <form action="new_order" class="proxyform new_order" style='padding-top: 20px'>
                        <div class="main_order_form_line">
                            ВЫБЕРИТЕ ФИЛИАЛ:<br/>
                            <?php
                                echo Footer::getSchoolCombo();
                            ?>
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
                        <div style="text-align: center; padding-top: 20px;">
                            <a href="javascript:void(0)" class="new_button white submitbutton" progresstext="Отправка...">Хочу абонемент!</a>
                        </div>
                    </form>
                </div>
            </div>
            <div class='clr'></div>
        </div>
    </div>
    <div class="page" style="background-image: url('/templates/landing/images/englishfrom0.jpg')"></div>
    <div class="page" style="background-image: url('/templates/landing/images/newoffice2_1.jpg')"></div>
    <div class="page comments">
        <div class="page_field" style="text-align: center;">
            <h2>ОТЗЫВЫ</h2>
            <table class="comments_tbl">
                <tr>
                    <td>
                        <div class="comment_block">
                            <div class="comment_dd">
                                <div class="comment_title">Андрей Базин</div>
                                <div class="comment_time">оставил отзыв в 09:24, 14 января 2014</div>
                                <div class="comment_body">
    Курсы очень классные, всегда весело, есть много игр в лаунж зоне , есть мини кафе , самое главное что курсы безлимитные и можно ходить в любой день когда зарегистрировался на любое время когда тебе убодно , очень интересные темы уроков , нет д/з и заучивания каких то слов ,очень много разговорных уроков, есть приставка х-бокс , и самое главное бесплатная вода из бойлера )))</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="comment_block">
                            <div class="comment_dd">
                                <div class="comment_title">Юлия Бондаренко</div>
                                <div class="comment_time">оставила отзыв в 12:12, 14 января 2014</div>
                                <div class="comment_body">Я студентка школы с самого открытия!))) Постараюсь оставить объективный отзыв, потому как за время моего обучения школа стала для меня вторым домом!) Не возможно не оценить атмосферу которая царит в BeSmart!) Коллектив подобран шикарно!) Продумано все до каждой мелочи! Есть лаунж зона, где расположено много литературы, игр и кафе. Здесь можно просто посидеть и пообщаться на английском языке за чашечкой кофе, или настольной игрой. Не могу не отметить шикарный преподавательский состав!) Есть носители языка, что поверьте мне, не мало важно!) В общем, не хочу перехваливать, но вы во всем сами сможете убедиться на пробных занятиях!)</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="comment_block">
                            <div class="comment_dd">
                                <div class="comment_title">Anastasiya Sergeyevna</div>
                                <div class="comment_time">оставила отзыв в 23:54, 15 января 2014</div>
                                <div class="comment_body">Жалко, что нельзя поставить больше звездочек, чем 3 ( Эта школа заслуживает как минимум 10 ) Это место - второй дом. Сюда хочется приходить и проводить все свое свободное время. Тут можно все, от посещения занятий, до просмотра фильмов, общения с носителями языка за чашечкой кофе !!! Спасибо всему коллективу !!!</div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>
            </table>
            <a class="new_button" href="/otzyvy">ПРОЧИТАТЬ ВСЕ</a>
        </div>
    </div>
    <div class="page" style="background-image: url('/templates/landing/images/kontact1.jpg')"></div>
    <div class="page" style="background-image: url('/templates/landing/images/kontakt_dnepr.jpg')"></div>
   
    <?php Widget::renderWidget('Footer'); ?>
</div>

<script src="/templates/general/js/landing.js"></script>