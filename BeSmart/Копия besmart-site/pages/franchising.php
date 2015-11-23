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
    <div class="page" style="background-image: url('/templates/landing/images/f1.jpg')"></div>
    
    <div class="page" style="background-image: url('/templates/landing/images/f2.jpg')"></div>
    
    <div class="page" style="background-image: url('/templates/landing/images/f3.jpg')"></div>
    
    <div class="page" style="background-image: url('/templates/landing/images/f4.jpg')"></div>
    
    <div class="page" style="background-image: url('/templates/landing/images/f5.jpg')"></div>
     <!--
    <div class="page" style="background-image: url('/templates/landing/images/f6.jpg')"></div>
   
    <div class="page" style="background-image: url('/templates/landing/images/f7.jpg')"></div>!-->
    
    <div class="page" style="background-image: url('/templates/landing/images/f8.jpg')"></div>
</div>
<script src="/templates/general/js/landing.js"></script>
        