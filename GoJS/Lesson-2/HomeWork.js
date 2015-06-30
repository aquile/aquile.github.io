
/*
 for (var i = 1; i <= 10; i++) {
 if (i % 2 === 0) {
 console.log(i);
 }
 }*/

//Task 1

    var year = prompt("Введите какой сейчас год");
if (year == 2015) {
    console.log('Верно');  //didn't use alert
} else {
    console.log('С луны свалился?');
}

//short code  Task 1

var year2 = prompt("Введите год");

year2 === 2015 ? console.log("right") : console.log("you are nut");


//Task 2
/*Используя конструкцию if..else, напишите код, который будет спрашивать: 'Введите любое целое число?'
Затем выведите alert:
    1, если значение больше нуля, -1, если значение меньше нуля, 0, если значение равно нулю.
var number;*/
var number;
number = prompt('Insert any number you like!');
if (+number > 0) {
    console.log('1');
} else if (+number < 0) {
    console.log('-1');
} else {
    console.log('0')
}

//Task 3
/*Напишите код, который будет запрашивать логин пользователя (prompt).
    Если посетитель вводит 'admin', то спрашивать пароль, если нажал отмена (escape) — выводить 'Canceled', если вводит что-то другое — 'Access denied'.
    Пароль проверять так. Если введён пароль 'passw0rd', то выводить 'Welcome home!', иначе — 'Wrong password', при отмене — 'Canceled'*/

var login = prompt('Insert your login');
if (login == 'admin') {
    var password = prompt('Insert your password');
    if (password == 'passw0rd') {
        alert('Welcome home!');
    } else if (password != null) {
        alert('Wrong password');
    } else {
        alert('Canceled!')
    }
  } else if (login != null) {
    alert('Access denied');
  } else {
    alert('Canceled');
}

//Task 4

var a = 1, b = 2;

(a + b) >= 3 ?result = 'Yep!' : result = 'Noup!';

//Task 5
var name = 'admin', text;
//присвоит text hi если name == admin и тд
text = name == 'admin' ? 'Hi' :
         name == 'manager' ? 'Hello' :
           name == '' ? 'No login' : '';


