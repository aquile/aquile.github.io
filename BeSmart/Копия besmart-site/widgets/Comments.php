<?php

/**
 * Description of Comments
 *
 * @author Viktor Protsenko <pro.victorr@gmail.com>
 */
class Comments {
    //put your code here
    
    public static function render($pid = 0){
        echo '<div class="comment-holder">
                <form action="#" class="comment-form" id="comments_form">
                        <span class="comment-title">Оставить отзыв</span>
                        <div class="evaluation">
                                <input type="text" name="name" class="user-name" value="Ваше имя"/>
                                <ul class="evaluation-list">
                                        <li class="hover"><a title="Очень плохо" href="javascript:void(0)">1</a></li>
                                        <li class="hover"><a title="Плохо" href="javascript:void(0)">2</a></li>
                                        <li class="hover"><a title="Средне" id="defaultRating" href="javascript:void(0)">3</a></li>
                                        <li><a title="Хорошо" href="javascript:void(0)">4</a></li>
                                        <li><a title="Отлично" href="javascript:void(0)">5</a></li>
                                </ul>
                                <input type="hidden" name="rating" id="rating_input" value="3">
                                <input type="hidden" name="page" value="'.$pid.'">
                        </div>
                        <textarea cols="30" rows="10" name="content" class="comment">Отзыв</textarea>
                        <input type="submit"  value="Добавить отзыв" class="add-comment" />
                </form>
                <div class="peoples-comments">' . self::getComments(30, $pid) . '</div>
        </div>';
    }
    
    public static function getComments($count, $pageID) {
        $html = '';
        $comments = DBmanager::getComments($count, $pageID);
        for ($i = 0, $n = count($comments); $i < $n; $i++) {
            $html .= '<div class="commentator-name">
                    <span class="name">' . $comments[$i]['name'] . '</span>
                    <ul class="stars-list">';
            for ($is = 0, $ns = $comments[$i]['rating']; $is < $ns; $is ++) {
                $html .= '<li><a href="#">s</a></li>';
            }
            $html .= '</ul>
                    </div>
                    <div class="comment-text">'.$comments[$i]['content'].'</div>';
        }
        
        return $html;
    }
}

?>
