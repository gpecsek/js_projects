export default class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.position = {
            x: x,
            y: y
        }
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }

    draw(ctx) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        ctx.fillText(this.text, this.position.x * this.fontSize, this.position.y * this.fontSize);
        if(this.position.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.position.y = 0;
        } else {
            this.position.y += 1;
        }

    }
}