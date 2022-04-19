export default class InvaderProjectile {
    constructor({ position, velocity}) {
        this.position = position;
        this.velocity = velocity

        this.width = 5;
        this.height = 15;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx) {
        this.draw(ctx);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}