export class gun {

    constructor(Canvas) {

        this.mag = [];
        this.damage;
        this.bulletSpeed = 5;
        this.bulletIndex = 0;
        this.radius = 7;
        this.createBulletInterval;


        this.moveBulletInterval = setInterval(() => {
            this.moveBullet(Canvas)
        }, 0.1);

    }

    createBulletStart(Player, controller, gunType) {
        this.shot(Player, controller, gunType);
        this.createBulletInterval = setInterval(() => {
            this.shot(Player, controller, gunType);
        }, 200);
    }

    createBulletStop() {
        clearInterval(this.createBulletInterval);
    }



    shot(Player, controller, gunType) {
        // let angle = this.calculateAngle(controller.mouseX, controller.mouseY, Player.handMidleX, Player.handMidleY);

        if (gunType === "shotgun") {

            this.createBulletShotgun(Player, controller, 8);
            this.createBulletShotgun(Player, controller, 4);
            this.createBulletShotgun(Player, controller, 0);
            this.createBulletShotgun(Player, controller, -4);
            this.createBulletShotgun(Player, controller, -8);

        }
        if (gunType === "singleGun") {
            this.createBulletShotgun(Player, controller, 0);
        }
    }

    createBulletShotgun(Player, controller, bulletAngle) {

        this.XY = this.calculateHandShotGunBullets(controller.mouseX, controller.mouseY, Player.handMidleX, Player.handMidleY, bulletAngle);
        this.stepXY = this.calculateStepForBullet(Player.handMidleX, Player.handMidleY, this.XY[0], this.XY[1], this.bulletSpeed);
        this.mag.push([]);
        this.mag[this.bulletIndex].push(Player.handMidleX, Player.handMidleY, this.radius, this.stepXY[0], this.stepXY[1]);
        this.bulletIndex++;

    }


    calculateHandShotGunBullets(x2, y2, x, y, angle) {
        let XY = [];
        let radians = (Math.PI / 180) * angle;
        XY.push((x2 - x) * Math.cos(radians) - (y2 - y) * Math.sin(radians) + x);
        XY.push((x2 - x) * Math.sin(radians) + (y2 - y) * Math.cos(radians) + y);
        XY.push(x);
        XY.push(y);
        return XY;

    }

    renderBullet(Canvas) {


        for (let i = 0; i < this.mag.length; i++) {
            let item = this.mag[i];
            for (let j = 0; j < item.length; j++) {

                Canvas.beginPath();
                Canvas.arc(item[0], item[1], item[2], 0, 2 * Math.PI);
                Canvas.fillStyle = 'yellow';
                Canvas.fill();


            }
        }
    }

    moveBullet(Canvas) {

        let length = this.mag.length;

        for (let i = 0; i < length; i++) {
            let item = this.mag[i];

            item[0] += item[3];
            item[1] += item[4];

            if ((item[0] > Canvas.canvas.width || item[0] < 0) && item[0] != undefined) {
                this.mag.splice(i, 1);
                this.bulletIndex = this.mag.length;
                length--;
                i--;

            }
            else if ((item[1] > Canvas.canvas.height || item[1] < 0) && item[1] != undefined) {
                this.mag.splice(i, 1);
                this.bulletIndex = this.mag.length;
                length--;
                i--;
            }
        }
    }

    calculateDiagonal(poinOneX, pointOneY, pointTwoX, pointTwoY) {

        let line = Math.sqrt((pointTwoX - poinOneX) * (pointTwoX - poinOneX) + (pointTwoY - pointOneY) * (pointTwoY - pointOneY));
        return line;

    }

    calculateAngle(poinOneX, pointOneY, pointTwoX, pointTwoY) {

        let angle = Math.atan((pointOneY - pointTwoY) / (poinOneX - pointTwoX)) * 180 / Math.PI - 90;
        if (pointTwoX > poinOneX) {
            angle += 180;
        }

        return angle;
    }

    calculateStepForBullet(poinOneX, pointOneY, pointTwoX, pointTwoY, bullSpeed) {


        let stepXY = [];

        let x = Math.pow(bullSpeed, 2) / (1 + Math.pow(pointTwoY - pointOneY, 2) / Math.pow(pointTwoX - poinOneX, 2));
        let y = Math.pow(bullSpeed, 2) / (1 + Math.pow(pointTwoX - poinOneX, 2) / Math.pow(pointTwoY - pointOneY, 2));

        if (poinOneX < pointTwoX) {
            stepXY.push(Math.sqrt(x));
        }
        else {
            stepXY.push(-Math.sqrt(x));
        }

        if (pointOneY < pointTwoY) {
            stepXY.push(Math.sqrt(y));
        }
        else {
            stepXY.push(-Math.sqrt(y));
        }


        console.log(stepXY[0], stepXY[1]);
        return stepXY;
    }

}