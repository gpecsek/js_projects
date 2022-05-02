export default class Tile {
    constructor(x, y, z, offSet, tileZoom, colorTop, colorRight, colorLeft) {
        this.position = {
            x: x,
            y: y,
            z: z
        }
        this.tile = tileZoom;
        this.color = {
            top: colorTop,
            right: colorRight,
            left: colorLeft
        };
        this.offSet = offSet;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate((this.position.x - this.position.y) * this.tile.width / 2, (this.position.x + this.position.y) * this.tile.height / 2);

        // Draw TOP
        ctx.beginPath();
        ctx.moveTo(this.offSet.x + 0, this.offSet.y + 0  - this.position.z * this.tile.height);
        ctx.lineTo(this.offSet.x + this.tile.width / 2, this.offSet.y + this.tile.height / 2 - this.position.z * this.tile.height);
        ctx.lineTo(this.offSet.x + 0, this.offSet.y + this.tile.height);
        ctx.lineTo(this.offSet.x - this.tile.width / 2, this.offSet.y + this.tile.height / 2 - this.position.z * this.tile.height);
        ctx.closePath();

        ctx.fillStyle = this.color.top;
        ctx.fill();

        // Draw LEFT
        ctx.beginPath();
        ctx.moveTo(this.offSet.x - this.tile.width / 2, this.offSet.y + this.tile.height / 2 - this.position.z * this.tile.height);
        ctx.lineTo(this.offSet.x + 0, this.offSet.y + this.tile.height - this.position.z * this.tile.height);
        ctx.lineTo(this.offSet.x + 0, this.offSet.y + this.tile.height);
        ctx.lineTo(this.offSet.x - this.tile.width / 2, this.offSet.y + this.tile.height / 2);
        ctx.closePath();
        ctx.fillStyle = this.color.left;
        ctx.fill();
    
        // Draw RIGHT
        ctx.beginPath();
        ctx.moveTo(this.offSet.x + this.tile.width / 2, this.offSet.y + this.tile.height / 2  - this.position.z * this.tile.height);
        ctx.lineTo(this.offSet.x + 0, this.offSet.y + this.tile.height - this.position.z * this.tile.height);
        ctx.lineTo(this.offSet.x + 0, this.offSet.y + this.tile.height);
        ctx.lineTo(this.offSet.x + this.tile.width / 2, this.offSet.y + this.tile.height / 2);
        ctx.closePath();
        ctx.fillStyle = this.color.right;
        ctx.fill();

        ctx.restore();
    }

    update(ctx) {
        this.draw(ctx);
    }
}