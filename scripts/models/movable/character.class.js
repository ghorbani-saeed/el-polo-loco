/**
 * Class representing the main playable character.
 * Extends MovableObject.
 */
class Character extends MovableObject {
  /** X position of the character */
  x = 100;
  /** Y position of the character */
  y = 200;
  /** Width of the character */
  w = 130;
  /** Height of the character */
  h = 220;
  /** Movement speed */
  speed = 8;
  /** Character's current health */
  energy = 100;
  /** Collected coins in percentage */
  coins = 0;
  /** Collected bottles in percentage */
  bottles = 0;
  /** Flag indicating if the character is throwing a bottle */
  isThrowingBottle = false;
  /** Coin increment per pickup */
  coinsToAdded = 0;
  /** Bottle increment per pickup */
  bottlesToAdded = 0;
  /** Energy lost per hit */
  energyToRemove = 5;
  /** Flag indicating if the character reached the danger area */
  reachedToDangerArea = false;

  /** Collision offsets for more accurate detection */
  offset = {
    right: 20,
    left: 20,
    top: 70,
    bottom: 10,
  };

  /** Idle animation images */
  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** Long idle animation images */
  IMAGES_LONG_IDLE = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** Walking animation images */
  IMAGES_WALK = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /** Jump animation images */
  IMAGES_JUMP = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  /** Hurt animation images */
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** Dead animation images */
  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
  ];

  /** Sleep sound effect */
  SLEEP_SOUND;
  /** Hurt sound effect */
  HURT_SOUND;
  /** Death sound effect */
  DEAD_SOUND;
  /** Counter to ensure death sound plays only once */
  DEAD_SOUND_PLAY_COUNT = 1;

  /**
   * Create a Character instance.
   * Initializes images, sounds, animation, movement, gravity, and intervals.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_IDLE[0]);
    this.loadAllImages();
    this.animate();
    this.move();
    this.applyGravity();
    this.setSounds();
  }

  /** Load and set all sound effects */
  setSounds() {
    this.SLEEP_SOUND = new Audio("assets/sounds/sleeping.mp3");
    this.SLEEP_SOUND.volume = 0.1;
    this.HURT_SOUND = new Audio("assets/sounds/character-hurt-sound.mp3");
    this.HURT_SOUND.volume = 0.1;
    this.DEAD_SOUND = new Audio("assets/sounds/character-death.ogg");
    this.DEAD_SOUND.volume = 0.1;
    this.DEAD_SOUND.loop = false;
  }

  /** Load all animation image sets */
  loadAllImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Assign the world reference and calculate increments for coins/bottles.
   * @param {World} world - The game world instance
   */
  setWorld(world) {
    this.world = world;
    this.coinsToAdded = 100 / this.world.level.coins.length;
    this.bottlesToAdded = 100 / this.world.level.bottles.length;
  }

  /** Increase coin count */
  getCoin() {
    this.coins += this.coinsToAdded;
  }

  /** Increase bottle count */
  getBottle() {
    this.bottles += this.bottlesToAdded;
  }

  /** Check if the character is currently moving left or right */
  isMoving() {
    return (
      this.world.keyboard.RIGHT === true || this.world.keyboard.LEFT === true
    );
  }

  /**
   * Check if the character can kill an enemy by jumping on it
   * @param {MovableObject} mo - The enemy object
   * @returns {boolean} True if the enemy can be killed
   */
  isKillEnemy(mo) {
    const horizontalOverlap =
      this.x + this.w - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.w - mo.offset.right;
    const heightDifferent =
      mo.y + mo.h - mo.offset.bottom - (this.y + this.h - this.offset.bottom);
    const isPushing = heightDifferent < 60 && heightDifferent > 30;
    return (
      horizontalOverlap &&
      isPushing &&
      !this.world.keyboard.SPACE &&
      mo.energy > 0
    );
  }

  /** Trigger endboss movement when player reaches danger area */
  reachToDangerArea() {
    if (this.x > this.world.level.gameDangerArea && !this.reachedToDangerArea) {
      this.reachedToDangerArea = true;
      this.world.level.endboss.moving = true;
    }
  }

  /** Check if the character is dead and trigger game over after delay */
  checkCharacterIsDead() {
    if (this.isDead()) {
      setTimeout(() => {
        this.world.gameover = true;
      }, 2000);
    }
  }

  /**
   * Check if character has been inactive for more than 10 seconds
   * @returns {boolean} True if character is sleeping
   */
  isSleeping() {
    let timePassed = new Date().getTime() - this.lastMove; //In miliseconds
    timePassed = timePassed / 1000; //In seconds
    return timePassed > 10;
  }

  /** Play sleep sound if game is not muted */
  playSleepSound() {
    this.HURT_SOUND.pause();
    if (this.world.isMute === false) {
      this.SLEEP_SOUND.play();
    }
  }

  /** Play hurt sound if game is not muted */
  playHurtSound() {
    this.SLEEP_SOUND.pause();
    if (this.world.isMute === false) {
      this.HURT_SOUND.play();
    }
  }

  /** Play death sound once if game is not muted */
  playDeadSound() {
    this.SLEEP_SOUND.pause();
    this.HURT_SOUND.pause();

    if (this.DEAD_SOUND_PLAY_COUNT === 1 && this.world.isMute === false) {
      this.DEAD_SOUND_PLAY_COUNT++;
      this.DEAD_SOUND.play();
    }
  }

  /** Stop all character-related sounds */
  stopAllSound() {
    this.SLEEP_SOUND.pause();
    this.HURT_SOUND.pause();
    this.DEAD_SOUND.pause();
  }

  /** Animate the character based on state */
  animate() {
    this.intervals.push(
      setInterval(() => {
        switch (true) {
          case this.isDead():
            this.playAnimation(this.IMAGES_DEAD, true);
            this.playDeadSound();
            break;
          case this.isHurt():
            this.playAnimation(this.IMAGES_HURT);
            this.playHurtSound();
            break;
          case this.isAboveGround():
            this.playAnimation(this.IMAGES_JUMP);
            this.stopAllSound();
            break;
          case this.isMoving():
            this.playAnimation(this.IMAGES_WALK);
            this.stopAllSound();
            break;
          case this.isSleeping():
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.playSleepSound();
            break;
          default:
            this.playAnimation(this.IMAGES_IDLE);
            this.stopAllSound();
            break;
        }
      }, 1000 / 10) // Run animation updates at 10 frames per second
    );
  }

  /**
   * Can character move right within boundary?
   * @returns {boolean} True if RIGHT key pressed and within limit
   */
  canMoveRight() {
    return (
      this.world.keyboard.RIGHT === true &&
      this.x < this.world.level.gameEndPosition + 500
    );
  }

  /**
   * Can character move left within boundary?
   * @returns {boolean} True if LEFT key pressed and within limit
   */
  canMoveLeft() {
    return (
      this.world.keyboard.LEFT === true &&
      this.x > this.world.level.gameStartPosition
    );
  }

  /**
   * Can character jump (only on ground)?
   * @returns {boolean} True if SPACE pressed and on ground
   */
  canJump() {
    return this.world.keyboard.SPACE === true && !this.isAboveGround();
  }

  /**
   * Can character throw a bottle?
   * @returns {boolean} True if D pressed, bottles available, not throwing
   */
  canThrowBottle() {
    return (
      this.world.keyboard.D === true &&
      this.bottles > 0 &&
      !this.isThrowingBottle
    );
  }

  /** Move character to the right if possible */
  handleMoveRight() {
    if (this.canMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
    }
  }

  /** Move character to the left if possible */
  handleMoveLeft() {
    if (this.canMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /** Make the character jump if possible  */
  handleJump() {
    if (this.canJump()) {
      this.jump();
    }
  }

  /** Throw a bottle if possible and update game state  */
  handleThrowBottle() {
    if (this.canThrowBottle()) {
      this.isThrowingBottle = true;
      const throwableObject = new ThrowableObject();
      throwableObject.throw(this.x + 50);
      throwableObject.setWorld(this.world);
      this.world.level.throwableObjects.push(throwableObject);
      this.bottles -= this.bottlesToAdded;
      this.world.level.bottleStatusBar.setPersentage(this.bottles);
      setTimeout(() => {
        this.isThrowingBottle = false;
      }, 1000);
    }
  }

  /** Handle character death animation  */
  handleDeath() {
    if (this.isDead()) {
      setTimeout(() => {
        this.y += 10;
      }, 1000);
    }
  }

  /** Handle character camera movement  */
  handleCamera() {
    if (this.x < this.world.level.gameEndPosition) {
      this.world.camera = -this.x + 100;
    }
  }

  /** Character movements  */
  move() {
    this.intervals.push(
      setInterval(() => {
        this.handleMoveRight();
        this.handleMoveLeft();
        this.handleJump();
        this.handleThrowBottle();
        this.handleDeath();
        this.handleCamera();
      }, 1000 / 60)
    );
  }

  /** Check if any enemies are killed by the player and handle their death  */
  checkKillEnemy() {
    for (const enemy of this.world.level.enemies) {
      if (this.isKillEnemy(enemy) && enemy.energy > 0) {
        enemy.energy = 0;
        enemy.playDeadSound();
      }
    }
  }

  /** Clear all active intervals and reset the intervals array  */
  clearAllInterval() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }
}
