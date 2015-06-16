/* GLOBAL VARIABLES */
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 200,
    keys = [],
    friction = 0.8,
    gravity = 0.3;

/* Draw boundaries */
var boxes = [];
boxes = drawLevel1(boxes, canvas.width, canvas.height);

/* Draw level */

/* Load sprite sheets info and states */
var ninjaPos = [];
ninjaPos = ninjaStates(ninjaPos);

/* Load tile sets and BGs */
var background = new Image();
background.src = "/images/BG.png";

var tileSet = new Image();
tileSet.src = "/images/tileset-fullsize.png";

/* Load sprite sheets */
var ninjaImage = new Image();
ninjaImage.src = "/images/ninja-15percent.png";
var ninjaImageLeft = new Image();
ninjaImageLeft.src = "/images/ninja-15percent-left.png";

/* Create sprites */
var ninja = sprite({
    context: canvas.getContext("2d"),
    width: 54,
    height: 69,
    loop: true,
    image: ninjaImage,
    imageLeft: ninjaImageLeft
});


// background
// platforms
// objects
// ninja
// objects that fall in front

// 25 x 9
var levelMap = [
["00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00"],
["02","02","04","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00"],
["01","01","05","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00"],
["00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00"],
["00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00"],
["00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00"],
["02","02","02","04","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00","00"],
["01","01","01","05","03","02","04","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08","08"],
["01","01","01","01","01","01","06","07","07","07","07","07","07","07","07","07","07","07","07","07","07","07","07","07","07"]
];

// Create Tile Library

// Full Dirt
var newTile1 = tile({
    context: canvas.getContext("2d"), 
    image: tileSet, 
    sourceX: 1693, 
    sourceY: 2, 
    sourceW: 128, 
    sourceH: 128
});

// Top Grass
var newTile2 = tile({
    context: canvas.getContext("2d"),
    image: tileSet,
    sourceX: 1302,
    sourceY: 2,
    sourceW: 128,
    sourceH: 128
});

// Left grass fade into wall
var newTile3 = tile({
    context: canvas.getContext("2d"),
    image: tileSet,
    sourceX: 262,
    sourceY: 2,
    sourceW: 128,
    sourceH: 128   
});

// Right grass edge
var newTile4 = tile({
    context: canvas.getContext("2d"),
    image: tileSet,
    sourceX: 1432,
    sourceY: 2,
    sourceW: 128,
    sourceH: 128  
});

// Dirt inner corner
var newTile5 = tile({
    context: canvas.getContext("2d"),
    image: tileSet,
    sourceX: 132,
    sourceY: 2,
    sourceW: 128,
    sourceH: 128  
});

// Dirt edge
var newTile6 = tile({
    context: canvas.getContext("2d"),
    image: tileSet,
    sourceX: 1823,
    sourceY: 2,
    sourceW: 128,
    sourceH: 128  
});

// Flat water
var newTile7 = tile({
    context: canvas.getContext("2d"),
    image: tileSet,
    sourceX: 1172,
    sourceY: 2,
    sourceW: 128,
    sourceH: 128  
});

// Water top
var newTile8 = tile({
    context: canvas.getContext("2d"),
    image: tileSet,
    sourceX: 1042,
    sourceY: 2,
    sourceW: 128,
    sourceH: 99  
});


var tileLib = { "01":newTile1, "02":newTile2, "03":newTile3, "04":newTile4, "05":newTile5, "06":newTile6, "07":newTile7, "08":newTile8 };