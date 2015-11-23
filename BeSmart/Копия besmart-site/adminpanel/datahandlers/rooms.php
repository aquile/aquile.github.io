<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
// INSERT request
    $values = (array) json_decode($_POST['data']);
    $page = insertNewEntity($values);

    $output = array('success' => 'true', 'data' => $page);

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
    $pages = getEntityList(array(), $_POST['start'], $_POST['limit']);
    $output = array('success' => 'true', 'data' => $pages['data'], 'count' => $pages['count'][0]);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getEntityList($WHERE, $start = null, $limit = null) {
    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS rooms.*, schools.name as schoolName FROM `' . cnf::$db_prefix . 'rooms`'
            . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'schools` ON `schools`.id = `rooms`.`school`';
    $q_where = ' WHERE `schools`.`department` = ' . (SystemSettings::getByName('DEPARTMENT') ? SystemSettings::getByName('DEPARTMENT') : 1);
    
    foreach ($WHERE as $field => $value) {
        $q_where .= ' AND ' . $field . ' = "' . $value . '"';
    }
    
    $q .= $q_where . ' ORDER BY id ASC';
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    $res = mysql_query($q) or die(mysql_error() . '\n'. $q);

    while($row = mysql_fetch_assoc($res)){
        $row['nameAndLimit'] = $row['name'] . ' (' . $row['limit'] . ')';
        $row['nameAndLimitAndSchool'] = $row['name'] . ' (' . $row['limit'] . ') - ' . $row['schoolName'];
        $result[] = $row;
    }

    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updateEntity($info) {
    $id = $info['id'];

    if ($info && count($info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'rooms` SET ';
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
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'rooms`(`id`, `name`, `limit`, `school`) VALUES(0, "%s", "%s", %d)', 
            mysql_real_escape_string($info['name']),
            mysql_real_escape_string($info['limit']),
            mysql_real_escape_string($info['school']));

    mysql_query($q) or die(mysql_error() . $q);

    $info['id'] = mysql_insert_id();

    return $info;
}

function deleteEntity($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'rooms` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}
?>