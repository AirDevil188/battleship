import { CPU, Player } from "./Player";
import {
  addBoardEventListeners,
  assignDataAttributesToShips,
  changeColorCell,
  deleteButtonsAndContainers,
  dragDrop,
  getBoardValue,
  renderComputerMove,
  renderPlayerShipsOnTheGameBoard,
  resetBoardShipPlacement,
  rotateShip,
} from "./helperDOMMethods";

import UI from "./UI";

export function gameLoop() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    startTheGame();
  });
}

export function createPlayers() {
  const playerNameInput = document.querySelector("#input-player-name");

  const humanPlayer = new Player(`${playerNameInput.value}`, true);
  const CPUPlayer = new CPU("CPU", false);

  Player.playersArr.push(humanPlayer, CPUPlayer);
}

export function initializeComputerGameBoard() {
  const CPUPlayer = Player.playersArr[1];
  UI.createBoards(CPUPlayer.board.grid, "CPUBoard");
  placeComputerShipsOnBoard([]);
  addBoardEventListeners();
}

export function placeComputerShipsOnBoard(arr) {
  const player2 = Player.playersArr[1];
  if (player2.name === "CPU") {
    const CPUPlayer = Player.playersArr[1];
    CPUPlayer.createShips(arr);
    arr.forEach((ship) => {
      CPUPlayer.randomShipPlace(ship);
    });
  }
}

export function switchTurn() {
  const player1 = Player.playersArr[0];
  const player2 = Player.playersArr[1];

  if (player1.active === true) {
    player1.active = false;
    player2.active = true;
  } else {
    player2.active = false;
    player1.active = true;
  }
}

export function checkForWinner() {
  const player1 = Player.playersArr[0];
  const player2 = Player.playersArr[1];

  if (player1.board.allSunk()) {
    document.querySelector(".main-content").appendChild(UI.winnerScreen(player2.name));
    UI.createPlayAgainButton();

    return document.querySelector(".play-again-button").addEventListener("click", () => location.reload());
  } else if (player2.board.allSunk()) {
    document.querySelector(".main-content").appendChild(UI.winnerScreen(player1.name));
    UI.createPlayAgainButton();
    return document.querySelector(".play-again-button").addEventListener("click", () => location.reload());
  }
}

export function startTheGame() {
  createPlayers();
  document.querySelector(".modal").remove();
  const humanPlayer = Player.playersArr[0];
  UI.createBoards(humanPlayer.board.grid, "humanBoard");
  document.querySelector(".left-container").appendChild(UI.dragAndDropInfo);
  document.querySelector(".main-content").appendChild(UI.rightContainerCreation());
  document.querySelector(".right-container").appendChild(UI.placableShips());
  UI.playAndResetButtons();
  assignDataAttributesToShips();
  rotateShip();
  dragDrop();
  resetBoardShipPlacement();
  playAgainstCPU();
}

export function playerTurn(player, column, row, e) {
  checkForWinner();
  const boardCellValue = getBoardValue(player, column, row);
  player.attack(boardCellValue, [column, row]);
  changeColorCell(e.target, boardCellValue);
}

export function computerTurn() {
  checkForWinner();
  const humanPlayer = Player.playersArr[0];
  const CPUPlayer = Player.playersArr[1];

  const humanPlayerShips = humanPlayer.board.getShips();

  const pickRandomShip = humanPlayerShips[Math.floor(Math.random() * humanPlayerShips.length)];
  CPUPlayer.randomAttack(pickRandomShip);
  renderComputerMove();
}

export function playAgainstCPU() {
  document.querySelector(".play-game-button").addEventListener("click", () => {
    document.querySelector("#ship-container").remove();
    initializeComputerGameBoard();
    deleteButtonsAndContainers();
    renderPlayerShipsOnTheGameBoard();
  });
}
