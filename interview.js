/**
 * Created by aquile_bernadotte on 23.02.16.
 */

function memorizeFn(key) {
    if (memorizeFn[key]) {
        console.log('propery exists: key - ' + key + " : value - " + memorizeFn[key]);
        return key;
    } else {
        var result = key * key;
        memorizeFn[key] = result;
        return result;
    }
}

console.log(memorizeFn(2));
console.log(memorizeFn(3));
console.log(memorizeFn(4));
console.log(memorizeFn(2));
console.log(memorizeFn(3));

//Question 1: Scope

(function () {
    var a = b = 5;
})();

console.log(b); //5 => window

(function () {
    'use strict';
    var a = window.b = 5;
})();

console.log(b); // 5 too

//Question 2: Create “native” methods

String.prototype.repeatify = String.prototype.repeatify || function (times) {
        var str = '';

        for (var i = 0; i < times; i++) {
            str += this;
        }

        return str;
    };

console.log('hello'.repeatify(3));

//Question 3: Hoisting

function test() {
    console.log(a);
    console.log(foo());

    var a = 1;

    function foo() {
        return 2;
    }
}

test();

//Question 4: How this works in JavaScript

var fullname = 'John Doe';
var obj = {
    fullname: 'Colin Ihrig',
    prop: {
        fullname: 'Aurelio De Rosa',
        getFullname: function () {
            return this.fullname;
        }
    }
};

console.log(obj.prop.getFullname()); //invoked as part of obj => this == obj //'Aurelio De Rosa'

var test = obj.prop.getFullname; //invoked in window context => this == window //'John Doe'

console.log(test());

//Question 5: call() and apply()
console.log(test.call(obj.prop)); //'Aurelio De Rosa' instead of 'John Doe'


//Question 1: Closures

var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
    nodes[i].addEventListener('click', function () {
        console.log('You clicked element #' + i);
    });
}

//fixing
var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
    nodes[i].addEventListener('click', (function(i) {
        return function() {
            console.log('You clicked element #' + i);
        }
    })(i));
}

//fixing2
function handlerWrapper(i) {
    return function() {
        console.log('You clicked element #' + i);
    }
}

var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
    nodes[i].addEventListener('click', handlerWrapper(i));
}


