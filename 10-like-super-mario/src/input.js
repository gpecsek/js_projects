export default class InputHandler {
    constructor(player, keys){
        document.addEventListener('keydown', ({keyCode}) => {
            switch(keyCode) {
                case 39: // arrow key right
                    player.moveRight(keys);
                    break;
                case 37: // arrow key left
                    player.moveLeft(keys);
                    break;
                case 38: // arrow key up
                    player.moveUp();
                    break;
                case 40: // arrow key down
                    player.moveDown();
                    break;
            }
        });

        document.addEventListener('keyup', ({keyCode}) => {
            switch(keyCode) {
                case 39: // arrow key right
                    player.stop("right", keys);
                    break;
                case 37: // arrow key left
                    player.stop("left", keys);
                    break;
                case 38: // arrow key up
                    player.stop();
                    break;
                case 40: // arrow key down
                    player.stop();
                    break;
            }
        });

        /*document.addEventListener('keydown', ({key}) => {
            console.log(key);
            switch(key) {
                case 'ArrowLeft': // arrow key left
                    break;
                case 'ArrowRight': // arrow key right
                    break;
                case ' ': // space key
                    break;
            }
        });*/

    }
}