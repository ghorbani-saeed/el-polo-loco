/**
 * Represents a standard adult chicken enemy (hen).
 * Inherits movement and death logic from the Chicken base class.
 * @extends Chicken
 */
class Hen extends Chicken {
    /** @type {number} Vertical position on the ground for the adult hen */
    y = 355;
    /** @type {number} Width of the hen */
    w = 60;
    /** @type {number} Height of the hen */
    h = 60;

    /** @type {string[]} Animation frames for the walking hen */
    IMAGES_WALK = [
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    /** @type {string[]} Image shown when the hen is defeated */
    IMAGES_DEAD = [
        "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

    /** @type {HTMLAudioElement} Sound played upon the hen's death */
    DEAD_SOUND;

    /**
     * Creates an instance of the Hen enemy.
     * Preloads images and initializes adult-hen specific sounds.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.setSounds();
    }

    /**
     * Initializes the death sound for the hen.
     */
    setSounds() {
        this.DEAD_SOUND = new Audio("assets/sounds/hen-dead.mp3");
        this.DEAD_SOUND.volume = 0.1;
    }
}
