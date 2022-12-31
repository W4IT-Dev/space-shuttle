function getStoredData() {
    if (localStorage.highScore) {
        highScore = localStorage.highScore
        document.getElementById('scoreDisplay').innerHTML = `HighScore: ${localStorage.highScore}`
    }

    if (localStorage.watchedTutorial) return;
    setTimeout(() => {
        tutorial();
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
    draw();
    setSoftKeys("Pause", "", "");
}

function startIntervals() {
    updateinterval = setInterval(update, 40);
    checkcollion = setInterval(checkForCollion, 40);
    checkshoot = setInterval(checkForShoot, 300);
    ufospawn = setInterval(createUfo, spawnTime);
    miniufospawn = setInterval(miniUfo, 1800)
    shootingufos = setInterval(UfosShooting, 2000);
}

function clearIntervals() {
    clearInterval(updateinterval);
    clearInterval(checkcollion);
    clearInterval(checkshoot);
    clearInterval(ufospawn);
    clearInterval(shootingufos);
    clearInterval(miniufospawn)
}

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

                }
                shots = shots.filter(i => i != shot);
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
            if (enemyshot.x < 1) {
                enemyshots = enemyshots.filter(i => i != enemyshot);
            }
        });
    });
}

function miniUfo() {
    let ufo = {
        x: 320,
        y: Math.random() * 190,
        width: 47,
        height: 25,
        src: 'img/miniufo.png',
        img: new Image(),
        speed: 3.5
    }
    let ufo2 = {
        x: 320,
        y: Math.random() * 190,
        width: 42,
        height: 25,
        src: 'img/miniufo.png',
        img: new Image(),
        speed: 4.1
    }
    ufo.speed += score / 1000;
    ufo.img.src = ufo.src;
    allUfos.push(ufo);
    ufo2.speed += score / 1000;
    ufo2.img.src = ufo2.src;
    setTimeout(() => {
        allUfos.push(ufo2)
    }, 800)

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
    addShootin(ufo);

    ufo.img.src = ufo.src;
    allUfos.push(ufo);
}

function addShootin(a) {
    if (score >= 1000) {
        chance = Math.random();
        if (chance >= 0.25) {
            a.shooting = true;
            UfosShooting();
        }
        return
    }
    if (score >= 500) {
        chance = Math.random();
        if (chance >= 0.45) {
            a.shooting = true;
            UfosShooting();
        }
    }
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
            rocket.y -= 4;
        }
        if (downKey && rocket.y < 183) {
            rocket.y += 4;
        }
        allUfos.forEach(function (ufo) {
            if (!ufo.hit) {
                ufo.x -= ufo.speed;
            }
        });
        shots.forEach(function (shot) {
            shot.x += 4.2;
        });
        enemyshots.forEach(function (enemyshot) {
            enemyshot.x -= 5 + score / 1000;
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
                src: 'img/enemyshot.png',
                img: new Image()
            };
            enemyshot.img.src = enemyshot.src;
            enemyshots.push(enemyshot);
        }
    });
}

function loadImages() {
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
    spawnTime = 2200;
    restart.focus();
    allUfos = [];
    shots = [];
    enemyshots = [];
    setSoftKeys("Settings", "", "Tutorial");
}

function scoreAdd(points) {
    score = score + points;
}

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
    const items = document.querySelectorAll(elems);
    const next = currentIndex + move;
    const targetElement = items[next];

    if (move === 1 && currentIndex == items.length - 1) return items[0].focus();
    if (move === -1 && currentIndex == 0) return items[items.length - 1].focus();

    targetElement.focus();
}