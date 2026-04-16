/**
 * Represents a small chicken enemy (chick).
 * Inherits basic enemy logic from the Chicken class but has a smaller size and different assets.
 * @extends Chicken
 */
class Chick extends Chicken {
    /** @type {number} Vertical position on the ground for the small chick */
    y = 385;
    /** @type {number} Width of the chick */
    w = 30;
    /** @type {number} Height of the chick */
    h = 30;

    /** @type {string[]} Animation frames for the walking chick */
    IMAGES_WALK = [
        "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    /** @type {string[]} Image shown when the chick is defeated */
    IMAGES_DEAD = [
        "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];

    /** @type {HTMLAudioElement} Sound played upon the chick's death */
    DEAD_SOUND;

    /**
     * Creates an instance of the Chick enemy.
     * Preloads images and initializes specific sounds.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.setSounds();
    }

    /**
     * Initializes the death sound for the chick and sets volume/playback start time.
     */
    setSounds() {
        this.DEAD_SOUND = new Audio("assets/sounds/hen-dead.mp3");
        this.DEAD_SOUND.volume = 0.1;
        this.DEAD_SOUND.currentTime = 0.5;
    }
}
