import Player from "./src/player.js";
import InputHandler from "./src/input.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const fpsEl = document.getElementById('fpsEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

const times = [];
let fps;
let now;
const gravity = 0.5;
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

const player = new Player(gravity, canvas.height);
const inputHandler = new InputHandler(player, keys);

function animate() {
    // measuring FPS
    now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    fpsEl.innerHTML = fps;

    requestAnimationFrame(animate);
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Player left/right movement
    if(keys.right.pressed) {
        player.velocity.x = 5;
    } else if(keys.left.pressed) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;
    }
    // Draw player
    player.update(ctx);
}

animate();