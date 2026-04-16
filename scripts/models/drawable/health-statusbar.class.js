/**
 * Represents the health status bar in the game.
 * This bar visually displays the character's current health level using a series of images.
 * * @extends StatusBar
 */
class HealthStatusBar extends StatusBar {
    /** * @type {number} The x-coordinate for the status bar on the canvas.
     */
    x = 10;

    /** * @type {number} The y-coordinate for the status bar on the canvas.
     */
    y = 0;

    /**
     * An array of file paths to images representing different health percentages (0% to 100%).
     * @type {string[]}
     */
    IMAGES = [
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ];

    /**
     * Creates a new HealthStatusBar instance.
     * Loads the initial full-health image and preloads all health-related images into the cache.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[5]); // Initial image: 100% health
        this.loadImages(this.IMAGES); // Preload all images for the animation/transition
    }
}
