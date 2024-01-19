const toHtml = require("../util/toHtml");

export default class UI {
  static startingScreen = toHtml(`<div class="starting-screen-container">
<h3>PLAY AGAINST:</h3>
<button class = "play-against-button player-button" value = "Player">PLAYER</button>
<button class = "play-against-button computer-button" value = "Computer">COMPUTER</button>
</div>`);
  static createPlayerScreen = toHtml(`<div class="player-creation-container">
<h3>ENTER NAME OF THE PLAYER :</h3>
<input type="text" id = "input-player-name"  />
<button class="player-create-button">PLAY</button>
</div>`);

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
          } else {
            row.classList.add("Computer");
            gameBoard.classList.add("computer-player-board");
          }
        });
      }
    });
  };
}
