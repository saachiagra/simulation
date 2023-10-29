var canvas2 = document.getElementById("standardize");
var ctx2 = canvas2.getContext("2d");

let xCoorNorm = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let yCoorNorm = [8, 47, 22, 27, 33, 5, 49, 58, 42, 73];
let xMean = 0, yMean = 0, mSlope = 0, mNumerator = 0, mDenominator = 0, bIntercept, rSquared = 0;
let xCoorCanv = [];
let yCoorCanv = [];

let xCoorNumIgnore = [];
let yCoorNumIgnore = [];

function findHidden(num) {
    for (let i = 0; i < xCoorNumIgnore.length; i++) {
        if (num == xCoorNumIgnore[i]) {
            return true;
        }
    }
    return false;
}

function linRegression() {
    xMean = yMean = mSlope = mNumerator = mDenominator = bIntercept = 0;
    for (let i = 0; i < xCoorNorm.length; i++) {
        if (findHidden(xCoorNorm[i])) {
            xMean += 0;
            yMean += 0;
        } else {
            xMean += xCoorNorm[i] / (xCoorNorm.length - xCoorNumIgnore.length);
            yMean += yCoorNorm[i] / (yCoorNorm.length - yCoorNumIgnore.length);
        }
    }

    for (let i = 0; i < xCoorNorm.length; i++) {
        if (findHidden(xCoorNorm[i])) {
            mNumerator += 0;
            mDenominator += 0;
        } else {
            mNumerator += (xCoorNorm[i] - xMean)*(yCoorNorm[i] - yMean);
            mDenominator += Math.pow((xCoorNorm[i] - xMean), 2);
        }
    }

    mSlope = Math.round((mNumerator/mDenominator)*100)/100;
    bIntercept = Math.round((yMean - (xMean*mSlope))*100)/100;

    let RSS = TSS = 0;
    for (let i = 0; i < xCoorNorm.length; i++) {
        if (findHidden(xCoorNorm[i])) {
            RSS += 0;
        } else {
            RSS += Math.pow((yCoorNorm[i] - (mSlope*xCoorNorm[i] + bIntercept)), 2);
            TSS += Math.pow(yCoorNorm[i] - yMean, 2);
        }
    }
    rSquared = 1 - (RSS/TSS);
}

function resetDataPoints() {
    for (let i = 0; i < xCoorNumIgnore.length; i++) {
        xCoorNumIgnore = [];
        yCoorNumIgnore = [];
    }

    for (let i = 0; i < 10; i++) {
        dataPointColorArray[i] = "red";
        dataPointHide[i] = false;
        dataPointRadArray[i] = 7;
    }
}

// console.log("slope: " + mSlope.toString() + "  b value: " + bIntercept.toString());

// CONVERTS TO CANVAS COORDINATES
function ccc(num, xOrY) {
    if (xOrY == "x") {
        return num*2.8 + 10;
    } else if (xOrY == "y") {
        return (Math.abs(100 - num)*2.8) + 10;
    }
}

// console.log(dataPointArray);

for (let i = 0; i < xCoorNorm.length; i++) {
    let num = xCoorCanv.length;
    xCoorCanv[num] = ccc(xCoorNorm[i], "x");
    yCoorCanv[num] = ccc(yCoorNorm[i], "y");
}

let dataPointRadArray = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
let dataPointColorArray = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];
let dataPointHide = [false, false, false, false, false, false, false, false, false, false];

console.log(xCoorCanv);
function animate_s() {
    requestAnimationFrame(animate_s);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    let line1 = new Line(ctx2, 3, 290, 290, 290, 2);
    let line2 = new Line(ctx2, 10, 10, 10, 297, 2);

    var mouseCoordsCircle2 = new CanvasMouseCoords(canvas2);
    // console.log(mouseCoordsCircle2);
    for (let i = 0; i < xCoorCanv.length; i++) {
        if (insideCircle(mouseCoordsCircle2, xCoorCanv[i], yCoorCanv[i], dataPointRadArray[i], 0) && !dataPointHide[i]) {
            dataPointRadArray[i] = 10;
            dataPointColorArray[i] = "darkred";
            // document.getElementById("testing").innerHTML = i.toString() + "yes";
            if (isClick) {
                dataPointHide[i] = true;
                dataPointColorArray[i] = "white";
                xCoorNumIgnore[xCoorNumIgnore.length] = xCoorNorm[i];
                yCoorNumIgnore[yCoorNumIgnore.length] = yCoorNorm[i];
            }
        } else if (!dataPointHide[i]) {
            dataPointRadArray[i] = 7;
            dataPointColorArray[i] = "red";
        } else if (dataPointHide[i]) {
            dataPointColorArray[i] = "white";
        }
    }
    
    for (let i = 0; i < xCoorCanv.length; i++) {
        new Circle(ctx2, xCoorCanv[i], yCoorCanv[i], dataPointRadArray[i], dataPointColorArray[i], false);
    }
    let trendLine = new Line(ctx2, ccc(0, "x"), ccc(bIntercept, "y"), ccc(100, "x"), ccc(mSlope*100 + bIntercept, "y"), 5, "gray", 0.7);

    linRegression()
    document.getElementById("equation").innerHTML = "Equation: y = " + mSlope.toString() + "x + " + bIntercept.toString() + "<br>R<sup>2</sup> Value: " + rSquared;
}

animate_s();