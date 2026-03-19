class Level {
  endboss;
  enemies = [];
  clouds = [];
  backgrounds = [];
  coins = [];
  bottles = [];
  throwableObjects = [];
  healthStatusBar;
  coinStatusBar;
  bottleStatusBar;
  endbossStatusBar;
  gameStartPosition;
  gameEndPosition;
  gameDangerArea;

  setEndboss() {
    this.endboss = new Endboss();
  }

  setEnemies() {
    for (let i = 1; i <= this.HENS_COUNT; i++) this.enemies.push(new Hen());
    for (let i = 1; i <= this.CHICKS_COUNT; i++) this.enemies.push(new Chick());
  }

  setCoins() {
    for (let i = 1; i <= this.COINS_COUNT; i++) this.coins.push(new Coin());
  }

  setBottles() {
    for (let i = 1; i <= this.BOTTLE_COUNT; i++)
      this.bottles.push(new Bottle());
  }

  setClouds() {
    this.addLeftSideClouds();
    this.addCenterCloud();
    this.addRightSideClouds();
  }

  addLeftSideClouds() {
    for (let i = this.GAME_LEFT_SCREEN_COUNT; i >= 1; i--) {
      this.clouds.push(new Cloud(-700 * i));
    }
  }

  addCenterCloud() {
    this.clouds.push(new Cloud(0));
  }

  addRightSideClouds() {
    for (let i = 1; i <= this.GAME_RIGHT_SCREEN_COUNT + 2; i++) {
      this.clouds.push(new Cloud(700 * i));
    }
  }

  setStatusBars() {
    this.healthStatusBar = new HealthStatusBar();
    this.coinStatusBar = new CoinStatusBar();
    this.bottleStatusBar = new BottleStatusBar();
    this.endbossStatusBar = new EndbossStatusBar();
  }

  setBackgrounds() {
    this.addLeftBackgrounds();
    this.addCenterBackground();
    this.addRightBackgrounds();
  }

  addLeftBackgrounds() {
    for (let i = this.GAME_LEFT_SCREEN_COUNT; i >= 1; i--) {
      const IMAGE_NAME = i % 2 === 0 ? "1.png" : "2.png";
      this.addAirLayer(-719 * i);
      this.addLayers("3_third_layer", IMAGE_NAME, -719 * i);
      this.addLayers("2_second_layer", IMAGE_NAME, -719 * i);
      this.addLayers("1_first_layer", IMAGE_NAME, -719 * i);
    }
  }

  addCenterBackground() {
    this.addAirLayer(0);
    this.addLayers("3_third_layer", "1.png", 0);
    this.addLayers("2_second_layer", "1.png", 0);
    this.addLayers("1_first_layer", "1.png", 0);
  }

  addRightBackgrounds() {
    for (let i = 1; i <= this.GAME_RIGHT_SCREEN_COUNT; i++) {
      const IMAGE_NAME = i % 2 === 0 ? "1.png" : "2.png";
      this.addAirLayer(719 * i);
      this.addLayers("3_third_layer", IMAGE_NAME, 719 * i);
      this.addLayers("2_second_layer", IMAGE_NAME, 719 * i);
      this.addLayers("1_first_layer", IMAGE_NAME, 719 * i);
    }
  }

  addAirLayer(position) {
    this.backgrounds.push(
      new Background("assets/img/5_background/layers/air.png", position)
    );
  }

  addLayers(layer, imageName, position) {
    this.backgrounds.push(
      new Background(
        `assets/img/5_background/layers/${layer}/${imageName}`,
        position
      )
    );
  }

  setGamePositions() {
    this.gameStartPosition = this.GAME_LEFT_SCREEN_COUNT * -719 + 110;
    this.gameEndPosition = this.GAME_RIGHT_SCREEN_COUNT * 719;
    this.gameDangerArea = (this.GAME_RIGHT_SCREEN_COUNT - 1) * 719;
  }

  clearEndBossInterval() {
    this.endboss.clearAllInterval();
  }

  clearEnemiesInterval() {
    this.enemies.forEach((enemy) => {
      enemy.intervals.forEach((id) => clearInterval(id));
      enemy.intervals = [];
    });
  }

  clearCloudsInterval() {
    this.clouds.forEach((cloud) => {
      cloud.intervals.forEach((id) => clearInterval(id));
      cloud.intervals = [];
    });
  }

  clearCoinsInterval() {
    this.coins.forEach((coin) => {
      coin.intervals.forEach((id) => clearInterval(id));
      coin.intervals = [];
    });
  }
}
