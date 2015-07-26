/*
var name1 = 'Abe';
function greet_abe(name) {
    return 'Hello, ' + name + '!';
};
console.log(greet_abe(name1))
/!*
name = 'Ben';
var greet_ben = function() {
    return "Hello, " + name + '!';
};*!/
*/

function sum(a) {
    return function(b) {
        return a + b;
    }
}

console.log(sum(1)(2));