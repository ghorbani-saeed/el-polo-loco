/**
 * Represents a generic status bar that can be drawn on the canvas.
 * Provides functionality to update the displayed image based on a percentage value.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /** @type {number} The width of the status bar. */
    w = 130;

    /** @type {number} The height of the status bar. */
    h = 40;

    /** @type {number} Current percentage value (0 to 100). */
    percentage = 0;

    /** @type {boolean} Indicates if the object remains fixed relative to the screen. */
    fixInContext = true;

    /** @type {boolean} Indicates if the status bar is currently visible. */
    visible = true;

    /**
     * Updates the percentage of the status bar and refreshes the displayed image.
     * @param {number} percentage - The new percentage value for the status bar.
     */
    setPersentage(percentage) {
        this.percentage = percentage;
        let imageIndex = this.showStatusBarByPercentage();
        let imagePath = this.IMAGES[imageIndex];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Determines the correct image index based on the current percentage.
     * @returns {number} The index of the image in the IMAGES array (0 to 5).
     */
    showStatusBarByPercentage() {
        switch (true) {
            case this.percentage >= 100:
                return 5;
            case this.percentage >= 80:
                return 4;
            case this.percentage >= 60:
                return 3;
            case this.percentage >= 40:
                return 2;
            case this.percentage >= 20:
                return 1;
            default:
                return 0;
        }
    }
}
