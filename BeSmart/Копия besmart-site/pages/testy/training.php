<?php
function getTestHistoryLines($tests) {
    $html = '';
    
    if (!count($tests)) {
        $html = '<tr><td colspan="5">Вы еще не проходили тесты</td></tr>';
    } else {
        for ($i = 0, $n = count($tests); $i < $n; $i++) {
            
            $html .= '<tr>
                <td>' . rus_date('<\b>H:i</\b> D<\b\r/>d F Y', strtotime($tests[$i]['starttime'])) . '</td>
                <td style="font-weight: bold">' . $tests[$i]['testName'] . '</td>
                <td>' . round($tests[$i]['timespent'] / 60) . ' мин.</td>
                <td>' . $tests[$i]['points'] . '</td>
                <td><span style="color: #' .  $tests[$i]['statusColor'] . '">' . $tests[$i]['statusName'] . '</td>
            </tr>';
        }
    }
    return $html;
}
function printTest($testInfo, $testsInProgress) {
    $testInProgress = in_array($testInfo['id'], $testsInProgress);
    
    $html = '<div class="test_container"><div class="abs_shadow"><table class="abs">
        <tr>
            <td class="abs_firsttd" style="width: 200px">Тема</td>
            <td class="abs_tdleftalign" style="font-size: 16px; font-weight: bold">' . $testInfo['name'] . '</td>
        </tr>
        <tr class="ovv">
            <td class="abs_firsttd">Лимит времени</td>
            <td class="abs_tdleftalign" style="font-size: 16px;">' . $testInfo['timeLimit'] . ' мин.</td>
        </tr>
        <tr class="ovv"><td colspan="2">';
            if ($testInProgress) {
                $html .= '<div style="color: green; padding-bottom: 5px;">Тест не завершен</div>';
            }
            $html .= '<div>
            <div onclick="onButtonStartClick.call(this, ' . $testInfo['id'] . ')" class="myButton button-start unselectable">';
                if ($testInProgress) {
                    $html .= 'Продолжить тестирование';
                } else {
                    $html .= 'Начать тестирование';
                }
    $html .= '</div>
        </div></td></tr></table></div></div>';
    
    return $html;
}
include 'core/Test.php';
$output = '';
if (!User::$authorized) {
    echo '<div class="lesson_unauthorized_message">Для прохождения этого типа тестов Вам нужно авторизироваться</div>';
} else {
    $tests = DBmanager::getTest(array(
        'level' => User::$userInfo['level'], // Только тести уровня пользователя
        'type' => 2 // Только тренировочные тесты
    ));
    
    $userTestTransactions = DBmanager::getUserTestsTransactions(array(
        'tt.user' => User::$userInfo['id'],     // ТОлько история польщователя
        't.type' => 2                          // ТОлько история по тренировочным тестам
//        't.level' => User::$userInfo['level']   // ТОлько история по текущему уровню пользователя
    ), '`tt`.`id` DESC');
    
    $testsInProgress = array();
    
    if (count($userTestTransactions)) {
        foreach ($userTestTransactions as $value) {
            if ($value['status'] == 3) {
                if ((strtotime($value['starttime']) + $value['timeLimit'] * 60) > time()) {
                    $testsInProgress[] = $value['test'];
                } else {
                    Test::finishTest($value);
                    $userTestTransactions = DBmanager::getUserTestsTransactions(array(
                        'tt.user' => User::$userInfo['id'],
                        't.type' => 2
    //                    't.level' => User::$userInfo['level']
                    ), 'tt.id DESC');
                }
            }
        }
    }
    
//    echo "<pre>";
//    print_r($testsInProgress);
//    print_r($tests);
//    echo "</pre>";
    
    
    if (count($tests)) {
        foreach ($tests as $value) {
            $output .= printTest($value, $testsInProgress);
        }
    }

?>
    
<div class="training-tests">
<?php
echo $output;
?>
    
    <div class="header">История тестирования</div>
    <div class="abs_shadow">
        <table class="abs" style="font-size: 18px;">
            <tr class="abs_header">
                <td style='background-color: #e1eef6'>Дата</td>
                <td style='background-color: #e1eef6'>Тема</td>
                <td style='background-color: #e1eef6'>Потрачено времени</td>
                <td style='background-color: #e1eef6'>Набрано баллов</td>
                <td style='background-color: #e1eef6'>Статус</td>
            </tr>
            <?php 
                echo getTestHistoryLines($userTestTransactions);
            ?>
        </table>
    </div>
</div>

<?php Widget::renderWidget('TestPopup'); ?>

<script>
    
    function onButtonStartClick(testID) {
        if (this.className.indexOf('disabled') == -1) {
            ttP.show(testID);
            this.className += ' disabled'; 
        }
    }
    
    var ttP = new testPopup({
        selector: '#test_popup', 
        testType: '2' // Тип "Тренировочный"
    });
    ttP.init();
</script>

<?php 
}?>