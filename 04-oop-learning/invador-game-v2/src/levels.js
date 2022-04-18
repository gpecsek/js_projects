import Brick from './bricks.js';

export function buildLevel(game, level) {
    let bricks = [];
    let startPosition = ( game.gameWidth - level[0].length * 80 ) / 2;      
    let colors = ['#3B0102','#762B2C','#B6443F','6C5B7B','#355C7D']

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            let color = colors[Math.floor(Math.random() * (colors.length - 1))]
            if( brick === 1) {
                let position = {
                    x: startPosition + 80 * brickIndex,
                    y: 70 + 24 * rowIndex
                };
                bricks.push(new Brick(game, position, color));
            }
        });
    });

    return bricks;
}

export const level1 = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0]
];

export const level2 = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1]
];