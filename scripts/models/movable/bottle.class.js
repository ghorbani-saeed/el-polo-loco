/**
 * Represents a collectable bottle item in the game world.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /** @type {number} Vertical position on the ground */
    y = 360;
    /** @type {number} Width of the bottle */
    w = 60;
    /** @type {number} Height of the bottle */
    h = 60;

    /** * @type {Object} Collision offset values to fine-tune hit detection
     * @property {number} right - Offset from the right edge
     * @property {number} left - Offset from the left edge
     * @property {number} top - Offset from the top edge
     * @property {number} bottom - Offset from the bottom edge
     */
    offset = {
        right: 20,
        left: 30,
        top: 0,
        bottom: 0,
    };

    /** @type {boolean} State whether the bottle has been collected */
    pick = false;

    /** @type {string[]} Array of paths for the two different bottle ground-images */
    IMAGES = [
        "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    /** @type {HTMLAudioElement} Sound played when the bottle is collected */
    BOTTLE_PICKUP_SOUND;

    /**
     * Creates an instance of Bottle.
     * Selects a random visual variant and preloads sounds.
     */
    constructor() {
        super();
        /** @type {number} Random index to choose between the two bottle images */
        let imageIndex = this.getRandomImageIndex(2);
        this.loadImage(this.IMAGES[imageIndex]);
        this.loadImages(this.IMAGES);
        this.setSounds();
    }

    /**
     * Initializes the pickup sound effect and sets its volume.
     */
    setSounds() {
        this.BOTTLE_PICKUP_SOUND = new Audio("assets/sounds/bottle-pickup.mp3");
        this.BOTTLE_PICKUP_SOUND.volume = 0.1;
    }

    /**
     * Sets the world reference and calculates a random x-position within level boundaries.
     * @param {World} world - The game world instance.
     */
    setWorld(world) {
        this.world = world;
        /** @type {number} The maximum x-coordinate where a bottle can safely spawn */
        let maximumPosition =
            this.world.level.gameEndPosition - this.world.level.endboss.w;
        this.x = 400 + Math.random() * maximumPosition;
    }

    /**
     * Plays the collection sound if the game is not muted.
     */
    playPickupSound() {
        if (this.world.isMute === false) {
            this.BOTTLE_PICKUP_SOUND.play();
        }
    }

    /**
     * Triggers the collection logic: sets state to picked, plays sound,
     * and starts a small "fade-out" animation.
     */
    bottleIsPick() {
        this.pick = true;
        this.playPickupSound();

        this.intervals.push(
            setInterval(() => {
                this.y -= 2;
                setTimeout(() => {
                    this.w = 0;
                    this.h = 0;
                }, 70);
            }, 1),
        );
    }

    /**
     * Checks if the bottle is still available for collection.
     * @returns {boolean} True if the bottle has not been picked yet.
     */
    checkBottleIsNotPicked() {
        return this.pick === false;
    }
}
