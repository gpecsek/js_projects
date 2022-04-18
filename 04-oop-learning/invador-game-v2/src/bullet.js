export default class Bullet {
    constructor(game) {
        this.height = 15;
        this.width = 5;
        this.game = game;

        this.speed = 0;
        this.maxSpeed = 2;

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.position = {
            x: game.paddle.position.x + game.paddle.width / 2,
            y: game.paddle.position.y - this.height
        }

        this.markedBulletForDeletion = false;
    }

    update(deltaTime) {
        this.position.y += -this.maxSpeed;
    }

    draw(ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}