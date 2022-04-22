import Player from "./src/player.js";
import InputHandler from "./src/input.js";
import Platform from "./src/platform.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const fpsEl = document.getElementById('fpsEl');
const scrollEl = document.getElementById('scrollEl');

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
let scrollOffSet = 0;

const platforms = [new Platform({x: 200, y: 250}), new Platform({x: 450, y: 325})];
const player = new Player(gravity, canvas.width, canvas.height);
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
    if(keys.right.pressed && player.position.x + player.width / 2 < canvas.width / 2) {
        player.velocity.x = 5;
    } else if(keys.left.pressed && player.position.x + player.width / 2 > canvas.width / 2) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if(keys.right.pressed) {
            scrollOffSet += 5;
            scrollEl.innerHTML = scrollOffSet;
            platforms.forEach((platform) => {
                platform.position.x -= 5;
            });
        } else if(keys.left.pressed) {
            scrollOffSet -= 5;
            scrollEl.innerHTML = scrollOffSet;
            platforms.forEach((platform) => {
                platform.position.x += 5;
            });            
        }
    }

    // Platform and player collision detection
    platforms.forEach((platform) => {
        if(
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
            ) {
            player.velocity.y = 0;
        }
    });

    // Level end
    if(scrollOffSet > 2000) {
        console.log('You Win!');
    }

    // Draw platform
    platforms.forEach((platform) => {
        platform.update(ctx);
    })
    // Draw player
    player.update(ctx);
}

animate();