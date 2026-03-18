/**
 * Class representing a generic status bar in the game.
 * Extends DrawableObject to allow rendering on the canvas.
 * Can be used for health, coins, bottles, or endboss status bars.
 */
class StatusBar extends DrawableObject {
  /** Width of the status bar */
  w = 130;

  /** Height of the status bar */
  h = 40;

  /** Current percentage value of the status bar (0-100) */
  percentage = 100;

  /** Whether the status bar is fixed in the context (HUD) */
  fixInContext = true;

  /**
   * Set the status bar image based on the current percentage.
   *
   * @param {number} percentage - Current percentage to display (0-100).
   */
  setPersentage(percentage) {
    this.percentage = percentage;
    let imageIndex = this.showStatusBarByPercentage();
    let imagePath = this.IMAGES[imageIndex];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Determine the status bar image index based on the current percentage.
   *
   * @returns {number} Index of the image to display (0-5).
   */
  showStatusBarByPercentage() {
    switch (true) {
      case this.percentage > 99:
        return 5;
      case this.percentage > 80:
        return 4;
      case this.percentage > 60:
        return 3;
      case this.percentage > 40:
        return 2;
      case this.percentage > 20:
        return 1;
      default:
        return 0;
    }
  }
}
