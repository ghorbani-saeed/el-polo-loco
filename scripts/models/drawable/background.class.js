/**
 * Class representing a background in the game.
 * Extends DrawableObject to allow rendering on the canvas.
 */
class Background extends DrawableObject {
  /** Width of the background */
  w = 720;

  /** Height of the background */
  h = 480;

  /** Y position of the background (fixed at 0) */
  y = 0;

  /**
   * Create a Background instance.
   * Initializes the background object with a given image and X position.
   *
   * @param {string} path - Path to the background image.
   * @param {number} positionX - Initial X position of the background.
   */
  constructor(path, positionX) {
    super();
    this.x = positionX;
    this.loadImage(path);
  }
}
