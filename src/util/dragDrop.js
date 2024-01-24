import { Player } from "../modules/Player";
import { removeEventListeners } from "../modules/helperDOMMethods";

export function dragEnter(e) {
  e.preventDefault();
}

export function dragOver(e) {
  e.preventDefault();
}

export function dragLeave(e) {}

export function drop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);
  const playerShip = Player.createPlayerShip(Number(draggable.dataset.length));
  draggable.setAttribute("data-column", e.target.dataset.column);
  draggable.setAttribute("data-row", e.target.dataset.row);
  try {
    Player.playersArr[0].placeShip(
      playerShip,
      [Number(e.target.dataset.column), Number(e.target.dataset.row)],
      draggable.dataset.orientation
    );
    console.log(Player.playersArr[0].board.grid);
  } catch (e) {
    console.log(e);
    return e;
  }
  console.log(Player.playersArr[0].board.grid);
  e.target.appendChild(draggable);

  draggable.classList.add("dropped");
  draggable.style.position = "absolute";
  draggable.setAttribute("draggable", "");

  removeEventListeners(e);
}
export function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}
