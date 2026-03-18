/** Game world object */
let world;
/** Canvas element for rendering the game */
let canvas;
/** Main game container element */
let gameContainerElement;
/** Start screen icons element */
let startIconsElement;
/** Start screen element */
let startScreenElement;
/** Help screen element */
let helpScreenElement;
/** Imprint screen element */
let imprintScreenElement;
/** Game screen element */
let gameScreenElement;
/** Game over screen element */
let gameOverScreenElement;
/** Game win screen element */
let gameWinScreenElement;

let storyScreenElement;

/** Keyboard input handler */
let keyboard;

// ----- Initialization -----

/** Initialize the game and UI elements */
function init() {
  canvas = document.getElementById("canvas");
  gameContainerElement = document.getElementById("game-container");
  startIconsElement = document.getElementById("start-icons");
  startScreenElement = document.getElementById("start-screen");
  helpScreenElement = document.getElementById("help-screen");
  imprintScreenElement = document.getElementById("imprint-screen");
  gameScreenElement = document.getElementById("game-screen");
  gameOverScreenElement = document.getElementById("gameover-screen");
  gameWinScreenElement = document.getElementById("gamewin-screen");
  keyboard = new Keyboard();
  storyScreenElement = document.getElementById("story-screen");
}

// ----- Game Start / Restart -----
/**
 * Start a new game or restart an existing one
 * @param {number} [delay=100] - Delay in ms before showing game screen
 * @param {boolean} [restart=false] - Whether this is a restart
 */
function startNewGame(delay = 100, restart = false) {
  if (!restart) {
    prepareStartScreen();
  }

  initializeWorld();
  checkMuteStatus();
  updateTouchButtons();

  showGameScreenAfterDelay(delay);
}

/** Prepare the start screen UI */
function prepareStartScreen() {
  gameContainerElement.classList.add("m-width");
  startIconsElement.classList.add("d-none");
  startScreenElement.classList.remove("d-none");
}

/** Prepare the back to menu screen UI */
function preparebackToMenuScreen() {
  gameScreenElement.classList.add("d-none");
  startIconsElement.classList.remove("d-none");
  gameContainerElement.classList.add("m-width");
}

/** Initialize the game world */
function initializeWorld() {
  world = new World(canvas, keyboard);
}

/**
 * Show the game screen after a delay
 * @param {number} delay - Delay in ms
 */
function showGameScreenAfterDelay(delay) {
  setTimeout(() => {
    startScreenElement.classList.add("d-none");
    gameScreenElement.classList.remove("d-none");
    gameContainerElement.classList.remove("m-width");
  }, delay);
}

/** Go back to the main menu */
function backToMenu() {
  hideGameOverScreen();
  hideGameWinScreen();
  world.resetGameOverAndWinStatus();
  preparebackToMenuScreen();
}

/** Restart the game immediately */
function restartGame() {
  hideGameOverScreen();
  hideGameWinScreen();
  world.resetGameOverAndWinStatus();
  startNewGame(10, true);
}

// ----- Sound Management -----

/** Check the current mute status and update the game accordingly */
function checkMuteStatus() {
  const isMuted = getMuteStatusFromStorage();

  if (isMuted) muteBackgroundSound();
  else playBackgroundSound();

  updateSoundIcon();
}

/** Toggle the game's mute state */
function toggleMuteSound() {
  world.toggleBackgroundSound();
  updateSoundIcon();
  updateMuteStatusInStorage();
}

/** Get mute status from localStorage
 * @return {boolean} true if muted
 */
function getMuteStatusFromStorage() {
  return JSON.parse(localStorage.getItem("epl-mute")) === true;
}

/** Mute the background sound */
function muteBackgroundSound() {
  world.muteBackgroundSound();
}

/** Play the background sound */
function playBackgroundSound() {
  world.playBackgroundSound();
}

/** Update the sound icon in the UI */
function updateSoundIcon() {
  const soundIcon = world.isMute ? "mute.png" : "sound.png";
  document
    .getElementById("sound-img")
    .setAttribute("src", `./assets/icon/${soundIcon}`);
}

/** Update localStorage with the current mute status */
function updateMuteStatusInStorage() {
  const currentMute = JSON.parse(localStorage.getItem("epl-mute")) || false;
  localStorage.setItem("epl-mute", !currentMute);
}

// ----- Screen Display Helpers -----

/** Show help page */
function showHelpPage() {
  helpScreenElement.classList.remove("d-none");
}

/** Hide help page */
function hideHelpPage() {
  helpScreenElement.classList.add("d-none");
}

/** Show story screen */
function showStory() {
   storyScreenElement.classList.remove("d-none");
}

/** Hide story screen */
function hideStory() {
   storyScreenElement.classList.add("d-none");
}

/** Show game over screen */
function showGameOverScreen() {
  gameOverScreenElement.classList.remove("d-none");
}

/** Hide game over screen */
function hideGameOverScreen() {
  gameOverScreenElement.classList.add("d-none");
}

/** Show game win screen */
function showGameWinScreen() {
  gameWinScreenElement.classList.remove("d-none");
}
/** Hide game win screen */
function hideGameWinScreen() {
  gameWinScreenElement.classList.add("d-none");
}

/** Show or hide touch buttons depending on device */
function updateTouchButtons() {
  const touchButtons = document.getElementById("touch-buttons");
  if (!touchButtons) return;

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  touchButtons.style.display = isTouch ? "flex" : "none";
}

// ----- Event Listeners -----
window.addEventListener("resize", updateTouchButtons);
window.addEventListener("orientationchange", updateTouchButtons);
