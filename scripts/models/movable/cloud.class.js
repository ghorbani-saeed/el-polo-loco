class Cloud extends MovableObject {
  y = 30;
  w = 450;
  h = 350;
  speed = 0.15;

  IMAGES = [
    "assets/img/5_background/layers/4_clouds/1.png",
    "assets/img/5_background/layers/4_clouds/2.png",
  ];

  constructor(x) {
    super();
    this.x = x;
    let imageIndex = this.getRandomImageIndex(2);
    this.loadImage(this.IMAGES[imageIndex]);
    this.loadImages(this.IMAGES);
    this.move();
  }

  setWorld(world) {
    this.world = world;
  }

  move() {
    this.intervals.push(
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60)
    );
  }
}
