import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './bricks.js';
import { buildLevel, level1, level2 } from './levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 4,
    NEWLEVEL: 5
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;

        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;
        this.score = 0;
        this.levels = [level1, level2];
        this.currentlevel = 0;

        new InputHandler(this.paddle, this);
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
        
        this.bricks = buildLevel(this, this.levels[this.currentlevel]);
        this.ball.reset();

        this.gameObjects = [this.ball, this.paddle];

        this.gamestate = GAMESTATE.RUNNING;
    }
    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;

        if(this.bricks.length === 0) {
            this.currentlevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgb(0, 0, 0, 0.8";
            ctx.fill();

            ctx.font = "24px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgb(0, 0, 0, 1";
            ctx.fill();

            ctx.font = "24px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to Start", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgb(0, 0, 0, 1";
            ctx.fill();

            ctx.font = "24px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.RUNNING) {
            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.fillText("Lives: " + this.lives, 5, 15);
        }

        if (this.gamestate === GAMESTATE.RUNNING) {
            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.fillText("Score: " + this.score, 5, 30);
        }
    }

    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}