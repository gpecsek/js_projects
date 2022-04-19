export default class Particle {
    constructor({position, velocity, radius, color}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color
        this.opacity = 1;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update(ctx) {
        this.draw(ctx);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.opacity -= 0.01;
    }
}