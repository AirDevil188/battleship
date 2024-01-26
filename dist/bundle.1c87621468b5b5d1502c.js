/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Ship = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");
class GameBoard {
  constructor() {
    this.grid = Array(10).fill(null).map(() => Array(10).fill(null));
    this.ships = [];
  }
  legalPlacement(ship, legalCoordinate, direction) {
    let xCoordinate = legalCoordinate[1];
    let yCoordinate = legalCoordinate[0];
    let occupiedCells = [];
    let allNull = arr => arr.every(coordinate => coordinate === null);
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
    return this.ships.every(ship => ship.isSunk);
  }
  getShips() {
    return this.ships;
  }
}
module.exports = GameBoard;

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const GameBoard = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");
const Ship = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");
class Player {
  constructor(name, active) {
    this.name = name;
    this.active = active;
    this.board = new GameBoard();
  }
  static playersArr = [];
  static createPlayerShip = length => {
    let playerShip = new Ship(length);
    return playerShip;
  };
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
  getRandomPosition() {
    const directionArr = ["horizontal", "vertical"];
    return directionArr[Math.floor(Math.random() * directionArr.length)];
  }
  randomShipPlace(ship) {
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
module.exports = {
  Player,
  CPU
};

/***/ }),

/***/ "./src/modules/Ship.js":
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
/***/ ((module) => {

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
    if (this.numberOfHits === this.length) this.isSunk = true;else this.isSunk = false;
  }
}
module.exports = Ship;

/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
const toHtml = __webpack_require__(/*! ../util/toHtml */ "./src/util/toHtml.js");
class UI {
  static startingModalAgainstComputer = toHtml(`
  <dialog open class = "modal cpu-game" id = "modal">
<h3>ENTER PLAYER NAME:</h3>
<form>
<input type="text" id = "input-player-name" required placeholder="Player Name" />
<button class="player-create-button" type="submit">Play</button>
</form>
</dialog>
`);
  static dragAndDropInfo = toHtml(`    <div class = "drag-drop-info-container">
<p> In order to start playing, please drag and drop all of your ships on the board. </p>
</div>`);
  static placableShips = () => {
    return toHtml(`
    <div id = ship-container>
  <div class = "ship horizontal" id = "carrier" draggable="true">
  <div class = "part"></div>
  <div class = "part"></div>
  <div class = "part"></div>
  <div class = "part"></div>
  <div class = "part"></div>
  </div>
  <div class = "ship horizontal" id = "battleship" draggable="true">
  <div class = "part"></div>
  <div class = "part"></div>
  <div class = "part"></div>
  <div class = "part"></div>
  </div>
  <div class = "ship horizontal" id = "submarine" draggable="true"> 
  <div class = "part"></div>
  <div class = "part"></div>
  <div class = "part"></div>
  </div>
  <div class = "ship horizontal" id = "cruiser" draggable="true">
  <div class = "part"></div>
  <div class = "part"></div>
  <div class = "part"></div>
  </div>
  <div class = "ship horizontal" id = "destroyer" draggable="true"> 
  <div class = "part"></div>
  <div class = "part"></div>
  </div>
  </div>`);
  };
  static createBoards = (board, type) => {
    const leftContainer = document.createElement("div");
    const gameBoard = document.createElement("div");
    leftContainer.classList.add("left-container");
    gameBoard.classList.add("gameboard");
    document.querySelector(".main-content").appendChild(leftContainer);
    leftContainer.appendChild(document.querySelector(".gameboards-container"));
    document.querySelector(".gameboards-container").appendChild(gameBoard);
    board.forEach((column, j) => {
      if (Array.isArray(column)) {
        column.forEach((row, i) => {
          row = document.createElement("div");
          row.setAttribute("data-row", `${i++}`);
          row.setAttribute("data-column", `${j}`);
          row.classList.add("square-grid");
          gameBoard.appendChild(row);
          if (i === 10) j++;
          if (type === "humanBoard") {
            row.classList.add("Human");
            gameBoard.classList.add("human-player-board");
          } else {
            row.classList.add("Computer");
            gameBoard.classList.add("computer-player-board");
          }
        });
      }
    });
  };
  static rightContainerCreation = () => {
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("right-container");
    return rightContainer;
  };
  static playAndResetButtons = () => {
    const buttonsContainer = document.createElement("div");
    const playGameButton = document.createElement("button");
    const resetBoardButton = document.createElement("button");
    buttonsContainer.classList.add("buttons-container");
    playGameButton.classList.add("play-game-button");
    resetBoardButton.classList.add("reset-board-button");
    playGameButton.textContent = "Play The Game";
    resetBoardButton.textContent = "Reset Board";
    document.querySelector(".right-container").appendChild(buttonsContainer);
    buttonsContainer.appendChild(playGameButton);
    buttonsContainer.appendChild(resetBoardButton);
    return buttonsContainer;
  };
  static winnerScreen = name => {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("open", "");
    const dialogContainer = document.createElement("div");
    const paraWinStatus = document.createElement("p");
    dialogContainer.classList.add("dialog-container");
    paraWinStatus.textContent = `${name} has won the game`;
    dialog.appendChild(dialogContainer);
    dialogContainer.appendChild(paraWinStatus);
    return dialog;
  };
  static createPlayAgainButton() {
    const playAgainButton = document.createElement("button");
    playAgainButton.classList.add("play-again-button");
    playAgainButton.textContent = "Play Again";
    document.querySelector("dialog").appendChild(playAgainButton);
  }
}

/***/ }),

/***/ "./src/modules/gameLoop.js":
/*!*********************************!*\
  !*** ./src/modules/gameLoop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkForWinner: () => (/* binding */ checkForWinner),
/* harmony export */   computerTurn: () => (/* binding */ computerTurn),
/* harmony export */   createPlayers: () => (/* binding */ createPlayers),
/* harmony export */   gameLoop: () => (/* binding */ gameLoop),
/* harmony export */   initializeComputerGameBoard: () => (/* binding */ initializeComputerGameBoard),
/* harmony export */   placeComputerShipsOnBoard: () => (/* binding */ placeComputerShipsOnBoard),
/* harmony export */   playAgainstCPU: () => (/* binding */ playAgainstCPU),
/* harmony export */   playerTurn: () => (/* binding */ playerTurn),
/* harmony export */   startTheGame: () => (/* binding */ startTheGame),
/* harmony export */   switchTurn: () => (/* binding */ switchTurn)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/modules/Player.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helperDOMMethods */ "./src/modules/helperDOMMethods.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/UI.js");



function gameLoop() {
  const form = document.querySelector("form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    startTheGame();
  });
}
function createPlayers() {
  const playerNameInput = document.querySelector("#input-player-name");
  const humanPlayer = new _Player__WEBPACK_IMPORTED_MODULE_0__.Player(`${playerNameInput.value}`, true);
  const CPUPlayer = new _Player__WEBPACK_IMPORTED_MODULE_0__.CPU("CPU", false);
  _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr.push(humanPlayer, CPUPlayer);
}
function initializeComputerGameBoard() {
  const CPUPlayer = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[1];
  _UI__WEBPACK_IMPORTED_MODULE_2__["default"].createBoards(CPUPlayer.board.grid, "CPUBoard");
  placeComputerShipsOnBoard([]);
  (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.addBoardEventListeners)();
}
function placeComputerShipsOnBoard(arr) {
  const player2 = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[1];
  if (player2.name === "CPU") {
    const CPUPlayer = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[1];
    CPUPlayer.createShips(arr);
    arr.forEach(ship => {
      CPUPlayer.randomShipPlace(ship);
    });
  }
}
function switchTurn() {
  const player1 = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[0];
  const player2 = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[1];
  if (player1.active === true) {
    player1.active = false;
    player2.active = true;
  } else {
    player2.active = false;
    player1.active = true;
  }
}
function checkForWinner() {
  const player1 = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[0];
  const player2 = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[1];
  if (player1.board.allSunk()) {
    document.querySelector(".main-content").appendChild(_UI__WEBPACK_IMPORTED_MODULE_2__["default"].winnerScreen(player2.name));
    _UI__WEBPACK_IMPORTED_MODULE_2__["default"].createPlayAgainButton();
    return document.querySelector(".play-again-button").addEventListener("click", () => location.reload());
  } else if (player2.board.allSunk()) {
    document.querySelector(".main-content").appendChild(_UI__WEBPACK_IMPORTED_MODULE_2__["default"].winnerScreen(player1.name));
    _UI__WEBPACK_IMPORTED_MODULE_2__["default"].createPlayAgainButton();
    return document.querySelector(".play-again-button").addEventListener("click", () => location.reload());
  }
}
function startTheGame() {
  createPlayers();
  document.querySelector(".modal").remove();
  const humanPlayer = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[0];
  _UI__WEBPACK_IMPORTED_MODULE_2__["default"].createBoards(humanPlayer.board.grid, "humanBoard");
  document.querySelector(".left-container").appendChild(_UI__WEBPACK_IMPORTED_MODULE_2__["default"].dragAndDropInfo);
  document.querySelector(".main-content").appendChild(_UI__WEBPACK_IMPORTED_MODULE_2__["default"].rightContainerCreation());
  document.querySelector(".right-container").appendChild(_UI__WEBPACK_IMPORTED_MODULE_2__["default"].placableShips());
  _UI__WEBPACK_IMPORTED_MODULE_2__["default"].playAndResetButtons();
  (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.assignDataAttributesToShips)();
  (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.rotateShip)();
  (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.dragDrop)();
  (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.resetBoardShipPlacement)();
  playAgainstCPU();
}
function playerTurn(player, column, row, e) {
  checkForWinner();
  const boardCellValue = (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.getBoardValue)(player, column, row);
  player.attack(boardCellValue, [column, row]);
  (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.changeColorCell)(e.target, boardCellValue);
}
function computerTurn() {
  checkForWinner();
  const humanPlayer = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[0];
  const CPUPlayer = _Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[1];
  const humanPlayerShips = humanPlayer.board.getShips();
  const pickRandomShip = humanPlayerShips[Math.floor(Math.random() * humanPlayerShips.length)];
  CPUPlayer.randomAttack(pickRandomShip);
  (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.renderComputerMove)();
}
function playAgainstCPU() {
  document.querySelector(".play-game-button").addEventListener("click", () => {
    document.querySelector("#ship-container").remove();
    initializeComputerGameBoard();
    (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.deleteButtonsAndContainers)();
    (0,_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.renderPlayerShipsOnTheGameBoard)();
  });
}

/***/ }),

/***/ "./src/modules/helperDOMMethods.js":
/*!*****************************************!*\
  !*** ./src/modules/helperDOMMethods.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addBoardEventListeners: () => (/* binding */ addBoardEventListeners),
/* harmony export */   assignDataAttributesToShips: () => (/* binding */ assignDataAttributesToShips),
/* harmony export */   changeColorCell: () => (/* binding */ changeColorCell),
/* harmony export */   deleteButtonsAndContainers: () => (/* binding */ deleteButtonsAndContainers),
/* harmony export */   dragDrop: () => (/* binding */ dragDrop),
/* harmony export */   getBoardValue: () => (/* binding */ getBoardValue),
/* harmony export */   removeEventListeners: () => (/* binding */ removeEventListeners),
/* harmony export */   renderComputerMove: () => (/* binding */ renderComputerMove),
/* harmony export */   renderPlayerShipsOnTheGameBoard: () => (/* binding */ renderPlayerShipsOnTheGameBoard),
/* harmony export */   resetBoardShipPlacement: () => (/* binding */ resetBoardShipPlacement),
/* harmony export */   rotateShip: () => (/* binding */ rotateShip),
/* harmony export */   showPlayGameButton: () => (/* binding */ showPlayGameButton)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Ship__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/modules/UI.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/modules/Player.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameLoop */ "./src/modules/gameLoop.js");
/* harmony import */ var _util_dragDrop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/dragDrop */ "./src/util/dragDrop.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Gameboard__WEBPACK_IMPORTED_MODULE_5__);






function getBoardValue(player, column, row) {
  return player.board.grid[column][row];
}
function changeColorCell(e, cell) {
  if (cell instanceof (_Ship__WEBPACK_IMPORTED_MODULE_0___default())) e.style.background = "#c6527a";else e.style.background = "#4e4d4d";
}
function renderPlayerShipsOnTheGameBoard() {
  const ships = document.querySelectorAll(".ship");
  ships.forEach(ship => {
    for (let i = 0; i < ship.dataset.length; i++) {
      if (ship.dataset.orientation === "horizontal") {
        const cellNode = document.querySelector(`[data-row = "${Number(ship.dataset.row) + i}"][data-column = "${Number(ship.dataset.column)}"]`);
        cellNode.style.backgroundColor = "#000";
        cellNode.style.borderColor = "#fff";
      } else {
        const cellNode = document.querySelector(`[data-row = "${Number(ship.dataset.row)}"][data-column = "${Number(ship.dataset.column) + i}"]`);
        cellNode.style.backgroundColor = "#000";
        cellNode.style.borderColor = "#fff";
      }
    }
    ship.remove();
  });
}
function renderComputerMove() {
  const set = _Player__WEBPACK_IMPORTED_MODULE_2__.Player.playersArr[1].attackedCells;
  const iterator = set.values();
  set.forEach(coordinate => {
    coordinate = iterator.next().value.split(",");
    const column = Number(coordinate[0]);
    const row = Number(coordinate[1]);
    const boardCellValue = getBoardValue(_Player__WEBPACK_IMPORTED_MODULE_2__.Player.playersArr[0], column, row);
    const cellNode = document.querySelector(`[data-row = "${row}"][data-column = "${column}"]`);
    changeColorCell(cellNode, boardCellValue);
  });
}
function addBoardEventListeners() {
  const humanPlayer = _Player__WEBPACK_IMPORTED_MODULE_2__.Player.playersArr[0];
  const CPUPlayer = _Player__WEBPACK_IMPORTED_MODULE_2__.Player.playersArr[1];
  const ComputerBoardCells = document.querySelectorAll(".Computer");
  ComputerBoardCells.forEach(cell => {
    cell.addEventListener("click", e => {
      if (humanPlayer.board.allSunk() || CPUPlayer.board.allSunk()) {
        return;
      } else {
        (0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.playerTurn)(_Player__WEBPACK_IMPORTED_MODULE_2__.Player.playersArr[1], e.target.dataset.column, e.target.dataset.row, e);
        removeEventListeners(e);
        (0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.computerTurn)();
      }
    });
  });
}
function removeEventListeners(e) {
  let newSubmit = e.target.cloneNode(true);
  e.target.parentNode.replaceChild(newSubmit, e.target);
}
function dragDrop() {
  const shipContainer = document.querySelector("#ship-container");
  shipContainer.addEventListener("dragstart", _util_dragDrop__WEBPACK_IMPORTED_MODULE_4__.dragStart);
  let ship = document.querySelector(".gameboard");
  ship.addEventListener("dragenter", _util_dragDrop__WEBPACK_IMPORTED_MODULE_4__.dragEnter);
  ship.addEventListener("dragover", _util_dragDrop__WEBPACK_IMPORTED_MODULE_4__.dragOver);
  ship.addEventListener("dragleave", _util_dragDrop__WEBPACK_IMPORTED_MODULE_4__.dragLeave);
  ship.addEventListener("drop", _util_dragDrop__WEBPACK_IMPORTED_MODULE_4__.drop);
}
function assignDataAttributesToShips() {
  const carrier = document.querySelector("#carrier");
  const battleship = document.querySelector("#battleship");
  const submarine = document.querySelector("#submarine");
  const cruiser = document.querySelector("#cruiser");
  const destroyer = document.querySelector("#destroyer");
  carrier.setAttribute("data-length", 5);
  carrier.setAttribute("data-orientation", "horizontal");
  battleship.setAttribute("data-length", 4);
  battleship.setAttribute("data-orientation", "horizontal");
  submarine.setAttribute("data-length", 3);
  submarine.setAttribute("data-orientation", "horizontal");
  cruiser.setAttribute("data-length", 3);
  cruiser.setAttribute("data-orientation", "horizontal");
  destroyer.setAttribute("data-length", 2);
  destroyer.setAttribute("data-orientation", "horizontal");
}
function rotateShip() {
  const ships = document.querySelectorAll(".horizontal");
  ships.forEach(ship => {
    ship.addEventListener("click", () => {
      if (ship.classList.contains("horizontal")) {
        ship.classList.toggle("vertical");
        ship.classList.remove("horizontal");
        ship.dataset.orientation = "vertical";
      } else {
        ship.classList.toggle("horizontal");
        ship.classList.remove("vertical");
        ship.dataset.orientation = "horizontal";
      }
    });
  });
}
function resetBoardShipPlacement() {
  document.querySelector(".reset-board-button").addEventListener("click", () => {
    const placedShips = document.querySelectorAll(".dropped");
    placedShips.forEach(ship => {
      ship.remove();
      ship.style.position = "";
    });
    document.querySelector("#ship-container").remove();
    document.querySelector(".right-container").insertBefore(_UI__WEBPACK_IMPORTED_MODULE_1__["default"].placableShips(), document.querySelector(".buttons-container"));
    document.querySelector(".play-game-button").style.display = "none";
    _Player__WEBPACK_IMPORTED_MODULE_2__.Player.playersArr[0].board = new (_Gameboard__WEBPACK_IMPORTED_MODULE_5___default())();
    assignDataAttributesToShips();
    dragDrop();
    rotateShip();
  });
}
function showPlayGameButton() {
  if (document.querySelector("#ship-container").children.length === 0) {
    document.querySelector(".play-game-button").style.display = "block";
  }
}
function deleteButtonsAndContainers() {
  document.querySelector(".left-container").remove();
  document.querySelector(".right-container").remove();
}

/***/ }),

/***/ "./src/util/dragDrop.js":
/*!******************************!*\
  !*** ./src/util/dragDrop.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dragEnter: () => (/* binding */ dragEnter),
/* harmony export */   dragLeave: () => (/* binding */ dragLeave),
/* harmony export */   dragOver: () => (/* binding */ dragOver),
/* harmony export */   dragStart: () => (/* binding */ dragStart),
/* harmony export */   drop: () => (/* binding */ drop)
/* harmony export */ });
/* harmony import */ var _modules_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/Player */ "./src/modules/Player.js");
/* harmony import */ var _modules_Player__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_Player__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/helperDOMMethods */ "./src/modules/helperDOMMethods.js");


function dragEnter(e) {
  e.target.classList.add("drag-hover");
  e.preventDefault();
}
function dragOver(e) {
  e.preventDefault();
}
function dragLeave(e) {
  e.target.classList.remove("drag-hover");
}
function drop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);
  const playerShip = _modules_Player__WEBPACK_IMPORTED_MODULE_0__.Player.createPlayerShip(Number(draggable.dataset.length));
  draggable.setAttribute("data-column", e.target.dataset.column);
  draggable.setAttribute("data-row", e.target.dataset.row);
  try {
    _modules_Player__WEBPACK_IMPORTED_MODULE_0__.Player.playersArr[0].placeShip(playerShip, [Number(e.target.dataset.column), Number(e.target.dataset.row)], draggable.dataset.orientation);
  } catch (error) {
    e.target.classList.remove("drag-hover");
    return error;
  }
  e.target.appendChild(draggable);
  e.target.classList.remove("drag-hover");
  (0,_modules_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.showPlayGameButton)();
  draggable.classList.add("dropped");
  draggable.style.position = "absolute";
  draggable.setAttribute("draggable", "");
  (0,_modules_helperDOMMethods__WEBPACK_IMPORTED_MODULE_1__.removeEventListeners)(e);
}
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

/***/ }),

/***/ "./src/util/toHtml.js":
/*!****************************!*\
  !*** ./src/util/toHtml.js ***!
  \****************************/
/***/ ((module) => {

const toHtml = str => document.createRange().createContextualFragment(str.trim()).firstChild;
module.exports = toHtml;

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");
/* harmony import */ var _modules_gameLoop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/gameLoop */ "./src/modules/gameLoop.js");



document.querySelector(".main-content").appendChild(_modules_UI__WEBPACK_IMPORTED_MODULE_1__["default"].startingModalAgainstComputer);
(0,_modules_gameLoop__WEBPACK_IMPORTED_MODULE_2__.gameLoop)();
})();

/******/ })()
;
//# sourceMappingURL=bundle.1c87621468b5b5d1502c.js.map