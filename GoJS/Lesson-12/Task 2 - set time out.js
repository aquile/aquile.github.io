var delay = function (fun, ms) {
    return function () {
        var args = arguments;
        setTimeout(function () {
            fn.apply(null, args);
        }, ms)
    };
};

var fn = function (first, surname) {
    return console.log(first + ' ' + surname);
};

var sayHelloDelayed = delay(fn, 2000);

sayHelloDelayed('Siroga', 'Kartosha');
