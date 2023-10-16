// console.log("Is this working??????")

var canvas4 = document.getElementById("openingBackground");
var ctx4 = canvas4.getContext("2d");


let canv4height = 0
canv4width = 0;

function sizeCanvas() {
    const ratio = window.devicePixelRatio;
    canvas4.width = window.innerWidth * ratio;
    canvas4.height = 200 * ratio;
    canvas4.style.width = document.getElementById("opening").offsetWidth + "px";
    canvas4.style.height = 200 + "px";
    canvas4.getContext("2d").scale(ratio, ratio);
    canv4height = 200;
    canv4width = document.getElementById("opening").offsetWidth;
    console.log("thing" + document.getElementById("opening").offsetWidth.toString());
}

// sizeCanvas();
window.addEventListener('resize', sizeCanvas);


let opCircleX = [];
let opCircleY = [];
let opCircleDX = [];
let opCircleDY = [];
let opCircleColorR = [];
let opCircleColorG = [];
let opCircleColorB = [];
let opCircleColorA = [];

function makeOpeningCircles() {
    for (let i = 0; i < 100; i++) {
        opCircleX[i] = getRandom(canv4width - 10, 10);
        opCircleY[i] = getRandom(canv4height - 10, 10);
        opCircleDX[i] = getRandomNoRound(1, -1);
        opCircleDY[i] = getRandomNoRound(1, -1);
        let initColor = getRandom(4, 1);
        if (initColor < 4) {
            //makes circle some color btw blue and green
            let gradRandom = getRandom(1000, 0);
            opCircleColorR[i] = 0;
            opCircleColorG[i] = 0 + (100/1000)*gradRandom;
            opCircleColorB[i] = 139 - (139/1000)*gradRandom;
            opCircleColorA[i] = 1;
        } else if (initColor == 4) {
            //makes circle some color btw green and red
            let gradRandom = getRandom(1000, 0);
            opCircleColorR[i] = 0 + (139/1000)*gradRandom;
            opCircleColorG[i] = 100 - (100/1000)*gradRandom;
            opCircleColorB[i] = 0;
            opCircleColorA[i] = 1;
        }
    }
}



function moveOpCircle() {
    for (let i = 0; i < opCircleX.length; i++) {
        opCircleX[i] += opCircleDX[i];
        opCircleY[i] += opCircleDY[i];
        if (opCircleX[i] < -10 || opCircleX[i] > canv4width + 10) {
            opCircleDX[i] *= -1;
        }
        if (opCircleY[i] < -10 || opCircleY[i] > canv4height + 10) {
            opCircleDY[i] *= -1;
        }
        
        if (opCircleColorR[i] == 0 && opCircleColorG[i] < 100) {
            opCircleColorG[i] += 100/1000;
            opCircleColorB[i] -= 139/1000;
        } else if (opCircleColorR[i] < 139) {
            opCircleColorR[i] += 139/1000;
            opCircleColorG[i] -= 100/1000;
        } else if (opCircleColorR[i] >= 139) {
            opCircleColorA[i] -= 0.01;
        }

        if (opCircleColorA[i] < 0) {
            opCircleX.splice(i, 1);
            opCircleY.splice(i, 1);
            opCircleDX.splice(i, 1);
            opCircleDY.splice(i, 1);
            opCircleColorR.splice(i, 1);
            opCircleColorG.splice(i, 1);
            opCircleColorB.splice(i, 1);
            opCircleColorA.splice(i, 1);
        }
    }

}

console.log("RGBA:" + opCircleColorR[1], opCircleColorG[1], opCircleColorB[1], opCircleColorA[1]);
console.log(opCircleX);
console.log(opCircleY);

function animate_o() {
    requestAnimationFrame(animate_o);
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
    for (let i = 0; i < opCircleColorR.length; i++) {
        let circ = new Circle(ctx4, opCircleX[i], opCircleY[i], 10, "rgba( " + opCircleColorR[i].toString() + ", " + opCircleColorG[i].toString() + ", " + opCircleColorB[i].toString() + ", " + opCircleColorA[i].toString() + ")", false);
    }
    moveOpCircle();

}

animate_o();