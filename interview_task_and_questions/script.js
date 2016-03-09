// function.prototype.bind(this, arg1, arg2 ...)

var x = 9;

var module = {
    x: 10,

    getX: function(){
        return this.x;
    }
};

module.getX(); // 10

var getX = module.getX;

getX(); // 9, тк в этом случае this ссылается на window - le где она была вызвана

var bindGetX = getX.bind(module);
bindGetX(); //10


/*
* call.bind
* */

var unboundSlice = Array.prototype.slice,
    slice = Function.prototype.call.bind(unboundSlice);

slice(argument);