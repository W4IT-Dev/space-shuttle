restart.addEventListener("blur", function () {
    restartIcon.src = "img/buttons/restartButton.png"
});

home.addEventListener("blur", function () {
    homeIcon.src = "img/buttons/homeButton.png"
});

pauseStart.addEventListener("blur", function () {
    pauseStartIcon.src = "img/buttons/playButton.png"
});

pauseRestart.addEventListener("blur", function () {
    pauseRestartIcon.src = "img/buttons/restartButton.png"
});

pauseHome.addEventListener("blur", function () {
    pauseHomeIcon.src = "img/buttons/homeButton.png"
});

pauseMusicBtn.addEventListener("blur", function () {
    if (musicpause) {
        pauseMusicIcon.src = "img/buttons/noMusicButton.png";
    } else {
        pauseMusicIcon.src = "img/buttons/musicButton.png";
    }
});

pauseSoundsBtn.addEventListener("blur", function () {
    if (soundEffects) {
        pauseSoundsIcon.src = "img/buttons/soundsButton.png";
    } else {
        pauseSoundsIcon.src = "img/buttons/noSoundsButton.png";
    }
});

document.getElementById("music").addEventListener("blur", function () {
    if (musicpause) {
        musicIcon.src = "img/buttons/noMusicButton.png";
    } else {
        musicIcon.src = "img/buttons/musicButton.png";
    }
});

sound.addEventListener("blur", function () {
    if (soundEffects) {
        soundIcon.src = "img/buttons/soundsButton.png";
    } else {
        soundIcon.src = "img/buttons/noSoundsButton.png";
    }
});