import Tile from "./tiles.js";

// Draw MAP
export function drawMap(mapTilesArray, offSet, tile, tileColor, tileMap) {
    let blocked = 0;
    for (let x = 0; x < tileMap.length; x++) {
        for (let y = 0; y < tileMap[x].length; y++) {
            if (tileMap[x][y] == 1) {
                blocked = 1;
            } else {
                blocked = 0;
            }
            mapTilesArray.push(new Tile(x, y, offSet, tile, tileColor, blocked))
        }
    }
}

// This algorithm is checking whether the mouse is inside a tile or not
export function inside(p, vs) {
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      var intersect = ((yi > p[1]) != (yj > p[1])) && (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
};

// Draw red frame around the Tile the mouse in
export function drawRedFrame(ctx, tile) {
    ctx.save();

    ctx.strokeStyle = 'red';
    ctx.lineWidth = '2px'; 

    ctx.beginPath();
    ctx.moveTo(tile.poly[0][0], tile.poly[0][1]);
    ctx.lineTo(tile.poly[1][0], tile.poly[1][1]);
    ctx.lineTo(tile.poly[2][0], tile.poly[2][1]);
    ctx.lineTo(tile.poly[3][0], tile.poly[3][1]);
    ctx.closePath()
    ctx.stroke();

    ctx.restore();
}

// TEMPORARY FUNCTION
// Random color calculator for tile click checking
export function randomColor() {
    let r = Math.floor(Math.random() * 254 + 1);
    let g = Math.floor(Math.random() * 254 + 1);
    let b = Math.floor(Math.random() * 254 + 1);
    let randomCol = "rgba(" + r + "," + g + "," + b + ",1)";
    return randomCol;
}