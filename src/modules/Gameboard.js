const Ship = require("./Ship");

class GameBoard {
  constructor() {
    this.grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.ships = [];
  }

  legalPlacement(ship, legalCoordinate, direction) {
    let xCoordinate = legalCoordinate[1];
    let yCoordinate = legalCoordinate[0];
    let occupiedCells = [];
    let allNull = (arr) => arr.every((coordinate) => coordinate === null);
    if (direction === "horizontal") {
      for (let j = 0; j < ship.length; j++) {
        occupiedCells.push(this.grid[yCoordinate][xCoordinate + j]);
      }
      if (allNull(occupiedCells)) {
        for (let i = 0; i < ship.length; i++) {
          this.grid[yCoordinate][xCoordinate + i] = ship;
        }
      } else throw Error("You can't place ship on occupied cell");

      for (let i = 0; i < ship.length; i++) {
        if (legalCoordinate[0] + 1 < 10) {
          this.grid[legalCoordinate[0] + 1][legalCoordinate[1] + i] = "occupied";
        }
        if (legalCoordinate[0] - 1 >= 0) {
          this.grid[legalCoordinate[0] - 1][legalCoordinate[1] + i] = "occupied";
        }
        if (legalCoordinate[1] + ship.length < 10) {
          this.grid[legalCoordinate[0]][legalCoordinate[1] + ship.length] = "occupied";
        }
        if (legalCoordinate[1] - 1 >= 0) {
          this.grid[legalCoordinate[0]][legalCoordinate[1] - 1] = "occupied";
        }
      }

      const maxShipLengthX = legalCoordinate[1] + ship.length;
      if (legalCoordinate[0] < 0 || legalCoordinate[0] > 10 || maxShipLengthX > 10) {
        throw Error("This move is out of bounds");
      } else {
        return;
      }
    }
    if (direction === "vertical") {
      for (let j = 0; j < ship.length; j++) {
        occupiedCells.push(this.grid[yCoordinate + j][xCoordinate]);
      }
      if (allNull(occupiedCells)) {
        for (let i = 0; i < ship.length; i++) {
          this.grid[yCoordinate + i][xCoordinate] = ship;
        }
        this.ships.push(ship);
      } else throw Error("You can't place ship on occupied cell");

      for (let i = 0; i < ship.length; i++) {
        if (legalCoordinate[1] + 1 < 10) {
          this.grid[legalCoordinate[0] + i][legalCoordinate[1] + 1] = "occupied";
        }
        if (legalCoordinate[1] - 1 >= 0) {
          this.grid[legalCoordinate[0] + i][legalCoordinate[1] - 1] = "occupied";
        }
        if (legalCoordinate[0] + ship.length < 10) {
          this.grid[legalCoordinate[0] + ship.length][legalCoordinate[1]] = "occupied";
        }
        if (legalCoordinate[0] - 1 >= 0) {
          this.grid[legalCoordinate[0] - 1][legalCoordinate[1]] = "occupied";
        }
      }

      const maxShipLengthY = legalCoordinate[0] + ship.length;
      if (legalCoordinate[1] < 0 || legalCoordinate[1] > 10 || maxShipLengthY > 10) {
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
    let xCoordinate = coordinate[0];
    let yCoordinate = coordinate[1];
    if (this.grid[xCoordinate][yCoordinate] instanceof Ship) {
      ship.hit();
      ship.isItSunk();
      return true;
    } else {
      return false;
    }
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk);
  }

  getShips() {
    return this.ships;
  }
}

module.exports = GameBoard;
