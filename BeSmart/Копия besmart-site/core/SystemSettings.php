<?php
/**
 * Description of SystemSettings
 * @author Viktor Protsenko <pro.victorr@gmail.com>
 */
class SystemSettings {
    private static $settings = array();

    public static function init () {
        self::$settings = DBmanager::getTable('settings', 0, null, 'name');
    }
    
    public static function getByName ($name) {
        if ($name && self::$settings[$name]) {
            return self::$settings[$name]['value'];
        } else {
            return '';
        }
    }
    
    public static function set ($name, $value) {
        self::$settings[$name]['value'] = $value;
    }
}