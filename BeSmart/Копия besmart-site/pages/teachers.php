<?php
    $showTeachersList = true;
    $html = '';
    
    if ($_GET['subpage'] == 'info' && is_numeric($_GET['param'])) {
        $teachers = DBmanager::getTeachers(array('id' => $_GET['param']));
       
        if (count($teachers)) {
            $showTeachersList = false;
        } else {
            $teachers = DBmanager::getTeachers(null, 0, 'departmentName');
        }
    } else {
        $teachers = DBmanager::getTeachers(null, 0, 'departmentName');
    }
    if ($showTeachersList) {
        $html = showTeachersList($teachers);
    } else {
        $html = showSingleTeacher($teachers[0]);
    }
    
    function showSingleTeacher ($teacherInfo) {
        $html = '<div class="path">
            <a href="/teachers"><< К списку преподавателей</a>
        </div>';

        $html .= '<div class="teacher_photo_line">';
        
        if ($teacherInfo['photo']) {
            $html .= '<img src="/images/teachers/400/0/' . $teacherInfo['photo'] . '" />';
        }
        if ($teacherInfo['photo2']) {
            $html .= '<img src="/images/teachers/400/0/' . $teacherInfo['photo2'] . '" />';
        }
        if ($teacherInfo['photo3']) {
            $html .= '<img src="/images/teachers/400/0/' . $teacherInfo['photo3'] . '" />';
        }
        $html .='</div><div class="teacher_infoblock"><table class="teacher_infoblock_table">';
        
        if ($teacherInfo['education']) {
            $html .= '<tr><td class="line_head">Образование:</td><td>' . nl2br($teacherInfo['education']) . '</td></tr>';
        }
        if ($teacherInfo['hobby']) {
            $html .= '<tr><td class="line_head">Хобби:</td><td>' . nl2br($teacherInfo['hobby']) . '</td></tr>';
        }
        if ($teacherInfo['fsong']) {
            $html .= '<tr><td class="line_head">Любимая песня:</td><td>' . nl2br($teacherInfo['fsong']) . '</td></tr>';
        }
        if ($teacherInfo['fmovie']) {
            $html .= '<tr><td class="line_head">Любимый фильм:</td><td>' . nl2br($teacherInfo['fmovie']) . '</td></tr>';
        }
        if ($teacherInfo['fbook']) {
            $html .= '<tr><td class="line_head">Любимая книга:</td><td>' . nl2br($teacherInfo['fbook']) . '</td></tr>';
        }
        if ($teacherInfo['fquote']) {
            $html .= '<tr><td class="line_head">Любимая цитата:</td><td>' . nl2br($teacherInfo['fquote']) . '</td></tr>';
        }
        
        $html .= '</table></div>';
        return $html;
    }
    function showTeachersList ($teachersGrouped) {
        $html = '';
        foreach ($teachersGrouped as $department => $teachers) { 
            $html .= '<div style="padding: 25px; text-align: center; font-size: 24px;">Преподаватели <b>' . $department . '</b></div>';
            for ($i = 0, $n = count($teachers); $i < $n; $i++) {
                $tc = $teachers[$i];
                $html .= '<div class="teacher_item">
                    <a href="/teachers/info/' . $tc['id'] . '">
                        <div class="teacher_item_inner">
                            <div class="teacher_item_photo">
                                <img src="'. ($tc['photo'] ? '/images/teachers/200/0/' . $tc['photo'] : '/gallery_pictures/no_image.png') . '" />
                            </div>
                            <div class="teacher_item_name">' . $tc['firstname'] . ' ' . $tc['lastname'] . '</div>
                        </div>
                    </a>
                </div>';

                if (($i+1)%4 == 0 || $i == $n - 1) {
                    $html .= '<div class="clr"></div>';
                }
            }
        }
        
        return $html . '<div class="clr"></div>';
    }
    
?>
<div class="block_header blue" style="margin-bottom: 10px;">Преподаватели <?php echo (!$showTeachersList ? (' / ' . $teachers[0]['firstname'] . ' ' . $teachers[0]['lastname']) : '') ?></div>

<div class="teachers">
<?php
        echo $html; 
        if (!$showTeachersList) {
?>
    <div class="block_header blue" style="margin-bottom: 10px; margin-top: 30px;">Отзывы о преподавателе</div>
    <div id="teacher_comments_container" data:teacherID="<?php echo $teachers[0]['id']; ?>">
        <div style="text-align: center; padding: 10px;">Загрузка отзывов...</div>
    </div>
    <div class="block_header blue" style="margin-bottom: 10px;">Оставить свой отзыв</div>
<?php            
            if (User::$authorized) {
?>
    <div style="padding: 10px 30px">
        <div class="review_form">
            <form action="add_teacher_comment" class="proxyform">
                <div>Оцени преподавателя:</div>
                <div id="rating">
                    <table><tr>
                    <td class="star_big hover">1</td>
                    <td class="star_big hover">2</td>
                    <td class="star_big hover">3</td>
                    <td class="star_big">4</td>
                    <td class="star_big">5</td>
                    </tr></table>
                    <input type="hidden" name="rating" value="3"/>
                </div>
                <div style="padding-top: 10px;"><textarea required="1" errortext="Вы не ввели комментарий" style="width: 600px; max-width: 600px; height: 100px" name="content"></textarea></div>
                
                <input type="hidden" name="teacherID" value="<?php echo $teachers[0]['id']; ?>">
                <div style="padding-top: 10px;"><div class="button submitbutton" progresstext="Отправка...">Отправить</div></div>
            </form>
        </div>
    </div>
<?php
            } else {
                echo '<div class="lesson_unauthorized_message">Комментарии могут оставлять только зарегистрированные пользователи</div>';
            }
        }
?>
</div>