<?php

function renderPaging ($count, $pageSize, $current) {
    $html = '<div class="paging"><span class="paging_title">Страницы:</span> ';
    $pages = ceil($count / $pageSize);
    
    if ($pages == 1) {
        return;
    }
    
    for ($i = 1; $i <= $pages; $i++) {
        $html .= '<a href="/otzyvy/page/' . $i . '" class="' . ($i == $current || (!$current && $i == 1) ? 'paging_current' : '') . '">' . $i . '</a>';
    }

    $html .= '</div>';
    echo $html;
}

function renderComment($data, $ovv) {
    $stars = '';
    if ($data['rating'] > 0) {
        for ($i = 0; $i < 5; $i++) {
            $stars .= '<div class="stars ' . ($i < $data['rating'] ? 'hover': '') . '"></div>';
        }
    }
    echo '<div class="comment '. ($ovv ? 'ovv' : '') .'">
        <div class="comment_username">' . $data['name'] . '</div>
        <div class="comment_date">' . rus_date('H:i l, d F Y', $data['posted_time']) . '
            <!--<div class="comment_rating">' . $stars . '<div class="clr"></div></div>!-->
        </div>
        <div class="comment_content">' . $data['content'] . '</div>'.
        ($data['answer'] ? ('<div class="comment_answer"><div class="comment_username">Администратор</div>' . $data['answer'] . '</div>') : '').'</div>';
}
?>
<div style="padding: 10px 30px">
<?php
    $pageSize = 50;
    $pageNo = ($_GET['param'] && is_numeric($_GET['param'])) ? $_GET['param'] : 1;

    $comments = DBmanager::getComments($pageSize, $this->info['id'], (($pageNo - 1) * $pageSize));
    for($i = 0, $n = count($comments['data']); $i < $n; $i++) {
        renderComment($comments['data'][$i], $i%2);
    }
    renderPaging($comments['count'], $pageSize, $_GET['param']);
?>
</div>
<div class="block_header blue" style="margin-bottom: 10px;">Оставить отзыв</div>
<?php 
    if (User::$authorized) {
?>
<div style="padding: 10px 30px">
    <div class="review_form">
        <form action="add_comment" class="proxyform">
            <div>Оцени нас:</div>
            <div id="rating">
                <table><tr>
                <td class="star_big">1</td>
                <td class="star_big">2</td>
                <td class="star_big">3</td>
                <td class="star_big">4</td>
                <td class="star_big">5</td>
                </tr></table>
                <input type="hidden" name="rating" value="0"/>
            </div>
            <div style="padding-top: 10px;"><textarea required="1" errortext="Вы не ввели комментарий" style="width: 600px; max-width: 600px; height: 100px" name="content"></textarea></div>
            <input type="hidden" name="page" value="<?php echo $this->info['id']; ?>">
            <div style="padding-top: 10px;"><div class="button submitbutton" progresstext="Отправка...">Отправить</div></div>
        </form>
    </div>
</div>
<?php 
    } else {
        echo '<div class="lesson_unauthorized_message">Комментарии могут оставлять только зарегистрированные пользователи</div>';
    }
?>