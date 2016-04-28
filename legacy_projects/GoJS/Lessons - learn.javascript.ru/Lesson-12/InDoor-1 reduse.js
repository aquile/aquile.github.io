var arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(arr.reduce(function(result, element) {
    if (element % 2 == 0) {
        result *= element;
    }
    return result;
}, 1));

