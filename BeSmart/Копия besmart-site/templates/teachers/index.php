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
        <?php Widget::renderWidget('GoogleAnalitics'); ?>
        <?php Widget::renderWidget('Chat'); ?>
    </body>
</html>