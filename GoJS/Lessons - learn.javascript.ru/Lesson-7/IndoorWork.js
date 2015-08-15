(function identity(x) {
    return x;
})(3);
//
(function add(x, y) {
    return x + y;
})(3, 4);
//
(function mull(x, y) {
    return x * y;
})(3, 4);
//
var idf = identity(3);

function identity(x) {
    return function() {
        return x;
    }
}

console.log(idf());
//
var idf2 = addf(3)(4);

function addf(x) {
    return function(y) {
        return x + y;
    }
}

console.log(idf2);