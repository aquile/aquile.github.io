<?php

function rus_date() {
    // Перевод
    $translate = array(
        "am" => "дп",
        "pm" => "пп",
        "AM" => "ДП",
        "PM" => "ПП",
        "Monday" => "Понедельник",
        "Mon" => "Пн",
        "Tuesday" => "Вторник",
        "Tue" => "Вт",
        "Wednesday" => "Среда",
        "Wed" => "Ср",
        "Thursday" => "Четверг",
        "Thu" => "Чт",
        "Friday" => "Пятница",
        "Fri" => "Пт",
        "Saturday" => "Суббота",
        "Sat" => "Сб",
        "Sunday" => "Воскресенье",
        "Sun" => "Вс",
        "January" => "Января",
        "Jan" => "Янв",
        "February" => "Февраля",
        "Feb" => "Фев",
        "March" => "Марта",
        "Mar" => "Мар",
        "April" => "Апреля",
        "Apr" => "Апр",
        "May" => "Мая",
        "May" => "Мая",
        "June" => "Июня",
        "Jun" => "Июн",
        "July" => "Июля",
        "Jul" => "Июл",
        "August" => "Августа",
        "Aug" => "Авг",
        "September" => "Сентября",
        "Sep" => "Сен",
        "October" => "Октября",
        "Oct" => "Окт",
        "November" => "Ноября",
        "Nov" => "Ноя",
        "December" => "Декабря",
        "Dec" => "Дек",
        "st" => "ое",
        "nd" => "ое",
        "rd" => "е",
        "th" => "ое"
    );
    // если передали дату, то переводим ее
    if (func_num_args() > 1) {
        $timestamp = func_get_arg(1);
        return strtr(date(func_get_arg(0), $timestamp), $translate);
    } else {
    // иначе текущую дату
        return strtr(date(func_get_arg(0)), $translate);
    }
}

function array_deleteValue(&$array, $value) {
    $valueIndex = array_search($value, $array);
    if (valueIndex !== false) {
        return array_splice($array, $valueIndex, 1);
    } else {
        return null;
    }
}

function array_pluck($array, $key){
    return array_map(function($val) use ($key) {
        return $val[$key];
    }, $array);
}

/**
 * shortens the supplied text after last word
 * @param string $string
 * @param int $max_length
 * @param string $end_substitute text to append, for example "..."
 * @param boolean $html_linebreaks if LF entities should be converted to <br />
 * @return string
 */
function mb_word_wrap($string, $max_length, $end_substitute = null, $html_linebreaks = true) { 

    if($html_linebreaks) $string = preg_replace('/\<br(\s*)?\/?\>/i', "\n", $string);
    $string = strip_tags($string); //gets rid of the HTML

    if(empty($string) || mb_strlen($string) <= $max_length) {
        if($html_linebreaks) $string = nl2br($string);
        return $string;
    }

    if($end_substitute) $max_length -= mb_strlen($end_substitute, 'UTF-8');

    $stack_count = 0;
    while($max_length > 0){
        $char = mb_substr($string, --$max_length, 1, 'UTF-8');
        if(preg_match('#[^\p{L}\p{N}]#iu', $char)) $stack_count++; //only alnum characters
        elseif($stack_count > 0) {
            $max_length++;
            break;
        }
    }
    $string = mb_substr($string, 0, $max_length, 'UTF-8').$end_substitute;
    if($html_linebreaks) $string = nl2br($string);

    return $string;
}

function decodeExtCookie($cookie) {
    $re = "/^(a|n|d|b|s|o|e)\:(.*)$/";
    preg_match_all($re, urldecode($cookie), $matches, PREG_SET_ORDER);
    $all;
    $type;
    $v;
    $kv;

    if(!$matches || !$matches[0]){
        return; 
    }
    $type = $matches[0][1];
    $v = $matches[0][2];
    switch($type){
        case 'e':
            return null;
        case 'n':
        case 'd':
            return $v;
        case 'b':
            return ($v == '1');
        case 'a':
            $all = array();
            if($v != ''){
                $arrayItems = explode('^', $v);
                for ($i = 0, $n = count($arrayItems); $i < $n; $i++) {
                    $all[] = decodeExtCookie($arrayItems[$i]);
                }
            }
            return $all;
       case 'o':
            $all = array();
            if($v != ''){
                $arrayItems = explode('^', $v);
                for ($i = 0, $n = count($arrayItems); $i < $n; $i++) {
                    $kv = explode('=', $arrayItems[$i]);
                    $all[$kv[0]] = decodeExtCookie($kv[1]);
                }
            }
            return $all;
       default:
            return $v;
    }
}
