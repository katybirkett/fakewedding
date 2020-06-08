//outfits and music.
let outfitStyle = "";
let musicStyle = "";
let bowlsOfPorridge = "";

//storing out fit and music data
$(".outfits").click(function(evt) {
  let data = event.target.id;
  sessionStorage.setItem('clothes', data);
  animatePress(data);
});

$(".music").click(function(evt) {
  let data = event.target.id;
  sessionStorage.setItem('music', data);
  animatePress(data);
});

//getting outfit and music data
musicStyle = sessionStorage.getItem('music');
outfitStyle = sessionStorage.getItem('clothes');
bowlsOfPorridge = sessionStorage.getItem('porridge');

//testing purposes
//console.log(outfitStyle);
//console.log(musicStyle);

//displaying results here.
if (outfitStyle != null) {
  $(".results-outfit").text("I can't wait. You chose us to wear " + outfitStyle + " style clothes!");
}

if (musicStyle != null) {
  if (musicStyle === "Lordi" || musicStyle === "Enya") {
    $(".results-music").text("Its going to be so much fun. You've chosen a cover band of " + musicStyle + " to play!");
  } else {
    $(".results-music").text("Its going to be so much fun. You've chosen " + musicStyle + " to be played at our wedding!");
  }
}

if (bowlsOfPorridge != 0) {
  if (bowlsOfPorridge > 1) {
    $(".results-food").text("Wow! We're going to eat " + bowlsOfPorridge + " bowls of porridge. So delicious. BEST. WEDDING. EVER.");
  } else {
    $(".results-food").text("Wow! We're going to eat a bowl of porridge. So delicious.");
  }
}

// game code

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let highScore = 0;

//starting the game
let started = false;
$(".start-btn").click(function() {
  if (started === false) {
    setTimeout(function() {
      nextSequence()
    }, 100);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    playSound("wrong");
    $("body").addClass("game-over");
    $(".game-story").text("Game Over, Press Start Button to Restart. High Score: " + highScore);
    started = false;
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  } else if (((currentLevel + 1) === gamePattern.length) && userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence()
    }, 1000);
  }

}

//deciding the next sequence for the game to pick as well as animating and adding sounds
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  if (level > highScore) {
    highScore = level;
    let porridgeData = highScore;
    sessionStorage.setItem('porridge', porridgeData);
  }
  $(".game-story").text("Level " + level + " High Score: " + highScore);
}

$(".game").click(function(evt) {
  let userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length - 1))
  //testing code
  //console.log(userClickedPattern);
});


//button sounds
function playSound(name) {
  let gameSound = new Audio("sounds/" + name + ".mp3");
  gameSound.play();
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}

let porridgeData = highScore;
sessionStorage.setItem('porridge', porridgeData);


//testing code
//nextSequence();
