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
var canvas = document.getElementById("Canvas1");
var ctx = canvas.getContext("2d");

var isClick = false;
var mouseX = undefined;
var mouseY = undefined;
window.addEventListener('mousedown', 
  function(event) {
    isClick = true;
});
window.addEventListener('mouseup', 
  function(event) {
    isClick = false;
});
window.addEventListener('mousemove', 
  function(event) {
    mouseX = event.x;
    mouseY = event.y;
  }
);

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
for (var i = 0; i < 5; i++) {
  coordXArray[i] = Math.round(Math.random()*200 + 75);
  coordYArray[i] = Math.round(Math.random()*50 + 87);
}
function addCircles() {
  var add = Math.round(x/5) - coordXArray.length;
  for (var i = 0; i < add; i++) {
    var getNew = false;
    var newX;
    var newY;
    do {
      newX = Math.round(Math.random()*200 + 75);
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

function removeCircles() {
  var subtract = coordXArray.length - Math.round(x/5);
  for (var i = 0; i < subtract; i++) {
    coordXArray.pop();
    coordYArray.pop();
  }
}

function moveLight() {
  for (var a = 0; a < lightX.length; a++) {
    lightX[a] += lightVX[a];
    lightY[a] += lightVY[a];
    if (lightX[a] + radiusL > 300) {
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

function addLightP() {
  var last = lightX.length;
  lightX[last] = 25;
  lightY[last] = 60;
  lightVX[last] = Math.round(Math.random()*1*1000)/1000;
  lightVY[last] = Math.round((Math.random()*2 + 1)*1000)/1000;
}

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

function getDistance(x1, x2, y1, y2) {
  return Math.sqrt((Math.pow(Math.abs(y2-y1), 2)) + (Math.pow(Math.abs(x2-x1), 2)));
}

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

//fix this!
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

function Circle(xPos, yPos, rad, lineW, fill, yesStroke) {
  this.xPos = xPos;
  this.yPos = yPos;
  ctx.beginPath();
  ctx.arc(this.xPos, this.yPos, rad, 0, 2 * Math.PI);
  if (yesStroke) {
    ctx.lineWidth = lineW;
    ctx.stroke();
  }
  ctx.fillStyle = fill;
  ctx.fill();

}

function Line(x1, y1, x2, y2, lineW) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = lineW;
  ctx.fillStyle = "black";
  ctx.stroke();
}

function startLight() {
  startSim = true;
}

function reset() {
  startSim = false;
}

var counter = 55;
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  /*ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Temperature: " + x, 10, 50);*/
  var ground = new Line(0, y-25, 300, y-25, 3);
  var sliderLine = new Line(0, y, 300, y, 1.5);
  var slider = new Circle(x, y, radiusS, sliderWidth, color, true); 
  var coor = "Value: " + Math.round(x/5);
  document.getElementById("demo").innerHTML = coor;
    for (var j = 0; j < coordXArray.length; j++) {
      new Circle(coordXArray[j], coordYArray[j], radiusC, 0, "#505d6b", false);
    }
    if (startSim) {
      counter++;
      if (counter > 60 && lightX.length < 10) {
        addLightP();
        counter = 0;
      }
      for (var k = 0; k < lightX.length; k++) {
        new Circle(lightX[k], lightY[k], radiusL, 0, "#fcba03", false);
      }
      moveLight();
      removeLightP();
      checkCollide();
    } else {
      var rect = canvas.getBoundingClientRect();
      var canvX = mouseX - rect.left;
      var canvY = mouseY - rect.top;
      var insideCircle = (canvX < x + radiusS + 5) && (canvX > x - radiusS - 5)  && (canvY < y + radiusS + 5)  && (canvY > y - radiusS - 5);
      if (insideCircle) {
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
      addCircles();
      removeCircles();
    }
    
}


animate();