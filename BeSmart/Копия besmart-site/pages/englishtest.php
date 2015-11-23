<?php
//unset(
//    $_SESSION['BT_current_question'],
//    $_SESSION['BT_correctanswers'],
//    $_SESSION['BT_correctanswers_all'],
//    $_SESSION['BT_finished'],
//    $_SESSION['BT_LEVEL']
//);

$GroupHeaders = array(
    1 => 'Part A Test 1 – choose the right variant',
    2 => 'Part A Test 2 – fill in the blanks with the correct form of the word in brackets',
    3 => 'Part B Test 1 – choose the right variant:',
    4 => 'Part B Test 2 – fill in the blanks with the correct form of the word in brackets'
);
$levelNames = array(
    0 => 'Beginner',
    1 => 'Elementary',
    2 => 'Pre-intermediate',
    3 => 'Intermediate',
    4 => 'Upper-intermediate'
);
$tests = DBmanager::getBasicTest();

if (!$_SESSION['BT_current_question']) {
    $_SESSION['BT_current_question'] = 0;
}
if (!$_SESSION['BT_correctanswers']) {
    $_SESSION['BT_correctanswers'] = 0;
}
if (!$_SESSION['BT_finished']) {
    // Process data
    if ($_POST['qid'] && $_POST['qid'] == $_SESSION['BT_current_question'] + 1) {
        // If user answered question - define if the answer is correct
        $isCorrectAnswer = true;
        for ($i = 0, $n = count($tests[$_POST['qid'] - 1]['answer']); $i < $n; $i++) {
            $correctAnswers = $tests[$_POST['qid'] - 1]['answer'][$i];
            
            if (!in_array(trim(strtolower($_POST['answer'][$i])), $correctAnswers)) {
                $isCorrectAnswer = false;
            }
        }
        $_SESSION['BT_current_question'] ++;

        if ($isCorrectAnswer) {
            $_SESSION['BT_correctanswers'] ++;
            $_SESSION['BT_correctanswers_all'] ++;
        }
    }

    if ($_SESSION['BT_current_question'] == 20) {
        // LEVEL LINE
        if ($_SESSION['BT_correctanswers'] < 10) {
            $_SESSION['BT_LEVEL'] = 1;

            $_SESSION['BT_finished'] = true;
        } else {
            $_SESSION['BT_LEVEL'] = 2;
        }
        $_SESSION['BT_correctanswers'] = 0;
    } else if ($_SESSION['BT_current_question'] == 49) {
        if ($_SESSION['BT_correctanswers'] < 10) {
            $_SESSION['BT_LEVEL'] = 2;
        } else if ($_SESSION['BT_correctanswers_all'] > 42) {
            $_SESSION['BT_LEVEL'] = 4;
        } else {
            $_SESSION['BT_LEVEL'] = 3;
        }
        $_SESSION['BT_finished'] = true;
    }

    $currentQuesiton = $tests[$_SESSION['BT_current_question']];
}

function questionProxy($q) {
    return preg_replace('/\{\}/', '<input type="text" AUTOCOMPLETE="off" class="test_input autosize" name="answer[]" />', $q);
}

if($_POST['BT_forcefinish'] == 1) {
    $_SESSION['BT_finished'] = true;
} 

if (!$_SESSION['BT_finished']) {
?>
<div>
    <form action="/englishtest" method="POST" id="fform">
        <input type="hidden" name="BT_forcefinish" value="1" />
        <div style="text-align: center;">
            <div class="button" onclick="document.getElementById('fform').submit()">Закончить тест</div>
        </div>
    </form>
</div>
<div class="test_block">
    <div class="test_header"><?php echo $GroupHeaders[$currentQuesiton['group']]; ?></div>
    <div class="test_body">
        <form action="/englishtest" method="POST" id="qform">
            <input type="hidden" name="qid" value="<?php echo $currentQuesiton['id']; ?>" />
            <div class="test_question">
                <?php echo ($_SESSION['BT_current_question'] + 1) . '. ' . questionProxy($currentQuesiton['question']); ?>
            </div>
            <div style="text-align: right;">
                <div class="button" onclick="document.getElementById('qform').submit()">NEXT</div>
            </div>
        </form>
    </div>
    <div class="test_footer"></div>
</div>

<?php
} else {
?>
<div class="test_finished">
    <div style="color: #4fb6d8; font-weight: bold; font-size: 30px; padding-bottom: 30px">Поздравляем!</div>
    <div>Тест успешно пройден</div>
    <div>Ваш уровень <b><u><?php echo $levelNames[$_SESSION['BT_LEVEL'] ? $_SESSION['BT_LEVEL'] : 0]; ?></u></b></div>
    <?php if (!$_SESSION['gov_test_complete']) { ?>
    <div style="padding-top:30px; ">Заполните форму:</div>
    <div style="padding-top:20px; ">
        <form action="test_finished_gov" class="proxyform" id="resform" onsuccess="window.location.replace('/englishtest');">
            <table style="margin: 0 auto">
                <tr><td>ФИО:</td><td><input type="text" name="name" class="test_input" errortext="Введите Ваше имя" required="1"/></td></tr>
                <tr><td>Телефон:</td><td><input type="text" name="tel" class="test_input" errortext="Введите номер Вашего телефона" required="1"/></td></tr>
                <tr><td>E-mail:</td><td><input type="text" name="email" class="test_input" errortext="Укажите Ваш e-mail" required="1"/></td></tr>
                <tr><td>Организация:</td><td><select name="organization"><option value="Министерство финансов">Министерство финансов</option><option value="Министерство регионального развития">Министерство регионального развития</option><option value="Министерство аграрной политики">Министерство аграрной политики</option></select></td></tr>
                <tr><td>Департамент:</td><td><input type="text" name="department" class="test_input" errortext="Укажите Ваш e-mail" required="1"/></td></tr>
            </table>
            <input type="hidden" name="level" value="<?php echo $_SESSION['BT_LEVEL'] ? $_SESSION['BT_LEVEL'] : 0; ?>"/>
            <div style="padding-top: 20px;">
                <div class="button submitbutton">Отправить</div>
            </div>
        </form>
    </div>
    <?php } ?>
</div>
<?php }