class Character extends MovableObject {
    x = 0;
    y = 200;
    w = 130;
    h = 220;
    speed = 8;
    energy = 100;
    coins = 0;
    bottles = 0;
    isThrowingBottle = false;
    coinsToAdded = 0;
    bottlesToAdded = 0;
    energyToRemove = 25;
    reachedToDangerArea = false;

    offset = {
        right: 20,
        left: 20,
        top: 70,
        bottom: 10,
    };

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

    IMAGES_WALK = [
        "assets/img/2_character_pepe/2_walk/W-21.png",
        "assets/img/2_character_pepe/2_walk/W-22.png",
        "assets/img/2_character_pepe/2_walk/W-23.png",
        "assets/img/2_character_pepe/2_walk/W-24.png",
        "assets/img/2_character_pepe/2_walk/W-25.png",
        "assets/img/2_character_pepe/2_walk/W-26.png",
    ];

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

    IMAGES_HURT = [
        "assets/img/2_character_pepe/4_hurt/H-41.png",
        "assets/img/2_character_pepe/4_hurt/H-42.png",
        "assets/img/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_DEAD = [
        "assets/img/2_character_pepe/5_dead/D-51.png",
        "assets/img/2_character_pepe/5_dead/D-52.png",
        "assets/img/2_character_pepe/5_dead/D-53.png",
        "assets/img/2_character_pepe/5_dead/D-54.png",
        "assets/img/2_character_pepe/5_dead/D-55.png",
        "assets/img/2_character_pepe/5_dead/D-56.png",
    ];

    SLEEP_SOUND;
    HURT_SOUND;
    DEAD_SOUND;
    DEAD_SOUND_PLAY_COUNT = 1;

    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadAllImages();
        this.animate();
        this.move();
        this.applyGravity();
        this.setSounds();
    }

    setSounds() {
        this.SLEEP_SOUND = new Audio("assets/sounds/sleeping.mp3");
        this.SLEEP_SOUND.volume = 0.1;
        this.HURT_SOUND = new Audio("assets/sounds/character-hurt-sound.mp3");
        this.HURT_SOUND.volume = 0.1;
        this.DEAD_SOUND = new Audio("assets/sounds/character-death.ogg");
        this.DEAD_SOUND.volume = 0.1;
        this.DEAD_SOUND.loop = false;
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    setWorld(world) {
        this.world = world;
        this.coinsToAdded = 100 / this.world.level.coins.length;
        this.bottles = 0;
        this.updateBottleStatusBar();
    }

    getCoin() {
        if (this.coins < 10) {
            this.coins += 1;
            let percent = (this.coins / 10) * 100;
            this.world.level.coinStatusBar.setPersentage(percent);
        }
    }

    getBottle() {
        if (this.bottles < 10) {
            this.bottles += 1;
            this.updateBottleStatusBar();
        }
    }

    updateBottleStatusBar() {
        let maxBottles = 10;
        let percent = (this.bottles / maxBottles) * 100;
        this.world.level.bottleStatusBar.setPersentage(percent);
    }

    isMoving() {
        return (
            this.world.keyboard.RIGHT === true ||
            this.world.keyboard.LEFT === true
        );
    }

    isKillEnemy(mo) {
        const horizontalOverlap =
            this.x + this.w - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.w - mo.offset.right;
        const heightDifferent =
            mo.y +
            mo.h -
            mo.offset.bottom -
            (this.y + this.h - this.offset.bottom);
        const isPushing = heightDifferent < 60 && heightDifferent > 30;
        return (
            horizontalOverlap &&
            isPushing &&
            !this.world.keyboard.SPACE &&
            mo.energy > 0
        );
    }

    reachToDangerArea() {
        if (
            this.x > this.world.level.gameDangerArea &&
            !this.reachedToDangerArea
        ) {
            this.reachedToDangerArea = true;
            this.world.level.endboss.moving = true;
        }
    }

    checkCharacterIsDead() {
        if (this.isDead()) {
            setTimeout(() => {
                this.world.gameover = true;
            }, 2000);
        }
    }

    isSleeping() {
        let timePassed = new Date().getTime() - this.lastMove;
        timePassed = timePassed / 1000;
        return timePassed > 10;
    }

    playSleepSound() {
        this.HURT_SOUND.pause();
        if (this.world.isMute === false) {
            this.SLEEP_SOUND.play();
        }
    }

    playHurtSound() {
        this.SLEEP_SOUND.pause();
        if (this.world.isMute === false) {
            this.HURT_SOUND.play();
        }
    }

    playDeadSound() {
        this.SLEEP_SOUND.pause();
        this.HURT_SOUND.pause();

        if (this.DEAD_SOUND_PLAY_COUNT === 1 && this.world.isMute === false) {
            this.DEAD_SOUND_PLAY_COUNT++;
            this.DEAD_SOUND.play();
        }
    }

    stopAllSound() {
        this.SLEEP_SOUND.pause();
        this.HURT_SOUND.pause();
        this.DEAD_SOUND.pause();
    }

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
                    // MINIMALE ÄNDERUNG HIER:
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

    playJumpAnimation() {
        let i = this.currentImage % this.IMAGES_JUMP.length; 
        let path = this.IMAGES_JUMP[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (i >= this.IMAGES_JUMP.length - 1) {
            this.currentImage = this.IMAGES_JUMP.length - 1;
        }
    }
    canMoveRight() {
        return (
            this.world.keyboard.RIGHT === true &&
            this.x < this.world.level.gameEndPosition + 500
        );
    }

  

    canMoveLeft() {
        return (
            this.world.keyboard.LEFT === true && this.x > 0 
        );
    }


    canJump() {
        return this.world.keyboard.SPACE === true && !this.isAboveGround();
    }

    canThrowBottle() {
        return (
            this.world.keyboard.D === true &&
            this.bottles > 0 &&
            !this.isThrowingBottle
        );
    }

    handleMoveRight() {
        if (this.canMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    handleMoveLeft() {
        if (this.canMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    handleJump() {
        if (this.canJump()) {
            this.jump();
        }
    }

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

    handleDeath() {
        if (this.isDead()) {
            setTimeout(() => {
                this.y += 10;
            }, 1000);
        }
    }

    handleCamera() {
        if (this.x < this.world.level.gameEndPosition) {
            this.world.camera = -this.x + 100;
        }
    }

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

    checkKillEnemy() {
        for (const enemy of this.world.level.enemies) {
            if (this.isKillEnemy(enemy) && enemy.energy > 0) {
                enemy.energy = 0;
                enemy.playDeadSound();
            }
        }
    }

    clearAllInterval() {
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals = [];
    }
}
