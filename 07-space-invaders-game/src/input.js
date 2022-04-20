export default class InputHandler {
    constructor(player, projectiles, game) {
        document.addEventListener('keydown', ({ key }) => {
            if (game.over) return
            switch (key) {
                case 'a':
                    player.moveLeft();
                    break;
                case 'd':
                    player.moveRight();
                    break;
                case 'ArrowLeft':
                    player.moveLeft();
                    break;
                case 'ArrowRight':
                    player.moveRight();
                    break;
                case ' ':
                    player.shoot(projectiles);
                    break;
            }
        });
        
        document.addEventListener('keyup', ({ key }) => {
            if (game.over) return
            switch (key) {
                case 'a':
                    if(player.velocity.x < 0) player.stop();
                    break;
                case 'd':
                    if(player.velocity.x > 0) player.stop();
                    break;
                case 'ArrowLeft':
                    if(player.velocity.x < 0) player.stop();
                    break;
                case 'ArrowRight':
                    if(player.velocity.x > 0) player.stop();
                    break;
            }
        });
    }
}