/**
 * Represents a background layer in the game world.
 * Inherits from DrawableObject to handle image rendering.
 * @extends DrawableObject
 */
class Background extends DrawableObject {
  /** @type {number} The width of the background image (default is canvas width) */
  w = 720;

  /** @type {number} The height of the background image (default is canvas height) */
  h = 480;

  /** @type {number} The vertical position of the background */
  y = 0;

  /**
   * Creates an instance of a Background object.
   * @param {string} path - The file path to the background image.
   * @param {number} positionX - The horizontal starting position on the x-axis.
   */
  constructor(path, positionX) {
    super();
    
    /** @type {number} The horizontal position, determined by the index of the background section */
    this.x = positionX;
    
    this.loadImage(path);
  }
}