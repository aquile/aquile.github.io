<?php
    Widget::renderWidget('TopMenu', array(
        'info' => $this->info,
        'menu' => array(
            array(
                'href' => '/schedule',
                'text' => 'РАСПИСАНИЕ'
            ),
            array(
                'href' => '/abonementy',
                'text' => 'ЦЕНЫ'
            ),
            array(
                'href' => '/testy',
                'text' => 'ТЕСТЫ'
            ),
            array(
                'href' => '/franchising',
                'text' => 'ФРАНЧАЙЗИНГ'
            ),
            array(
                'href' => '/otzyvy',
                'text' => 'ОТЗЫВЫ'
            ),
            array(
                'href' => '/kontakty',
                'text' => 'КОНТАКТЫ'
            )
        )
    ));

    if (User::$authorized) {
?>
<div style="padding: 180px 0 100px 0; font-size: 16px;">
    <table style="width: 900px; margin: 0 auto">
        <tbody>
            <tr>
                <td style="text-align: center;"><a href="/schedule/elementary"><img src="/templates/general/images/level1.png"><div style="padding-top: 10px;">ELEMENTARY</div></a></td>
                <td style="text-align: center;"><a href="/schedule/pre-intermediate"><img src="/templates/general/images/level2.png"><div style="padding-top: 10px;">PRE-INTERMEDIATE</div></a></td>
                <td style="text-align: center;"><a href="/schedule/intermediate"><img src="/templates/general/images/level3.png"><div style="padding-top: 10px;">INTERMEDIATE</div></a></td>
                <td style="text-align: center;"><a href="/schedule/upper-intermediate"><img src="/templates/general/images/level4.png"><div style="padding-top: 10px;">UPPER-INTERMEDIATE</div></a></td>
            </tr>
            <tr>
                <td style="text-align: center; padding-top: 40px"><a href="/schedule/beginner"><img src="/templates/general/images/level1.png"><div style="padding-top: 10px;">BEGINNER</div></a></td>
                <td style="text-align: center;">&nbsp;</td>
                <td style="text-align: center;">&nbsp;</td>
                <td style="text-align: center;">&nbsp;</td>
            </tr>
        </tbody>
    </table>
</div>
<?php
} else {
?>
<div id='pageholder'>
    <div style="padding-top:180px; text-align: center; font-size: 19px; line-height: 30px">
        <div>Ваше расписание будет доступно после входа в личный кабинет.</div>
        <div>Для получения логина и пароля обратитесь к консультантам Be Smart по телефонам: </div>
        <div>044 222 88 77</div>
        <div>066 001 97 94</div>
        <div>067 247 67 27</div>
        <!--<img src='/gallery_pictures/schedule_all5.jpg' style='width: 100%'/>.-->
    </div>
</div>
<?php
}

Widget::renderWidget('Footer');
