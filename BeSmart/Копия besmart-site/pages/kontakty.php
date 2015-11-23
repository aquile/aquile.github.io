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
<div class="pagec_holder" style="position: relative;">
    <div class="pagec" style="background-image: url('/templates/landingtpl/images/Kontakty_New4.png'); height: 600px"></div>
    <div class="pagec" style="background-image: url('/templates/landingtpl/images/ContactsKievMap.png'); height: 700px"></div>
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
        