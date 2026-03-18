class DrawableObject {
  x;
  y;
  w;
  h;
  img;

  currentImage = 0;
  imageCache = {};
  fixInContext = false;

  // Load a single image and assign it to this.img
  // @param {string} path - Path to the image
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  // Preload multiple images and store them in imageCache
  // @param {Array<string>} imagesPath - Array of image paths
  loadImages(imagesPath) {
    for (const imagePath of imagesPath) {
      let image = new Image();
      image.src = imagePath;
      this.imageCache[imagePath] = image;
    }
  }

  // Get a random integer index based on the number of images
  // @param {number} ImagesCount - Number of images
  // @return {number} Random index between 0 and ImagesCount-1
  getRandomImageIndex(ImagesCount) {
    return Math.floor(Math.random() * ImagesCount);
  }


  // Draw the current image of the object on the canvas
  // @param {CanvasRenderingContext2D} ctx - Canvas rendering context
  drawImage(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  // Draw a green outline frame around the object (for debugging)
  // @param {CanvasRenderingContext2D} ctx - Canvas rendering context
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "green";
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
    }
  }

  // Draw a red outline for the object's offset box (for debugging)
  // @param {CanvasRenderingContext2D} ctx - Canvas rendering context
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
