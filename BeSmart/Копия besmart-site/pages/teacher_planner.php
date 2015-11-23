<?php
if (!User::$userInfo['toTeacher']) {
    echo '<div style="padding: 40px; text-align: center; font-size: 18px;">Невозможно отобразить расписание, так как этот пользователь не связан с предопователем</div>';
} else {
    function getHeader() {
        $html = '<thead><tr><td class="day_header">&nbsp;</td>';
        if (date('H') >= 21) {
            $today = strtotime('tomorrow midnight');
        } else {
            $today = strtotime('today midnight');
        }
        $currTime = $today;
        for ($i = 0, $n = 7; $i < $n; $i++) {
            $html .= '<td class="day_header">' . rus_date('D d.m', $currTime) . '</td>';
            $currTime = strtotime('+1 day', $currTime);
        }

        return $html;
    }
    
    function isInDate ($lessonTime, $from, $to) {
        return (($lessonTime >= $from) && ($lessonTime < $to));
    }
    
    function findLesson ($lessons, $cur_time, $next_time) {
        $result = array();
        for ($i = 0, $n = count($lessons); $i < $n; $i++) {
            if (isInDate(strtotime($lessons[$i]['time']), $cur_time, $next_time)) {
                $result[] = $lessons[$i];                
            }
        }
        return $result;
    }
    
    function getLessonCell ($lesson, $i, $n) {
        $html = '<div class="lesson_container ' . ($i > 0 ? 'topborder' : '') . '">
                <div class="lesson_name">' . $lesson['name'] . '</div>
                <div class="lesson_topic cut" title="' . $lesson['topicName'] . '">' . $lesson['topicName'] . '</div>
                <div class="lesson_info_t">' . $lesson['roomName'] . '</div>
                <div class="lesson_info_t">' . $lesson['levelName'] . '</div>
                <div class="lesson_info_t" style="margin: 0 auto;"><a href="/print.php?id=' . $lesson['id'] .'" target="_blank" style="color: rgb(0, 183, 219)">Список студентов</a></div>
            </div>';
        return $html;
    }
    function getBody () {
        $hours = array(8,9,10,11,12,13,14,15,16,17,18,19,20,21);
        if (date('H') >= 21) {
            $today = strtotime('tomorrow midnight');
        } else {
            $today = strtotime('today midnight');
        }
        $lessons = DBmanager::getLessons(array(
            'teacher' => User::$userInfo['toTeacher'],
            'status' => 1
        ));
        $html = '';
        for ($line = 0, $n = count($hours); $line < $n; $line++) {
            $cur_time = strtotime('+' . $hours[$line]  . ' hours', $today);
            $next_time = strtotime('+' . ($hours[$line] + 1)  . ' hours', $today);
            
            $html .= '<tr class="' . ($line % 2 ? 'ovv' : '') . ' ' . ($line + 1 == $n ? 'last' : '') . '">';
            for ($column = 0; $column <= 7; $column++) {
                if ($column == 0) {
                    // Покавываем дату
                    $html .= '<td class="day_time_header">' . $hours[$line] . ':00 - ' . ($hours[$line] + 1) . ':00</td>';
                } else {
                    // Показываем урок если есть
                    $currentDayLessons = findLesson($lessons, $cur_time, $next_time);
                    $html .= '<td>';
                    if (count($currentDayLessons)) {
                        for ($lessI = 0, $lessN = count($currentDayLessons); $lessI < $lessN; $lessI++) {
                            $lesson = $currentDayLessons[$lessI];
                            $html .= getLessonCell($lesson, $lessI, $lessN);
                        }
                    } else {
                        $html .= '&nbsp;';
                    }
                    $html .= '</td>';
                    // Переходить к след. дню
                    $cur_time = strtotime('+1 days', $cur_time);
                    $next_time = strtotime('+1 days', $next_time);
                }
            }
            $html .= '</tr>';
        }
        return $html;
    }
    
?>
<div class="lesson_authorized_message">
    <b>Внимание!</b> В этом рассписании отображаются только ваши запланированные уроки
</div>
    <div class="abs_shadow">
        <table class="abs schedule">
            <?php 
                echo getHeader();
            ?>
            <tbody>
            <?php
                echo getBody();
            ?>
            </tbody>
        </table>
    </div>
<?php
}
?>
 