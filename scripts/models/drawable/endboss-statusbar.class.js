/**
 * Represents the health bar for the end boss.
 * Inherits from StatusBar and is positioned specifically for the boss encounter.
 * @extends StatusBar
 */
class EndbossStatusBar extends StatusBar {
    /** @type {number} The horizontal position of the bar on the screen */
    x = 558;

    /** @type {number} The vertical position of the bar on the screen */
    y = 5;

    /** * @type {string[]}
     * Array of image paths representing the boss's health levels (0% to 100%)
     */
    IMAGES = [
        "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
        "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
        "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
        "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
        "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
        "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
    ];

    /**
     * Creates an instance of EndbossStatusBar.
     * Initializes the bar at 100% health and preloads the images.
     */
    constructor() {
        super();

        /** Sets the initial image to index 5 (100% health) */
        this.loadImage(this.IMAGES[5]);

        /** Caches all health bar images for the boss */
        this.loadImages(this.IMAGES);
    }
}
