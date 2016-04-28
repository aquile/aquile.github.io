var sum = function sum(a, b) {
    return a + b;
};
var sayHello = function (str) {
    console.log(str);
};
function makeLogger(fn) {
    return function () {
        console.log([].join.apply(arguments) + ' = ' + fn.apply(this, arguments));
    }
}

sum = function makeLogger(sum);
sayHello = makeLogger(sayHello);

sum(10, 20);
sayHello('Sergey');
sayHello('Sidko');
sum(50, 60);
