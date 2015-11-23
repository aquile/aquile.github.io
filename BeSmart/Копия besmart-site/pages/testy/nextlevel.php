<?php
include_once 'core/Test.php';

$testInterval = SystemSettings::getByName('nextLevelTestInterval');

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


if (!User::$authorized) {
    echo '<div class="lesson_unauthorized_message">Для прохождения этого типа тестов Вам нужно авторизироваться</div>';
} else {
    
    $tests = DBmanager::getUserTestsTransactions(array(
        'tt.user' => User::$userInfo['id'],
        't.type' => 1,
        't.level' => User::$userInfo['level']
    ), 'tt.id DESC');
    
    $testInProgress = false;
    foreach($tests as $key => $info) {
        if ($info['status'] == 3) {
            if ((strtotime($info['starttime']) + $info['timeLimit'] * 60) > time()) {
                $testInProgress = $info;
            } else {
                Test::finishTest($info);
                $tests = DBmanager::getUserTestsTransactions(array(
                    'tt.user' => User::$userInfo['id'],
                    't.type' => 1,
                    't.level' => User::$userInfo['level']
                ), 'tt.id DESC');
            }
        }
    }

    $currentTest = DBmanager::getTest(array(
        'level' => User::$userInfo['level'],
        'type' => 1
    ));

    
?>
<div style="padding: 0 20px 70px 20px">
<?php
    if (count($currentTest)) {
        $currentTest = $currentTest[0];
        
        $lessons = DBmanager::getLessonsForUser(User::$userInfo['id'], array(2), array(
            'l.lesson_type' => 1,
            'l.level' => User::$userInfo['level']
        ));
        $testsAllowed = floor(count($lessons) / $testInterval) - count($tests);
        if ($testsAllowed < 0) {
            $testsAllowed = 0;
        }
?>
    <div class="header">Информация о тесте</div>
    <div class="abs_shadow">
        <table class="abs">
            <tr>
                <td class="abs_firsttd">Название теста</td>
                <td class="abs_tdleftalign" style="font-size: 16px;"><?php echo $currentTest['name']; ?></td>
            </tr>
            <tr class="ovv">
                <td class="abs_firsttd">Лимит времени</td>
                <td class="abs_tdleftalign" style="font-size: 16px;"><?php echo $currentTest['timeLimit']; ?> мин.</td>
            </tr>
            <tr>
                <td class="abs_firsttd" style="width: 300px">
                    Доступно попыток
                    <div style="font-size: 12px;">за каждые <?php echo $testInterval; ?> посещенных комплексних занятий предоставляется 1 дополнительная попытка</div>
                </td>
                <td class="abs_tdleftalign" style="font-size: 16px;"><?php echo $testsAllowed ?>
                    <?php if ($testInProgress) { ?>
                    <div style="color: green;">+ 1 не завершено</div>
                    <?php } ?>
                </td>
            </tr>
            <?php 
            if ($testsAllowed > 0 || $testInProgress) {
            ?>
                <tr class="ovv">
                    <td colspan="2">
                        <div>
                            <div onclick="onButtonStartClick.call(this)" class="myButton button-start unselectable">
                                <?php
                                    if ($testInProgress) {
                                        echo 'Продолжить тестирование';
                                    } else {
                                        echo 'Начать тестирование';
                                    }
                                ?>
                            </div>
                        </div>
                    </td>
                </tr>
            <?php } ?>
        </table>
    </div>
<?php
    }
?>
    <div class="header">История тестирования</div>
    <div class="abs_shadow">
        <table class="abs" style="font-size: 18px;">
            <tr class="abs_header">
                <td style='background-color: #e1eef6'>Дата</td>
                <td style='background-color: #e1eef6'>Название теста</td>
                <td style='background-color: #e1eef6'>Потрачено времени</td>
                <td style='background-color: #e1eef6'>Набрано баллов</td>
                <td style='background-color: #e1eef6'>Статус</td>
            </tr>
            <?php 
                echo getTestHistoryLines($tests);
            ?>
        </table>
    </div>
</div>
<?php Widget::renderWidget('TestPopup'); ?>
<script>
    function onButtonStartClick () {
        if (this.className.indexOf('disabled') == -1) {
            ttP.show();
            this.className += ' disabled'; 
        }
    }
    
    var ttP = new testPopup({
        selector: '#test_popup', 
        testType: '1' // Тип "Переход на след. уровень"
    });
    ttP.init();
    
</script>


<?php 
}