var hole = document.getElementById("hole");
var game = document.getElementById("game");
var result = document.getElementById("result");
var text = document.getElementById("text");
var bird = document.getElementById("bird");  // Ensure bird is referenced
var block = document.getElementById("block");  // Ensure block is referenced

var score = 0;
var jumping = 0;

hole.addEventListener("animationiteration", function () {
    RanHole();
    score++;  // Increase score when the bird successfully passes an obstacle
    updateScoreDisplay();
});

function RanHole() {
    var random = -((Math.random() * 350) + 150);
    hole.style.top = random + "px";
}

// Function to update the score display
function updateScoreDisplay() {
    text.innerText = `Score: ${score}`;
}

var fall = setInterval(function () {
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    if (jumping == 0) {
        bird.style.top = (birdTop + 3) + "px";
    }

    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var hTop = 500 + holeTop;

    // Collision detection
    if (birdTop > 450 || ((blockLeft < 50 && blockLeft > -50) && (birdTop < hTop || birdTop > hTop + 100))) {
        result.style.display = "block";
        text.innerText = `Your final score is: ${score}`;
        game.style.display = "none";
        clearInterval(fall);  // Stop the game loop when the bird crashes
    }
}, 10);

window.addEventListener("keydown", hop);

function hop() {
    jumping = 1;
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));

    if (birdTop > 6) {
        bird.style.top = (birdTop - 60) + "px";
    }

    setTimeout(function () {
        jumping = 0;
    }, 300);
}

// Function to restart the game
function restartGame() {
    score = 0; // Reset score
    updateScoreDisplay();
    bird.style.top = "200px"; // Reset bird position
    result.style.display = "none";
    game.style.display = "block";
    fall = setInterval(function () {
        var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
        if (jumping == 0) {
            bird.style.top = (birdTop + 3) + "px";
        }

        var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        var hTop = 500 + holeTop;

        if (birdTop > 450 || ((blockLeft < 50 && blockLeft > -50) && (birdTop < hTop || birdTop > hTop + 100))) {
            result.style.display = "block";
            text.innerText = `Your final score is: ${score}`;
            game.style.display = "none";
            clearInterval(fall);
        }
    }, 10);
}