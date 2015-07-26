var salaries = {
    "Вася": 100,
    "Петя": 300,
    "Даша": 250
};

function sum(obj) {
    var amm = 0;
    var counter = 0;

    for (var key in obj) {
        counter++
    }

    if (counter == 0) {
        return 0;
    } else {
        return function () {
            for (var element in obj) {
                amm += obj[element];
            }
            return amm;
        }
    }
}

console.log(sum(salaries)());

console.log('test');