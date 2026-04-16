/**
 * Represents a collectible coin in the game world.
 * Handles coin animations, random placement, and the pickup visual effect.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    /** @type {number} Default vertical position (overridden in setWorld) */
    y = 140;
    /** @type {number} Width of the coin */
    w = 100;
    /** @type {number} Height of the coin */
    h = 100;

    /** * Collision box fine-tuning to make the hitbox smaller than the sprite.
     * @type {Object} */
    offset = {
        right: 30,
        left: 30,
        top: 30,
        bottom: 30,
    };

    /** @type {boolean} Flag to track if the coin has already been collected */
    pick = false;

    /** @type {string[]} Animation frames for the rotating coin effect */
    IMAGES = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];

    /** @type {HTMLAudioElement} Sound played when collected */
    COIN_PICKUP_SOUND;

    /**
     * Creates a coin instance, preloads images, and starts the idle animation.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        this.setSounds();
    }

    /**
     * Places the coin at a random position within the level boundaries.
     * @param {Object} world - The game world instance.
     */
    setWorld(world) {
        this.world = world;
        let maximumPosition =
            this.world.level.gameEndPosition - this.world.level.endboss.w;
        this.x = 400 + Math.random() * maximumPosition;
        this.y = 50 + Math.random() * 250;
    }

    /**
     * Initializes the pickup sound effect.
     */
    setSounds() {
        this.COIN_PICKUP_SOUND = new Audio("assets/sounds/coin-pickup.mp3");
        this.COIN_PICKUP_SOUND.volume = 0.1;
    }

    /**
     * Starts the idle animation loop to make the coin rotate/sparkle.
     */
    animate() {
        this.intervals.push(
            setInterval(() => {
                this.playAnimation(this.IMAGES);
            }, 1000 / 5),
        );
    }

    /**
     * Plays the coin pickup sound if the game is not muted.
     */
    playPickupSound() {
        if (this.world.isMute === false) {
            this.COIN_PICKUP_SOUND.play();
        }
    }

    /**
     * Triggers the collection sequence: plays sound and runs a shrinking/floating animation
     * until the coin disappears from the screen.
     */
    coinIsPick() {
        this.pick = true;
        this.playPickupSound();
        this.intervals.push(
            setInterval(() => {
                if (this.w > 0) {
                    this.y--;
                    this.w--;
                    this.h--;
                }
            }, 0.5),
        );
    }

    /**
     * Helper to verify if the coin is still available for collection.
     * @returns {boolean} True if not yet picked.
     */
    checkCoinIsNotPicked() {
        return this.pick === false;
    }
}
