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


function startNewGame(delay = 100, restart = false) {
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
    gameScreenElement.classList.remove("d-none");
    gameContainerElement.classList.remove("m-width");
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
  helpScreenElement.classList.remove("d-none");
}


function hideHelpPage() {
  helpScreenElement.classList.add("d-none");
}


function showStory() {
   storyScreenElement.classList.remove("d-none");
}


function hideStory() {
   storyScreenElement.classList.add("d-none");
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
  touchButtons.style.display = isTouch ? "flex" : "none";
}


window.addEventListener("resize", updateTouchButtons);
window.addEventListener("orientationchange", updateTouchButtons);
