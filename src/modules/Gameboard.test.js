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
  test("Test placement of horizontal and vertical placement on the board", () => {
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
      testBoard.placeShip(testCarrier, [6, 5], "vertical");
    }).toThrow();
  });

  describe("Test the receive attack method", () => {
    test("Test if the ship is hit", () => {
      const testBoard = new GameBoard();
      const testDestroyer = new Ship(2);
      testBoard.placeShip(testDestroyer, [5, 5], "horizontal");

      expect(testBoard.receiveAttack(testDestroyer, [5, 5])).toBeTruthy();
      expect(testBoard.receiveAttack(testDestroyer, [5, 6])).toBeTruthy();
    });

    test("Test if hit is missed", () => {
      const testBoard = new GameBoard();
      const testBattleship = new Ship(4);
      testBoard.placeShip(testBattleship, [5, 3], "vertical");

      expect(testBoard.receiveAttack(testBattleship, [9, 3], "vertical")).toBeFalsy();
    });
  });

  describe("Test if all ships are sunk", () => {
    test("If all ships are sunk test does it return truthy", () => {
      const testBoard = new GameBoard();
      const testDestroyer = new Ship(2);
      const testCarrierShip = new Ship(5);
      testBoard.placeShip(testDestroyer, [5, 5], "horizontal");
      testBoard.receiveAttack(testDestroyer, [5, 5]);
      testBoard.receiveAttack(testDestroyer, [5, 6]);
      testBoard.placeShip(testCarrierShip, [0, 3], "vertical");
      testBoard.receiveAttack(testCarrierShip, [0, 3]);
      testBoard.receiveAttack(testCarrierShip, [1, 3]);
      testBoard.receiveAttack(testCarrierShip, [2, 3]);
      testBoard.receiveAttack(testCarrierShip, [3, 3]);
      testBoard.receiveAttack(testCarrierShip, [4, 3]);

      expect(testBoard.allSunk()).toBeTruthy();
    });
    test("If not all ships are sunk, expect for test to return falsy", () => {
      const testBoard = new GameBoard();
      const testDestroyer = new Ship(2);
      const testCarrierShip = new Ship(5);
      testBoard.placeShip(testDestroyer, [5, 5], "horizontal");
      testBoard.receiveAttack(testDestroyer, [5, 5]);
      testBoard.receiveAttack(testDestroyer, [5, 6]);

      testBoard.placeShip(testCarrierShip, [0, 3], "vertical");
      testBoard.receiveAttack(testCarrierShip, [0, 3]);
      testBoard.receiveAttack(testCarrierShip, [1, 3]);
      testBoard.receiveAttack(testCarrierShip, [2, 3]);
      testBoard.receiveAttack(testCarrierShip, [3, 3]);

      expect(testBoard.allSunk()).toBeFalsy();
    });
  });
});
