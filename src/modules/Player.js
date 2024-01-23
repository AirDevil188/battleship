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

    while (randomCoordinateX + ship.length >= 10 || randomCoordinateY + ship.length >= 10) {
      randomCoordinateX = Math.floor(Math.floor(Math.random() * 10));
      randomCoordinateY = Math.floor(Math.floor(Math.random() * 10));
    }
    try {
      this.placeShip(ship, [randomCoordinateY, randomCoordinateX], randomOrientation);
    } catch (e) {
      console.error(e);
      this.randomShipPlace(ship);
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
