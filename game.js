// alert("Booyah bitches");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).on("keydown", function(){
  if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  level += 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4); // creates a random from 0 to 2=3
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log("user - " + userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  setTimeout(function(){
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    $("#" + name).fadeOut(120);
    $("#" + name).fadeIn(120);
  }, 100);
}
function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");
  setTimeout(function(){
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      console.log("success");
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, Press any key to restart");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

}
