const ROWS = 10;
const COLS = ROWS;
const PIXEL_SIZE = 30

const INITIAL_POSITION_SNAKE = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
]

const BASE_CLASS_SNAKE_PIXEL = 'pixel-snake'
const BASE_CLASS_POINT_OF_POWER = 'point-power'

const directions = {
  down: {
    name: 'down',
    dir: [1, 0], 
    class: BASE_CLASS_SNAKE_PIXEL + '--down'
  },
  up: {  
    name: 'up',
    dir: [-1, 0],
    class: BASE_CLASS_SNAKE_PIXEL + '--up'
  },
  left: {  
    name: 'left',
    dir: [0, -1],
    class: BASE_CLASS_SNAKE_PIXEL + '--left'
  },
  right: {  
    name: 'right',
    dir: [0, 1],
    class: BASE_CLASS_SNAKE_PIXEL + '--right'
  }
}

function createPixel(x, y, id) {
  const pixel = document.createElement('div')
  pixel.id = id
  pixel.style.border = '.5px solid #000'
  pixel.style.position = 'absolute'
  pixel.style.left = `${y * PIXEL_SIZE}px`
  pixel.style.top = `${x * PIXEL_SIZE}px`
  pixel.style.width = `${PIXEL_SIZE}px`;
  pixel.style.height = `${PIXEL_SIZE}px`;

  return pixel
}

function pixelId(row, col) {
  return `r${row}c${col}`
}

function drawBoard() {

  const board = document.getElementById('board')

  for(let row=0; row<COLS; row++) {
    for(let col=0; col<ROWS; col++) {
      const pixel = createPixel(row, col, pixelId(row, col))      
      board.appendChild(pixel)
    }
  }  
}

const positionSnake = INITIAL_POSITION_SNAKE

function snake() {
  
  for(const [row, col] of positionSnake) {
    const pixel = document.getElementById(pixelId(row, col))
    pixel.className = `pixel-snake__body`
  }

  const classCurrentDir = directions[executeLastDirectionMove].class

  const [headRow, headCol] = positionSnake[positionSnake.length  - 1]
  const head = document.getElementById(pixelId(headRow, headCol))
  head.className = `pixel-snake__head ${classCurrentDir}`
}

function isEatingPointOfPower() {
  const snakeHeadPosition = positionSnake[positionSnake.length - 1]
 
  for (let i = 0; i < 2; ++i) {
    if (snakeHeadPosition[i] != pointOfPowerPosition[i]) {
      return false
    }
  }

  return true
}

function addPixelToSnake() {
  const snakeTail = positionSnake[0]
  const snakeTailPrev = positionSnake[1]

  const row = snakeTailPrev[0] - snakeTail[0]
  const col = snakeTailPrev[1] - snakeTail[1]
  
  positionSnake.unshift([
    snakeTail[0] - row, 
    snakeTail[1] - col
  ])

  snake()
}

function stepSnake() {
  const deletePixelPosition = positionSnake.shift()
  const pixel = document.getElementById(pixelId(...deletePixelPosition))
  pixel.className = ''

  snake()
}

function gameOver() {
  const uniquePositions = new Set(positionSnake.map(pos => pixelId(...pos)))
  console.log(uniquePositions, positionSnake, uniquePositions.size, positionSnake.length)

  return uniquePositions.size !== positionSnake.length
}

function moveSnake(x = 0, y = 0) {
  const [headRow, headCol]  = positionSnake[positionSnake.length - 1]

  positionSnake.push([
    (headRow + x + ROWS) % ROWS,
    (headCol + y + COLS) % COLS
  ])
}

let lastDirectionMove = directions.right.name
let executeLastDirectionMove = lastDirectionMove

function moveSnakeInDirections(keyCode) {
  switch (keyCode) {
    case 'ArrowDown':
    case 's':
      if (executeLastDirectionMove != directions.up.name) {
        lastDirectionMove = directions.down.name
      }
      break;

    case 'ArrowUp':
    case 'w':
      if (executeLastDirectionMove != directions.down.name) {
        lastDirectionMove = directions.up.name
      }
      break;

    case 'ArrowLeft':
    case 'a':
      if (executeLastDirectionMove != directions.right.name) {
        lastDirectionMove = directions.left.name
      }
      break;

    case 'ArrowRight':
    case 'd':  
      if (executeLastDirectionMove != directions.left.name) {  
        lastDirectionMove = directions.right.name
      }
      break;

    default:
      break;
  }
}

function generateRandomPointOfPower() {
  let randomRow = -1;
  let randomCol = -1;
  
  while (true) {
    randomRow = Math.floor(Math.random() * (ROWS - 1))
    randomCol = Math.floor(Math.random() * (COLS - 1))

    if (!positionSnake.includes([randomRow, randomCol])) {
      break
    }
  }

  pointOfPowerPosition = [randomRow, randomCol]

  const randomPixel = document.getElementById(pixelId(randomRow, randomCol))
  randomPixel.className = BASE_CLASS_POINT_OF_POWER
}

let timePassed = 0
let existPointOfPower = false
let pointOfPowerPosition = [-1, -1]

let pause = false

setInterval(() => {
  if (pause) return

  if (gameOver()) {
    pause = true;
    document.getElementById('text').textContent =  `GAME OVER !!!, obtuviste: ${positionSnake.length} puntos`
    return;
  }

  moveSnake(...directions[lastDirectionMove].dir)
  executeLastDirectionMove = lastDirectionMove
  stepSnake()
  
  timePassed++

  if (isEatingPointOfPower()) {
    addPixelToSnake()
    timePassed = 0
    existPointOfPower = false
  }

  if (timePassed > 3 && !existPointOfPower) {
    timePassed = 0

    generateRandomPointOfPower()
    existPointOfPower = true
  }
}, 500)

document.getElementById('button-pause-test').addEventListener('click', () => {
  pause = !pause

  document.getElementById('button-pause-test').textContent = pause ? 'Continue' : 'Pause'
})

document.addEventListener('keydown', (e) => {
  moveSnakeInDirections(e.key)
})

drawBoard()
snake()