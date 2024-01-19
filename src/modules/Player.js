const GameBoard = require("./Gameboard");
const Ship = require("./Ship");

class Player {
  constructor(name, active) {
    this.name = name;
    this.active = active;
    this.board = new GameBoard();
  }

  static playersArr = [];

  createShips(arr) {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const cruiser = new Ship(3);
    const submarine = new Ship(3);
    const destroyer = new Ship(2);

    arr.push(carrier);
    arr.push(battleship);
    arr.push(cruiser);
    arr.push(submarine);
    arr.push(destroyer);

    return arr;
  }

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

  getRandomPosition() {
    const directionArr = ["horizontal", "vertical"];

    return directionArr[Math.floor(Math.random() * directionArr.length)];
  }

  randomShipPlace(ship) {
    let occupiedCells = [];
    let randomCoordinateX = Math.floor(Math.floor(Math.random() * 10));
    let randomCoordinateY = Math.floor(Math.floor(Math.random() * 10));
    let randomOrientation = this.getRandomPosition();
    let allNull = (arr) => arr.every((coordinate) => coordinate === null);

    while (randomCoordinateX + ship.length >= 10 || randomCoordinateY + ship.length >= 10) {
      randomCoordinateX = Math.floor(Math.floor(Math.random() * 10));
      randomCoordinateY = Math.floor(Math.floor(Math.random() * 10));
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
    let randomCoordinateX = Math.floor(Math.floor(Math.random() * 10));
    let randomCoordinateY = Math.floor(Math.floor(Math.random() * 10));

    while (this.attackedCells.has(`${randomCoordinateX}, ${randomCoordinateY}`)) {
      return this.randomAttack(ship);
    }
    this.attackedCells.add(`${randomCoordinateX}, ${randomCoordinateY}`);
    return this.attack(ship, [randomCoordinateX, randomCoordinateY]);
  }
}

module.exports = { Player, CPU };
