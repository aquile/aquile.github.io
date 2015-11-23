<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of bottomComments
 *
 * @author Мой дом-моя крепость
 */
class bottomComments implements iWidget {
    public static function render($var = null) {
        $comments = DBmanager::getComments(3, 79);
        $comments = $comments['data'];
        $html .='<div class="block_middle">
                        <div class="block_header">Последние Отзывы</div>
                        <div class="block_content">
                            <div class="reviews">';
                                
        for($i = 0, $n = count($comments); $i < $n; $i++) {
            $html .= '<div class="reviews_item" style="' . ($i === $n - 1 ? 'margin-right: 0' : '') . '">
        <div class="reviews_item_user">' . $comments[$i]['name'] . '</div>
        <div class="reviews_item_date">' . rus_date('l, d F Y', $comments[$i]['posted_time']) . '</div>
        <div class="reviews_item_content ellipsis"><div>' . $comments[$i]['content'] . '</div></div></div>';
        }
                                
        $html .= '<div class="clr"></div>
                    <div style="position: absolute; margin-top: 20px; margin-left: 20px;">
                        <a href="/otzyvy"><div class="button">Все отзывы</div></a>
                    </div>
                </div>
            </div>
        </div>';
        
        
        echo $html;
    } 
}

?>
