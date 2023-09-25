var canvas1 = document.getElementById("Canvas1"); 
var ctx1 = canvas1.getContext("2d");

var radius1 = 15;
var color_t1 = "red";
var x_t1 = 50;
var y_t1 = 50;
var sliderWidth_t1 = 1;
var sliderColor_t1 = "black";
let alpha1 = 1;

var color_t2 = "red";
var x_t2 = 50;
var y_t2 = 150;
var sliderWidth_t2 = 1;
var sliderColor_t2 = "black";
let alpha2 = 1;

var color_t3 = "red";
var x_t3 = 50;
var y_t3 = 250;
var sliderWidth_t3 = 1;
var sliderColor_t3 = "black";
let alpha3 = 1;

var sunGlowRad = 45;
var growth = 0.1;
let alphaSunGlow = 0.7;
let sunGlowGrowth = -0.01;

let tempAnom = 0;

function calcTemp() {
  let num = tempAnom + 68;
  //ASSUMPTION: up to 15 degrees warmer in sun
  num += Math.abs(x_t2 - 300) / 17;
  num += x_t3 / 55;
  num = Math.round(num*10)/10;
  return num;
}

function toCelsius(num) {
  return Math.round(((num - 32) * 5/9)*10)/10;
}

// t for temperature
function animate_t() {
  requestAnimationFrame(animate_t);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  
  //sun
  var temp_sun_glow = new Circle(ctx1, 0, 101, sunGlowRad, "#fcba03", false, 0, null, 0, 0.5*Math.PI, alphaSunGlow);
  if (sunGlowRad < 40) {
    growth *= -1;
    sunGlowGrowth *= -1;
  } else if (sunGlowRad > 50) {
    growth *= -1;
    sunGlowGrowth *= -1;
  }
  sunGlowRad += growth;
  alphaSunGlow += sunGlowGrowth;
  var temp_sun = new Circle(ctx1, 0, 101, 33, "yellow", false, 0, null, 0, 0.5*Math.PI);
  
  //tree
  var tree_trunk = new Rect(ctx1, 240, 120, 30, 80, "brown");
  var tree_leaves1 = new Circle(ctx1, 273, 144, 22, "#065720", false, 0, null);
  var tree_leaves2 = new Circle(ctx1, 255, 135, 28, "green", false, 0, null);
  var tree_leaves3 = new Circle(ctx1, 230, 142, 19, "#099209", false, 0, null);
  var tree_leaves4 = new Circle(ctx1, 238, 120, 17, "#7cba34", false, 0, null);

  var shadow = new Rect(ctx1, 255, 100, 50, 100, "gray", 0.4);

  var ground1 = new Circle (ctx1, 12, 302, 60, "green", false, 0, null);
  var ground2 = new Circle(ctx1, 0, 517, 250,"#7cba34", false, 0, null, end=0.5*Math.PI);

  //buildings
  let build1 = new Rect (ctx1, 239, 219, 44, 85, "#a1a1a1");
  let build2 = new Rect(ctx1, 216, 240, 42, 60, "gray");
  let build3 = new Rect(ctx1, 204, 251, 28, 50, "#565656");
  let build4 = new Rect(ctx1, 248, 264, 50, 45, "#c4c4c4");
  
  var circle_t1 = new Circle(ctx1, x_t1, y_t1, radius1, color_t1, true, sliderWidth_t1, sliderColor_t1);
  var circle_t2 = new Circle(ctx1, x_t2, y_t2, radius1, color_t2, true, sliderWidth_t2, sliderColor_t2);
  var circle_t3 = new Circle(ctx1, x_t3, y_t3, radius1, color_t3, true, sliderWidth_t3, sliderColor_t3);

  new Line(ctx1, 0, 100, 300, 100, 1.5);
  new Line(ctx1, 0, 200, 300, 200, 1.5);

  var mouseCoordsCircle1 = new CanvasMouseCoords(canvas1);
  //first circle
  if (insideCircle(mouseCoordsCircle1, x_t1, y_t1, radius1, 0)) {
    sliderWidth_t1 = 8;
    sliderColor_t1 = "#94908f";
    statement = "yes";
    //var dx = (x - mouseX)/60;
    if (isClick) {
      if (mouseCoordsCircle1.canvX < radius1 || mouseCoordsCircle1.canvX > 300 - radius1) {
        x_t1 = x_t1;
      } else {
        x_t1 = mouseCoordsCircle1.canvX;
      }
      if (mouseCoordsCircle1.canvY < radius1 || mouseCoordsCircle1.canvY > 100 - radius1) {
        y_t1 = y_t1;
      } else {
        y_t1 = mouseCoordsCircle1.canvY;
      }
    }
  } else {
    if (document.getElementById("therm1").checked) {
      tempAnom = 0;
      color_t1 = "red";
    } else if (document.getElementById("therm2").checked) {
      tempAnom = 5;
      color_t1 = "yellow";
    } else if (document.getElementById("therm3").checked) {
      tempAnom = -5;
      color_t1 = "blue";
    }
    sliderColor_t1 = "black";
    sliderWidth_t1 = 1;
    statement = "no";
  }

  

  //second circle
  if (insideCircle(mouseCoordsCircle1, x_t2, y_t2, radius1, 0)) {
    sliderWidth_t2 = 8;
    sliderColor_t2 = "#94908f";
    if (isClick) {
      if (mouseCoordsCircle1.canvX < radius1 || mouseCoordsCircle1.canvX > 300 - radius1) {
        x_t2 = x_t2;
      } else {
        x_t2 = mouseCoordsCircle1.canvX;
      }
      if (mouseCoordsCircle1.canvY < 100 + radius1 || mouseCoordsCircle1.canvY > 200 - radius1) {
        y_t2 = y_t2;
      } else {
        y_t2 = mouseCoordsCircle1.canvY;
      }
    }
  } else {
    color_t2 = "red";
    sliderColor_t2 = "black";
    sliderWidth_t2 = 1;
  }

  //third circle
  if (insideCircle(mouseCoordsCircle1, x_t3, y_t3, radius1, 0)) {
    sliderWidth_t3 = 8;
    sliderColor_t3 = "#94908f";
    if (isClick) {
      if (mouseCoordsCircle1.canvX < radius1 || mouseCoordsCircle1.canvX > 300 - radius1) {
        x_t3 = x_t3;
      } else {
        x_t3 = mouseCoordsCircle1.canvX;
      }
      if (mouseCoordsCircle1.canvY < 200 + radius1 || mouseCoordsCircle1.canvY > 300 - radius1) {
        y_t3 = y_t3;
      } else {
        y_t3 = mouseCoordsCircle1.canvY;
      }
    }
  } else {
    color_t3 = "red";
    sliderColor_t3 = "black";
    sliderWidth_t3 = 1;
  }

  document.getElementById("temp1").innerHTML = "Temperature: " + calcTemp().toString() + "\xB0" + "F<br>Conversion: " + toCelsius(calcTemp()).toString() + "\xB0" + "C";

}

animate_t(); 