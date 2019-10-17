import {
  initPointer,
  load,
  setImagePath,
  on,
  imageAssets,
  Sprite,
  GameLoop,
  initKeys
} from 'kontra'

import { Base } from './scenes/base'
import { Player } from './entities/player'
import { Pipe } from './scenes/pipe'
import { GAME_WINDOW, context } from './utils/window'
import { Background } from './scenes/background'

context.imageSmoothingEnabled = false

const initializeGame = function initializeGame () {
  // https://straker.github.io/kontra/api/keyboard
  initKeys()
  initPointer()

  /**
   * Create the scrolling base
   *
   * @type {Base}
   */
  const base = new Base(imageAssets)
  const { baseSprite, baseSpriteExtension } = base.createBaseSprites()

  const pipe = new Pipe(imageAssets)
  const [firstSet, secondSet] = pipe.pipeSets

  const pipeSprites = [
    ...Object.keys(firstSet).map(key => firstSet[key]),
    ...Object.keys(secondSet).map(key => secondSet[key])
  ]

  const player = new Player([baseSprite, baseSpriteExtension, ...pipeSprites])
  const playerSprite = player.playerSprite

  const background = new Background(imageAssets)
  const backgroundSprite = background.backgroundSprite

  const loop = GameLoop({
    // create the main game loop
    update: function () {
      // update the game state
      playerSprite.update()
      Object.keys(firstSet).map(key => firstSet[key].update())
      Object.keys(secondSet).map(key => secondSet[key].update())
      baseSprite.update()
      baseSpriteExtension.update()
    },
    render: function () {
      // render the game state
      backgroundSprite.render()
      playerSprite.render()
      // render first set (top and bottom) of pipes
      Object.keys(firstSet).map(key => firstSet[key].render())
      // render second set (top and bottom) of pipes
      Object.keys(secondSet).map(key => secondSet[key].render())
      baseSprite.render()
      baseSpriteExtension.render()
    }
  })

  loop.start() // start the game

  const handleGameOver = function handleGameOver () {
    loop.stop()
  }
  on('game_over', handleGameOver)
}

setImagePath('assets/sprites')
load('base.png', 'yellowbird.png', 'greenpipe.png', ...Background.getImageSet())
  .then(initializeGame)
