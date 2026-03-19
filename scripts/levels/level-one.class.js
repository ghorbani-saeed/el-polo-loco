class LevelOne extends Level {
  GAME_LEFT_SCREEN_COUNT = 2;
  GAME_RIGHT_SCREEN_COUNT = 5;
  COINS_COUNT = 30;
  HENS_COUNT = 10;
  CHICKS_COUNT = 10;
  BOTTLE_COUNT = 20;
  constructor() {
    super();
    this.setEndboss();
    this.setEnemies();
    this.setCoins();
    this.setBottles();
    this.setClouds();
    this.setStatusBars();
    this.setBackgrounds();
    this.setGamePositions();
  }
}
