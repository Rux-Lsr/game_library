const canvas = document.getElementById("snakeField");
const context = canvas.getContext("2d");
let box = 20;
let snake = [];
let score = 0;
snake[0] = {
  x: box * 10,
  y: box * 10,
};

let food = randomPosition();
let d;
document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
  }
}

function draw() {
  context.clearRect(0, 0, 400, 400);

  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = i == 0 ? "green" : "white";
    context.fillRect(snake[i].x, snake[i].y, box, box);
    context.strokeStyle = "red";
    context.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  context.fillStyle = "orange";
  context.fillRect(food.x, food.y, box, box);

  let snakex = snake[0].x;
  let snakey = snake[0].y;

  switch (d) {
    case "LEFT":
      snakex -= box;
      break;
    case "UP":
      snakey -= box;
      break;
    case "RIGHT":
      snakex += box;
      break;
    case "DOWN":
      snakey += box;
      break;
  }

  if (snakex == food.x && snakey == food.y) {
    score++;

    food = randomPosition();
  } else {
    snake.pop();
  }

  let newHead = { x: snakex, y: snakey };

  if (
    snakex < 0 ||
    snakey < 0 ||
    snakex > 19 * box ||
    snakey > 19 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }
  snake.unshift(newHead);

  context.fillStyle = "red";
  context.font = "30px Arial";
  context.fillText(score, 2 * box, 1.6 * box);
}

function randomPosition() {
  return {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
  };
}

function collision(head, arr) {
  for (let g = 0; g < arr.length; g++) {
    if (head.x == arr[g].x && head.y == arr[g].y) return true;
    return false;
  }
}

let game = setInterval(draw, 100);
