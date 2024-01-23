const { Player, CPU } = require("./Player");
const Ship = require("./Ship");

describe("Test creations of players", () => {
  test("Check if the object has all of the properties", () => {
    const player1 = new Player("John", true);

    expect(player1).toHaveProperty("name");
    expect(player1).toHaveProperty("active");
  });
});

describe("Test player placement of ships", () => {
  test("John puts a destroyer on the board", () => {
    const player1 = new Player("John", true);
    const testCarrier = new Ship(5);
    const testBattleship = new Ship(4);

    player1.board.placeShip(testCarrier, [0, 5], "vertical");

    expect(player1.board.grid[0][5]).not.toBe(null);
    expect(player1.board.grid[1][5]).not.toBe(null);
    expect(player1.board.grid[2][5]).not.toBe(null);
    expect(player1.board.grid[3][5]).not.toBe(null);
    expect(player1.board.grid[4][5]).not.toBe(null);

    expect(player1.board.grid[0][5]).toBeInstanceOf(Ship);
    expect(player1.board.grid[1][5]).toBeInstanceOf(Ship);
    expect(player1.board.grid[2][5]).toBeInstanceOf(Ship);
    expect(player1.board.grid[3][5]).toBeInstanceOf(Ship);
    expect(player1.board.grid[4][5]).toBeInstanceOf(Ship);
  });
});

describe("Test for the CPU ", () => {
  test("See if the CPU can place ship at random cells on the board", () => {
    const testComputerPlayer = new CPU();
    const placeShipSpy = jest.spyOn(CPU.prototype, "placeShip");
    const testCarrier = new Ship(5);
    const testBattleship = new Ship(4);
    const testCruiser = new Ship(3);
    const testSubmarine = new Ship(3);
    const testDestroyer = new Ship(2);

    testComputerPlayer.randomShipPlace(testCarrier);
    testComputerPlayer.randomShipPlace(testCruiser);
    testComputerPlayer.randomShipPlace(testDestroyer);
    testComputerPlayer.randomShipPlace(testBattleship);
    testComputerPlayer.randomShipPlace(testSubmarine);

    expect(placeShipSpy).toHaveBeenCalled();
  });

  test("Check if CPU placed all of ships on the board", () => {
    const testComputerPlayer = new CPU();
    const testCarrier = new Ship(5);
    const testBattleship = new Ship(4);
    const testCruiser = new Ship(3);
    const testSubmarine = new Ship(3);
    const testDestroyer = new Ship(2);

    testComputerPlayer.randomShipPlace(testCarrier);
    testComputerPlayer.randomShipPlace(testCruiser);
    testComputerPlayer.randomShipPlace(testDestroyer);
    testComputerPlayer.randomShipPlace(testBattleship);
    testComputerPlayer.randomShipPlace(testSubmarine);

    expect(testComputerPlayer.board.ships).toContain(
      testCarrier,
      testBattleship,
      testCruiser,
      testDestroyer,
      testSubmarine
    );
  });

  test("CPU makes a random attack", () => {
    const testComputerPlayer = new CPU();
    const attackSpy = jest.spyOn(CPU.prototype, "attack");
    testComputerPlayer.randomAttack(null);

    expect(attackSpy).toHaveBeenCalled();
  });
});
