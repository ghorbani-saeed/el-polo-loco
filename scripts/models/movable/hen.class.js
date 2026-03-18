class Hen extends Chicken {
  /** Y position of the Hen */
  y = 355;
  /** Width of the Hen */
  w = 60;
  /** Height of the Hen */
  h = 60;
  /** Images for walking animation */
  IMAGES_WALK = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  /** Images for dead animation */
  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  /** Sound played when the Hen dies */
  DEAD_SOUND;

  /** Constructor initializes walking and dead images, and sounds */
  constructor() {
    super();
    this.loadImage(this.IMAGES_WALK[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_DEAD);
    this.setSounds();
  }

  /** Set up the dead sound effect for the Hen */
  setSounds() {
    this.DEAD_SOUND = new Audio("assets/sounds/hen-dead.mp3");
    this.DEAD_SOUND.volume = 0.1;
  }
}
