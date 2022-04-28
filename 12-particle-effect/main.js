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
let hue = 0;

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(ctx);
        particlesArray[i].draw(ctx);
        for ( let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].position.x - particlesArray[j].position.x;
            const dy = particlesArray[i].position.y - particlesArray[j].position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2; //particlesArray[i].size / 10;
                ctx.moveTo(particlesArray[i].position.x, particlesArray[i].position.y);
                ctx.lineTo(particlesArray[j].position.x, particlesArray[j].position.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 5;
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 5; i++) {
        particlesArray.push(new Particle(mouse.x, mouse.y, canvas.width, canvas.height, hue));   
    }
});

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 5; i++) {
        particlesArray.push(new Particle(mouse.x, mouse.y, canvas.width, canvas.height, hue));   
    }
});

animate();