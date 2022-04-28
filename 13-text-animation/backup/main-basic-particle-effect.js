import Particle from "./particles-basic-particle-effect.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let particleArray = [];

//Handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

ctx.font = '30px Verdana';
ctx.fillStyle = 'white';
ctx.fillText('A', 0, 40);

const data = ctx.getImageData(0, 0, 100, 100);


function init() {
    particleArray = [];
    for (let i = 0; i < 500; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }
    console.log(particleArray);
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw(ctx);
        particleArray[i].update(ctx, mouse.x, mouse.y);
    }
    requestAnimationFrame(animate);
}

animate();