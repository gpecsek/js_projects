import Tile from "./src/tiles.js";
import InputHandler from "./src/input.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

const tilePosEl = document.getElementById('tilePosEl');
const mousePosEl = document.getElementById('mousePosEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

let tile = {
    width: 60,
    height: 30
}
let offSet = {
    x: (canvas.width / 2) - (tile.width / 2),
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
let tileIndexMouseIn;
let tileColor = 'grey'; // Basic color of the tiles

let keys = {
    pressed: {
        up: false,
        down: false,
        left: false,
        right: false,
        zoomIn: false,
        zoomOut: false
    }
}

const inputHandler = new InputHandler(keys);

function init() {
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            mapTilesArray.push(new Tile(x, y, offSet, tile, tileColor))
        }
    }
}
init();

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    // Move the canvas
    if (keys.pressed.right) {
        offSet.x -= 7;
    } else if (keys.pressed.left) {
        offSet.x += 7;
    } else if (keys.pressed.up) {
        offSet.y += 7;
    } else if (keys.pressed.down) {
        offSet.y -= 7;
    }

    //Zoom In or Out
    if(keys.pressed.zoomIn) {
        tile.width += 1;
        tile.height = tile.width / 2;
    }
    if(keys.pressed.zoomOut) {
        tile.width -= 1;
        tile.height = tile.width / 2;
    }

    // Re-draw the map
    mapTilesArray.forEach((tile) => {
        tile.update(ctx);
    });

    // Check which tile the mouse in and draw a red frame around the tile
    // Plus store the tile index (tileIndexMouseIn)
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

            tileIndexMouseIn = tileIndex;
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

window.addEventListener('click', (e) => {
    mapTilesArray[tileIndexMouseIn].color = "green";
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