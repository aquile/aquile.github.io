<?php
// Информация о пользователе
$userInfo = User::$userInfo;

$levels = DBmanager::getTable('levels', 0, null, 'id');
$userTypes = DBmanager::getTable('usertypes', 0, null, 'id');

function getUserLessonLimit() {
    $limit = 0;
    $payments = DBmanager::getPayments(array(
        'user' => User::$userInfo['id']
    ));

    for ($i = 0, $n = count($payments); $i < $n; $i++) {
        $limit += $payments[$i]['days'];
    }

    return $limit;
}

if ($userInfo['userTypeID'] == 33) {
    $ulLimit = getUserLessonLimit();
    // Find currentCount
    $userlessons = DBmanager::getUserLessons(array(
        'user' => $userInfo['id'],
        'status' => array(1, 2)
    ));

    for ($i = 0, $n = count($userlessons); $i < $n; $i++) {
        $ul = $userlessons[$i];
        $key = date('Y.m.d', strtotime($ul['timestart']));

        if (!$tmp[$key]) {
            $tmp[$key] = 0;
        }
    }

    $daysVisited = count(array_keys($tmp));
    $daysLeft = $ulLimit - $daysVisited;
}
?>
<div style="padding: 0 20px 70px 20px">
    <div class="header">Общая информация</div>
    <div class="abs_shadow">
        <table class="abs">
            <tr><td class="abs_firsttd"  style="width: 220px;">Имя</td>
                <td class="abs_tdleftalign"><?php echo $userInfo['firstname'] ?></td>
            </tr>
            <tr class="ovv"><td class="abs_firsttd">Фамилия</td>
                <td class="abs_tdleftalign"><?php echo $userInfo['lastname'] ?></td>
            </tr>
            <tr><td class="abs_firsttd" >E-mail</td>
                <td class="abs_tdleftalign"><?php echo $userInfo['email'] ?></td>
            </tr>
            <tr class="ovv"><td class="abs_firsttd">Телефон</td>
                <td class="abs_tdleftalign"><?php echo $userInfo['tel'] ?></td>
            </tr>
        </table>
    </div>
    <?php 
        if (User::$userInfo['allowRegister'] && !User::$expired && User::$userInfo['userTypeID'] != 1) {
    ?>
<!--    <div class="header">Мой персональный консультант</div>
    <div class="abs_shadow">
        <table class="abs">
            <tr class="ovv">
                <td class="abs_firsttd">Телефон</td>
                <td class="abs_tdleftalign">(044) 222-88-77, (066) 001-97-94, (067) 247-67-27</td>
            </tr>
            <tr>
                <td class="abs_firsttd">Время работы</td>
                <td class="abs_tdleftalign">
                    <table class="noclass">
                        <tr><td style="padding: 0 5px; text-align: right">Пн - Пт:</td><td>13:00 - 20:00</td></tr>
                        <tr><td style="padding: 0 5px; text-align: right">Сб:</td><td>11:00 - 14:00</td></tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>-->
    <?php
        }
    ?>
    <div class="header">Мой абонемент</div>
    <div class="abs_shadow">
        <table class="abs">
            <tr><td class="abs_firsttd" style="width: 220px;">Текущий статус</td>
                <td class="abs_tdleftalign">
                    <?php
                        if (User::$expired) {
                            echo '<span class="ticket_blocked">Истек срок действия</span><br/><a href="/abonementy">Продлить ></a>';
                        } else if (User::$blocked) {
                            echo '<span class="ticket_blocked">Заблокирован до <b>' . date('d.m.Y', strtotime($userInfo['blockedTill'])) . '</b></span> (за нарушение правил регистриции)';
                        }  else if (User::$notYetAvailable) {
                            echo '<span class="ticket_notyetactive">Не Активный</span>  (будет активным с <b>' . date('d.m.Y', strtotime($userInfo['availableFrom'])) . '</b>)';
                        } else {
                            echo '<span class="ticket_active">Активный</span>';
                        }
                        
                    ?>
                </td>
            </tr>
            <tr><td class="abs_firsttd">Тип</td>
                <td class="abs_tdleftalign"><a href="/abonementy"><?php echo $userTypes[$userInfo['userTypeID']]['name'] ?></a></td>
            </tr>
            <tr><td class="abs_firsttd">Уровень</td>
                <td class="abs_tdleftalign"><?php echo $levels[$userInfo['level']]['name'] ?></td>
            </tr>
            <?php 
                if ($userInfo['userTypeID'] == 33) {
            ?>
                <tr><td class="abs_firsttd">Всего дней</td>
                    <td class="abs_tdleftalign"><?php echo $ulLimit; ?></td>
                </tr>
                <tr><td class="abs_firsttd">Дней осталось</td>
                    <td class="abs_tdleftalign"><?php echo $daysLeft ?></td>
                </tr>
            <?php } ?>
            <tr><td class="abs_firsttd">Срок действия</td>
                <td class="abs_tdleftalign">
                    <?php
                        if ($userInfo['availableFrom']) {
                            echo 'с <b>' . date('d.m.Y', strtotime($userInfo['availableFrom'])) . '</b> ';
                        }
                        if ($userInfo['availableTo']) {
                            echo 'до <b>' . date('d.m.Y', strtotime($userInfo['availableTo'])) . '</b>';
                        }
                        if (!$userInfo['availableFrom'] && !$userInfo['availableTo']) {
                            echo 'неограниченно';
                        } else if ($userInfo['availableTo'] && !User::$expired) {
                            $datetime1 = new DateTime(date('Y-m-d'));
                            $datetime2 = new DateTime($userInfo['availableTo']);
                            $interval = $datetime1->diff($datetime2);
                            echo ' (Осталось дней: <b>' . $interval->days . '</b>)';
                        }
                        
                    ?>
                </td>
            </tr>
        </table>
    </div>
</div>