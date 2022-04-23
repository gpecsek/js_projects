export default class Player {
    constructor(gravity, canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = 30;
        this.height = 30;

        this.position = {
            x: this.canvasWidth / 2 - this.width / 2,
            y: this.canvasHeight - 250
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.color = 'blue';
        this.gravity = gravity;
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

    moveUp(keys) {
        keys.jump.pressed = true;
    }

    moveDown() {

    }

    stop(direction, keys) {
        if(direction === "right") keys.right.pressed = false;
        if(direction === "left") keys.left.pressed = false;
    }
}