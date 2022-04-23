export default class Platform {
    constructor({position}) {
        const img = new Image();
        img.src = './img/platform.png';
        img.onload = () => {
            this.img = img;
            this.position = position;
            this.width = 580;
            this.height = 125;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx) {
        this.draw(ctx);
    }
}   