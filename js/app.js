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
  }

  update(x, y) {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(direction) {
    // a direction string is received from the 'keyup' event listener, the player
    // x and y values are changed based on that direction string
    switch(direction) {
      case 'up':
        this.y -= 85;
        break;
      case 'down':
        this.y += 85;
        break;
      case 'right':
        this.x += 100;
        break;
      case 'left':
        this.x -= 100;
        break;
    }
  }
}

// Now instantiate your objects.
const enemy1 = new Enemy(0, 60);
const enemy2 = new Enemy(0, 145);
const enemy3 = new Enemy(0, 230);
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [enemy1, enemy2, enemy3];
player = new Player();

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
