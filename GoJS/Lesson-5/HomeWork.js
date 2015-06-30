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
var object = {};

function summaryOfObjElem(objectInFunction) {
    var objectInFunction = {};

    do {
        var number = +prompt('Type any number');

        for (var i = 0; ; i++) {

            var sum = 0;
            objectInFunction[i] = number;
            sum = sum + number;
        }
    } while (number);

    return console.log(sum);
}

summaryOfObjElem(object);