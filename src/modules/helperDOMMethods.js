import Ship from "./Ship";
import UI from "./UI";
import { Player } from "./Player";
import { computerTurn, playerTurn } from "./gameLoop";
import { dragEnter, dragLeave, dragOver, dragStart, drop } from "../util/dragDrop";
import GameBoard from "./Gameboard";

export function getBoardValue(player, column, row) {
  return player.board.grid[column][row];
}
export function changeColorCell(e, cell) {
  if (cell instanceof Ship) e.style.background = "#c6527a";
  else e.style.background = "#4e4d4d";
}

export function renderPlayerShipsOnTheGameBoard() {
  const ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    for (let i = 0; i < ship.dataset.length; i++) {
      if (ship.dataset.orientation === "horizontal") {
        const cellNode = document.querySelector(
          `[data-row = "${Number(ship.dataset.row) + i}"][data-column = "${Number(ship.dataset.column)}"]`
        );
        cellNode.style.backgroundColor = "#000";
        cellNode.style.borderColor = "#fff";
      } else {
        const cellNode = document.querySelector(
          `[data-row = "${Number(ship.dataset.row)}"][data-column = "${Number(ship.dataset.column) + i}"]`
        );
        cellNode.style.backgroundColor = "#000";
        cellNode.style.borderColor = "#fff";
      }
    }
    ship.remove();
  });
}

export function renderComputerMove() {
  const set = Player.playersArr[1].attackedCells;
  const iterator = set.values();

  set.forEach((coordinate) => {
    coordinate = iterator.next().value.split(",");
    const column = Number(coordinate[0]);
    const row = Number(coordinate[1]);
    const boardCellValue = getBoardValue(Player.playersArr[0], column, row);
    const cellNode = document.querySelector(`[data-row = "${row}"][data-column = "${column}"]`);

    changeColorCell(cellNode, boardCellValue);
  });
}

export function addBoardEventListeners() {
  const humanPlayer = Player.playersArr[0];
  const CPUPlayer = Player.playersArr[1];
  const ComputerBoardCells = document.querySelectorAll(".Computer");
  ComputerBoardCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (humanPlayer.board.allSunk() || CPUPlayer.board.allSunk()) {
        return;
      } else {
        playerTurn(Player.playersArr[1], e.target.dataset.column, e.target.dataset.row, e);
        removeEventListeners(e);
        computerTurn();
      }
    });
  });
}

export function removeEventListeners(e) {
  let newSubmit = e.target.cloneNode(true);
  e.target.parentNode.replaceChild(newSubmit, e.target);
}

export function dragDrop() {
  const shipContainer = document.querySelector("#ship-container");

  shipContainer.addEventListener("dragstart", dragStart);

  let ship = document.querySelector(".gameboard");
  ship.addEventListener("dragenter", dragEnter);
  ship.addEventListener("dragover", dragOver);
  ship.addEventListener("dragleave", dragLeave);
  ship.addEventListener("drop", drop);
}

export function assignDataAttributesToShips() {
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

export function rotateShip() {
  const ships = document.querySelectorAll(".horizontal");

  ships.forEach((ship) => {
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

export function resetBoardShipPlacement() {
  document.querySelector(".reset-board-button").addEventListener("click", () => {
    const placedShips = document.querySelectorAll(".dropped");
    placedShips.forEach((ship) => {
      ship.remove();
      ship.style.position = "";
    });
    document.querySelector("#ship-container").remove();
    document
      .querySelector(".right-container")
      .insertBefore(UI.placableShips(), document.querySelector(".buttons-container"));
    document.querySelector(".play-game-button").style.display = "none";
    Player.playersArr[0].board = new GameBoard();
    assignDataAttributesToShips();
    dragDrop();
    rotateShip();
  });
}

export function showPlayGameButton() {
  if (document.querySelector("#ship-container").children.length === 0) {
    document.querySelector(".play-game-button").style.display = "block";
  }
}

export function deleteButtonsAndContainers() {
  document.querySelector(".left-container").remove();
  document.querySelector(".right-container").remove();
}
