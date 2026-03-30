class World {
  ctx;
  canvas;
  camera = 0;
  keyboard;
  character;
  level;
  intervals = [];
  animationFrame;
  gameover = false;
  gameWin = false;
  isMute = false;
  BACKGROUND_SOUND;
  GAMEOVER_SOUND;
  WINGAME_SOUND;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = this.canvas.getContext("2d");
    this.animationFrame = null;
    this.character = new Character();
    this.level = new LevelOne();
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.gameInterval();
    this.setGameSounds();
  }

  setWorld() {
    this.setCharacterWorld();
    this.setEndbossWorld();
    this.setEnemiesWorld();
    this.setBottlesWorld();
    this.setCoinsWorld();
    this.setCloudsWorld();
  }

  setCharacterWorld() {
    this.character.setWorld(this);
  }

  setEndbossWorld() {
    this.level.endboss.setWorld(this);
  }

  setEnemiesWorld() {
    for (const enemy of this.level.enemies) enemy.setWorld(this);
  }

  setBottlesWorld() {
    for (const bottle of this.level.bottles) bottle.setWorld(this);
  }

  setCoinsWorld() {
    for (const coin of this.level.coins) coin.setWorld(this);
  }

  setCloudsWorld() {
    for (const cloud of this.level.clouds) cloud.setWorld(this);
  }

  setGameSounds() {
    this.setBackgroundSound();
    this.setGameOverSound();
    this.setWinGameSound();
  }

  setBackgroundSound() {
    this.BACKGROUND_SOUND = new Audio("assets/sounds/background-music.mp3");
    this.BACKGROUND_SOUND.volume = 0.02;
  }

  setGameOverSound() {
    this.GAMEOVER_SOUND = new Audio("assets/sounds/game-over.mp3");
    this.GAMEOVER_SOUND.volume = 0.1;
  }

  setWinGameSound() {
    this.WINGAME_SOUND = new Audio("assets/sounds/win.mp3");
    this.WINGAME_SOUND.volume = 0.1;
  }

  checkCollisions() {
    this.intervals.push(
      setInterval(() => {
        this.checkCharacterEndbossCollision();
        this.checkCharacterEnemiesCollision();
        this.checkCharacterCoinsCollision();
        this.checkCharacterBottlesCollision();
        this.checkEndbossThrowableCollision();
        this.checkThrowableEnemiesCollision();
        this.checkThrowableObjects();
      }, 200)
    );
  }
  
 checkEndbossTrigger() {
  const endboss = this.level.endboss;

  if (!endboss.moving && this.character.x > this.level.gameEndPosition - 200) {
    endboss.moving = true;
  }

  if (endboss.moving) {
    this.level.endbossStatusBar.visible = true;
  }
}

  checkCharacterEndbossCollision() {
    const endboss = this.level.endboss;
    const distance = endboss.x - (this.character.x + this.character.w);

    if (
      distance < 10 &&  
      this.character.isColliding(endboss) &&
      endboss.energy >= 0 &&
      !this.character.isDead()
    ) {
      this.character.hit();
      endboss.attack();
      this.level.healthStatusBar.setPersentage(this.character.energy);
    }
  }

 checkCharacterEnemiesCollision() {
  for (const enemy of this.level.enemies) {
    const distance = Math.abs(enemy.x - this.character.x);
    if (
      distance < 90 && 
      this.character.isColliding(enemy) &&
      enemy.energy > 0 &&
      !this.character.isDead()
    ) {
      this.character.hit();
      this.level.healthStatusBar.setPersentage(this.character.energy);
    }
  }
}
  
  checkCharacterCoinsCollision() {
    for (const coin of this.level.coins) {
        if (this.character.isColliding(coin) && coin.checkCoinIsNotPicked()) {
            this.character.getCoin();       
            coin.coinIsPick();
            let percent = (this.character.coins / 10) * 100;  
            this.level.coinStatusBar.setPersentage(percent); 
        }
    }
}

  checkCharacterBottlesCollision() {
    for (const bottle of this.level.bottles) {
      if (
        this.character.isColliding(bottle) &&
        bottle.checkBottleIsNotPicked()
      ) {
        this.character.getBottle();
        bottle.bottleIsPick();
      }
    }
  }

checkEndbossThrowableCollision() {
  for (const throwableObject of this.level.throwableObjects) {
    const endboss = this.level.endboss;

    if (endboss.isColliding(throwableObject) && !throwableObject.isSplash) {
      throwableObject.splash(); 
      endboss.hit();            
    }
  }
}

 checkThrowableEnemiesCollision() {
  for (const throwableObject of this.level.throwableObjects) {
    for (const enemy of this.level.enemies) {
      if (
        enemy.isColliding(throwableObject) &&
        throwableObject.isSplash === false
      ) {
        throwableObject.splash();
        enemy.hit();
      }
    }
  }
}

  toggleBackgroundSound() {
    if (this.isMute) {
      this.playBackgroundSound();
      this.isMute = false;
    } else {
      this.pauseBackgroundSound();
      this.character.stopAllSound();
      this.isMute = true;
    }
  }

  resetGameOverAndWinStatus() {
    this.gameover = false;
    this.gameWin = false;
  }

  muteBackgroundSound() {
    this.pauseBackgroundSound();
    this.isMute = true;
  }

  playBackgroundSound() {
    if (this.BACKGROUND_SOUND) {
      this.BACKGROUND_SOUND.play();
    }
  }

  pauseBackgroundSound() {
    if (this.BACKGROUND_SOUND) {
      this.BACKGROUND_SOUND.pause();
    }
  }

  stopBackgroundSound() {
    if (this.BACKGROUND_SOUND) {
      this.BACKGROUND_SOUND.pause();
      this.BACKGROUND_SOUND.currentTime = 0;
      this.BACKGROUND_SOUND = null;
    }
  }

  startGameOverSound() {
    if (this.GAMEOVER_SOUND) {
      this.GAMEOVER_SOUND.play();
      this.GAMEOVER_SOUND.currentTime = 0;
      this.GAMEOVER_SOUND = null;
    }
  }

  startWinGameSound() {
    if (this.WINGAME_SOUND) {
      this.WINGAME_SOUND.play();
      this.WINGAME_SOUND.currentTime = 0;
      this.WINGAME_SOUND = null;
    }
  }

  gameInterval() {
    this.intervals.push(
      setInterval(() => {
        this.character.checkKillEnemy();
        this.character.reachToDangerArea();
        this.character.checkCharacterIsDead();
        this.level.endboss.checkEndBossIsDead();
      }, 10)
    );
  }

  draw() {
    this.checkEndbossTrigger();
    this.clearCanvas();
    this.ctx.translate(this.camera, 0);
    this.drawBackgrounds();

    if (!this.gameover && !this.gameWin) {
        this.drawGameObjects();
        this.drawStatus();
    }
    if (this.gameover) this.handleGameOver();
    if (this.gameWin) this.handleGameWin();
    this.ctx.translate(-this.camera, 0);
    this.setRequestAnimationFrame();
}

drawCollisionBox(obj) {
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(
        obj.x + obj.offset.left,
        obj.y + obj.offset.top,
        obj.w - obj.offset.left - obj.offset.right,
        obj.h - obj.offset.top - obj.offset.bottom
    );
}

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackgrounds() {
    this.addMultipleObjectToMap(this.level.backgrounds);
  }

  drawGameObjects() {
    this.addMultipleObjectToMap(this.level.coins);
    this.addMultipleObjectToMap(this.level.bottles);
    this.addMultipleObjectToMap(this.level.enemies);
    this.addMultipleObjectToMap(this.level.clouds);
    this.addToMap(this.level.endboss);
    this.addToMap(this.character);
    this.addMultipleObjectToMap(this.level.throwableObjects);
  }

  drawStatus() {
    this.addToMap(this.level.healthStatusBar);
    this.addToMap(this.level.coinStatusBar);
    this.addToMap(this.level.bottleStatusBar);
    if (this.level.endbossStatusBar.visible) {
      this.addToMap(this.level.endbossStatusBar);
    } 
  }

  handleGameOver() {
    showGameOverScreen();
    if (!this.isMute) this.startGameOverSound();
    this.stopAllGamePlay();
  }

  handleGameWin() {
    showGameWinScreen();
    if (!this.isMute) this.startWinGameSound();
    this.stopAllGamePlay();
  }

  setRequestAnimationFrame() {
    if (!this.gameover && !this.gameWin) {
      let self = this;
      this.animationFrame = requestAnimationFrame(() => self.draw());
    }
  }

  addMultipleObjectToMap(objects) {
    for (const object of objects) this.addToMap(object);
  }

  addToMap(mo) {
    if (mo.fixInContext === true) {
      this.ctx.translate(-this.camera, 0);
    }

    this.flipImage(mo);
    mo.drawImage(this.ctx);
    this.flipImageBack(mo);
    if (mo.fixInContext === true) {
      this.ctx.translate(this.camera, 0);
    }
  }

  flipImage(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.w, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  }

  flipImageBack(mo) {
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  stopAllGamePlay() {
    this.stopBackgroundSound();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.clearAllIntervals();
  }

  clearAllIntervals() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
    this.character.clearAllInterval();
    this.level.clearEndBossInterval();
    this.level.clearEnemiesInterval();
    this.level.clearCloudsInterval();
    this.level.clearCoinsInterval();
  }
}
