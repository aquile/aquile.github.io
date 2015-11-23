<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TestPopup
 *
 * @author Мой дом-моя крепость
 */
class TestPopup implements iWidget{
    public static function render($var = null) {
        echo '<div id="test_popup" class="popup_window">
            <div class="abs_shadow" style="width:620px">
                <table class="abs" style="width:600px;">
                    <tr>
                        <td class="abs_firsttd" style="font-size: 14px; width: 200px">Назание теста</td>
                        <td class="abs_tdleftalign"  style="font-size: 14px">
                            <div class="testname"></div>
                        </td>
                    </tr>
                    <tr class="ovv">
                        <td class="abs_firsttd" style="font-size: 14px">Необходимый минимум</td>
                        <td class="abs_tdleftalign">
                            <div class="minvalue"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="abs_firsttd" style="font-size: 14px">Набрано баллов</td>
                        <td class="abs_tdleftalign">
                            <div class="progressinfo"></div>
                            <?php // echo getProgressLine(33, 57, 385, 24); ?>
                        </td>
                    </tr>
                    <tr class="ovv">
                        <td class="abs_firsttd"  style="font-size: 14px">Осталось времени</td>
                        <td class="abs_tdleftalign" style="font-size: 18px">
                            <div class="timeleft"></div>
                        </td>
                    </tr>
                    <tr class="ovv">
                        <td colspan="2" style="padding: 0;">
                            <form onsubmit="return false;">
                                <input type="hidden" name="transaction_id" value="2" />
                                <input type="hidden" name="question_id" value="2" />
                                <div class="test_group_title">
                                    <!--Part 1 – choose the right variant !-->
                                </div>
                                <div class="test_question">
                                    <!--<input type="text" name="answer[]" AUTOCOMPLETE="off"  class="test_input autosize"/> (their/there/the) is no computer in this room. !-->
                                </div>
                                <div style="padding-bottom: 5px;">
                                    <div class="myButton">Next</div>
                                </div>
                            </form>
                        </td>
                    </tr>
                </table>
                <div class="loader">
                    <img src="/templates/general/images/circle_loader.gif">
                </div>
            </div>
        </div>';
    }

//put your code here
}
