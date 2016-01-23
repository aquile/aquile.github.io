console.log("classes");

function Animal (){
	this.name = "Fucking animal";
}

Animal.prototype.run = function(){
	console.log(this.name + ' runned ' + this.speed + ' km');
};

// const animal = new Animal();
// animal.run();


function Dog(){
	Animal.call(this);
	this.name = 'Dog';
	this.speed = 30;
}

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function(){
	console.log("gav gav gav!");
}

var dog = new Dog();
dog.run();





