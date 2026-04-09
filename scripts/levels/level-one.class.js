/**
 * Represents the first level of the game.
 * Inherits from the base Level class and initializes all game objects.
 * @extends Level
 */
class LevelOne extends Level {
  /** @type {number} Number of screens/backgrounds to the left of the starting point */
  GAME_LEFT_SCREEN_COUNT = 2;

  /** @type {number} Number of screens/backgrounds to the right of the starting point */
  GAME_RIGHT_SCREEN_COUNT = 5;

  /** @type {number} Total number of coins to be spawned in this level */
  COINS_COUNT = 10;

  /** @type {number} Total number of hen enemies to be spawned */
  HENS_COUNT = 10;

  /** @type {number} Total number of chick enemies to be spawned */
  CHICKS_COUNT = 10;

  /** @type {number} Total number of collectable bottles to be spawned */
  BOTTLE_COUNT = 10;

  /**
   * Creates an instance of LevelOne.
   * Initializes enemies, items, backgrounds, and UI elements.
   */
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

    /** * The status bar for the endboss is hidden by default 
     * until the player encounters the boss.
     */
    this.endbossStatusBar.visible = false;
  }
}