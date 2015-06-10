// 30 tiles in set
function tile (options){

    var that = {};
    that.context = options.context;

    // Display
    that.x = options.x || 0;
    that.y = options.y || 0;
    that.width = options.width || 0;
    that.height = options.height || 0;

    // Sprite Sheet Sources
    that.image = options.image;
    that.sourceX = options.sourceX || 0;
    that.sourceY = options.sourceY || 0;
    that.sourceW = options.sourceW || 0;
    that.sourceH = options.sourceH || 0;

    that.render = function(myX, myY, myWidth, myHeight){
        myX = myX || that.x;
        myY = myY || that.y;
        myWidth = myWidth || that.width;
        myHeight = myHeight || that.height;

        // Draw the animation
        that.context.drawImage(
           that.image,      // Source image
           that.sourceX,    // Source X
           that.sourceY,    // Source Y
           that.sourceW,    // Source Width
           that.sourceH,    // Source Height
           myX,             // Destination X
           myY,             // Destination Y
           myWidth,         // Destination Width
           myHeight);       // Destination Height
    }

    return that;
}

var drawLevel1 = function(boxes, width, height){
    boxes = [];

    // find multiplier
    var xUnit = width/500;
    var yUnit = height/167;

    var mapScale = Math.ceil((canvas.width / 500) * 20);

    // Game Borders
    boxes.push({
        x: 0,
        y: 0,
        width: 10,
        height: height
    });
    boxes.push({
        x: 0,
        y: height - 2,
        width: width,
        height: 50
    });
    boxes.push({
        x: width - 10,
        y: 0,
        width: 50,
        height: height
    });


    // Far Left Island
    boxes.push({
        x: 0 * mapScale,
        y: 6 * mapScale,
        width: 4 * mapScale,
        height: mapScale
    });
    boxes.push({
        x: 4 * mapScale,
        y: 7 * mapScale,
        width: 3 * mapScale,
        height: mapScale
    });
    boxes.push({
        x: 6 * mapScale,
        y: 8 * mapScale,
        width: mapScale,
        height: mapScale
    });

    // 
    boxes.push({
        x: 230 * xUnit,
        y: 120 * yUnit,
        width: 20 * xUnit,
        height: 20 * yUnit
    });

    return boxes;
};