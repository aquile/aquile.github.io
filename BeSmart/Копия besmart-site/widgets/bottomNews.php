<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of bottomNews
 *
 * @author Мой дом-моя крепость
 */
class bottomNews implements iWidget {
    public static function render($var = null) {
        $news = DBmanager::getNews(0, 0, 3);
        
        self::renderNewsBlock($news['data']);
    }
    
    public static function renderNewsBlock ($news) {
        $html = '<div class="block_middle">
                    <div class="block_header">Последние Новости</div>
                    <div class="block_content">
                        <div class="reviews">';
                                    
        for($i = 0, $n = count($news); $i < $n; $i++) {
            $html .= '
            <div class="reviews_item" style="' . ($i === $n - 1 ? 'margin-right: 0' : '') . '; padding-top: 5px">
                <div class="reviews_item_user"><a href="/news/view/' . $news[$i]['id'] . '">' . $news[$i]['title'] . '</a></div>
                <div class="reviews_item_date">' . rus_date('l, d F Y', strtotime($news[$i]['time'])) . '</div>
                <div class="reviews_item_content ellipsis"><div>' . $news[$i]['body'] . '</div></div>
            </div>';
        }

                                
                $html .= '<div class="clr"></div>
                        <div style="text-align: right">
                            <a href="/news"><div class="button">Все новости</div></a>
                        </div>
                    </div>
                </div>
            </div>';
        
        echo $html;
    }
}

?>
