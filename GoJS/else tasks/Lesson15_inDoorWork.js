function NameMe(first, last) {
    this.firstName = first;
    this.lastName = last;
    this.name = this.firstName + ' ' + this.lastName;
    //return this.name;
}

var n = new NameMe('John', 'Doe');
console.log(n.firstName); //Expected: John
console.log(n.lastName); //Expected: Doe
console.log(n.name); //Expected: John Doe


Array.prototype.reverse = function () {
    var result = [];
    for (var i = this.length - 1; i >= 0; i--) {
        result.push(this[i]);
    }
    this.length = 0;
    for (var i = 0; i < result.length; i++) {
        this.push(result[i])
    }
    return this;
};

var input = [1, 2, 3, 4];
console.log(input.reverse());
console.log(input);

var input = ['a', 'b', 'c'];
console.log(input.reverse());
console.log(input);


var Ghost = function () {
    var a = ["white", "yellow", "purple", "red"];
    this.color = a[Math.floor(Math.random() * 4)];
};

ghost = new Ghost();
console.log(ghost.color); //=> "white" or "yellow" or "purple" or "red"


var obj, i;
var Singleton = function () {
    if (i == 0) {
        obj = new Object();
        i++;
    }

    return obj;
};

var obj1 = new Singleton();
var obj2 = new Singleton();
console.log(obj1 === obj2); // => true
obj1.test = 1;
obj2.test; // => 1
