//Task 1
var goods = [1, 1, 23, 98];
goods.push('computer');
var a = goods.length - 1;
console.log(goods[a]);

//Task 2
var style = [];
style[0] = 'jazz';
style[1] = 'bluse';
style.push('rockNroll');
var a = style.length - 2;
style[a] = 'classic';
console.log(style.shift());
style.unshift('rap', 'reggi');
console.log(style);

//Task 3
var arr = ["apple", "orange", "pearl", "lemon"];
var min, max;
min = 0;
max = arr.length;
var rand = Math.floor(Math.random() * (max - min));
console.log(arr[rand]);

//Task4
var arrCalc = [];

while (true) {
    var a = prompt('insert number');
    if (!a) {
        break;
    } else {
        arrCalc.push(+a);
    }
}
var result = 0;
for (var i = 0; i < arrCalc.length; i++) {
result += arrCalc[i];
}

console.log(arrCalc);
console.log(result);