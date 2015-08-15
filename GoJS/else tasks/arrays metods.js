//Task1

var obj = {
    className: 'open menu'
};

function addClass(obb, cls) {
    var mass = obb.className.split(' ');
    for (var i = 0; i < mass.length; i++) {
        if (mass[i] == cls) return;
    }

    mass.push(cls);

    var obb2 = mass.join(' ');

    return console.log(obb2);
}

addClass(obj, 'new');
addClass(obj, 'open');
addClass(obj, 'me');


//Task2

function camelize(str) {
    var toArr1 = str.split('-');
    var toArr2;
    for (var i = 1; i < toArr1.length; i++) {
        toArr2 = toArr1[i].split('');
        toArr2.splice(0, 1, toArr2[0].toUpperCase());
        toArr1[i] = toArr2.join('');
    }

    return toArr1.join('');
}


console.log(camelize("background-color")); // 'backgroundColor';
console.log(camelize("list-style-image")); // 'listStyleImage';
console.log(camelize("-webkit-transition")); // 'WebkitTransition';

//Task3

var objRemoveClas = {
    className: 'open menu'
};

function removeClass(obj, filter) {
    var arr = obj.className.split(' ');

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == filter) {
            arr.splice(i, 1);
            i--;
        }
    }
    obj.className = arr.join(' ');
    return console.log(obj.className);
}


removeClass(objRemoveClas, 'open'); // objRemoveClas.className='menu'
removeClass(objRemoveClas, 'blabla'); // obj need to be reloaded

objRemoveClas = {
    className: 'my menu menu'
};
removeClass(objRemoveClas, 'menu');

//Task4

arr = [5, 3, 8, 1, 2, 3, 5, 7, 9, 4, 4];

function filterRangeInPlace(arr, a, b) {
    function sorty(c, d) {
        return c - d;
    }

    arr.sort(sorty);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            i--;
        }
    }

    return console.log(arr);
}

filterRangeInPlace(arr, 1, 4);

//Task5

var arr = ["HTML", "JavaScript", "CSS"];

var arrSorted = arr.slice().sort();
//arrSorted.sort();

console.log(arrSorted); // CSS, HTML, JavaScript
console.log(arr); // HTML, JavaScript, CSS (без изменений)

//Task6

var vasya = {name: "vova", age: 23};
var masha = {name: "masha", age: 18};
var vovochka = {name: "melkiy", age: 6};

var people = [vasya, masha, vovochka];

function sortByAge(mass) {
    mass.sort(sorty);
    function sorty(a, b) {
        return a.age - b.age;
    }

    return console.log(mass);
}

sortByAge(people);

console.log(people[0].age); // 6


//Task7

var arr = ["voz", "kiborg", "korset", "ZOV", "grobik", "koster", "sektor"];

function aclean(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toLowerCase().split('').sort().join('');
    }

    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length;) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--;
            }
            j++;
        }
    }
    return console.log(arr);
}

console.log(aclean(arr)); // "воз,киборг,корсет" или "ЗОВ,гробик,сектор"