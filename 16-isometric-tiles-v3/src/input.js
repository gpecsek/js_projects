export default class InputHandler {
    constructor(keys) {
        window.addEventListener('keydown', ({keyCode}) => {
            switch(keyCode) {
                case 38:    // Key UP
                    keys.pressed.up = true;
                    break;
                case 40:    // Key DOWN
                    keys.pressed.down = true;
                    break;
                case 37:    // Key LEFT
                    keys.pressed.left = true;
                    break;
                case 39:    // Key RIGHT
                    keys.pressed.right = true;
                    break;
                case 81: // "Q" key down - Zoom In
                    keys.pressed.zoomIn = true;
                    break;
                case 65: // "A" key down - Zoom Out
                    keys.pressed.zoomOut = true;
                    break;
            }
        });
        window.addEventListener('keyup', ({keyCode}) => {
            switch(keyCode) {
                case 38:    // Key UP
                    keys.pressed.up = false;
                    break;
                case 40:    // Key DOWN
                    keys.pressed.down = false;
                    break;
                case 37:    // Key LEFT
                    keys.pressed.left = false;
                    break;
                case 39:    // Key RIGHT
                    keys.pressed.right = false;
                    break;
                case 81: // "Q" key down - Zoom In
                    keys.pressed.zoomIn = false;
                    break;
                case 65: // "A" key down - Zoom Out
                    keys.pressed.zoomOut = false;
                    break;
            }
        });
    }
}