class Chicken extends MovableObject {
    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };

    energy = 100;
    DEAD_SOUND;

    constructor() {
        super();
        this.animate();
        this.move();
        this.speed = 0.2 + Math.random() * 0.25;
    }

    setWorld(world) {
        this.world = world;
        let maximumPosition =
            this.world.level.gameEndPosition - this.world.level.endboss.w;
        this.x = 500 + Math.random() * maximumPosition;
    }

    playDeadSound() {
        if (this.DEAD_SOUND && this.world.isMute === false) {
            this.DEAD_SOUND.play();
        }
    }

    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.w = 0;
            this.h = 0;
        }, 1500);
    }

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