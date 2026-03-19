class Coin extends MovableObject {
  y = 140;
  w = 100;
  h = 100;

  offset = {
    right: 30,
    left: 30,
    top: 30,
    bottom: 30,
  };

  pick = false;

  IMAGES = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];

  COIN_PICKUP_SOUND;

  constructor() {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.animate();
    this.setSounds();
  }

  setWorld(world) {
    this.world = world;
    let maximumPosition =
      this.world.level.gameEndPosition - this.world.level.endboss.w;
    this.x = 400 + Math.random() * maximumPosition;
  }

  setSounds() {
    this.COIN_PICKUP_SOUND = new Audio("assets/sounds/coin-pickup.mp3");
    this.COIN_PICKUP_SOUND.volume = 0.1;
  }

  animate() {
    this.intervals.push(
      setInterval(() => {
        this.playAnimation(this.IMAGES);
      }, 1000 / 5)
    );
  }

  playPickupSound() {
    if (this.world.isMute === false) {
      this.COIN_PICKUP_SOUND.play();
    }
  }

  coinIsPick() {
    this.pick = true;
    this.playPickupSound();
    this.intervals.push(
      setInterval(() => {
        if (this.w > 0) {
          this.y--;
          this.w--;
          this.h--;
        }
      }, 0.5)
    );
  }

  checkCoinIsNotPicked() {
    return this.pick === false;
  }
}
