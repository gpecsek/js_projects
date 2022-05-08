import Tile from "./src/tiles.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

const tilePosEl = document.getElementById('tilePosEl');
const mousePosEl = document.getElementById('mousePosEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

let tile = {
    width: 100,
    height: 50
}
let offSet = {
    x: tile.width * 5,
    y: 0
}
let mousePos = {
    x: 0,
    y: 0
}
let rectPos = {
    x: 0,
    y: 0
}
let mapTilesArray = [];

function init() {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            mapTilesArray.push(new Tile(x, y, offSet, tile))
        }
    }
}
init();
console.log(mapTilesArray);

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    mapTilesArray.forEach((tile) => {
        tile.draw(ctx);
    });
    mapTilesArray.forEach((tile, tileIndex) => {
        let x = inside([ mousePos.x - rect.left, mousePos.y - rect.top ], tile.poly)
        if (x) {
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

            tilePosEl.innerHTML = tile.rectPos.x + ", " + tile.rectPos.y;
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('mousemove', (e) => {
    mousePos.x = e.x;
    mousePos.y = e.y;
    mousePosEl.innerHTML = "x: " + mousePos.x + ", y: " + mousePos.y;
});

function inside(p, vs) {
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      var intersect = ((yi > p[1]) != (yj > p[1])) && (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };