class Keyboard {
  LEFT = false;
  RIGHT = false;
  SPACE = false;
  D = false;

  constructor() {
    this.addKeydownMovement();
    this.addKeyupMovement();
    this.addTouchMovement();
    this.addTouchJump();
    this.addTouchThrow();
  }

  addKeydownMovement() {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode === 39) this.RIGHT = true;
      if (event.keyCode === 37) this.LEFT = true;
      if (event.keyCode === 32) this.SPACE = true;
      if (event.keyCode === 68) this.D = true;
    });
  }
  
  addKeyupMovement() {
    window.addEventListener("keyup", (event) => {
      if (event.keyCode === 39) this.RIGHT = false;
      if (event.keyCode === 37) this.LEFT = false;
      if (event.keyCode === 32) this.SPACE = false;
      if (event.keyCode === 68) this.D = false;
    });
  }

  addTouchMovement() {
    let leftKey = document.getElementById("left-key");
    let rightKey = document.getElementById("right-key");

    leftKey.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });
    leftKey.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    rightKey.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    rightKey.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
  }

  addTouchJump() {
    let jumpKey = document.getElementById("jump-key");

    jumpKey.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    jumpKey.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
  }

  addTouchThrow() {
    let throwKey = document.getElementById("throw-key");

    throwKey.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.D = true;
    });
    throwKey.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.D = false;
    });
  }
}