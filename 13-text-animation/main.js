import Particle from "./particles.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let particleArray = [];
let adjustX = 5 ;
let adjustY = -5;

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

ctx.font = '40px Verdana';
ctx.fillStyle = 'white';
ctx.fillText('A', 0, 40);

const textCoordinates = ctx.getImageData(0, 0, 100, 100);


function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4* textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 25, positionY * 25));
            }
        }
    }
}
init();

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].position.x - particleArray[b].position.x;
            let dy = particleArray[a].position.y - particleArray[b].position.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            opacityValue = 1 - (distance / 100);
            ctx.strokeStyle = 'rgba(255, 255, 255,' + opacityValue + ')';
            if (distance < 100) {
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].position.x, particleArray[a].position.y);
                ctx.lineTo(particleArray[b].position.x, particleArray[b].position.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw(ctx);
        particleArray[i].update(ctx, mouse.x, mouse.y, mouse.radius);
    }
    connect();
    requestAnimationFrame(animate);
}

animate();