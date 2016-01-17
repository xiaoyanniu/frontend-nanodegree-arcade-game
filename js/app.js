//Define which character to select from the very first page
var blockWidth = 101,
    blockHeight = 83,
    totalScore = 0,
    character = 0;

var Selector = function() {
    this.sprite = 'images/Selector.png';
    this.x = 0;
    this.y = 220;
};

var selectorEventListener = function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        39: 'right'
    };

    selector.handleInput(allowedKeys[e.keyCode]);
};

var playerEventListener = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};

// For Rendering the selector image.
Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// For Handle the keyboard input for character selector.
Selector.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x < blockWidth) {
                this.x = this.x;
            } else {
                this.x = this.x - blockWidth;
            }
            break;
        case 'right':
            if (this.x > 3 * blockWidth) {
                this.x = this.x;
            } else {
                this.x = this.x + blockWidth;
            }
            break;
        case 'enter':
            character = Math.floor(this.x / blockWidth) + 1;
            document.addEventListener('keyup', playerEventListener);
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
    this.yPosition = [60, 140, 220];
    this.speed = [100, 600];

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
    var startPosition = this.xPosition[0];

    this.x = startPosition;
    this.y = this.RandomYPosition();
    this.speed = this.RandomYSpeed();
};

Enemy.prototype.RandomYPosition = function() {
    return this.yPosition[Math.floor(Math.random() * 3)];
};

Enemy.prototype.RandomYSpeed = function() {
    var minSpeed = this.speed[0],
        maxSpeed = this.speed[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var playerStartX = 2 * blockWidth,
    playerStartY = 5 * blockHeight - 20;

var Player = function() {
    this.sprite = '';
    this.x = playerStartX;
    this.y = playerStartY;
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
    if (this.y < blockHeight-20) {
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
    if (this.y >= 60 && this.y <= 220) {
        // player is on road rows, check collisions
        // loop through each bug
        allEnemies.forEach(function(enemy) {
            // is the bug on the same row as the player?
            if (enemy.y == self.y) {
                // is the bug on the player?
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    return true;
                }
            }
        });
    }
};

//for rendering the character
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x < blockWidth) {
                this.x = this.x;
            } else {
                this.x = this.x - blockWidth;
            }
            break;
        case 'up':
            if (this.y < blockHeight - 20) {
                this.y = this.y;
            } else {
                this.y = this.y - blockHeight;
            }
            break;
        case 'right':
            if (this.x > blockWidth * 3) {
                this.x = this.x;
            } else {
                this.x = this.x + blockWidth;
            }
            break;
        case 'down':
            if (this.y > blockHeight * 4) {
                this.y = this.y;
            } else {
                this.y = this.y + blockHeight;
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
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', selectorEventListener);

