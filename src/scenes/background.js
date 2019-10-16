import { Sprite } from 'kontra'
import { GAME_WINDOW } from '../utils/window'

/**
 * This class manages the Background Sprite.
 * The image to display at the background will depend on the
 * time of the day.
 */
class Background {
  constructor (imageAssets) {
    this.imageAssets = imageAssets
    this.backgroundSprite = this.createBackgroundSprite()
  }

  /**
   * Returns a list of all the background-related image resources.
   *
   * @returns {array} - List of image filenames
   */
  static getImageSet () {
    return [
      'background-day.png',
      'background-night.png',
      'background-interlude.png'
    ]
  }

  /**
   * Returns a basic object configuration that will then
   * be used to create the sprite.
   *
   * @param imageAssets {array} - Array of image assets
   * @param imageName {string} - Name of the image to use
   *
   * @returns {{image: *, x: *, y: *, width: *, height: *}}
   */
  getBackgroundSpriteConfig (imageAssets, imageName = 'background-day') {
    return {
      x: 0,
      y: 0,
      width: GAME_WINDOW.WIDTH,
      height: GAME_WINDOW.HEIGHT,
      image: imageAssets[imageName]
    }
  }

  /**
   * Returns the name of the image asset to use depeding on
   * the current time of the day.
   *
   * @returns {string} - Name of an image asset
   */
  getBgImageAssetName () {
    const currentHour = (new Date()).getHours()

    let dayPhase
    if ((currentHour >= 7 && currentHour < 8) || (currentHour >= 19 && currentHour < 20)) {
      dayPhase = 'interlude'
    } else if (currentHour >= 8 && currentHour < 19) {
      dayPhase = 'day'
    } else {
      dayPhase = 'night'
    }

    return `background-${dayPhase}`
  }

  /**
   * Returns a background sprite.
   *
   * @returns {Sprite} - The background Sprite
   */
  createBackgroundSprite () {
    const imageName = this.getBgImageAssetName()
    return Sprite(this.getBackgroundSpriteConfig(this.imageAssets, imageName))
  }
}

export { Background }
