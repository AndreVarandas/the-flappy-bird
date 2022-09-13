import { Sprite } from 'kontra'

/**
 * This class manages the Base Sprites.
 * Base sprites are the 'base' of the game aka ground/platform.
 */
class Base {
  constructor(imageAssets) {
    this.imageAssets = imageAssets
    this.baseSprite = this.generateBaseSprite('base')
    this.baseSpriteExtension = this.generateBaseSprite('extension')
  }

  /**
   * Returns a base sprite.
   *
   * @param name {string} - Must be either 'base' or 'extension'
   * @returns {Sprite} - The base Sprite
   */
  generateBaseSprite(name) {
    return Sprite(this.getBaseSpriteConfig(this.imageAssets, name))
  }

  /**
   * Returns a basic object configuration that will then
   * be used to create the sprite.
   *
   * @param imageAssets {array} - Array of image assets.
   * @param name
   *
   * @returns {{image: *, dx: *, x: *, width: *, y: *}}
   */
  getBaseSpriteConfig(imageAssets, name) {
    return {
      // we want to show the extension asset right after the base
      x: name === 'base' ? Base.defaultX : Base.defaultWidth,
      y: Base.defaultY,
      width: Base.defaultWidth,
      dx: Base.baseSpeed,
      image: imageAssets.base,
      name: name,
    }
  }

  /**
   * Function that runs on each call to sprite.update
   *
   * We use base sprite and baseSpriteExtension to give an illusion
   * of being an endless platform, by switching the assets once one is reaching
   * the end of the screen (x = 0)
   *
   * It calculates the correct X for the other base sprite, setting its X
   * to its width, so it will be moved to the other end of the screen
   *
   * @param sprite
   */
  baseSpriteUpdate(sprite) {
    sprite.advance()
    /**
     * As an example,
     * When sprite (base) reaches the very left side of the screen, we want
     * to show the baseSpriteExtension on the other side of the screen, to give an
     * illusion of movement.
     */
    if (Math.round(sprite.x / Base.baseSpeed) === 0) {
      sprite.name === 'base'
        ? (this.baseSpriteExtension.x = this.baseSpriteExtension.width)
        : (this.baseSprite.x = this.baseSprite.width)
    }
  }

  /**
   * This method creates and returns the two Sprite instances that we use
   * for the platform base aka ground.
   *
   * @returns {{baseSprite: (Sprite), baseSpriteExtension: (Sprite}}
   */
  createBaseSprites() {
    this.baseSprite.update = this.baseSpriteUpdate.bind(this, this.baseSprite)
    this.baseSpriteExtension.update = this.baseSpriteUpdate.bind(
      this,
      this.baseSpriteExtension
    )

    return {
      baseSprite: this.baseSprite,
      baseSpriteExtension: this.baseSpriteExtension,
    }
  }
}

/**
 * Static properties
 * Using old syntax, because new one is experimental.
 */
Base.baseSpeed = -3
Base.defaultX = 0
Base.defaultY = 528
Base.defaultWidth = 640

export { Base }
