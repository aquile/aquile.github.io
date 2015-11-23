<?php
$renderAll = true;
$pageSize = 20;

$id = $_GET['param'];
    
    if ($_GET['subpage'] == 'view' && is_numeric($id)) {
        $news = DBmanager::getNews($id);
        if (count($news['data'])) {
            $renderAll = false;
        } else {
            $news = DBmanager::getNews(0, 0, $pageSize);
        }
    } else {
        $pageNo = ($_GET['param'] && is_numeric($_GET['param'])) ? $_GET['param'] : 1;
    
        $news = DBmanager::getNews(0, (($pageNo - 1) * $pageSize), $pageSize);
    }
    if (!$renderAll) {
        renderNewsDetails($news['data'][0]);
    } else {
        if (count($news['data'])) {
            renderAllNews($news, $pageSize);
        }
    }
    
    
function renderAllNews($news_info, $pageSize) {
    $html = '<div class="news_container">';
    $news = $news_info['data'];
    for ($i = 0, $n = count($news); $i < $n; $i++) {
        $nw = $news[$i];
        $html .= '<div class="news_item">
        <div class="news_title"><a href="/news/view/' . $nw['id'] . '">' . $nw['title'] . '</a></div>
        <div class="news_time">' . rus_date('l, d F Y', strtotime($nw['time'])) . '</div>
        <div class="news_body">' . mb_word_wrap(strip_tags($nw['body']), 300, '...') . ' <a href="/news/view/' . $nw['id'] . '" class="news_read_more">Читать далее >></a></div>
    </div>';
    }

    $html .= '</div>';

    echo $html;

    renderPaging($news_info['count'], $pageSize, $_GET['param']);
}

function renderNewsDetails ($news_info) {
    echo '<div class="path">
            <a href="/news"><< Все новости</a>
        </div>
        <div class="news_details">
            <div class="news_title">' . $news_info['title'] . '</div>
            <div class="news_time">' . rus_date('l, d F Y', strtotime($news_info['time'])) . '</div>
            <div class="news_body" style="padding-top: 20px;">' . $news_info['body'] . '</div></div>';
}
function renderPaging ($count, $pageSize, $current) {
    $html = '<div class="paging"><span class="paging_title">Страницы:</span> ';
    $pages = ceil($count / $pageSize);
    
    if ($pages == 1) {
        return;
    }
    
    for ($i = 1; $i <= $pages; $i++) {
        $html .= '<a href="/news/page/' . $i . '" class="' . ($i == $current || (!$current && $i == 1) ? 'paging_current' : '') . '">' . $i . '</a>';
    }

    $html .= '</div>';
    echo $html;
}
?>