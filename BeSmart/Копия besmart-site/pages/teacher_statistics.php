<?php
if (!User::$userInfo['toTeacher']) {
    echo '<div style="padding: 40px; text-align: center; font-size: 18px;">Статистика не может быть собрана, так как этот пользователь не связан с предопователем</div>';
} else {
//    $teacherInfo = DBmanager::getTeachers(array(
//        'id' => User::$userInfo['toTeacher']
//    ));

    $lessons = DBmanager::getLessons(array(
        'teacher' => User::$userInfo['toTeacher'],
        'status' => array(3)
    ));
    
    
    $res = array();

    for ($i = count($lessons) - 1; $i >= 0; $i--) {
        $month = rus_date('M Y', strtotime($lessons[$i]['time']));

        if (!isset($res[$month])) {
            $res[$month] = array();
        }
        
        if (!isset($res[$month][$lessons[$i]['name']])) {
            $res[$month][$lessons[$i]['name']] = 0;
        }
        
        $res[$month][$lessons[$i]['name']] ++;
    }
    

//    echo '<pre>';
//    print_r($lessons);
//    echo '</pre>';
    

function createRow ($monthName, $counts, $ovv) {
    $complexCount =  ($counts['Complex'] ? $counts['Complex'] : 0);
    $discussionCount =  ($counts['Discussion'] ? $counts['Discussion'] : 0);
    $grammarCount =  ($counts['Grammar'] ? $counts['Grammar'] : 0);
    $writingCount =  ($counts['Writing'] ? $counts['Writing'] : 0);
    $listeningCount =  ($counts['Listening'] ? $counts['Listening'] : 0);
    $total = $complexCount + $discussionCount + $grammarCount + $writingCount + $listeningCount;

    return '<tr class="' . ($ovv ? 'ovv' : '') . '">
            <td>' . $monthName . '</td>
            <td>' . $complexCount . '</td>
            <td>' . $discussionCount . '</td>
            <td>' . $grammarCount . '</td>
            <td>' . $writingCount . '</td>
            <td>' . $listeningCount . '</td>
            <td style="font-weight: bold;">' . $total . '</td>
        </tr>';
}
?>
<style>
    .abs_header td {
        border-bottom: 1px solid #c1dae6 !important;
    }
</style>
<div style="padding: 0 20px 70px 20px">
    <div class="header">Проведенные уроки</div>
    <div class="abs_shadow">
        <table class="abs" style="font-size: 18px;">
            <tr class="abs_header">
                <td rowspan="2" style='background-color: #e1eef6'>Месяц</td>
                <td colspan="5" style='background-color: #e1eef6'>По типам уроков</td>
                <td rowspan="2" style='background-color: #e1eef6'>Всего</td>
            </tr>
            <tr class="abs_header">
                <td style='background-color: #e1eef6'>Complex</td>
                <td style='background-color: #e1eef6'>Discussion</td>
                <td style='background-color: #e1eef6'>Grammar</td>
                <td style='background-color: #e1eef6'>Writing</td>
                <td style='background-color: #e1eef6'>Listening</td>
            </tr>
            <?php
                $OVV = 0;
                foreach ($res as $monthName => $counts) {
                    echo createRow($monthName, $counts, $OVV % 2);
                    $OVV ++;
                }
            ?>
        </table>
    </div>
</div>
<?php 
} 
?>