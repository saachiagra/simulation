/*var canvas = document.getElementById("Canvas1");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fill();
  } */

  /*var canvas = document.getElementById("Canvas1");
      var ctx = canvas.getContext("2d");
      var xCoor = 95;
      ctx.beginPath();
        ctx.arc(xCoor,50,15,0,2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "blue";
        ctx.fill();
      function showCoords(event) {
        xCoor = event.clientX;
        var y = event.clientY;
        var coor = "X coords: " + xCoor + ", Y coords: " + y;
        document.getElementById("demo").innerHTML = coor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(xCoor,50,15,0,2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "blue";
        ctx.fill();
      }
      function clearCoor(event) {
        document.getElementById("demo").innerHTML = "";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(xCoor,50,15,0,2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "blue";
        ctx.fill();
      } */
var canvas = document.getElementById("Canvas2");
var ctx = canvas.getContext("2d");

var x = 25;
var y = 275;
var radiusS = 15;
var radiusL = 5;
var radiusC = 10;
var sliderWidth = 1;
var color = "#407fc2";
var numCircles = Math.round(x/5);
var coordXArray = [];
var coordYArray = [];
var lightX = [];
var lightVX = [];
var lightY = [];
var lightVY = [];
var startSim = false;


//generates coordinates for 5 initial molecules
for (var i = 0; i < 5; i++) {
  coordXArray[i] = Math.round(Math.random()*220 + 75);
  coordYArray[i] = Math.round(Math.random()*50 + 87);
}

//generating more molecule coordinates based on slider's position
function addCircles(input) {
  var add = input - coordXArray.length;
  for (var i = 0; i < add; i++) {
    var getNew = false;
    var newX;
    var newY;
    do {
      newX = Math.round(Math.random()*220 + 75);
      newY = Math.round(Math.random()*50 + 87);
      for (var j = 0; j < lightX.length; j++) {
        if (Math.sqrt(Math.pow(lightX[i] - coordXArray[j], 2) + Math.pow(lightY[i] - coordYArray[j], 2)) < (radiusL + radiusS)) {
          getNew = true;
        }
      }
    } while (getNew);

    coordXArray[i+coordXArray.length] = newX;
    coordYArray[i+coordXArray.length] = newY;
  }
}

//TODO: UPDATE THIS!!!
//removes molecule coordinates based on slider's position
function removeCircles(input) {
  var subtract = coordXArray.length - input;
  for (var i = 0; i < subtract; i++) {
    coordXArray.pop();
    coordYArray.pop();
  }
}

//adding dx and dy to light particles' position each time animate() is called
function moveLight() {
  for (var a = 0; a < lightX.length; a++) {
    lightX[a] += lightVX[a];
    lightY[a] += lightVY[a];
    if (lightX[a] + radiusL > 300 || lightX[a] - radiusL < 0) {
      lightVX[a] = -lightVX[a];
    } 
     if (lightY[a] + radiusL > 250) {
      lightVY[a] = -lightVY[a];
    }
    /*if (lightX[a] < -20) {
      lightX.splice(a, 1);
      lightY.splice(a, 1);
      lightVX.splice(a, 1);
      lightVY.splice(a, 1);
    }*/
  
  }   
}

//adds coordinates and dx/dy values for new light particle
function addLightP() {
  var last = lightX.length;
  lightX[last] = 25;
  lightY[last] = 60;
  lightVX[last] = Math.round(Math.random()*1*1000)/1000;
  lightVY[last] = Math.round((Math.random()*2 + 1)*1000)/1000;
}

//removes light particle's coordinates if it goes offscreen
function removeLightP() {
  for (var i = 0; i < lightX.length; i++) {
    if (lightX[i] < 0 || lightY[i] < 0) {
      lightX.splice(i, 1);
      lightY.splice(i, 1);
      lightVX.splice(i, 1);
      lightVY.splice(i, 1);
    }
  }
}

//sees if light particle collides with molecule
function checkCollide() {
  for (var i = 0; i < lightX.length; i++) {
    for (var j = 0; j < coordXArray.length; j++) {
      var distanceBtwPoints = getDistance(coordXArray[j], lightX[i], coordYArray[j], lightY[i]);
      if(distanceBtwPoints < (radiusL + radiusC)) {
        momentum(i,j);
      }
    }
  }
}

//makes light particle bounce off molecule
//twas absolute pain to make this work
function momentum(a, b) {
  var angle;
  if (Math.round((lightX[a] - coordXArray[b])*1000)/1000 != 0) {
    angle = Math.atan((lightY[a] - coordYArray[b])/(lightX[a] - coordXArray[b]));
  } else {
    angle = Math.PI/2;
  }

  var dx = Math.round(Math.cos(angle)*1000)/1000;
  var dy = Math.round(Math.sin(angle)*1000)/1000;
  if ((lightY[a] - coordYArray[b]) <= 0 && (lightX[a] - coordXArray[b]) <= 0) {
    dx *= -1;
    dy *= -1;
  } else if ((lightY[a] - coordYArray[b]) >= 0 && (lightX[a] - coordXArray[b]) <= 0) {
    dx *= -1;
    dy *= -1;
  }

  lightVX[a] += dx;
  lightVY[a] += dy;
}

//start and reset correspond to buttons
function startLight() {
  startSim = true;
}

function reset() {
  startSim = false;
  lightX = [];
  lightVX = [];
  lightY = [];
  lightVY = [];
}

// formMS = document.getElementById("moleSel");
// formMS.addEventListener("submit", (event) => {
  
//   event.preventDefault();
// });

var counter = 55;
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  /*ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Temperature: " + x, 10, 50);*/
  
  // NOTE: REPLACING CANVAS SLIDER WITH HTML RANGE INPUT
  // var ground = new Line(ctx, 0, y-25, 300, y-25, 3);
  // var sliderLine = new Line(ctx, 0, y, 300, y, 1.5);
  // var slider = new Circle(ctx, x, y, radiusS, color, true, sliderWidth, "black"); 
  // var coor = "Value: " + Math.round(x/5);

  var ground = new Rect(ctx, 0, 250, 300, 50, "darkgreen");

  if (document.getElementById("co2").checked) {
    radiusC = 10;
  } else if (document.getElementById("ch4").checked) {
    radiusC = 20;
  } else if (document.getElementById("n2o").checked) {
    radiusC = 50;
  }

  var coor = document.getElementById("moleConc").value;
  document.getElementById("getMoleNum").innerHTML = coor;

  for (var j = 0; j < coordXArray.length; j++) {
    new Circle(ctx, coordXArray[j], coordYArray[j], radiusC, "#505d6b", false, 0, null);
  }
  if (startSim) {
    counter++;
    if (counter > 60 && lightX.length < 10) {
      addLightP();
      counter = 0;
    }
    for (var k = 0; k < lightX.length; k++) {
      new Circle(ctx, lightX[k], lightY[k], radiusL, "#fcba03", false, 0, null);
    }
    moveLight();
    removeLightP();
    checkCollide();
  } else {
    var mouseCoordsSlider = new CanvasMouseCoords(canvas)
    if (insideCircle(mouseCoordsSlider, x, y, radiusS, 5)) {
      color = "#3569a1";
      sliderWidth = 5;
      var dx = (x - mouseX)/60;
      if (isClick) {
        if (mouseX > x && mouseX < canvas.width - radiusS - 5) {
          x = mouseX + dx;
        } else if (mouseX < x && mouseX > radiusS - 5) {
          x = mouseX - dx;
        } else {
          x = x;
        }
      }
    } else {
      color = "#407fc2";
      sliderWidth = 1;
    }
    addCircles(coor);
    removeCircles(coor);
  }

  /*ctx1.beginPath();
  ctx1.arc(50, 50, 10, 0, 2 * Math.PI);
  ctx1.lineWidth = 1;
  ctx1.stroke();
  ctx1.fillStyle = "red";
  ctx1.fill(); */
    
}


animate();