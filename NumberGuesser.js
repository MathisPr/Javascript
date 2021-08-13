
//set Varibables
let min = 1,
    max = 10,
    guessesLeft = 3
    //create a random winning number between min max
    winningNum = createRendomNum(min, max);

//UI variables
const   UIgame          = document.querySelector('#game'),
        UIminNum        = document.querySelector('.min-num'),
        UImaxNum        = document.querySelector('.max-num'),
        UIGuessBtn      = document.querySelector('#guess-btn'),
        UIGuessInput    = document.querySelector('#guess-input'),
        UImessage       = document.querySelector('.message');

//play again event listener
//the event GameOver adds a new class to the button to replay the game
//the class is added AFTER the page was loaded, so event-delegation is in order 
//- the listener needs to be placed on the parent (UIgame) and then search for the class name  
//use of mousedown to let the message show - if click event is used, the page would reload instantly without the message
    UIgame.addEventListener('mousedown', function (e) {
        //check if the button i.e. the right classname was clicked
        if(e.target.className === "play-again") {
            //reload the page
            window.location.reload();
        }
    })


//Assign UI Min and Max
UIminNum.textContent = min;
UImaxNum.textContent = max;

//Listen for guess
UIGuessBtn.addEventListener('click', function(){
    let guessNum = parseInt(UIGuessInput.value);

    //Validate Input
    if(isNaN(guessNum) || guessNum > max || guessNum < min) {
        console.log('Error');
        //use of back ticks ` , so the vars are recognised - set the color according to message
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }

    //check if input is the winning number
    else if (guessNum === winningNum) {
        //set won to true, set Message
        GameOver(true, `Correct number! You won the game`)
        
    } else {
        //wrong number

        //game over
        if (guessesLeft === 0) {
            //set won to false, set Message
            GameOver(false, `Game over. The correct number was ${winningNum}`)
        }

        else {

            //substract 1 from guessesLeft
            guessesLeft -= 1;

            //Message wrong number
            setMessage(`Wrong number. You have ${guessesLeft} trys left.`, "orange")
        }
    }
    
});


function GameOver(won, msg){
    //chance color according to won or lost game
    let color;
    won === true ? color = 'green' : color = 'red' 

    //Change border color
    UIGuessInput.style.borderColor = color;
    
    //Set Message
    setMessage(msg, color);
    
    //Disable input
    UIGuessInput.disabled = true;

    //Play again
    //Change Button to play again
    UIGuessBtn.value = "Play again";

    //append a new class to add a new eventhandler for the altered button
    UIGuessBtn.className += "play-again";

}

//Set Message, change color depending on message
function setMessage(msg, color) {
    UImessage.style.color = color;
    UImessage.textContent = msg;
}

//create a random number between min nand max
function createRendomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

