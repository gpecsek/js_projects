export default class Tile {
    constructor(x, y, offSet, tile, color, blocked) {
        this.tile = tile;   // Tile Width and Height
        this.rectPos = {    // Position of the tile in the grid
            x: x,
            y: y
        }
        this.position = {   // X and Y position of the tile in pixel
            x: (this.rectPos.y - this.rectPos.x) * this.tile.width / 2,
            y: (this.rectPos.y + this.rectPos.x) * this.tile.height / 2,
            z: 0
        }
        this.offSet = offSet;   // The X and Y offSet of the tile rectangle
        this.color = color;     // color of the tile
        this.poly = [];          // The coordinates of the tile. I'm using these coordinates to check if the mouse is inside the tile or not
        this.tileOrigo = {
            x: this.offSet.x + this.position.x + (this.tile.width / 2),
            y: this.offSet.y + this.position.y + (this.tile.height / 2)
        }

        // Variables for A* algorithm
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbor = [];
        this.previous = undefined;
        if(blocked == 1) {
            this.blocked = true;
        } else {
            this.blocked = false;
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

        // Red dots in the origo of the not blocked tiles
        /*if (!this.blocked) {
            ctx.beginPath();
            ctx.arc(this.tileOrigo.x, this.tileOrigo.y, 1, 0, Math.PI * 2);
            ctx.fillStyle = 'red';
            ctx.fill();
        }*/

        ctx.restore();
    }

    update(ctx) {
        if (this.blocked) {
            this.color = 'black';
        }
        this.position = {   // X and Y position of the tile in pixel
            x: (this.rectPos.y - this.rectPos.x) * this.tile.width / 2,
            y: (this.rectPos.y + this.rectPos.x) * this.tile.height / 2,
            z: 0
        }
        this.tileOrigo = {
            x: this.offSet.x + this.position.x + (this.tile.width / 2),
            y: this.offSet.y + this.position.y + (this.tile.height / 2)
        }
        this.poly = [   // updating the coordinates
            [this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y],                       // x1,y1
            [this.offSet.x + this.position.x + this.tile.width, this.offSet.y + this.position.y + this.tile.height / 2],    // x2,y2
            [this.offSet.x + this.position.x + this.tile.width / 2, this.offSet.y + this.position.y + this.tile.height],    // x3,y3
            [this.offSet.x + this.position.x, this.offSet.y + this.position.y + this.tile.height / 2]                       // x4, y4
        ]
        this.draw(ctx)
    }

    addNeighbors(grid, index, cols, rows) {

        //if (grid[index - cols - 1] && index % cols != 0) this.neighbor.push(grid[index - cols - 1]);     // LEFT-TOP
        if (grid[index - cols]) this.neighbor.push(grid[index - cols]);             // MID-TOP
        //if (grid[index - cols + 1] && (index + 1) % cols != 0) this.neighbor.push(grid[index - cols + 1]);     // RIGHT-TOP

        if (grid[index - 1] && index % cols != 0) this.neighbor.push(grid[index - 1]);                   // LEFT
        if (grid[index + 1] && (index + 1) % cols != 0) this.neighbor.push(grid[index + 1]);                   // RIGHT
        
        //if (grid[index + cols - 1] && index % cols != 0) this.neighbor.push(grid[index + cols - 1]);     // LEFT-BOTTOM
        if (grid[index + cols]) this.neighbor.push(grid[index + cols]);             // MID-BOTTOM
        //if (grid[index + cols + 1] && (index + 1) % cols != 0) this.neighbor.push(grid[index + cols + 1]);     // RIGHT-BOTTOM
    }

    drawNeighbors(ctx, neighbor, color) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(neighbor.poly[0][0], neighbor.poly[0][1]);
        ctx.lineTo(neighbor.poly[1][0], neighbor.poly[1][1]);
        ctx.lineTo(neighbor.poly[2][0], neighbor.poly[2][1]);
        ctx.lineTo(neighbor.poly[3][0], neighbor.poly[3][1]);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    }

    drawPath(ctx, tile, color) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(tile.poly[0][0], tile.poly[0][1]);
        ctx.lineTo(tile.poly[1][0], tile.poly[1][1]);
        ctx.lineTo(tile.poly[2][0], tile.poly[2][1]);
        ctx.lineTo(tile.poly[3][0], tile.poly[3][1]);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    }
}