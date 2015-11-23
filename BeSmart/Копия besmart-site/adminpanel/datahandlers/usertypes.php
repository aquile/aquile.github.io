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
    $entities = getEntities(array(), $_POST['start'], $_POST['limit']);
    $output = array('success' => 'true', 'data' => $entities['data'], 'count' => $entities['count'][0]);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getEntities($WHERE, $start = null, $limit = null) {
    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS * FROM `' . cnf::$db_prefix . 'usertypes`'
       . ' WHERE (department = ' . (SystemSettings::getByName('DEPARTMENT') ? SystemSettings::getByName('DEPARTMENT') : 1) . ' OR department = 0)';
    
    foreach ($WHERE as $field => $value) {
        $q .= ' AND ' . $field .' = "' . $value . '"';
    }
    
    $q .= ' ORDER BY id DESC';
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    $res = mysql_query($q) or die(mysql_error() . '\n'. $q);

    while($row = mysql_fetch_assoc($res)){
        $row['visibleForAll'] = $row['department'] == 0;
        $result[] = $row;
    }

    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updateEntity($info) {
    $id = $info['id'];
    if (isset($info['visibleForAll'])) {
        if ($info['visibleForAll']) {
            $info['department'] = 0;
        } else {
            $info['department'] = (SystemSettings::getByName('DEPARTMENT') ? SystemSettings::getByName('DEPARTMENT') : 1);
        }

        unset($info['visibleForAll']);
    }
    
    if ($info && count($info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'usertypes` SET ';
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

    return getEntities(array('id' => $id), 0, 1);
}

function insertNewEntity($info) {
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'usertypes`(`id`, `name`,`timeFrom`,`timeTo`,`daysPerMonth`, `allowRegister`, `visibleDays`, `multischool`, `department`) VALUES(0, "%s", %d, %d, %d, %d, %d, %d, %d)', 
            mysql_real_escape_string($info['name']),
            $info['timeFrom'],
            $info['timeTo'],
            $info['daysPerMonth'],
            $info['allowRegister'] ? 1 : 0,
            $info['visibleDays'],
            $info['multischool'],
            $info['department']);

    mysql_query($q) or die(mysql_error() . $q);

    $info['id'] = mysql_insert_id();

    return $info;
}

function deleteEntity($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'usertypes` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}
?>