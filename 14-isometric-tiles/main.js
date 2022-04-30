const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = innerWidth;
let height = canvas.height = innerWidth;
let tileWidth = 56.5;
let tileHeight = 30;

ctx.translate(width / 2, 50);

// Image: https://www.deviantart.com/spasquini/art/Isometric-new-tiles-274882986
let img = document.createElement("img");
img.addEventListener('load', () => {
    draw();
});
img.src = "tileset.png";

function draw() {
    for (let x = 0; x < 25; x++) {
        for (let y = 0; y < 25; y++) {
            drawImageTile(x, y, Math.floor(Math.random() * 16))
            // drawBlock(x, y, Math.random() * 4);
        }
    }
}

function drawImageTile(x, y, index) {
    ctx.save();
    ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2 + (index < 4 ? 5 : 0));

    ctx.drawImage(img, index * tileWidth, 0, tileWidth, img.height, -tileWidth / 2, 0, tileWidth, img.height);


    ctx.restore();
}


function drawBlock(x, y, z) {
    let top = '#eeeeee';
    let right = '#cccccc';
    let left = '#999999';

    ctx.save();
    ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

    // Draw TOP
    ctx.beginPath();
    ctx.moveTo(0, -z * tileHeight);
    ctx.lineTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
    ctx.lineTo(0, tileHeight);
    ctx.lineTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
    ctx.closePath();
    ctx.fillStyle = top;
    ctx.fill();

    // Draw LEFT
    ctx.beginPath();
    ctx.moveTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
    ctx.lineTo(0, tileHeight - z * tileHeight);
    ctx.lineTo(0, tileHeight);
    ctx.lineTo(-tileWidth / 2, tileHeight / 2);
    ctx.closePath();
    ctx.fillStyle = left;
    ctx.fill();

    // Draw RIGHT
    ctx.beginPath();
    ctx.moveTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
    ctx.lineTo(0, tileHeight - z * tileHeight);
    ctx.lineTo(0, tileHeight);
    ctx.lineTo(tileWidth / 2, tileHeight / 2);
    ctx.closePath();
    ctx.fillStyle = right;
    ctx.fill();

    ctx.restore();
}

function randomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function drawTile(x, y, color) {
    ctx.save();
    ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(tileWidth / 2, tileHeight / 2);
    ctx.lineTo(0, tileHeight);
    ctx.lineTo(-tileWidth / 2, tileHeight / 2);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
}
