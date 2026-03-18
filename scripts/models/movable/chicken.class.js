/**
 * Base class for chicken enemies.
 * Extends MovableObject.
 */
class Chicken extends MovableObject {
    /** Collision offsets */
    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };

    /** Current health of the chicken */
    energy = 100;

    /** Sound effect for death */
    DEAD_SOUND;

    /**
     * Create a Chicken instance.
     * Initializes animation, movement, and random speed.
     */
    constructor() {
        super();
        this.animate();
        this.move();
        this.speed = 0.2 + Math.random() * 0.25;
    }

    /**
     * Assign the world reference and set a random X position for the enemy.
     * @param {Object} world - The game world instance
     * @returns {void}
     */
    setWorld(world) {
        this.world = world;
        let maximumPosition =
            this.world.level.gameEndPosition - this.world.level.endboss.w;
        this.x = 500 + Math.random() * maximumPosition;
    }

    /**
     * Play the death sound if it exists and the game is not muted.
     * @returns {void}
     */
    playDeadSound() {
        if (this.DEAD_SOUND && this.world.isMute === false) {
            this.DEAD_SOUND.play();
        }
    }

    /**
     * Play the dead animation and remove the enemy after 1.5 seconds.
     * @returns {void}
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.w = 0;
            this.h = 0;
        }, 1500);
    }

    /**
     * Animate the enemy based on energy state (walk or dead).
     * @returns {void}
     */
    animate() {
        this.intervals.push(
            setInterval(() => {
                if (this.energy === 0) {
                    this.playDeadAnimation();
                } else {
                    this.playAnimation(this.IMAGES_WALK);
                }
            }, 1000 / 6),
        );
    }

    /**
     * Move the enemy left continuously if it still has energy.
     * @returns {void}
     */
    move() {
        this.intervals.push(
            setInterval(() => {
                if (this.energy > 0) {
                    this.moveLeft();
                }
            }, 1000 / 60),
        );
    }
    hit() {
        this.energy = 0;
        this.playDeadSound();
    }
}
