<?php
    $count = DBmanager::getCount('users');
    $imgSRC = array_filter(explode(";", strip_tags(trim($this->info['content']))));
    Widget::renderWidget('TopMenu', array(
        'info' => $this->info
    ));
?>
<div class="pagec_holder">
    <div class="pagec">
        <div class="gellery-container">
            <img class="gellery-container-arrow left" src="/templates/general/images/arrow_left.png" style="left: 30px; <?php if (count($imgSRC) <= 1) {echo 'display: none;'; } ?>"/>
            <img class="gellery-container-arrow right" src="/templates/general/images/arrow_right.png" style="right: 30px; <?php if (count($imgSRC) <= 1) {echo 'display: none;'; } ?>"/>
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
            <form action="new_order" class="proxyform new_order" style='padding-top: 120px'>
                <div style="color: #fff; text-align: center; background-color: #00b8da; font-size: 20px;">ЗАКАЗАТЬ АБОНЕМЕНТ ДЛЯ ДЕТЕЙ</div>
                <input type="hidden" name="type" value="children"/>
                <div class="main_order_form_line"  style="background-color: #00b8da;">
                    <div style="padding-left: 20px;">Имя:</div>
                    <input type="text" name="name" required="1" id="namefield" errortext="Вы не указали ваше имя"/>
                </div>
                <div class="main_order_form_line" style="background-color: #00b8da;">
                    <div style="padding-left: 20px;">Телефон:</div>
                    <input type="text" name="tel"  required="1" errortext="Вы не указали ваш телефон"/>
                </div>
                <div class="main_order_form_line" style="background-color: #00b8da;">
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
    <div class="pagec" style="background: url('/templates/landingtpl/images/child/b1.jpg') no-repeat; height: 600px"></div>
    <div class="pagec" style="background: url('/templates/landingtpl/images/child/b2.jpg') no-repeat; height: 800px"></div>
    <div class="pagec" style="background: url('/templates/landingtpl/images/child/b3.jpg') no-repeat; height: 674px"></div>
    <div class="pagec" style="background: url('/templates/landingtpl/images/child/b4.jpg') no-repeat; height: 600px"></div>
    <div class="pagec" style="background: url('/templates/landingtpl/images/child/b5.jpg') no-repeat; height: 700px"></div>
    <div class="pagec" style="background: url('/templates/landingtpl/images/child/contacts_child.jpg') no-repeat; height: 600px"></div>
    <div class="pagec" style="background: url('/templates/landingtpl/images/land19_8.png') no-repeat; height: 138px">
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