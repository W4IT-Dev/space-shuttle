document.addEventListener('keydown', (e) => {
    if (e.key == 'MicrophoneToggle' || e.key.includes('Arrow')) { e.preventDefault(); }

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
                nav(1, '.' + document.activeElement.className);
            }

            if (e.key == 'ArrowUp') {
                nav(-1, '.' + document.activeElement.className);
            }

            if (e.key == 'ArrowRight') {
                if (element(easy, medium, hard)) {
                    document.getElementById('music').focus();
                }
            }

            if (e.key == 'ArrowLeft') {
                if (element(document.getElementById('music'), document.getElementById('sound'))) {
                    document.getElementById(gameDifficulty).focus();
                }
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
                gamemusic.play();
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
                gamemusic.pause();
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

            if (e.key == '6' || e.key == 'ArrowRight') upKey = true;

            if (e.key == '4' || e.key == 'ArrowLeft') downKey = true;

            if (e.key == '5' || e.key == 'Enter') shootKey = true;

            //Pause Screen
            if (onpause) {
                if (e.key == 'ArrowDown') return nav(1, '.' + document.activeElement.className)

                if (e.key == 'ArrowUp') return nav(-1, '.' + document.activeElement.className)

                if (e.key == 'ArrowLeft') return pauseMusicBtn.focus();

                if (e.key == 'ArrowRight') return pauseStart.focus();
            }
        }

        //Restart Screen
        if (dead) {
            if (e.key == 'ArrowDown') return nav(1, '.' + document.activeElement.className)
            if (e.key == 'ArrowUp') return nav(-1, '.' + document.activeElement.className)
        }
        //Tutorial
        if (ontutorial) {
            if (e.key == 'SoftLeft') {
                if (on2) return on2 = false, setTutorialImageAndParagraph("img/tutorial/tutorial_1.gif", "To pause the game, press the left softkey."), on1 = true;
                if (on3) return on3 = false, setTutorialImageAndParagraph("img/tutorial/tutorial_2.gif", "To move down, press left on your D-Pad or 4."), on2 = true;
                if (on1) return;
                on4 = false
                setTutorialImageAndParagraph("img/tutorial/tutorial_3.gif", "To move up, press right on your D-Pad or 6.");
                on3 = true;
                softkeyRight.innerText = "Next";
            }
            if (e.key == 'SoftRight') {
                if (on1) return on1 = false, setTutorialImageAndParagraph("img/tutorial/tutorial_2.gif", "To move down, press left on your D-Pad or 4."), on2 = true;
                if (on2) return on2 = false, setTutorialImageAndParagraph("img/tutorial/tutorial_3.gif", "To move up, press right on your D-Pad or 6."), on3 = true;
                if (on3) return on3 = false, setTutorialImageAndParagraph("img/tutorial/tutorial_4.gif", "To shoot, press center on your D-Pad or 5."), on4 = true, softkeyRight.innerText = "Finish";

                document.getElementById("tutorial").style.display = "none";
                setSoftKeys("Settings", "", "Tutorial");
                on4 = false;
                onhome = true;
                ontutorial = false;
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
        if (e.key == 'SoftRight') window.close();
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key == '6' || e.key == 'ArrowRight') upKey = false;

    if (e.key == '4' || e.key == 'ArrowLeft') downKey = false;

    if (e.key == '5' || e.key == 'Enter') if (!onhome) { shootKey = false; }
})