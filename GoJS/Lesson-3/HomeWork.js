//Task 1

do {
    var value = +prompt('Insert number over 100');
    if (!value) break;
} while (value < 100);

//Task 2

var n, i;
for (n = 1; n <= 10; n++) {
    for (i = 2; i < n; i++) {
        if (n % i === 0)  ;
        else
            console.log(n);
    }
}

var n = 10;
for (var j = 2; j <= n; j++) {
    if (j == 2 || j == 3) console.log(j);
    for (var i = 2; i < j; i++) {

        if (i % j === 0) break;
        else console.log(j);
    }
}

/*
function isPrime(n) {
    for (var m = 1; m <= n; m++) {
        var d;
        if (m == 1) // 1 - не простое число
            return false;

        for (d = 2; d < m; d++) {
            // если разделилось нацело, то составное
            if (m % d == 0)
                return false;
            else console.log(m);
        }

    }
}
console.log(isPrime(20));
*/


//Task 3

var i;
for (i = 1; i <= 100; i++) {
    if (i % 2 == 0) {
        console.log('Fizz');
    } else if (i % 3 == 0) {
        console.log('Bizz');
    } else console.log(i);
}

//Task 4
var i;
for (i = 1; i <= 100; i++) {
    if (i % 3 == 0 & i % 5 == 0) {
        console.log('FizzBuzz');
    } else console.log(i);
}
//Task 5

var n, sharp = '# # # #', empty = ' # # # #';
for (n = 1; n <= 4; n++) {
    {
        console.log(sharp);
        console.log(empty);
    }
}

//Task 6
function poh(x, n) {
    var a = x;
    for (var i = 1; i < n; i++) {
        x = a * x;
    }
    return x;
}

console.log(poh(3, 3));

/*
 function factorial(x) {

 if (x) {
 var a = x;
 return a * (x - 1);
 } else {
 return a;
 }
 }

 console.log(factorial(5));
 */


/*sum(5);
 var x;
 do (x * (x - 1))
 while (x != 0);*/


//Task factorial

function factorial(x) {
    for (i = 1; i < x; i++) {
        x = x * i;
    }
    return x;
}

console.log(factorial(5));


