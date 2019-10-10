export class Score {
  constructor () {
    this.score = 0
  }

  get currentScore () {
    return this.score
  }

  addPoint () {
    this.score += 1
  }
}
