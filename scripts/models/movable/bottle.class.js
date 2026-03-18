/**
 * Class representing a bottle in the game.
 * Can be picked up by the character, plays a sound, and animates when collected.
 * Extends MovableObject.
 */
class Bottle extends MovableObject {
  /** Y position of the bottle */
  y = 360;

  /** Width of the bottle */
  w = 60;

  /** Height of the bottle */
  h = 60;

  /** Collision offsets for more precise hit detection */
  offset = {
    right: 20,
    left: 30,
    top: 0,
    bottom: 0,
  };

  /** Flag indicating if the bottle has been picked */
  pick = false;

  /** Array of bottle images */
  IMAGES = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /** Sound played when the bottle is picked */
  BOTTLE_PICKUP_SOUND;

  /**
   * Create a Bottle object.
   * Initializes images, sounds, and sets up the object.
   */
  constructor() {
    super();
    let imageIndex = this.getRandomImageIndex(2);
    this.loadImage(this.IMAGES[imageIndex]);
    this.loadImages(this.IMAGES);
    this.setSounds();
  }

  /** Set up the sound effects for the bottle */
  setSounds() {
    this.BOTTLE_PICKUP_SOUND = new Audio("assets/sounds/bottle-pickup.mp3");
    this.BOTTLE_PICKUP_SOUND.volume = 0.1;
  }

  /**
   * Assign the world reference and set a random X position for the bottle.
   * @param {World} world - The game world instance
   */
  setWorld(world) {
    this.world = world;
    let maximumPosition =
      this.world.level.gameEndPosition - this.world.level.endboss.w;
    this.x = 400 + Math.random() * maximumPosition;
  }

  /** Play the pickup sound if the game is not muted */
  playPickupSound() {
    if (this.world.isMute === false) {
      this.BOTTLE_PICKUP_SOUND.play();
    }
  }

  /**
   * Mark the bottle as picked and start its pickup animation.
   * Moves the bottle up and then hides it.
   */
  bottleIsPick() {
    this.pick = true;
    this.playPickupSound();

    this.intervals.push(
      setInterval(() => {
        this.y -= 2;
        setTimeout(() => {
          this.w = 0;
          this.h = 0;
        }, 70);
      }, 1)
    );
  }

  /**
   * Check if the bottle has not been picked up yet.
   * @returns {boolean} True if the bottle is still available to pick
   */
  checkBottleIsNotPicked() {
    return this.pick === false;
  }
}
