<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of GoogleAnalitics
 *
 * @author PC
 */
class Chat implements iWidget {
    public static function render($var = null){
        return '';
        echo "<script type=\"text/javascript\">
var __lc = {};
__lc.license = 3568601;

(function() {
	var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
	lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();
</script>";
    }
}

?>
