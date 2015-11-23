<?php

/**
 * Description of Widget
 *
 * @author Viktor Protsenko <pro.victorr@gmail.com>
 */
class Widget {

    /**
     * 
     */
    public function __construct() {
        $this->autoLoadWidgets();
    }

    /**
     * 
     * @param type $name
     */
    public static function renderWidget($name, $param = null) {
         call_user_func($name. '::render', $param);
    }

    /**
     * 
     */
    private function autoLoadWidgets(){
        if (is_dir(WIDGETS_DIR)) {
            if ($dh = opendir(WIDGETS_DIR)) {
                while (($file = readdir($dh)) !== false) {
                    if (is_dir($file)) continue;
                    include_once WIDGETS_DIR . $file;
                }
                closedir($dh);
            }
        }
    }

}

// Declare the interface 'iWidget'
interface iWidget {
    public static function render($var = null);
}

new Widget();
?>
