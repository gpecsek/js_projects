import Tile from './tile.js';

export default class Map {
    constructor(mapTilesArray, scrollOffSet, tileZoom) {
        this.mapTilesArray = mapTilesArray;
        this.scrollOffSet = scrollOffSet;
        this.tileZoom = tileZoom;
        this.color = {
            top: 'grey',
            right: 'grey',
            left: 'grey'
        };
        this.#drawMap()
    }
    #drawMap() {
        let z = 0;
        for (let x = 0; x < tileMap1.length; x++) {
            for (let y = 0; y < tileMap1[x].length; y++) {
                if (tileMap1[x][y] == 0) {
                    this.color.top = 'rgba(59, 102, 220, 1)';
                    this.color.left = 'rgba(8, 53, 176, 1)';
                    this.color.right = 'rgba(153, 204, 255, 1)';
                    z = 0.1;
                } else if (tileMap1[x][y] == 1) {
                    this.color.top = 'rgba(0, 233, 233, 1)';
                    this.color.left = 'rgba(0, 192, 192, 1)';
                    this.color.right = 'rgba(156, 240, 240, 1)';
                    z = 0.1;
                } else if (tileMap1[x][y] == 2) {
                    this.color.top = 'rgba(0, 188, 63, 1)';
                    this.color.left = 'rgba(0, 131, 44, 1)';
                    this.color.right = 'rgba(113, 195, 140, 1)';
                    z = 0.1;
                } else if (tileMap1[x][y] == 3) {
                    this.color.top = 'rgba(165, 102, 1, 1)';
                    this.color.left = 'rgba(119, 74, 2, 1)';
                    this.color.right = 'rgba(218, 177, 111, 1)';
                    z = 0.1;
                } else if (tileMap1[x][y] == 4) {
                    this.color.top = 'rgba(165, 102, 1, 1)';
                    this.color.left = 'rgba(119, 74, 2, 1)';
                    this.color.right = 'rgba(218, 177, 111, 1)';
                    z = 0.1;
                } else if (tileMap1[x][y] == 5) {
                    this.color.top = 'rgba(165, 102, 1, 1)';
                    this.color.left = 'rgba(119, 74, 2, 1)';
                    this.color.right = 'rgba(218, 177, 111, 1)';
                    z = 0.1;
                } else if (tileMap1[x][y] == 6) {
                    this.color.top = 'rgba(165, 102, 1, 1)';
                    this.color.left = 'rgba(119, 74, 2, 1)';
                    this.color.right = 'rgba(218, 177, 111, 1)';
                    z = 0.1;
                }
                this.mapTilesArray.push(new Tile(x, y, z, this.scrollOffSet, this.tileZoom, this.color.top, this.color.right, this.color.left));
                //console.log("Tile: (" + x + ", " + y + ") - TileMapValue: " + tileMap1[x][y]);
            }
        }
    }
}

const tileMap1 = [
    [6, 6, 5, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [6, 5, 5, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [5, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0],
    [4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
    [4, 4, 3, 3, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0],
    [4, 4, 4, 3, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0],
    [6, 5, 4, 4, 3, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0],
    [6, 5, 4, 4, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0],
]
console.log(tileMap1);