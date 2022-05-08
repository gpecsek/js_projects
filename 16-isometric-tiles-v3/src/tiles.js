export default class Tile {
    constructor(x, y, offSet, tile) {
        this.tile = tile;
        this.rectPos = {
            x,
            y
        }
        this.position = {
            x: (this.rectPos.x - this.rectPos.y) * tile.width / 2,
            y: (this.rectPos.x + this.rectPos.y) * tile.height / 2
        }
        this.offSet = offSet;
        this.color = 'grey';
        /*this.origo = {
            x: this.offSet.x + this.position.x + this.tile.width / 2,
            y: this.offSet.y + this.position.y + this.tile.height / 2
        }*/
        this.poly = [
            [this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y],
            [this.offSet.x + this.position.x + this.tile.width, this.offSet.y + this.position.y + this.tile.height / 2],
            [this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y + this.tile.height],
            [this.offSet.x + this.position.x, this.position.y + this.tile.height / 2]
        ]
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(this.poly[0][0], this.poly[0][1]);
        ctx.lineTo(this.poly[1][0], this.poly[1][1]);
        ctx.lineTo(this.poly[2][0], this.poly[2][1]);
        ctx.lineTo(this.poly[3][0], this.poly[3][1]);
        ctx.closePath()
        ctx.lineWidth = 0.5;
        ctx.fillStyle = 'grey';
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.draw(ctx)
    }
}