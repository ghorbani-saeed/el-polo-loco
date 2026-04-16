/**
 * Base class for all objects that can be drawn on the canvas.
 * Contains basic properties like position, dimensions, and image handling.
 */
class DrawableObject {
    /** @type {number} The horizontal position on the x-axis */
    x;
    /** @type {number} The vertical position on the y-axis */
    y;
    /** @type {number} The width of the object */
    w;
    /** @type {number} The height of the object */
    h;
    /** @type {HTMLImageElement} The current main image of the object */
    img;

    /** @type {number} Index of the current image in an animation sequence */
    currentImage = 0;
    /** @type {Object<string, HTMLImageElement>} Storage for preloaded images (cache) */
    imageCache = {};
    /** @type {boolean} Determines if the object stays fixed on the screen (like UI) */
    fixInContext = false;

    /**
     * Loads a single image from the given path.
     * @param {string} path - The file path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads multiple images and stores them in the imageCache.
     * @param {string[]} imagesPath - An array of file paths to images.
     */
    loadImages(imagesPath) {
        for (const imagePath of imagesPath) {
            let image = new Image();
            image.src = imagePath;
            this.imageCache[imagePath] = image;
        }
    }

    /**
     * Generates a random index based on a total count.
     * @param {number} ImagesCount - The total number of images available.
     * @returns {number} A random integer index.
     */
    getRandomImageIndex(ImagesCount) {
        return Math.floor(Math.random() * ImagesCount);
    }

    /**
     * Draws the current image of the object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawImage(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    /**
     * Draws a green rectangular frame around specific object types for debugging.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss
        ) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.stroke();
        }
    }

    /**
     * Draws a red rectangular frame based on the object's offset for collision debugging.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.rect(
                this.offset.x,
                this.offset.y,
                this.offset.w,
                this.offset.h,
            );
            ctx.stroke();
        }
    }
}
