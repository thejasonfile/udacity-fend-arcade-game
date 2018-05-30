// Enemies our player must avoid
class Enemy {
  constructor(x = 0, y = 0, speed = 100) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
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

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  calculateSpeed() {
    return Math.floor(Math.random() * 400) + 100  //random number code from https://www.w3schools.com/js/js_random.asp
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x = 200, y = 400) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
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
<<<<<<< HEAD
    // Compare players x value with the enemies x values, if the difference
    // between them reaches less than 60 pixels, then a collision has occurred
    // find array helper - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
||||||| merged common ancestors
=======
    // Compare players x value with the enemies x values, if the difference
    // between them reaches less than 60 pixels, then a collision has occurred
>>>>>>> 7136ef60786288b9da1dba848ab266702bc5f410
    let enemyInCurrentLane = allEnemies.find(enemy => enemy.y === playerY);
    if (playerX - enemyInCurrentLane.x <= 60 && playerX - enemyInCurrentLane.x >= 0) {
      // Deduct one from current lives and update DOM
      this.lives -= 1;
      livesText.textContent = this.lives;
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

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
const enemy1 = new Enemy(0, 60);
const enemy2 = new Enemy(0, 145);
const enemy3 = new Enemy(0, 230);
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player();

const scoreText = document.querySelector('.num-score');
const livesText = document.querySelector('.num-lives');
const modal = document.querySelector('.modal');
const playAgainBtn = document.querySelector('.play-again-btn');
const charList = document.querySelector('.char-list');

resetGame = () => {
  // Resets the game back to start settings
  player.lives = 3;
  player.score = 0;
  player.resetPlayer();
  resetStats();
}

resetStats = () => {
  // Resets the number of lives and the score
  scoreText.innerText = 0;
  livesText.innerText = 3;
}

gameOver = () => {
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
