


const buttonColours = ["red", "blue", "green", "yellow"]

const blueAudio = new Audio('sounds/blue.mp3');
const greenAudio = new Audio('sounds/green.mp3');
const redAudio = new Audio('sounds/red.mp3');
const yellowAudio = new Audio('sounds/yellow.mp3');
const wrong = new Audio('sounds/wrong.mp3');


var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var restart = false;



$(document).keypress(function () {
    //game starts by pressing any Key and calls the function 'next sequence'
    if (!started) {
        nextSequence();
        started = true;
        //changing the title with jquery
        $('h1').text('level ' + level)
    };
})

$('.btn').click(function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    //this is where you are calling the functions previously constructed 
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    //check the game pattern of the current level against the user clicked pattern

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        console.log('wrong');
        wrong.play();
        setTimeout(function () {
            wrongAnswer();
        });
    }
}

function wrongAnswer() {
    $('body').addClass('game-over')
    setTimeout(function () {
        $('body').removeClass('game-over');
        $('h1').text('Game Over, Press Any Key to Restart')
    }, 200);
    startOver();
}

function startOver() {

            gamePattern = [];

            started = false;

            level = 0;

}


function nextSequence() {
    //refreshes user clicked pattern when called.
    userClickedPattern = [];
    //adds one to the level variable
    level++;
    //changes the text for the title so it continues to go up levels
    $('h1').text('level ' + level)
    //chooses a random number between 1 and 4 also rounds it to nearest whole number
    const randomNumber = Math.floor(Math.random() * 4);
    //chooses a random colour based on the random number
    const randomChosenColor = buttonColours[randomNumber];
    //pushes the colour into gamePattern array
    gamePattern.push(randomChosenColor);

    //flash animation of the button when it's called
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //plays the sound of the chosen colour
    playSound(randomChosenColor);





}

function playSound(name) {

    //takes the audio from the files and allows it to play.

    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

//function to add the css to the currentColour when pressed for 100 miliseconds for cool effect 

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}




