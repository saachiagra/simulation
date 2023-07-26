var canvas1 = document.getElementById("Canvas1"); 
var ctx1 = canvas1.getContext("2d");

var radius1 = 15;
var color_t1 = "red";
var x_t1 = 50;
var y_t1 = 50;
var sliderWidth_t1 = 1;
var sliderColor_t1 = "black";

var color_t2 = "red";
var x_t2 = 50;
var y_t2 = 150;
var sliderWidth_t2 = 1;
var sliderColor_t2 = "black";

var color_t3 = "red";
var x_t3 = 50;
var y_t3 = 250;
var sliderWidth_t3 = 1;
var sliderColor_t3 = "black";

var sunGlowRad = 45;
var growth = 0.1;

// t for temperature
function animate_t() {
  requestAnimationFrame(animate_t);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  
  //sun
  var temp_sun_glow = new Circle(ctx1, 0, 101, sunGlowRad, "#fcba03", false, 0, null, 0, 0.5*Math.PI, 0.7);
  if (sunGlowRad < 40) {
    growth *= -1;
  } else if (sunGlowRad > 50) {
    growth *= -1;
  }
  sunGlowRad += growth;
  var temp_sun = new Circle(ctx1, 0, 101, 33, "yellow", false, 0, null, 0, 0.5*Math.PI);
  
  //tree
  var tree_trunk = new Rect(ctx1, 240, 120, 30, 80, "brown");
  var tree_leaves1 = new Circle(ctx1, 273, 144, 22, "#065720", false, 0, null);
  var tree_leaves2 = new Circle(ctx1, 255, 135, 28, "green", false, 0, null);
  var tree_leaves3 = new Circle(ctx1, 230, 142, 19, "#099209", false, 0, null);
  var tree_leaves4 = new Circle(ctx1, 238, 120, 17, "#7cba34", false, 0, null);

  var shadow = new Rect(ctx1, 255, 100, 50, 100, "gray", 0.4)
  
  var circle_t1 = new Circle(ctx1, x_t1, y_t1, radius1, color_t1, true, sliderWidth_t1, sliderColor_t1);
  var circle_t2 = new Circle(ctx1, x_t2, y_t2, radius1, color_t2, true, sliderWidth_t2, sliderColor_t2);
  var circle_t3 = new Circle(ctx1, x_t3, y_t3, radius1, color_t3, true, sliderWidth_t3, sliderColor_t3);

  new Line(ctx1, 0, 100, 300, 100, 1.5);
  new Line(ctx1, 0, 200, 300, 200, 1.5);

  var mouseCoordsCircle1 = new CanvasMouseCoords(canvas1);
  //first circle
  if (insideCircle(mouseCoordsCircle1, x_t1, y_t1, radius1, 0)) {
    color_t1 = "#850d04";
    sliderWidth_t1 = 5;
    sliderColor_t1 = "#c96961";
    statement = "yes";
    //var dx = (x - mouseX)/60;
    if (isClick) {
        x_t1 = mouseCoordsCircle1.canvX;
        y_t1 = mouseCoordsCircle1.canvY;
        statement = "yessss";
    }
  } else {
    color_t1 = "red";
    sliderColor_t1 = "black";
    sliderWidth_t1 = 1;
    statement = "no";
  }

  //second circle
  if (insideCircle(mouseCoordsCircle1, x_t2, y_t2, radius1, 0)) {
    color_t2 = "#850d04";
    sliderWidth_t2 = 5;
    sliderColor_t2 = "#c96961";
    if (isClick) {
        x_t2 = mouseCoordsCircle1.canvX;
        y_t2 = mouseCoordsCircle1.canvY;
    }
  } else {
    color_t2 = "red";
    sliderColor_t2 = "black";
    sliderWidth_t2 = 1;
  }

  //third circle
  if (insideCircle(mouseCoordsCircle1, x_t3, y_t3, radius1, 0)) {
    color_t3 = "#850d04";
    sliderWidth_t3 = 5;
    sliderColor_t3 = "#c96961";
    if (isClick) {
        x_t3 = mouseCoordsCircle1.canvX;
        y_t3 = mouseCoordsCircle1.canvY;
    }
  } else {
    color_t3 = "red";
    sliderColor_t3 = "black";
    sliderWidth_t3 = 1;
  }

  document.getElementById("temp1").innerHTML = "coords: " + mouseX + "," + mouseY + "Temperature: " + x_t1 + statement;

}

animate_t(); 