var accumulator = new Accumulator(1); // начальное значение 1
accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению
console.log(accumulator.value); // выведет текущее значение

function Accumulator(a) {
    this.value = a;

    this.read = function () {
        this.value += +prompt("number", 0);
    };
}