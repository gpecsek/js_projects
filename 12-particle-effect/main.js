import Particle from "./particle.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

const mouse = {
    x: null,
    y: null
}
const particlesArray = [];

function handleParticles() {
    particlesArray.forEach((particle, particleIndex) => {
        particle.update(ctx);
        particle.draw(ctx);
        if(particle.size <= 0.3) {
            particlesArray.splice(particleIndex, 1);
        }
    });
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 2; i++) {
        particlesArray.push(new Particle(mouse.x, mouse.y, canvas.width, canvas.height));   
    }
});

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 2; i++) {
        particlesArray.push(new Particle(mouse.x, mouse.y, canvas.width, canvas.height));   
    }
});

animate();