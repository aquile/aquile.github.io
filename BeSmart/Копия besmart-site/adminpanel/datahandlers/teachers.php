<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
// INSERT request
    $values = (array) json_decode($_POST['data']);
    $data = insertNewEntity($values);
    $output = array('success' => 'true', 'data' => $data);

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
    $q = 'SELECT SQL_CALC_FOUND_ROWS * FROM `' . cnf::$db_prefix . 'teachers`';
    
    $q_where = ' WHERE `deleted` = 0 ';
    foreach ($WHERE as $field => $value) {
        $q_where .= ' AND `' . $field .'` = "' . $value . '"';
    }
    
    $q_where .= ' AND `department` = ' . (SystemSettings::getByName('DEPARTMENT') ? SystemSettings::getByName('DEPARTMENT') : 1);
    
    $q .= $q_where;
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    $res = mysql_query($q) or die(mysql_error() . '\n'. $q);

    while($row = mysql_fetch_assoc($res)){
        $row['fullname'] = $row['lastname'] . ' ' . $row['firstname'];
        $result[] = $row;
    }

    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updateEntity($info) {
    $id = $info['id'];

    if ($info && count($info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'teachers` SET ';
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
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'teachers`(`firstname`, `lastname`, `photo`,`photo2`,`photo3`, `tel`, `email`, `education`, `hobby`, `fsong`, `fmovie`, `fbook`, `fquote`, `department`) VALUES("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", %d)', 
            mysql_real_escape_string($info['firstname']),
            mysql_real_escape_string($info['lastname']),
            mysql_real_escape_string($info['photo'] ? $info['photo'] : ''),
            mysql_real_escape_string($info['photo2'] ? $info['photo2'] : ''),
            mysql_real_escape_string($info['photo3'] ? $info['photo3'] : ''),
            mysql_real_escape_string($info['tel']),
            mysql_real_escape_string($info['email']),
            mysql_real_escape_string($info['education']),
            mysql_real_escape_string($info['hobby']),
            mysql_real_escape_string($info['fsong']),
            mysql_real_escape_string($info['fmovie']),
            mysql_real_escape_string($info['fbook']),
            mysql_real_escape_string($info['fquote']),
            SystemSettings::getByName('DEPARTMENT') ? SystemSettings::getByName('DEPARTMENT') : 1);

    mysql_query($q) or die(mysql_error() . $q);

    $info['id'] = mysql_insert_id();

    return $info;
}

function deleteEntity($id) {
    $q = sprintf('UPDATE `' . cnf::$db_prefix . 'teachers` SET `deleted` = 1 WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}
?>