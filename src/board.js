import { COLS, PIXEL_SIZE, ROWS } from "./constants.js"

export function pixelId(row, col) {
  return `r${row}c${col}`
}

export function createPixel(x, y, id) {
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


export function drawBoard() {

  const board = document.getElementById('board')

  for(let row=0; row<COLS; row++) {
    for(let col=0; col<ROWS; col++) {
      const pixel = createPixel(row, col, pixelId(row, col))      
      board.appendChild(pixel)
    }
  }  
}
