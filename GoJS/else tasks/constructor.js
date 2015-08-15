var calculator = new Calculator();
calculator.read();

console.log("Сумма=" + calculator.sum());
console.log("Произведение=" + calculator.mul());

function Calculator() {

    var obj = {};

    this.read = function () {

        obj.a = prompt('1');
        obj.b = prompt('2');

        return obj;
    };
    this.sum = function () {
        return +obj.a + +obj.b;
    };
    this.mul = function() {
        return obj.a * obj.b;
    }

}