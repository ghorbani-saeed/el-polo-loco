/**
 * Handles all user inputs via keyboard and touch screen.
 * Maps physical keys and on-screen buttons to game-specific actions.
 */
class Keyboard {
  /** @type {boolean} Indicates if the 'left' action is active */
  LEFT = false;
  /** @type {boolean} Indicates if the 'right' action is active */
  RIGHT = false;
  /** @type {boolean} Indicates if the 'jump' (Space) action is active */
  SPACE = false;
  /** @type {boolean} Indicates if the 'throw' (D) action is active */
  D = false;

  /**
   * Initializes the keyboard and touch listeners.
   */
  constructor() {
    this.addKeydownMovement();
    this.addKeyupMovement();
    this.addTouchMovement();
    this.addTouchJump();
    this.addTouchThrow();
  }

  /**
   * Adds a listener for 'keydown' events to set action states to true.
   * KeyCodes: 37 (Left), 39 (Right), 32 (Space), 68 (D).
   */
  addKeydownMovement() {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode === 39) this.RIGHT = true;
      if (event.keyCode === 37) this.LEFT = true;
      if (event.keyCode === 32) this.SPACE = true;
      if (event.keyCode === 68) this.D = true;
    });
  }

  /**
   * Adds a listener for 'keyup' events to set action states back to false.
   */
  addKeyupMovement() {
    window.addEventListener("keyup", (event) => {
      if (event.keyCode === 39) this.RIGHT = false;
      if (event.keyCode === 37) this.LEFT = false;
      if (event.keyCode === 32) this.SPACE = false;
      if (event.keyCode === 68) this.D = false;
    });
  }

  /**
   * Adds touch listeners for left and right movement buttons.
   * Fixes the 'Intervention' error by using { passive: false }.
   */
  addTouchMovement() {
    const setupTouch = (id, key) => {
      const element = document.getElementById(id);
      if (!element) return;
      element.addEventListener('touchstart', (e) => { if (e.cancelable) e.preventDefault(); this[key] = true; }, { passive: false });
      element.addEventListener('touchend', (e) => { if (e.cancelable) e.preventDefault(); this[key] = false; }, { passive: false });
    };

    setupTouch("left-key", "LEFT");
    setupTouch("right-key", "RIGHT");
  }

  /**
   * Adds touch listeners for the jump button.
   */
  addTouchJump() {
    let jumpKey = document.getElementById("jump-key");
    if (jumpKey) {
      jumpKey.addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        this.SPACE = true;
      }, { passive: false });
      jumpKey.addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        this.SPACE = false;
      }, { passive: false });
    }
  }

  /**
   * Adds touch listeners for the throw button.
   */
  addTouchThrow() {
    let throwKey = document.getElementById("throw-key");
    if (throwKey) {
      throwKey.addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        this.D = true;
      }, { passive: false });
      throwKey.addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        this.D = false;
      }, { passive: false });
    }
  }
}