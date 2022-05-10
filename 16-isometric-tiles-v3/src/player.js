export default class Player {
    constructor(x, y, z, offSet, tile, color) {
        this.position = {
            x,
            y,
            z
        }
        this.tile = tile;   // Tile Width and Height
        this.color = color;  // Color of the tile top, left and rigth side
        this.offSet = offSet; // The X and Y offSet of the tile rectangle
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y);
        ctx.lineTo(this.offSet.x + this.position.x + this.tile.width, this.offSet.y + this.position.y + this.tile.height / 2);
        ctx.lineTo(this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y + this.tile.height);
        ctx.lineTo(this.offSet.x + this.position.x, this.offSet.y + this.position.y + this.tile.height / 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();

        ctx.save();

        ctx.restore();
    }

    update(ctx) {
        this.draw(ctx);
    }
}