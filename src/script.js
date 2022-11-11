import { DIRECTIONS } from "./constants.js"
import { drawBoard } from "./board.js";
import { drawPointOfPower, gameOver, generateRandomPointOfPower, moveSnakeInDirections } from "./game.js"
import { addPixelToSnake, isEatingPointOfPower, moveSnake, snake, stepSnake } from "./snake.js";
import { state } from './state.js';

function main() {
  setInterval(() => {
    if (state.pause) return

    if (gameOver()) {
      state.pause = true 
      document.getElementById('text').textContent =  `GAME OVER !!!, obtuviste: ${state.positionSnake.length} puntos`
      return;
    }

    moveSnake(...DIRECTIONS[state.lastDirectionMove].dir)
    state.executeLastDirectionMove = state.lastDirectionMove
    stepSnake()
    
    state.timePassed ++

    console.log(isEatingPointOfPower())
  
    if (isEatingPointOfPower()) {
      addPixelToSnake()
      state.timePassed = 0
      state.existPointOfPower = false
    }

    if (state.timePassed > 3 && !state.existPointOfPower) {
      state.timePassed = 0
      
      const point = generateRandomPointOfPower()
      state.pointOfPowerPosition = point
      drawPointOfPower(...point)
      state.existPointOfPower = true
    }
  }, 100)
}


/* Main */
document.getElementById('button-pause-test').addEventListener('click', () => {
  state.pause = !state.pause

  const btnPuase = document.getElementById('button-pause-test')
  btnPuase.textContent = state.pause ? 'Continue' : 'Pause'
})

document.addEventListener('keydown', (e) => {
  moveSnakeInDirections(
    e.key,
    state.executeLastDirectionMove
  ) 
})

drawBoard()

snake(
  state.positionSnake,
  state.executeLastDirectionMove
)

main()