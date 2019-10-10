import { Sprite } from 'kontra'
import { GAME_WINDOW } from '../utils/window'

class Pipe {
  constructor (imageAssets) {
    this.imageAssets = imageAssets
    this.pipeSets = []
    // Create the pipe sets right away:
    this.createPipes()
  }

  /**
   * Just a bunch of useful properties that are used multiple times inside this class.
   *
   * @returns {{pipeWidth: number, pipeGap: number, pipeHeight: number, baseHeight: number, minPipSize: number}}
   */
  static get properties () {
    return {
      pipeGap: 150,
      pipeWidth: 73,
      pipeHeight: 320,
      minPipSize: 70,
      baseHeight: 112
    }
  }

  /**
   * We need to know what's the minimum and maximum possible Y for the pipe assets,
   * so they will not run out of the screen, or look like they are flying.
   */
  static get getMinMaxPipeHeight () {
    return {
      maxY: GAME_WINDOW.HEIGHT - Pipe.properties.pipeHeight - Pipe.properties.baseHeight,
      minY: GAME_WINDOW.HEIGHT - Pipe.properties.baseHeight - Pipe.properties.minPipSize
    }
  }

  /**
   * Creates and pushes to the pipeSets array two new sets of pipes.
   * We need this, because we want to spawn two sets of top and bottom pipes,
   * so the screen does not seem to be that empty (and adds a little bit of difficulty)
   */
  createPipes () {
    this.pipeSets.push(this.createPipeSet(0))
    this.pipeSets.push(this.createPipeSet(1))
  }

  /**
   * Creates a new pipe set.
   * A pipe set is as object that contains two pipe sprites. One for the top and another
   * one for the bottom.
   *
   * @param index - the index / identifier for the new set.
   *
   * @returns {{bottomPipeSprite: *, topPipeSprite: *}} - Returns two
   * slightly modified Sprite objects.
   */
  createPipeSet (index) {
    const topPipe = this.getConfigForPosition('top', index)
    const bottomPipe = this.getConfigForPosition('bottom', index)
    // bottomPipe.y has to be generated after topPipe.y is known and available
    bottomPipe.y = this.getBottomPipeHeight(topPipe.y)

    /**
     * If there was a previous set, we want to send this one further,
     * so it will not be rendered over the previous one (with the same x).
     */
    const previousPipeSet = this.pipeSets[index - 1]
    if (previousPipeSet) {
      bottomPipe.x += (GAME_WINDOW.WIDTH / 2) + (Pipe.properties.pipeWidth / 2)
      topPipe.x += (GAME_WINDOW.WIDTH / 2) + (Pipe.properties.pipeWidth / 2)
    }

    const topPipeSprite = Sprite(topPipe)
    topPipeSprite.update = this.onPipeSpriteUpdate.bind(this, topPipeSprite)

    const bottomPipeSprite = Sprite(bottomPipe)
    bottomPipeSprite.update = this.onPipeSpriteUpdate.bind(this, bottomPipeSprite)

    return {
      topPipeSprite, bottomPipeSprite
    }
  }

  /**
   * Generates a default configuration to be used on each pipe sprite.
   *
   * @param position - Specifies where you want to render this pipe: Top or Bottom
   * @param index - The set index, so pipe sprites can later be grouped and referenced by index.
   *
   * @returns {{image: *, pipeIndex: *, dx: number, rotation: *, x: *, width: *, name: *, y: number, height: *}} .
   * basically returns a Sprite object with two new properties attached to it: name and pipeIndex.
   */
  getConfigForPosition (position, index) {
    let positionY
    let positionX
    let rotation

    const { pipeHeight, pipeWidth, minPipSize } = Pipe.properties

    if (position === 'top') {
      // As rotation is applied to the top element, and its axis is set on (0, 0)
      positionX = GAME_WINDOW.WIDTH + pipeWidth
      positionY = this.generateRandomNumber(pipeHeight, minPipSize)
      rotation = Math.PI
    } else {
      positionX = GAME_WINDOW.WIDTH
      rotation = 0
    }

    return {
      y: positionY || 0,
      x: positionX,
      width: pipeWidth,
      height: pipeHeight,
      rotation: rotation,
      dx: -3,
      image: this.imageAssets.greenpipe,
      name: position, // position is reserved, using name instead
      pipeIndex: index
    }
  }

  /**
   * Calculates an height for the bottom pipe, based on its top pipe set member.
   *
   * @param topPipeY {number} - The current Y of the top pipe.
   *
   * @returns {number} - Ideal y for the bottom pipe.
   */
  getBottomPipeHeight (topPipeY) {
    const { minY, maxY } = Pipe.getMinMaxPipeHeight
    const calculatedBottomPipeHeight = topPipeY + Pipe.properties.pipeGap
    if (calculatedBottomPipeHeight > minY) {
      return minY
    }

    if (calculatedBottomPipeHeight < maxY) {
      return maxY
    }

    return calculatedBottomPipeHeight
  }

  /**
   * Generates a random number between a min and max positive numbers.
   *
   * @param max {number} - The absolute maximum value
   * @param min {number} - The absolute minimum value
   *
   * @returns {number} - The randomly generated number between min and max.
   */
  generateRandomNumber (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Handles sprite update.
   * The topPipe is given randomly a new Y position, and is sent to the end of the
   * window, so we can reuse it, giving an illusion of movement (sprite.x)
   *
   * The bottom pipe must be aware of its set top pipe. Its height is calculated
   * based on its top pipe y position.
   *
   * @param sprite {object} - the sprite to update / transform.
   */
  onPipeSpriteUpdate (sprite) {
    const { pipeHeight, pipeWidth, minPipSize } = Pipe.properties

    sprite.advance()

    if (sprite.x < 0 && sprite.name === 'top') {
      sprite.y = this.generateRandomNumber(pipeHeight, minPipSize)
      sprite.x = GAME_WINDOW.WIDTH + pipeWidth
    } else if (sprite.x < -pipeWidth && sprite.name === 'bottom') {
      sprite.y = this.getBottomPipeHeight(this.pipeSets[sprite.pipeIndex].topPipeSprite.y)
      sprite.x = GAME_WINDOW.WIDTH
    }
  }
}

export { Pipe }
