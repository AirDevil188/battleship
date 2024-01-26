const toHtml = require("../util/toHtml");

export default class UI {
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

  static winnerScreen = (name) => {
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
