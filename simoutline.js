var sketchProc = function(processingInstance) {
    with (processingInstance) {
       size(1130, 520); 
       frameRate(60);
       // ProgramCodeGoesHere
       noStroke();
        var currentScene;
        var endingChoice = 0;

        //button object
        var Button = function(config) {
            this.x = config.x;
            this.y = config.y;
            this.width = config.width || 100;
            this.height = config.height || 60;
            this.label = config.label;
            this.onClick = config.onClick || function() {};
        };

        //what actually puts the button on the page
        Button.prototype.draw = function() {
            fill(0, 255, 187);
            rect(this.x, this.y, this.width, this.height);
            fill(0, 0, 0);
            textSize(20);
            text(this.label, (this.width/2) + this.x *17/18, (this.height/2) + this.y *40/39);
        };

        //returns boolean if cursor is inside the perimeter of button
        Button.prototype.isMouseInside = function() {
            return mouseX > this.x && mouseX < (this.x + this.width) && 
            mouseY > this.y && mouseY < (this.y + this.height);
        };

        //if isMouseInside is true, then button does function described in object when mouse is clicked
        Button.prototype.handleMouseClick = function() {
            if (this.isMouseInside()) {
                this.onClick();
            }
        };
        
        var startbutton = new Button ({
            x: 400, 
            y: 300, 
            label: "Start", 
            onClick: function() {
                drawScene3();
            }
        });

        var instructionsbutton = new Button ({
            x: 550,
            y: 300,
            label: "Instructions",
            onClick: function() {
                drawScene2();
            }
        });

        var instrstartbutton = new Button ({
            x: 500,
            y: 300,
            label: "Play Game",
            onClick: function() {
                drawScene3();
            }
        });

        var firstsituationyesbutton = new Button ({
            x: 400,
            y: 300,
            label: "Yes",
            onClick: function() {
                drawScene4();
                endingChoice += 1;
            }
        });

        var firstsituationnobutton = new Button ({
            x: 550,
            y: 300,
            label: "No",
            onClick: function() {
                drawScene4();
                endingChoice += 2;
            }
        });

        var secondsituationplastic = new Button ({
            x: 400,
            y: 300,
            label: "Plastic",
            onClick: function() {
                if (endingChoice === 1) {
                    outcomeScene1();
                } else if (endingChoice === 2) {
                    outcomeScene2();
                }
            }
        });

        var secondsituationreusable = new Button ({
            x: 550,
            y: 300,
            label: "Reusable",
            onClick: function() {
                if (endingChoice === 1) {
                    outcomeScene3();
                } else if (endingChoice === 2) {
                    outcomeScene4();
                }
            }
        });

        var restartbutton = new Button ({
            x: 500,
            y: 300,
            label: "Play Game Again",
            onClick: function() {
                drawScene1();
                endingChoice = 0;
                currentScene = 1;
            }
        });

        var drawScene1 = function() {
            currentScene = 1;
            background(235, 247, 255);
            fill(0, 85, 255);
            textSize(39);
            text("To clean, or not to clean?", 50, 100);
            text("A crappy game/sim", 50, 150);
            startbutton.draw();
            instructionsbutton.draw();
        };
        
        var drawScene2 = function() {
            currentScene = 2;
            background(173, 239, 255);
            fill(7, 14, 145);
            textSize(20);
            text("This simulation looks at how little actions can add up tremendously.", 50, 100);
            text("You will be asked to make choices for a single person, but whatever you decide to do will be scaled up to an entire town.", 50, 125);
            text("Make your decisions wisely!", 50, 150);
            instrstartbutton.draw();
        };

        var drawScene3 = function() {
            currentScene = 3;
            background(173, 239, 255);
            fill(7, 14, 145);
            textSize(39);
            text("There is some trash on the ground. Will you pick it up?", 50, 100);
            firstsituationyesbutton.draw();
            firstsituationnobutton.draw();
        };

        var carx = 10;
        var drawScene4 = function() {
            currentScene = 4;
            background(173, 239, 255);
            //road
            fill(145, 139, 130);
            rect(0, 185, 1130, 100);
            // draw the car body
            fill(255, 0, 115);
            rect(carx, 200, 100, 20);
            rect(carx + 15, 178, 70, 40);
            // draw the wheels
            fill(77, 66, 66);
            ellipse(carx + 25, 221, 24, 24);
            ellipse(carx + 75, 221, 24, 24);  
            carx += 6;

            if (carx >= 1130) {
                drawScene5();
                carx = 10;
            }
        
        };

        var drawScene5 = function() {
            currentScene = 5;
            background(173, 239, 255);
            fill(7, 14, 145);
            textSize(30);
            text("You're at the store and can buy either a plastic water bottle or a reusable one.", 50, 100);
            text("Which one will you purchase?", 50, 140);
            secondsituationplastic.draw();
            secondsituationreusable.draw();
        };

        var outcomeScene1 = function() {
            currentScene = 6;
            background(173, 239, 255);
            fill(7, 14, 145);
            textSize(30);
            text("The town grounds are clean, but the landfills are filled with plastic...", 50, 100);
            text("Who knows how long the plastic will stay there?", 50, 140);
            text("The End!", 50, 200);
            restartbutton.draw();
        };

        var outcomeScene2 = function() {
            currentScene = 7;
            background(173, 239, 255);
            fill(7, 14, 145);
            textSize(30);
            text("The entire town is filthy and the ground is filled with plastic garbage.", 50, 100);
            text("The End!", 50, 140);
            restartbutton.draw();
        };

        var outcomeScene3 = function() {
            currentScene = 8;
            background(173, 239, 255);
            fill(7, 14, 145);
            textSize(30);
            text("The town is looking quite nice!", 50, 100);
            text("There's not much plastic in the landfills, which is good for the environment!", 50, 140);
            text("The End!", 50, 200);
            restartbutton.draw();
        };

        var outcomeScene4 = function() {
            currentScene = 9;
            background(173, 239, 255);
            fill(7, 14, 145);
            textSize(30);
            text("There's a lot of trash everywhere, though most of it seems to be biodegradable...", 50, 100);
            text("The End!", 50, 140);
            restartbutton.draw();
        };

        mouseClicked = function() {
            if (currentScene === 1) {
                startbutton.handleMouseClick();
                instructionsbutton.handleMouseClick();
            } else if (currentScene === 2) {
                instrstartbutton.handleMouseClick();
            } else if (currentScene === 3) {
                firstsituationyesbutton.handleMouseClick();
                firstsituationnobutton.handleMouseClick();
            } else if (currentScene === 5) {
                secondsituationplastic.handleMouseClick();
                secondsituationreusable.handleMouseClick();
            } else if (currentScene === 6 || currentScene === 7 || currentScene === 8 || currentScene === 9) {
                restartbutton.handleMouseClick();
            }
        };

        draw = function() {
            if (currentScene === 4) {
                drawScene4();
            }
        };
            
        drawScene1();
        
    }};
// Get the canvas that Processing-js will use
var canvas = document.getElementById("mycanvas"); 
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc); 