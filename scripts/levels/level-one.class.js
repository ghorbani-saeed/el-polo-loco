/**
 * Class representing the first level of the game.
 * Extends the base Level class with specific settings and objects.(beschreibung wie ein objekt aussehen soll-vorlage oder schablone,quasi weiden wir von eine classe(vorlage) eine objekt generieren lassen können und diese objekt hat genau felder dass klasse hat)
 */
class LevelOne extends Level {
  /** Number of screens to the left of the starting point */
  GAME_LEFT_SCREEN_COUNT = 2;

  /** Number of screens to the right of the starting point */
  GAME_RIGHT_SCREEN_COUNT = 5;

  /** Total number of coins in the level */
  COINS_COUNT = 30;

  /** Total number of hens in the level */
  HENS_COUNT = 10;

  /** Total number of chicks in the level */
  CHICKS_COUNT = 10;

  /** Total number of bottles in the level */
  BOTTLE_COUNT = 20;

  /**
   * Create a LevelOne instance.
   * Initializes the level by setting up enemies, collectibles, clouds, status bars,
   * backgrounds, and game positions.
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
  }
}
