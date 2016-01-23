const arr = [1,2,3,4,5,6,7,8];


const filteredArr = arr.filter(value => value % 2 === 0);
console.log('filteredArr = ', filteredArr);

const mapedArr = arr.map((value, i) => value * i);
console.log('mapedArr = ', mapedArr);

const filtered = arr
						.filter(value => value % 2 === 0)
						.map((value, i) => value * i)
						//.map(value => value * 2)
						//.map(value => ({value: value}))
						//.map(obj => obj.value > 15 ? 'more then 14' : null);

console.dir(filtered);

const value = 10;
const obj = {value, name: "John"};


// does not lose this!!!

// var counter = {
// 	count: 0,
// 	startCount: function(){
// 		const intervalID = setInterval(function(){
// 			this.count++;

// 			console.log(this.count); /// will not work

// 			if(this.count > 10) {
// 				clearInterval(intervalID);
// 			}
// 		}, 1000)
// 	}
// };

// counter.startCount();

var counter = {
	count: 0,
	startCount: function(){
		const intervalID = setInterval(() => {
			this.count++;

			console.log(this.count); /// will not work

			if(this.count > 3) {
				clearInterval(intervalID);
			}
		}, 1000)
	}
};

counter.startCount();


//////////////// spred for objects

const baseHuman = {
	age: 20,
	hairColor: "black",
	height: 180
};

const baseHuman2 = {
	age: 40,
	hairColor: "red",
	height: 175
};

const isbaseHuman = true;

const john = {
	...baseHuman,
	...isbaseHuman && baseHuman2,
	name: "John",
	age: 23
}

console.dir(john);

///////////  array spred


const arr2 = [1,2,3,4,5,6,7,8];

const arrConcated = [,0,0,0, ...arr2, 0,0,0,0, ...arr];

console.dir(arrConcated);


