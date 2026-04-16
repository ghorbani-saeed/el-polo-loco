/**
 * Represents the base class for chicken enemies.
 * Handles automatic movement, walking animations, and death logic.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /** * Collision box fine-tuning.
     * Default is 0 as chickens usually use the full sprite size for collisions.
     * @type {Object}
     */
    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };

    /** @type {number} Health of the chicken. 0 means dead. */
    energy = 100;
    /** @type {HTMLAudioElement|undefined} Sound played when the chicken is defeated. */
    DEAD_SOUND;

    /**
     * Creates a chicken instance.
     * Starts animation and movement loops and assigns a random speed.
     */
    constructor() {
        super();
        this.animate();
        this.move();
        /** @type {number} Random speed to make the chicken group move naturally. */
        this.speed = 0.2 + Math.random() * 0.25;
    }

    /**
     * Connects the chicken to the world and calculates a random starting X-position
     * within the level boundaries, avoiding the endboss area.
     * @param {Object} world - The game world instance.
     */
    setWorld(world) {
        this.world = world;
        let maximumPosition =
            this.world.level.gameEndPosition - this.world.level.endboss.w;
        this.x = 500 + Math.random() * maximumPosition;
    }

    /**
     * Plays the death sound effect if the game is not muted.
     */
    playDeadSound() {
        if (this.DEAD_SOUND && this.world.isMute === false) {
            this.DEAD_SOUND.play();
        }
    }

    /**
     * Executes the death animation and removes the chicken from the visual
     * game world after a short delay by setting dimensions to 0.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.w = 0;
            this.h = 0;
        }, 1500);
    }

    /**
     * Animation loop. Switches between walking and dead images based on energy.
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
     * Movement loop (60 FPS).
     * Continuously moves the chicken to the left as long as it is alive.
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

    /**
     * Instantly kills the chicken and triggers the death sound.
     */
    hit() {
        this.energy = 0;
        this.playDeadSound();
    }
}
