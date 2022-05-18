export class Player {

    constructor(x, y, width, height, canvas, speedX, speedY, jumpInterval, inertion, mainControler) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.spX = speedX;
        this.spY = speedY;
        this.jumpInterval = [jumpInterval, jumpInterval];
        this.inertion = [inertion, inertion];
        this.go;
        this.isJump = false;
        this.jumpAvailable = true;
        this.mainControler = mainControler;
        setInterval(() => this.movePlayer(this.mainControler.keyPressed), 0.1);
        this.handMidleX;
        this.HandMidleY;

    }

    renderPlayer() {
      
        var Player = this.canvas.getContext("2d");
        Player.fillStyle = 'green';
        Player.fillRect(this.x, this.y, this.width, this.height);
        this.head(Player);
        this.hand(Player);

    }

    movePlayer() {

        this.keyPressed = this.mainControler.keyPressed;

        this.moveLeft(this.keyPressed);
        this.moveRight(this.keyPressed);
        this.jump(this.keyPressed);
        this.fall();

    }

    moveLeft(keysPressed) {

        if (keysPressed[65]) {
            if (this.x > this.spX) {
                this.x -= this.spX;

            }
            else {
                this.x = 0;
            }
        }

    }

    moveRight(keysPressed) {

        if (keysPressed[68]) {
            if (this.x < this.canvas.width - this.spX - this.width) {
                this.x += this.spX;
            }
            else {
                this.x = this.canvas.width - this.width;
            }
        }

    }

    fall() {
        if (!this.isJump) {

            if (this.y < this.canvas.height - this.height) {
                this.y += this.inertion[0];
                this.inertion[0] += 2 / 200;
            }
            else {
                this.y = this.canvas.height - this.height;
                this.jumpAvailable = true;
            }

        }
    }

    jump(keysPressed) {

        if (keysPressed[87] && this.jumpAvailable) {

            this.isJump = true;
            this.jumpAvailable = false;
            this.jumpInterval[0] = this.jumpInterval[1];
            this.inertion[0] = this.inertion[1];
            this.go = setInterval(() => this.goUp(), 1);

        }
    }

    goUp() {

        if (this.jumpInterval[0] > 0) {

            this.y -= this.inertion[0];

            if (this.inertion[0] > this.inertion[1] / this.jumpInterval[1]) {
                this.inertion[0] -= this.inertion[1] / this.jumpInterval[1];
            }

            this.jumpInterval[0]--;
        }
        else {

            clearInterval(this.go);
            this.isJump = false;
            this.jumpInterval[0] = this.jumpInterval[1];

        }
    }

    hand(Player) {

        this.handHeight = this.height / 1.5;
        this.handWidth = this.width / 3;
        this.handX = this.x + this.width / 2 - this.handWidth / 2;
        this.HandY = this.y;

        this.angle = this.calculateAngle(this.handX, this.HandY, this.mainControler.mouseX, this.mainControler.mouseY);
        this.calculateHandXY(this.handX, this.HandY, this.handWidth, this.handHeight, this.angle, Player);

        Player.save();
        Player.translate(this.handX + this.handWidth / 2, this.HandY + this.handHeight / 2);
        Player.rotate(this.angle * Math.PI / 180);
        Player.fillStyle = 'black';
        Player.fillRect(-this.handWidth / 2, -this.handHeight, this.handWidth, this.handHeight);
        Player.restore();


    }

    head(Player) {

        Player.beginPath();
        Player.arc(this.x + this.width / 2, this.y - this.height / 2, 50, 0, 2 * Math.PI);
        Player.fillStyle = 'red';
        Player.fill();
        Player.stroke();

    }

    calculateAngle(x1, y1, x2, y2) {

        this.angle = Math.atan((y1 - y2) / (x1 - x2)) * 180 / Math.PI - 90;
        if (x2 > x1) {
            this.angle += 180;
        }
        return this.angle;
    }

    calculateHandXY(x, y, width, height, angle) {

        var radians = (Math.PI / 180) * angle;
        this.handMidleX = x + height * Math.sin(radians) + width / 2;
        this.handMidleY = y - height * Math.cos(radians) + height / 2;
     
    }
}