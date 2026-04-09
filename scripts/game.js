/** @type {World} The main game world instance */
let world;

/** @type {HTMLCanvasElement} The canvas where the game is rendered */
let canvas;

/** @type {HTMLElement} Main container for the game */
let gameContainerElement;

/** @type {HTMLElement} Container for start icons like help and settings */
let startIconsElement;

/** @type {HTMLElement} The initial start screen overlay */
let startScreenElement;

/** @type {HTMLElement} Overlay screen showing instructions */
let helpScreenElement;

/** @type {HTMLElement} Overlay screen showing legal information */
let imprintScreenElement;

/** @type {HTMLElement} The container active during gameplay */
let gameScreenElement;

/** @type {HTMLElement} Screen shown when the player loses */
let gameOverScreenElement;

/** @type {HTMLElement} Screen shown when the player wins */
let gameWinScreenElement;

/** @type {HTMLElement} Overlay screen showing the game story */
let storyScreenElement;

/** @type {Keyboard} Instance to track user input */
let keyboard;

/** @type {boolean} Flag to prevent multiple overlays from opening */
let isOverlayOpen = false;

/**
 * Initializes the game application by fetching DOM elements and setting up input.
 */
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

/**
 * Displays the help overlay if no other overlay is open.
 */
function showHelpPage() {
    if (isOverlayOpen) return;
    helpScreenElement.classList.remove("d-none");
    isOverlayOpen = true;
}

/**
 * Hides the help overlay.
 */
function hideHelpPage() {
    helpScreenElement.classList.add("d-none");
    isOverlayOpen = false;
}

/**
 * Displays the story overlay if no other overlay is open.
 */
function showStory() {
    if (isOverlayOpen) return;
    storyScreenElement.classList.remove("d-none");
    isOverlayOpen = true;
}

/**
 * Hides the story overlay.
 */
function hideStory() {
    storyScreenElement.classList.add("d-none");
    isOverlayOpen = false;
}

/**
 * Displays the imprint (impressum) overlay if no other overlay is open.
 */
function showImpressum() {
    if (isOverlayOpen) return;
    imprintScreenElement.classList.remove("d-none");
    isOverlayOpen = true;
}

/**
 * Hides the imprint (impressum) overlay.
 */
function hideImpressum() {
    imprintScreenElement.classList.add("d-none");
    isOverlayOpen = false;
}

/**
 * Starts a new game instance.
 * @param {number} [delay=100] - Delay in milliseconds before showing the game screen.
 * @param {boolean} [restart=false] - Whether the game is being restarted.
 */
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

/**
 * Prepares the UI for the start screen transition.
 */
function prepareStartScreen() {
    gameContainerElement.classList.add("m-width");
    startIconsElement.classList.add("d-none");
    startScreenElement.classList.remove("d-none");
}

/**
 * Prepares the UI when returning to the main menu.
 */
function preparebackToMenuScreen() {
    gameScreenElement.classList.add("d-none");
    startIconsElement.classList.remove("d-none");
    gameContainerElement.classList.add("m-width");
}

/**
 * Instantiates the game world with canvas and keyboard.
 */
function initializeWorld() {
    world = new World(canvas, keyboard);
}

/**
 * Switches the view to the game screen after a specific delay.
 * @param {number} delay - The delay in milliseconds.
 */
function showGameScreenAfterDelay(delay) {
    setTimeout(() => {
        startScreenElement.classList.add("d-none");
        startIconsElement.classList.add("d-none");
        gameScreenElement.classList.remove("d-none");
        gameContainerElement.classList.remove("m-width");
        updateTouchButtons();
    }, delay);
}

/**
 * Returns the user to the main menu from game over or win screens.
 */
function backToMenu() {
    hideGameOverScreen();
    hideGameWinScreen();
    world.resetGameOverAndWinStatus();
    preparebackToMenuScreen();
}

/**
 * Resets the current game and starts a new one immediately.
 */
function restartGame() {
    hideGameOverScreen();
    hideGameWinScreen();
    world.resetGameOverAndWinStatus();
    startNewGame(10, true);
}

/**
 * Checks local storage for mute status and applies it to the world.
 */
function checkMuteStatus() {
    const isMuted = getMuteStatusFromStorage();
    if (isMuted) muteBackgroundSound();
    else playBackgroundSound();
    updateSoundIcon();
}

/**
 * Toggles the background sound on/off and updates storage.
 */
function toggleMuteSound() {
    world.toggleBackgroundSound();
    updateSoundIcon();
    updateMuteStatusInStorage();
}

/**
 * Retrieves the mute status from local storage.
 * @returns {boolean} True if sound is muted.
 */
function getMuteStatusFromStorage() {
    return JSON.parse(localStorage.getItem("epl-mute")) === true;
}

/**
 * Mutes the world background sound.
 */
function muteBackgroundSound() {
    world.muteBackgroundSound();
}

/**
 * Plays the world background sound.
 */
function playBackgroundSound() {
    world.playBackgroundSound();
}

/**
 * Updates the sound icon image based on current mute status.
 */
function updateSoundIcon() {
    const soundIcon = world.isMute ? "mute.png" : "sound.png";
    document
        .getElementById("sound-img")
        .setAttribute("src", `./assets/icon/${soundIcon}`);
}

/**
 * Updates the mute status value in local storage.
 */
function updateMuteStatusInStorage() {
    const currentMute = JSON.parse(localStorage.getItem("epl-mute")) || false;
    localStorage.setItem("epl-mute", !currentMute);
}

/**
 * Displays the game over overlay and hides touch controls.
 */
function showGameOverScreen() {
    gameOverScreenElement.classList.remove("d-none");
    const touchButtons = document.getElementById("touch-buttons");
    if (touchButtons) {
        touchButtons.style.setProperty('display', 'none', 'important');
    }
}

/**
 * Hides the game over overlay.
 */
function hideGameOverScreen() {
    gameOverScreenElement.classList.add("d-none");
}

/**
 * Displays the game win overlay.
 */
function showGameWinScreen() {
    gameWinScreenElement.classList.remove("d-none");
}

/**
 * Hides the game win overlay.
 */
function hideGameWinScreen() {
    gameWinScreenElement.classList.add("d-none");
}

/**
 * Shows or hides touch buttons based on device type and screen width.
 */
function updateTouchButtons() {
    const touchButtons = document.getElementById("touch-buttons");
    if (!touchButtons) return;
    
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 834;

    if (isTouch || isSmallScreen) {
        touchButtons.style.setProperty('display', 'flex', 'important');
    } else {
        touchButtons.style.setProperty('display', 'none', 'important');
    }
}

/**
 * Binds touchstart and touchend events to the on-screen game controls.
 */
function bindTouchEvents() {
    const keys = [
        { id: 'left-key', prop: 'LEFT' },
        { id: 'right-key', prop: 'RIGHT' },
        { id: 'jump-key', prop: 'SPACE' },
        { id: 'throw-key', prop: 'D' }
    ];

    keys.forEach(key => {
        const element = document.getElementById(key.id);
        if (!element) return;

        element.addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
            keyboard[key.prop] = true;
        }, { passive: false });

        element.addEventListener('touchend', (e) => {
            if (e.cancelable) e.preventDefault();
            keyboard[key.prop] = false;
        }, { passive: false });
    });
}

// Event Listeners for responsive UI
window.addEventListener("resize", updateTouchButtons);
window.addEventListener("orientationchange", updateTouchButtons);