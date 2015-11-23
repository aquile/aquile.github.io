<?php
header('Content-type: text/plain');
include '../../core/DBmanager.php';


DBmanager::init();




$dir    = 'questions'; 
$newDir = 'done';
$files = scandir($dir); 




echo "-----------------\n";
print_r($files);
echo "-----------------\n";

$qInfo = array();
$QQ = array();
foreach($files as $fileName) {
    $file = $dir . '/' . $fileName;
    $fileParts = explode('_', preg_replace('/.txt/i', '', $fileName));
    if (is_file($file)) {
        $qInfo['test'] = $fileParts[0];
        $qInfo['group'] = $fileParts[1];
        $qInfo['header'] = '';
        $qInfo['points'] = 1;
        
        echo 'File name: ' . $fileName . "\n";
        $fileContent = trim(file_get_contents($file));
        
        $questions = explode("\r\n\r\n", $fileContent);
        
        for($i = 0, $n = count($questions); $i < $n; $i++) {
            $qInfo['qnumber'] = $i + 1;
            $qInfo['body'] = $questions[$i];
            $QQ[] = $qInfo;
        }
        
        rename($file, $newDir . '/' . $fileName);
    }
}

echo 'Добавлено ' . count($QQ) . ' вопросов';
if (count($QQ)) {
    DBmanager::insertNewQuestion($QQ);
}
