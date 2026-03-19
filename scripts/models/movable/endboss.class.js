class Endboss extends MovableObject {
  END_BOSS_DEAD_SOUND;
  deadSoundPlayed = false;

  y = 90;
  w = 300;
  h = 350;
  energy = 100;
  speed = 2;
  energyToRemove = 0;
  moving = false;
  lastAttack;

  movingDirection = "left";
  offset = {
    right: 60,
    left: 60,
    top: 40,
    bottom: 0,
  };

  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_WALK = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadAllImages();
    this.setSounds(); 
    this.animate();
    this.move();
  }

  loadAllImages() {
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

    setSounds() {
    this.END_BOSS_DEAD_SOUND = new Audio("assets/sounds/endboss-dead.mp3");
    this.END_BOSS_DEAD_SOUND.volume = 0.3;
  }

 
  setWorld(world) {
    this.world = world;
    this.x = this.world.level.gameEndPosition + 300;
    this.energyToRemove = 100 / (this.world.level.bottles.length - 5);
  }

  isMoving() {
    return this.moving;
  }

  attack() {
    this.lastAttack = new Date().getTime();
  }

  
  isAttacking() {
    let timePassed = (new Date().getTime() - this.lastAttack) / 1000;
    return timePassed < 1;
  }

   checkEndBossIsDead() {
    if (this.isDead()) {
      if (!this.deadSoundPlayed) {
        if (this.world.isMute === false) {
          this.END_BOSS_DEAD_SOUND.play();
        }
        this.deadSoundPlayed = true;
      }
      setTimeout(() => {
        this.world.gameWin = true;
      }, 2000);
    }
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.moving = false;
    this.y += 40;
  }

  playHurtAnimation() {
    this.moving = false;
    this.playAnimation(this.IMAGES_HURT);
    setInterval(() => {
      this.moving = true;
    }, 500);
  }

  playAttackAnimation() {
    this.moving = false;
    this.playAnimation(this.IMAGES_ATTACK);
    setInterval(() => {
      this.moving = true;
    }, 1000);
  }

  animate() {
    this.intervals.push(
      setInterval(() => {
        switch (true) {
          case this.isDead():
            this.playDeadAnimation();
            break;
          case this.isHurt():
            this.playHurtAnimation();
            break;
          case this.isAttacking():
            this.playAttackAnimation();
            break;
          case this.isMoving():
            this.playAnimation(this.IMAGES_WALK);
            break;
          default:
            this.playAnimation(this.IMAGES_ALERT);
            break;
        }
      }, 1000 / 6)
    );
  }

  checkShouldMoveLeft() {
    if (this.world.character.x + this.world.character.w < this.x) {
      this.movingDirection = "left";
    }
  }

  checkShouldMoveRight() {
    if (this.x + this.w < this.world.character.x) {
      this.movingDirection = "right";
    }
  }

  handleMovingRightOrLeft() {
    if (this.movingDirection === "right") {
      this.moveRight();
      this.otherDirection = true;
    } else {
      this.moveLeft();
      this.otherDirection = false;
    }
  }

  move() {
    this.intervals.push(
      setInterval(() => {
        if (this.isMoving()) {
          this.checkShouldMoveLeft();
          this.checkShouldMoveRight();
          this.handleMovingRightOrLeft();
        }
      }, 1000 / 60)
    );
  }

  clearAllInterval() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }
}

