<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
// INSERT request
    $values = (array) json_decode($_POST['data']);
    $entity = insertNewEntity($values);

    $output = array('success' => 'true', 'data' => $entity);

} else if ($_GET['action'] == "update") {
// UPDATE request
    $values = (array) json_decode($_POST['data']);
    $entity = updateEntity($values);

    $output = array('success' => 'true', 'data' => $entity['data'][0]);

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
    $entities = getEntityList(array(), $_POST['start'], $_POST['limit']);
    $output = array('success' => 'true', 'data' => $entities['data'], 'count' => $entities['count'][0]);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getEntityList($WHERE, $start = null, $limit = null) {
    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS * FROM `' . cnf::$db_prefix . 'datanodes`';
    $q_where = '';
    
    if (count($WHERE)) {
        $q .= ' WHERE ';
        $q_where = '';
    }
    foreach ($WHERE as $field => $value) {
        if (strlen($q_where) > 0) $q_where .= ' AND ';
        $q_where .= $field .' = "' . $value . '"';
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

function updateEntity($info) {
    $id = $info['id'];

    if ($info && count($info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'datanodes` SET ';
        $q_sub = '';
        foreach ($info as $field => $value) {
            if (strlen($q_sub) != 0) {
                $q_sub .= ", ";
            }
            $q_sub .= '`' . $field . '` = "' . mysql_real_escape_string($value) . '"';
        }

        $q .= $q_sub . ' WHERE `id` = ' . $id;
        mysql_query($q) or die(mysql_error() . $q);
    }

    return getEntityList(array('id' => $id), 0, 1);
}

function insertNewEntity($info) {
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'datanodes`(`type`, `value`, `description`) VALUES("%s", "%s", "%s")', 
        mysql_real_escape_string($info['type']),
        mysql_real_escape_string($info['value']),
        mysql_real_escape_string($info['description']));

    mysql_query($q) or die(mysql_error() . $q);

    $info['id'] = mysql_insert_id();

    return $info;
}

function deleteEntity($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'datanodes` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}
?>