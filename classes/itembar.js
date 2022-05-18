export class itembar {

    constructor(canvas) {
        
        this.canvas = canvas;
        this.itemBar = this.canvas.getContext("2d");
        this.barNumber = 6;
        this.itemBarWidth = canvas.height * 0.08 * this.barNumber;
        this.itemBarHeigh = canvas.height * 0.08;
        this.itemBarX = canvas.width / 2 - this.itemBarWidth / 2;
        this.itemBarY = canvas.height - this.itemBarHeigh;
        this.singleGunImage = new Image();
        this.singleGunImage.src = 'gif/1.png';
        this.shotGunImage = new Image();
        this.shotGunImage.src = 'gif/2.png';

    }



    renederItemBar() {

        this.itemBar.fillStyle = "rgba(255, 255, 255, 0.1)";
        this.itemBar.fillRect(this.itemBarX, this.itemBarY, this.itemBarWidth, this.itemBarHeigh);

        let itemBarX = this.itemBarX + this.canvas.height * 0.0016;
        let itemBarY = this.itemBarY + this.canvas.height * 0.0016;
        let itemBarWidth = this.itemBarWidth / this.barNumber - this.canvas.height * 0.0032;
        let itemBarHeigh = this.itemBarHeigh - this.canvas.height * 0.0032;

        for (let index = 0; index < this.barNumber; index++) {
            this.fillBar(this.itemBar, `${index + 1}`, itemBarX + index * this.itemBarWidth / this.barNumber, itemBarY, itemBarWidth, itemBarHeigh);
        }

    }

    fillBar(item, text, x, y, width, Height) {

        item.fillStyle = "rgba(255, 255, 255, 0.1)";
        if (text == "1") {
            item.drawImage(this.singleGunImage, x, y, width, Height);
        }
        if (text == "2") {
            item.drawImage(this.shotGunImage, x + this.canvas.height * 0.04 / 6, y + this.canvas.height * 0.04 / 6, width - this.canvas.height * 0.04 / 3, Height - this.canvas.height * 0.04 / 3);
        }

        item.fillRect(x, y, width, Height);
        item.font = `${this.canvas.height * 0.03}px ariel`;
        item.fillStyle = "black";
        item.fillText(text, x + this.canvas.height * 0.04 / 12, y + this.canvas.height * 0.03);

    }
}