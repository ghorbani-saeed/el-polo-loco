/**
 * Class representing the bottle status bar in the game.
 * Extends the base StatusBar to visually show the player's bottle count.
 */
class BottleStatusBar extends StatusBar {
  /** X position of the status bar on the canvas */
  x = 10;

  /** Y position of the status bar on the canvas */
  y = 75;

  /** Array of image paths representing different bottle levels */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Create a BottleStatusBar instance.
   * Initializes the status bar by loading its images for different bottle levels.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[0]); // Load the initial image (0% bottles)
    this.loadImages(this.IMAGES); // Preload all images for smooth updates
  }
}
