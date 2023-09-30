//get mouse actions
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

//add smth for line color?
function Line(contextNum, x1, y1, x2, y2, lineW, color="black", alpha=1) {
  contextNum.globalAlpha = alpha;
  contextNum.beginPath();
  contextNum.moveTo(x1, y1);
  contextNum.lineTo(x2, y2);
  contextNum.lineWidth = lineW;
  contextNum.strokeStyle = color;
  contextNum.stroke();
}

//canvas type, x location, y location, radius, inside color, boolean outline, outline thickness, outline color, radian start, num of radians, opacity
function Circle(contextNum, xPos, yPos, rad, fill, yesStroke=false, lineW=0, strokeColor=null, start=0, end=2*Math.PI, alpha=1) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.radius = rad;
  this.color = fill;
  contextNum.globalAlpha = alpha;
  contextNum.beginPath();
  contextNum.moveTo(this.xPos, this.yPos);
  contextNum.arc(this.xPos, this.yPos, rad, start, end);
  if (yesStroke) {
    contextNum.lineWidth = lineW;
    contextNum.strokeStyle = strokeColor;
    contextNum.stroke();
  }
  contextNum.fillStyle = fill;
  contextNum.fill();
  contextNum.closePath();
}

function Ellipse(contextNum, xPos, yPos, radX, radY, fill, rotation=0, yesStroke=false, lineW=0, strokeColor=null, start=0, end=2*Math.PI, alpha=1) {
  this.xPos = xPos;
  this.yPos = yPos;
  contextNum.globalAlpha = alpha;
  contextNum.beginPath();
  contextNum.moveTo(this.xPos, this.yPos);
  contextNum.ellipse(this.xPos, this.yPos, radX, radY, rotation, start, end);
  if (yesStroke) {
    contextNum.lineWidth = lineW;
    contextNum.strokeStyle = strokeColor;
    contextNum.stroke();
  }
  contextNum.fillStyle = fill;
  contextNum.fill();
  contextNum.closePath();
}

function Rect(contextNum, xPos, yPos, w, h, fill, alpha=1) {
  this.xPos = xPos;
  this.yPos = yPos;
  contextNum.globalAlpha = alpha;
  contextNum.beginPath();
  contextNum.rect(this.xPos, this.yPos, w, h);
  contextNum.fillStyle = fill;
  contextNum.fill();
  contextNum.closePath();
}

function getDistance(x1, x2, y1, y2) {
  return Math.sqrt((Math.pow(Math.abs(y2-y1), 2)) + (Math.pow(Math.abs(x2-x1), 2)));
}

//gets coordinates of mouse relative to a certain canvas
function CanvasMouseCoords(canvasNum) {
  var rect = canvasNum.getBoundingClientRect();
  this.canvX = mouseX - rect.left;
  this.canvY = mouseY - rect.top;
}

//returns boolean based on if mouse coordinates are inside circle
function insideCircle(cmc, xPos, yPos, rad, marginOfError) {
  return (getDistance(cmc.canvX, xPos, cmc.canvY, yPos)) < (rad + marginOfError);
}