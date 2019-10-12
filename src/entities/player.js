import { imageAssets, emit, keyPressed, onPointerDown, Sprite, SpriteSheet } from 'kontra'

import { GAME_WINDOW } from '../utils/window'

class Player {
  constructor (collisionObjects) {
    this.collisionObjects = collisionObjects
    this.playerSprite = this.createPlayer()
  }

  static get properties () {
    return {
      width: 51, // 1.5 scale
      height: 36 // 1.5 scale
    }
  }

  /**
   * Transforms the player sprite, animating it.
   *
   * @static
   * @memberof Player
   */
  static flap () {
    this.rotation = -0.40
    this.velocity.y = -8
    this.ddy = 0.40
    this.playAnimation('flap')
  }

  /**
   * Creates the player (bird)
   *
   * @returns {Sprite} playerSprite
   * @memberof Player
   */
  createPlayer () {
    const playerSprite = this.createSprite()
    playerSprite.collisionObjects = this.collisionObjects
    playerSprite.animations = this.buildAndGetSpriteSheetAnimations()
    playerSprite.update = this.onPlayerSpriteUpdate.bind(playerSprite)
    playerSprite.collidesWith = this.onCollision.bind(playerSprite)

    return playerSprite
  }

  /**
   * Creates a Sprite object.
   *
   * @returns {Sprite}
   * @memberof Player
   */
  createSprite () {
    return Sprite({
      x: GAME_WINDOW.WIDTH / 2,
      y: GAME_WINDOW.HEIGHT / 2,
      width: Player.properties.width,
      height: Player.properties.height,
      anchor: { x: 0.5, y: 0.5 }
    })
  }

  /**
   * Creates a spritesheet and returns the animations.
   * Currently our bird can only flap & be idle.
   *
   * @returns {object}
   * @memberof Player
   */
  buildAndGetSpriteSheetAnimations () {
    const spriteSheet = SpriteSheet({
      image: imageAssets.yellowbird,
      frameWidth: 34,
      frameHeight: 24,
      animations: {
        idle: {
          frames: '1..1',
          frameRate: 0
        },
        // create a named animation: FLAP
        flap: {
          frames: '0..2',
          frameRate: 15
        }
      }
    })

    return spriteSheet.animations
  }

  /**
   * Handle sprite movement.
   *
   * @memberof Player
   */
  onPlayerSpriteUpdate () {
    // Move the sprite normally
    this.advance()
    this.playAnimation('flap')

    // Check for bird collisions!
    for (const collisionObject of this.collisionObjects) {
      if (this.collidesWith(collisionObject)) {
        console.log('Bird is dead!')
        emit('game_over', true)
      }
    }

    // The bird is falling too fast!
    if (this.velocity.y > 10 && this.rotation <= 1.6) {
      this.rotation += 0.1
    }

    onPointerDown(() => {
      Player.flap.call(this)
    })

    if (keyPressed('space')) {
      Player.flap.call(this)
    }
  }

  /**
   * Check if the player is colliding with other Sprite objects.
   * Currently will only check if it has collided with the ground.
   *
   * @param object {Sprite} - The sprite to check for collision against
   *
   * @returns {boolean} - True if collided, false if not.
   */
  onCollision (object) {
    // Check if player collided against a pipe at the top
    if (object.name === 'top') {
      return (this.x >= (object.x - object.width) && this.x < object.x) &&
        (this.y >= (object.y - object.height) && this.y < object.y)
    }

    // Check if player collided against a pipe at the bottom
    if (object.name === 'bottom') {
      return (this.x >= object.x && this.x < (object.x + object.width)) &&
        (this.y >= object.y && this.y < (object.y + object.height))
    }

    return this.y >= (object.y - this.height / 2)
  }
}

export { Player }
