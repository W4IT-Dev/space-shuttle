let shootKey = upKey = downKey = false;
let canvas, ctx;
let backgroundImage = new Image();
let rocket;

let spawnTime = 2100;
let score = 0;
let highScore = 0;
let dead = false;
let gameDifficulty = 'medium';

let updateinterval, ufospawn, checkcollion, checkshoot, shootingufos;

let onhome = true;
let onexit = false;
let ontutorial = false;
let onsettings = false;
let onmainsettings = false;
let oninfo = false;
let onpause = false;
let on1 = false;
let on2 = false;
let on3 = false;
let on4
let ingame = false;

let music = new Audio("img/sounds/music.mp3");
let shotSound = new Audio("img/sounds/shot.wav");
let explosionSound = new Audio("img/sounds/explosion.mp3");

let soundEffects = true;

music.loop = true;
music.volume = 0.6;
shotSound.volume = 0.4;
explosionSound.volume = 0.4;

music.play();
let musicpause = false;

let allUfos = [];
let shots = [];
let enemyshots = [];

document.addEventListener('keydown', (e) => {
    if (e.key == 'MicrophoneToggle' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowUp' || e.key == 'ArrowDown') { e.preventDefault(); }

    if (e.key == 'Backspace') {
        e.preventDefault();
        if (ingame && !onpause) {
            pause.style.display = "block";
            onpause = true;
            pauseStart.focus();
            clearIntervals();
        } else {
            exit.style.display = "block";
            onexit = true;
            setSoftKeys("No", "", "Yes");
        }
    }

    if (!onexit) {
        //Home Screen
        if (onhome) {
            if (e.key == 'SoftLeft') {
                if (onsettings) {
                    settings.style.display = "none";
                    setSoftKeys('Settings', '', 'Tutorial')
                    onsettings = false;
                } else {
                    settings.style.display = "block";
                    onsettings = true;
                    setSoftKeys('Back', '', '')
                    document.getElementById('music').focus();
                }
            }
            if (!onsettings) {
                if (e.key == 'SoftRight') {
                    tutorial();
                }
                if (e.key == 'Enter') {
                    startGame();
                    document.activeElement.blur();
                }
            }
        }

        //Settings
        if (onsettings) {
            if (e.key == 'ArrowDown') {
                console.log('.' + document.activeElement.className)
                console.log(document.activeElement.id)
                nav(1, '.' + document.activeElement.className);
                // if (element(document.getElementById('music'))) {
                //     sound.focus();
                // } else if (element(sound)) {
                //     document.getElementById('music').focus();
                // } else if (element(document.getElementById('option-mainsettings'))) {
                //     document.getElementById('option-info').focus();
                //     mainsettings.style.display = "none";
                //     info.style.display = "block";
                //     oninfo = true;
                //     onmainsettings = false;
                // } else if (element(document.getElementById('option-info'))) {
                //     document.getElementById("option-mainsettings").focus();
                //     info.style.display = "none";
                //     mainsettings.style.display = "block";
                //     oninfo = false;
                //     onmainsettings = true;
                // } else if (element(easy)) {
                //     medium.focus();
                // } else if (element(medium)) {
                //     hard.focus();
                // } else if (element(hard)) {
                //     easy.focus();
                // }
            }


            if (e.key == 'ArrowUp') {
                if (element(document.getElementById('music'))) {
                    sound.focus();
                } else if (element(sound)) {
                    document.getElementById('music').focus();
                } else if (element(document.getElementById('option-mainsettings'))) {
                    document.getElementById('option-info').focus();
                    mainsettings.style.display = "none";
                    info.style.display = "block";
                    onmainsettings = false;
                    oninfo = true;

                } else if (element(document.getElementById('option-info'))) {
                    document.getElementById("option-mainsettings").focus();
                    info.style.display = "none";
                    mainsettings.style.display = "block";
                    oninfo = false;
                    onmainsettings = true;
                } else if (element(easy)) {
                    hard.focus();
                } else if (element(medium)) {
                    easy.focus();
                } else if (element(hard)) {
                    medium.focus();
                }
            }


            if (e.key == 'ArrowRight') {
                if (element(document.getElementById('option-mainsettings'), document.getElementById("option-info"))) {
                } else if (element(document.getElementById('music'), sound)) {
                    document.getElementById("option-mainsettings").focus();
                } else if (element(easy, medium, hard)) {
                    document.getElementById('music').focus();

                }
                move_down();

            }


            if (e.key == 'ArrowLeft') {
                if (element(document.getElementById('option-mainsettings'), document.getElementById("option-info"))) {
                    document.getElementById('music').focus();
                    if (oninfo) {
                        document.getElementById('option-info').style.backgroundColor = 'rgb(120, 120, 120)';
                    } else if (onmainsettings) {
                        document.getElementById('option-mainsettings').style.backgroundColor = 'rgb(120, 120, 120)';
                    }
                } else if (element(document.getElementById('music'), sound)) {
                    document.getElementById(gameDifficulty).focus();
                }
                move_up();
            }
        }

        //While Playing
        if (ingame) {
            if (e.key == 'SoftLeft' && !onpause) {
                pause.style.display = "block";
                onpause = true;
                setSoftKeys("", "", "");
                pauseStart.focus();
                clearIntervals();
            }
            if (e.key == 'VolumeUp') {
                e.preventDefault();
                music.play();
                musicpause = false;
                soundEffects = true;
                volume.src = "img/volume.png";
                if (document.activeElement == pauseMusicBtn) {
                    pauseMusicIcon.src = "img/buttons/musicButtonFocus.png";
                    pauseSoundsIcon.src = "img/buttons/soundsButton.png";
                } else if (document.activeElement == pauseSoundsBtn) {
                    pauseMusicIcon.src = "img/buttons/musicButton.png";
                    pauseSoundsIcon.src = "img/buttons/soundsButtonFocus.png";
                } else {
                    pauseMusicIcon.src = "img/buttons/musicButton.png";
                    pauseSoundsIcon.src = "img/buttons/soundsButton.png";
                }
            }
            if (e.key == 'VolumeDown') {
                e.preventDefault();
                music.pause();
                musicpause = true;
                if (document.activeElement == pauseMusicBtn) {
                    pauseMusicIcon.src = "img/buttons/noMusicButtonFocus.png";
                    pauseSoundsIcon.src = "img/buttons/noSoundsButton.png";
                } else if (document.activeElement == pauseSoundsBtn) {
                    pauseMusicIcon.src = "img/buttons/noMusicButton.png";
                    pauseSoundsIcon.src = "img/buttons/noSoundsButtonFocus.png";
                } else {
                    pauseMusicIcon.src = "img/buttons/noMusicButton.png";
                    pauseSoundsIcon.src = "img/buttons/noSoundsButton.png";
                }
                soundEffects = false;
                volume.src = "img/novolume.png";
            }

            if (e.key == '6') {
                upKey = true;
            }
            if (e.key == '4') {
                downKey = true;
            }
            if (e.key == '5') {
                shootKey = true;
            }
            if (e.key == 'ArrowLeft') {
                downKey = true;
            }
            if (e.key == 'ArrowRight') {
                upKey = true;
            }
            if (e.key == 'Enter') {
                shootKey = true;
            }
            //Pause Screen
            if (onpause) {
                if (e.key == 'ArrowDown') {
                    if (document.activeElement == pauseStart) {
                        document.getElementById('pauseRestart').focus();
                    } else if (document.activeElement == pauseRestart) {
                        pauseHome.focus();
                    } else if (document.activeElement == pauseHome) {
                        pauseStart.focus();
                    } else if (document.activeElement == pauseMusicBtn) {
                        pauseSoundsBtn.focus();
                    } else if (document.activeElement == pauseSoundsBtn) {
                        pauseMusicBtn.focus();
                    }
                }
                if (e.key == 'ArrowUp') {
                    if (document.activeElement == pauseStart) {
                        pauseHome.focus();
                    } else if (document.activeElement == pauseRestart) {
                        pauseStart.focus();
                    } else if (document.activeElement == pauseHome) {
                        pauseRestart.focus();
                    } else if (document.activeElement == pauseMusicBtn) {
                        pauseSoundsBtn.focus();
                    } else if (document.activeElement == pauseSoundsBtn) {
                        pauseMusicBtn.focus();
                    }
                }
                if (e.key == 'ArrowLeft') {
                    pauseMusicBtn.focus();
                }
                if (e.key == 'ArrowRight') {
                    pauseStart.focus();
                }
            }
        }


        //Restart Screen
        if (dead) {
            if (e.key == 'ArrowDown') {
                if (document.activeElement == restart) {
                    home.focus();
                }
            }
            if (e.key == 'ArrowUp') {
                if (document.activeElement == home) {
                    restart.focus();
                }
            }
        }
        //Tutorial
        if (ontutorial) {
            if (e.key == 'SoftLeft') {
                if (on2) {
                    on2 = false;
                    setTutorialImageAndParagraph("img/tutorial/tutorial_1.gif", "To pause the game, press the left softkey.");
                    on1 = true;
                } else if (on3) {
                    on3 = false;
                    setTutorialImageAndParagraph("img/tutorial/tutorial_2.gif", "To move down, press left on your D-Pad or 4.");
                    on2 = true;
                } else if (on4) {
                    on4 = false
                    setTutorialImageAndParagraph("img/tutorial/tutorial_3.gif", "To move up, press right on your D-Pad or 6.");
                    on3 = true;
                    softkeyRight.innerText = "Next";
                }
            }
            if (e.key == 'SoftRight') {
                if (on1) {
                    on1 = false;
                    setTutorialImageAndParagraph("img/tutorial/tutorial_2.gif", "To move down, press left on your D-Pad or 4.");
                    on2 = true;
                } else if (on2) {
                    on2 = false;
                    setTutorialImageAndParagraph("img/tutorial/tutorial_3.gif", "To move up, press right on your D-Pad or 6.");
                    on3 = true;
                } else if (on3) {
                    on3 = false;
                    setTutorialImageAndParagraph("img/tutorial/tutorial_4.gif", "To shoot, press center on your D-Pad or 5.");
                    on4 = true;
                    softkeyRight.innerText = "Finish";
                } else {
                    document.getElementById("tutorial").style.display = "none";
                    setSoftKeys("Settings", "", "Tutorial");
                    on4 = false;
                    onhome = true;
                    ontutorial = false;
                }
            }
            if (e.key == 'Enter') {
                document.getElementById("tutorial").style.display = "none";
                setSoftKeys("Settings", "", "Tutorial");
                onhome = true;
                ontutorial = false;
            }
        }
    }
    if (onexit) {
        if (e.key == 'SoftLeft') {
            exit.style.display = "none";
            onexit = false;
            if (ingame) { setSoftKeys("Pause", "", ""); } else if (onhome) { setSoftKeys("Settings", "", "Tutorial") } else if (ontutorial && !on4) { setSoftKeys("Previous", "SKIP", "Next") } else { setSoftKeys("Previous", "SKIP", "Finish") }
        }
        if (e.key == 'SoftRight') {
            window.close();
        }
    }
})


document.addEventListener('keyup', (e) => {
    if (e.key == '6') {
        upKey = false;
    }
    if (e.key == '4') {
        downKey = false;
    }
    if (e.key == '5') {
        shootKey = false;
    }
    if (e.key == 'ArrowRight') {
        upKey = false;
    }
    if (e.key == 'ArrowLeft') {
        downKey = false;
    }
    if (e.key == 'Enter') {
        if (!onhome) {
            shootKey = false;
        }
    }
})


function getStoredData() {
    if (!localStorage.getItem("highScore")) {
        document.getElementById('scoreDisplay').innerHTML = `HighScore: 0`
    } else {
        highScore = localStorage.getItem("highScore");
        document.getElementById('scoreDisplay').innerHTML = `HighScore: ${localStorage.getItem("highScore")}`
    }

    if (localStorage.getItem("watchedTutorial")) return console.log("Tutorial already watched, won't appear again.");
    setTimeout(() => {
        tutorial()
    }, 400)
}

function setSoftKeys(left, center, right) {
    softkeyLeft.innerText = left;
    softkeyEnter.innerText = center;
    softkeyRight.innerText = right;
}

function setTutorialImageAndParagraph(img, paragraph) {
    tutorialImage.src = img;
    tutorialParagraph.innerText = paragraph;
}

function startGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    rocket = {
        x: 7,
        y: 75,
        width: 57,
        height: 37,
        src: 'img/rocket.png'
    };
    onhome = false;
    ingame = true;
    score = 0;
    startScreen.style.display = "none";
    loadImages();
    startIntervals();
    // startUfos();
    draw();
    setSoftKeys("Pause", "", "");
}

function startIntervals() {
    updateinterval = setInterval(update, 40);
    checkcollion = setInterval(checkForCollion, 40);
    checkshoot = setInterval(checkForShoot, 350);
    ufospawn = setInterval(createUfo, spawnTime);
    shootingufos = setInterval(UfosShooting, 2000);
}

function clearIntervals() {
    clearInterval(updateinterval);
    clearInterval(checkcollion);
    clearInterval(checkshoot);
    clearInterval(ufospawn);
    clearInterval(shootingufos);
}

// function startUfos() {
//     ufo.img.src = ufo.src;
//     allUfos.push(ufo);

// }

function checkForCollion() {
    allUfos.forEach(function (ufo) {
        if (rocket.x + rocket.width > ufo.x && rocket.y + rocket.height > ufo.y && rocket.x < ufo.x && rocket.y < ufo.y + ufo.height) {
            rocket.img.src = 'img/boom.png';
            gameOver();
            allUfos = allUfos.filter(i => i != ufo);
        }
        shots.forEach(function (shot) {
            if (shot.x + shot.width > ufo.x && shot.y + shot.height > ufo.y && shot.x < ufo.x && shot.y < ufo.y + ufo.height) {
                if (!ufo.hit) {
                    if (ufo.shooting) {
                        scoreAdd(100);
                    } else {
                        scoreAdd(50);
                    }
                    shots = shots.filter(i => i != shot);
                }
                ufo.hit = true;
                ufo.img.src = 'img/boom.png';
                if (soundEffects) {
                    explosionSound.play();
                }
                setTimeout(() => {
                    allUfos = allUfos.filter(i => i != ufo);
                }, 400);
            }
            if (shot.x > 300) {
                shots = shots.filter(i => i != shot);
            }
        });
        if (ufo.x + ufo.width < 0) {
            allUfos = allUfos.filter(i => i != ufo);
        }
        enemyshots.forEach(function (enemyshot) {
            if (enemyshot.x < rocket.x + rocket.width && enemyshot.y > rocket.y && enemyshot.y < rocket.y + rocket.height) {
                rocket.img.src = 'img/boom.png';
                if (soundEffects) {
                    explosionSound.play();
                }
                gameOver();
            }
            //check if shot is out of canvas
            if (enemyshot.x < 1) {
                enemyshots = enemyshots.filter(i => i != enemyshot);
            }
        });
    });
}

function createUfo() {
    fastUfoChance = Math.random();
    let ufo = {
        x: 320,
        y: Math.random() * 190,
        width: 58,
        height: 28,
        src: 'img/ufo.png',
        img: new Image(),
        shooting: false,
        speed: 2
    };
    if (fastUfoChance >= 0.53) {
        ufo.src = 'img/fastUfo.png';
        ufo.speed = 2.7;
    }
    ufo.speed += score / 1000;
    if (score > 500) {
        chance = Math.random();
        if (chance >= 0.45) {
            ufo.shooting = true;
        }
    }
    ufo.img.src = ufo.src;
    allUfos.push(ufo);
}

function checkForShoot() {
    if (shootKey) {
        let shot = {
            x: rocket.x + 60,
            y: rocket.y + 16,
            width: 9,
            height: 3.2,
            src: 'img/shot.png',
            img: new Image()
        };
        shot.img.src = shot.src;
        shots.push(shot);
        if (soundEffects) {
            shotSound.play();
        }
    }
}

function update() {
    if (!dead && !onpause) {
        if (upKey && rocket.y > -8) {
            rocket.y -= 3.6;
        }
        if (downKey && rocket.y < 183) {
            rocket.y += 3.6;
        }
        allUfos.forEach(function (ufo) {
            if (!ufo.hit) {
                ufo.x -= ufo.speed;
            }
        });
        shots.forEach(function (shot) {
            shot.x += 3.5;
        });
        enemyshots.forEach(function (enemyshot) {
            enemyshot.x -= 5;
        });
        if (score > highScore) {
            highScore = score;
            localStorage["highScore"] = highScore;
        }
    }
    document.getElementById("scoreDisplay").innerHTML = `Score: ${score}`;
}

function UfosShooting() {
    allUfos.forEach(function (ufo) {
        if (ufo.shooting) {
            let enemyshot = {
                x: ufo.x,
                y: ufo.y + 13,
                width: 9,
                height: 3.2,
                src: 'img/shot.png',
                img: new Image()
            };
            enemyshot.img.src = enemyshot.src;
            enemyshots.push(enemyshot);
        }
    });
}

function loadImages() {
    // bGImg = (Math.random();
    // console.log(bGImg)
    backgroundImage.src = 'img/background1.png';
    rocket.img = new Image();
    rocket.img.src = rocket.src;
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);
    allUfos.forEach(function (ufo) {
        ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    });
    shots.forEach(function (shot) {
        ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
    });
    enemyshots.forEach(function (enemyshot) {
        ctx.drawImage(enemyshot.img, enemyshot.x, enemyshot.y, enemyshot.width, enemyshot.height);
    });
    requestAnimationFrame(draw);
}

function gameOver() {
    restartScreen.style.display = "block";
    document.getElementById("score").innerHTML = `Score: ${score}`;
    document.getElementById("highScore").innerHTML = `Highscore: ${localStorage.getItem("highScore")}`;
    score = 0;
    dead = true;
    ingame = false;
    clearIntervals();
    spawnTime = 2100;
    restart.focus();
    allUfos = [];
    shots = [];
    enemyshots = [];
    setSoftKeys("Settings", "", "Tutorial");
}

function scoreAdd(points) {
    score = score + points;
}

//click
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
        music.pause();
        pauseMusicIcon.src = "img/buttons/noMusicButtonFocus.png";
        musicIcon.src = "img/buttons/noMusicButton.png";
    } else {
        music.play();
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
        music.pause();
        musicIcon.src = "img/buttons/noMusicButtonFocus.png";
        pauseMusicIcon.src = "img/buttons/noMusicButton.png";
    } else {
        music.play();
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

//focus
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

//blur
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

function tutorial() {
    document.getElementById('tutorial').style.display = "block";
    onhome = false;
    setSoftKeys("", "Loading...", "");
    tutorialImgAp.style.display = "none";
    loadingScreen.style.display = "block";
    loadingProgress.innerHTML = "Loading... 0%";
    loadingProgressbar.value = 0;
    fakeLoad();

    localStorage["watchedTutorial"] = true;
}

function showProgress(progress) {
    loadingProgressbar.value = progress;
    loadingProgress.innerHTML = `Loading... ${progress * 100}%`
}

function fakeLoad() {
    setTimeout(() => {
        showProgress(.03);
    }, 250)
    setTimeout(() => {
        showProgress(.37);
    }, 400)
    setTimeout(() => {
        showProgress(.71);
    }, 700)
    setTimeout(() => {
        showProgress(1);
    }, 1100)
    setTimeout(() => {
        ontutorial = true;
        on1 = true;
        setTutorialImageAndParagraph("img/tutorial_1.gif", "To pause the game, press the left soft key.")
        setSoftKeys("Previous", "SKIP", "Next");
        loadingScreen.style.display = "none";
        tutorialImgAp.style.display = "block";
    }, 1200)
}

function element(one, two, three) {
    if (arguments.length == 1) return document.activeElement == one;
    if (arguments.length == 2) return document.activeElement == one || document.activeElement == two;
    if (arguments.length == 3) return document.activeElement == one || document.activeElement == two || document.activeElement == three;
}

function nav(move, elems) {
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;
    const items = document.querySelectorAll(elems);
    const targetElement = items[next];
    console.log(currentIndex, next, items, targetElement)

    // if (move === 1 && currentIndex == items.length - 1) return items[0].focus();
    // if (move === -1 && currentIndex == 0) return items[items.length - 1].focus();

    targetElement.focus();
}

function softkey(e) {
    const { target, key, bubbles, cancelable, repeat, type } = e;
    if (!/Left|Right/.test(key) || !key.startsWith("Arrow") || !e.ctrlKey) return;
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    target.dispatchEvent(new KeyboardEvent(type, { key: "Soft" + key.slice(5), bubbles, cancelable, repeat }));
}

document.addEventListener("keyup", softkey, true);
document.addEventListener("keydown", softkey, true);