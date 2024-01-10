class GameBoard {
  constructor() {
    this.grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.ships = [];
    this.missedHits = [];
  }

  legalPlacement(ship, legalCoordinate, direction) {
    if (direction === "horizontal") {
      const maxShipLengthX = legalCoordinate[1] + ship.length;
      if (legalCoordinate[0] < 0 || legalCoordinate[0] > 9 || maxShipLengthX > 10) {
        throw Error("This move is out of bounds");
      } else {
        return;
      }
    }
    if (direction === "vertical") {
      const maxShipLengthY = legalCoordinate[0] + ship.length;
      if (legalCoordinate[1] < 0 || legalCoordinate[1] > 9 || maxShipLengthY > 10) {
        throw Error("This move is out of bounds");
      } else {
        return;
      }
    }
  }

  placeShip(ship, coordinate, direction) {
    this.legalPlacement(ship, coordinate, direction);
    let xCoordinate = coordinate[1];
    let yCoordinate = coordinate[0];
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[yCoordinate][xCoordinate + i] = ship;
      }
      this.ships.push(ship);
    }
    if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[yCoordinate + i][xCoordinate] = ship;
      }
      this.ships.push(ship);
    }
    return this.grid;
  }

  receiveAttack(ship, coordinate) {
    if (this.grid[coordinate[0]][coordinate[1]]) {
      ship.hit();
      ship.isItSunk();
      return true;
    } else {
      this.missedHits.push([coordinate[0], coordinate[1]]);
      return false;
    }
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk);
  }
}

module.exports = GameBoard;