<?php
    Widget::renderWidget('TopMenu', array(
        'info' => $this->info,
        'menu' => array(
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
                'href' => '/kontakty',
                'text' => 'КОНТАКТЫ'
            )
        )
    ));
?>
<div id='pageholder'>

    <div class="page school2" id="schoolpage">
        <div class="page_field" style="text-align: center;">
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
                            <div>от <span class="cafe_price">59</span></div>
                            <div>грн/день</div>
                        </div>
                    </div>
                    <div class="school_sq">
                        <div class="school_sq_inn">
                            <div>до <span class="cafe_price">99</span></div>
                            <div>грн/день</div>
                        </div>
                    </div>
                    <div class="clr"></div>
                </div>
                <a class="new_button" href="/abonementy">ВСЕ ЦЕНЫ</a>
            </div>
            <div style='float: left; width: 350px;'>
                <div style='padding-left: 30px; padding-top: 50px'>
                    <div style='color: #fff; font-size: 20px;'>ЗАПИСАТЬСЯ НА ОБУЧЕНИЕ</div>
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

    <div class="page cons" id="cons">
        <div style="padding-top: 128px;">
            <div class="page_field" style="padding: 0; text-align: center">
                <h2>ПРЕИМУЩЕСТВА BE SMART</h2>
                <table class="cons_table">
                    <tr>
                        <td>
                            <img src="/templates/general/images/cons1.png" alt="Абонемент. посещай любое количество занятий"/>
                            <div class="cons_title">Абонемент</div>
                            <div class="cons_body">Посещай любое количество занятий</div>
                        </td>
                        <td>
                            <img src="/templates/general/images/cons2.png" alt="Произвольный старт. Начни изучать уже сегодня"/>
                            <div class="cons_title">Произвольный старт</div>
                            <div class="cons_body">Начни изучать уже сегодня</div>
                        </td>
                        <td>
                            <img src="/templates/general/images/cons3.png" alt="Свободный график. Посещай занятия в удобное время"/>
                            <div class="cons_title">Свободный график</div>
                            <div class="cons_body">Посещай занятия в удобное время</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src="/templates/general/images/cons4.png" alt="Маленькие группы. от 1 до 8 человек на занятии"/>
                            <div class="cons_title">Маленькие группы</div>
                            <div class="cons_body">от 1 до 8 человек на занятии</div>
                        </td>
                        <td>
                            <img src="/templates/general/images/cons5.png" alt="Персональный консультант. Следит за твоей успеваемостью"/>
                            <div class="cons_title">Персональный консультант</div>
                            <div class="cons_body">Следит за твоей успеваемостью</div>
                        </td>
                        <td>
                            <img src="/templates/general/images/cons6.png" alt="Разные преподаватели. Получай знания многих учителей вместо одного"/>
                            <div class="cons_title">Разные преподаватели</div>
                            <div class="cons_body">Получай знания многих учителей вместо одного</div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    
    <div class="page gallery">
        <div class="page_field" style="padding-top: 65px;">
            <div style="text-align: center;"><h2>ФОТОГРАФИИ</h2></div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto1.jpg" original="/gallery_pictures/simple/original/b1.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto2.jpg" original="/gallery_pictures/simple/original/b2.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto3.jpg" original="/gallery_pictures/simple/original/b3.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto4.jpg" original="/gallery_pictures/simple/original/b4.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto5.jpg" original="/gallery_pictures/simple/original/b5.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto6.jpg" original="/gallery_pictures/simple/original/b6.jpg"/>
            </div>
            <div class="clr"></div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto7.jpg" original="/gallery_pictures/simple/original/b7.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto8.jpg" original="/gallery_pictures/simple/original/b8.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto9.jpg" original="/gallery_pictures/simple/original/b9.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto10.jpg" original="/gallery_pictures/simple/original/b10.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto11.jpg" original="/gallery_pictures/simple/original/b11.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/phto12.jpg" original="/gallery_pictures/simple/original/b12.jpg"/>
            </div>
            <div class="clr"></div>
        </div>
    </div>
    
    <div class="page gallery_video">
        <div class="page_field" style="padding-top: 65px;">
            <div style="text-align: center;"><h2 class="blueline" style="padding-top:20px;">ВИДЕО</h2></div>
            <div style="padding-top: 20px;">
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/1video.jpg')">
                        <div class="play_video_icon" original="DGjAgTSuT7o"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/2video.jpg')">
                        <div class="play_video_icon" original="37a3BVzBgh4"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/3video.jpg')">
                        <div class="play_video_icon" original="3dc-BXMy97E"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/4video.jpg')">
                        <div class="play_video_icon" original="I-7zThP4vMQ"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/5video.jpg')">
                        <div class="play_video_icon" original="EVjiM1RWiC8"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/6video.jpg')">
                        <div class="play_video_icon" original="vKvopobo1pw"></div>
                    </div>
                </div>
                <div class="clr"></div>
            </div>
        </div>
    </div>
    
    <div class="page testy">
        <div class="page_field" style="text-align: center;">
            <h2>ТЕСТЫ</h2>
            <div style="text-align: center; padding-top: 30px;">
                <img src="/templates/general/images/tests_list.png" />
            </div>
            <ul class="test_menu" style="text-align: left">
                <li style="width: 200px; margin-left: 10px;"><a href="/testy/enter">ВХОДЯЩИЙ</a></li>
                <li style="width: 200px; margin-left: 165px;"><a href="/testy/nextlevel">ПЕРЕХОД НА СЛЕДУЮЩИЙ УРОВЕНЬ</a></li>
                <li style="width: 200px; margin-left: 130px;"><a href="/testy/training">ТРЕНИРОВОЧНЫЕ ТЕСТЫ</a></li>
            </ul>
        </div>
    </div>
    
    <div class="page teachers" id="teachers">
        <div class="page_field" style="text-align: center;">
            <h2>РАЗНЫЕ ПРЕПОДАВАТЕЛИ</h2>
            <div class="page_text" style="padding: 10px 150px 100px 150px; font-size: 24px;">Разнообразие преподавателей Be Smart позволяет ощутить на себе преимущества различных стилей коммуникации и выбрать наиболее комфортный для тебя.</div>
            <a class="new_button" href="/teachers">Все преподаватели</a>
        </div>
    </div>
    
    <div class="page cafeand" id="cafeand">
        <div class="page_field" style="text-align: center;">
            <div>
                <div class="left">
                    <h2>АНГЛОЯЗЫЧНОЕ КАФЕ</h2>
                    <img src="/templates/general/images/cafeand1.png" />
                    <div class="cafeandtext" style="width:440px; margin: 0 auto;">Исключительно англоязычное кафе с приятной атмосферой, интересными собеседниками, познавательными и развлекательными мероприятиями, настольными и консольными играми, фильмотекой и библиотекой… У нас есть все, чтобы незабываемо провести время и <b>попрактивать свой английский</b></div>
                </div>
                <div class="right">
                    <h2>НОСИТЕЛИ ЯЗЫКА</h2>
                    <img src="/templates/general/images/cafeand2.png" />
                    <div class="cafeandtext" style="width: 230px; margin: 0 auto;">В нашем кафе всегда присутствуют носители языка, с которыми ты можешь подтянуть свои знания и пообщаться на английском за чашечкой свежемолотого кофе.</div>
                </div>
                <div class="clr"></div>
            </div>
        </div>
    </div>
    
    <div class="page levels" id="levels">
        <div class="page_field" style="text-align: center; padding-bottom: 50px">
            <h2>УРОВНИ</h2>
            <div style="padding-top: 30px">
                <img src="/templates/general/images/levels1.png" />
            </div>
            <div>
                <div class="levels_item">
                    BEGINNER
                </div>
                <div class="levels_item">
                    ELEMENTARY
                </div>
                <div class="levels_item">
                    PRE-INTERMEDIATE
                </div>
                <div class="levels_item">
                    INTERMEDIATE
                </div>
                <div class="levels_item">
                    UPPER-INTERMEDIATE
                </div>
                <div class="clr"></div>
            </div>
        </div>
        <div class="levels_infoline">
            <div class="page_field" style="text-align: center;">
                <div style="font-weight: bold">ПРОХОЖДЕНИЕ УРОВНЯ ЗАВИСИТ ОТ ИНТЕНСИВНОСТИ</div>
                <div><b>3</b> зан/неделю = <b>20</b> недель | <b>7</b> зан/неделю = <b>9</b> недель</div>
            </div>
        </div>
    </div>
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
        