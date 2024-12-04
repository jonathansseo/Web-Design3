// Get the canvas element from the HTML
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = 'images/background.png';

// Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = 'images/bug.png';

// Game objects
var bug = {
    x: 0,
    y: 0,
    size: 40, // Set bug size
    speed: 2000 // Initial speed in milliseconds
};
var score = 0;
var gameInterval;

// Handle mouse controls
canvas.addEventListener('click', function (event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Check if click is within the bug's bounding box
    if (x >= bug.x && x <= bug.x + bug.size && y >= bug.y && y <= bug.y + bug.size) {
        score++;
        document.getElementById('score').textContent = score;
        bug.speed = Math.max(200, bug.speed - 200); // Increase speed but not below 200ms
        startGame(); // Restart the game with the new speed
        reset();
    }
}, false);

// Reset the game
var reset = function () {
    bug.x = Math.random() * (canvas.width - bug.size);
    bug.y = Math.random() * (canvas.height - bug.size);
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height); // Ensure background fits the new canvas size
    }

    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y, bug.size, bug.size); // Draw bug with specified size
    }

    // Score
    ctx.fillStyle = 'rgb(250, 250, 250)';
    ctx.font = '24px Helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + score, 32, 32);
};

// The main game loop
var main = function () {
    render();
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

function startGame() {
    clearInterval(gameInterval); // Clear any existing interval
    gameInterval = setInterval(function () {
        reset(); // Update bug position at each interval
    }, bug.speed);
}

// Buttons for resetting
document.getElementById('resetSpeed').addEventListener('click', function () {
    bug.speed = 2000; // Reset speed to 2000ms
    startGame();
});

document.getElementById('resetScore').addEventListener('click', function () {
    score = 0;
    document.getElementById('score').textContent = score;
});

startGame(); // Start the game initially
