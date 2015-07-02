//Task1
var tasksCompleted = {
    'Anna': 29,
    'Serg': 35,
    'Elena': 1,
    'Anton': 99,
    'Sergey': 10,
    'Ann': 13
};

function maxInObj(obj) {
    var max = 0;
    var key;
    for (var title in obj) {
        var nameOfEmpl;
        if (obj[title] > max) {
            max = obj[title];
            key = title;
        }
    }
    return (key + ': ' + max);
}

console.log(maxInObj(tasksCompleted));

//Task2

// Before
var image = {
    width: 100,
    height: 400,
    title: 'Cool image'
};


function multiplyX2(obj2) {
    var title2;
    for (title2 in obj2) {
        if (obj2[title2] > 0) {
            obj2[title2] = obj2[title2] * 2;
        }
    }
    return obj2;
}

console.log(multiplyX2(image));


//Task3


function summaryOfObjElem() {
    var numbers = [];

    do {
        var n = +prompt('Type any number');

        numbers.push(n);

    } while (n);

/*    Этой функции он передаёт три параметра callback(item, i, arr):

    item — очередной элемент массива.
        i — его номер.
        arr — массив, который перебирается.*/

var sum = 0;
    numbers.forEach(function(item) {

     sum = sum + item;
    });

    return sum;
}

console.log(summaryOfObjElem());
