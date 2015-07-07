/*var names = '����, ����, ������, �������';!
 !
 var arr = names.split(', ');!
 !
 for (var i = 0; i < arr.length; i++) {!
 consloe.log( '��� ��������� ' + arr[i] );!
 }!*/
/*������� 1 (�������� css ������)

 � ������� ���� �������� className, ������� ������ ������ css ������ � ����, ����������� ���������:

 var obj = {
 className: 'open menu'
 };
 �������� ������� removeClass(obj, cls), ������� ������� ����� cls, ���� �� ����:

 removeClass(obj, 'open'); // obj.className='menu'
 removeClass(obj, 'blabla'); // ��� ���������
 P.S. �������������� ����������. ������� ������ ��������� ������������ ������������ ������ � ������:

 obj = {
 className: 'my menu menu'
 };

 removeClass(obj, 'menu');

 console.log( obj.className ); // 'my'
 ������ �������� ����� ������� �������������� �� ������.*/

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
 ���� ������ ����� arr. �������� ������ arrSorted � �� ��� �� ���������, �� ���������������.

 �������� ������ �� ������ ��������.

 var arr = ['HTML', 'JavaScript', 'CSS'];

 // ... ��� ��� ...

 console.log( arrSorted ); // CSS, HTML, JavaScript
 console.log( arr ); // HTML, JavaScript, CSS (��� ���������)*/

var arr = ['HTML', 'JavaScript', 'CSS'];
var arrSorted = arr.concat().sort();

//or this way
var arr = ['HTML', 'JavaScript', 'CSS'];
var arrSorted = arr.slice().sort();

//Task3
/*
 ���������� ������������� ������ � ��������� ������� ��������� ����� sort.

 var arr = [1, 2, 3, 4, 5];

 arr.sort(���� �������);

 console.log( arr ); // �������� � ��������� �������, �������� [3,5,1,2,4]*/

var arr1 = [1, 2, 3, 4, 2];

function randomSort(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}
//�������� ������!!!!!!     return a - b; ����� �� �� ��� � ����

arr1.sort(randomSort);

//� ������ �� ��, �� ������


var arr1 = [1, 2, 3, 4, 5];

function randomSort() {
    return Math.random > 0.5 ? -1 : 1;
}

arr1.sort(randomSort);
//Task4

/*�������� ���, ������� ����������� ������ �������� people �� ���� age.

 ��������:

 var vasya = { name: '����', age: 23 };
 var masha = { name: '����', age: 18 };
 var vovochka = { name: '�������', age: 6 };

 var people = [ vasya , masha , vovochka ];

 ... ��� ��� ...

 // ������ people: [vovochka, masha, vasya]
 console.log(people[0].age) // 6
 �������� ������ ��� � ������� ����� ����������.*/


var vasya = {name: '����', age: 23};
var masha = {name: '����', age: 18};
var vovochka = {name: '�������', age: 6};

var people = [vasya, masha, vovochka];

function compareAge(a, b) {
    if (a.age > b.age) return 1;
    if (a.age < b.age) return -1;
}

people.sort(compareAge);

console.log(people[0].age); //6


//Task5

//���������� �������� ������� isPal(string) ������� ���������� true ��� false � ����������� �� ���� �������� �� ������ ����������� ��� ���.
/*
 console.log(isPal('Anna')); // true
 console.log(isPal('� ���� ����� �� ���� �����')); //true
 console.log(isPal('����')); //false
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
 �������� ������� unique(arr), ������� ���������� ������, ���������� ������ ���������� �������� arr (arr � ������ �����).

 var strings = ['������', '������', '����', '����', '����', '����', '������', '������', '8-()' ];

 console.log( unique(strings) ); // ������, ����, 8-()*/

var strings = ['������', '������', '����', '����', '����', '����', '������', '������', '8-()'];

function unique(arr) {
    var n = arr.length;
    for (var i = 0; i < n; i++) {
        for (var j = 1; j < n; j++) {
            if (arr[i] === arr[j]) arr.splice(j, 1);
        }
    }
    return arr;
}

console.log(unique(strings)); // ������, ����, 8-()*/


//Task7 �� ������� - �� ����� ��������� ����������� � ����������...
/*

 �������� ������� anClean(arr), ������� ���������� ������ ����, ��������� �� ��������.

 var arr = ['���', '������', '������', '���', '������', '������', '������'];

 console.log( anClean(arr) ); // '���,������,������' ��� '���,������,������'
 �� ������ ������ �������� ������ �������� ������ ���� �����, �� ����� �����.*/

var arrN = ['���', '������', '������', '���', '������', '������', '������'];

function anClean(arr) {
    //var n = arr.length; //��� ������ ������, ��������� �� ���� ����� ������� ������ ��� - ���� ��� - ����� ����� n
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
