import Invader from "./invaders.js";

export default class Grid {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 2,
            y: 0
        }
        this.invaders = [];

        const rows = 4;
        const columns = 8;

        this.width = columns * 100 - 50;
        this.height = rows * 50;

        for(let x = 0; x < columns; x++) {
            for(let y = 0; y < rows; y++) {
                this.invaders.push(new Invader(this.canvasWidth, this.canvasHeight, {position: {
                    x: x * 100,
                    y: y * 50 + 50
                }}));
            }
        }
    }

    update(ctx) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.y = 0;

        if(this.position.x + this.width >= this.canvasWidth  || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = 25;
        }
    }
}