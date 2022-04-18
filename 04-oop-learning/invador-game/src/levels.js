import Brick from './bricks.js';

export function buildLevel(game, level) {
    let bricks = [];

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if( brick === 1) {
                let position = {
                    x: 60 * brickIndex,
                    y: 50 + 18 * rowIndex
                };
                bricks.push(new Brick(game, position));
            }
        });
    });

    return bricks;
}

export const level1 = [
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export const level2 = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1]
];