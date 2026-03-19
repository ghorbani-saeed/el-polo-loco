class StatusBar extends DrawableObject {
  w = 130;
  h = 40;
  percentage = 100;
  fixInContext = true;

  setPersentage(percentage) {
    this.percentage = percentage;
    let imageIndex = this.showStatusBarByPercentage();
    let imagePath = this.IMAGES[imageIndex];
    this.img = this.imageCache[imagePath];
  }

  showStatusBarByPercentage() {
    switch (true) {
      case this.percentage > 99:
        return 5;
      case this.percentage > 80:
        return 4;
      case this.percentage > 60:
        return 3;
      case this.percentage > 40:
        return 2;
      case this.percentage > 20:
        return 1;
      default:
        return 0;
    }
  }
}
