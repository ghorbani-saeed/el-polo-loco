class MovableObject extends DrawableObject {
  speed = 1;
  speedY = 0;
  acceleration = 2;
  otherDirection = false;
  lastHit;
  world;
  dead = false;
  lastMove = new Date().getTime();
  intervals;
  constructor() {
    super();
    this.intervals = [];
  }
 
  isColliding(mo) {
    return (
      this.x + this.w - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.h - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.w - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.h - mo.offset.bottom
    );
  }
  
 

   applyGravity() {
    this.intervals.push(
      setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 25)
    );
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 200;
    }
  }

  hit() {
  if (this.isDead()) return; 

  this.energy -= this.energyToRemove;

  if (this.energy <= 0) {
    this.energy = 0;
    this.dead = true;
  } else {
    this.lastHit = new Date().getTime();
  }
}

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; 
    timePassed = timePassed / 1000; 
    return timePassed < 1;
  }

  isDead() {
    return this.energy <= 0;
  }

  moveRight() {
    this.x += this.speed;
    this.lastMove = new Date().getTime();
  }

  moveLeft() {
    this.x -= this.speed;
    this.lastMove = new Date().getTime();
  }

  jump() {
    this.speedY = 25;
    this.lastMove = new Date().getTime();
  }

  playAnimation(images, oneTime = false) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    if (!oneTime) {
      this.currentImage++;
    } else {
      if (this.currentImage !== images.length - 1) {
        this.currentImage++;
      }
    }
  }

  clearAllInterval() {
    this.intervals.forEach((id) => clearAllInterval(id));
    this.intervals = [];
  }
}