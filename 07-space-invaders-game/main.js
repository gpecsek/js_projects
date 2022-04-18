import Player from './src/player.js';
import Grid from './src/grids.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

import InputHandler from './src/input.js';

canvas.height = innerHeight;
canvas.width = innerWidth;
const projectiles = [];
const grids = [];

const player = new Player(canvas.width, canvas.height)
new InputHandler(player, projectiles);

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 500);

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update(ctx);

    projectiles.forEach((projectile, index) => {
        // remove the projectiles outside of the screen
        if(projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        } else {
            projectile.update(ctx);
        }
    });

    grids.forEach((grid) => {
        grid.update();
        grid.invaders.forEach((invader, invaderIndex) => {
            invader.update(ctx, {velocity: grid.velocity});

            projectiles.forEach((projectile, projectileIndex) => {
                if(
                    projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >= invader.position.x &&
                    projectile.position.x <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y
                    ) {
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1);
                        grid.invaders.splice(invaderIndex, 1);
                    }, 0);
                }
            });
        });
    });

    if(frames % randomInterval === 0) {
        grids.push(new Grid(canvas.width, canvas.height));
        frames = 0;
        randomInterval = Math.floor(Math.random() * 500 + 500);
    }
    frames++;
}

animate();