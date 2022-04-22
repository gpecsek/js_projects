export default class Platform {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        this.width = 200;
        this.height = 20;
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx) {
        this.draw(ctx);
    }
}