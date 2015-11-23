<?php
/*
header ('Content-type: text/plain; charset=utf-8');

include_once '../core/preinit.php';
include_once '../core/functions.php';
include_once '../core/DBmanager.php';

function updateUser($id, $lessons) {
    $q = 'UPDATE `nv_users` SET `lessons` = "' . mysql_real_escape_string(json_encode($lessons)) . '" WHERE id=' . $id; 
    
    mysql_query($q) or die(mysql_error(). "\n" . $q);
}
function cleanUpLessons($lessons) {
    $q = 'UPDATE `nv_lessons` SET `waiting` = "[]", `users` = "[]" WHERE `id` IN (' . implode(',', $lessons) . ')';
    
    mysql_query($q) or die(mysql_error(). "\n" . $q);
}


$startTime = strtotime('20.09.2013 00:00');
DBmanager::init();

$users = DBmanager::getUser(array());

$lessons = DBmanager::getLessons(array(
    'level' => 2
));
//print_r($lessons);
$LessonToRestore = array();
for ($i = 0, $n = count($lessons); $i < $n; $i++) {
    $lesson = $lessons[$i];
    if ($startTime < $lesson['time']) {
        $LessonToRestore[] = $lesson['id'];
    }
}

for ($i = 0, $n = count($users); $i < $n; $i++) {
    $user = $users[$i];
    $newLessonList = array();
        
    for ($j = 0, $nj = count($user['lessons']); $j < $nj; $j++) {
        if (!in_array($user['lessons'][$j], $LessonToRestore)) {
            $newLessonList[] = $user['lessons'][$j];
        }
    }
    
    updateUser($user['id'], $newLessonList);
}

cleanUpLessons($LessonToRestore);
//print_r($users);*/
?>
