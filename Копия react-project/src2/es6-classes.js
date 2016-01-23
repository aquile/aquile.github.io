// class Animal {

// 	constructor(){
// 		this.name = "Fucking Animal";
// 		this.speed = 10;
// 	}

// 	run(){
// 		console.log(this.name + ' runned ' + this.speed + ' km');
// 	}
// }

// const animal = new Animal();
// animal.run();

// class Dog extends Animal {
// 	constructor(){
// 		super(); // >>>>>   Animal.call(this); 
// 		this.name = 'Dog';
// 		this.speed = 30;
// 	}
// }


class Animal {

	constructor(name = "Huy", speed = 10){
		this.name = name;
		this.speed = speed;
	}

	run(){
		console.log(this.name + ' runned ' + this.speed + ' km');
	}
}

class Dog extends Animal {
	constructor(speed){
		super('Dog', speed); // >>>>>   Animal.call(this); 
	}
}

const dog = new Dog(400);
dog.run();