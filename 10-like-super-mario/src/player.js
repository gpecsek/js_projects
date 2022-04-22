export default class Player {
    constructor(gravity, canvasHeight) {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;
        this.height = 30;
        this.color = 'blue';
        this.gravity = gravity;
        this.canvasHeight = canvasHeight;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx) {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // Player's gravity
        if(this.position.y + this.height + this.velocity.y <= this.canvasHeight) {
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }

        this.draw(ctx);
    }

    moveLeft(keys) {
        keys.left.pressed = true;
    }

    moveRight(keys) {
        keys.right.pressed = true;
    }

    moveUp() {
        this.velocity.y -= 15;
    }

    moveDown() {

    }

    stop(direction, keys) {
        if(direction === "right") keys.right.pressed = false;
        if(direction === "left") keys.left.pressed = false;
    }
}