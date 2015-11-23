<?php

# @autor Viktor Protsenko <pro.victorr@gmail.com>
include_once 'core/constants.php';
include_once 'core/ImageEditor.php';

function file_not_found() {
    header('HTTP/1.0 404 not found');
    exit();
}

$image = array(
    'name' => $_GET['name'],
    'w' => $_GET['width'],
    'h' => $_GET['height'],
    'type' => $_GET['type']  // video or photo
);
if (!$image['type']  || !is_numeric($image['w']) || !is_numeric($image['h']) || !$image['name']) {
    file_not_found();
}
$image_parh_dir = ROOT_DIR . '/' . GALLERY_PATH . '/' . $image['type'] . '/thumbs/' .
        $image['w'] . 'x' . $image['h'] . '/';

$image_path = $image_parh_dir . $image['name'];

$imageObj = new ImageEditor();

if (!file_exists($image_path)) {
    // Файл не найден в кэше - пробуем создать кэш
    $real_image_path = ROOT_DIR . '/' . GALLERY_PATH . '/' . $image['type'] . '/' . $image['name'];
    
    if (!file_exists($real_image_path)) {
        file_not_found();
    }
    
    $imageObj->load($real_image_path);

    if ($image['w'] == 0 && $image['h'] == 0) {
        
    } else if ($image['w'] == 0) {
        $imageObj->resizeToHeight($image['h']);
    } else if ($image['h'] == 0) {
        $imageObj->resizeToWidth($image['w']);
    } else {
        $imageObj->resize($image['w'], $image['h']);
    }

    // Create folder if need
    if (!file_exists($image_parh_dir)) {
        mkdir($image_parh_dir, 0777, true);
    }

    $imageObj->save($image_path);
} else {
    
    $imageObj->load($image_path);
}

header('Content-type: ' . $MIME_IMAGE_TYPES[$imageObj->image_type]);
$imageObj->output();
?>