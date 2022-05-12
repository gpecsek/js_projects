const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let animationRunnig = true;

let cols = 12;
let rows = 12;
let gridArray = new Array(cols);

let closedSet = [];
let openSet = [];
let start;
let end;
let w, h;
let path = [];
w = canvas.width / cols;
h = canvas.height / rows;

class Spot {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
        this.previous = undefined;
        this.wall = false;

        if(Math.random() < 0.2) {
            this.wall = true;
        }
    }

    drawGrid(color) {
        if(this.wall) {
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.fillRect(this.i * w, this.j * h, w, h);
            ctx.restore();
        } else {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.rect(this.i * w, this.j * h, w, h);
            ctx.stroke();
            ctx.restore();   
        }
    }
    show(color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(this.i * w, this.j * h, w, h);
        ctx.restore();
    }

    addNeighbors(grid) {
        let i = this.i;
        let j = this.j;
        if(i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1]);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1]);
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1][j + 1]);
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1]);
        }
    }
}

function removeFromArray(arr, elt) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
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

for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        gridArray[i][j].addNeighbors(gridArray);
    }
}

start = gridArray[0][0];
end = gridArray[cols - 1][rows - 1];

start.wall = false;
end.wall = false;

openSet.push(start);


function animate() {
    if (animationRunnig) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        if(openSet.length > 0) {
            // Keep going
            var winner = 0;
            for (let i = 0; i < openSet.length; i++) {
                if(openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }

            var current = openSet[winner];

            if(current === end) {
                console.log("DONE!!!!");
                animationRunnig = false;
            }

            removeFromArray(openSet, current);
            closedSet.push(current);

            var neighbours = current.neighbors;
            for (let i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];

                if(!closedSet.includes(neighbour) && !neighbour.wall) {
                    var tempG = neighbour.g + 1;

                    if(openSet.includes(neighbour)) {
                        if(tempG < neighbour.g) {
                            neighbour.g = tempG;
                        }
                    } else {
                        neighbour.g = tempG;
                        openSet.push(neighbour);
                    }

                    neighbour.h = Math.abs(neighbour.i - end.i) + Math.abs(neighbour.j - end.j);

                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
                
            }

        } else {
            console.log("No solution!");
            animationRunnig = false;
            // No solution
        }

        gridArray.forEach((row) => {
            row.forEach((spot) => {
                spot.drawGrid('white');
            });
        });

        closedSet.forEach((spot) => {
            spot.show('red');
        });

        openSet.forEach((spot) => {
            spot.show('green');
        });

        // Find the path
        if (current) {
            path = [];
            var temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
        }
        
        path.forEach((spot) => {
            spot.show('blue');
        });
    }    
    requestAnimationFrame(animate);
}

animate();