export default class Tile {
    constructor(x, y, offSet, tile, color) {
        this.tile = tile;   // Tile Width and Height
        this.rectPos = {    // Position of the tile in the grid
            x,
            y
        }
        this.position = {x: 0, y: 0, z: 0}   // X and Y position of the tile in pixel
        this.offSet = offSet;   // The X and Y offSet of the tile rectangle
        this.color = color;     // color of the tile
        this.poly = [];          // The coordinates of the tile. I'm using these coordinates to check if the mouse is inside the tile or not
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
    }

    update(ctx) {
        this.position = {   // X and Y position of the tile in pixel
            x: (this.rectPos.x - this.rectPos.y) * this.tile.width / 2,
            y: (this.rectPos.x + this.rectPos.y) * this.tile.height / 2,
            z: 0.1
        }
        this.poly = [   // updating the coordinates
            [this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y],                       // x1,y1
            [this.offSet.x + this.position.x + this.tile.width, this.offSet.y + this.position.y + this.tile.height / 2],    // x2,y2
            [this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y + this.tile.height],    // x3,y3
            [this.offSet.x + this.position.x, this.offSet.y + this.position.y + this.tile.height / 2]                                       // x4, y4
        ]
        this.draw(ctx)
    }
}