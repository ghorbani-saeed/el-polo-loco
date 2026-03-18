/**
 * Class representing the player's health status bar in the game.
 * Extends the base StatusBar to visually show the player's health.
 */
class HealthStatusBar extends StatusBar {
  /** X position of the status bar on the canvas */
  x = 10;

  /** Y position of the status bar on the canvas */
  y = 0;

  /** Array of image paths representing different health levels */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Create a HealthStatusBar instance.
   * Initializes the status bar by loading its images for different health levels.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[5]); // Load the initial image (full health)
    this.loadImages(this.IMAGES); // Preload all images for smooth updates
  }
}
