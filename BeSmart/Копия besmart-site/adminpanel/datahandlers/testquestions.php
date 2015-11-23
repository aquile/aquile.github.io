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
    $params = array();
    if (is_numeric($_POST['testId'])) {
        $params['test'] = $_POST['testId'];
    }
    $pages = getEntityList($params, $_POST['start'], $_POST['limit']);
    $output = array('success' => 'true', 'data' => $pages['data'], 'count' => $pages['count'][0]);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getEntityList($WHERE, $start = null, $limit = null) {
    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS * FROM `' . cnf::$db_prefix . 'test_questions`';
    $q_where = '';
    
    if (count($WHERE)) {
        $q .= ' WHERE ';
        $q_where = '';
    }
    foreach ($WHERE as $field => $value) {
        if (strlen($q_where) > 0) $q_where .= ' AND ';
        $q_where .= $field .' = "' . $value . '"';
    }
    
    $q .= $q_where . ' ORDER BY id ASC';
    
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
        $q = 'UPDATE `' . cnf::$db_prefix . 'test_questions` SET ';
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
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'test_questions`(`header`,`body`,`group`,`qnumber`,`points`,`test`) VALUES("%s", "%s", "%s", %d, %d, %d)', 
            mysql_real_escape_string($info['header']),
            mysql_real_escape_string($info['body']),
            mysql_real_escape_string($info['group']),
            mysql_real_escape_string($info['qnumber']),
            mysql_real_escape_string($info['points']),
            mysql_real_escape_string($info['test']));

    mysql_query($q) or die(mysql_error() . $q);

    $info['id'] = mysql_insert_id();

    return $info;
}

function deleteEntity($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'test_questions` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}
?>