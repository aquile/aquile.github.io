<?php

include_once '../core/preinit.php';
include_once '../core/constants.php';

function processPhoto($photo) {
    if ($photo['error'] == 0) {
        $new_photo_dir  = ROOT_DIR . '/' . GALLERY_PATH . '/teachers';
        $new_photo_name = time() . '_' . $photo['size'] . '_' . preg_replace('/[^\d\.a-z]+/i', '', $photo['name']);
        $new_photo_path = $new_photo_dir . '/' . $new_photo_name;
        
        if (!file_exists($new_photo_dir)) {
            mkdir($new_photo_dir, 0777, true);
        }
        
        $moved = move_uploaded_file($photo[tmp_name], $new_photo_path);
        
        if (!$moved) {
            $output = array('success' => false, 'msg' => 'Ошибка при сохранении файла');
        } else {
            $output = array('success' => true, 'image' => $new_photo_name);
        }
        
    } else {
        $output = array('success' => false, 'msg' => 'Ошибка при загрузке файла: #' . $_FILES['photo-path']['error']);
    }
    return $output;
}

$values = array();
$callback = $_REQUEST['callback'];

foreach ($_FILES as $field => $fileInfo) {
    $procces = processPhoto($fileInfo);
    if ($procces['success']) {
        $values[$field] = $procces['image'];
    }
}

$output = array(
    'success' => true,
    'data' => $values
);

echo json_encode($output);
exit();
//start output
if ($callback) {
    header('Content-Type: text/javascript');
    echo $callback . '(' . json_encode($output) . ');';
} else {
    header('Content-Type: application/x-json');
    echo json_encode($output);
}
?>
