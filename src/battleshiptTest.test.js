import Ship from './ship';
import GameBoard from './gameBoard';
import { ComputerPlayer } from './player';

describe('tests for Ship factory public interface', () => {

  test('should be false when only one position has been hit', () => {
    const coordinates = [ [1, 1], [2, 1], [3, 1], [4, 1] ];
    const ship = Ship(4, coordinates);
    ship.hit([1, 1]);
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk should return true when all positions have been hit', () => {
    const coordinates = [ [1, 1], [2, 1] ];
    const ship = Ship(2, coordinates);
    ship.hit([1, 1]);
    ship.hit([2, 1]);
    expect(ship.isSunk()).toBe(true);
  });

  test('isSunk should still be false when an invalid position is hit', () => {
    const coordinates = [ [3, 4], [4, 4] ];
    const ship = Ship(2, coordinates);
    ship.hit([3, 4]);
    ship.hit([6, 7]);
    expect(ship.isSunk()).toBe(false);
  });
});

describe('tests for GameBoard factory public interface', () => {

  const newGameBoard = GameBoard();
  const length = 4;

  test('placeShip should create a ship with accurate coordinates', () => {
    const startCoordinates = [0, 3];
    const placedShip = newGameBoard.placeShip(length, startCoordinates);
    expect(placedShip).toBe(true);
  });

  test('placeShip returns false with invalid coordinates', () => {
    const startCoordinates = [9, 3];  
    const placedShip = newGameBoard.placeShip(length, startCoordinates);
    expect(placedShip).toBe(false);
  });

  test('receiveAttack returns true when coordinates match a ships coordinates', () => {
    const startCoordinates = [5, 1];
    newGameBoard.placeShip(length, startCoordinates);  
    const attackOne = newGameBoard.receiveAttack([8, 1]);
    const attackTwo = newGameBoard.receiveAttack([2, 4]);
    expect(attackOne).toBe(true);
    expect(attackTwo).toBe(false);
  });

  test('isGameOver should return true when all the ships have been sunk', () => {
    for (let i = 0; i < 4; i += 1) {
      newGameBoard.receiveAttack([i, 3]);
    }

    expect(newGameBoard.isGameOver()).toBe(false);

    for (let i = 5; i < 8; i += 1) {
      newGameBoard.receiveAttack([i, 1]);
    }

    expect(newGameBoard.isGameOver()).toBe(true);
  });

  test('isPositionFree should return true if the coordinates have not been shot at already', () => {
    expect(newGameBoard.isPositionFree([8, 1])).toBe(false);
    expect(newGameBoard.isPositionFree([6, 7])).toBe(true);
  });

});

describe('tests for Player public interface', () => {
  test('pickRandomCoordinates should only pick legal coordinates', () => {
    const humanBoard = GameBoard();
    const computer = ComputerPlayer();

    computer.attackEnemyBoard(humanBoard, [4, 4]);
    
    /*
      runs 10000 times to make sure that an already attacked coordinate
      is never picked
    */
    for (let i = 0; i <= 10000; i += 1) {
      const computerCoordinates = computer.pickRandomCoordinates(humanBoard);
      expect(computerCoordinates[0]).toBeLessThan(10);
      expect(computerCoordinates[1]).toBeLessThan(10);
      expect(computerCoordinates).not.toEqual([4, 4]);
    }

  });
});