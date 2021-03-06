"use strict";

// Parent class for both Player and Enemy
class Character {
  constructor(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid
class Enemy extends Character {
  constructor(sprite, x, y, speed) {
    super(sprite, x, y);
    this.speed = this.calculateSpeed();
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    // Once an ememy leaves the canvas, re-render enemy at start position with
    // different speed
    if (this.x > 600) {
      this.x = 0;
      this.speed = this.calculateSpeed();
    }
  }

  calculateSpeed() {
    return Math.floor(Math.random() * 400) + 100  //random number code from https://www.w3schools.com/js/js_random.asp
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
  constructor(sprite, x, y) {
    super(sprite, x, y);
    this.lives = 3;
    this.score = 0;
  }

  update() {
    // If the player is in the same row as an enemy start detecting for
    // collisions
    if (this.y === 230 || this.y === 145 || this.y === 60) {
      this.detectCollisions(this.x, this.y)
    // if the player makes it to the last row, they win
    } else if (this.y === -25) {
      this.playerWins();
    }
  }

  detectCollisions(playerX, playerY) {
    // Compare players x value with the enemies x values, if the difference
    // between them reaches less than 60 pixels, then a collision has occurred
    // find array helper - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    let enemyInCurrentLane = allEnemies.find(enemy => enemy.y === playerY);
    if (playerX - enemyInCurrentLane.x <= 60 && playerX - enemyInCurrentLane.x >= 0) {
      // Deduct one from current lives and update DOM
      this.lives -= 1;
      updateHearts(this.lives);
      // If lives reaches 0 then the game is over
      if (this.lives === 0) {
        this.resetPlayer();
        gameOver();
      } else {
      // If lives remain, put player back to start position
        this.resetPlayer();
      }
    }
  }

  playerWins() {
    // Increase current score by 1, update DOM, and put player back at start
    this.score += 1;
    scoreText.textContent = this.score;
    this.resetPlayer();
  }

  resetPlayer() {
    // Put player back at start position
    this.x = 200;
    this.y = 400;
  }

  changeSprite(charImg) {
    // Get path for the player's current sprite
    let currentSpritePath = player.sprite
    // The path for the new sprite
    let newSpritePath = charImg.attributes.src.nodeValue
    let allImgItems = document.querySelectorAll('li');
    // Loop through all of the sprite images and remove the 'chosen' CSS class
    allImgItems.forEach(img => img.classList.remove('chosen'));
    // Change the player's sprite to the new one
    player.sprite = newSpritePath;
    // Add the 'chosen' CSS class to the new sprite
    charImg.parentElement.classList.add('chosen');
  }

  handleInput(direction) {
    // a direction string is received from the 'keyup' event listener, the player
    // x and y values are changed based on that direction string
    // logic to keep player within bounds of visible canvas
    if (this.y < 400 && direction === 'down') {
      this.y += 85;
    } else if (this.y > -25 && direction === 'up') {
      this.y -= 85;
    } else if (this.x < 400 && direction === 'right') {
      this.x += 100;
    } else if (this.x > 0 && direction === 'left') {
      this.x -= 100;
    }
  }
}

// Now instantiate your objects.

let generateEnemies;
(generateEnemies = (num) => {
  let enemiesArr = [];
  for (let i = 0; i < num; i++) { //idea from Udacity reviewer
    let enemy = new Enemy('images/enemy-bug.png', -300, (60 + i * 85));
    enemiesArr.push(enemy);
  }
  return enemiesArr;
})();

// Place all enemy objects in an array called allEnemies
const allEnemies = generateEnemies(3);

// Place the player object in a variable called player
const player = new Player('images/char-boy.png', 200, 400);

const scoreText = document.querySelector('.num-score');
const modal = document.querySelector('.modal');
const playAgainBtn = document.querySelector('.play-again-btn');
const charList = document.querySelector('.char-list');

const resetGame = () => {
  // Resets the game back to start settings
  player.lives = 3;
  player.score = 0;
  player.resetPlayer();
  resetStats();
}

const resetStats = () => {
  // Resets the number of lives and the score
  scoreText.innerText = 0;
  updateHearts();
}

// IIFE to populate and update heart images
let updateHearts;
(updateHearts = (lives = 3) => {
  const livesText = document.querySelector('.num-lives');
  livesText.innerHTML = "";
  const heartHTML = '<img src="images/Heart.png" alt="Heart icon"></img>'
  for (let i = lives; i > 0; i--) {
    livesText.innerHTML += heartHTML;
  }
})();

const gameOver = () => {
  // When the game is over show the modal including the final score
  const finalScore = document.querySelector('.num-score-final');
  modal.classList.toggle('hidden');
  modal.classList.toggle('bounceIn');
  finalScore.innerText = player.score;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Event listener for 'Play Again?' button
playAgainBtn.addEventListener('click', function(e) {
  modal.classList.toggle('bounceIn');
  modal.classList.toggle('hidden');
  resetGame();
})

// Event listener to select a new player sprite
charList.addEventListener('click', function(e) {
  if (e.target.nodeName === 'IMG') {
    player.changeSprite(e.target);
  }
})
