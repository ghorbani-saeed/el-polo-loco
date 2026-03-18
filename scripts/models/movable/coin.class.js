/**
 * Class representing a coin collectible.
 * Extends MovableObject.
 */
class Coin extends MovableObject {
  /** Y position of the coin */
  y = 140;
  /** Width of the coin */
  w = 100;
  /** Height of the coin */
  h = 100;

  /** Collision offsets */
  offset = {
    right: 30,
    left: 30,
    top: 30,
    bottom: 30,
  };

  /** Whether the coin has been picked */
  pick = false;

  /** Images for the coin animation */
  IMAGES = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];

  /** Sound effect for picking up the coin */
  COIN_PICKUP_SOUND;

  /**
   * Create a Coin instance.
   * Initializes images, animation, and sound.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.animate();
    this.setSounds();
  }

  /**
   * Assign the game world reference and set a random X position.
   * @param {Object} world - The game world instance
   * @returns {void}
   */
  setWorld(world) {
    this.world = world;
    let maximumPosition =
      this.world.level.gameEndPosition - this.world.level.endboss.w;
    this.x = 400 + Math.random() * maximumPosition;
  }

  /**
   * Initialize the coin pickup sound.
   * @returns {void}
   */
  setSounds() {
    this.COIN_PICKUP_SOUND = new Audio("assets/sounds/coin-pickup.mp3");
    this.COIN_PICKUP_SOUND.volume = 0.1;
  }

  /**
   * Animate the coin by looping through its images.
   * @returns {void}
   */
  animate() {
    this.intervals.push(
      setInterval(() => {
        this.playAnimation(this.IMAGES);
      }, 1000 / 5)
    );
  }

  /**
   * Play the coin pickup sound if the game is not muted.
   * @returns {void}
   */
  playPickupSound() {
    if (this.world.isMute === false) {
      this.COIN_PICKUP_SOUND.play();
    }
  }

  /**
   * Handle the coin being picked:
   * mark as picked, play sound, and animate disappearance.
   * @returns {void}
   */
  coinIsPick() {
    this.pick = true;
    this.playPickupSound();
    this.intervals.push(
      setInterval(() => {
        if (this.w > 0) {
          this.y--;
          this.w--;
          this.h--;
        }
      }, 0.5)
    );
  }

  /**
   * Check if the coin has not been picked yet.
   * @returns {boolean} true if coin is not picked
   */
  checkCoinIsNotPicked() {
    return this.pick === false;
  }
}
