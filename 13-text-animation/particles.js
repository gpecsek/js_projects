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
        this.density = (Math.random() * 40) + 5;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(ctx, mouseX, mouseY, radius) {
        let dx = mouseX - this.position.x;
        let dy = mouseY - this.position.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if(distance < radius) {
            this.position.x -= directionX;
            this.position.y -= directionY;
        } else {
            if(this.position.x !== this.base.x) {
                let dx = this.position.x - this.base.x;
                this.position.x -= dx / 10;
            }
            if(this.position.y !== this.base.y) {
                let dy = this.position.y - this.base.y;
                this.position.y -= dy / 10;
            }
        }
    }
}