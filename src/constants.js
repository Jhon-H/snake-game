export const ROWS = 10;
export const COLS = ROWS;
export const PIXEL_SIZE = 30

export const INITIAL_POSITION_SNAKE = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
]

export const BASE_CLASS_SNAKE_PIXEL = 'pixel-snake'
export const BASE_CLASS_POINT_OF_POWER = 'point-power'

export const DIRECTIONS = {
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