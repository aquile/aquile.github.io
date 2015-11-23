<?php
// 
include '../core/DBmanager.php';
DBmanager::init();
set_time_limit(600);

header('Content-type: text/plain; charset=utf-8');


$lessons = DBmanager::getLessons(array());
$topics = DBmanager::getTable('lesson_topics');

$tt = array();
for ($i = 0, $n = count($topics); $i < $n; $i++) {
    $topic = $topics[$i];
    if (!$tt[$topic['levelID']]) {
        $tt[$topic['levelID']] = array();
    }
    
    if (!$tt[$topic['levelID']][$topic['lessontypeID']]) {
        $tt[$topic['levelID']][$topic['lessontypeID']] = array();
    }
    
    $tt[$topic['levelID']][$topic['lessontypeID']][trim($topic['name'])] = $topic['id'];
}

$ll = array();
for($i = 0, $n = count($lessons); $i < $n; $i++) {
    $lesson = $lessons[$i];
    if (!$lesson['topic']) {
        continue;
    }
    if ($tt[$lesson['level']][$lesson['lesson_type']] && $tt[$lesson['level']][$lesson['lesson_type']][trim($lesson['topic'])]) {
        DBmanager::updateLesson($lesson['id'], array(
            'lessonTopicID' => $tt[$lesson['level']][$lesson['lesson_type']][trim($lesson['topic'])]
        ));
    }
}