import { canvas } from './classes/canvas.js'
import { Player } from './classes/Player.js'
import { config } from './classes/Config.js'
import { controller } from './classes/controller.js'
import { gun } from './classes/gun.js'
import { itembar } from './classes/itembar.js'

let mainCanvas;
let mainPlayer;
let mainConfig;
let mainController;
let mainGun;
let maintItembar;


init();


function init() {

    mainConfig = new config();
    mainController = new controller();
    mainCanvas = new canvas(mainConfig.mainBackground);
    mainPlayer = new Player(
        mainCanvas.canvas.width / 2,
        mainCanvas.canvas.height / 2,
        mainConfig.PlayerWidth,
        mainConfig.PlayerHeigh,
        mainCanvas.canvas,
        mainConfig.PlayerSpeedX,
        mainConfig.PlayerSpeedY,
        mainConfig.PlayerJumpInterval,
        mainConfig.inertion,
        mainController
    );
    mainGun = new gun( mainCanvas);
    maintItembar= new itembar(mainCanvas.canvas);

    

    setTimeout(() => window.requestAnimationFrame(animate), 1);

}

function animate() {

    mainCanvas.drawCanvas();
    mainPlayer.renderPlayer();
    mainGun.renderBullet(mainCanvas.context);
    maintItembar.renederItemBar();
    window.requestAnimationFrame(animate);
}

document.addEventListener('keydown', (event) => {

    mainController.addKey(event.keyCode);

});
document.addEventListener('keyup', (event) => {

    mainController.removeKey(event.keyCode);

});
document.addEventListener("mousemove", (event) => {

    mainController.mouseX = event.pageX;
    mainController.mouseY = event.pageY;

});
// document.addEventListener("click", (event) => {
  
//     if (event.buttons == 0 && event.buttons==0)
//         mainGun.shot(mainPlayer, mainController,"shotgun");

// });

document.addEventListener("mousedown", (event) => {
   
    if (event.button == 0 && event.buttons==1)
        mainGun.createBulletStart(mainPlayer, mainController,"singleGun");


});

document.addEventListener("mouseup", (event) => {

    mainGun.createBulletStop();

});

//document.addEventListener('contextmenu', event => event.preventDefault());
