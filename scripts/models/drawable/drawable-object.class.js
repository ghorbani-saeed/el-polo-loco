class DrawableObject {
  x;
  y;
  w;
  h;
  img;

  currentImage = 0;
  imageCache = {};
  fixInContext = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(imagesPath) {
    for (const imagePath of imagesPath) {
      let image = new Image();
      image.src = imagePath;
      this.imageCache[imagePath] = image;
    }
  }

  getRandomImageIndex(ImagesCount) {
    return Math.floor(Math.random() * ImagesCount);
  }

  drawImage(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "green";
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
    }
  }

  drawFrameOffset(ctx) {
    if (this instanceof Character || this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.rect(this.offset.x, this.offset.y, this.offset.w, this.offset.h);
      ctx.stroke();
    }
  }
}
