export default class InputHandler {
    constructor(keys) {
        document.addEventListener('keydown', ({keyCode}) => {
            switch(keyCode) {
                case 39: // arrow key right
                    keys.right.pressed = true;
                    break;
                case 37: // arrow key left
                    keys.left.pressed = true;
                    break;
                case 38: // arrow key up
                    keys.up.pressed = true;
                    break;
                case 40: // arrow key down
                    keys.down.pressed = true;
                    break;
                case 81: // "Q" key down - Zoom In
                    keys.zoomIn.pressed = true;
                    break;
                case 65: // "A" key down - Zoom Out
                    keys.zoomOut.pressed = true;
                    break;
            }
        });
        document.addEventListener('keyup', ({keyCode}) => {
            switch(keyCode) {
                case 39: // arrow key right
                    keys.right.pressed = false;
                    break;
                case 37: // arrow key left
                    keys.left.pressed = false;
                    break;
                case 38: // arrow key up
                    keys.up.pressed = false;
                    break;
                case 40: // arrow key down
                    keys.down.pressed = false;
                    break;
                case 81: // "Q" key down - Zoom In
                    keys.zoomIn.pressed = false;
                    break;
                case 65: // "A" key down - Zoom Out
                    keys.zoomOut.pressed = false;
                    break;
            }
        });
    }
}