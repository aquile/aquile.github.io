function Switcher() {
    this._status = false;

    this.enable = function setSwitcherOn() {
        this._status = true;
        return this;
    };

    this.disable = function setSwitcherOff() {
        this._status = false;
        return this;
    };
}

function CoffeeMachine(power) {
    Switcher.apply(this, arguments);

    var timerId;

    var parentDisable = this.disable;
    this.disable = function() {
        parentDisable.call(this);
        clearTimeout(timerId);
    };

    function coffeeIsReady() {
        return console.log('Coffee is ready!')
    }

    this.run = function () {
        if (!this._status) {
            throw new Error('Coffeemachine is off!')
        } else timerId = setTimeout(coffeeIsReady, 1000)
    };

    this._power = power;
}

var philips10000 = new CoffeeMachine(10000);

//philips10000.run(); // ошибка, кофеварка выключена!


philips10000.enable();
philips10000.run(); // ...Кофе готов!
philips10000.disable();