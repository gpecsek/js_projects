export default class Paddle {
    constructor(game) {
        this.width = 100;
        this.height = 15;
        this.gameWidth = game.gameWidth;
        // this.gameHeight = gameHeight;

        this.maxSpeed = {x:7, y:0};
        this.speed = {x:0, y:0};

        // this.maxSpeedY = 7;
        // this.speedY = 0;

        this.position = {
            x: game.gameWidth / 2 - this.width /2,
            y: game.gameHeight - this.height - 1
        }
    }

    moveLeft() {
        this.speed.x = -this.maxSpeed.x;
    }

    moveRight() {
        this.speed.x = this.maxSpeed.x;
    }
    // Moving the paddle UP and DOWN
    /*
    moveUp() {
        this.speed.y = -this.maxSpeed.y;
    }

    moveDown() {
        this.speed.y = this.maxSpeed.y;
    }
    */

    stop() {
        this.speed.x = 0;
        // this.speed.y = 0;
    } 

    draw(ctx) {
        ctx.fillStyle= '#000';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // deltaTime sometimes just dt
    update(deltaTime) {
        this.position.x += this.speed.x;
        // this.position.y += this.speed.y;

        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x > this.gameWidth - this.width) this.position.x = this.gameWidth - this.width;

        // if(this.position.y < 0) this.position.y = 0;
        // if(this.position.y > this.gameHeight - this.height) this.position.y = this.gameHeight - this.height;
    }
}