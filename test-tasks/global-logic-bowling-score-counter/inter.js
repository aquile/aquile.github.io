/**
 * Created by aquile_bernadotte on 12.11.15.
 */
function Machine() {
    var enabled = false;

    this.enable = function () {
        enabled = true;
    };

    this.disable = function () {
        enabled = false;
    };
}

function CoffeeMachine(power) {
    Machine.call(this); // отнаследовать, в качестве контеста this передается  текущий обьект

    var waterAmount = 0;

    this.setWaterAmount = function (amount) {
        waterAmount = amount;
    };

}

var coffeeMachine = new CoffeeMachine(10000);

coffeeMachine.enable();
coffeeMachine.setWaterAmount(100);
coffeeMachine.disable();

//локальная переменная enabled не доступна из замыкания


// _eanbled - защищенное свойство


function Machine() {
    this._enabled = false; // вместо var enabled

    this.enable = function () {
        this._enabled = true;
    };

    this.disable = function () {
        this._enabled = false;
    };
}

function CoffeeMachine(power) {
    Machine.call(this);

    this.enable();

    alert(this._enabled); // true
}

var coffeeMachine = new CoffeeMachine(10000);


//у Machine есть свойство _power, перенесем его тоже в кофемашину

function Machine(power) {
    this._power = power; // (1)

    this._enabled = false;

}

function CoffeeMachine(power) {
    Machine.apply(this, arguments); // (2) вызываем Машине в текущем контексте с передачей всех аргументов

    alert(this._enabled); // false
    alert(this._power); // 10000
}

var coffeeMachine = new CoffeeMachine(10000);


function CoffeeMachine(power) {
    Machine.apply(this, arguments);

    var parentEnable = this.enable; // (1)
    this.enable = function () { // (2)
        parentEnable.call(this); // (3)
        this.run(); // (4)
    }

}
//Общая схема переопределения метода (по строкам выделенного фрагмента кода):
//
//Копируем доставшийся от родителя метод this.enable в переменную, например parentEnable.
//    Заменяем this.enable на свою функцию…
//…Которая по-прежнему реализует старый функционал через вызов parentEnable.
//…И в дополнение к нему делает что-то своё, например запускает приготовление кофе.


/*Для того, чтобы наследование работало, объект rabbit = new Rabbit должен использовать свойства и методы из своего прототипа Rabbit.prototype, а если их там нет, то — свойства и метода родителя, которые хранятся в Animal.prototype.

 Если ещё короче — порядок поиска свойств и методов должен быть таким: rabbit -> Rabbit.prototype -> Animal.prototype, по аналогии с тем, как это сделано для объектов и массивов.

 Для этого можно поставить ссылку __proto__ с Rabbit.prototype на Animal.prototype.

 Можно сделать это так:

 Rabbit.prototype.__proto__ = Animal.prototype;*/


// В терминологии ООП отделение и защита внутреннего интерфейса называется инкапсуляция.


function createCounter() {
    var numberOfCalls = 0;
    return function () {
        return ++numberOfCalls;
    }
}
var fn = createCounter();
fn(); //1
fn(); //2
fn(); //3

var fn = (function () {
    var numberOfCalls = 0;
    return function () {
        return ++numberOfCalls;
    }
})();

(function () {
})();


abc == undefined;	// true, если abc = undefined | null
abc === undefined;	// true - только если abc = undefined!

abc == false;	// true, если abc = false | 0 | '' | []
abc === false; // true, только если abc = false!


(function (a) {
    return a[a.length - 1];
})(filename.split("."))


console.log('hello'.repeatify(3));

// Должно получиться "hellohellohello".

String.prototype.repeatify = String.prototype.repeatify || function (times) {
        var str = '';

        for (var i = 0; i < times; i++) {
            str += this;
        }

        return str;
    };


//Структура наследования полностью:

// --------- Класс-Родитель ------------
// Конструктор родителя пишет свойства конкретного объекта
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

// Методы хранятся в прототипе
Animal.prototype.run = function () {
    alert(this.name + " бежит!")
};

// --------- Класс-потомок -----------
// Конструктор потомка
function Rabbit(name) {
    Animal.apply(this, arguments);
}

// Унаследовать
Rabbit.prototype = Object.create(Animal.prototype);

// Желательно и constructor сохранить
Rabbit.prototype.constructor = Rabbit;

// Методы потомка
Rabbit.prototype.run = function () {
    // Вызов метода родителя внутри своего
    Animal.prototype.run.apply(this);
    alert(this.name + " подпрыгивает!");
};

// Готово, можно создавать объекты
var rabbit = new Rabbit('Кроль');
rabbit.run();

$.get("http://hosted.where2getit.com/truevalue/rest/locatorsearch?20004", {
    "request": {
        "appkey": "41C97F66-D0FF-11DD-8143-EF6F37ABAA09",
        "formdata": {
            "geoip": "start",
            "dataview": "store_default",
            "limit": 40,
            "geolocs": {
                "geoloc": [{
                    "addressline": "Enter street address, city, state or zip code",
                    "country": "",
                    "latitude": "",
                    "longitude": ""
                }]
            },
            "searchradius": "40|50|80",
            "where": {
                "and": {
                    "giftcard": {"eq": ""},
                    "tvpaint": {"eq": ""},
                    "creditcard": {"eq": ""},
                    "localad": {"eq": ""},
                    "ja": {"eq": ""},
                    "tvr": {"eq": ""},
                    "activeshiptostore": {"eq": ""},
                    "tv": {"eq": "1"}
                }
            }
        },
        "geoip": 1
    }
})
    .done(function (data) {
        console.log("Data Loaded: " + data);
    });