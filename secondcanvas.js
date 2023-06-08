var sketchProc = function(processingInstance) {
    with (processingInstance) {
       size(400, 400); 
       frameRate(60);
       // ProgramCodeGoesHere
        background(235, 247, 255);
        fill(0, 85, 255);
        textSize(39);
        text("Second Test", 50, 100);
        text("Will this show up???", 50, 150);
        
    }};
// Get the canvas that Processing-js will use
var canvas = document.getElementById("mycanvas"); 
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc); 