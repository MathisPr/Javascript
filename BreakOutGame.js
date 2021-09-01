
// Variables
var containerUI   = document.querySelector('.container');
let ballUI        = document.querySelector('#ball');
let paddleUI      = document.querySelector('.paddle');
const startBtnUI    = document.querySelector('.startBtn');
const gameoverUI =  document.querySelector('.gameover')

let gameover    = true;
let gameInPlay  = false;

const livesStart    = 1;

let score           = 0;
let lives           = livesStart;
let numberOfBricks  = 2;
let bounces         = 0;

//var for animationframe
let animationRepeat;
//ball direction array
let ballDir = [5,5,5];
//get container dimensions
var containerDim = containerUI.getBoundingClientRect();


//Event Listener for click Button Start Game
startBtnUI.addEventListener('click', startGame);

//Event Listener for keys pressed down
document.addEventListener('keydown', function(e){

    //get key-code
    let key = e.keyCode;

    //prevent the effekt of the typed key
    e.preventDefault();

    //check for left arrow key
    if(key === 37) {
        //change the paddle
        paddleUI.left = true;
    } 
    //check for right arrow key
    else if(key === 39) {
        //change the paddle
        paddleUI.right = true;
    }
    //check for up arrow key and if the game is running
    else if (key === 38 && !gameInPlay) {
        gameInPlay = true;

        //subtract one from bounces because the release of the ball is counted as collision
        bounces--;
    }
    
});


//Event Listener for keys pressed up
document.addEventListener('keyup', function(e) {

    //get key-code
    let key = e.keyCode;

    //prevent the effekt of the typed key
    e.preventDefault();

    //stop pressing key left
    if(key === 37) {
        //stop the paddle movement to the left
        paddleUI.left = false;
    } 
    ////stop pressing key right
    else if(key === 39) {
        //stop the paddle movement to the right
        paddleUI.right = false;
    }

});


//start the Game
function startGame() {
    
    //check if the game is already running
    if(gameover) {

        //set gameover to false
        gameover = false;

        //set gameInPlay to false
        gameInPlay = false;

        //hide the gameover Text
        gameoverUI.style.display = "None";

        //show the ball
        ballUI.style.display = "block";

        //call animation
        animationRepeat = requestAnimationFrame(updateAnim);

        //set the lives
        lives = livesStart;
        //update the lives UI
        lifeupdater();

        //set the bounces
        bounces = -1;
        //update the bounces UI
        updateBounces ()

        //set the score
        score = 0;

        //update the score UI
        document.querySelector('.score').innerText = 0;

        //setup the Bricks according to variable number
        setupBricks(numberOfBricks);
    };
};

function setupBricks(number) {

    //set up object
    //startingposition of the Bricks
    let row = { x: ((containerDim.width % 100)/2), 
                y:50};

    //create divs according to number
    for(let x=0; x < number; x++) {

        //check if number of bricks is wider than container width, open a second row
        if(row.x > (containerDim.width -100)) {
            //move the new row down
            row.y += 70;
            //reset the value of x
            row.x = ((containerDim.width % 100)/2);
        }

        //create BrickUI Element
        brickMaker(row);

        //increase the value of x
        row.x += 100;
    }

};


function brickMaker (row) {
     
    //create the UI element
    let div = document.createElement('div');

    //set attributes for the element
    div.setAttribute('class','brick');

    //set backgroundcolor of the element, random color via function
    div.style.backgroundColor = randomColorBricks();

    //
    div.style.left = row.x + 'px';

    //
    div.style.top = row.y + 'px';

    //append the element to the containerUI div
    containerUI.appendChild(div);

    //give random points to the bricks
    let pointDiv = Math.ceil(Math.random()*10)+2

    //add values as attributes via dataset
    div.dataset.points = pointDiv;
    
    //show the value of the brick
    div.innerHTML = pointDiv;
};

//create random colors for the bricks 
function randomColorBricks() {
    function randomColor() {
        //create one random color in hexadecimal 
        let hexValue = Math.floor(Math.random()*256).toString(16);

        //make sure, that there are two characters returned by adding a 0 if there is only one character generated
        let response = ('0'+String(hexValue)).substr(-2);

        return response;
    };

    //return the random color code three times for red, blue and green to create a RBG 
    return '#' + randomColor() + randomColor() + randomColor();
    
};

function updateAnim () {
    //check if game is still not over
    if(gameover === false){

        //get the current position of the PaddleUI
        let curPaddlePos = paddleUI.offsetLeft;
        
        //check if element exists and  is not off the screen
        if(paddleUI.left && curPaddlePos > 0) {
            //change position value
            curPaddlePos -= 5; 
        }
        //check if element exists and  is not off the screen
        else if (paddleUI.right && curPaddlePos < (containerDim.width - paddleUI.offsetWidth)) {
            //change position value
            curPaddlePos += 5;
        }

        //when Game is not playing
        if(gameInPlay === false) {
            //set the ball to wait on the paddle
            ballWaitingOnPaddle();
        } else {
            //run ball move function
            ballMove();
        }

        //change the position in pixel
        paddleUI.style.left = curPaddlePos + 'px';

        //call the function again
        animationRepeat = requestAnimationFrame(updateAnim);
    };

};

function ballWaitingOnPaddle() {
    //set the ball to the position of the paddle
    ballUI.style.top    = (paddleUI.offsetTop - 22) + 'px';
    ballUI.style.left   = (paddleUI.offsetLeft + 70) + 'px';
};

function ballMove() {
    //get the ball position
    let x = ballUI.offsetLeft;
    let y = ballUI.offsetTop;

    //if the ball would leave the area, let it change direction
    if(x > (containerDim.width-20) || x < 0) {
        ballDir[0] *= -1;
    }
    if(y > (containerDim.height-20) || y < 0) {
        //check if ball is hitting the ground
        if(y > (containerDim.height-20)) {
            ballOverEdge();
            return;
        }
        ballDir[1] *= -1;
    }

    //check for collsion of ball with paddle
    if(isCollision(ballUI,paddleUI)) {
        
        //get the position where the ball hits the paddle
        let nDirec = ((x - paddleUI.offsetLeft) - (paddleUI.offsetWidth / 2)) / 10;
        
        //set ball direction
        ballDir[0] = nDirec;
        ballDir[1] *= -1;

        //count the number of bounces on the paddle
        updateBounces();
    }

    //check for collision with bricks
    
    //place all the elements with the class bricks into an array
    let tempBricks = document.querySelectorAll('.brick');

    //check if there are no more bricks in the array by checking it's length
    if(tempBricks.length == 0) {
        //stop the ball
        stopBall();

        setupBricks(numberOfBricks);
        //create new bricks

    }

    //loop through the array and check for collision with ball
    for(let targetBrick of tempBricks) {
        //check for collision with ball
        if(isCollision(targetBrick, ball)) {
            ballDir[1] *= -1;

            //remove the collided brick - get one level up and remove the element
            targetBrick.parentNode.removeChild(targetBrick);
            
            //update the score with the points of the brick
            updateScore(targetBrick.dataset.points);
        }

    }


    //add the Speed to the ball
    x += ballDir[0]; 
    y += ballDir[1];

    //set the ball position
    ballUI.style.left   = x + 'px';
    ballUI.style.top    = y + 'px';

};

//check for collision of object a with b
function isCollision (a,b) {
    //get corner positions of both elements
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    //check if the corones of the two elements collide
    return(!(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right));

};

//update the life UI
function lifeupdater () {
    //set lives UI Element to var lives
    document.querySelector(".lives").innerText = lives;
};

//update score
function updateScore(num) {
    //increase the score by the points
    score += parseInt(num);
    
    //update UI score
    document.querySelector('.score').innerText = score;
};

//update bounces
function updateBounces () {
    bounces++;

    //update UI bounces
    document.querySelector('.bounces').innerText = bounces;

}

//stop the Ball
function stopBall () {
    gameInPlay = false;

    //set ball direction
    ballDir[0,-5];

    //set the ball on the paddle
    ballWaitingOnPaddle();

    //cancel animation frame, stop animation repeat
    window.cancelAnimationFrame(animationRepeat);

};

//if the ball oves over the edge
function ballOverEdge() {
    
    //reduce lives
    --lives;

    //update live
    lifeupdater();

    //stop the ball
    stopBall();    

    //check if lives are 0
    if(lives < 1) {
        //end the game
        endGame();
        
        //set the lives to 0
        lives = 0;
    }

}


function endGame() {
        //set gameover to true
        gameover = true;

        //set gameInPlay to false
        gameInPlay = false;

        //show the gameover Text
        gameoverUI.style.display = "block";

        //add game over Text
        gameoverUI.innerHTML = "GAME OVER <br> Your Score: " + score;

        //hide the ball
        ballUI.style.display = "none";

        //get all bricks
        let tempBricks = document.querySelectorAll('.brick');
    
        //loop through the array and remove all bricks
        for(let targetBrick of tempBricks) {
               targetBrick.parentNode.removeChild(targetBrick);
        }

}

