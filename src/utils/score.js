export default class Score {
  constructor () {
    this.score = 0
  }

  addPoint () {
    this.score += 1
  }

  get currentScore () {
    return this.score
  }
}
