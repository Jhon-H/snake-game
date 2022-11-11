import { pixelId } from "./board.js"
import { COLS, DIRECTIONS, ROWS } from "./constants.js"
import { state } from "./state.js"

export function snake() {

  for(const [row, col] of state.positionSnake) {
    const pixel = document.getElementById(pixelId(row, col))
    pixel.className = `pixel-snake__body`
  }

  const classCurrentDir = DIRECTIONS[state.executeLastDirectionMove].class

  const [headRow, headCol] = state.positionSnake[state.positionSnake.length  - 1]
  const head = document.getElementById(pixelId(headRow, headCol))
  head.className = `pixel-snake__head ${classCurrentDir}`
}

export function isEatingPointOfPower() {
  const snakeHeadPosition = state.positionSnake[state.positionSnake.length - 1]

  console.log(snakeHeadPosition, state.pointOfPowerPosition)
 
  for (let i = 0; i < 2; ++i) {
    if (snakeHeadPosition[i] != state.pointOfPowerPosition[i]) {
      return false
    }
  }

  return true
}

export function addPixelToSnake() {
  const snakeTail = state.positionSnake[0]
  const snakeTailPrev = state.positionSnake[1]

  const row = snakeTailPrev[0] - snakeTail[0]
  const col = snakeTailPrev[1] - snakeTail[1]
  
  state.positionSnake = [
    [
      snakeTail[0] - row, 
      snakeTail[1] - col
    ],
    ...state.positionSnake
  ]

  console.log(state.positionSnake)

  snake()
}

export function stepSnake() {
  const deletePixelPosition = state.positionSnake.shift()
  const pixel = document.getElementById(pixelId(...deletePixelPosition))
  pixel.className = ''

  snake()
}


export function moveSnake(x, y) {
  const [headRow, headCol]  = state.positionSnake[state.positionSnake.length - 1]

  state.positionSnake.push([
    (headRow + x + ROWS) % ROWS,
    (headCol + y + COLS) % COLS
  ])
}