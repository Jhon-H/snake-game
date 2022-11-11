import { pixelId } from './board.js';
import { BASE_CLASS_POINT_OF_POWER, COLS, DIRECTIONS, ROWS } from './constants.js'
import { state } from './state.js';

export function moveSnakeInDirections(keyCode) {
  switch (keyCode) {
    case 'ArrowDown':
    case 's':
      if (state.executeLastDirectionMove != DIRECTIONS.up.name) {
        state.lastDirectionMove =  DIRECTIONS.down.name
      }
      break;

    case 'ArrowUp':
    case 'w':
      if (state.executeLastDirectionMove != DIRECTIONS.down.name) {
        state.lastDirectionMove =  DIRECTIONS.up.name
      }
      break;

    case 'ArrowLeft':
    case 'a':
      if (state.executeLastDirectionMove != DIRECTIONS.right.name) {
        state.lastDirectionMove =  DIRECTIONS.left.name
      }
      break;

    case 'ArrowRight':
    case 'd':  
      if (state.executeLastDirectionMove != DIRECTIONS.left.name) {  
        state.lastDirectionMove =  DIRECTIONS.right.name
      }
      break;

    default:
      break
  }
}

export function generateRandomPointOfPower() {
  let randomRow = -1;
  let randomCol = -1;
  
  while (true) {
    randomRow = Math.floor(Math.random() * (ROWS - 1))
    randomCol = Math.floor(Math.random() * (COLS - 1))

    if (!state.positionSnake.includes([randomRow, randomCol])) {
      break
    }
  }

  return [randomRow, randomCol]
}


export function drawPointOfPower(row, col) {
  const randomPixel = document.getElementById(pixelId(row, col))

  randomPixel.className = BASE_CLASS_POINT_OF_POWER
}

export function gameOver() {
  const uniquePositions = new Set(state.positionSnake.map(pos => pixelId(...pos)))

  return uniquePositions.size !== state.positionSnake.length
}