function Score () {
  this.score = null
}

Score.prototype.currentScore = function () {
  return this.score
}

Score.prototype.addPoint = function () {
  this.score += 1
}

export { Score }
