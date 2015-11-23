<?php
    if (User::$authorized) {
?>
<script>window.location.replace('<?php echo TopLogin::$levels[User::$userInfo['level']]; ?>')</script>
<?php
    } else {
?>
<form action="login" onsuccess="var path = arguments[0].info; if (path && path != 'null') { window.location.replace(path)}" class="proxyform">
    <input type="hidden" name="SID" value="<?php echo session_id() ?>"/>
    <div class="abs_shadow" style='width: 418px; margin-top: 130px;'>
        <table class="abs" style='width: 400px'>
            <tr class="ovv">
                <td class="abs_point">Логин:</td>
                <td><input type="text" name="login" required="1" errortext="Вы не указали ваш логин" class='input_login'/></td>
            </tr>
            <tr class="last">
                <td class="abs_point">Пароль:</td>
                <td><input type="password" name="pass" required="1" errortext="Вы не ввели пароль" class='input_login'/></td>
            </tr>
            <tr>
                <td colspan='2'><div class="new_button submitbutton" progresstext="Вход...">Вход</div></td>
            </tr>
        </table>
    </div>
    <button style='display: none'>Вход</button>
</form>
<?php
    }