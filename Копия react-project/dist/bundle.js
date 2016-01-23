/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _helloButton = __webpack_require__(1);
	
	var _helloButton2 = _interopRequireDefault(_helloButton);
	
	__webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log('App started');
	// import './es6';
	// import './es6-2';
	// import './es6-promisses';
	
	(0, _helloButton2.default)();
	console.log('Button created');
	
	console.log("hello");

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var button = document.createElement('button');
		button.textContent = "Click me";
		button.onclick = function () {
			alert('hello bitches!');
		};
		document.body.appendChild(button);
	};

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var Animal = function () {
		function Animal() {
			var name = arguments.length <= 0 || arguments[0] === undefined ? "Huy" : arguments[0];
			var speed = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];
	
			_classCallCheck(this, Animal);
	
			this.name = name;
			this.speed = speed;
		}
	
		_createClass(Animal, [{
			key: 'run',
			value: function run() {
				console.log(this.name + ' runned ' + this.speed + ' km');
			}
		}]);
	
		return Animal;
	}();
	
	var Dog = function (_Animal) {
		_inherits(Dog, _Animal);
	
		function Dog(speed) {
			_classCallCheck(this, Dog);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Dog).call(this, 'Dog', speed)); // >>>>>   Animal.call(this);
		}
	
		return Dog;
	}(Animal);
	
	var dog = new Dog(400);
	dog.run();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map