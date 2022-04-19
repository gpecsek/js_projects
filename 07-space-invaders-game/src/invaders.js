import InvaderProjectile from "./invaderProjectile.js";

export default class Invader {
    constructor(canvasWidth, canvasHeight, {position}) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        const img = new Image();
        img.src = './img/invader.png';
        
        img.onload = () => {
            const scale = 0.04;
            this.img = img;
            this.width = img.width * scale;
            this.height = img.height * scale;
            this.position = {
                x: position.x,
                y: position.y
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
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx, {velocity}) {
        if (this.img) {
            this.draw(ctx);
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }));
    }
}