<?php
/**
 * @author PC
 */
class Afisha implements iWidget {
    public static function render($var = null) {
        $path = $_SERVER['DOCUMENT_ROOT'] . '/gallery_pictures/afisha';
        $current = array(
            'date' => '',
            'filename' => ''
        );
        $files = scandir($path);
        
        // try to get newest image
        
        foreach ($files as $file) {
            if (is_file($path . '/' . $file)) {
                $file_parts = explode('.', $file);
                $date = strtotime($file_parts[0]);
                if (!$current['date'] || $current['date'] < $date) {
                    $current['date'] = $date;
                    $current['filename'] = $file;
                    $current['size'] = getimagesize($path . '/' . $file);
                }
                
            }
        }
        echo '<div class="pageс" style="height: ' . $current['size'][1] . 'px; background-image:url(\'/gallery_pictures/afisha/' . $current['filename'] . '\')"></div>';
    }
}