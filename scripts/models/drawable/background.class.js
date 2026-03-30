class Background extends DrawableObject {
  w = 720;
  h = 480;
  y = 0;

  constructor(path, positionX) {
    super();
    this.x = positionX;
    this.loadImage(path);
  }
}