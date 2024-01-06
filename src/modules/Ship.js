class Ship {
  constructor(length) {
    this.length = length;
    this.numberOfHits = 0;
    this.isSunk = false;
  }

  hit() {
    return ++this.numberOfHits;
  }

  isItSunk() {
    if (this.numberOfHits === this.length) this.isSunk = true;
    else this.isSunk = false;
  }
}

module.exports = Ship;
