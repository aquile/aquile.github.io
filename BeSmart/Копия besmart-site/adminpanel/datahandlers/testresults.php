<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
// INSERT request
    $values = (array) json_decode($_POST['data']);
    $user = insertNewEntity($values);

    $output = array('success' => 'true', 'data' => $user);

} else if ($_GET['action'] == "update") {
// UPDATE request
    $values = (array) json_decode($_POST['data']);
    $page = updateEntity($values);

    $output = array('success' => 'true', 'data' => $page['data'][0]);

} else if ($_GET['action'] == "delete") {
// DELETE request
    $id = $_GET['id'];
    $success = true;
    if (is_numeric($id)) {
        deleteEntity($id);
    } else {
        $success = false;
    }
    
    $output = array('success' => $success);

} else {
// VIEW request
    $pages = getEntityList(array(), $_POST['start'], $_POST['limit'], $_POST['qualifier']);
    $output = array('success' => 'true', 'data' => $pages['data'], 'count' => $pages['count'][0]);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getEntityList($WHERE, $start = null, $limit = null, $qualifier = null) {
    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS * FROM `' . cnf::$db_prefix . 'testresult`';
    $q_where = '';
    
    if (count($WHERE) || $qualifier) {
        $q .= ' WHERE ';
    }
    foreach ($WHERE as $field => $value) {
        if (strlen($q_where) > 0) $q_where .= ' AND ';
        $q_where .= $field .' = "' . $value . '"';
    }
    if ($qualifier) {
        $q_where .=  ' ' . $qualifier;
    }
    
    $q .= $q_where . ' ORDER BY id DESC';
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    $res = mysql_query($q) or die(mysql_error() . '\n'. $q);

    while($row = mysql_fetch_assoc($res)){
        $result[] = $row;
    }
    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updateEntity($info) {}

function insertNewEntity($info) {}

function deleteEntity($id) {}
?>