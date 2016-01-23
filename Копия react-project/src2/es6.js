var a = 10;
var a = 9; // it is OK

let b = 10; //only one time!!!

if (false) {
	var c = 100;
}

console.log(c); //  <-undefined
// not so ok as we wish

{
	let d = 10;
}

//console.log(d); // will be undefined

////////////////

let e = 5; 

{
	let e = 3;
	console.log(e); // 3
}

console.log(e); // 5

///////////////


(function(){
console.log("f =", f);
})();

var f = 20;

//////////////

// const

const PI = 3.14; // блочная видимость

// destruct!!!!!!!!!!!!!!!

// var user = {
// 	name: 'John',
// 	age: 40
// }

// var name = user.name;
// var age = user.age;


const User = {
	name: 'Jara',
	age: 27,
	weight: 48
}

const {
	name,
	age = 20, // будет дефолтное значение если нет

	...otherUserProps // получим сюда все что не 
	//соответствует нашим ключам >>> weight

 } = User; // будет вытаскивать и присваивать имена в соответсвии
// c ключами обьекта


// var arr = ['1', '2', 'barabolka'];
// var john = arr[0];
// var nik = arr[2];

const arr = ['poc', 'molodec', 'barabolka'];

const [john, ,nick = 10, ...otherItems] = arr;

function foo400(
{name, ...otherProps},
[,mary, ...otherItemssss],
...restArgs
){
	console.log('foo400');
	console.log('name = ' + name);
	console.log('otherProps = ' + JSON.stringify(otherProps));
}


foo400(User, arr)


function defaultTest (x, y = 10){
	return x + y;
}

console.log('defaultTest', defaultTest(5));


/////// стрелочные функции



