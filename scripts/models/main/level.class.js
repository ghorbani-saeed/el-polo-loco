/**
 * Class representing a game level.
 * Handles all game objects, backgrounds, status bars, and intervals for a level.
 */
class Level {
  /** Endboss object of the level */
  endboss;

  /** Array of all enemy objects (hens und chicks) */
  enemies = [];

  /** Array of all cloud objects */
  clouds = [];

  /** Array of all background objects */
  backgrounds = [];

  /** Array of all coin objects */
  coins = [];

  /** Array of all bottle objects */
  bottles = [];

  /** Array of throwable objects */
  throwableObjects = [];

  /** Player's health status bar */
  healthStatusBar;

  /** Player's coin status bar */
  coinStatusBar;

  /** Player's bottle status bar */
  bottleStatusBar;

  /** Endboss health status bar */
  endbossStatusBar;

  /** Starting X position of the game world */
  gameStartPosition;

  /** Ending X position of the game world */
  gameEndPosition;

  /** Position representing the danger area in the game world */
  gameDangerArea;

  /** Initialize the endboss object */
  setEndboss() {
    this.endboss = new Endboss();
  }

  /** Initialize all enemies (hens and chicks) in the game */
  setEnemies() {
    for (let i = 1; i <= this.HENS_COUNT; i++) this.enemies.push(new Hen());
    for (let i = 1; i <= this.CHICKS_COUNT; i++) this.enemies.push(new Chick());
  }

  /** Initialize all coins in the game */
  setCoins() {
    for (let i = 1; i <= this.COINS_COUNT; i++) this.coins.push(new Coin());
  }

  /** Initialize all bottles in the game */
  setBottles() {
    for (let i = 1; i <= this.BOTTLE_COUNT; i++)
      this.bottles.push(new Bottle());
  }

  /** Initialize all clouds in the game world */
  setClouds() {
    this.addLeftSideClouds();
    this.addCenterCloud();
    this.addRightSideClouds();
  }

  /** Add clouds to the left side of the screen */
  addLeftSideClouds() {
    for (let i = this.GAME_LEFT_SCREEN_COUNT; i >= 1; i--) {
      this.clouds.push(new Cloud(-700 * i));
    }
  }

  /** Add a cloud at the center of the screen */
  addCenterCloud() {
    this.clouds.push(new Cloud(0));
  }

  /** Add clouds to the right side of the screen */
  addRightSideClouds() {
    for (let i = 1; i <= this.GAME_RIGHT_SCREEN_COUNT + 2; i++) {
      this.clouds.push(new Cloud(700 * i));
    }
  }

  /** Initialize all status bars */
  setStatusBars() {
    this.healthStatusBar = new HealthStatusBar();
    this.coinStatusBar = new CoinStatusBar();
    this.bottleStatusBar = new BottleStatusBar();
    this.endbossStatusBar = new EndbossStatusBar();
  }

  /** Initialize all background layers in the game world */
  setBackgrounds() {
    this.addLeftBackgrounds();
    this.addCenterBackground();
    this.addRightBackgrounds();
  }

  /** Add background layers to the left side of the screen */
  addLeftBackgrounds() {
    for (let i = this.GAME_LEFT_SCREEN_COUNT; i >= 1; i--) {
      const IMAGE_NAME = i % 2 === 0 ? "1.png" : "2.png";
      this.addAirLayer(-719 * i);
      this.addLayers("3_third_layer", IMAGE_NAME, -719 * i);
      this.addLayers("2_second_layer", IMAGE_NAME, -719 * i);
      this.addLayers("1_first_layer", IMAGE_NAME, -719 * i);
    }
  }

  /** Add background layers at the center of the screen */
  addCenterBackground() {
    this.addAirLayer(0);
    this.addLayers("3_third_layer", "1.png", 0);
    this.addLayers("2_second_layer", "1.png", 0);
    this.addLayers("1_first_layer", "1.png", 0);
  }

  /** Add background layers to the right side of the screen */
  addRightBackgrounds() {
    for (let i = 1; i <= this.GAME_RIGHT_SCREEN_COUNT; i++) {
      const IMAGE_NAME = i % 2 === 0 ? "1.png" : "2.png";
      this.addAirLayer(719 * i);
      this.addLayers("3_third_layer", IMAGE_NAME, 719 * i);
      this.addLayers("2_second_layer", IMAGE_NAME, 719 * i);
      this.addLayers("1_first_layer", IMAGE_NAME, 719 * i);
    }
  }

  /**
   * Add an air layer to the background at a specific position
   * @param {number} position - X position of the air layer
   */
  addAirLayer(position) {
    this.backgrounds.push(
      new Background("assets/img/5_background/layers/air.png", position)
    );
  }

  /**
   * Add a background layer image to the game at a specific position
   * @param {string} layer - Name of the background layer folder
   * @param {string} imageName - Image file name
   * @param {number} position - X position to place the background
   */
  addLayers(layer, imageName, position) {
    this.backgrounds.push(
      new Background(
        `assets/img/5_background/layers/${layer}/${imageName}`,
        position
      )
    );
  }

  /** Set key positions for the game world */
  setGamePositions() {
    this.gameStartPosition = this.GAME_LEFT_SCREEN_COUNT * -719 + 110;
    this.gameEndPosition = this.GAME_RIGHT_SCREEN_COUNT * 719;
    this.gameDangerArea = (this.GAME_RIGHT_SCREEN_COUNT - 1) * 719;
  }

  /** Clear all intervals of the endboss */
  clearEndBossInterval() {
    this.endboss.clearAllInterval();
  }

  /** Clear all intervals of all enemies */
  clearEnemiesInterval() {
    this.enemies.forEach((enemy) => {
      enemy.intervals.forEach((id) => clearInterval(id));
      enemy.intervals = [];
    });
  }

  /** Clear all intervals of all clouds */
  clearCloudsInterval() {
    this.clouds.forEach((cloud) => {
      cloud.intervals.forEach((id) => clearInterval(id));
      cloud.intervals = [];
    });
  }

  /** Clear all intervals of all coins */
  clearCoinsInterval() {
    this.coins.forEach((coin) => {
      coin.intervals.forEach((id) => clearInterval(id));
      coin.intervals = [];
    });
  }
}
