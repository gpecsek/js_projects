import {inside, randomColor, drawMap} from "./src/functions.js";
import InputHandler from "./src/input.js";
import Player from "./src/player.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

const tilePosEl = document.getElementById('tilePosEl');
const mousePosEl = document.getElementById('mousePosEl');
const fpsPosEl = document.getElementById('fpsPosEl');
const tileIndexEl = document.getElementById('tileIndexEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Map
const tileMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

let map = {
    cols: tileMap[0].length,
    rows: tileMap.length
}

let tile = {
    width: 80,
    height: 40
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
let tileColor = 'grey'; // Basic color of the tiles

let tileIndexMouseIn;

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
// Measuring FPS variables
const times = [];
let fps;
let now;
let lastTime = 0;
let deltaTime = 0;
let timer = 0;

// initializing input control
const inputHandler = new InputHandler(keys);

// Populate the mapTilesArray with data (Tiles)
drawMap(mapTilesArray, offSet, tile, tileColor, tileMap);
console.log(mapTilesArray);

// Adding neighbours
mapTilesArray.forEach((tile, tileIndex) => {
    tile.addNeighbors(mapTilesArray, tileIndex, map.cols, map.rows);
});

// Create the player
const player = new Player(mapTilesArray[0].position.x, mapTilesArray[0].position.y, 0, offSet, tile, '#DE847B');

function animate(timeStamp) {
    // measuring FPS
    deltaTime = Math.floor(timeStamp - lastTime);
    lastTime = timeStamp;

    now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;

    if (timer > 200) {
        fpsPosEl.innerHTML = fps;
        timer = 0;
    } else {
        timer += deltaTime;
    }

    // Clear the canvas
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
    tileIndexMouseIn = undefined;
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
    tileIndexEl.innerHTML = tileIndexMouseIn;

    // Updating player
    player.update(ctx);

    // Draw lines between the tile the mouse over and the tile where the player is
    if(tileIndexMouseIn != undefined) {
        let tileNeighbors = mapTilesArray[tileIndexMouseIn].neighbor;
        tileNeighbors.forEach((neighbor) => {
            neighbor.drawNeighbors(ctx, neighbor, 'rgba(250,128,114, 0.3)');
        });
    }

    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('mousemove', (e) => {
    mousePos.x = e.x;
    mousePos.y = e.y;
    mousePosEl.innerHTML = "x: " + mousePos.x + ", y: " + mousePos.y;
});

window.addEventListener('click', (e) => {
    // if (tileIndexMouseIn != undefined) mapTilesArray[tileIndexMouseIn].color = randomColor();

    if (tileIndexMouseIn != undefined) {
        player.position.x = mapTilesArray[tileIndexMouseIn].position.x;
        player.position.y = mapTilesArray[tileIndexMouseIn].position.y;
    }
});