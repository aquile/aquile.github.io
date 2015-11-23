<?php
/**
 * Description of Gallery
 *
 * @author PC
 */
class Gallery implements iWidget {
    private static $images = array(
        
        'onas3.jpg' => array(
            'title' => 'Image title',
            'alt' => 'Image alt',
            'pageUrl' => 'javascript:void(0)'
        ),
        '2abonement.jpg' => array(
            'title' => 'Image title',
            'alt' => 'Image alt',
            'pageUrl' => 'javascript:void(0)'
        ),
        '3Graphik.jpg' => array(
            'title' => 'Image title',
            'alt' => 'Image alt',
            'pageUrl' => 'javascript:void(0)'
        ),
        '1start.jpg' => array(
            'title' => 'Image title',
            'alt' => 'Image alt',
            'pageUrl' => 'javascript:void(0)'
        )
    );

    public static function render($var = null) {
        $html = '<div id="gallery"><div class="inner">';

        foreach (self::$images as $key => $value) {
            $html .= '<a href="' . $value['pageUrl'] . '"><img src="/' . GALLERY_PATH . '/' . $key . '" alt="' . $value['alt'] . '" title="' . $value['title'] . '"/></a>';
        }
        $html .= '</div><div class="prev"></div><div class="next"></div></div>';
 
        echo $html;
    }
}

?>
