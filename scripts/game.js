let world;
let canvas;
let gameContainerElement;
let startIconsElement;
let startScreenElement;
let helpScreenElement;
let imprintScreenElement;
let gameScreenElement;
let gameOverScreenElement;
let gameWinScreenElement;
let storyScreenElement;
let keyboard;
let isOverlayOpen = false; 

function init() {
    canvas = document.getElementById("canvas");
    gameContainerElement = document.getElementById("game-container");
    startIconsElement = document.getElementById("start-icons");
    startScreenElement = document.getElementById("start-screen");
    helpScreenElement = document.getElementById("help-screen");
    imprintScreenElement = document.getElementById("impressum-screen");
    gameScreenElement = document.getElementById("game-screen");
    gameOverScreenElement = document.getElementById("gameover-screen");
    gameWinScreenElement = document.getElementById("gamewin-screen");
    storyScreenElement = document.getElementById("story-screen");
    keyboard = new Keyboard();
    bindTouchEvents(); 
}

function showHelpPage() {
    if (isOverlayOpen) return; 
    helpScreenElement.classList.remove("d-none");
    isOverlayOpen = true; 
}

function showStory() {
    if (isOverlayOpen) return;
    storyScreenElement.classList.remove("d-none");
    isOverlayOpen = true;
}

function showImpressum() {
    if (isOverlayOpen) return;
    document.getElementById("impressum-screen").classList.remove("d-none");
    isOverlayOpen = true;
}

function hideHelpPage() {
    helpScreenElement.classList.add("d-none");
    isOverlayOpen = false; 
}

function hideStory() {
    storyScreenElement.classList.add("d-none");
    isOverlayOpen = false;
}

function hideImpressum() {
    document.getElementById("impressum-screen").classList.add("d-none");
    isOverlayOpen = false;
}


function startNewGame(delay = 100, restart = false) {
  if (isOverlayOpen) return; 
  if (!restart) {
    prepareStartScreen();
  }
  initializeWorld();
  checkMuteStatus();
  updateTouchButtons();
  showGameScreenAfterDelay(delay);
}

function prepareStartScreen() {
    gameContainerElement.classList.add("m-width");
    startIconsElement.classList.add("d-none");
    startScreenElement.classList.remove("d-none");
}

function preparebackToMenuScreen() {
    gameScreenElement.classList.add("d-none");
    startIconsElement.classList.remove("d-none");
    gameContainerElement.classList.add("m-width");
}

function initializeWorld() {
    world = new World(canvas, keyboard);
}

function showGameScreenAfterDelay(delay) {
    setTimeout(() => {
        startScreenElement.classList.add("d-none");
        startIconsElement.classList.add("d-none"); 
        gameScreenElement.classList.remove("d-none");
        gameContainerElement.classList.remove("m-width");
        updateTouchButtons(); 
    }, delay);
}

function backToMenu() {
    hideGameOverScreen();
    hideGameWinScreen();
    world.resetGameOverAndWinStatus();
    preparebackToMenuScreen();
}

function restartGame() {
    hideGameOverScreen();
    hideGameWinScreen();
    world.resetGameOverAndWinStatus();
    startNewGame(10, true);
}

function checkMuteStatus() {
    const isMuted = getMuteStatusFromStorage();

    if (isMuted) muteBackgroundSound();
    else playBackgroundSound();

    updateSoundIcon();
}

function toggleMuteSound() {
    world.toggleBackgroundSound();
    updateSoundIcon();
    updateMuteStatusInStorage();
}

function getMuteStatusFromStorage() {
    return JSON.parse(localStorage.getItem("epl-mute")) === true;
}

function muteBackgroundSound() {
    world.muteBackgroundSound();
}

function playBackgroundSound() {
    world.playBackgroundSound();
}

function updateSoundIcon() {
    const soundIcon = world.isMute ? "mute.png" : "sound.png";
    document
        .getElementById("sound-img")
        .setAttribute("src", `./assets/icon/${soundIcon}`);
}

function updateMuteStatusInStorage() {
    const currentMute = JSON.parse(localStorage.getItem("epl-mute")) || false;
    localStorage.setItem("epl-mute", !currentMute);
}

function showHelpPage() {
    if (isOverlayOpen) return;
    helpScreenElement.classList.remove("d-none");
    isOverlayOpen = true;
}

function hideHelpPage() {
    helpScreenElement.classList.add("d-none");
    isOverlayOpen = false;
}

function showStory() {
    if (isOverlayOpen) return;
    storyScreenElement.classList.remove("d-none");
    isOverlayOpen = true;
}

function hideStory() {
    storyScreenElement.classList.add("d-none");
    isOverlayOpen = false;
}

function showImpressum() {
    if (isOverlayOpen) return;
    imprintScreenElement.classList.remove("d-none");
    isOverlayOpen = true;
}

function hideImpressum() {
    imprintScreenElement.classList.add("d-none");
    isOverlayOpen = false;
}

function showGameOverScreen() {
    gameOverScreenElement.classList.remove("d-none");
}

function hideGameOverScreen() {
    gameOverScreenElement.classList.add("d-none");
}

function showGameWinScreen() {
    gameWinScreenElement.classList.remove("d-none");
}

function hideGameWinScreen() {
    gameWinScreenElement.classList.add("d-none");
}

function updateTouchButtons() {
    const touchButtons = document.getElementById("touch-buttons");
    if (!touchButtons) return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 1024; 
    if (isTouch || isSmallScreen) {
        touchButtons.style.setProperty('display', 'flex', 'important');
    } else {
        touchButtons.style.display = "none";
    }
}

function bindTouchEvents() {
    const btnLeft = document.getElementById('left-key');
    const btnRight = document.getElementById('right-key');
    const btnJump = document.getElementById('jump-key');
    const btnThrow = document.getElementById('throw-key');
    if (!btnLeft || !btnRight || !btnJump || !btnThrow) return;
    btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard.LEFT = true; });
    btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); keyboard.LEFT = false; });
    btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard.RIGHT = true; });
    btnRight.addEventListener('touchend', (e) => { e.preventDefault(); keyboard.RIGHT = false; });
    btnJump.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard.SPACE = true; });
    btnJump.addEventListener('touchend', (e) => { e.preventDefault(); keyboard.SPACE = false; });
    btnThrow.addEventListener('touchstart', (e) => { e.preventDefault(); keyboard.D = true; });
    btnThrow.addEventListener('touchend', (e) => { e.preventDefault(); keyboard.D = false; });
}

window.addEventListener("resize", updateTouchButtons);
window.addEventListener("orientationchange", updateTouchButtons);