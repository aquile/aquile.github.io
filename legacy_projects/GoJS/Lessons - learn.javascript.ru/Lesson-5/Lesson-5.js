//Lesson 5
var user = {
    name: 'Sergey',
    surname: 'Petrov'
};

user.name = 'Andrey';
user.age = 30;
delete user.name;
console.log(user);

//if object empty - then true, else - false
var obj = {};

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
isEmpty(obj3);
//hardcode decision for this task
var obj3 = { 1: 3,2: 5 };

function isEmpty2(obj) {
    var counter = 0;
    for (var key3 in obj) {
        counter++;
    }
    if (counter !== 0) {
        return false
    } else {
        return true
    }
}

isEmpty2(obj3);

//amount salary of department
var salaries = {
    'junior': 1000,
    'middle': 2500,
    'senior': 3500,
    'lead': 5000
}
function sumSalaryOfDepartment(salary) {
    var sum = 0;
    for (var title in salary) {
        sum = sum + salary[title];
    }
    return sum;
}
console.log(sumSalaryOfDepartment(salaries))

//arrays
//take last element from array
var arr1 = [2, 4, 6, 7, 8, 9];

function lastArrayElement(last) {
    return last[last.length - 1];
};

console.log(lastArrayElement(arr1));

//function with array + any element

function arrPlusLastEl(plus, x) {
    plus.push(x);
    return plus;
}

console.log(arrPlusLastEl(arr1, "last element"));

//array + number of .length-1
function arrPlusLastEl2(plus) {
    plus.push(plus.length - 1);
    return plus;
}

console.log(arrPlusLastEl2(arr1));
//array + last element
function arrPlusLastEl3(plus) {
    plus.push(plus[plus.length - 1]);
    return plus;
}

console.log(arrPlusLastEl3(arr1));

//Task3 from lecture5
var fruits = ['apple', 'orange'];
fruits.push('kiwi');
fruits[fruits.length - 2] = 'pear';
console.log(fruits.shift());
fruits.unshift('apricot', 'peach');

//Task4 from lecture5
/*
 Написать функцию которая принимает на вход массив и возвращает случайное значение из этого массива.*/

var arr2 = [3, 4, 6, 8, 9, 0];

function randomFromArray(arr) {

    return arr[Math.floor(Math.random() * arr.length)];

}

console.log(randomFromArray(arr2));

//Task5 from lecture5
/*Создайте функцию find(arr, value), которая ищет в массиве arr
 значение value и возвращает его позицию, если найдено, или
 -1, если не найдено.*/

function find(arr, value) {
    for (value in arr) {
        var i = 1;
        if (value === arr.length - i) return arr.length - i
    }
}
