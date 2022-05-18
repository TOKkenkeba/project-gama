export class canvas {

    constructor(mainBackground) {
        this.canvas = document.querySelector("canvas");
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 6;
        this.context = this.canvas.getContext('2d');
        this.mainBackground = mainBackground;
    }

    drawCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.mainBackground, 0, 0, this.canvas.width, this.canvas.height);
    }
}