<?php
# @autor Viktor Protsenko <pro.victorr@gmail.com>
if ($_GET['action'] == "new") {
// INSERT request
    $values = (array) json_decode($_POST['data']);
    $user = insertNewEntity($values);

    Mailer::sendEmail(Mailer::$USER_REG, array(
        'login' => $user['login'],
        'pass' => $user['pass'],
        'firstname' => $user['firstname'],
        'lastname' => $user['lastname']
    ), $user['email']);

    $output = array('success' => 'true', 'data' => $user);

} else if ($_GET['action'] == "update") {
// UPDATE request
    $values = (array) json_decode($_POST['data']);
    $users = updateEntity($values);
    
    if (count($users['data']) && ($values['email'] || $values['pass'])) {
        // Send email to user in case when password or email was changed
        $user = $users['data'][0];
        if (PHPMailer::ValidateAddress($user['email'])) {
            Mailer::sendEmail(Mailer::$USER_REG, array(
                'login' => $user['login'],
                'pass' => $user['pass'],
                'firstname' => $user['firstname'],
                'lastname' => $user['lastname']
            ), $user['email']);
        }
    }
    $output = array('success' => 'true', 'data' => $users['data'][0]);

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

} else if ($_GET['action'] == 'reminduserinfo') {
    // Remind user info
    $id = $_POST['id'];
    $success = true;
    if (is_numeric($id)) {
        $users = getEntityList(array('id' => $id), 0, 1);
        
        if (count($users['data'])) {
            $user = $users['data'][0];
            
            if (PHPMailer::ValidateAddress($user['email'])) {
                Mailer::sendEmail(Mailer::$USER_REG, array(
                    'login' => $user['login'],
                    'pass' => $user['pass'],
                    'firstname' => $user['firstname'],
                    'lastname' => $user['lastname']
                ), $user['email']);
            }
        }
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
    $bindingsString = '';
    $bindings = $_POST['bindings'];
    if ($bindings) {
        $bindings = (array)json_decode($bindings);
        if ($bindings['isActive']) {
            $bindingsString .= ' AND (`availableTo` IS NULL OR `availableTo` > "' . date('Y-m-d'). '")';
        }
        if ($bindings['isBlocked']) {
            $bindingsString .= ' AND (`blockedTill` IS NOT NULL AND `blockedTill` > "' . date('Y-m-d') . '")';
        }
        unset($bindings['isActive'], $bindings['isBlocked']);

        foreach ($bindings as $key => $value) {
            $bindingsString .= ' AND `' . $key . '` = "' . $value . '"';
        }
    }

    $result = array();
    $q = 'SELECT SQL_CALC_FOUND_ROWS u.*, s.department FROM `' . cnf::$db_prefix . 'users` u '
            . ' LEFT OUTER JOIN `schools` s ON s.id = u.school '
            . ' WHERE s.department = ' . (SystemSettings::getByName('DEPARTMENT') ? SystemSettings::getByName('DEPARTMENT') : 1);
    
    foreach ($WHERE as $field => $value) {
        $q .= ' AND u.`' . $field . '` = "' . $value . '"';
    }
    $q .= $bindingsString;
    $q .= ' ORDER BY u.id DESC';
    
    if (is_numeric($limit) && is_numeric($start)) {
        $q .= ' LIMIT ' . $start . ', ' . $limit;
    }
    $res = mysql_query($q) or die(mysql_error() . '\n'. $q);

    while($row = mysql_fetch_assoc($res)){
        if (!$row['availableTo'] || strtotime($row['availableTo']) > time()) {
            $row['isActive'] = true;
        } else {
            $row['isActive'] = false;
        }
        if ($row['blockedTill'] && strtotime($row['blockedTill']) > time()) {
            $row['isBlocked'] = true;
        } else {
            $row['isBlocked'] = false;
        }
        $row['hasTeacher'] = $row['toTeacher'] ? true : false;
        $row['fullname'] = $row['lastname'] . ' ' . $row['firstname'];
        $result[] = $row;
    }

    // Calc count of all mathces (ignore LIMIT)
    $count = mysql_fetch_row(mysql_query('SELECT FOUND_ROWS()'));
    
    return array('data' => $result, 'count' => $count);
}

function updateEntity($info) {
    $id = $info['id'];
    unset($info['hasTeacher'], $info['isActive'], $info['isBlocked']);

    if ($info && count($info)) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'users` SET ';
        $q_sub = '`modificationDate` = NOW()';
        foreach ($info as $field => $value) {
            if (strlen($q_sub) != 0) {
                $q_sub .= ", ";
            }
            if ($field == 'toTeacher' || $field == 'school') {
                $q_sub .= '`' . $field . '` = ' . ($info[$field] ? $info[$field] : 'NULL');
            } else if ($field == 'availableFrom' || $field == 'availableTo' || $field == 'blockedTill' ||  $field == 'birthdate') {
                $q_sub .= '`' . $field . '` = ' . formatDate(mysql_real_escape_string($value));
            } else {
                $q_sub .= '`' . $field . '` = "' . mysql_real_escape_string($value) . '"';
            }
        }
        $q .= $q_sub . ' WHERE `id` = ' . $id;
        echo $q;
        mysql_query($q) or die(mysql_error() . $q);
    }

    return getEntityList(array('id' => $id), 0, 1);
}

function insertNewEntity($info) {
    DBmanager::startTransaction();
    
    $info['login'] = getNextLogin();
    
    $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'users`(`login`, `pass`, `userTypeID`, `firstname`, `lastname`, `tel`, `email`, `level`, `contractNumber`, `availableFrom`, `availableTo`, `blockedTill`, `toTeacher`, `price`, `school`, `comments`, `birthdate`, `hasBook`, `managerID`) VALUES("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", %s, %s, %s, %s, "%s", %s, "%s", %s, %d, %d)', 
            mysql_real_escape_string($info['login']),
            mysql_real_escape_string($info['pass']),
            mysql_real_escape_string($info['userTypeID']),
            mysql_real_escape_string($info['firstname']),
            mysql_real_escape_string($info['lastname']), 
            mysql_real_escape_string($info['tel']),
            mysql_real_escape_string($info['email']),
            mysql_real_escape_string($info['level']),
            mysql_real_escape_string($info['contractNumber']),
            formatDate(mysql_real_escape_string($info['availableFrom'])),
            formatDate(mysql_real_escape_string($info['availableTo'])),
            formatDate(mysql_real_escape_string($info['blockedTill'])),
            ($info['toTeacher'] ? $info['toTeacher'] : 'NULL'),
            mysql_real_escape_string($info['price']),
            ($info['school'] ? $info['school'] : 'NULL'),
            mysql_real_escape_string($info['comments']),
            formatDate(mysql_real_escape_string($info['birthdate'])),
            $info['hasBook'] ? 1 : 0,
            $info['managerID']);
    
    mysql_query($q) or die(mysql_error() . $q);
    
    $info['id'] = mysql_insert_id();

    DBmanager::commitTransaction();
    return $info;
}

function deleteEntity($id) {
    $q = sprintf('DELETE FROM `' . cnf::$db_prefix . 'users` WHERE `id` = %d', $id);
    mysql_query($q) or die(mysql_error() . $q);
}

function formatDate($date) {
    if (!$date) {
        return 'NULL';
    } else {
        return '"' . $date .'"';
    }
}

function getNextLogin () {
    $maxlogin = mysql_fetch_row(mysql_query('SELECT MAX(`login`) FROM `' . cnf::$db_prefix . 'users`'));
    
    $nextlogin = $maxlogin[0] + 1;
    
    if ($nextlogin < 1000) {
        $nextlogin = '0' . $nextlogin;
    }
    
    return $nextlogin;
}
?>