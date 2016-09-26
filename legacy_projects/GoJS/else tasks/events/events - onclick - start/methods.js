var h1 = document.createElement('h1');

//Add text node to element
h1.insertAdjacentText('afterBegin', 'Hide me!');
h1.innerHTML = "Hide me 2";
h1.textContent = "Hide me 3";

console.log(h1);

//Add element to DOM
var body = document.body;
body.appendChild(h1);


var inputButton = document.createElement('input');
inputButton.setAttribute('type', "button");
inputButton.setAttribute('value', "press me");

body.appendChild(inputButton);

inputButton.onclick = function () {
    h1.classList.toggle('hidden');
};

//------------
var ul = document.createElement('ul');
ul.innerHTML = '<li>';

var liNodes = '';
for (var i = 1; i <= 5; i++) {
    liNodes += '<li>' + 'Line' + [i] + '</li>';
}
ul.innerHTML = liNodes;

var div

console.log(ul);