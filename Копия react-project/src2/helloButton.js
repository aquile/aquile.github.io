module.exports = function(){
	var button = document.createElement('button');
	button.textContent = "Click me";
	button.onclick = function(){
		alert('hello bitches!')
	};
	document.body.appendChild(button);
}