const fs = require('fs');
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require('../lib/zookeepers');
const {zookeepers} = require('../data/zookeepers');
jest.mock('fs');

test("creates an zooKeeper object", () => {
  const zooKeeper = createNewZookeeper(
    {name: "Darlene", id: "fad"},
    zookeepers
  );
  expect(zooKeeper.name).toBe("Darlene");
  expect(zooKeeper.id).toBe("fad");
});

test("filters by query", () => {
  const StartingZookepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const updatedZookeepers = filterByQuery({ age:31 }, StartingZookepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookepers = [
    {
      id: "2",
      name: "Raksha",
      age: "31",
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const result = findById("3", startingZookepers);

  expect(result.name).toBe("Isabella");
});

test("validate age", () => {
  const zookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
    };
    const invalidZookeeper = {
      id: "3",
      name: "Isabella",
      age: "67",
      favoriteAnimal: "bear",
    };
  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});