// Define the variables
var BLOCK_WIDTH = 101,
    BLOCK_HEIGHT = 83,
    totalScore = 0,
    character = 0,
    playerStartX = 2 * BLOCK_WIDTH,
    playerStartY = 5 * BLOCK_HEIGHT - 20;

//Define which character to select from the very first page
var Selector = function() {
    this.sprite = 'images/Selector.png';
    this.x = 0;
    this.y = 220;
};

//for selector, only allow the left arrow, the right arrow and the enter key
var selectorEventListener = function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        39: 'right'
    };

    selector.handleInput(allowedKeys[e.keyCode]);
};

// For Rendering the selector image.
Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// For Handle the keyboard input for character selector.
Selector.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x < BLOCK_WIDTH) {
                this.x = this.x;
            } else {
                this.x = this.x - BLOCK_WIDTH;
            }
            break;
        case 'right':
            if (this.x > 3 * BLOCK_WIDTH) {
                this.x = this.x;
            } else {
                this.x = this.x + BLOCK_WIDTH;
            }
            break;
        case 'enter':
            character = Math.floor(this.x / BLOCK_WIDTH) + 1;
            document.removeEventListener('keyup', selectorEventListener);
            document.addEventListener('keyup', playerEventListener);
            player = new Player();
            break;
    }
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xPosition = [-100, 600];
    this.yPosition = [63, 146, 229];
    this.speedRange = [100, 600];

    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var maxPosition = this.xPosition[1];
    this.x += this.speed * dt;
    if (this.x > maxPosition) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = this.xPosition[0];
    this.y = this.RandomYPosition();
    this.speed = this.RandomXSpeed();
};

Enemy.prototype.RandomYPosition = function() {
    return this.yPosition[Math.floor(Math.random() * 3)];
};

Enemy.prototype.RandomXSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = playerStartX;
    this.y = playerStartY;
};

//for player, allow the left arrow, the right arrow, the up arrow, the down arrow and the enter key
var playerEventListener = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};

Player.prototype.update = function() {
    switch (character) {
        case 1:
            this.sprite = 'images/char-boy.png';
            break;
        case 2:
            this.sprite = 'images/char-cat-girl.png';
            break;
        case 3:
            this.sprite = 'images/char-horn-girl.png';
            break;
        case 4:
            this.sprite = 'images/char-pink-girl.png';
            break;
        case 5:
            this.sprite = 'images/char-princess-girl.png';
            break;
        default:
            this.sprite = 'images/char-boy.png';
            break;
    }
    if (this.y < BLOCK_HEIGHT - 20) {
        this.x = playerStartX;
        this.y = playerStartY;
        totalScore += 1;
    } else if (this.checkCollisions()) {
        this.x = playerStartX;
        this.y = playerStartY;
        totalScore -= 1;
    }
};

Player.prototype.checkCollisions = function() {
    if (this.y >= 63 && this.y <= 229) {
        // player is on road rows, check collisions
        // loop through each bug
        var playerX = this.x,
            playerY = this.y,
            collided = false;

        allEnemies.forEach(function(enemy) {
            // is the bug on the same row as the player?
            if (Math.abs(enemy.y - playerY) < 20) {
                // is the bug on the player?
                if (Math.abs(enemy.x - playerX) < 30) {
                    collided = true;
                }
            }
        });

        return collided;
    }
};

//for rendering the character
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// For Handle the keyboard input for player.
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x < BLOCK_WIDTH) {
                this.x = this.x;
            } else {
                this.x = this.x - BLOCK_WIDTH;
            }
            break;
        case 'up':
            if (this.y < BLOCK_HEIGHT - 20) {
                this.y = this.y;
            } else {
                this.y = this.y - BLOCK_HEIGHT;
            }
            break;
        case 'right':
            if (this.x > BLOCK_WIDTH * 3) {
                this.x = this.x;
            } else {
                this.x = this.x + BLOCK_WIDTH;
            }
            break;
        case 'down':
            if (this.y > BLOCK_HEIGHT * 4) {
                this.y = this.y;
            } else {
                this.y = this.y + BLOCK_HEIGHT;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug1, bug2, bug3];
var player = new Player();
var selector = new Selector();

// This listens for key presses and sends the keys to your
// Selector.handleInput() method.
document.addEventListener('keyup', selectorEventListener);