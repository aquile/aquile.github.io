<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
    // add new page
    $values = (array) json_decode($_POST['data']);
    $page = insertNewComment($values);

    $output = array('success' => 'true', 'data' => $page);
} else if ($_GET['action'] == "update") {
    // add new page
    $values = (array) json_decode($_POST['data']);
    $page = updateComment($values);

    $output = array('success' => 'true', 'data' => $page['data'][0]);
} else if ($_GET['action'] == "delete") {
    $id = $_GET['id'];
    deleteComment($id);
    
    $output = array('success' => 'true');
} else {
    $pages = getComment(array(), $_POST['start'], $_POST['limit']);
    // Create the output object.
    $output = array('success' => 'true', 'data' => $pages['data'], 'count' => $pages['count'][0]);
}


/* * **********************************
 * NEWS Entity
 * ********************************** */

function getComment($WHERE, $start = null, $limit = null) {
    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS c.*, u.login as userLogin
        FROM `' . cnf::$db_prefix . 'comments` c
        LEFT OUTER JOIN `' . cnf::$db_prefix . 'users` u ON u.id = c.userID';
    
    if (count($WHERE)) {
        $q .= ' WHERE ';
        $q_where = '';
    }
    foreach ($WHERE as $field => $value) {
        if (strlen($q_where) > 0) $q_where .= ' AND ';
        $q_where .= $field .' = "' . $value . '"';
    }
    
    $q .= $q_where . ' ORDER BY `c`.id DESC';
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    
    $res = mysql_query($q) or die(mysql_error() . ' - \r\n'. $q);

    while($row = mysql_fetch_assoc($res)){
//        replaceToObject($row, 'page', 'toPage');
        $result[] = $row;
    }
    
    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updateComment($comment_info) {
    $id = $comment_info['id'];
    unset($comment_info['id']);

    if ($comment_info && count($comment_info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'comments` SET ';
        $q_sub = '';
        foreach ($comment_info as $field => $value) {
            if (strlen($q_sub) != 0) {
                $q_sub .= ", ";
            }
            $q_sub .= '`' . $field . '` = "' . mysql_real_escape_string($value) . '"';
        }

        $q .= $q_sub . ' WHERE `id` = ' . $id;
        mysql_query($q) or die(mysql_error() . $q);
    }
    
    return getComment(array('c.id' => $id));
}

function insertNewComment($comment_info) {
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'comments` VALUES(0, %d, %d, "%s", "%s", %d, %d, "%s")', 
            $comment_info['page'],
            time(),
            mysql_real_escape_string($comment_info['name']),
            mysql_real_escape_string($comment_info['content']), 
            $comment_info['rating'] ? $comment_info['rating'] : 3, 
            $comment_info['read'] ? $comment_info['read'] : 0,
            mysql_real_escape_string($comment_info['answer']));
    mysql_query($q) or die(mysql_error() . $q);

    $comment_info['id'] = mysql_insert_id();

    return getComment(array('c.id' => $comment_info['id']));
}

function deleteComment($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'comments` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}

function replaceToObject(&$arr, $prefix, $objectName){
    $new_arr = array();
    $pp = array();
    
    foreach($arr as $key => $val){
        if (strpos($key, $prefix . '_') !== false){
            $pp = explode('_', $key);
            $new_arr[$pp[1]] = $val;
            
            unset($arr[$key]);
        }
    }
    
    $arr[$objectName] = $new_arr;
}
?>