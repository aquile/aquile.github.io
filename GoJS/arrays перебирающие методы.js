//Task1

var arr = ["Есть", "жизнь", "на", "Марсе"];

var arrLength = [];
for (var i = 0; i < arr.length; i++) {
    arrLength[i] = arr[i].length;
}

arr = arr.map(function (name) {
    return name.length;
});

console.log(arrLength); // 4,5,2,5

//Task2

var arra = [1, 2, 3, 4, 5];

function getSums(arr) {

    var result = [];

    var totalSum = arr.reduce(function (sum, currentitem) {
        result.push(sum);
        return sum + currentitem;
    });
    result.push(totalSum);

    return result;
}

console.log(getSums(arra));