import { detectCollisionBySide } from "./collisionDetection.js";

export default class Brick {
    constructor(game, position, color) {

        this.game = game;

        this.position = position;
        this.width = 80;
        this.height = 24;

        this.markedForDeletion = false;
        this.color = color;
    }

    update() {
        if(detectCollisionBySide(this.game.ball, this)=== 'top' || detectCollisionBySide(this.game.ball, this) === 'bottom') {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
            this.game.score += 10;
        }
        if(detectCollisionBySide(this.game.ball, this)=== 'left' || detectCollisionBySide(this.game.ball, this) === 'right') {
            this.game.ball.speed.x = -this.game.ball.speed.x;
            this.markedForDeletion = true;
            this.game.score += 10;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}