export default class Platform {
    constructor({x, y}) {
        const img = new Image();
        img.src = './img/platform.png';

                
        img.onload = () => {
            this.img = img;
            this.position = {
                x,
                y
            }
            this.width = 250;
            this.height = 50;
        }
        console.log(typeof this.img);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx) {
        this.draw(ctx);
    }
}   