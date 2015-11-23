<?php
    /**
     * Include widget:
     * Widget::renderWidget('SiteBlock', 'aboutUs');
     * 
     * Render page content:
     * $this->renderPageContent();
     * 
     * Get Page info
     * echo $this->info['title'];
     */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title><?php echo $this->info['title']; ?></title>
        <meta name="keywords" content="<? echo $this->info['keywords']; ?>">
        <meta name="description" content="<? echo $this->info['description']; ?>">
        <meta HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
        <link rel="shortcut icon" type="image/png" href="/templates/general/images/logo_blue.png" />
        <link rel="stylesheet" type="text/css" href="/templates/general/css/all.css?v=<?php echo APPVERSION; ?>" />
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type="text/javascript" src="/templates/general/js/jquery.cookie.js?v=<?php echo APPVERSION; ?>"></script>
        <script type="text/javascript" src="/templates/general/js/dialog.js?v=<?php echo APPVERSION; ?>"></script>
        <script type="text/javascript" src="/templates/general/js/popup.js?v=<?php echo APPVERSION; ?>"></script>
        <script type="text/javascript" src="/templates/general/js/main.js?v=<?php echo APPVERSION; ?>"></script>
    </head>
    <body>
        
        <?php Widget::renderWidget('TopMenu', array(
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
        )); ?>
        <div id="center" style="padding-top: 100px; padding-bottom: 50px;">
            <div id="body">
                <div class="page_content">
                    <div class="page_content">
                        <div class="block_header blue" style="margin-bottom: 10px;"><?php echo $this->info['title']; ?></div>
                        <?php $this->renderPageContent(); ?>
                    </div>
                </div>
            </div>
        </div>
        <?php Widget::renderWidget('Footer'); ?>
        <div id="popup_control">
            <div style="padding-top: 28px;">Акция</div>
        </div>
        <div id="order_popup" class="popup_window">
            <div class="popup_content">
                <div class="hotnews_content">
<!--                <div class="popup_close close_btn"></div>-->
                <?php 
                        $hotnews = DBmanager::getHotNews();
                        if (count($hotnews)) {
                            echo $hotnews[0]['content'];
                        }
                    ?>
                    <div style="text-align: center; padding-top: 10px;">
                        <div class="button close_btn">ОК</div>    
                    </div>
                </div>
            </div>
        </div>
        <div id="order_popup2" class="popup_window">
            <div class="popup_content">
                <div class="hotnews_content">
                <div class="popup_close close_btn"></div>
<div class="order_form">
                  <form action="new_order" class="proxyform"  successtext="Ваша завка успешно отправлена! Мы свяжемся с Вами в ближайшее время" failuretext="Произошла ошибка - Ваша заявка не отправлена!" onfinish="orderPopup.hide()">
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
                        <input type="hidden" name="abtype" value=""/>
                        <div style="text-align: center; padding-top: 20px;">
                            <div class="button submitbutton" progresstext="Отправка...">Отправить</div>
                        </div>
                    </form>
            </div>
                </div>
            </div>
        </div>
        <?php Widget::renderWidget('GoogleAnalitics'); ?>
        <?php Widget::renderWidget('Chat'); ?>
    </body>
</html>