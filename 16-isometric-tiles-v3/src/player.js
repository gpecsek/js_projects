export default class Player {
    constructor(x, y, z, offSet, tile, color) {
        this.position = {
            x,
            y,
            z
        }
        this.poly = [];
        this.tile = tile;   // Tile Width and Height
        this.color = color;  // Color of the tile top, left and rigth side
        this.offSet = offSet; // The X and Y offSet of the tile rectangle
        this.playerOrigo = {
            x: this.offSet.x + this.position.x + (this.tile.width / 2),
            y: this.offSet.y + this.position.y + (this.tile.height / 2)
        }
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(this.poly[0][0], this.poly[0][1]);
        ctx.lineTo(this.poly[1][0], this.poly[1][1]);
        ctx.lineTo(this.poly[2][0], this.poly[2][1]);
        ctx.lineTo(this.poly[3][0], this.poly[3][1]);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();

        ctx.save();

        ctx.restore();
    }

    update(ctx) {
        this.poly = [   // updating the coordinates
            [this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y],                       // x1,y1
            [this.offSet.x + this.position.x + this.tile.width, this.offSet.y + this.position.y + this.tile.height / 2],    // x2,y2
            [this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y + this.tile.height],    // x3,y3
            [this.offSet.x + this.position.x, this.offSet.y + this.position.y + this.tile.height / 2]                       // x4, y4
        ];
        this.playerOrigo = {
            x: this.offSet.x + this.position.x + (this.tile.width / 2),
            y: this.offSet.y + this.position.y + (this.tile.height / 2)
        }
        this.draw(ctx);
    }
}