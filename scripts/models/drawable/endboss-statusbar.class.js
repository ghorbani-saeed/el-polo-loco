/**
 * Class representing the endboss status bar in the game.
 * Extends the base StatusBar to visually show the endboss's health.
 */
class EndbossStatusBar extends StatusBar {
  /** X position of the status bar on the canvas */
  x = 540;

  /** Y position of the status bar on the canvas */
  y =5;

  /** Array of image paths representing different endboss health levels */
  IMAGES = [
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * Create an EndbossStatusBar instance.
   * Initializes the status bar by loading its images for different health levels.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[5]); // Load the initial image (full health)
    this.loadImages(this.IMAGES); // Preload all images for smooth updates
  }
}
