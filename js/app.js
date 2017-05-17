var Game = require('./game.js');

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
