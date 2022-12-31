start.addEventListener("click", function () {
    startScreen.style.display = "none";
    startGame();
});

restart.addEventListener("click", function () {
    dead = false;
    restartScreen.style.display = "none";
    rocket.src = "img/rocket.png";
    startGame();
});

home.addEventListener("click", function () {
    dead = false;
    onhome = true;
    restartScreen.style.display = "none";
    rocket = {};
    allUfos = [];
    shots = [];
    setTimeout(function () {
        startScreen.style.display = "block";
        document.getElementById('scoreDisplay').innerHTML = `HighScore: ${localStorage.getItem("highScore")}`;
    }, 250);
});

pauseStart.addEventListener("click", function () {
    pause.style.display = "none";
    onpause = false;
    setSoftKeys("Pause", "", "");
    startIntervals();
});

pauseRestart.addEventListener("click", function () {
    allUfos = [];
    shots = [];
    pause.style.display = "none";
    onpause = false;
    setSoftKeys("Pause", "", "");
    startGame();
});

pauseHome.addEventListener("click", function () {
    pause.style.display = "none";
    onpause = false;
    ingame = false;
    onhome = true;
    score = 0;
    clearIntervals();
    allUfos = [];
    shots = [];
    rocket = {};
    setTimeout(function () {
        startScreen.style.display = "block";
        setSoftKeys("Settings", "", "Tutorial");
        document.getElementById('scoreDisplay').innerHTML = `HighScore: ${localStorage.getItem("highScore")}`;
    }, 150);
});

pauseMusicBtn.addEventListener("click", function () {
    musicpause = !musicpause;
    if (musicpause) {
        gamemusic.pause();
        pauseMusicIcon.src = "img/buttons/noMusicButtonFocus.png";
        musicIcon.src = "img/buttons/noMusicButton.png";
    } else {
        gamemusic.play();
        pauseMusicIcon.src = "img/buttons/musicButtonFocus.png";
        musicIcon.src = "img/buttons/musicButton.png";
    }
    if (musicpause && !soundEffects) {
        volume.src = "img/novolume.png";
    } else {
        volume.src = "img/volume.png";
    }
});

pauseSoundsBtn.addEventListener("click", function () {
    soundEffects = !soundEffects;
    if (soundEffects) {
        pauseSoundsIcon.src = "img/buttons/soundsButtonFocus.png";
        soundIcon.src = "img/buttons/soundsButton.png";
    } else {
        pauseSoundsIcon.src = "img/buttons/noSoundsButtonFocus.png";
        soundIcon.src = "img/buttons/noSoundsButton.png";
    }
    if (musicpause && !soundEffects) {
        volume.src = "img/novolume.png";
    } else {
        volume.src = "img/volume.png";
    }
});

document.getElementById("music").addEventListener("click", function () {
    musicpause = !musicpause;
    if (musicpause) {
        gamemusic.pause();
        musicIcon.src = "img/buttons/noMusicButtonFocus.png";
        pauseMusicIcon.src = "img/buttons/noMusicButton.png";
    } else {
        gamemusic.play();
        musicIcon.src = "img/buttons/musicButtonFocus.png";
        pauseMusicIcon.src = "img/buttons/musicButton.png";
    }
    if (musicpause && !soundEffects) {
        volume.src = "img/novolume.png";
    } else {
        volume.src = "img/volume.png";
    }
});

sound.addEventListener("click", function () {
    soundEffects = !soundEffects;
    if (soundEffects) {
        soundIcon.src = "img/buttons/soundsButtonFocus.png";
        pauseSoundsIcon.src = "img/buttons/soundsButton.png";
    } else {
        soundIcon.src = "img/buttons/noSoundsButtonFocus.png";
        pauseSoundsIcon.src = "img/buttons/noSoundsButton.png";
    }
    if (musicpause && !soundEffects) {
        volume.src = "img/novolume.png";
    } else {
        volume.src = "img/volume.png";
    }
});