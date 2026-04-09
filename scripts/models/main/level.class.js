/**
 * Base class representing the game level structure.
 * Handles the initialization and management of all game objects, status bars, and backgrounds.
 */
class Level {
  /** @type {Endboss} The main antagonist of the level */
  endboss;
  /** @type {MovableObject[]} List of all enemies in the level */
  enemies = [];
  /** @type {Cloud[]} List of background clouds */
  clouds = [];
  /** @type {Background[]} List of background layers */
  backgrounds = [];
  /** @type {Coin[]} Collectable coin objects */
  coins = [];
  /** @type {Bottle[]} Collectable bottle objects */
  bottles = [];
  /** @type {ThrowableObject[]} Objects currently being thrown */
  throwableObjects = [];

  /** @type {HealthStatusBar} UI element for player health */
  healthStatusBar;
  /** @type {CoinStatusBar} UI element for collected coins */
  coinStatusBar;
  /** @type {BottleStatusBar} UI element for bottle inventory */
  bottleStatusBar;
  /** @type {EndbossStatusBar} UI element for boss health */
  endbossStatusBar;

  /** @type {number} The x-coordinate where the level starts */
  gameStartPosition;
  /** @type {number} The x-coordinate where the level ends */
  gameEndPosition;
  /** @type {number} The x-coordinate where the boss encounter triggers */
  gameDangerArea;

  /**
   * Initializes the end boss.
   */
  setEndboss() {
    this.endboss = new Endboss();
  }

  /**
   * Spawns hens and chicks based on level configuration.
   */
  setEnemies() {
    for (let i = 1; i <= this.HENS_COUNT; i++) this.enemies.push(new Hen());
    for (let i = 1; i <= this.CHICKS_COUNT; i++) this.enemies.push(new Chick());
  }

  /**
   * Spawns collectable coins.
   */
  setCoins() {
    for (let i = 1; i <= this.COINS_COUNT; i++) this.coins.push(new Coin());
  }

  /**
   * Spawns collectable bottles.
   */
  setBottles() {
    for (let i = 1; i <= this.BOTTLE_COUNT; i++)
      this.bottles.push(new Bottle());
  }

  /**
   * Initializes all clouds across the entire level width.
   */
  setClouds() {
    this.addLeftSideClouds();
    this.addCenterCloud();
    this.addRightSideClouds();
  }

  /**
   * Generates clouds for the area left of the starting screen.
   */
  addLeftSideClouds() {
    for (let i = this.GAME_LEFT_SCREEN_COUNT; i >= 1; i--) {
      this.clouds.push(new Cloud(-700 * i));
    }
  }

  /**
   * Generates a cloud at the center position.
   */
  addCenterCloud() {
    this.clouds.push(new Cloud(0));
  }

  /**
   * Generates clouds for the area right of the starting screen.
   */
  addRightSideClouds() {
    for (let i = 1; i <= this.GAME_RIGHT_SCREEN_COUNT + 2; i++) {
      this.clouds.push(new Cloud(700 * i));
    }
  }

  /**
   * Initializes all status bars (UI elements).
   */
  setStatusBars() {
    this.healthStatusBar = new HealthStatusBar();
    this.coinStatusBar = new CoinStatusBar();
    this.bottleStatusBar = new BottleStatusBar();
    this.endbossStatusBar = new EndbossStatusBar();
  }

  /**
   * Initializes all background layers for the level.
   */
  setBackgrounds() {
    this.addLeftBackgrounds();
    this.addCenterBackground();
    this.addRightBackgrounds();
  }

  /**
   * Adds background layers for the left side screens.
   */
  addLeftBackgrounds() {
    for (let i = this.GAME_LEFT_SCREEN_COUNT; i >= 1; i--) {
      const IMAGE_NAME = i % 2 === 0 ? "1.png" : "2.png";
      this.addAirLayer(-719 * i);
      this.addLayers("3_third_layer", IMAGE_NAME, -719 * i);
      this.addLayers("2_second_layer", IMAGE_NAME, -719 * i);
      this.addLayers("1_first_layer", IMAGE_NAME, -719 * i);
    }
  }

  /**
   * Adds background layers for the starting screen.
   */
  addCenterBackground() {
    this.addAirLayer(0);
    this.addLayers("3_third_layer", "1.png", 0);
    this.addLayers("2_second_layer", "1.png", 0);
    this.addLayers("1_first_layer", "1.png", 0);
  }

  /**
   * Adds background layers for the right side screens.
   */
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
   * Adds a static air background layer.
   * @param {number} position - The horizontal x-coordinate.
   */
  addAirLayer(position) {
    this.backgrounds.push(
      new Background("assets/img/5_background/layers/air.png", position)
    );
  }

  /**
   * Adds a specific parallax background layer.
   * @param {string} layer - The folder name of the layer.
   * @param {string} imageName - The filename of the image.
   * @param {number} position - The horizontal x-coordinate.
   */
  addLayers(layer, imageName, position) {
    this.backgrounds.push(
      new Background(
        `assets/img/5_background/layers/${layer}/${imageName}`,
        position
      )
    );
  }

  /**
   * Calculates the level boundaries and trigger areas.
   */
  setGamePositions() {
    this.gameStartPosition = this.GAME_LEFT_SCREEN_COUNT * -719 + 110;
    this.gameEndPosition = this.GAME_RIGHT_SCREEN_COUNT * 719;
    this.gameDangerArea = (this.GAME_RIGHT_SCREEN_COUNT - 1) * 719;
  }

  /**
   * Clears all running intervals of the end boss.
   */
  clearEndBossInterval() {
    this.endboss.clearAllInterval();
  }

  /**
   * Stops movement and animations for all enemies.
   */
  clearEnemiesInterval() {
    this.enemies.forEach((enemy) => {
      enemy.intervals.forEach((id) => clearInterval(id));
      enemy.intervals = [];
    });
  }

  /**
   * Stops animation intervals for all clouds.
   */
  clearCloudsInterval() {
    this.clouds.forEach((cloud) => {
      cloud.intervals.forEach((id) => clearInterval(id));
      cloud.intervals = [];
    });
  }

  /**
   * Stops all animation intervals for coin objects.
   */
  clearCoinsInterval() {
    this.coins.forEach((coin) => {
      coin.intervals.forEach((id) => clearInterval(id));
      coin.intervals = [];
    });
  }
}