const Ship = require("./Ship");

describe("Test if the ship object is initialized properly", () => {
  test("Check if the object has all of the properties", () => {
    const exampleShip = new Ship(4);
    expect(exampleShip).toHaveProperty("length");
    expect(exampleShip).toHaveProperty("numberOfHits");
    expect(exampleShip).toHaveProperty("isSunk");
  });

  test("Check if the length is right", () => {
    const exampleShip = new Ship(4);
    const exampleShip2 = new Ship(6);
    expect(exampleShip).toHaveLength(4);
    expect(exampleShip2).toHaveLength(6);
  });

  test("Check if the number of hits is zero", () => {
    const exampleShip = new Ship(4);
    expect(exampleShip.numberOfHits).toBe(0);
  });

  test("Check if isSunk false", () => {
    const exampleShip = new Ship(4);
    expect(exampleShip.isSunk).toBeFalsy();
  });
});

describe("Test if the hit method on the Ship object class is working", () => {
  test("See if the number of hits on the ship Object", () => {
    const exampleShip = new Ship(4);
    exampleShip.hit();
    expect(exampleShip.numberOfHits).toBe(1);
    exampleShip.hit();
    exampleShip.hit();
    expect(exampleShip.numberOfHits).toBe(3);
  });
});

describe("Test if the isSunk method works in the Ship object", () => {
  test("See if the  isSunk method is working if the number of hits is equal to length of the ship", () => {
    const exampleShip = new Ship(4);
    exampleShip.hit();
    exampleShip.hit();
    exampleShip.hit();
    exampleShip.hit();
    exampleShip.isItSunk();
    expect(exampleShip.isSunk).toBeTruthy();
  });
});
