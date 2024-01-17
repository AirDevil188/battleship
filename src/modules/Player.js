const GameBoard = require("./Gameboard");

class Player {
  constructor(name, active) {
    this.name = name;
    this.active = active;
    this.board = new GameBoard();
  }

  static playersArr = [];

  attack(ship, coordinate) {
    return this.board.receiveAttack(ship, coordinate);
  }

  placeShip(ship, coordinate, direction) {
    return this.board.placeShip(ship, coordinate, direction);
  }
}

class CPU extends Player {
  constructor(name, active) {
    super();
    this.name = name;
    this.active = active;
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
    let occupiedCells = [];
    let randomCoordinateX = CPU.randomCoordinate();
    let randomCoordinateY = CPU.randomCoordinate();
    let randomOrientation = CPU.randomDirection();
    let allNull = (arr) => arr.every((coordinate) => coordinate === null);

    while (randomCoordinateX + ship.length >= 10 || randomCoordinateY + ship.length >= 10) {
      randomCoordinateX = CPU.randomCoordinate();
      randomCoordinateY = CPU.randomCoordinate();
    }

    for (let i = 0; i < ship.length; i++) {
      if (randomOrientation === "horizontal") {
        occupiedCells.push(this.board.grid[randomCoordinateY][randomCoordinateX + i]);
        occupiedCells.push(this.board.grid[randomCoordinateY + i][randomCoordinateX + 1]);
        occupiedCells.push(this.board.grid[randomCoordinateY + i][randomCoordinateX - 1]);
      } else {
        occupiedCells.push(this.board.grid[randomCoordinateY + i][randomCoordinateX]);
        occupiedCells.push(this.board.grid[randomCoordinateY + i][randomCoordinateX + 1]);
        occupiedCells.push(this.board.grid[randomCoordinateY + i][randomCoordinateX - 1]);
      }
    }

    if (randomOrientation === "horizontal") {
      if (!randomCoordinateX + ship.length < 0 || !randomCoordinateX - 1 < 0) {
        occupiedCells.push(this.board.grid[randomCoordinateY][randomCoordinateX + ship.length]);
        occupiedCells.push(this.board.grid[randomCoordinateY][randomCoordinateX - 1]);
      }
    } else if (randomOrientation === "vertical") {
      if (!randomCoordinateY + ship.length < 0 || !randomCoordinateY - 1 < 0) {
        occupiedCells.push(this.board.grid[randomCoordinateY - 1][randomCoordinateX]);

        occupiedCells.push(this.board.grid[randomCoordinateY + ship.length][randomCoordinateX]);
      }
    }

    if (allNull(occupiedCells)) {
      this.placeShip(ship, [randomCoordinateY, randomCoordinateX], randomOrientation);
    } else {
      this.randomShipPlace(ship, [randomCoordinateY, randomCoordinateX], randomOrientation);
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
