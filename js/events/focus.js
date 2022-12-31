restart.addEventListener("focus", function () {
    restartIcon.src = "img/buttons/restartButtonFocus.png";
});

home.addEventListener("focus", function () {
    homeIcon.src = "img/buttons/homeButtonFocus.png";
});

pauseStart.addEventListener("focus", function () {
    pauseStartIcon.src = "img/buttons/playButtonFocus.png";
});

pauseRestart.addEventListener("focus", function () {
    pauseRestartIcon.src = "img/buttons/restartButtonFocus.png";
});

pauseHome.addEventListener("focus", function () {
    pauseHomeIcon.src = "img/buttons/homeButtonFocus.png";
});

pauseHome.addEventListener("focus", function () {
    pauseHomeIcon.src = "img/buttons/homeButtonFocus.png";
});

pauseMusicBtn.addEventListener("focus", function () {
    if (musicpause) {
        pauseMusicIcon.src = "img/buttons/noMusicButtonFocus.png";
    } else {
        pauseMusicIcon.src = "img/buttons/musicButtonFocus.png";
    }
});

pauseSoundsBtn.addEventListener("focus", function () {
    if (soundEffects) {
        pauseSoundsIcon.src = "img/buttons/soundsButtonFocus.png";
    } else {
        pauseSoundsIcon.src = "img/buttons/noSoundsButtonFocus.png";
    }
});

document.getElementById("music").addEventListener("focus", function () {
    if (musicpause) {
        musicIcon.src = "img/buttons/noMusicButtonFocus.png";
    } else {
        musicIcon.src = "img/buttons/musicButtonFocus.png";
    }
});

sound.addEventListener("focus", function () {
    if (soundEffects) {
        soundIcon.src = "img/buttons/soundsButtonFocus.png";
    } else {
        soundIcon.src = "img/buttons/noSoundsButtonFocus.png";
    }
});