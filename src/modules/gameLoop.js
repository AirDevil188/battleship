import { CPU, Player } from "./Player";
import {
  addBoardEventListeners,
  appendStartingScreen,
  changeColorCell,
  getBoardValue,
  renderComputerMove,
} from "./helperDOMMethods";

import UI from "./UI";

export function gameLoop() {
  const playAgainstButtons = document.querySelectorAll(".play-against-button");
  playAgainstButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      switch (e.target.getAttribute("value")) {
        case "Computer":
          console.log("computer");
          appendStartingScreen(e.target.value);
          playTheGame();
          break;
        case "Player":
          appendStartingScreen(e.target.value);
          playTheGame();
          break;
      }
    });
  });
}

export function createPlayers() {
  if (document.querySelector("h3").textContent === "ENTER NAME OF THE PLAYER :") {
    const playerNameInput = document.querySelector("#input-player-name");

    const humanPlayer = new Player(`${playerNameInput.value}`, true);
    const CPUPlayer = new CPU("CPU", false);

    Player.playersArr.push(humanPlayer, CPUPlayer);
  } else {
    const playerNameInputPlayerOne = document.querySelector("#input-player-name");
    const playerNameInputPlayerTwo = document.querySelector("#input-player-two-name");

    const humanPlayerOne = new Player(`${playerNameInputPlayerOne.value}`, true);
    const humanPlayerTwo = new Player(`${playerNameInputPlayerTwo.value}`, false);

    Player.playersArr.push(humanPlayerOne, humanPlayerTwo);
  }
}

export function initializeGameBoards() {
  if (document.querySelector(".modal").classList.contains("cpu-game")) {
    const humanPlayer = Player.playersArr[0];
    const CPUPlayer = Player.playersArr[1];

    UI.createBoards(humanPlayer.board.grid, "humanBoard");
    UI.createBoards(CPUPlayer.board.grid, "CPUBoard");
    placeShipsOnBoard([]);
    addBoardEventListeners();
  } else {
    const humanPlayerOne = Player.playersArr[0];
    const humanPlayerTwo = Player.playersArr[1];

    UI.createBoards(humanPlayerOne.board.grid, "humanBoard");
    UI.createBoards(humanPlayerTwo.board.grid, "humanBoard-two");
    addBoardEventListeners();
  }
}

export function placeShipsOnBoard(arr) {
  const player1 = Player.playersArr[0];
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
    alert("You won");
  } else if (player2.board.allSunk()) {
    alert("COMP WON");
  }
}

export function playTheGame() {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    createPlayers();
    initializeGameBoards();
  });
}

export function playAgainstAnotherPlayer() {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    createPlayers();
  });
}

export function playerTurn(player, column, row, e) {
  const boardCellValue = getBoardValue(player, column, row);
  player.attack(boardCellValue, [column, row]);
  changeColorCell(e.target, boardCellValue);
  checkForWinner();
}

export function computerTurn() {
  const humanPlayer = Player.playersArr[0];
  const CPUPlayer = Player.playersArr[1];

  console.log(humanPlayer.board.getShips());
  const humanPlayerShips = humanPlayer.board.getShips();

  const pickRandomShip = humanPlayerShips[Math.floor(Math.random() * humanPlayerShips.length)];
  CPUPlayer.randomAttack(pickRandomShip);
  renderComputerMove();
  checkForWinner();
}
