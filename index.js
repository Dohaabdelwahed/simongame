let buttonColors = ["red" , "blue" , "green" , "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

// the first keypress to start the game
$(document).keypress(function(){
  if (!start) {
    $("#level-title").text("level " + level);
    newSequence();
    start = true;
  }
});

// whenever the user clicks any button
$('.btn').click(function (){
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
  });

// to check if the user got it wrong or right
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        newSequence();
      }, 1000);
    }
  }
    else{
      console.log("wrong");
        playSound('wrong');
      $('body').addClass("game-over");
      setTimeout(function(){
       $('body').removeClass("game-over");
     }, 200);
     $('#level-title').text('Game Over, Press Any Key To Restart');
     startOver();
    }
  }

// building a sequence and generating a random color for each loop
function newSequence(){

  userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);

    let random = Math.random();
    random = Math.floor(random*4);
    let randomChosenColor = buttonColors[random];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


// to Restart the game
function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}

// sounds Effects
function playSound(name){
let playAudio  = new Audio("sounds/" + name + ".mp3" )
  playAudio.play();
}

// animation effects
function animatePress(currentColor){
  $('.'+ currentColor).addClass("pressed");
  setTimeout(function(){
    $('.'+currentColor).removeClass("pressed");},100);
}
