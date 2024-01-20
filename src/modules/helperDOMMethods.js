import Ship from "./Ship";
import UI from "./UI";
import { Player } from "./Player";
import dragula from "dragula";
import { computerTurn, playerTurn, switchTurn } from "./gameLoop";

export function appendStartingScreen(value) {
  document.querySelector(".modal").remove();
  if (value === "Computer") {
    console.log("run");
    document.querySelector("body").appendChild(UI.startingModalAgainstComputer);
  } else {
  }
}
export function getBoardValue(player, column, row) {
  return player.board.grid[column][row];
}
export function changeColorCell(e, cell) {
  if (cell instanceof Ship) e.style.background = "red";
  else e.style.background = "#4e4d4d";
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
  document.querySelector("dialog").remove();
  console.log("running");
  const ComputerBoardCells = document.querySelectorAll(".Computer");
  ComputerBoardCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      console.log(playerTurn(Player.playersArr[1], e.target.dataset.column, e.target.dataset.row, e));
      console.log(e.target);
      removeBoardEventListeners(e);
      computerTurn();
      switchTurn();
    });
  });
}

export function removeBoardEventListeners(e) {
  let newSubmit = e.target.cloneNode(true);
  e.target.parentNode.replaceChild(newSubmit, e.target);
}

export function dragDrop() {
  const shipContainer = document.querySelector("#ship-container");
  const container = document.querySelector("#drop-target");
  console.log(shipContainer);
  dragula([shipContainer, container]);
}
