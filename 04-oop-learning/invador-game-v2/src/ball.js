import { detectCollision, detectCollisionBySide } from "./collisionDetection.js";

export default class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.size = 10;
        this.reset();
    }

    reset() {
        this.position = {x:10, y:250};
        this.speed = { x: 4, y: -2};
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Wall on left and right
        if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        // Wall on top
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        // Wall on bottom
        if (this.position.y > this.gameHeight - this.size) {
            this.speed.y = -this.speed.y;
            this.game.lives--;
            this.reset();
        }

        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}