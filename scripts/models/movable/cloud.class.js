/**
 * Represents a decorative cloud object in the background.
 * Clouds move slowly across the screen to create a parallax-like effect.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** @type {number} Vertical position of the cloud in the sky */
    y = 30;
    /** @type {number} Width of the cloud */
    w = 450;
    /** @type {number} Height of the cloud */
    h = 350;
    /** @type {number} Constant speed at which the cloud drifts left */
    speed = 0.15;

    /** @type {string[]} Paths to available cloud images */
    IMAGES = [
        "assets/img/5_background/layers/4_clouds/1.png",
        "assets/img/5_background/layers/4_clouds/2.png",
    ];

    /**
     * Creates a cloud instance.
     * @param {number} x - The initial horizontal starting position.
     */
    constructor(x) {
        super();
        this.x = x;
        /** @type {number} Randomly selects one of the available cloud textures */
        let imageIndex = this.getRandomImageIndex(2);
        this.loadImage(this.IMAGES[imageIndex]);
        this.loadImages(this.IMAGES);
        this.move();
    }

    /**
     * Sets the world reference (if needed for further logic).
     * @param {Object} world - The game world instance.
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * Starts the drift movement.
     * Moves the cloud to the left at 60 frames per second.
     */
    move() {
        this.intervals.push(
            setInterval(() => {
                this.moveLeft();
            }, 1000 / 60),
        );
    }
}
