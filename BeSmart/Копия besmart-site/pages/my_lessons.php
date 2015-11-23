<?php
$lessons = DBmanager::getLessonsForUser(User::$userInfo['id'], array(1,2,3,7,8));
$lessonTypes = DBmanager::getTable('lesson_types', 0, null, 'id');
$levelTypes = DBmanager::getTable('levels', 0, null, 'id');
$lessonTopics = DBmanager::getTable('lesson_topics', 0, null, 'id');
//
//$lessonTypes_count = array(
//    1 => 60, // Complex
//    2 => 30, // Grammar
//    3 => 75, // Discussion
//    5 => 15, // Writing
//    7 => 15  // Listening
//);

$statistics = array(
    6 => array(),
    1 => array(),
    2 => array(),
    3 => array(),
    4 => array()
);
$userTopicsList = array();

for ($i = 0, $n = count($lessons); $i < $n; $i++) {
    $status = $lessons[$i]['ulstatusid'];
    if ($status == 2) {
        if (!$statistics[$lessons[$i]['level']][$lessons[$i]['lesson_type']]) {
            $statistics[$lessons[$i]['level']][$lessons[$i]['lesson_type']] = 1;
        } else {
            $statistics[$lessons[$i]['level']][$lessons[$i]['lesson_type']] ++;
        }
        if ($lessons[$i]['lessonTopicID']) {
            $userTopicsList[] = $lessons[$i]['lessonTopicID'];
        }
    }
}

$topics = array();
foreach ($lessonTopics as $id => $value) {
    if (!in_array($value['id'], $userTopicsList) && $value['deleted']) {
        continue;
    }
    if ($value['lessontypeID'] == 3 || $value['lessontypeID'] == 5) {
        continue;
    }
    if (!$topics[$value['levelID']]) {
        $topics[$value['levelID']] = array();
    }
    if (!$topics[$value['levelID']][$value['lessontypeID']]) {
        $topics[$value['levelID']][$value['lessontypeID']] = array();   
    }
    $topics[$value['levelID']][$value['lessontypeID']][] = $value;
}

//$lessonTypes_count = array(
//    1 => count($topics[1]), // Complex
//    2 => count($topics[2]), // Grammar
//    3 => count($topics[3]), // Discussion
//    5 => count($topics[5]), // Writing
//    7 => count($topics[7])  // Listening
//);

function getProgressLine ($current, $maxcount, $maxWidth = 200, $height = 30, $color = '#449644', $bcolor = '#D1EBD1') {
    if (!$current) {
        $current = 0;
    }
    $currPerc = $current / $maxcount;
    $currWidth = round($currPerc * $maxWidth);
    if ($currWidth < 10) {
        $currWidth = 10;
    } else if ($currWidth > $maxWidth) {
        $currWidth = $maxWidth;
    }
    $text = $current . ' из ' . $maxcount . ' (' . round($currPerc * 100) . '%)';

    return '<div style="box-shadow: 0 0 6px #888 inset; background-color: ' . $bcolor . '; width: ' . $maxWidth . 'px; line-height: ' . $height . 'px; height: ' . $height . 'px; text-align: center">' . $text . '</div>
        <div style="margin-top: -' . $height . 'px; width: ' . $currWidth . 'px; height: ' . $height . 'px; color: #fff; background-color: ' . $color . '; overflow: hidden;">
        <div style="width: ' . $maxWidth . 'px; line-height: ' . $height . 'px;  height: 100%; background-color: ' . $color . '">' . $text . '</div>
    </div>';
}

function createLessonRow($lessonInfo, $ovv, $lessonTopics) {
    $html = '<tr class="' . ($ovv ? 'ovv' : '') . '">
        <td>' . rus_date('<\b>H:i</\b> D<\b\r/>d F Y', strtotime($lessonInfo['timestart'])) . '</td>
        <td>' . $lessonInfo['lessonType'] . '</td>
        <td>' . ($lessonInfo['lessonTopicID'] ? $lessonTopics[$lessonInfo['lessonTopicID']]['name'] : $lessonInfo['topic']) . '</td>
        <td>' . $lessonInfo['levelName'] . '</td>
        <td>' . $lessonInfo['schoolName'] . '</td>';
    
    if ($lessonInfo['teacher']) {
        $html .= '<td><div class="lesson_teacher"><a target="_blank" href="/teachers/info/' . $lessonInfo['teacher'] . '">' . $lessonInfo['teacherFirstName'] . ' ' . $lessonInfo['teacherLastName'] . '</a></div></td>';
    } else {
        $html .= '<td>&nbsp;</td>';
    }
                
    $html .= '<td>' . getLessonButton($lessonInfo) . '</td>
        </tr>';
    
    return $html;
}

function getLessonButton ($lessonInfo) {
    // Если время для отмены регистрации есть, то отбражаем кнопку
    // Если уже поздно, то отображаем статус
    $statusColor = '';
    if ($lessonInfo['ulstatusid'] == 2) {
        $statusColor = '008000';
    } else if ($lessonInfo['ulstatusid'] == 3
            || $lessonInfo['ulstatusid'] == 7
            || $lessonInfo['ulstatusid'] == 8) {
        $statusColor = 'ff0000';
    }
    $button = '<span style="color: #' . $statusColor . '">' . $lessonInfo['ulstatus'] . '</span>';
    $minActionTime = strtotime('+' . SystemSettings::getByName('minLessonActionHours') . ' hours');
    $minRegTime = strtotime('+' . SystemSettings::getByName('minLessonRegActionHours') . ' hours');
    $minCreateTime = strtotime('+' . SystemSettings::getByName('minLessonCreationHours') . ' hours');
    
    if ($lessonInfo['status'] == 2) {
        // Если урок отменен
        $button = '<span style="color: #' . $lessonInfo['lstatuscolor'] . '">' . $lessonInfo['lstatus'] . '</span>';

    } else if ($minActionTime < strtotime($lessonInfo['timestart'])) {
        // Если есть время для отказа - показываем кнопку "Отказаться"
        $button = '<div class="lesson_button" lessonact="unreg" lessonid="' . $lessonInfo['id'] . '">Отказаться</div>';
    }
    
    return $button;
}

function getTopics($level, $lessonType, $topics, $userTopicsList) {
    $source = $topics[$level][$lessonType];
    $itemsPColumn = ceil(count($source) / 3);
    if (!$source) {
        return '';
    }

    $html = '<tr><td colspan="2" style="padding: 0"><div class="topics-list-group topicsList_' . $level . '_' . $lessonType . '"  style="overflow: hidden">'
            . '<div style="padding: 10px 10px 40px 10px;"><div class="topic_title">Темы:</div>';
    
    for ($i = 0, $n = count($source); $i < $n; $i++) {
        $visit = in_array($source[$i]['id'], $userTopicsList);

        if ($i % $itemsPColumn == 0) {
            $html .= '<ul class="topics_list">';
        }
        $html .= '<li title="' . $source[$i]['name'] . '" class="' . ($visit ? 'visit' : '') . '">' . $source[$i]['name'] . '</li>';

        if (($i % $itemsPColumn) == $itemsPColumn - 1 || $i+1 == $n) {
            $html .= '</ul>';
        }
    }
    
    return $html . '<div class="clr"></div></div></div></td></tr>';
}
?>
<div style="padding: 0 20px 70px 20px">
    <div class="header">Статистика посещений</div>
        <?php
            foreach ($statistics as $levelID => $count) {
                if (count($count) || User::$userInfo['level'] == $levelID) {
                    echo '<div class="abs_shadow" style="margin-bottom: 15px;"><table class="abs">';
                    echo '<tr><td class="abs_group_line" colspan="2">' . $levelTypes[$levelID]['name'] . '</td></tr>';
                    foreach ($topics[$levelID] as $typeID => $topicsList) {
                        $maxcount = count($topicsList);
                        if (!$maxcount || ($typeID != 1 && $typeID != 2 && $typeID !=7) /* ignore all types except of "Complex" Grammar and Listening*/) {
                            continue;
                        }
                        echo '<tr><td class="abs_firsttd topicsLessonTitle" style="width: 150px" actionto="topicsList_' . $levelID . '_' . $typeID . '"><div class="toggle_icon">&nbsp;</div><div class="topics-list-title">' . $lessonTypes[$typeID]['name'] . '</div></td>
                            <td style="padding: 0 5px">' . getProgressLine($statistics[$levelID][$typeID], $maxcount, 706) .'</td></tr>';
                        echo getTopics($levelID, $typeID, $topics, $userTopicsList);
                    }

                    echo '</table></div>';
                }
            }

        ?>
    <div class="header">Список занятий</div>
    <div class="abs_shadow">
        <table class="abs">
            <tr class="abs_header">
                <td style='background-color: #e1eef6'>Время</td>
                <td style='background-color: #e1eef6'>Тип</td>
                <td style='background-color: #e1eef6'>Тема</td>
                <td style='background-color: #e1eef6'>Уровень</td>
                <td style='background-color: #e1eef6'>Филиал</td>
                <td style='background-color: #e1eef6'>Преподаватель</td>
                <td style='background-color: #e1eef6'>&nbsp;</td>
            </tr>
            <?php
                for ($i = 0, $n = count($lessons); $i < $n; $i++) {
                    echo createLessonRow($lessons[$i], $i%2, $lessonTopics);
                }
            ?>
        </table>
    </div>
</div>

<script>
    $('.topicsLessonTitle').click(function () {
        var topicsGroupName = $(this).attr('actionto'),
            topicsGroup = $('.' + topicsGroupName),
            topicsGroupHeight = topicsGroup.outerHeight(),
            wrapper = topicsGroup.children(),
            childGroupHeight = wrapper ? wrapper.outerHeight() : 0;
        
        topicsGroup.animate({
            height: topicsGroupHeight > 5 ? 1 : childGroupHeight,
        }, 300);
        
        $(this).toggleClass('expanded');
        
    });
</script>