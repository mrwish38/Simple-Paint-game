// Get canvas element and context
var canvas = document.getElementById("paintCanvas");
var context = canvas.getContext("2d");

// Set initial variables
var isPainting = false;
var lastX = 0;
var lastY = 0;
var radius = 5; // Initial radius of the circle

// Function to draw a circle
function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = getRandomColor();
  context.fill();
  context.closePath();
}

// Function to handle mouse down event
function handleMouseDown(event) {
  isPainting = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
}

// Function to handle mouse move event
function handleMouseMove(event) {
  if (isPainting) {
    var currentX = event.offsetX;
    var currentY = event.offsetY;
    var distance = Math.sqrt(
      Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
    );
    radius = Math.max(5, Math.min(50, distance / 2)); // Limiting the radius between 5 and 50
    drawCircle(currentX, currentY, radius);
    lastX = currentX;
    lastY = currentY;
  }
}

// Function to handle mouse up event
function handleMouseUp() {
  isPainting = false;
}

// Function to reset the canvas
function resetCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to get a random color
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to handle canvas click event
function handleCanvasClick(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  var imageData = context.getImageData(x, y, 1, 1);
  var pixel = imageData.data;
  var hitText = document.getElementById("hitText");
  if (pixel[3] > 0) {
    hitText.innerText = "Hit";
  } else {
    hitText.innerText = "Miss";
  }
  hitText.style.left = x + 10 + "px";
  hitText.style.top = y + 10 + "px";
  hitText.style.visibility = "visible";
}

// Function to handle canvas double click event
function handleCanvasDoubleClick(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  var imageData = context.getImageData(x, y, 1, 1);
  var pixel = imageData.data;
  if (pixel[3] > 0) {
    context.clearRect(x - radius, y - radius, 2 * radius, 2 * radius);
  }
}

// Event listeners
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("dblclick", handleCanvasDoubleClick);
document.getElementById("resetBtn").addEventListener("click", resetCanvas);
