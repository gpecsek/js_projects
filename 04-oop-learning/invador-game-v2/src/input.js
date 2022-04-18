export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener('keydown', (e) => {
            switch(e.keyCode) {
                case 37: // hit LEFT arrow
                    paddle.moveLeft();
                    break;
                case 39: // hit RIGHT arrow
                    paddle.moveRight();
                    break;
                case 27: // hit ESC
                    game.togglePause();
                    break;
                case 13: // hit ENTER
                    game.start();
                    break;
                case 32:
                    game.shoot();
                    break;
                // Listening for keydonw event to move the paddle UP and DOWN
                /*
                case 38:
                    paddle.moveUp();
                    break;
                case 40:
                    paddle.moveDown();
                    break;
                */
            }
        });
        document.addEventListener('keyup', (e) => {
            switch(e.keyCode) {
                case 37:
                    if(paddle.speed.x < 0) paddle.stop();
                    break;
                case 39:
                    if(paddle.speed.x > 0) paddle.stop();
                    break;
                // Listening for keydown event to STOP moving the paddle UP and DOWN
                /*
                case 38:
                    if(paddle.speedY < 0) paddle.stop();
                    break;
                case 40:
                    if(paddle.speedY > 0) paddle.stop();
                    break;
                */
            }
        });
    }
}