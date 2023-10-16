var canvas3 = document.getElementById("isotope");
var ctx3 = canvas3.getContext("2d");

let carbonIsoX = [];
let carbonIsoY = [];
let carbonIsoDX = [];
let carbonIsoDY = [];
let isoColorOptions = ["darkblue", "red", "#39FF14"];
let c12 = 0;
let c13 = 0;
let c14 = 0;
let isoColorArray = [];
let rectX = 100;
let rectY = 100;
let mouseRectDiffX = 0;
let mouseRectDiffY = 0;
let rectColor = "black";
let rectStroke = 3;

function moveIso() {
    for (let i = 0; i < carbonIsoX.length; i++) {
        carbonIsoX[i] += carbonIsoDX[i];
        carbonIsoY[i] += carbonIsoDY[i];
    }
}

function removeIso() {
    for (var i = 0; i < carbonIsoX.length; i++) {
        if (carbonIsoX[i] < 0 || carbonIsoY[i] < 0 || carbonIsoX[i] > 300 || carbonIsoY[i] > 300) {
          carbonIsoX.splice(i, 1);
          carbonIsoY.splice(i, 1);
          carbonIsoDX.splice(i, 1);
          carbonIsoDY.splice(i, 1);
          isoColorArray.splice(i, 1);
        }
    }
}

function addIso() {
    if (carbonIsoX.length < 100) {
        for (let i = carbonIsoX.length; i < 101; i++) {
            carbonIsoX[i] = getRandom(295, 5);
            carbonIsoY[i] = getRandom(295, 5);
            let colorIndex = 0;
            let randNum = getRandomNoRound(100, 0);
            if (randNum < 98.876) {
                colorIndex = 0;
                c12 += 1;
            } else if (randNum < 99.98) {
                colorIndex = 1;
                c13 += 1;
            } else if (randNum <= 100){
                colorIndex = 2;
                c14 += 1;
            }
            isoColorArray[i] = isoColorOptions[colorIndex];
            carbonIsoDX[i] = getRandomNoRound(1, -1);
            carbonIsoDY[i] = getRandomNoRound(1, -1);
        }
    }
}

function percentageCalc(num1, num2, num3) {
    let total = num1 + num2 + num3;
    return [Math.round((num1/total)*10000)/100, Math.round((num2/total)*10000)/100, Math.round((num3/total)*1000000)/10000];
}

function animate_i() {
    requestAnimationFrame(animate_i);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    addIso();
    moveIso();
    removeIso();
    for (let i = 0; i < 100; i++) {
        let circ = new Circle(ctx3, carbonIsoX[i], carbonIsoY[i], 4, isoColorArray[i], false);
    }

    //plant stuff
    var tree_trunk = new Rect(ctx3, 40, 220, 30, 80, "brown");
    var tree_leaves1 = new Circle(ctx3, 73, 244, 22, "#065720", false, 0, null);
    var tree_leaves2 = new Circle(ctx3, 55, 235, 28, "green", false, 0, null);
    var tree_leaves3 = new Circle(ctx3, 30, 242, 19, "#099209", false, 0, null);
    var tree_leaves4 = new Circle(ctx3, 38, 220, 17, "#7cba34", false, 0, null);

    let trapezoidArray1 = [222,300, 227,249, 247,245, 291,300];
    let trapezoidArray2 = [253,300, 265, 259, 300,252, 300,300];
    let trapezoidArray3 = [240,300, 250,270, 290,268, 298,300];
    new Polygon(ctx3, trapezoidArray1, "dimgray");
    new Polygon(ctx3, trapezoidArray2, "#282828");
    new Polygon(ctx3, trapezoidArray3, "black");

    var confinedRect = new Rect(ctx3, rectX, rectY, 75, 75, "transparent", true, rectStroke, rectColor);
    var mouseCoordsCircle3 = new CanvasMouseCoords(canvas3);
    if (insideRect(mouseCoordsCircle3, rectX, rectY, 75, 75, 1)) {
        rectColor = "goldenrod";
        rectStroke = 5;
        mouseRectDiffX = mouseCoordsCircle3.canvX - rectX;
        mouseRectDiffY = mouseCoordsCircle3.canvY - rectY;
        if(isClick) {
            if (mouseCoordsCircle3.canvX < 280 && mouseCoordsCircle3.canvX > 20 && mouseCoordsCircle3.canvY < 280 && mouseCoordsCircle3.canvY > 20) {
                rectX = mouseCoordsCircle3.canvX - 35;
                rectY = mouseCoordsCircle3.canvY - 35;
            }
        }
    } else {
        rectColor = "black";
        rectStroke = 3;
    }

    let concArray = [];
    if (rectX > 200 && rectY > 200) {
        concArray = percentageCalc(c12, c13/2, 0);
    } else if (rectX < 100 && rectY > 200) {
        concArray = percentageCalc(c12, c13/2, c14 + 0.01);
    } else {
        concArray = percentageCalc(c12, c13, c14 + 0.01);
    }
    document.getElementById("c12Conc").innerHTML = concArray[0].toString() + "%" 
    document.getElementById("c13Conc").innerHTML = concArray[1].toString() + "%" 
    document.getElementById("c14Conc").innerHTML = concArray[2].toString() + "%";
    
}

animate_i();