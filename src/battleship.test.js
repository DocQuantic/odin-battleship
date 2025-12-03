const ship = require("./Modules/ship");
const gameboard = require("./Modules/gameboard");

test("Ship object", () => {
  const testShip = new ship.Ship(3)
  expect(testShip.length).toBe(3);
  expect(testShip.timesHit).toBe(0);
  expect(testShip.isSunk()).toBe(false);

  testShip.hit();
  expect(testShip.timesHit).toBe(1);
  expect(testShip.isSunk()).toBe(false);

  testShip.hit();
  expect(testShip.timesHit).toBe(2);
  expect(testShip.isSunk()).toBe(false);

  testShip.hit();
  expect(testShip.timesHit).toBe(3);
  expect(testShip.isSunk()).toBe(true);
});

test("Gameboard object", () => {
  const testBoard = new gameboard.Gameboard()

  expect(testBoard.width).toBe(10)
  expect(testBoard.height).toBe(10)
  expect(testBoard.grid[0][0]).toBeNull()
  expect(testBoard.grid[5][5]).toBeNull()
  expect(testBoard.grid[9][9]).toBeNull()


  const ship1 = new ship.Ship(3)
  testBoard.placeShip(ship1, [0, 0], "x")
  expect(testBoard.grid[0][0]).toEqual(ship1)
  expect(testBoard.grid[0][1]).toEqual(ship1)
  expect(testBoard.grid[0][2]).toEqual(ship1)

  const ship2 = new ship.Ship(3)
  testBoard.placeShip(ship2, [1, 0], "x")
  expect(testBoard.grid[1][0]).toEqual(ship2)
  expect(testBoard.grid[1][1]).toEqual(ship2)
  expect(testBoard.grid[1][2]).toEqual(ship2)

  const ship3 = new ship.Ship(3)
  testBoard.placeShip(ship3, [5, 5], "y")
  expect(testBoard.grid[5][5]).toEqual(ship3)
  expect(testBoard.grid[6][5]).toEqual(ship3)
  expect(testBoard.grid[7][5]).toEqual(ship3)

  testBoard.receiveAttack([5, 5])
  expect(ship3.timesHit).toBe(1)
  testBoard.receiveAttack([6, 6])
  expect(testBoard.grid[6][6]).toBe(0)

  testBoard.receiveAttack([0, 0])
  testBoard.receiveAttack([0, 1])
  testBoard.receiveAttack([0, 2])
  expect(testBoard.ships[0].isSunk()).toBeTruthy()
  expect(testBoard.ships[1].isSunk()).toBeFalsy()
  expect(testBoard.ships[2].isSunk()).toBeFalsy()
  expect(testBoard.sunkShips).toBe(1)
  expect(testBoard.isGameOver).toBeFalsy()
  testBoard.receiveAttack([1, 0])
  testBoard.receiveAttack([1, 1])
  testBoard.receiveAttack([1, 2])
  expect(testBoard.ships[0].isSunk()).toBeTruthy()
  expect(testBoard.ships[1].isSunk()).toBeTruthy()
  expect(testBoard.ships[2].isSunk()).toBeFalsy()
  expect(testBoard.sunkShips).toBe(2)
  expect(testBoard.isGameOver).toBeFalsy()
  testBoard.receiveAttack([5, 5])
  testBoard.receiveAttack([6, 5])
  testBoard.receiveAttack([7, 5])
  expect(ship3.isSunk).toBeTruthy()
  expect(testBoard.ships[0].isSunk()).toBeTruthy()
  expect(testBoard.ships[1].isSunk()).toBeTruthy()
  expect(testBoard.ships[2].isSunk()).toBeTruthy()
  expect(testBoard.sunkShips).toBe(3)
  expect(testBoard.isGameOver).toBeTruthy()

})
