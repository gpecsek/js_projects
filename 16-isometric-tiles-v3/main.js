import {inside, drawMap, removeFromArray} from "./src/functions.js";
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

// A* algorithm variables
let closedSet = [];
let openSet = [];
let start;
let end;
let path = [];
let pathFindingRunning = true;

// initializing input control
const inputHandler = new InputHandler(keys);

// Populate the mapTilesArray with data (Tiles)
drawMap(mapTilesArray, offSet, tile, tileColor, tileMap);

// Adding neighbours
mapTilesArray.forEach((tile, tileIndex) => {
    tile.addNeighbors(mapTilesArray, tileIndex, map.cols, map.rows);
});

// Create the player
const player = new Player(mapTilesArray[0].position.x, mapTilesArray[0].position.y, 0, offSet, tile, 'rgba(34,139,34,0.8)');

// Player start position set as A* algorithm start and pushed to openSet 
start = mapTilesArray[0];
openSet.push(start);

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

            end = mapTilesArray[tileIndexMouseIn];

            // START of A* pathfinding algorithm
            if (pathFindingRunning && mapTilesArray[tileIndexMouseIn].blocked != true) {
                if(openSet.length > 0) {
                    // Keep going
                    var winner = 0;
                    for (let i = 0; i < openSet.length; i++) {
                        if(openSet[i].f < openSet[winner].f) {
                            winner = i;
                        }
                    }
    
                    var current = openSet[winner];
                    console.log(current)
                    if(current === end) {
                        console.log("DONE!!!!");
                        pathFindingRunning = false;
                    }
    
                    removeFromArray(openSet, current);
                    closedSet.push(current);
    
                    var neighbors = current.neighbor;
                    for (let i = 0; i < neighbors.length; i++) {
                        var neighbor = neighbors[i];
    
                        if(!closedSet.includes(neighbor) && !neighbor.blocked) {
                            var tempG = neighbor.g + 1;
    
                            if(openSet.includes(neighbor)) {
                                if(tempG < neighbor.g) {
                                    neighbor.g = tempG;
                                }
                            } else {
                                neighbor.g = tempG;
                                openSet.push(neighbor);
                            }
    
                            neighbor.h = Math.abs(neighbor.i - end.i) + Math.abs(neighbor.j - end.j);
    
                            neighbor.f = neighbor.g + neighbor.h;
                            neighbor.previous = current;
                        }
                        
                    }
    
                } else {
                    console.log("No solution!");
                    pathFindingRunning = false;
                    // No solution
                }
        
                // Find the path
                if (current) {
                    path = [];
                    var temp = current;
                    path.push(temp);
                    while (temp.previous) {
                        path.push(temp.previous);
                        temp = temp.previous;
                    }
                }
            }
            // END of A* pathfinding algorithm
        }
    });
    // Draw path
    path.forEach((tile) => {
        tile.drawPath(ctx, tile, 'rgba(193,217,183,0.5)');
    });

    tileIndexEl.innerHTML = tileIndexMouseIn;

    // Updating player
    player.update(ctx);

    // Draw neighbors of the tile the mouse is over
    /*if(tileIndexMouseIn != undefined) {
        let tileNeighbors = mapTilesArray[tileIndexMouseIn].neighbor;
        tileNeighbors.forEach((neighbor) => {
            neighbor.drawNeighbors(ctx, neighbor, 'rgba(250,128,114, 0.3)');
        });
    }*/

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
        start = mapTilesArray[tileIndexMouseIn];
        console.log(start);
    }
});