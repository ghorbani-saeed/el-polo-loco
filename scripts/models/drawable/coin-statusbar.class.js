/**
 * Class representing the coin status bar in the game.
 * Extends the base StatusBar to visually show the player's collected coins.
 */
class CoinStatusBar extends StatusBar {
  /** X position of the status bar on the canvas */
  x = 10;

  /** Y position of the status bar on the canvas */
  y = 35;

  /** Array of image paths representing different coin levels */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  /**
   * Create a CoinStatusBar instance.
   * Initializes the status bar by loading its images for different coin levels.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[0]); // Load the initial image (0% coins)
    this.loadImages(this.IMAGES); // Preload all images for smooth updates
  }
}
