const gameContainer = document.getElementById("game-container");
const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-button");
let score = 0;
let fallingSpeed = 1;
let gameInterval;
const balls = [];
let consecutiveMisses = 0;
const maxConsecutiveMisses = 3; // Set the maximum consecutive misses allowed

// Create a ball and make it fall
function createBall() {
  const ball = document.createElement("div");
  ball.className = "ball";
  ball.style.left = Math.random() * (gameContainer.clientWidth - 20) + "px";
  gameContainer.appendChild(ball);
  balls.push(ball);

  const interval = setInterval(function() {
    const currentTop = parseInt(ball.style.top) || 0;
    ball.style.top = currentTop + fallingSpeed + "px";

    if (currentTop >= gameContainer.clientHeight - 20) {
      gameContainer.removeChild(ball);
      balls.splice(balls.indexOf(ball), 1);
      consecutiveMisses++;
      if (consecutiveMisses >= maxConsecutiveMisses) {
        gameOver();
      }
      clearInterval(interval);
    } else if (isColliding(ball, box)) {
      gameContainer.removeChild(ball);
      balls.splice(balls.indexOf(ball), 1);
      score++;
      consecutiveMisses = 0;
      if (score % 5 === 0) {
        fallingSpeed += 0.5;
      }
      scoreDisplay.innerText = score;
    }
  }, 20);
}

// Check for collision between the ball and the box
function isColliding(ball, box) {
  const ballRect = ball.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();
  return (
    ballRect.right > boxRect.left &&
    ballRect.left < boxRect.right &&
    ballRect.bottom > boxRect.top &&
    ballRect.top < boxRect.bottom
  );
}

// Handle game over
function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Your Score: " + score);
  const restart = confirm("Do you want to restart the game?");
  if (restart) {
    location.reload(); // Reload the page to restart the game
  }
}

// Move the box using arrow keys
document.addEventListener("keydown", function(event) {
  const boxLeft = parseInt(box.style.left) || 0;
  if (event.key === "ArrowLeft" && boxLeft > 0) {
    box.style.left = boxLeft - 10 + "px";
  } else if (event.key === "ArrowRight" && boxLeft < gameContainer.clientWidth - 50) {
    box.style.left = boxLeft + 10 + "px";
  }
});

// Restart the game when the restart button is clicked
restartButton.addEventListener("click", function() {
  location.reload(); // Reload the page to restart the game
});

// Start the game
gameInterval = setInterval(createBall, 2000);