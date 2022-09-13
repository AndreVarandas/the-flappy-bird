import { init } from 'kontra'

const { canvas, context } = init()

const GAME_WINDOW = {
  WIDTH: canvas.width,
  HEIGHT: canvas.height,
}

export { GAME_WINDOW, canvas, context }
