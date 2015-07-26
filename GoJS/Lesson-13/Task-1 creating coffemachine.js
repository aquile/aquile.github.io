function CoffeeMachine(power) {
    var powerVt = power;
    var _status = false;

    this.enable = function setSwitcherOn() {
        _status = true;
        return this;
    };

    this.disable = function setSwitcherOff() {
        _status = true;
        return this;
    };

    this.run = function() {
        if(_status) {
            return console.log('Coffee is ready!')
        } else {
            throw new Error('Coffeemachine is off!')
        }
    }
}


var philips10000 = new CoffeeMachine(10000);
//philips10000.run(); // ошибка, кофеварка выключена!


philips10000.enable();
philips10000.run(); // ...Кофе готов!
