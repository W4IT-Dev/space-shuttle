let shootKey = upKey = downKey = false;
let canvas, ctx;
let backgroundImage = new Image();
let rocket;

let spawnTime = 2200;
let score = 0;
let highScore = 0;
let dead = false;
let gameDifficulty = 'medium';

let updateinterval, ufospawn, miniufospawn, checkcollion, checkshoot, shootingufos;

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

let gamemusic = new Audio("img/sounds/music.mp3");
let shotSound = new Audio("img/sounds/shot.wav");
let explosionSound = new Audio("img/sounds/explosion.mp3");

let soundEffects = true;

let musicpause = false;

let allUfos = [];
let shots = [];
let enemyshots = [];