var Furry = require('./furry.js');
var Coin = require('./coin.js');

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
