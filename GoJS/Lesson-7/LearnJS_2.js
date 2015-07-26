function makeBuffer() {
    var obj = '';


    var fn = function (value) {
        if (value) {
            obj += value;
            return obj;
        }
        return obj;
    };
    fn.clear = function () {
        obj = '8';
        return obj;
    };

    return fn;
}

var buffer = makeBuffer();

// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');


buffer.clear();
// получить текущее значение
console.log(buffer());
// Замыкания Использовать Нужно!