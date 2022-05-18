export class controller {

  constructor(mouseX, mouseY) {

    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.keyPressed = {};

  }

  addKey(eventKey) {

    this.keyPressed[eventKey] = true;
  }

  removeKey(eventKey) {

    delete this.keyPressed[eventKey];

  }

}