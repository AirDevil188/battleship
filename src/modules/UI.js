const toHtml = require("../util/toHtml");

export default class UI {
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

  static placableShips = () => {
    return toHtml(`<div id = ship-container>
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
  static playAndResetButtons = () => {
    const buttonsContainer = document.createElement("div");
    const playGameButton = document.createElement("button");
    const resetBoardButton = document.createElement("button");

    buttonsContainer.classList.add("buttons-container");
    playGameButton.classList.add("play-game-button");
    resetBoardButton.classList.add("reset-board-button");

    playGameButton.textContent = "Play The Game";
    resetBoardButton.textContent = "Reset Board";
    document.querySelector(".main-content").appendChild(buttonsContainer);
    buttonsContainer.appendChild(playGameButton);
    buttonsContainer.appendChild(resetBoardButton);

    return buttonsContainer;
  };
}
