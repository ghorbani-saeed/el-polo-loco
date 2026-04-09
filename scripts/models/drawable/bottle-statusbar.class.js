/**
 * Represents the status bar for collectable bottles.
 * Inherits from StatusBar to display the current fill level of ammunition.
 * @extends StatusBar
 */
class BottleStatusBar extends StatusBar {
  /** @type {number} The horizontal position of the bar on the screen */
  x = 10;

  /** @type {number} The vertical position of the bar on the screen */
  y = 75;

  /** * @type {string[]} 
   * Array of image paths representing different fill levels (0% to 100%)
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Creates an instance of BottleStatusBar.
   * Sets the initial image and preloads the animation frames.
   */
  constructor() {
    super();
    
    /** Sets the initial image to 0% fill level */
    this.loadImage(this.IMAGES[0]); 
    
    /** Caches all images for the status bar animation */
    this.loadImages(this.IMAGES); 
  }
}