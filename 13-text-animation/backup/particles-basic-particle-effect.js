export default class Particle {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.size = 3;
        this.base = {
            x: this.position.x,
            y: this.position.y
        }
        this.density = (Math.random() * 30) + 1;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(ctx, mouseX, mouseY) {
        let dx = mouseX - this.position.x;
        let dy = mouseY - this.position.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < 100) {
            this.size = 30;
        } else {
            this.size = 3;
        }
    }
}