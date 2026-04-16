/**
 * Parent class for all moving objects in the game.
 * Provides physical properties like gravity, movement logic, collision detection, and health management.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** @type {number} Horizontal movement speed */
    speed = 1;
    /** @type {number} Vertical speed for jumping and falling */
    speedY = 0;
    /** @type {number} Gravity force that pulls the object down */
    acceleration = 2;
    /** @type {boolean} If true, the image is rendered flipped (facing left) */
    otherDirection = false;
    /** @type {number} Timestamp of the last time the object took damage */
    lastHit;
    /** @type {Object} Reference to the game world */
    world;
    /** @type {boolean} State tracking if the object's health reached zero */
    dead = false;
    /** @type {number} Timestamp of the last movement/action performed */
    lastMove = new Date().getTime();
    /** @type {number[]} List of active interval IDs for management and cleanup */
    intervals;

    /**
     * Initializes the movable object and its interval storage.
     */
    constructor() {
        super();
        this.intervals = [];
    }

    /**
     * Detects collision with another object taking offsets into account.
     * @param {MovableObject} mo - The other movable object to check.
     * @returns {boolean} True if objects overlap.
     */
    isColliding(mo) {
        return (
            this.x + this.w - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.h - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.w - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.h - mo.offset.bottom
        );
    }

    /**
     * Applies gravity to the object.
     * Decreases vertical position as long as the object is above ground or in upward motion.
     */
    applyGravity() {
        this.intervals.push(
            setInterval(() => {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }, 1000 / 25),
        );
    }

    /**
     * Checks if the object is currently in the air.
     * Throwable objects are always considered above ground until they impact.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 200;
        }
    }

    /**
     * Reduces object energy and tracks the time of the hit.
     * Sets the dead state if energy reaches zero.
     */
    hit() {
        if (this.isDead()) return;

        this.energy -= this.energyToRemove;

        if (this.energy <= 0) {
            this.energy = 0;
            this.dead = true;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was recently hit (within the last second).
     * Used for invincibility frames or hurt animations.
     * @returns {boolean}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if energy is zero.
     * @returns {boolean}
     */
    isDead() {
        return this.energy <= 0;
    }

    /** Moves the object to the right and updates activity timestamp. */
    moveRight() {
        this.x += this.speed;
        this.lastMove = new Date().getTime();
    }

    /** Moves the object to the left and updates activity timestamp. */
    moveLeft() {
        this.x -= this.speed;
        this.lastMove = new Date().getTime();
    }

    /** Triggers a jump by setting the upward vertical speed. */
    jump() {
        this.speedY = 25;
        this.lastMove = new Date().getTime();
    }

    /**
     * Cycles through an array of images to create an animation.
     * @param {string[]} images - Array of image paths.
     * @param {boolean} [oneTime=false] - If true, the animation stops at the last frame.
     */
    playAnimation(images, oneTime = false) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (!oneTime) {
            this.currentImage++;
        } else {
            if (this.currentImage !== images.length - 1) {
                this.currentImage++;
            }
        }
    }

    /**
     * Clears all running intervals to stop movement and logic loops.
     */
    clearAllInterval() {
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals = [];
    }
}
