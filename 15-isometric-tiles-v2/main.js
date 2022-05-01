import InputHandler from './src/input.js';
import Map from './src/map.js';

const fpsEl = document.getElementById('fpsEl');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mapTilesArray = [];
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
}
let scrollOffSet = {
    x: canvas.width / 2,
    y: 0
}

const inputHandler = new InputHandler(keys);
const map = new Map(mapTilesArray, scrollOffSet);

let lastTime = 0;
let fpsSet = 60;
let nextFrame = 1000/fpsSet;
let timer = 0;

function animate(timeStamp) {
    // FPS setting
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    
    if (timer > nextFrame) {
        // Clear the canvas
        ctx.clearRect(-1000, -1000, canvas.width * 5, canvas.height * 5);

        // Move the canvas
        if (keys.right.pressed) {
            scrollOffSet.x -= 5;
        } else if (keys.left.pressed) {
            scrollOffSet.x += 5;
        } else if (keys.up.pressed) {
            scrollOffSet.y += 5;
        } else if (keys.down.pressed) {
            scrollOffSet.y -= 5;
        }

        // Re-draw tiles
        mapTilesArray.forEach((mapTile) => {
            mapTile.update(ctx);
        });
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

animate(0);