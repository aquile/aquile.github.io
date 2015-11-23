<?php
include_once '../core/preinit.php';
include_once '../core/functions.php';

require_once '../core/DBmanager.php';

DBmanager::init();

// Rendering functions
function renderPaging ($count, $pageSize, $current) {
    $html = '<div class="paging"><span class="paging_title">Страницы:</span> ';
    $pages = ceil($count / $pageSize);

    if ($pages == 1) {
        return '';
    }
    for ($i = 1; $i <= $pages; $i++) {
        $html .= '<a href="javascript:void(0)" data:pageNo="' . $i . '" class="' . ($i == $current || (!$current && $i == 1) ? 'paging_current' : '') . '">' . $i . '</a>';
    }
    $html .= '</div>';
    return $html;
}
function renderComment($commentInfo, $ovv) {
    $stars = '';
    if ($commentInfo['rating'] > 0) {
        for ($i = 0; $i < 5; $i++) {
            $stars .= '<div class="stars ' . ($i < $commentInfo['rating'] ? 'hover': '') . '"></div>';
        }
    }
    
    return '<div class="comment ' . ($ovv ? 'ovv' : '') . '">
        <div class="comment_username">' . $commentInfo['name'] . '</div>
        <div class="comment_date">' . rus_date('H:i l, d F Y', $commentInfo['posted_time']) . '
            <div class="comment_rating">' . $stars . '<div class="clr"></div></div>
        </div>
        <div class="comment_content">' . $commentInfo['content'] . '</div>'.
        ($commentInfo['answer'] ? ('<div class="comment_answer"><div class="comment_username">Администратор</div>' . $commentInfo['answer'] . '</div>') : '').'</div>';
}

// Proccess data
$pageNo = (is_numeric($_GET['page']) && $_GET['page'] > 0) ? $_GET['page'] : 1;
$limit = 20;
$start = ($pageNo - 1) * $limit;
$teacherID = $_GET['teacherID'];
$output = '';

$data = DBmanager::getTeacherComments($teacherID, $start, $limit);

$comments = $data['data'];

if (count($comments)) {
    for ($i = 0; $i < count($comments); $i++) {
        $output .= renderComment($comments[$i], $i%2);
    }
} else {
    $output .= '<div style="padding: 10px; text-align: center">Пока нет отзывов</div>';
}
if ($data['count']) {
    $output .= renderPaging($data['count'], $limit, $pageNo);
}

echo $output;
?>
