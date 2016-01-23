// nice promice
fetch('/index.html')
.then(response => response.text())
.then(text => console.log(text))
.catch(err => console.log('error', err));


//promise with error
fetch('/index2.html')
.then(response => {
	if(response.status == 200) {
		response.text()
	} else {
		throw new Error('Invalid response');
	}
})
.then(text => console.log(text))
.catch(err => console.log('error', err));

// one more example
function doSum (...numbers){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			var sum = numbers.reduce((a,b) => a+b, 0);
			resolve(sum);
		}, 1000);
	});
}

doSum(1,2,3)
.then(sum => console.log('sum', sum))
.then(() => fetch('/index2.html'))
.then(response => new Promise((resolve, reject) => {
	console.log('wait for response')
	setTimeout(() => resolve(response), 5000);
}))
.then(response => {
	if(response.status == 200) {
		response.text()
	} else {
		throw new Error('Invalid response');
	}
})
.then(text => console.log(text))
.catch(err => console.log('error', err));


Promise.all([
doSum(1,2,3),
doSum(4,5),
doSum(6,3,7)
	]).then(result => console.dir(result))

Promise.race([
doSum(1,2,3),
doSum(4,5),
doSum(6,3,7)
	]).then(result => console.log(result))