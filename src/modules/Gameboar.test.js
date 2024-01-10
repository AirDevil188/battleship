const GameBoard = require("./Gameboard");
const Ship = require("./Ship");

describe("Test the creation of the game board", () => {
  test("Creation of the board", () => {
    const expectedBoard = {
      grid: Array(10)
        .fill(null)
        .map(() => Array(10).fill(null)),
    };
    const gameBoard = new GameBoard();

    expect(gameBoard).toMatchObject(expectedBoard);
  });
});

describe("Test placement of ships on the game board", () => {
  test("Test placement of horizontal and vertical placment on the board", () => {
    let testBoard = new GameBoard();
    let testCarrier = new Ship(5);
    let testBattleship = new Ship(4);
    testBoard.placeShip(testCarrier, [0, 5], "vertical");
    testBoard.placeShip(testBattleship, [6, 6], "horizontal");
    expect(testBoard).toEqual(
      expect.objectContaining({
        grid: [
          [
            null,
            null,
            null,
            null,
            null,
            {
              length: 5,
              numberOfHits: 0,
              isSunk: false,
            },
            null,
            null,
            null,
            null,
          ],
          [
            null,
            null,
            null,
            null,
            null,
            {
              length: 5,
              numberOfHits: 0,
              isSunk: false,
            },
            null,
            null,
            null,
            null,
          ],
          [
            null,
            null,
            null,
            null,
            null,
            {
              length: 5,
              numberOfHits: 0,
              isSunk: false,
            },
            null,
            null,
            null,
            null,
          ],
          [
            null,
            null,
            null,
            null,
            null,
            {
              length: 5,
              numberOfHits: 0,
              isSunk: false,
            },
            null,
            null,
            null,
            null,
          ],
          [
            null,
            null,
            null,
            null,
            null,
            {
              length: 5,
              numberOfHits: 0,
              isSunk: false,
            },
            null,
            null,
            null,
            null,
          ],
          [null, null, null, null, null, null, null, null, null, null],
          [
            null,
            null,
            null,
            null,
            null,
            null,
            {
              length: 4,
              numberOfHits: 0,
              isSunk: false,
            },
            {
              length: 4,
              numberOfHits: 0,
              isSunk: false,
            },
            {
              length: 4,
              numberOfHits: 0,
              isSunk: false,
            },
            {
              length: 4,
              numberOfHits: 0,
              isSunk: false,
            },
          ],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
        ],
      })
    );
  });

  test("Test out of bounds error", () => {
    const testBoard = new GameBoard();
    const testCarrier = new Ship(5);
    expect(() => {
      testBoard.placeShip(testCarrier, [5, 5], "vertical");
    }).toThrow();
  });
});
