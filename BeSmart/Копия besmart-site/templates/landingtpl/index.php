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
     * 
     * 
     * 
     */
    $count = DBmanager::getCount('users');
    $imgSRC = array_filter(explode(";", strip_tags(trim($this->info['content']))));
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
        <div class="pagec_holder">
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
                <div class="pagec_form">
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
            <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_2.png'); height: 565px"></div>
            <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_3.png'); height: 569px"></div>
            <div style="height:165px; background: #21afd6">
                <div style="padding-top: 36px; font-family: Century Gothic, Verdana; text-align: center; font-size:30px; color: #fff;">
                    <span>В сообществе Be Smart уже </span><span style="color: #ffcc00; font-size: 60px; "><?php echo $count; ?></span><span> участников!</span>
                </div>
            </div>
            <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_5.png'); height: 443px"></div>
            <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_6.png'); height: 443px">
                <div style="padding-top: 260px;">
                    <a class="button_get" href='javascript:void(0);' onclick="$(document.body).animate({ scrollTop: 0},600,function (){$('#namefield').focus()})"></a>
                </div>
            </div>
            <div class="pagec" style="background-image: url('/templates/landingtpl/images/Kontakty_New4.png'); height: 610px"></div>
            <div class="pagec" style="background-image: url('/templates/landingtpl/images/land19_8.png'); height: 138px">
                <ul class="pagec_footer_menu">
                    <li><a href="/">О Be Smart</a></li>
                    <li><a href="/abonementy">Цены</a></li>
                    <li><a href="/kontakty">Контакты</a></li>
                </ul>
            </div>
        </div>
        <?php Widget::renderWidget('GoogleAnalitics'); ?>
    </body>
</html>