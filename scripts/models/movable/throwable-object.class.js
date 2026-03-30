class ThrowableObject extends MovableObject {
  x = 400;
  y = 330;
  w = 60;
  h = 60;

  offset = {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  };

  isSplash = false;

  IMAGES_ROTATE = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_ROTATE[0]);
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.animate();
  }
  
  setWorld(world) {
    this.world = world;
  }

  animate() {
    this.intervals.push(
      setInterval(() => {
        if (this.isSplash) {
          this.playAnimation(this.IMAGES_SPLASH);
        } else {
          this.playAnimation(this.IMAGES_ROTATE);
        }
      }, 1000 / 20)
    );
  }

throw(x, direction) {
    this.x = x;
    this.y = 160;
    this.speedY = 10;
    this.applyGravity();
    const multiplier = direction ? -1 : 1; 

    this.intervals.push(setInterval(() => {
        if (!this.isSplash) this.x += 10 * multiplier;
    }, 30));
}

  splash() {
    this.isSplash = true;
  }
}