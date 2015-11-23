<?php
//if (!ROOT_DIR) {
//	include '/home/stkiev/public_html/core/cnf.php';
//} else {
//	include ROOT_DIR . '/core/cnf.php';
//}
//
//# @autor Viktor Protsenko <pro.victorr@gmail.com>
//
//// Try Connect into DB
//$db_inst = mysql_connect(cnf::$db_host, cnf::$db_user, cnf::$db_pass) or die('DB connection failed');
//
//// Select DB
//mysql_select_db(cnf::$db_name, $db_inst) or die('Can\'t change DB');
//
//// Set charset
//mysql_query('SET NAMES "utf8";');
//mysql_query('SET CHARACTER SET "utf8";');
//mysql_query('SET SESSION collation_connection = "utf8_general_ci";');

/* * ***********************************
 * PAGES Entity
 * *********************************** */

function getPages($id = '', $start = null, $limit = null) {
    $result = array();
    $q = "SELECT SQL_CALC_FOUND_ROWS * FROM `" . cnf::$db_prefix . "pages` p";
    if (is_numeric($id)) {
        $q .= " WHERE id = " . $id;
    }
    $q .= ' ORDER BY id DESC';
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    $res = mysql_query($q) or die(mysql_error());

    while ($row = mysql_fetch_assoc($res)) {
        $result[] = $row;
    }
    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updatePage($page_info) {
    $id = $page_info['id'];
    unset($page_info['id']);

    if (count($page_info)) {
//        if (array_key_exists('content', $page_info)) {
//            $q = sprintf('UPDATE `' . cnf::$db_prefix . 'page_content` SET `content` = "%s" WHERE `id` = %d', mysql_real_escape_string($page_info['content']), $id);
//            mysql_query($q) or die(mysql_error() . $q);
//            unset($page_info['content']);
//        }

        if (count($page_info)) {
            $q = 'UPDATE `' . cnf::$db_prefix . 'pages` SET ';
            $q_sub = '';
            foreach ($page_info as $field => $value) {
                if (strlen($q_sub) != 0) {
                    $q_sub .= ", ";
                }
                $q_sub .= '`' . $field . '` = "' . mysql_real_escape_string($value) . '"';
            }

            $q .= $q_sub . ' WHERE `id` = ' . $id;
            mysql_query($q) or die(mysql_error() . $q);
        }
    }
    return getPages($id);
}

function insertNewPage($page_info) {
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'pages`
        (id, name, title, description, keywords, content_on_disc, template, content, protected)
        VALUES(0, "%s", "%s", "%s", "%s", "%s", %d, "%s", 0)', 
            mysql_real_escape_string($page_info['name']), 
            mysql_real_escape_string($page_info['title']), 
            mysql_real_escape_string($page_info['description']), 
            mysql_real_escape_string($page_info['keywords']), 
            mysql_real_escape_string($page_info['content_on_disc']), 
            $page_info['template'],
            mysql_real_escape_string($page_info['content']));

    mysql_query($q) or die(mysql_error() . $q);

    $page_info['id'] = mysql_insert_id();
//    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'page_content` VALUES(%d, "%s")', 
//            $page_info['id'], 
//            mysql_real_escape_string($page_info['content']));
//    
//    mysql_query($q) or die(mysql_error() . $q);

    return $page_info;
}

function deletePage($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'pages` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
//    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'page_content` WHERE `id` = %d', $id);
//    mysql_query($q) or die(mysql_error() . $q);
}
?>