/*var names = 'Маша, Петя, Марина, Василий';!
 !
 var arr = names.split(', ');!
 !
 for (var i = 0; i < arr.length; i++) {!
 consloe.log( 'Вам сообщение ' + arr[i] );!
 }!*/
/*Задание 1 (Удаление css клссов)

 У объекта есть свойство className, которое хранит список css класов – слов, разделенных пробелами:

 var obj = {
 className: 'open menu'
 };
 Напишите функцию removeClass(obj, cls), которая удаляет класс cls, если он есть:

 removeClass(obj, 'open'); // obj.className='menu'
 removeClass(obj, 'blabla'); // без изменений
 P.S. Дополнительное усложнение. Функция должна корректно обрабатывать дублирование класса в строке:

 obj = {
 className: 'my menu menu'
 };

 removeClass(obj, 'menu');

 console.log( obj.className ); // 'my'
 Лишних пробелов после функции образовываться не должно.*/

//Task1
var object = {
    className: 'open menu menu'
};
function removeClass(obj, cls) {
    var mass = obj.className.split(' ');
    var massWithOutDuplicates = mass.reduce(function (ooobj, clazz) {
        if (clazz !== cls) ooobj[clazz] = true;
        return ooobj;
    }, {});
    for (var i = 0; i < mass.length; i++) {
        if (massWithOutDuplicates[i] === cls) {
            massWithOutDuplicates.splice(i, 1);
        }
    }
    obj.className = mass.join(' ');

}

removeClass(object, 'menu');

console.log(object);

//Task2
/*
 Есть массив строк arr. Создайте массив arrSorted — из тех же элементов, но отсортированный.

 Исходный массив не должен меняться.

 var arr = ['HTML', 'JavaScript', 'CSS'];

 // ... ваш код ...

 console.log( arrSorted ); // CSS, HTML, JavaScript
 console.log( arr ); // HTML, JavaScript, CSS (без изменений)*/

var arr = ['HTML', 'JavaScript', 'CSS'];
var arrSorted = arr.concat().sort();

//or this way
var arr = ['HTML', 'JavaScript', 'CSS'];
var arrSorted = arr.slice().sort();

//Task3
/*
 Необходимо отсортировать массив в случайном порядке используя метод sort.

 var arr = [1, 2, 3, 4, 5];

 arr.sort(ваша функция);

 console.log( arr ); // элементы в случайном порядке, например [3,5,1,2,4]*/

var arr1 = [1, 2, 3, 4, 2];

function randomSort(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}
//КОРОТКИЙ СПОСОБ!!!!!!     return a - b; будет то же что и выше

arr1.sort(randomSort);

//а теперь то же, но рандом


var arr1 = [1, 2, 3, 4, 5];

function randomSort() {
    return Math.random > 0.5 ? -1 : 1;
}

arr1.sort(randomSort);
//Task4

/*Напишите код, который отсортирует массив объектов people по полю age.

 Например:

 var vasya = { name: 'Вася', age: 23 };
 var masha = { name: 'Маша', age: 18 };
 var vovochka = { name: 'Вовочка', age: 6 };

 var people = [ vasya , masha , vovochka ];

 ... ваш код ...

 // теперь people: [vovochka, masha, vasya]
 console.log(people[0].age) // 6
 Выведите список имён в массиве после сортировки.*/


var vasya = {name: 'Вася', age: 23};
var masha = {name: 'Маша', age: 18};
var vovochka = {name: 'Вовочка', age: 6};

var people = [vasya, masha, vovochka];

function compareAge(a, b) {
    if (a.age > b.age) return 1;
    if (a.age < b.age) return -1;
}

people.sort(compareAge);

console.log(people[0].age); //6


//Task5

//Необходимо написать функцию isPal(string) которая возвращает true или false в зависимости от того является ли строка палиндромом или нет.
/*
 console.log(isPal('Anna')); // true
 console.log(isPal('А роза упала на лапу Азора')); //true
 console.log(isPal('Вася')); //false
 console.log(isPal('12321')); //true
 console.log(isPal('123212')); //false*/

var stringPromt = prompt('Insert palindrom or not statement');

var massPal = stringPromt.split('');
for (var i = 0; i < massPal.length; i++) {
    if (massPal[i] === ' ') massPal.splice(i, 1);
}

function isPal(mass) {
    if (mass.length % 2 === 0) {
        for (var j = 0, i = mass.length - 1; j <= mass.length; j++, i--) {
            if (mass[j] === mass[i]) {
                return true;
            }
            else return false;
        }
    }
    if (mass.length % 2 !== 0) {
        var n = mass.length;
        n = Math.ceil(n);
        mass.splice(n, 1);
        for (var j = 0, i = mass.length - 1; j <= mass.length; j++, i--) {
            if (mass[j] === mass[i]) {
                return true;
            }
            else return false;

        }
    }
}

console.log(isPal(massPal));

// Task6
/*
 Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr (arr — массив строк).

 var strings = ['кришна', 'кришна', 'харе', 'харе', 'харе', 'харе', 'кришна', 'кришна', '8-()' ];

 console.log( unique(strings) ); // кришна, харе, 8-()*/

var strings = ['кришна', 'кришна', 'харе', 'харе', 'харе', 'харе', 'кришна', 'кришна', '8-()'];

function unique(arr) {
    var n = arr.length;
    for (var i = 0; i < n; i++) {
        for (var j = 1; j < n; j++) {
            if (arr[i] === arr[j]) arr.splice(j, 1);
        }
    }
    return arr;
}

console.log(unique(strings)); // кришна, харе, 8-()*/


//Task7 НЕ ДОДЕЛАЛ - НЕ МОЖЕТ ПРОЧИТАТЬ ТОЛОВЕРКЕЙС У АНДЕФАЙНЕД...
/*

 Напишите функцию anClean(arr), которая возвращает массив слов, очищенный от анаграмм.

 var arr = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];

 console.log( anClean(arr) ); // 'воз,киборг,корсет' или 'ЗОВ,гробик,сектор'
 Из каждой группы анаграмм должно остаться только одно слово, не важно какое.*/

var arrN = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];

function anClean(arr) {
    //var n = arr.length; //тут встает вопрос, вычисляет ли цикл длину массива каждый раз - если нет - везде пишем n
    for (var i = 0; i < arr.length; i++) {
        var arrLowCase = [];
        arrLowCase[i] = arr[i].toLowerCase().split('').sort().join('');
    }
    for (i = 0; i < arrLowCase.length; i++) {
        for (var j = i + 1; j < arrLowCase.length; j++) {
            if (arrLowCase[i] == arrLowCase[j]) arrLowCase.splice(j, 1);
        }
    }
    return console.log(arrLowCase);
}

anClean(arrN);
