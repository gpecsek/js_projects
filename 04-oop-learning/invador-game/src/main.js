import Game from './game.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    // console.log('LastTime: ' + lastTime + '\nTimestamp: ' + timestamp + '\nDeltaTime: ' + deltaTime);

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
    game.update(deltaTime);
    game.draw(ctx);
    
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);