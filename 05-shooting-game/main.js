import Player from './src/player.js';
import Projectile from './src/projectile.js';
import Enemies from './src/enemies.js';
import Particle from './src/particle.js';

let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('scoreEl');
const startGameBtn = document.getElementById('startGameBtn');
const modalEl = document.getElementById('modalEl');
const bigScoreEl = document.getElementById('bigScoreEl');

canvas.width = innerWidth;
canvas.height = innerHeight;
let projectiles = [];
let enemies = [];
let particles = [];
let animationId;
let friction = 0.97;
let score = 0;

let playerposition = {
    x: innerWidth / 2,
    y: innerHeight / 2,
    radius: 15,
    color: 'white'
}

let player = new Player(playerposition.x, playerposition.y, playerposition.radius, playerposition.color);

function init() {
    projectiles = [];
    enemies = [];
    particles = [];
    animationId;
    friction = 0.97;
    score = 0;

    playerposition = {
        x: innerWidth / 2,
        y: innerHeight / 2,
        radius: 15,
        color: 'white'
    }

    player = new Player(playerposition.x, playerposition.y, playerposition.radius, playerposition.color);
}

addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - playerposition.y, e.clientX - playerposition.x);

    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    projectiles.push(new Projectile(playerposition.x, playerposition.y, 5, 'white', velocity)) 
});

function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.draw(ctx);

    particles.forEach((particle, index) => {
        if(particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update(ctx, friction);
        }
    });

    projectiles.forEach((projectile, index) => {
        projectile.update(ctx);

        // remove the projectiles outside of the screen
        if(
            projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
        ) {
            projectiles.splice(projectile, index);
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.update(ctx);

        // Enemy touch player -> Game Over!
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if(dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId);
            bigScoreEl.innerHTML = score;
            modalEl.style.display = 'flex';
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            
            // when projetiles touch enemies
            if(dist - enemy.radius - projectile.radius < 1) {
                // create explosions
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(new Particle(
                        projectile.x,
                        projectile.y,
                        Math.random() * 3,
                        enemy.color,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * 6),
                            y: (Math.random() - 0.5) * (Math.random() * 6)
                        }));
                }

                if(enemy.radius - 10 > 10) {
                    score += 100;
                    scoreEl.innerHTML = score;
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1);
                    });
                } else {
                    score += 250;
                    scoreEl.innerHTML = score;
                    setTimeout(() => {
                        enemies.splice(index, 1);
                        projectiles.splice(projectileIndex, 1);
                    });
                }
            }
        });
    });
}

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 5) + 5;
        let x;
        let y;
        if(Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const angle = Math.atan2(playerposition.y - y, playerposition.x - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemies(x, y, radius, color, velocity));
    }, 1500);
}

startGameBtn.addEventListener('click', () => {
    init();
    console.log(player);
    animate();
    spawnEnemies();
    modalEl.style.display = 'none';
    scoreEl.innerHTML = 0;
});