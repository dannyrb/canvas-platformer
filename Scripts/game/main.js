// Universal redraw
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();


// Size all items appropriately
resizeCanvas();

// Game loop
function update() {
    // Default State
    ninja.state = "idle";
    ninja.loop = true;

    // Check Keys
    if (keys[39]) {
        // right arrow

        ninja.state = "run";
        ninja.direction = "right";
        if (ninja.velX < ninja.speed)
        {             
            ninja.velX++;         
        }     
    }     
    if (keys[37]) {         
        // left arrow  

        ninja.state = "run";
        ninja.direction = "left";      
        if (ninja.velX > -ninja.speed) {
            ninja.velX--;
        }
    }
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!ninja.jumping && ninja.grounded) {
            ninja.jumping = true;
            ninja.grounded = false;
            ninja.velY = -ninja.speed * 2;

            ninja.frameIndex = 0;
        }
    }

    if(ninja.jumping && !ninja.grounded){
        ninja.state = "jump";
        ninja.loop = false;
    }
 
    // Apply Gravity/Friction
    ninja.velX *= friction;
    ninja.velY += gravity;
 
    // Clear canvas (so we can redraw)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw BG
    var ratio = canvas.height/750;
    var numRepeat = canvas.width/(1000 * ratio);
    i = 0;
    while(i < numRepeat){
        ctx.drawImage(
           background,          // Source image
           0,                   // Source X
           0,                   // Source Y
           1000,                // Source Width
           750,                 // Source Height
           (i * (1000 * ratio)),// Destination X
           0,                   // Destination Y
           (1000 * ratio),      // Destination Width
           canvas.height);      // Destination Height
        i++;
    }

    // Draw tiles
    var y = 0; var z = 0;
    var mapScale = Math.ceil((canvas.width / 500) * 20);
    while(y < 9){
        while(z < 25){
            if(levelMap[y][z] != "00"){
                console.log("Rendering tile...");
                tileLib[levelMap[y][z]].render((z*mapScale),(y*mapScale),mapScale,mapScale);
            }
            z++;
        }
        z = 0;
        y++;
    }

    // Begin drawing collission boxes
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
 
    // Check for collisions against all boxes
    // && redraw all boxes
    ninja.grounded = false;
    for (var i = 0; i < boxes.length; i++) 
    {
        // Draw the boxes
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
 
        // Check for collission direction
        var dir = colCheck(ninja, boxes[i]);
 
        // If collission...
        if (dir === "l" || dir === "r") {
            ninja.velX = 0;
            ninja.jumping = false;
        } else if (dir === "b") {
            ninja.grounded = true;
            ninja.jumping = false;
        } else if (dir === "t") {
            ninja.velY *= -1;
        }
    }
 
    // Check if grounded
    if(ninja.grounded){
         ninja.velY = 0;
    }
 
    // Move player
    ninja.x += ninja.velX;
    ninja.y += ninja.velY;
 
    // // Redraw player
    ctx.fill();

    // Draw Ninja
    ninja.update();
    ninja.render(ninja.x, ninja.y, 2);
 
    // Recursive? Redraw
    requestAnimationFrame(update);
}
 

/* All Listeners */
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
 
window.addEventListener("load", function () {
    update();
});

window.addEventListener('resize', resizeCanvas, false);