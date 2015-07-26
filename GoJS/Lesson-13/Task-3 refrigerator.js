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
    this.disable = function () {
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

//philips10000.run(); // ������, ��������� ���������!


philips10000.enable();
philips10000.run(); // ...���� �����!
philips10000.disable();

function Fridge(power) {
    Switcher.apply(this, arguments);

    this._power = power;

    var food = [];

    this.addFood = function () {
        if (this._status) {
            if (food.length < this._power / 100) {
                for (var i = 0; i < arguments.length; i++) {
                    food.push(arguments[i]);
                }
            } else throw Error('Fridge is full of meal')
        } else throw Error('Fridge is off')
    };

    this.getFood = function () {
        return food.slice();
    };

    this.removeFood = function (item) {
        for(var key in food) {
            for(var i = 0; i < food.length; i++) {

            }
        }
        return food;
    }
}

var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("котлета");
fridge.addFood("сок", "варенье");

var fridgeFood = fridge.getFood();
console.log( fridgeFood ); // котлета, сок, варенье

// добавление элементов не влияет на еду в холодильнике
fridgeFood.push("вилка", "ложка");

console.log( fridge.getFood() ); // внутри по-прежнему: котлета, сок, варенье

fridge.removeFood();
