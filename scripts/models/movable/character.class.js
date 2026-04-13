/**
 * Represents the main playable character "Pepe".
 * Handles physical properties, animation states, and audio initialization.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** @type {number} Initial horizontal position */
    x = 0;
    /** @type {number} Initial vertical position */
    y = 200;
    /** @type {number} Width of the character sprite */
    w = 130;
    /** @type {number} Height of the character sprite */
    h = 220;
    /** @type {number} Movement speed in pixels per frame */
    speed = 8;
    /** @type {number} Character's health percentage (0 to 100) */
    energy = 100;
    /** @type {number} Number of coins collected */
    coins = 0;
    /** @type {number} Number of bottles currently in inventory */
    bottles = 0;
    /** @type {boolean} State to prevent multiple bottle throws at once */
    isThrowingBottle = false;
    /** @type {number} Calculated value of each coin for the progress bar */
    coinsToAdded = 0;
    /** @type {number} Bottles to be added (placeholder for logic) */
    bottlesToAdded = 0;
    /** @type {number} Amount of energy lost when hit */
    energyToRemove = 25;
    /** @type {boolean} Flag to trigger boss fight or danger state */
    reachedToDangerArea = false;

    /** * @type {Object} Collision box fine-tuning
     * @property {number} right - Pixels to ignore from the right edge
     * @property {number} left - Pixels to ignore from the left edge
     * @property {number} top - Pixels to ignore from the top edge
     * @property {number} bottom - Pixels to ignore from the bottom edge
     */
    offset = {
        right: 20,
        left: 20,
        top: 70,
        bottom: 10,
    };

    /** @type {string[]} Animation frames for normal idle state */
    IMAGES_IDLE = [
        "assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    /** @type {string[]} Animation frames for sleeping/long-idle state */
    IMAGES_LONG_IDLE = [
        "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /** @type {string[]} Animation frames for walking */
    IMAGES_WALK = [
        "assets/img/2_character_pepe/2_walk/W-21.png",
        "assets/img/2_character_pepe/2_walk/W-22.png",
        "assets/img/2_character_pepe/2_walk/W-23.png",
        "assets/img/2_character_pepe/2_walk/W-24.png",
        "assets/img/2_character_pepe/2_walk/W-25.png",
        "assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    /** @type {string[]} Animation frames for jumping */
    IMAGES_JUMP = [
        "assets/img/2_character_pepe/3_jump/J-31.png",
        "assets/img/2_character_pepe/3_jump/J-32.png",
        "assets/img/2_character_pepe/3_jump/J-33.png",
        "assets/img/2_character_pepe/3_jump/J-34.png",
        "assets/img/2_character_pepe/3_jump/J-35.png",
        "assets/img/2_character_pepe/3_jump/J-36.png",
        "assets/img/2_character_pepe/3_jump/J-37.png",
        "assets/img/2_character_pepe/3_jump/J-38.png",
        "assets/img/2_character_pepe/3_jump/J-39.png",
    ];

    /** @type {string[]} Animation frames for taking damage */
    IMAGES_HURT = [
        "assets/img/2_character_pepe/4_hurt/H-41.png",
        "assets/img/2_character_pepe/4_hurt/H-42.png",
        "assets/img/2_character_pepe/4_hurt/H-43.png",
    ];

    /** @type {string[]} Animation frames for death state */
    IMAGES_DEAD = [
        "assets/img/2_character_pepe/5_dead/D-51.png",
        "assets/img/2_character_pepe/5_dead/D-52.png",
        "assets/img/2_character_pepe/5_dead/D-53.png",
        "assets/img/2_character_pepe/5_dead/D-54.png",
        "assets/img/2_character_pepe/5_dead/D-55.png",
        "assets/img/2_character_pepe/5_dead/D-56.png",
    ];

    /** @type {HTMLAudioElement} Audio object for snoring/sleeping */
    SLEEP_SOUND;
    /** @type {HTMLAudioElement} Audio object for hurt grunts */
    HURT_SOUND;
    /** @type {HTMLAudioElement} Audio object for death sound */
    DEAD_SOUND;
    /** @type {number} Counter to ensure death sound plays only once */
    DEAD_SOUND_PLAY_COUNT = 1;

    /**
     * Initializes the character, preloads images, starts physics and animations.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadAllImages();
        this.animate();
        this.move();
        this.applyGravity();
        this.setSounds();
    }

    /**
     * Creates and configures all character-specific audio files.
     */
    setSounds() {
        this.SLEEP_SOUND = new Audio("assets/sounds/sleeping.mp3");
        this.SLEEP_SOUND.volume = 0.1;
        this.HURT_SOUND = new Audio("assets/sounds/character-hurt-sound.mp3");
        this.HURT_SOUND.volume = 0.1;
        this.DEAD_SOUND = new Audio("assets/sounds/character-death.ogg");
        this.DEAD_SOUND.volume = 0.1;
        this.DEAD_SOUND.loop = false;
    }

    /**
     * Loads all animation image sets into the image cache.
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Connects the character to the world instance and initializes UI bars.
     * @param {Object} world - The game world instance.
     */
    setWorld(world) {
        this.world = world;
        this.coinsToAdded = 100 / this.world.level.coins.length;
        this.bottles = 0;
        this.updateBottleStatusBar();
    }

    /**
     * Increments coin count and updates the coin status bar percentage.
     */
    getCoin() {
        if (this.coins < 10) {
            this.coins += 1;
            let percent = (this.coins / 10) * 100;
            this.world.level.coinStatusBar.setPersentage(percent);
        }
    }

    /**
     * Increments bottle count and updates the bottle status bar.
     */
    getBottle() {
        if (this.bottles < 10) {
            this.bottles += 1;
            this.updateBottleStatusBar();
        }
    }

    /**
     * Calculates and updates the bottle status bar percentage.
     */
    updateBottleStatusBar() {
        let maxBottles = 10;
        let percent = (this.bottles / maxBottles) * 100;
        this.world.level.bottleStatusBar.setPersentage(percent);
    }

    /**
     * Checks if the character is currently moving left or right based on keyboard input.
     * @returns {boolean}
     */
    isMoving() {
        return (
            this.world.keyboard.RIGHT === true ||
            this.world.keyboard.LEFT === true
        );
    }

    /**
     * Collision logic to determine if the character jumps on an enemy's head.
     * @param {MovableObject} mo - The enemy object to check against.
     * @returns {boolean} True if the character lands on the enemy.
     */
    isKillEnemy(mo) {
        const horizontalOverlap =
            this.x + this.w - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.w - mo.offset.right;

        const heightDifferent =
            mo.y +
            mo.h -
            mo.offset.bottom -
            (this.y + this.h - this.offset.bottom);

        // Wir machen den Bereich etwas größer (10 bis 80), damit es bei schnellen Sprüngen besser greift
        const isPushing = heightDifferent < 80 && heightDifferent > 10;

        return (
            horizontalOverlap && isPushing && this.speedY < 0 // Pepe fällt gerade nach unten
        );
    }

    /**
     * Checks if character reached the danger zone to trigger the end boss.
     */
    reachToDangerArea() {
        if (
            this.x > this.world.level.gameDangerArea &&
            !this.reachedToDangerArea
        ) {
            this.reachedToDangerArea = true;
            this.world.level.endboss.moving = true;
        }
    }

    /**
     * Checks if character is dead and triggers the game over screen after a delay.
     */
    checkCharacterIsDead() {
        if (this.isDead()) {
            setTimeout(() => {
                this.world.gameover = true;
            }, 2000);
        }
    }

    /**
     * Checks if the character has been inactive long enough to fall asleep.
     * @returns {boolean} True if inactive for more than 10 seconds.
     */
    isSleeping() {
        let timePassed = new Date().getTime() - this.lastMove;
        timePassed = timePassed / 1000;
        return timePassed > 10;
    }

    /**
     * Plays the snoring sound if the game is not muted.
     */
    playSleepSound() {
        this.HURT_SOUND.pause();
        if (this.world.isMute === false) {
            this.SLEEP_SOUND.play();
        }
    }

    /**
     * Plays the hurt sound if the game is not muted.
     */
    playHurtSound() {
        this.SLEEP_SOUND.pause();
        if (this.world.isMute === false) {
            this.HURT_SOUND.play();
        }
    }

    /**
     * Plays the death sound once if the game is not muted.
     */
    playDeadSound() {
        this.SLEEP_SOUND.pause();
        this.HURT_SOUND.pause();

        if (this.DEAD_SOUND_PLAY_COUNT === 1 && this.world.isMute === false) {
            this.DEAD_SOUND_PLAY_COUNT++;
            this.DEAD_SOUND.play();
        }
    }

    /**
     * Stops all active character-related sounds.
     */
    stopAllSound() {
        this.SLEEP_SOUND.pause();
        this.HURT_SOUND.pause();
        this.DEAD_SOUND.pause();
    }

    /**
     * Main animation loop. Chooses the correct image set based on character state.
     */
    animate() {
        this.intervals.push(
            setInterval(() => {
                let img = this.IMAGES_IDLE;
                if (this.isDead()) {
                    img = this.IMAGES_DEAD;
                    this.playDeadSound();
                } else if (this.isHurt()) {
                    img = this.IMAGES_HURT;
                    this.playHurtSound();
                } else if (this.isAboveGround()) {
                    this.playJumpAnimation();
                    return;
                } else if (this.isMoving()) img = this.IMAGES_WALK;
                else if (this.isSleeping()) {
                    img = this.IMAGES_LONG_IDLE;
                    this.playSleepSound();
                }

                this.playAnimation(img);
                if (!this.isDead() && !this.isHurt() && !this.isSleeping())
                    this.stopAllSound();
            }, 100),
        );
    }

    /**
     * Plays the jump animation and holds the last frame until landing.
     */
    playJumpAnimation() {
        let i = this.currentImage % this.IMAGES_JUMP.length;
        let path = this.IMAGES_JUMP[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (i >= this.IMAGES_JUMP.length - 1) {
            this.currentImage = this.IMAGES_JUMP.length - 1;
        }
    }

    /** @returns {boolean} Check if moving right is allowed. */
    canMoveRight() {
        return (
            this.world.keyboard.RIGHT === true &&
            this.x < this.world.level.gameEndPosition + 500
        );
    }

    /** @returns {boolean} Check if moving left is allowed. */
    canMoveLeft() {
        return this.world.keyboard.LEFT === true && this.x > 0;
    }

    /** @returns {boolean} Check if jumping is allowed. */
    canJump() {
        return this.world.keyboard.SPACE === true && !this.isAboveGround();
    }

    /** @returns {boolean} Check if throwing a bottle is allowed. */
    canThrowBottle() {
        return (
            this.world.keyboard.D === true &&
            this.bottles > 0 &&
            !this.isThrowingBottle
        );
    }

    /** Handles right movement logic and orientation. */
    handleMoveRight() {
        if (this.canMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /** Handles left movement logic and orientation. */
    handleMoveLeft() {
        if (this.canMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /** Executes jump physics. */
    handleJump() {
        if (this.canJump()) {
            this.jump();
        }
    }

    /**
     * Handles the bottle throwing mechanics, cooldown, and inventory update.
     */
    handleThrowBottle() {
        if (this.canThrowBottle()) {
            this.isThrowingBottle = true;
            const throwableObject = new ThrowableObject();
            throwableObject.throw(this.x + 50, this.otherDirection);
            throwableObject.setWorld(this.world);
            this.world.level.throwableObjects.push(throwableObject);
            this.bottles -= 1;
            let percent = (this.bottles / 10) * 100;
            this.world.level.bottleStatusBar.setPersentage(percent);
            setTimeout(() => {
                this.isThrowingBottle = false;
            }, 1000);
        }
    }

    /** Updates the vertical position if character is dead. */
    handleDeath() {
        if (this.isDead()) {
            setTimeout(() => {
                this.y += 10;
            }, 1000);
        }
    }

    /** Positions the camera relative to the character's x-coordinate. */
    handleCamera() {
        if (this.x < this.world.level.gameEndPosition) {
            this.world.camera = -this.x + 100;
        }
    }

    /**
     * Master movement loop running at 60 FPS.
     * Handles all input-related actions and camera updates.
     */
    move() {
        this.intervals.push(
            setInterval(() => {
                this.handleMoveRight();
                this.handleMoveLeft();
                this.handleJump();
                this.handleThrowBottle();
                this.handleDeath();
                this.handleCamera();
            }, 1000 / 60),
        );
    }

    /**
     * Iterates through enemies and kills them if jumped upon.
     */
    checkKillEnemy() {
        for (const enemy of this.world.level.enemies) {
            if (this.isKillEnemy(enemy) && enemy.energy > 0) {
                enemy.energy = 0;
                enemy.playDeadSound();
            }
        }
    }

    /**
     * Stops all running intervals for this character instance.
     */
    clearAllInterval() {
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals = [];
    }
}
