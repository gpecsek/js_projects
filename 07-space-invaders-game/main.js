import Player from './src/player.js';
import Grid from './src/grids.js';
import InputHandler from './src/input.js';
import InvaderProjectile from './src/invaderProjectile.js';
import Particle from './src/particle.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];

const player = new Player(canvas.width, canvas.height)
new InputHandler(player, projectiles);

let frames = 0;
let randomInterval = 5000;   // Math.floor(Math.random() * 500 + 500);

function createParticles({object, color}) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 5,
            color: color || 'green'  // default value 'green'
        }));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update(ctx);

    particles.forEach((particle, particleIndex) => {
        if(particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(particleIndex, 1);
            }, 0);
        } else {
            particle.update(ctx);
        }
    });
    
    invaderProjectiles.forEach((invaderProjectile, invaderProjectileIndex) => {
        if(invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(invaderProjectileIndex, 1);
            }, 0);
        } else {
            invaderProjectile.update(ctx);
        }

        // collision detection (player vs invader projectile)
        if (
            invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width
            ) {
            setTimeout(() => {
                invaderProjectiles.splice(invaderProjectileIndex, 1);
            }, 0);
            createParticles({
                object: player,
                color: 'red'
            });
        }
    });

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

    grids.forEach((grid, gridIndex) => {
        grid.update();
        // spawning invader projectiles
        if(frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);
        }

        grid.invaders.forEach((invader, invaderIndex) => {
            invader.update(ctx, {velocity: grid.velocity});

            // projectiles hit enemy
            projectiles.forEach((projectile, projectileIndex) => {
                if(
                    projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >= invader.position.x &&
                    projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y
                    ) {
                    
                    setTimeout(() => {
                        const invaderFound = grid.invaders.find(
                            (invader2) => invader2 === invader
                        );

                        const projectileFound = projectiles.find(
                            (projectile2) => projectile2 === projectile
                        );

                        // Remove invader and projectile here
                        if(invaderFound && projectileFound) {
                            createParticles({
                                object: invader
                            });
                            
                            projectiles.splice(projectileIndex, 1);
                            grid.invaders.splice(invaderIndex, 1);
                        }

                        if (grid.invaders.length > 0) {
                            const firstInvader = grid.invaders[0];
                            const lastInvader = grid.invaders[grid.invaders.length - 1];

                            grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                            grid.position.x = firstInvader.position.x;
                        } else {
                            grids.splice(gridIndex, 1);
                        }
                    }, 0);
                }
            });
        });
    });

    // spawning enemies
    if(frames % randomInterval === 0) {
        grids.push(new Grid(canvas.width, canvas.height));
        frames = 0;
        randomInterval = 5000; // Math.floor(Math.random() * 500 + 500);
    }
    frames++;
}

animate();