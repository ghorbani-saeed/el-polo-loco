/**
 * Class representing the game world.
 * Handles rendering, game logic, collision detection, sound, and animation loop.
 */
class World {
  /** Canvas rendering context */
  ctx;

  /** Canvas element for the game */
  canvas;

  /** Current camera X offset */
  camera = 0;

  /** Keyboard input handler */
  keyboard;

  /** Main character of the game */
  character;

  /** Current game level */
  level;

  /** Array of interval IDs used in the game */
  intervals = [];

  /** Current requestAnimationFrame ID */
  animationFrame;

  /** Flag indicating if the game is over */
  gameover = false;

  /** Flag indicating if the player has won */
  gameWin = false;

  /** Flag indicating if background sound is muted */
  isMute = false;

  /** Background music */
  BACKGROUND_SOUND;

  /** Game over sound */
  GAMEOVER_SOUND;

  /** Game win sound */
  WINGAME_SOUND;

  /**
   * Create a World instance.
   * Initializes canvas, keyboard, level, character, sounds, and starts the game loop.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = this.canvas.getContext("2d");
    this.animationFrame = null;
    this.character = new Character();
    this.level = new LevelOne();
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.gameInterval();
    this.setGameSounds();
  }

  /** Set the world reference for all game objects */
  setWorld() {
    this.setCharacterWorld();
    this.setEndbossWorld();
    this.setEnemiesWorld();
    this.setBottlesWorld();
    this.setCoinsWorld();
    this.setCloudsWorld();
  }

  /** Set world reference for the main character */
  setCharacterWorld() {
    this.character.setWorld(this);
  }

  /** Set world reference for the endboss */
  setEndbossWorld() {
    this.level.endboss.setWorld(this);
  }

  /** Set world reference for all enemies */
  setEnemiesWorld() {
    for (const enemy of this.level.enemies) enemy.setWorld(this);
  }

  /** Set world reference for all bottles */
  setBottlesWorld() {
    for (const bottle of this.level.bottles) bottle.setWorld(this);
  }

  /** Set world reference for all coins */
  setCoinsWorld() {
    for (const coin of this.level.coins) coin.setWorld(this);
  }

  /** Set world reference for all clouds */
  setCloudsWorld() {
    for (const cloud of this.level.clouds) cloud.setWorld(this);
  }

  /** Initialize all game sounds */
  setGameSounds() {
    this.setBackgroundSound();
    this.setGameOverSound();
    this.setWinGameSound();
  }

  /** Initialize background music */
  setBackgroundSound() {
    this.BACKGROUND_SOUND = new Audio("assets/sounds/background-music.mp3");
    this.BACKGROUND_SOUND.volume = 0.02;
  }

  /** Initialize game over sound */
  setGameOverSound() {
    this.GAMEOVER_SOUND = new Audio("assets/sounds/game-over.mp3");
    this.GAMEOVER_SOUND.volume = 0.1;
  }

  /** Initialize game win sound */
  setWinGameSound() {
    this.WINGAME_SOUND = new Audio("assets/sounds/win.mp3");
    this.WINGAME_SOUND.volume = 0.1;
  }

  /** Start collision detection loop for all game objects */
  checkCollisions() {
    this.intervals.push(
      setInterval(() => {
        this.checkCharacterEndbossCollision();
        this.checkCharacterEnemiesCollision();
        this.checkCharacterCoinsCollision();
        this.checkCharacterBottlesCollision();
        this.checkEndbossThrowableCollision();
        this.checkThrowableEnemiesCollision();
      }, 200)
    );
  }

  /** Check collision between character and endboss */
  checkCharacterEndbossCollision() {
    const endboss = this.level.endboss;
    if (
      this.character.isColliding(endboss) &&
      endboss.energy >= 0 &&
      !this.character.isDead()
    ) {
      this.character.hit();
      endboss.attack();
      this.level.healthStatusBar.setPersentage(this.character.energy);
    }
  }

  /** Check collisions between character and all enemies */
  checkCharacterEnemiesCollision() {
    for (const enemy of this.level.enemies) {
      if (
        this.character.isColliding(enemy) &&
        enemy.energy > 0 &&
        !this.character.isDead()
      ) {
        this.character.hit();
        this.level.healthStatusBar.setPersentage(this.character.energy);
      }
    }
  }

  /** Check collisions between character and coins */
  checkCharacterCoinsCollision() {
    for (const coin of this.level.coins) {
      if (this.character.isColliding(coin) && coin.checkCoinIsNotPicked()) {
        this.character.getCoin();
        coin.coinIsPick();
        this.level.coinStatusBar.setPersentage(this.character.coins);
      }
    }
  }

  /** Check collisions between character and bottles */
  checkCharacterBottlesCollision() {
    for (const bottle of this.level.bottles) {
      if (
        this.character.isColliding(bottle) &&
        bottle.checkBottleIsNotPicked()
      ) {
        this.character.getBottle();
        bottle.bottleIsPick();
        this.level.bottleStatusBar.setPersentage(this.character.bottles);
      }
    }
  }

  /** Check collisions between endboss and throwable objects */
  checkEndbossThrowableCollision() {
    for (const throwableObject of this.level.throwableObjects) {
      const endboss = this.level.endboss;
      if (
        endboss.isColliding(throwableObject) &&
        throwableObject.isSplash === false
      ) {
        throwableObject.splash();
        endboss.hit();
        this.level.endbossStatusBar.setPersentage(endboss.energy);
      }
    }
  }

 checkThrowableEnemiesCollision() {
  for (const throwableObject of this.level.throwableObjects) {
    for (const enemy of this.level.enemies) {
      if (
        enemy.isColliding(throwableObject) &&
        throwableObject.isSplash === false
      ) {
        throwableObject.splash();
        enemy.hit();
      }
    }
  }
}

  /** Toggle the background sound on or off */
  toggleBackgroundSound() {
    if (this.isMute) {
      this.playBackgroundSound();
      this.isMute = false;
    } else {
      this.pauseBackgroundSound();
      this.character.stopAllSound();
      this.isMute = true;
    }
  }

  /** Reset game over and game win flags */
  resetGameOverAndWinStatus() {
    this.gameover = false;
    this.gameWin = false;
  }

  /** Mute the background sound */
  muteBackgroundSound() {
    this.pauseBackgroundSound();
    this.isMute = true;
  }

  /** Play the background music */
  playBackgroundSound() {
    if (this.BACKGROUND_SOUND) {
      this.BACKGROUND_SOUND.play();
    }
  }

  /** Pause the background music */
  pauseBackgroundSound() {
    if (this.BACKGROUND_SOUND) {
      this.BACKGROUND_SOUND.pause();
    }
  }

  /** Stop the background music and reset it */
  stopBackgroundSound() {
    if (this.BACKGROUND_SOUND) {
      this.BACKGROUND_SOUND.pause();
      this.BACKGROUND_SOUND.currentTime = 0;
      this.BACKGROUND_SOUND = null;
    }
  }

  /** Play the game over sound */
  startGameOverSound() {
    if (this.GAMEOVER_SOUND) {
      this.GAMEOVER_SOUND.play();
      this.GAMEOVER_SOUND.currentTime = 0;
      this.GAMEOVER_SOUND = null;
    }
  }

  /** Play the game win sound */
  startWinGameSound() {
    if (this.WINGAME_SOUND) {
      this.WINGAME_SOUND.play();
      this.WINGAME_SOUND.currentTime = 0;
      this.WINGAME_SOUND = null;
    }
  }

  /** Start the main game logic interval */
  gameInterval() {
    this.intervals.push(
      setInterval(() => {
        this.character.checkKillEnemy();
        this.character.reachToDangerArea();
        this.character.checkCharacterIsDead();
        this.level.endboss.checkEndBossIsDead();
      }, 10)
    );
  }

  /** Main draw loop for rendering the game */
  draw() {
    this.clearCanvas();
    this.ctx.translate(this.camera, 0);
    this.drawBackgrounds();
    if (!this.gameover && !this.gameWin) {
      this.drawGameObjects();
      this.drawStatus();
    }
    if (this.gameover) this.handleGameOver();
    if (this.gameWin) this.handleGameWin();
    this.ctx.translate(-this.camera, 0);
    this.setRequestAnimationFrame();
  }

  /** Clear the entire canvas */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Draw background layers */
  drawBackgrounds() {
    this.addMultipleObjectToMap(this.level.backgrounds);
  }

  /** Draw coins, bottles, enemies, clouds, endboss, character, and throwable objects */
  drawGameObjects() {
    this.addMultipleObjectToMap(this.level.coins);
    this.addMultipleObjectToMap(this.level.bottles);
    this.addMultipleObjectToMap(this.level.enemies);
    this.addMultipleObjectToMap(this.level.clouds);
    this.addToMap(this.level.endboss);
    this.addToMap(this.character);
    this.addMultipleObjectToMap(this.level.throwableObjects);
  }

  /** Draw all status bars */
  drawStatus() {
    this.addToMap(this.level.healthStatusBar);
    this.addToMap(this.level.coinStatusBar);
    this.addToMap(this.level.bottleStatusBar);
    this.addToMap(this.level.endbossStatusBar);
  }

  /** Handle rendering and sound when the game is over */
  handleGameOver() {
    showGameOverScreen();
    if (!this.isMute) this.startGameOverSound();
    this.stopAllGamePlay();
  }

  /** Handle rendering and sound when the game is won */
  handleGameWin() {
    showGameWinScreen();
    if (!this.isMute) this.startWinGameSound();
    this.stopAllGamePlay();
  }

  /** Request the next animation frame if the game is still running */
  setRequestAnimationFrame() {
    if (!this.gameover && !this.gameWin) {
      let self = this;
      this.animationFrame = requestAnimationFrame(() => self.draw());
    }
  }

  /**
   * Add multiple game objects to the canvas
   * @param {Array} objects - Array of objects with a draw method
   */
  addMultipleObjectToMap(objects) {
    for (const object of objects) this.addToMap(object);
  }

  /**
   * Draw a single object on the canvas, handling camera and flipping
   * @param {Object} mo - The movable object to draw
   */
  addToMap(mo) {
    if (mo.fixInContext === true) {
      this.ctx.translate(-this.camera, 0);
    }

    this.flipImage(mo);
    mo.drawImage(this.ctx);
    // Optional debugging: draw hitboxes Frames
    // mo.drawFrame(this.ctx);
    // mo.drawFrameOffset(this.ctx);
    this.flipImageBack(mo);

    if (mo.fixInContext === true) {
      this.ctx.translate(this.camera, 0);
    }
  }

  /**
   * Flip the object horizontally if it is facing the opposite direction
   * @param {Object} mo - The movable object to flip
   */
  flipImage(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.w, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  }

  /**
   * Restore the canvas after flipping the object
   * @param {Object} mo - The movable object to restore
   */
  flipImageBack(mo) {
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  /** Stop all ongoing gameplay: sounds, animation, and intervals */
  stopAllGamePlay() {
    this.stopBackgroundSound();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.clearAllIntervals();
  }

  /** Clear all intervals for the world, character, and all level objects */
  clearAllIntervals() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
    this.character.clearAllInterval();
    this.level.clearEndBossInterval();
    this.level.clearEnemiesInterval();
    this.level.clearCloudsInterval();
    this.level.clearCoinsInterval();
  }
}
