<?php
# @author Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
// INSERT request
    $values = (array) json_decode($_POST['data']);
//    $page = insertNewEntity($values);

    $output = array('success' => 'true'/*, 'data' => $page*/);

} else if ($_GET['action'] == "update") {
// UPDATE request
    $values = (array) json_decode($_POST['data']);
//    $page = updateEntity($values);

    $output = array('success' => 'true'/*, 'data' => $page['data'][0]*/);

} else if ($_GET['action'] == "delete") {
// DELETE request
    $id = $_GET['id'];
    $success = true;
//    if (is_numeric($id)) {
//        deleteEntity($id);
//    } else {
//        $success = false;
//    }
    
    $output = array('success' => $success);

} else {
// VIEW request
    $pages = getEntityList(array(), $_POST['start'], $_POST['limit']);
    $output = array('success' => 'true', 'data' => $pages['data'], 'count' => $pages['count'][0]);
}

/* * **********************************
 * Templates Entity
 * ********************************** */

function getEntityList() {
    $levels = DBmanager::getTable('levels',0, 1000, 'id');
    $userTypes = DBmanager::getTable('usertypes', 0, 1000, 'id');
    
    
    $q = 'SELECT u.* FROM `' . cnf::$db_prefix . 'users` u '
            . ' LEFT OUTER JOIN `schools` s ON s.id=u.school'
            . ' WHERE s.department = ' . (SystemSettings::getByName('DEPARTMENT') ? SystemSettings::getByName('DEPARTMENT') : 1);
    $res = mysql_query($q) or die(mysql_error() . $q);
    
    $counter = array(
        'all'           => 0,
        'active'        => 0,
        'blocked'       => 0,
        'byLevel'       => array(),
        'byType'        => array()
    );
    
    while($row = mysql_fetch_assoc($res)) {
        $counter['all'] ++;
        if (!$row['availableTo'] || strtotime($row['availableTo']) > time()) {
            $counter['active'] ++;
            
            if (strtotime($row['blockedTill']) > time()) {
                $counter['blocked'] ++;
            }

            if (!$counter['byType'][$row['userTypeID']]) {
                $counter['byType'][$row['userTypeID']] = 0;
            }
            $counter['byType'][$row['userTypeID']]++;

            if (!$counter['byLevel'][$row['level']]) {
                $counter['byLevel'][$row['level']] = 0;
            }
            $counter['byLevel'][$row['level']]++;
        }
        
    }
    
    $result = array(
        array(
            'name'  => 'Активных всего',
            'value' => $counter['active'],
            'bindings' => array(
                'isActive' => true
            )
        ),
        array(
            'name'  => 'Активных блокировано',
            'value' => $counter['blocked'],
            'bindings' => array(
                'isBlocked' => true,
                'isActive' => true
            )
        ),
        array(
            'name'  => 'Всего абонементов',
            'value' => $counter['all'],
            'bindings' => array()
        )
    );
    
    foreach ($counter['byType'] as $typeID => $count) {
        $result[] = array(
            'name' => $userTypes[$typeID]['name'],
            'value' => $count,
            'bindings' => array(
                'userTypeID' => $typeID,
                'isActive' => true
            )
        );
    }
    
    foreach ($counter['byLevel'] as $levelID => $count) {
        $result[] = array(
            'name' => $levels[$levelID]['name'],
            'value' => $count,
            'bindings' => array(
                'level' => $levelID,
                'isActive' => true
            )
        );
    }
    
    
    return array('data' => $result, 'count' => count($result));
}
