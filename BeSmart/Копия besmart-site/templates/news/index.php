<?php
    header("Content-type: text/html; charset=utf-8");
    header("refresh:5;url=/");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title><?php echo $this->info['title']; ?></title>
        <meta name="keywords" content="<? echo $this->info['keywords']; ?>">
        <meta name="description" content="<? echo $this->info['description']; ?>">
        <meta HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
        <link rel="stylesheet" type="text/css" href="/templates/general/css/all.css?v=<?php echo APPVERSION; ?>" />
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type="text/javascript" src="/templates/general/js/jquery.cookie.js?v=<?php echo APPVERSION; ?>"></script>
        <script type="text/javascript" src="/templates/general/js/main.js?v=<?php echo APPVERSION; ?>"></script>
        <script type="text/javascript" src="/templates/general/js/popup.js?v=<?php echo APPVERSION; ?>"></script>
    </head>
    <body>
        <table id="centerer">
            <tr>
                <td>
                    <div id="main-content">
                        <div class="left-side" style="width:1000px; margin: 0 auto; background-color: #b5db0e">
                            <div class="right-side" style="height: 400px;">
                                <div style="padding: 40px 0; text-align: center">
                                    <img src="/templates/general/images/logo.png" alt="<?php echo $this->info['title']; ?>"/>
                                </div>
                                <div style="font-size: 24px;">
                                    <?php $this->renderPageContent(); ?>
                                </div>
                            </div>
                        </div>
                        <div id="footer">
                            <table><tr>
                                <td>|066| 001 97 94</td><td>|044| 362 62 49</td><td>|068| 742 27 82</td><td>hot@besmart.in.ua</td>
                            </tr></table>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <?php Widget::renderWidget('GoogleAnalitics'); ?>
    </body>
</html>