const toHtml = require("../util/toHtml");

export default class UI {
  static startingScreen = toHtml(`    <dialog open class="modal" id="modal">
<h3>PLAY AGAINST:</h3>
<button class = "play-against-button player-button" value = "Player">PLAYER</button>
<button class = "play-against-button computer-button" value = "Computer">COMPUTER</button>
</dialog>`);
  static startingModalAgainstComputer = toHtml(`
  <dialog open class = "modal cpu-game" id = "modal">
  <div class="player-creation-container">
<h3>ENTER NAME OF THE PLAYER :</h3>
<form>
<input type="text" id = "input-player-name" required  />
<button class="player-create-button" type="submit">PLAY</button>
</div>
</form>
</dialog>
`);

  static startingModalAgainstAnotherPlayer = toHtml(`
<dialog open class = "modal p-vs-p-game" id = "modal">
<div class="player-creation-container">
<h3>ENTER THE NAME OF THE PLAYERS :</h3>
<form>
<input type="text" id = "input-player-name" required  />
<input type="text" id = "input-player-two-name" required  />
<button class="player-create-button" type="submit">PLAY</button>
</div>
</form>
</dialog>
`);

  static createBoards = (board, type) => {
    const gameBoard = document.createElement("div");
    gameBoard.classList.add("gameboard");
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
          } else if (type === "humanBoard-two") {
            row.classList.add("Human-Two");
            gameBoard.classList.add("human-player-two-board");
          } else {
            row.classList.add("Computer");
            gameBoard.classList.add("computer-player-board");
          }
        });
      }
    });
  };
}
