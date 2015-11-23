<?php
    $count = DBmanager::getCount('users');
    $imgSRC = array_filter(explode(";", strip_tags(trim($this->info['content']))));
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
<div class="pagec_holder" style="position: relative;">
    <div class="pagec">
        <div class="gellery-container">
            <img class="gellery-container-arrow left" src="/templates/general/images/arrow_left.png" style="left: 30px; <?php if (count($imgSRC) == 1) {echo 'display: none;'; } ?>"/>
            <img class="gellery-container-arrow right" src="/templates/general/images/arrow_right.png" style="right: 30px; <?php if (count($imgSRC) == 1) {echo 'display: none;'; } ?>"/>
            <div class="gellery-container-inner" style="width: <?php echo (count($imgSRC)*1400) . 'px'; ?> ">
            <?php
                for ($i = 0; $i < count($imgSRC); $i++) {
                    echo '<div class="gallery-image" style="background-image: url(' . $imgSRC[$i] . ')"></div>';
                }
            ?>
            </div>
        </div>
    </div>
    <div class="pagec" style="height: 594px; position: absolute; top: 0px;">
        <div class="pagec_form" style="background-image: url('/templates/landingtpl/images/kand_form_main.png'); background-position: 0 -60px;">
            <form action="new_order" class="proxyform new_order" style='padding-top: 182px'>
                <div class="main_order_form_line">
                    <br/>
                    <input type="text" name="name" required="1" id="namefield" errortext="Вы не указали ваше имя"/>
                </div>
                <div class="main_order_form_line">
                    <br/>
                    <input type="text" name="email" required="1" errortext="Вы не указали ваш e-mail"/>
                </div>
                <div class="main_order_form_line">
                    <br/>
                    <input type="text" name="tel"  required="1" errortext="Вы не указали ваш телефон"/>
                </div>
                <div class="main_order_form_line">
                    <div style="padding-left: 20px;">Выберите офис:</div>
                    <?php
                        echo Footer::getSchoolCombo();
                    ?>
                </div>
                <div style="text-align: center; padding-top: 20px;">
                    <a href="javascript:void(0)" class="order_button submitbutton">&nbsp;</a>
                </div>
            </form>
        </div>
    </div>
    <?php Widget::renderWidget('Afisha'); ?>
    
    <div style="height:165px; background: #21afd6">
        <div style="padding-top: 36px; font-family: Century Gothic, Verdana; text-align: center; font-size:30px; color: #fff;">
            <span>В сообществе Be Smart уже </span><span style="color: #ffcc00; font-size: 60px; "><?php echo $count; ?></span><span> участников!</span>
        </div>
    </div>
    <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_2.png'); height: 565px"></div>
    <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_3.png'); height: 569px"></div>
    <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_5.png'); height: 443px"></div>
    <div class="pagec" style="background-image: url('/templates/landingtpl/images/Kontakty_New4.png'); height: 600px"></div>
    <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_8.png'); height: 138px">
        <ul class="pagec_footer_menu" style="margin-left:520px;">
            <li><a href="/schedule">Расписание</a></li>
            <li><a href="/abonementy">Цены</a></li>
            <li><a href="/testy">Тесты</a></li>
            <li><a href="/franchising">Франчайзинг</a></li>
            <li><a href="/otzyvy">Отзывы</a></li>
            <li><a href="/kontakty">Контакты</a></li>
        </ul>
    </div>
</div>