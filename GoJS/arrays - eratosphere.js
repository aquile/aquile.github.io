var arr = [undefined, undefined];
for (var i = 2; i <= 100; i++) {
    arr[i] = i;
}

for (var j = 2; j <= 100; j++) {
    arr[2*j] = arr[3*j] = arr[5*j] = arr[7*j] = undefined;
}

var primeNumbersArr = [];

for (var element in arr) {
    if(arr[element] !== undefined) primeNumbersArr.push(arr[element]);
}

console.log(primeNumbersArr);