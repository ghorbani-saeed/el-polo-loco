/**
 * Class representing a cloud in the background.
 * Extends MovableObject.
 */
class Cloud extends MovableObject {
  /** Y position of the cloud */
  y = 30;
  /** Width of the cloud */
  w = 450;
  /** Height of the cloud */
  h = 350;
  /** Movement speed of the cloud */
  speed = 0.15;

  /** Array of cloud images for variation */
  IMAGES = [
    "assets/img/5_background/layers/4_clouds/1.png",
    "assets/img/5_background/layers/4_clouds/2.png",
  ];

  /**
   * Create a Cloud instance at a specific X position.
   * @param {number} x - Initial X position of the cloud
   */
  constructor(x) {
    super();
    this.x = x;
    let imageIndex = this.getRandomImageIndex(2);
    this.loadImage(this.IMAGES[imageIndex]);
    this.loadImages(this.IMAGES);
    this.move();
  }

  /**
   * Assign the game world reference.
   * @param {Object} world - The game world instance
   * @returns {void}
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Start moving the cloud to the left continuously.
   * @returns {void}
   */
  move() {
    this.intervals.push(
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60)
    );
  }
}
