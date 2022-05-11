const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let cols = 5;
let rows = 5;
let gridArray = new Array(cols);

let closedSet = [];
let openSet = [];
let start;
let end;
let w, h;
w = canvas.width / cols;
h = canvas.height / rows;

class Spot {
    constructor(i, j) {
        this.x = i;
        this.y = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    drawGrid(color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.rect(this.x * w, this.y * h, w, h);
        ctx.stroke();
        ctx.restore();
    }
    show(color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.rect(this.x * w, this.y * h, w, h);
        ctx.fill();
        ctx.restore();
    }
}

// Making a 2D array
for (let i = 0; i < rows; i++) {
    gridArray[i] = new Array(rows);
}

for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        gridArray[i][j] = new Spot(i, j);
    }
}

start = gridArray[0][0];
end = gridArray[cols - 1][rows - 1];

openSet.push(start);
console.log(openSet);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(openSet.length > 0) {
        // Keep going
    } else {
        // No solution
    }
    gridArray.forEach((row) => {
        row.forEach((spot) => {
            spot.drawGrid('white');
        });
    });

    closedSet.forEach((spot) => {
        spot.show('red');
    })

    openSet.forEach((spot) => {
        spot.show('green');
    })

    requestAnimationFrame(animate);
}

animate();