//перебирает и возвращает елемент у которого id='link';

var $ = document.querySelector.bind(document);
document.querySelector('#link');
console.log($('#link').tagName);


//<div id="#container">
console.log($('#container').textContent); //'div txt'

$('#link').name = {};

$('#link').color = {name: 'pink'}; //добавило СВОЙСТВО

$('#link').hasAttribute('name');
$('#link').setAttribute('name', "Oleksandr"); //добавляет строчное свойство тегу в штмл
$('#link').removeAttribute('name');
console.log($('#link').getAttribute('href')); //"передаст только то, что указано в href" - желательно пользоваться
console.log($('#link').href); // 'передаст полный путь' - не желательно пользоваться

//как работать с атрибутом класс
//<div id="div" class="fruit"></div>
//получить класс
console.log($('#div').className); // return fruit

$('#div').classList.add('red')/.remove/.contains//return true/false    .toogle // переключает = добавляет и удаляет класс

//добавляем новый элемент через js

var div = document.createElement('div');
// Добавим содержимоев в div
div.innerHTML = '<span>Hello Seroga</span>';
document.querySelector('#container / .container').
document.body.appendChild(div);

//вставить перед другим элементом

document.body.insertBefore(div, document.querySelector('table'));

//вставить тестовую ноду в div
var div = document.createElement('div');
var text = document.createTextNode('hello mthfcr!');

div.appendChild(text);
document.body.appendChild(div);
