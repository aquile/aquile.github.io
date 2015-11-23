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
    $WHERE = array();
    if (is_numeric($_POST['userID'])) {
        $WHERE['payments.user'] = $_POST['userID'];
    }
    $pages = getEntityList($WHERE, $_POST['start'], $_POST['limit']);
    $output = array('success' => 'true', 'data' => $pages['data'], 'count' => $pages['count'][0]);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getEntityList($WHERE, $start = null, $limit = null) {
    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS payments.*, users.firstname as userfirstname, users.lastname as userlastname, users.login as userlogin FROM `' . cnf::$db_prefix . 'payments`'
            . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'users` ON `users`.id = `payments`.`user`'
            . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'schools` ON `schools`.id = `users`.`school`';
    $q_where = ' WHERE `schools`.`department` = ' . (SystemSettings::getByName('DEPARTMENT') ? SystemSettings::getByName('DEPARTMENT') : 1);
    
    foreach ($WHERE as $field => $value) {
        $q_where .= ' AND ' . $field . ' = "' . $value . '"';
    }
    
    $q .= $q_where . ' ORDER BY payments.id ASC';
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    
    $res = mysql_query($q) or die(mysql_error() . '\n'. $q);

    while($row = mysql_fetch_assoc($res)){
        $row['userDescription'] = $row['userlastname'] . ' ' . $row['userfirstname'] . '(' . $row['userlogin'] . ')';
        $result[] = $row;
    }

    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updateEntity($info) {
    $id = $info['id'];

    if ($info && count($info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'payments` SET ';
        $q_sub = '';
        foreach ($info as $field => $value) {
            if (strlen($q_sub) != 0) {
                $q_sub .= ", ";
            }
            
            if ($field == 'date') {
                $q_sub .= '`' . $field . '` = ' . formatDate(mysql_real_escape_string($value));
            } else {
                $q_sub .= '`' . $field . '` = "' . mysql_real_escape_string($value) . '"';
            }
        }

        $q .= $q_sub . ' WHERE `id` = ' . $id;
        mysql_query($q) or die(mysql_error() . $q);
    }

    return getEntityList(array('id' => $id), 0, 1);
}

function insertNewEntity($info) {
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'payments`(`user`, `date`, `amount`, `comment`, `days`) VALUES(%d, %s, "%s", "%s", %d)', 
            mysql_real_escape_string($info['user']),
            formatDate(mysql_real_escape_string($info['date'])),
            mysql_real_escape_string($info['amount']),
            mysql_real_escape_string($info['comment']),
            isset($info['days']) ? $info['days'] : 0);

    mysql_query($q) or die(mysql_error() . $q);

    $info['id'] = mysql_insert_id();

    return $info;
}

function deleteEntity($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'payments` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}

function formatDate($date) {
    if (!$date) {
        return 'NULL';
    } else {
        return '"' . $date .'"';
    }
}
?>