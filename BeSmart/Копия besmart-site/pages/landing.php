<style>
    ul, li, ol {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .lmain-content {
        width: 964px;
        margin: 0 auto;
    }
    .lheader {
        background-color: #4fb6d8;
        height: 50px;
        font-size: 18px;
        line-height: 50px;
        color: #fff;
        padding-left: 20px;
    }
    .lfooter {
        text-align: right;
        padding-right: 10px;
        background-color: #4fb6d8;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
    .lfooter li {
        display: inline-block;
        margin: 0 10px;
    }
    .lfooter li a {
        color: #fff;
        font-size: 18px;
    }
    .slide-container {
        width: 964px;
        height: 499px;
        overflow: hidden;
    }
    #slide-controls {
        height: 159px;
    }
    .slide-container-form {
        height: 499px;
        width: 322px;
        /*background: rgba(79, 182, 216, 0.5);*/
        position: relative;
        top: -3992px;
        left: 643px;
    }
    .slidec {
        background-image: url(/templates/landing/images/menu2.png);
        background-repeat: no-repeat;
        height: 96px;
        width: 110px;
        margin: 0 auto;
    }
    #slide-controls li:hover .slidec, #slide-controls li.hover .slidec {
        background-position-y: -96px;
    }
    #slide-controls li {
        display: inline-block;
        width: 117px;
        cursor: pointer;
        padding-top: 14px;
    }
    .slide-container-inner {
        position: relative;
    }
    .slidec-text {
        font-size: 12px;
        text-align: center;
    }
    .slidec.s1 {
        background-position-x: 4px;
    }
    .slidec.s2 {
        background-position-x: -120px;
    }
    .slidec.s3 {
        background-position-x: -236px;
    }
    .slidec.s4 {
        background-position-x: -360px;
    }
    .slidec.s5 {
        background-position-x: -485px;
    }
    .slidec.s6 {
        background-position-x: -612px;
    }
    .slidec.s7 {
        background-position-x: -725px;
    }
    .slidec.s8 {
        background-position-x: -850px;
    }
    
    .slide-container-form-inner {
        width: 280px;
        margin: 0 auto;
    }
    .slide-container-form-inner-logo {
        height: 125px;
        width: 100%;
        background-image: url(/templates/landing/images/logo.png);
        background-position: 50% 50%;
        background-repeat: no-repeat;
    }
    .slide-container-form-inner-title {
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        color: #fff;
        text-align: center;
    }
    .slide-container-form-button {
        background: #fff;
        color: #000;
        text-align: center;
        padding: 10px 0;
        font-size: 22px;
        box-shadow: 1px 1px 4px #000;
        cursor: pointer;
    }
    .slide-container-form-fieldline {
        font-size: 18px;
        color: #fff;
        padding: 5px 0;
    }
    .slide-container-form-fieldline input {
        outline: none;
        border: none;
        padding: 4px;
        background-color: #fff;
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 1px 1px 4px #000;
    }
</style>
<div class="lmain-content">
    <div class="lheader">
        BE SMART - ШКОЛА АНГЛИЙСКОГО ЯЗЫКА НОВОГО ФОРМАТА
    </div>
    <div>
        <div class="slide-container">
            <div id='slide-container' class='slide-container-inner'>
                <div><img src='/templates/landing/images/p1_3.jpg' /></div>
                <div><img src='/templates/landing/images/p0_2.jpg' /></div>
                <div><img src='/templates/landing/images/p2_2.jpg' /></div>
                <div><img src='/templates/landing/images/p3_2.jpg' /></div>
                <div><img src='/templates/landing/images/p4_2.jpg' /></div>
                <div><img src='/templates/landing/images/p5_2.jpg' /></div>
                <div><img src='/templates/landing/images/p6_2.jpg' /></div>
                <div><img src='/templates/landing/images/p7_2.jpg' /></div>
            </div>
            <div class='slide-container-form'>
                <div class='slide-container-form-inner'>
                    <div class='slide-container-form-inner-logo'></div>
                    <div class='slide-container-form-inner-title'>
                        <div><b>БЕСПЛАТНЫЙ</b> АБОНЕМЕНТ</div>
                        <div>НА 3 ДНЯ</div>
                    </div>
                    <form action="new_order" class="proxyform"  successtext="Ваша завка успешно отправлена! Мы свяжемся с Вами в ближайшее время" failuretext="Произошла ошибка - Ваша заявка не отправлена!" onfinish="orderPopup.hide()">
                        <div style='padding-bottom: 30px'>
                            <div class='slide-container-form-fieldline'>
                                ИМЯ:<br/>
                                <input type="text" name="name" required="1" errortext="Вы не указали ваше имя"/>
                            </div>
                            <div class='slide-container-form-fieldline'>
                                E-MAIL:<br/>
                                <input type="text" name="email" required="1" errortext="Вы не указали ваш e-mail"/>
                            </div>
                            <div class='slide-container-form-fieldline'>
                                ТЕЛЕФОН:<br/>
                                <input type="text" name="tel"  required="1" errortext="Вы не указали ваш телефон"/>
                            </div>
                        </div>
                        <div class='slide-container-form-button submitbutton' progresstext="Отправка...">
                            Получить!
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="slide-controls">
            <ul>
                <li class='hover'>
                    <div class='slidec s2'></div>
                    <div class='slidec-text'>Англоязычное<br/>кафе</div>
                </li>
                <li>
                    <div class='slidec s1'></div>
                    <div class='slidec-text'>Подарочный сертификат</div>
                </li>
                <li>
                    <div class='slidec s3'></div>
                    <div class='slidec-text'>Безлимитное посещение</div>
                </li>
                <li>
                    <div class='slidec s4'></div>
                    <div class='slidec-text'>Англоязычные ивенты</div>
                </li>
                <li>
                    <div class='slidec s5'></div>
                    <div class='slidec-text'>Произвольный старт</div>
                </li>
                <li>
                    <div class='slidec s6'></div>
                    <div class='slidec-text'>Игры и соревнования</div>
                </li>
                <li>
                    <div class='slidec s7'></div>
                    <div class='slidec-text'>Lounge-преподаватель</div>
                </li>
                <li>
                    <div class='slidec s8'></div>
                    <div class='slidec-text'>Много преподавателей</div>
                </li>
<!--                <li>
                    <div class='slidec s8'></div>
                    <div class='slidec-text'>Удобное расположение</div>
                </li>-->
            </ul>
        </div>
    </div>
    <div class="lfooter">
        <ul>
            <li><a href="/">О BeSmart</a></li>
            <li><a href="/abonementy">Цены</a></li>
            <li><a href="/kontakty">Контакты</a></li>
        </ul>
    </div>
</div>
<script src='/templates/landing/js/slider.js'></script>
