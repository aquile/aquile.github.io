<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
    // add new page
    $values = (array) json_decode($_POST['data']);
    $page = insertNewPage($values);

    $output = array('success' => 'true', 'data' => $page);
} else if ($_GET['action'] == "update") {
    // add new page
    $values = (array) json_decode($_POST['data']);
    $page = updatePage($values);

    $output = array('success' => 'true', 'data' => $page['data'][0]);
} else if ($_GET['action'] == "delete") {
    $id = $_GET['id'];
    $success = true;
    if (is_numeric($id)) {
        deletePage($id);
    } else {
        $success = false;
    }
    
    $output = array('success' => $success);
} else {
    $pages = getPages('', $_POST['start'], $_POST['limit']);
    // Create the output object.
    $output = array('success' => 'true', 'data' => $pages['data'], 'count' => $pages['count'][0]);
}
?>