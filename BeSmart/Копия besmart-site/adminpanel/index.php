<?php
    header("Content-type: text/html; charset=UTF-8");
    $systemVersion = '1.1.27';
    if  (strrpos($_SERVER['REQUEST_URI'], 'paneldnepr') !== false || $_SERVER['REMOTE_USER'] == 'dnepradmin') {
        $systemDepartment = 2;
    } else if (strrpos($_SERVER['REQUEST_URI'], 'panelkz') !== false || $_SERVER['REMOTE_USER'] == 'kzadmin') {
        $systemDepartment = 3;
    } else {
        $systemDepartment = 1;
    }
    
    /**
     * Для добавление нового отдела:
     * 1. Добавить новый department в DB
     * 2. Добавить новое условие в adminpanel/index.php
     * 3. Добавить новое условие в adminpanel/data.php
     * 4. Добавить пользлвателя в CPANEL на папку adminpanel 
     */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <title>Панель управления :: Be Smart</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" type="text/css" href="/panel/js/extjs/resources/css/ext-all.css"/>
        <link rel="stylesheet" type="text/css" href="/panel/js/calendar/resources/css/extensible-all.css"/>
        <link rel="stylesheet" type="text/css" href="/panel/css/styles.css?v=<?php echo $systemVersion; ?>"/>
        <link rel="stylesheet" type="text/css" href="/panel/css/icons.css"/>
        <link rel="stylesheet" type="text/css" href="/panel/css/icons.ie6.css"/>
        <link rel="shortcut icon" type="image/png" href="/templates/general/images/logo_blue.png" />
        <script type="text/javascript" src="/panel/js/extjs/adapter/ext/ext-base-debug.js"></script>
        <script type="text/javascript" src="/panel/js/extjs/ext-all-debug.js"></script>
        <script type="text/javascript" src="/panel/js/calendar/lib/extensible-all-debug.js"></script>
        <script type="text/javascript" src="/panel/js/calendar/ext-lang-ru.js"></script>
        <script type="text/javascript">
            Ext.BLANK_IMAGE_URL = "/panel/js/extjs/resources/images/default/s.gif";
        </script>
        <script type="text/javascript">
       	    var systemVersion = "<?php echo $systemVersion; ?>";
            var systemDepartment = <?php echo $systemDepartment; ?>;
       	</script>
        <script type="text/javascript" src="/panel/js/St.js?v=<?php echo $systemVersion; ?>"></script>
    </head>
    <body></body>
</html>