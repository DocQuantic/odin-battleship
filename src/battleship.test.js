const ship = require("./ship");

test("Ship object returns length, number of times hit and whether or not it sunk", () => {
  const testShip = new ship.Ship(3)
  expect(testShip.length).toBe(3);
  expect(testShip.timesHit).toBe(0);
  expect(testShip.sunk).toBe(false);

  testShip.hit();
  expect(testShip.timesHit).toBe(1);
  expect(testShip.sunk).toBe(false);

  testShip.hit();
  expect(testShip.timesHit).toBe(2);
  expect(testShip.sunk).toBe(false);

  testShip.hit();
  expect(testShip.timesHit).toBe(3);
  expect(testShip.sunk).toBe(true);
});
