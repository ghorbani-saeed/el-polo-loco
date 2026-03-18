/**
 * Class representing the keyboard and touch input controls for the game.
 * Tracks key states and initializes event listeners for both keyboard and touch.
 */
class Keyboard {
  /** Whether the left movement key is pressed */
  LEFT = false;

  /** Whether the right movement key is pressed */
  RIGHT = false;

  /** Whether the jump key (space) is pressed */
  SPACE = false;

  /** Whether the action key (D) is pressed */
  D = false;

  /**
   * Create a Keyboard instance.
   * Initializes event listeners for key presses and touch controls.
   */
  constructor() {
    this.addKeydownMovement();
    this.addKeyupMovement();
    this.addTouchMovement();
    this.addTouchJump();
    this.addTouchThrow();
  }

  /**
   * Add event listeners for keydown events to update key states.
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
   * Add event listeners for keyup events to reset key states.
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
   * Add touch controls for left/right movement buttons.
   * @remarks Expects elements with IDs "left-key" and "right-key".
   */
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

  /**
   * Add touch control for jump action.
   * @remarks Expects an element with ID "jump-key".
   */
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

  /**
   * Add touch control for throw/action action.
   * @remarks Expects an element with ID "throw-key".
   */
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
