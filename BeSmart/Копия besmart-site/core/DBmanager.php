<?php
include 'cnf.php';
include 'SystemSettings.php';
/**
 * Description of DB
 * @author Viktor Protsenko <pro.victorr@gmail.com>
 */
class DBmanager {
//    public static $db_inst = null;
    private static $initialized = false;
    
    private static $requestCounter = 0;
    private static $requests = array();

    public static function init() {
        if (!self::$initialized) {
            // Try Connect into DB
            $db_inst = mysql_connect(cnf::$db_host, cnf::$db_user, cnf::$db_pass) or die('DB connection failed');

            // Select DB
            mysql_select_db(cnf::$db_name, $db_inst) or die('Can\'t change DB');

            // Set charset
            mysql_query('SET NAMES "utf8";');
            mysql_query('SET CHARACTER SET "utf8";');
            mysql_query('SET SESSION collation_connection = "utf8_general_ci";');
            
            self::$initialized = true;
            
            SystemSettings::init();
        }
    }

    public static function startTransaction() {
        mysql_query('START TRANSACTION');
    }
    public static function commitTransaction() {
        mysql_query('COMMIT');
    }

    public static function rollbackTransaction() {
        mysql_query('ROOLBACK');
    }

    public static function getPageInfo($page_name) {
        if ($page_name == "") {
            $page_name = "main_page";
        }
        $q = 'SELECT p.*, t.templ_path_name FROM `'.cnf::$db_prefix.'pages` p, `'.cnf::$db_prefix.'templates` t WHERE p.`template` = t.`id` AND p.`name`="' . mysql_real_escape_string($page_name) . '" LIMIT 1';
        $res = self::doQuery($q);
        if (mysql_num_rows($res) == 0) {
            $res = self::doQuery('SELECT * FROM `'.cnf::$db_prefix.'pages` p, `'.cnf::$db_prefix.'templates` t WHERE p.`template` = t.`id` AND p.`id`=1 LIMIT 1');
            if (mysql_num_rows($res) == 0) {
                header('HTTP/1.1 301 Moved Permanently');
                header('Location: http://' + $_SERVER['host'] + '/');
                exit();
            } else {
                return self::fetchResults($res);
            }
        } else {
            return self::fetchResults($res);
        }
    }
    
    private static function fetchResults($res) {
        $result = array();
        while($row = mysql_fetch_assoc($res)) {
            array_push($result, $row);
        }        
        return $result;
    }
    
    public static function getNewsByPage($id){
        $q = sprintf('SELECT * FROM `'.cnf::$db_prefix.'news` WHERE `page`= %d', $id);
        $res = self::doQuery($q);
        $row = mysql_fetch_assoc($res);
        return $row;
    }
    
    public static function getNews($id, $start = 0, $limit = 1) {
        $result = array(
            'count' => 0,
            'data' => array()
        );
        $q = 'SELECT SQL_CALC_FOUND_ROWS * FROM `'.cnf::$db_prefix.'news` ';
        if ($id) {
            $q .= ' WHERE `id`='. $id;
        }
        $q .= ' ORDER BY `id` DESC LIMIT ' . $start . ',' . $limit;

        $res = self::doQuery($q) or die (mysql_error());
        while($row = mysql_fetch_assoc($res)) {
            $result['data'][] = $row;
        }
        // Calc count of all mathces (ignore LIMIT)
        $count = mysql_fetch_row(self::doQuery('SELECT FOUND_ROWS()'));
        $result['count'] = $count[0];
        return $result;
    }
    
    public static function getComments($limit, $pageID, $start = 0){
        $result = array(
            'count' => 0,
            'data' => array()
        );
        $q = sprintf('SELECT SQL_CALC_FOUND_ROWS * FROM `'.cnf::$db_prefix.'comments` WHERE %s `read` = 1 ORDER BY `id` DESC LIMIT %d,%d',
            $pageID > 0 ? '`page`=' . $pageID . ' AND' : '',
            $start,
            $limit
        );
        $res = self::doQuery($q);
        while($row = mysql_fetch_assoc($res)) {
             $result['data'][] = $row;
        }
        $count = mysql_fetch_row(self::doQuery('SELECT FOUND_ROWS()'));
        $result['count'] = $count[0];
        
        return $result;
    }
    
    public static function addCommentRequest($comment_info){
        $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'comments`(`page`, `posted_time`, `name`, `content`, `rating`, `read`, `teacherID`, `userID`) VALUES(%d, %d, "%s", "%s", %d, %d, %d, %d)', 
                    $comment_info['page'],
                    time(),
                    mysql_real_escape_string($comment_info['name']),
                    mysql_real_escape_string($comment_info['content']), 
                    $comment_info['rating'] ? $comment_info['rating'] : 3, 
                    $comment_info['read'] ? $comment_info['read'] : 0,
                    $comment_info['teacherID'] ? $comment_info['teacherID'] : 0,
                    $comment_info['userID'] ? $comment_info['userID'] : 0);
        self::doQuery($q);
        
        if (mysql_errno() == 0) {
            return true;
        } else {
            return false;
        }
    }
 
    public static function addNewOrder($order) {
        $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'orders` VALUES(0, "%s", "%s", "%s", "%s", 0, "%s")', 
                mysql_real_escape_string($order['name']),
                mysql_real_escape_string($order['email']), 
                mysql_real_escape_string($order['tel']),
                time(),
                mysql_real_escape_string($order['school'])
            );
        self::doQuery($q);
        
        if (mysql_errno() == 0) {
            return mysql_insert_id();
        } else {
            return false;
        }
    }

    public static function getUser($userInfo, $start = -1, $limit = 1) {
        $result = array();
        $q = 'SELECT u.*, ut.multischool, ut.name as userTypeName, ut.timeFrom, ut.timeTo, ut.allowRegister, ut.visibleDays, ut.daysPerMonth, d.id as department FROM `' . cnf::$db_prefix . 'users` u '
                . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'usertypes` ut ON ut.id=u.userTypeID'
                . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'schools` s ON s.id=u.school'
                . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'departments` d ON d.id=s.department';
        $qWhere = '';
        
        foreach ($userInfo as $key => $value) {
            if (strlen($qWhere) === 0) {
                $qWhere .= ' WHERE ';
            } else {
                $qWhere .= ' AND ';
            }
            if (is_array($value)) {
                $qWhere .= 'u.`' . $key . '` IN (' . implode($value, ',') . ')';
            } else {
                $qWhere .= 'u.`' . $key . '` = "' . mysql_real_escape_string($value) . '"';
            }
        }
        
        if ($start >= 0) {
            $qWhere .= sprintf(' LIMIT %d, %d', 
                is_numeric($start) ? $start : 0,
                is_numeric($limit) ? $limit : 1);
        }
        
        $q .= $qWhere;

        $res = self::doQuery($q);
        while($row = mysql_fetch_assoc($res)) {
            $row['lessons'] = (Array)json_decode($row['lessons']);
            $result[] = $row;
        }
        return $result;
    }

    public static function getLessons($lessonInfo, $minTime = 0, $maxTime = 'strtotime("+7 days")', $onlyActive = false, $schoolID = null) {
        $result = array();
        $q = 'SELECT l.*, t.lastname as teacherLastName, t.firstname as teacherFirstName, roomtime.count as userCount, roomtime.timestart as time, roomtime.timeend as timeend, type.name, room.limit as roomLimit, room.name as roomName, level.name as levelName, topics.name as topicName, schools.name as schoolName, schools.id as schoolsID FROM `' . cnf::$db_prefix . 'lessons` l 
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'lesson_types` `type` ON `type`.id=l.lesson_type
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'levels` `level` ON `level`.id=l.level
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'roomtime` ON `roomtime`.id=l.roomtimeID 
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'teachers` t ON `t`.`id`=l.teacher
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'lesson_topics` topics ON `topics`.`id`=l.lessonTopicID
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'rooms` room ON `room`.id=roomtime.room 
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'schools` ON `schools`.id=room.school ';
        
        $qWhere = ' WHERE 1 ';
        if (is_numeric($schoolID)) {
            $qWhere .= ' AND schools.id = ' . $schoolID;
        }
        if ($minTime) {
            $qWhere .= ' AND `roomtime`.`timestart` >= "' . date('Y-m-d H:i:s', $minTime) . '" AND `roomtime`.`timestart` < "'.  date('Y-m-d H:i:s', $maxTime) . '"';
        }
        foreach ($lessonInfo as $key => $value) {
            if (is_array($value)) {
                $qWhere .= ' AND l.`' . $key . '` IN (' . implode(',', $value) . ')'; 
            } else {
                $qWhere .= ' AND l.`' . $key . '` = "' . mysql_real_escape_string($value) . '"'; 
            }
            
        }
        
        if ($onlyActive) {
            $qWhere .= ' AND l.`status` != 2';
        }
        
        $q .= $qWhere . ' ORDER BY roomtime.timestart ASC';

        $res = self::doQuery($q);
        while($row = mysql_fetch_assoc($res)) {
            $row['teacherFullName'] = $row['teacherLastName'] . ' ' . $row['teacherFirstName'];
            $result[] = $row;
        }
        return $result;
    }

    public static function updateLesson($lessonID, $info) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'lessons` SET ';
        $qSet = '';
        foreach ($info as $key => $value) {
            if (strlen($qSet)) {
                $qSet .= ', ';
            }
            $qSet .= '`' . $key . '` = "' . mysql_real_escape_string($value) . '"';
        }
        
        $q .= $qSet . ' WHERE `id`=' . $lessonID;
        self::doQuery($q);

        if (mysql_errno() == 0) {
            return true;
        } else {
            return false;
        }
    }

    public static function updateUsers($userID, $info) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'users` SET ';
        $qSet = '';
        foreach ($info as $key => $value) {
            if (strlen($qSet)) {
                $qSet .= ', ';
            } 
            
            if (is_null($value)) {
                $qSet .= '`' . $key . '` = NULL';
            } else {
                $qSet .= '`' . $key . '` = "' . mysql_real_escape_string($value) . '"';
            }
        }
        
        $q .= $qSet . ' WHERE `id`=' . $userID;
        
        self::doQuery($q);

        if (mysql_errno() == 0) {
            return true;
        } else {
            return false;
        }
    }

    public static function getBasicTest() {
        $result = array();
        
        $q = 'SELECT * FROM `' . cnf::$db_prefix . 'basic_test` ORDER BY `group` ASC';
        
        $res = self::doQuery($q);
        while ($row = mysql_fetch_assoc($res)) {
            self::parseAnswer($row['answer']);
            $result[] = $row;
        }
        return $result;
    }
    
    private static function parseAnswer(&$data) {
        $res = array();
        $inputs = explode('|', $data);

        for ($i = 0, $n = count($inputs); $i < $n; $i++) {
            $res[$i] = array();
            $answers = explode(';', $inputs[$i]);

            for ($j = 0, $nj = count($answers); $j < $nj; $j++) {
                $res[$i][] = $answers[$j];
            }
        }

        $data = $res;
    }

    public static function getLessonUsers($users) {
        $result = array();
        
        if (count($users)) {
            $q = 'SELECT * FROM `' . cnf::$db_prefix . 'users` WHERE `id` IN (' . implode(',', $users) . ')';

            $res = self::doQuery($q);
            while ($row = mysql_fetch_assoc($res)) {
                $result[] = $row;
            }
        }
        return $result;
    }

    public static function insertNewTestRusult($data) {
        $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'testresult`(level, name, tel, email, school) VALUES("%s", "%s", "%s", "%s", "%s")',
                mysql_real_escape_string($data['level']),
                mysql_real_escape_string($data['name']),
                mysql_real_escape_string($data['tel']), 
                mysql_real_escape_string($data['email']),
                mysql_real_escape_string($data['school'])
            );
        self::doQuery($q);
        
        if (mysql_errno() == 0) {
            return mysql_insert_id();
        } else {
            return false;
        }
    }
    
    public static function insertNewGovTestRusult($data) {
        $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'testresult_gov`(level, name, tel, email, organization, department) VALUES("%s", "%s", "%s", "%s", %d, "%s")',
                mysql_real_escape_string($data['level']),
                mysql_real_escape_string($data['name']),
                mysql_real_escape_string($data['tel']), 
                mysql_real_escape_string($data['email']),
                mysql_real_escape_string($data['organization']),
                mysql_real_escape_string($data['department'])
            );
        self::doQuery($q);
        
        if (mysql_errno() == 0) {
            return mysql_insert_id();
        } else {
            return false;
        }
    }

    public static function getUserLessons($params, $asHash = false, $startFrom = null) {
        $q = 'SELECT ul.*, rt.timestart, l.lesson_type FROM `' . cnf::$db_prefix . 'userlesson` ul'
                . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'lessons` l ON l.id = ul.lesson'
                . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'roomtime` rt ON rt.id = l.roomtimeID ';
        $qWhere = ' WHERE 1 ';
        $result = array();

        if (count($params)) {
            foreach ($params as $key => $value) {
                if (is_array($value)) {
                    if (count($value)) {
                        $qWhere .= ' AND ul.`' . $key . '` IN (' . implode(',', $value) . ')';
                    }
                } else {
                    $qWhere .= ' AND ul.`' . $key . '` = "' . mysql_real_escape_string($value) . '"';
                }
                
            }
        }
        
        if ($startFrom) {
            $qWhere .= ' AND rt.timestart >= "' . mysql_real_escape_string($startFrom) . '"';
        }
        $q = $q . $qWhere;
        
        
        
        $res = self::doQuery($q);
        while ($row = mysql_fetch_assoc($res)) {
            if (is_string($asHash)) {
                $result[$row[$asHash]] = $row;
            } else {
                $result[] = $row;
            }
        }
        
        return $result;
    }

    public static function userLessonInsertOrUpdate($userID, $lessonID, $statusID) {
        $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'userlesson`(`user`,`lesson`,`status`) VALUES (%d, %d, %d) ON DUPLICATE KEY UPDATE `status`=%d, `id`=LAST_INSERT_ID(`id`)',
                $userID, $lessonID, $statusID, $statusID);
        self::doQuery($q);
        
        
        if (mysql_errno()) {
            return false;
        } else {
            return mysql_insert_id();
        }
    }

    public static function updateUserCountInRoom($increment, $roomtimeID) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'roomtime` SET `count` = `count` ' . ($increment > 0 ? '+ 1' : '- 1') . ' WHERE `id` = '. $roomtimeID;
        self::doQuery($q);
        
        $err = mysql_errno();
        if ($err > 0 && $err != 1690) {
            return false;
        } else {
            return true;
        }
    }

    public static function getUsersOnLesson($lessonID, $userStatusID = null) {
        $result = array();
        $q = 'SELECT u.*, ul.status as userLessonStatus FROM `' . cnf::$db_prefix . 'users` u 
            LEFT OUTER JOIN `' . cnf::$db_prefix . 'userlesson` ul ON `ul`.`user` = `u`.`id`
            WHERE ul.lesson = '. $lessonID;
        if ($userStatusID) {
            $q .= ' AND `ul`.`status` = '. $userStatusID;
        }
        
        $res = self::doQuery($q);
        if (mysql_errno()) {
            return false;
        } else {
            while($row = mysql_fetch_assoc($res)) {
                $result[] = $row;
            }
        }
        
        return $result;
    }
    
    public static function getUserOnRoom($roomtimeID, $statusID = null) {
        $statusString = '';

        if (is_array($statusID)) {
            $statusString = ' AND `ul`.`status` IN (' . implode(',', $statusID) . ')';
        } else if (is_numeric($statusID)) {
            $statusString = ' AND `ul`.`status` = ' . $statusID;
        }

        $result = array();
    /*	$q = 'SELECT ul.* FROM  `' . cnf::$db_prefix . 'roomtime` rt
            LEFT OUTER JOIN  `' . cnf::$db_prefix . 'lessons` l ON l.roomtimeID = rt.id
            LEFT OUTER JOIN  `' . cnf::$db_prefix . 'userlesson` ul ON ul.lesson = l.id AND ul.status ='.$statusID.'
            WHERE rt.id =' . $roomtimeID;
            */
    $q = 'SELECT ul.*, u.email FROM  `' . cnf::$db_prefix . 'userlesson` `ul` 
    LEFT OUTER JOIN  `' . cnf::$db_prefix . 'users` `u` ON `u`.`id` = ul.user
    LEFT OUTER JOIN  `' . cnf::$db_prefix . 'lessons` `l` ON `l`.`roomtimeID` = ' . $roomtimeID . ' 
    WHERE `ul`.`lesson` = l.id' . $statusString;

        $res = self::doQuery($q);

    //	echo $q;
        while($row = mysql_fetch_assoc($res)) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getTeachers($WHERE = null, $limit = 0, $groupBy = null) {
        $result = array();
        $q = 'SELECT t.*, d.name as departmentName FROM `' . cnf::$db_prefix . 'teachers` t '
                . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'departments` d ON d.id = t.department'
                . ' WHERE `deleted` = 0 ';
        
        if (is_array($WHERE)) {
            foreach ($WHERE as $field => $value) {
                $q .= ' AND t.`' . $field . '` = "' . $value . '"';
            }
        }
        
        if ($limit) {
            $q .= ' LIMIT 0,' . $limit;
        }

        $res = self::doQuery($q);
        
        while($row = mysql_fetch_assoc($res)) {
            if ($groupBy && isset($row[$groupBy])) {
                if (isset($result[$groupBy])) {
                    $result[$row[$groupBy]] = array();
                }
                $result[$row[$groupBy]][] = $row;
            } else {
                $result[] = $row;
            }
        }

        return $result;
    }

    public static function getTeacherComments($teacherID, $start = 0, $limit = 20) {
        $result = array(
            'count' => 0,
            'data' => array()
        );
        $q = 'SELECT SQL_CALC_FOUND_ROWS * FROM `'.cnf::$db_prefix.'comments` ';
        if ($teacherID) {
            $q .= ' WHERE `read` = 1 AND `teacherID`='. $teacherID;
        }
        $q .= ' ORDER BY `id` DESC LIMIT ' . $start . ',' . $limit;

        $res = self::doQuery($q);
        while($row = mysql_fetch_assoc($res)) {
            $result['data'][] = $row;
        }
        // Calc count of all mathces (ignore LIMIT)
        $count = mysql_fetch_row(self::doQuery('SELECT FOUND_ROWS()'));
        $result['count'] = $count[0];
        return $result;
    }
    
    public function getHotNews ($limit = null) {
        $result = array();
        $q = 'SELECT * FROM `'.cnf::$db_prefix.'hotnews` WHERE `status`=1';
        
        if ($limit) {
            $q .= ' LIMIT 0,' . $limit;
        }
        $res = self::doQuery($q);
        while($row = mysql_fetch_assoc($res)) {
            $result[] = $row;
        }
        
        return $result;
    }

    public function createRoomTime ($start, $roomID) {
        $DB_date_format = 'Y-m-d H:i:s';
        $lessonStartTime = date($DB_date_format, $start);
        $lessonEndTime = date($DB_date_format, $start + 3600);
        
        $qRT = sprintf('INSERT INTO `' . cnf::$db_prefix . 'roomtime`(`room`,`timestart`,`timeend`) VALUES(%d,"%s","%s") ON DUPLICATE KEY UPDATE `id`=LAST_INSERT_ID(`id`)',
            $roomID, $lessonStartTime, $lessonEndTime);
    
        self::doQuery($qRT);

        $roomtimeID = mysql_insert_id();
        
        return $roomtimeID;
    }
    
    public function insertNewLesson ($roomTimeID, $level, $status) {
        $qL = sprintf('INSERT INTO `' . cnf::$db_prefix . 'lessons`(`level`, `roomtimeID`,`status`) VALUES(%d, %d, %d)', $level, $roomTimeID, $status);

        self::doQuery($qL);

        return mysql_insert_id();
    }

    public static function getTable($name, $start = 0, $limit = null, $groupBy = '', $groupAsArray = false) {
        $result = array();
        $q = 'SELECT * FROM `'.cnf::$db_prefix. $name . '`';
        
        if ($limit) {
            $q .= ' LIMIT 0,' . $limit;
        }
        $res = self::doQuery($q);
        while($row = mysql_fetch_assoc($res)) {
            if ($groupBy) {
                if ($groupAsArray) {
                    if (!$result[$row[$groupBy]]) {
                        $result[$row[$groupBy]] = array();
                    }
                    $result[$row[$groupBy]][] = $row;
                }  else {
                    $result[$row[$groupBy]] = $row;
                }
            } else {
                $result[] = $row;
            }
        }
        
        return $result;
    }
    
    public static function getLessonsForUser($userID, $types, $where = null) {
        $result = array();
        $q = 'SELECT l.*, `type`.name as `lessonType`, `level`.name as `levelName`, `t`.`firstname` as `teacherFirstName`, `t`.`lastname` as `teacherLastName`, `roomtime`.`timestart`, `uls`.id as ulstatusid, `uls`.name as `ulstatus`, `uls`.`color` as `ulscolor`, ls.name as `lstatus`, `ls`.`color` as `lstatuscolor`, schools.id as school, schools.name as schoolName
            FROM `' . cnf::$db_prefix . 'userlesson` ul
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'userlessonstatus` `uls` ON `uls`.id = ul.status
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'lessons` `l` ON `l`.id = ul.lesson
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'lessonstatus` `ls` ON `ls`.id = l.status
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'lesson_types` `type` ON `type`.id=l.lesson_type
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'levels` `level` ON `level`.id=l.level
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'roomtime` ON `roomtime`.id=l.roomtimeID 
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'teachers` t ON `t`.`id`=l.teacher
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'rooms` room ON `room`.id=roomtime.room
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'schools` schools ON `schools`.id=room.school
            WHERE ul.user = ' . $userID;
        
        if (is_array($where)) {
            foreach ($where as $field => $value) {
                $q .= ' AND ' . $field . ' = "' . $value . '"';
            }
        }
        if (is_array($types)) {
            $q .= ' AND `ul`.`status` IN (' . implode(',', $types) . ')';
        }
        
        $q .= ' ORDER BY `roomtime`.`timestart` DESC';
        $res = self::doQuery($q);
        
        while ($row = mysql_fetch_assoc($res)) {
            $result[] = $row;
        }
        
        return $result;
    }
    
    public static function getUserTestsTransactions ($info, $order = null) {
        $result = array();
        $q = 'SELECT tt.*, ts.color as statusColor, ts.name as statusName, t.name as testName, t.successRate, t.type, t.level, t.timeLimit 
            FROM `' . cnf::$db_prefix . 'test_transaction` tt
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'tests` `t` ON `t`.id = tt.test
                LEFT OUTER JOIN `' . cnf::$db_prefix . 'test_status` `ts` ON `ts`.id = tt.status'
                . ' WHERE 1';
    
        if (is_array($info)) {
            
            foreach ($info as $field => $value) {
                if (is_array($value) && count($value)) {
                    $q .= ' AND ' . $field . ' IN (' . implode(',', $value) . ')';
                } else {
                    $q .= ' AND ' . $field . ' = "' . mysql_real_escape_string($value) . '"';
                }
            }
        }
        
        if ($order) {
            $q .= ' ORDER BY ' . $order;
        }
        
        $res = self::doQuery($q);
        
        while ($row = mysql_fetch_assoc($res)) {
            $row['history'] = json_decode($row['history'], true);
            $result[] = $row;
        }
        
        return $result;
    }
    
    public static function updateUserTestsTransaction ($id, $info) {
        $q = 'UPDATE `' . cnf::$db_prefix . 'test_transaction`';
        $qSet = '';
        if (count($info)) {
            foreach($info as $field => $value) {
                if ($field == 'history') {
                    $value = json_encode($value);
                }
                if (strlen($qSet) > 0) {
                    $qSet .= ',';
                } 
                $qSet .= $field . ' = "' . mysql_real_escape_string($value) . '"';
            }
            
            $q .= ' SET ' . $qSet;
        }
        
        $q .= ' WHERE `id`=' . $id;
        
        self::doQuery($q);
    }
    
    public static function insertNewTestTransaction ($info) {
        $q = sprintf('INSERT INTO `' . cnf::$db_prefix . 'test_transaction`(`user`, `test`, `history`, `status`) VALUES (%d, %d, "%s", %d)',
            $info['user'], $info['test'], '[]', 3);
        
        self::doQuery($q);
        
        $transaction = self::getUserTestsTransactions(array(
            'tt.id' => mysql_insert_id()
        ));
        
        if (count($transaction)) {
            return $transaction[0];
        } else {
            return false;
        }
    }
    
    public static function getTest ($info) {
        $q = 'SELECT * FROM `' . cnf::$db_prefix . 'tests` WHERE 1 ';

        if (is_array($info)) {
            foreach ($info as $field => $value) {
                if (is_array($value)) {
                    $q .= ' AND ' . $field . ' = "' . implode(',', $value) . '"';
                } else {
                    $q .= ' AND ' . $field . ' = "' . $value . '"';
                }
            }
        }
        
        $res = self::doQuery($q);
        
        while ($row = mysql_fetch_assoc($res)) {
            $result[] = $row;
        }
        
        return $result;
    }
    
    public static function getTestQuestions ($info) {
        $q = 'SELECT tq.*, tg.name as groupName FROM `' . cnf::$db_prefix . 'test_questions` tq'
                . ' LEFT OUTER JOIN `' . cnf::$db_prefix . 'test_groups` tg ON tg.id = tq.group'
                . ' WHERE 1 ';

        if (is_array($info)) {
            foreach ($info as $field => $value) {
                if (is_array($value)) {
                    $q .= ' AND ' . $field . ' = "' . implode(',', $value) . '"';
                } else {
                    $q .= ' AND ' . $field . ' = "' . $value . '"';
                }
            }
        }
        
        $res = self::doQuery($q);
        
        while ($row = mysql_fetch_assoc($res)) {
            $result[] = $row;
        }
        
        return $result;
    }

    public static function getTestTotalPoints($testId) {
        $result = 0;
        $q = sprintf('SELECT MIN( points ) as points FROM  `' . cnf::$db_prefix . 'test_questions` WHERE  `test` = %d GROUP BY qnumber', $testId);
        
        $res = self::doQuery($q);
        
        while($row = mysql_fetch_assoc($res)) {
            $result += $row['points'];
        }
        
        return $result;
    }

    public static function insertNewQuestion($qInfos) {
        $q = 'INSERT INTO `' . cnf::$db_prefix . 'test_questions`'
            . '(`body`,`group`,`qnumber`,`points`,`test`) '
            . 'VALUES ';
        
        $values = '';
        foreach ($qInfos as $value) {
            if (strlen($values) > 0) {
                $values .= ',';
            }
            $values .= '("' . mysql_real_escape_string($value['body']) . '", ' . $value['group'] . ', ' . $value['qnumber'] . ', ' . $value['points'] . ', ' . $value['test'] . ')';
        }
        
        $q .= $values;
        
        self::doQuery($q) or die(mysql_error());
        
        return mysql_insert_id();
    }
    
    public static function doQuery ($q) {
        self::$requestCounter ++;
        if (in_array($q, self::$requests)) {
            self::$requests[$q] = 0;
        }
        self::$requests[$q] ++;
        
        $res = mysql_query($q);
        if (!$res) {
            exit('Mysql error: ' . mysql_error() . "\nQuery: ". $q);
        } else {
            return $res;
        }
    }
    
    public static function getRequestCount() {
        return self::$requestCounter;
    }
    
    public static function getRequests() { 
        return self::$requests;
    }

    public static function getCount($name) {
        $q = 'SELECT count(*) as count FROM  `' . cnf::$db_prefix . $name . '`';
        
        $res = self::doQuery($q);
        
        $row = mysql_fetch_row($res);
        
        return $row[0];
    }

    public static function getPulls($where = null) {
        $result = array();
        $q = 'SELECT * FROM  `' . cnf::$db_prefix . 'polls`';
        
        if (is_array($where)) {
            $q .= ' WHERE 1 ';
            foreach ($where as $field => $value) {
                $q .= ' AND `' . $field . '` = "' . $value . '"';
            }
        }

        $res = self::doQuery($q);
        
        while($row = mysql_fetch_assoc($res)) {
            $result[] = $row;
        }
        
        return $result;
    }

    public static function getPollResults($where = null) {
        $result = array();
        $q = 'SELECT * FROM  `' . cnf::$db_prefix . 'polls_results`';
        
        if (is_array($where)) {
            $q .= ' WHERE 1 ';
            foreach ($where as $field => $value) {
                $q .= ' AND `' . $field . '` = "' . $value . '"';
            }
        }
        
        $res = self::doQuery($q);
        
        while($row = mysql_fetch_assoc($res)) {
            $result[] = $row;
        }
        
        return $result;
    }

    public static function addPollAnswer($user, $question, $answer) {
        $q = 'INSERT INTO `' . cnf::$db_prefix . 'polls_results`(`user`,`answer`,`question`) VALUES ("' . $user . '", "' . ($answer ? $answer : '0') . '", "' . $question . '")';
        mysql_query($q);
    }

    public static function getPayments($where = null) {
        $result = array();
        $q = 'SELECT * FROM  `' . cnf::$db_prefix . 'payments`';
        
        if (is_array($where)) {
            $q .= ' WHERE 1 ';
            foreach ($where as $field => $value) {
                $q .= ' AND `' . $field . '` = "' . $value . '"';
            }
        }
        
        $res = self::doQuery($q);
        
        while($row = mysql_fetch_assoc($res)) {
            $result[] = $row;
        }
        
        return $result;
    }

}