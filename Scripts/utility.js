function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         
    // figures out on which side we are colliding (top, bottom, left, or right) 
        var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

function resizeCanvas() {

	/* Find stage size */
    if(window.innerWidth < 500){
        canvas.width = 500;
        canvas.height = 167;
    }else{
        canvas.width = window.innerWidth;
        canvas.height = ( window.innerWidth > 1500 ) ? 500 : window.innerWidth/3;
    }

    /* Reset globals */
	width = canvas.width;
    height = canvas.height;
    //friction = 0.8;
    gravity = (width/500)*0.3;

    /* Reset Ninja */
    ninja.imageScale = (1500/canvas.width);
    ninja.speed = (width/500)*3;
    if(ninja.x > canvas.width || ninja.y > canvas.height ){
    	ninja.x = 15;
    	ninja.y = 15;
    }

    /* Resize boxes */
    boxes = drawLevel1(boxes, canvas.width, canvas.height);
}