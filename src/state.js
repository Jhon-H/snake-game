import { DIRECTIONS, INITIAL_POSITION_SNAKE } from "./constants.js";

export const state = {
  timePassed: 0,
  pause: false,
  existPointOfPower: false,
  pointOfPowerPosition: [-1, -1],
  lastDirectionMove: DIRECTIONS.right.name,
  executeLastDirectionMove: DIRECTIONS.right.name,
  positionSnake: INITIAL_POSITION_SNAKE,
}
