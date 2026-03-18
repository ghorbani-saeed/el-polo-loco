class MovableObject extends DrawableObject {
  /** Horizontal movement speed */
  speed = 1;
  /** Vertical speed */
  speedY = 0;
  /** Acceleration applied by gravity */
  acceleration = 2;
  /** Flag to indicate if the object is facing the opposite direction */
  otherDirection = false;
  /** Timestamp of the last time the object was hit */
  lastHit;
  /** Reference to the game world */
  world;
  /** Flag indicating whether the object is dead */
  dead = false;
  /** Timestamp of the last movement */
  lastMove = new Date().getTime();
  /** Array of active interval IDs for animations or movement */
  intervals;

  /** Constructor: initialize the object and intervals array */
  constructor() {
    super();
    this.intervals = [];
  }

  /**
   * Check if this object is colliding with another object
   * @param {Object} mo - Another object to check collision with
   * @return {boolean} true if colliding
   */
  isColliding(mo) {
    return (
      this.x + this.w - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.h - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.w - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.h - mo.offset.bottom
    );
  }

  /** Apply gravity to the object */
  applyGravity() {
    this.intervals.push(
      setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 25)
    );
  }

  /**
   * Check if the object is above the ground
   * @return {boolean} true if above ground
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 200;
    }
  }

  /** Apply a hit to the object, reducing energy */
  hit() {
    this.energy -= this.energyToRemove;

    if (this.energy <= 0) {
      this.dead = true;
      this.energy = 0;
      this.currentImage = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Check if the object is recently hurt
   * @return {boolean} true if hurt within the last second
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // In milliseconds
    timePassed = timePassed / 1000; // In seconds
    return timePassed < 1;
  }

  /**
   * Check if the object is dead
   * @return {boolean} true if dead
   */
  isDead() {
    return this.dead;
  }

  /** Move the object to the right */
  moveRight() {
    this.x += this.speed;
    this.lastMove = new Date().getTime();
  }

  /** Move the object to the left */
  moveLeft() {
    this.x -= this.speed;
    this.lastMove = new Date().getTime();
  }

  /** Make the object jump */
  jump() {
    this.speedY = 25;
    this.lastMove = new Date().getTime();
  }

  /**
   * Play animation from an array of images
   * @param {Array} images - Array of image paths
   * @param {boolean} [oneTime=false] - Whether to play animation only once
   */
  playAnimation(images, oneTime = false) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    if (!oneTime) {
      this.currentImage++;
    } else {
      if (this.currentImage !== images.length - 1) {
        this.currentImage++;
      }
    }
  }

  /** Clear all active intervals */
  clearAllInterval() {
    this.intervals.forEach((id) => clearAllInterval(id));
    this.intervals = [];
  }
}
