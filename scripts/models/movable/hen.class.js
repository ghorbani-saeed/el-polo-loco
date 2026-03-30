class Hen extends Chicken {
  y = 355;
  w = 60;
  h = 60;
  IMAGES_WALK = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  DEAD_SOUND;

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALK[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_DEAD);
    this.setSounds();
  }

  setSounds() {
    this.DEAD_SOUND = new Audio("assets/sounds/hen-dead.mp3");
    this.DEAD_SOUND.volume = 0.1;
  }
}