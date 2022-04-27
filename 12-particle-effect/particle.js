export default class Particle {
    constructor(mouseX, mouseY, canvasWidth, canvasHeight) {
        this.position = {
            x: mouseX,
            y: mouseY
        }
        this.size = Math.random() * 15 + 1;
        this.velocity = {
            x: Math.random() * 3 - 1.5,
            y: Math.random() * 3 - 1.5
        }
    }
    update(ctx) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
} 