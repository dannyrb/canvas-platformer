// CHARACTER SPRITE
function sprite (options) {
                
    var that = {},
        tickCount = 0,
        ticksPerFrame = ticksPerFrame || 3;
    
    that.frameIndex = that.frameIndex || options.frameIndex || 0;
    that.context = options.context;

    // Display
	that.x = options.x || 15;
    that.y = options.y || 15;
    that.width = options.width || 1;
    that.height = options.height || 1;

    // Physics
    that.speed = options.speed || 3;
    that.velX = options.velX || 0;
    that.velY = options.velY || 0;
    that.jumping = options.jumping || false;
    that.grounded = options.grounded || false;

    // Sprite Sheet Sources
    that.image = options.image;
    that.imageLeft = options.imageLeft;
    that.sourceX = 0;
    that.sourceY = 0;
    that.sourceW = 0;
    that.sourceH = 0;

    // Handeling sheets based on context
    that.loop = options.loop;
    that.state = options.state;
    that.direction = options.direction;

    // Scale based on canvas size
    that.imageScale = options.imageScale || 1;

    that.update = function () {

        tickCount += 1;

        if(tickCount > ticksPerFrame){

            tickCount = 0;

            // Update display properties
            var imageCoords = ninjaPos[that.state][that.frameIndex];
            that.sourceX = imageCoords.x;
            that.sourceY = imageCoords.y;
            that.sourceW = imageCoords.w;
            that.sourceH = imageCoords.h;
            that.width = (imageCoords.w / that.imageScale);
            that.height = (imageCoords.h / that.imageScale);


            if (that.frameIndex < ninjaPos[that.state].length - 1) {  
                // Go to the next frame
                that.frameIndex += 1;
            } else if (that.loop) {
                that.frameIndex = 0;
            }
        }

    };

    that.render = function (myX, myY) {

    	myX = myX || 0;
    	myY = myY || 0;

        var imageSheet = (that.direction == "right") ? that.image : that.imageLeft;

        // Draw the animation
        that.context.drawImage(
           imageSheet,      // Source image
           that.sourceX,   	// Source X
           that.sourceY,   	// Source Y
           that.sourceW,   	// Source Width
           that.sourceH,   	// Source Height
           myX,             // Destination X
           myY,             // Destination Y
           that.width,   	// Destination Width
           that.height);  	// Destination Height
    };

    return that;
}

// ninjaStates
var ninjaStates = function(ninjaPos){

    // Clear coords
    ninjaPos = [];

    // List of states
    ninjaPos["run"] = [];
    ninjaPos["idle"] = [];
    ninjaPos["jump"] = [];

    // Push coords for different states
    ninjaPos["run"].push( { "x":345,"y":682,"w":54,"h":69 }, 
                          { "x":401,"y":682,"w":54,"h":69 },
                          { "x":2,"y":756,"w":54,"h":69 },
                          { "x":58,"y":756,"w":54,"h":69 },
                          { "x":114,"y":756,"w":54,"h":69 },
                          { "x":170,"y":756,"w":54,"h":69 },
                          { "x":226,"y":756,"w":54,"h":69 },
                          { "x":282,"y":756,"w":54,"h":69},
                          { "x":338,"y":756,"w":54,"h":69 }, 
                          { "x":394,"y":756,"w":54,"h":69 });

    ninjaPos["idle"].push( { "x":206,"y":378,"w":35,"h":66 },
                           { "x":243,"y":378,"w":35,"h":66 },
                           { "x":280,"y":378,"w":35,"h":66 },
                           { "x":317,"y":378,"w":35,"h":66 },
                           { "x":354,"y":378,"w":35,"h":66 },
                           { "x":391,"y":378,"w":35,"h":66 },
                           { "x":354,"y":378,"w":35,"h":66 },
                           { "x":317,"y":378,"w":35,"h":66 },
                           { "x":280,"y":378,"w":35,"h":66 },
                           { "x":243,"y":378,"w":35,"h":66 });

    ninjaPos["jump"].push( { "x":394,"y":608,"w":54,"h":72 },
    					   { "x":2,"y":682,"w":54,"h":72 },
    					   { "x":58,"y":682,"w":54,"h":72 },
    					   { "x":114,"y":682,"w":54,"h":72 },
    					   { "x":114,"y":682,"w":54,"h":72 },
    					   { "x":114,"y":682,"w":54,"h":72 },
    					   { "x":170,"y":682,"w":54,"h":72 },
    					   { "x":226,"y":682,"w":54,"h":72 },
    					   { "x":282,"y":682,"w":54,"h":72 },
    					   { "x":282,"y":682,"w":54,"h":72 });


    return ninjaPos;
}