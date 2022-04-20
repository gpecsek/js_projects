import Player from './src/player.js';
import Grid from './src/grids.js';
import InputHandler from './src/input.js';
import InvaderProjectile from './src/invaderProjectile.js';
import Particle from './src/particle.js';

const scoreEl = document.getElementById('scoreEl');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.height = 576;
canvas.width = 1024;
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];
let frames = 0;
let randomInterval = 5000;   // Math.floor(Math.random() * 500 + 500);
let game = {
    over: false,
    active: true
}
let score = 0;

const player = new Player(canvas.width, canvas.height)
new InputHandler(player, projectiles, game);

for (let i = 0; i < 100; i++) {
    particles.push(new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        },
        velocity: {
            x: 0,
            y: 0.5
        },
        radius: Math.random() * 2,
        color: 'white'
    }));
}

function createParticles({object, color, fades}) {
    for (let i = 0; i < 25; i++) {
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
            color: color || 'green',  // default value 'green'
            fades
        }));
    }
}

function animate() {
    if(!game.active) return;

    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update(ctx);

    particles.forEach((particle, particleIndex) => {

        if(particle.position.y + particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width;
            particle.position.y = -particle.radius;
        }

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
                player.opacity = 0;
                game.over = true;
            }, 0);

            setTimeout(() => {
                game.active = false;
            }, 2000);

            createParticles({
                object: player,
                color: 'red',
                fades: true
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
                            score += 100;
                            scoreEl.innerHTML = score;

                            createParticles({
                                object: invader,
                                fades: true
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