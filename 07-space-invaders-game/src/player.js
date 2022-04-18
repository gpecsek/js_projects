import Projectile from "./projectile.js";

export default class Player {
    constructor(canvasWidth, canvasHeight) {
        this.rotation = 0;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        const img = new Image();
        img.src = './img/spaceship2.png';
        
        img.onload = () => {
            const scale = 0.10;
            this.img = img;
            this.width = img.width * scale;
            this.height = img.height * scale;
            this.position = {
                x: this.canvasWidth / 2 - this.width / 2,
                y: this.canvasHeight - this.height - 10
            }
        }
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw(ctx) {
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);

        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
        ctx.restore();
    }

    update(ctx) {
        if (this.img) {
            this.draw(ctx);
            this.position.x += this.velocity.x;
            if(this.position.x < 0) this.position.x = 0;
            if(this.position.x > this.canvasWidth - this.width) this.position.x = this.canvasWidth - this.width;
        }
    }

    moveLeft() {
        this.velocity.x = -10;
        this.rotation = -0.15;
    }

    moveRight() {
        this.velocity.x = 10;
        this.rotation = 0.15;
    }

    stop() {
        this.velocity.x = 0;
        this.rotation = 0;
    }

    shoot(projectiles) {
        projectiles.push(new Projectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y
            },
            velocity: {
                x: 0,
                y: -8
            }
        }));
    }
}