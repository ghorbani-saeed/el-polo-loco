/**
 * Represents the status bar for collected coins.
 * Inherits from StatusBar to display the progress of coin collection.
 * @extends StatusBar
 */
class CoinStatusBar extends StatusBar {
    /** @type {number} The horizontal position of the bar on the screen */
    x = 10;

    /** @type {number} The vertical position of the bar on the screen */
    y = 35;

    /** * @type {string[]}
     * Array of image paths representing different collection levels (0% to 100%)
     */
    IMAGES = [
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];

    /**
     * Creates an instance of CoinStatusBar.
     * Initializes the bar with the 0% image and preloads all animation frames.
     */
    constructor() {
        super();

        /** Sets the starting image to 0 coins collected */
        this.loadImage(this.IMAGES[0]);

        /** Caches all coin status images for smooth transitions */
        this.loadImages(this.IMAGES);
    }
}
