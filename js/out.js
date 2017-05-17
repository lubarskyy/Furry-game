/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(3);
var Coin = __webpack_require__(2);

function Game(){
  this.board = document.querySelectorAll('.board div');
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;
  this.index = function(x, y){
    return x + (y * 10);
  }
  this.showFurry = function(){
    if(document.querySelector('.furry') != null){
      this.hideVisibleFurry();
    }
    this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
  }
  this.showCoin = function(){
    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
  }
  var self = this;
  this.startGame = function(){
    this.idSetInterval = setInterval(function(){
      self.moveFurry()}, 250);
  }
  this.pauseGame = function(){
    clearInterval(this.idSetInterval);
  }
  document.querySelector('.score button').addEventListener('click', function(){
    clearInterval(this.idSetInterval);
  })
  this.moveFurry = function(){
    if(this.furry.direction === "right"){
      this.furry.x += 1;
    } else if (this.furry.direction === "left"){
      this.furry.x -=1;
    } else if (this.furry.direction === "up"){
      this.furry.y -= 1;
    } else if (this.furry.direction === "down"){
      this.furry.y += 1;
    }
    this.gameOver();
    this.showFurry();
    this.checkCoinCollision();
  }
  this.hideVisibleFurry = function(){
    document.querySelector('.furry').classList.remove('furry');
  }
  this.changeDirection = function(event){
    if(event.which == 37){
      this.furry.direction = 'left';
    } else if (event.which == 39){
      this.furry.direction = 'right';
    } else if (event.which == 38){
      this.furry.direction = 'up';
    } else if (event.which == 40){
      this.furry.direction = 'down';
    }
  }
  document.addEventListener('keydown', function(event){
    self.changeDirection(event);
  });
  this.checkCoinCollision = function(){
    if(this.furry.x == this.coin.x && this.furry.y == this.coin.y){
      document.querySelector('.coin').classList.remove('coin');
      this.score++
      document.querySelector('.score strong').innerText = this.score;
      this.coin = new Coin();
      this.showCoin();
    }
  }
  this.gameOver = function(){
    if(this.furry.x < 0 || this.furry.x > 9) {
      document.querySelector('.over').classList.remove('invisible');
      document.querySelector('p span').innerText = this.score;
      return clearInterval(this.idSetInterval);
    } else if (this.furry.y < 0 || this.furry.y > 9){
      document.querySelector('.over').classList.remove('invisible');
      document.querySelector('p span').innerText = this.score;
      return clearInterval(this.idSetInterval);
    }
  }
}
module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(0);

document.querySelector('.start button').addEventListener('click', function(){
  var play = new Game();
  play.showFurry();
  play.showCoin();
  play.startGame();

  document.querySelector('.start').classList.add('invisible');
});

document.querySelector('.over button').addEventListener('click', function(){
  document.querySelector('.score strong').innerText = 0;
  document.querySelector('.coin').classList.remove('coin');

  var play = new Game();
  play.showFurry();
  play.showCoin();
  play.startGame();

  document.querySelector('.over').classList.add('invisible');
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Coin(){
  this.x = Math.floor(Math.random() * 9);
  this.y = Math.floor(Math.random() * 9);
}
module.exports = Coin;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Furry(){
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}
module.exports = Furry;


/***/ })
/******/ ]);