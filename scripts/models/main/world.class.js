/**
 * Represents the game world.
 * This class acts as the central hub connecting the character, level, canvas, and game logic.
 * It handles the rendering loop, collision detection, and sound management.
 */
class World {
    /** @type {CanvasRenderingContext2D} The 2D rendering context of the canvas. */
    ctx;
    /** @type {HTMLCanvasElement} The canvas element where the game is drawn. */
    canvas;
    /** @type {number} The current camera offset for horizontal scrolling. */
    camera = 0;
    /** @type {Keyboard} The keyboard state listener. */
    keyboard;
    /** @type {Character} The main player character. */
    character;
    /** @type {Level} The current game level containing enemies and objects. */
    level;
    /** @type {number[]} List of active interval IDs for game logic. */
    intervals = [];
    /** @type {number|null} The current requestAnimationFrame ID. */
    animationFrame;

    /** @type {boolean} State indicating if the player lost. */
    gameover = false;
    /** @type {boolean} State indicating if the player won. */
    gameWin = false;
    /** @type {boolean} State indicating if the game sounds are muted. */
    isMute = false;

    /** @type {HTMLAudioElement} The main background music. */
    BACKGROUND_SOUND;
    /** @type {HTMLAudioElement} Sound played when losing. */
    GAMEOVER_SOUND;
    /** @type {HTMLAudioElement} Sound played when winning. */
    WINGAME_SOUND;

    /**
     * Creates an instance of the World.
     * @param {HTMLCanvasElement} canvas - The canvas element for the game.
     * @param {Keyboard} keyboard - The keyboard instance to track inputs.
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = this.canvas.getContext("2d");
        this.animationFrame = null;
        this.character = new Character();
        this.level = new LevelOne();
        this.setWorld();
        this.draw();
        this.checkCollisions();
        this.gameInterval();
        this.setGameSounds();
    }

    /**
     * Passes the world instance to all game objects to allow them to access global game data.
     */
    setWorld() {
        this.setCharacterWorld();
        this.setEndbossWorld();
        this.setEnemiesWorld();
        this.setBottlesWorld();
        this.setCoinsWorld();
        this.setCloudsWorld();
    }

    /** @private Sets world reference for the character. */
    setCharacterWorld() {
        this.character.setWorld(this);
    }

    /** @private Sets world reference for the endboss. */
    setEndbossWorld() {
        this.level.endboss.setWorld(this);
    }

    /** @private Sets world reference for all enemies in the level. */
    setEnemiesWorld() {
        for (const enemy of this.level.enemies) enemy.setWorld(this);
    }

    /** @private Sets world reference for all collectible bottles. */
    setBottlesWorld() {
        for (const bottle of this.level.bottles) bottle.setWorld(this);
    }

    /** @private Sets world reference for all collectible coins. */
    setCoinsWorld() {
        for (const coin of this.level.coins) coin.setWorld(this);
    }

    /** @private Sets world reference for all cloud objects. */
    setCloudsWorld() {
        for (const cloud of this.level.clouds) cloud.setWorld(this);
    }

    /**
     * Initializes and configures all audio elements for the game.
     */
    setGameSounds() {
        this.setBackgroundSound();
        this.setGameOverSound();
        this.setWinGameSound();
    }

    /** @private Initializes background music. */
    setBackgroundSound() {
        this.BACKGROUND_SOUND = new Audio("assets/sounds/background-music.mp3");
        this.BACKGROUND_SOUND.volume = 0.02;
    }

    /** @private Initializes game over sound effect. */
    setGameOverSound() {
        this.GAMEOVER_SOUND = new Audio("assets/sounds/game-over.mp3");
        this.GAMEOVER_SOUND.volume = 0.1;
    }

    /** @private Initializes win game sound effect. */
    setWinGameSound() {
        this.WINGAME_SOUND = new Audio("assets/sounds/win.mp3");
        this.WINGAME_SOUND.volume = 0.1;
    }

    /**
     * Starts the main collision detection interval (60 FPS).
     */
    checkCollisions() {
        this.intervals.push(
            setInterval(() => {
                this.checkCharacterEndbossCollision();
                this.checkCharacterEnemiesCollision();
                this.checkCharacterCoinsCollision();
                this.checkCharacterBottlesCollision();
                this.checkEndbossThrowableCollision();
                this.checkThrowableEnemiesCollision();
            }, 1000 / 60),
        );
    }

    /**
     * Triggers the endboss movement and health bar visibility based on character position.
     */
    checkEndbossTrigger() {
        const endboss = this.level.endboss;
        if (
            !endboss.moving &&
            this.character.x > this.level.gameEndPosition - 200
        ) {
            endboss.moving = true;
        }
        if (endboss.moving) {
            this.level.endbossStatusBar.visible = true;
        }
    }

    /**
     * Checks for collisions between the character and the endboss.
     */
    checkCharacterEndbossCollision() {
        const endboss = this.level.endboss;
        const distance = endboss.x - (this.character.x + this.character.w);
        if (
            distance < 10 &&
            this.character.isColliding(endboss) &&
            endboss.energy >= 0 &&
            !this.character.isDead()
        ) {
            this.character.hit();
            endboss.attack();
            this.level.healthStatusBar.setPersentage(this.character.energy);
        }
    }

    /**
     * Checks for collisions between the character and all regular enemies.
     */
    checkCharacterEnemiesCollision() {
        for (const enemy of this.level.enemies) {
            const distance = Math.abs(enemy.x - this.character.x);
            if (
                distance < 90 &&
                this.character.isColliding(enemy) &&
                enemy.energy > 0 &&
                !this.character.isDead() &&
                !this.character.isHurt()
            ) {
                this.character.hit();
                this.level.healthStatusBar.setPersentage(this.character.energy);
            }
        }
    }

    /**
     * Checks for coin collection.
     */
    checkCharacterCoinsCollision() {
        for (const coin of this.level.coins) {
            if (
                this.character.isColliding(coin) &&
                coin.checkCoinIsNotPicked()
            ) {
                this.character.getCoin();
                coin.coinIsPick();
                let percent = (this.character.coins / 10) * 100;
                this.level.coinStatusBar.setPersentage(percent);
            }
        }
    }

    /**
     * Checks for bottle collection.
     */
    checkCharacterBottlesCollision() {
        for (const bottle of this.level.bottles) {
            if (
                this.character.isColliding(bottle) &&
                bottle.checkBottleIsNotPicked()
            ) {
                this.character.getBottle();
                bottle.bottleIsPick();
            }
        }
    }

    /**
     * Checks if throwable objects hit the endboss.
     */
    checkEndbossThrowableCollision() {
        for (const throwableObject of this.level.throwableObjects) {
            const endboss = this.level.endboss;
            if (
                endboss.isColliding(throwableObject) &&
                !throwableObject.isSplash
            ) {
                throwableObject.playBossHitSound();
                throwableObject.splash();
                endboss.hit();
            }
        }
    }

    /**
     * Checks if throwable objects hit regular enemies.
     */
    checkThrowableEnemiesCollision() {
        for (const throwableObject of this.level.throwableObjects) {
            for (const enemy of this.level.enemies) {
                if (
                    enemy.isColliding(throwableObject) &&
                    throwableObject.isSplash === false
                ) {
                    throwableObject.splash();
                    enemy.hit();
                }
            }
        }
    }

    /**
     * Toggles the background music and mutes character sounds if necessary.
     */
    toggleBackgroundSound() {
        if (this.isMute) {
            this.playBackgroundSound();
            this.isMute = false;
        } else {
            this.pauseBackgroundSound();
            this.character.stopAllSound();
            this.isMute = true;
        }
    }

    /**
     * Resets game over and win states.
     */
    resetGameOverAndWinStatus() {
        this.gameover = false;
        this.gameWin = false;
    }

    /**
     * Mutes background music and sets mute flag.
     */
    muteBackgroundSound() {
        this.pauseBackgroundSound();
        this.isMute = true;
    }

    /** @private Plays background music. */
    playBackgroundSound() {
        if (this.BACKGROUND_SOUND) this.BACKGROUND_SOUND.play();
    }

    /** @private Pauses background music. */
    pauseBackgroundSound() {
        if (this.BACKGROUND_SOUND) this.BACKGROUND_SOUND.pause();
    }

    /** @private Stops and clears background music. */
    stopBackgroundSound() {
        if (this.BACKGROUND_SOUND) {
            this.BACKGROUND_SOUND.pause();
            this.BACKGROUND_SOUND.currentTime = 0;
            this.BACKGROUND_SOUND = null;
        }
    }

    /** @private Starts game over sound effect. */
    startGameOverSound() {
        if (this.GAMEOVER_SOUND) {
            this.GAMEOVER_SOUND.play();
            this.GAMEOVER_SOUND.currentTime = 0;
            this.GAMEOVER_SOUND = null;
        }
    }

    /** @private Starts win game sound effect. */
    startWinGameSound() {
        if (this.WINGAME_SOUND) {
            this.WINGAME_SOUND.play();
            this.WINGAME_SOUND.currentTime = 0;
            this.WINGAME_SOUND = null;
        }
    }

    /**
     * Runs various status checks (death, danger zone) for the character and boss.
     */
    gameInterval() {
        this.intervals.push(
            setInterval(() => {
                this.character.checkKillEnemy();
                this.character.reachToDangerArea();
                this.character.checkCharacterIsDead();
                this.level.endboss.checkEndBossIsDead();
            }, 10),
        );
    }

    /**
     * Main drawing loop. Handles camera translation and object rendering.
     */
    draw() {
        this.checkEndbossTrigger();
        this.clearCanvas();
        this.ctx.translate(this.camera, 0);
        this.drawBackgrounds();

        if (!this.gameover && !this.gameWin) {
            this.drawGameObjects();
            this.drawStatus();
        }
        if (this.gameover) this.handleGameOver();
        if (this.gameWin) this.handleGameWin();

        this.ctx.translate(-this.camera, 0);
        this.setRequestAnimationFrame();
    }

    /**
     * Debugging tool: Draws a red collision box around an object.
     * @param {MovableObject} obj - The object to draw a box around.
     */
    drawCollisionBox(obj) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(
            obj.x + obj.offset.left,
            obj.y + obj.offset.top,
            obj.w - obj.offset.left - obj.offset.right,
            obj.h - obj.offset.top - obj.offset.bottom,
        );
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** @private Draws background objects. */
    drawBackgrounds() {
        this.addMultipleObjectToMap(this.level.backgrounds);
    }

    /** @private Draws all dynamic game objects. */
    drawGameObjects() {
        this.addMultipleObjectToMap(this.level.clouds);
        this.addMultipleObjectToMap(this.level.coins);
        this.addMultipleObjectToMap(this.level.bottles);
        this.addMultipleObjectToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addToMap(this.character);
        this.addMultipleObjectToMap(this.level.throwableObjects);
    }

    /** @private Draws UI status bars. */
    drawStatus() {
        this.addToMap(this.level.healthStatusBar);
        this.addToMap(this.level.coinStatusBar);
        this.addToMap(this.level.bottleStatusBar);
        if (this.level.endbossStatusBar.visible) {
            this.addToMap(this.level.endbossStatusBar);
        }
    }

    /** @private Handles game over UI and sounds. */
    handleGameOver() {
        showGameOverScreen();
        if (!this.isMute) this.startGameOverSound();
        this.stopAllGamePlay();
    }

    /** @private Handles game win UI and sounds. */
    handleGameWin() {
        showGameWinScreen();
        if (!this.isMute) this.startWinGameSound();
        this.stopAllGamePlay();
    }

    /** @private Requests the next animation frame. */
    setRequestAnimationFrame() {
        if (!this.gameover && !this.gameWin) {
            let self = this;
            this.animationFrame = requestAnimationFrame(() => self.draw());
        }
    }

    /**
     * Adds an array of objects to the map.
     * @param {DrawableObject[]} objects
     */
    addMultipleObjectToMap(objects) {
        for (const object of objects) this.addToMap(object);
    }

    /**
     * Adds a single object to the map and handles camera fixing and flipping.
     * @param {MovableObject} mo
     */
    addToMap(mo) {
        if (mo.fixInContext === true) this.ctx.translate(-this.camera, 0);
        this.flipImage(mo);
        mo.drawImage(this.ctx);
        this.flipImageBack(mo);
        if (mo.fixInContext === true) this.ctx.translate(this.camera, 0);
    }

    /** @private Flips an image if the object direction is reversed. */
    flipImage(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.w, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
    }

    /** @private Restores image orientation after drawing. */
    flipImageBack(mo) {
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

    /**
     * Stops all active gameplay elements including sounds and animations.
     */
    stopAllGamePlay() {
        this.stopBackgroundSound();
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        this.clearAllIntervals();
    }

    /**
     * Clears all intervals globally and locally for all objects.
     */
    clearAllIntervals() {
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals = [];
        this.character.clearAllInterval();
        this.level.clearEndBossInterval();
        this.level.clearEnemiesInterval();
        this.level.clearCloudsInterval();
        this.level.clearCoinsInterval();
    }
}



