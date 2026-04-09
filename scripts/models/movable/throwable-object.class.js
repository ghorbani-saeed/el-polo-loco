/**
 * Represents a bottle that can be thrown by the character.
 * Handles physics, rotation, and splash animations upon impact.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /** @type {number} Horizontal position */
  x = 400;
  /** @type {number} Vertical position */
  y = 330;
  /** @type {number} Width of the bottle */
  w = 60;
  /** @type {number} Height of the bottle */
  h = 60;

  /** @type {HTMLAudioElement} Sound played when the boss is hit */
  BOSS_HIT_SOUND = new Audio("assets/sounds/endboss_hit.mp3");

  /** @type {HTMLAudioElement} Sound played when the bottle splashes (FIXED) */
  SPLASH_SOUND = new Audio("assets/sounds/bottle_splash.mp3");

  /** @type {Object} Offset for collision detection */
  offset = {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  };

  /** @type {boolean} Flag to check if the bottle has hit something and is splashing */
  isSplash = false;

  /** @type {string[]} Animation frames for rotating bottle */
  IMAGES_ROTATE = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /** @type {string[]} Animation frames for bottle splash */
  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of ThrowableObject and starts its animation.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_ROTATE[0]);
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.animate();
  }

  /**
   * Links the world instance to this object to access global properties like sound settings.
   * @param {World} world - The game world instance.
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Starts the animation interval for the bottle.
   * Switches between rotation and splash animation based on the isSplash state.
   */
  animate() {
    this.intervals.push(
      setInterval(() => {
        if (this.isSplash) {
          this.playAnimation(this.IMAGES_SPLASH);
        } else {
          this.playAnimation(this.IMAGES_ROTATE);
        }
      }, 1000 / 20)
    );
  }

  /**
   * Triggers the throwing physics.
   * @param {number} x - The starting x-coordinate.
   * @param {boolean} direction - The direction of the throw (true = left, false = right).
   */
  throw(x, direction) {
    this.x = x;
    this.y = 160;
    this.speedY = 10;
    this.applyGravity();
    const multiplier = direction ? -1 : 1;

    this.intervals.push(
      setInterval(() => {
        if (!this.isSplash) this.x += 10 * multiplier;
      }, 30)
    );
  }

  /**
   * Plays the splash sound effect if the game is not muted and world is defined.
   */
  playSplashSound() {
    if (this.world && !this.world.isMute && this.SPLASH_SOUND) {
      this.SPLASH_SOUND.volume = 0.2;
      this.SPLASH_SOUND.play();
    }
  }

  /**
   * Activates the splash state and plays the corresponding sound.
   */
  splash() {
    if (!this.isSplash) {
      this.isSplash = true;
      this.playSplashSound();
    }
  }

  /**
   * Plays the sound effect for hitting the boss.
   */
  playBossHitSound() {
    if (this.world && !this.world.isMute && this.BOSS_HIT_SOUND) {
      this.BOSS_HIT_SOUND.volume = 0.2;
      this.BOSS_HIT_SOUND.play();
    }
  }
}