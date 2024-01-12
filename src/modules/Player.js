const GameBoard = require("./Gameboard");

class Player {
  constructor(name, active) {
    this.name = name;
    this.active = active;
    this.board = new GameBoard();
  }

  attack(ship, coordinate) {
    return this.board.receiveAttack(ship, coordinate);
  }

  placeShip(ship, coordinate, direction) {
    return this.board.placeShip(ship, coordinate, direction);
  }
}

class CPU extends Player {
  constructor() {
    super();
    this.attackedCells = new Set();
  }
  static randomCoordinate = function getRandomNumber() {
    return Math.floor(Math.random() * 9);
  };

  static randomDirection = function getRandomPosition() {
    const directionArr = ["horizontal", "vertical"];

    return directionArr[Math.floor(Math.random() * directionArr.length)];
  };

  randomShipPlace(ship) {
    const occupiedCoordinates = [];
    const checkForNullCoordinates = occupiedCoordinates.every((element) => element === null);

    let randomCoordinateX = CPU.randomCoordinate();
    let randomCoordinateY = CPU.randomCoordinate();
    let randomDirection = CPU.randomDirection();

    try {
      if (randomDirection === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          occupiedCoordinates.push(this.board.grid[randomCoordinateY + i][randomCoordinateX]);
        }

        if (checkForNullCoordinates === true) {
          this.placeShip(ship, [randomCoordinateX, randomCoordinateY], randomDirection);
        } else this.randomShipPlace(ship);
      } else {
        for (let i = 0; i < ship.length; i++) {
          occupiedCoordinates.push(this.board.grid[randomCoordinateY][randomCoordinateX + i]);
        }
        if (checkForNullCoordinates === true) {
          this.placeShip(ship, [randomCoordinateX, randomCoordinateY], randomDirection);
        } else this.randomShipPlace(ship);
      }
    } catch (err) {
      this.randomShipPlace(ship);
    }
  }

  randomAttack(ship) {
    let randomCoordinateX = CPU.randomCoordinate();
    let randomCoordinateY = CPU.randomCoordinate();
    let attackCellString = `${randomCoordinateX}, ${randomCoordinateY}`;

    if (!this.attackedCells.has(attackCellString)) {
      this.attackedCells.add(attackCellString);
      this.attack(ship, [randomCoordinateX, randomCoordinateY]);
    } else this.randomAttack(ship);
  }
}

module.exports = { Player, CPU };
