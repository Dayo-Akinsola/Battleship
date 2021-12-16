import Ship from './ship';
import GameBoard from './gameBoard';
import { ComputerPlayer } from './player';

describe('tests for Ship factory public interface', () => {

  test('should be false when only one position has been hit', () => {
    const coordinates = [ [1, 1], [2, 1], [3, 1], [4, 1] ];
    const ship = Ship(4, [1, 1], coordinates);
    ship.hit([1, 1]);
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk should return true when all positions have been hit', () => {
    const coordinates = [ [1, 1], [2, 1] ];
    const ship = Ship(2, [1, 1], coordinates);
    ship.hit([1, 1]);
    ship.hit([2, 1]);
    expect(ship.isSunk()).toBe(true);
  });

  test('isSunk should still be false when an invalid position is hit', () => {
    const coordinates = [ [3, 4], [4, 4] ];
    const ship = Ship(2, [3, 4], coordinates);
    ship.hit([3, 4]);
    ship.hit([6, 7]);
    expect(ship.isSunk()).toBe(false);
  });

  test('getShipCoordinates shoould return an array of coordinates for the ship', () => {
    const coordinates = [ [5, 5], [6, 5], [7, 5] ];
    const ship = Ship(coordinates.length, coordinates[0], coordinates);
    expect(ship.getShipCoordinates()).toEqual(coordinates);
  });

  test('rotateShip should make a horizontal ship vertical and a vertical one horizontal', () => {
    const gameBoard = GameBoard();
    const coordinates = [ [5, 5], [6, 5], [7, 5] ];
    gameBoard.placeShip(coordinates.length, coordinates[0], true);
    const horizontalShip = gameBoard.getLastCreatedShip();
    expect(horizontalShip.rotateShipIfPossible(gameBoard)).toBe(true);
    expect(horizontalShip.getShipCoordinates()).toEqual([ [5, 5], [5, 6], [5, 7] ]);
    expect(horizontalShip.rotateShipIfPossible(gameBoard)).toBe(true);
    expect(horizontalShip.getShipCoordinates()).toEqual([ [5, 5], [6, 5], [7, 5] ]);
  });

  test('rotateShip should return false and ship should be unchanged if the rotation would cause coordinates to be outside of the 10 x 10 grid', () => {
    const gameBoard = GameBoard();
    const coordinates = [ [9, 4], [9, 5], [9, 6], [9, 7] ];
    gameBoard.placeShip(coordinates.length, coordinates[0], false);
    const verticalShip = gameBoard.getLastCreatedShip();
    expect(verticalShip.rotateShipIfPossible(gameBoard)).toBe(false);
    expect(verticalShip.getShipCoordinates()).toEqual([ [9, 4], [9, 5], [9, 6], [9, 7] ]);
  });
});

describe('tests for GameBoard factory public interface', () => {

  const newGameBoard = GameBoard();
  const length = 4;

  test('placeShip should create a ship with accurate coordinates', () => {
    const startCoordinates = [0, 3];
    const placedShip = newGameBoard.placeShip(length, startCoordinates, true);
    expect(placedShip).toBe(true);
  });

  test('placeShip returns false with invalid coordinates', () => {
    const startCoordinates = [9, 9];  
    const placedShip = newGameBoard.placeShip(length, startCoordinates, true);
    expect(placedShip).toBe(false);
  });

  test('receiveAttack returns true when coordinates match a ships coordinates', () => {
    const startCoordinates = [5, 1];
    newGameBoard.placeShip(length, startCoordinates, true);  
    const attackOne = newGameBoard.receiveAttack([5, 1]);
    const attackTwo = newGameBoard.receiveAttack([2, 4]);
    expect(attackOne).toBe(true);
    expect(attackTwo).toBe(false);
  });

  test('isGameOver should return true when all the ships have been sunk', () => {
    for (let i = 0; i < 4; i += 1) {
      newGameBoard.receiveAttack([i, 3]);
    }

    expect(newGameBoard.isGameOver()).toBe(false);

    for (let i = 5; i <= 8; i += 1) {
      newGameBoard.receiveAttack([i, 1]);
    }

    expect(newGameBoard.isGameOver()).toBe(true);
  });

  test('isPositionFreeToAttack should return true if the coordinates have not been shot at already', () => {
    expect(newGameBoard.isPositionFreeToAttack([8, 1])).toBe(false);
    expect(newGameBoard.isPositionFreeToAttack([6, 7])).toBe(true);
  });

  test('getAllCoordiantes should return an array of ship coordinates for a board', () => {
    expect(newGameBoard.getAllCoordinates()).toEqual([ [0, 3], [1, 3], [2, 3], [3, 3], [5, 1], [6, 1], [7, 1], [8, 1] ]);
  });

  test('clearBoard should remove all ship instances from a game board', () => {
    newGameBoard.clearBoard();
    expect(newGameBoard.getAllCoordinates()).toEqual([]);
  });

  test('vertical ship test', () => {
    newGameBoard.placeShip(4, [3, 4], false);
    expect(newGameBoard.receiveAttack([3, 5])).toBe(true);
    expect(newGameBoard.receiveAttack([3, 6])).toBe(true);
    expect(newGameBoard.receiveAttack([4, 4])).toBe(false);
  });

  test('removeSunkShip should return a ship that has sunk or false if there is none', () => {
    expect(newGameBoard.removeSunkShip()).toBe(false);
    newGameBoard.receiveAttack([3, 4]);
    newGameBoard.receiveAttack([3, 7]);
    expect(newGameBoard.removeSunkShip().isSunk()).toBe(true);
  });
});

describe('new ships with the same or adjacent coordinates to  already placed ships should not be placed', () => {

  test('a coordinate directly above, below, or beside a ship should return false', () => {
    const gameBoard = GameBoard();
    gameBoard.placeShip(5, [2, 3], true);
    expect(gameBoard.placeShip(2, [7, 9], true)).toBe(true);
    expect(gameBoard.placeShip(3, [3, 3], true)).toBe(false);
    expect(gameBoard.placeShip(5, [2, 4], true)).toBe(false);
    expect(gameBoard.placeShip(5, [1, 4], true)).toBe(false);
  });

  test('coordinates directly diagonal to a ship should return true', () => {
    const gameBoard = GameBoard();
    gameBoard.placeShip(4, [5, 5]);
    expect(gameBoard.placeShip(1, [4, 4], true)).toBe(false);
    expect(gameBoard.placeShip(1, [4, 6], true)).toBe(false);
    expect(gameBoard.placeShip(1, [6, 4], true)).toBe(false);
    expect(gameBoard.placeShip(1, [7, 8], true)).toBe(true);
    expect(gameBoard.placeShip(1, [6, 6], true)).toBe(false);
  
  })
})

describe('tests for Player public interface', () => {
  test('pickCoordinates should only pick legal coordinates', () => {
    const humanBoard = GameBoard();
    const computer = ComputerPlayer();

    computer.attackEnemyBoard(humanBoard, [4, 4]);
    
    /*
      runs 10000 times to make sure that an already attacked coordinate
      is never picked
    */
    for (let i = 0; i <= 10000; i += 1) {
      const computerCoordinates = computer.pickCoordinates(humanBoard);
      expect(computerCoordinates[0]).toBeLessThan(10);
      expect(computerCoordinates[1]).toBeLessThan(10);
      expect(computerCoordinates).not.toEqual([4, 4]);
    }

  });
});

describe('tests to ensure that AI is making decisions based on the game state', () => {
  test('after hitting a ship the AI should check adjacent coordinates', () => {
    const computer = ComputerPlayer();
    const gameBoard = GameBoard();
    const coordinates = [ [4, 5], [4, 6], [4, 7], [4, 8] ];
    gameBoard.placeShip(coordinates.length, coordinates[0], false);
    computer.attackEnemyBoard(gameBoard, [4, 5]);
    const leftCoordinates = computer.pickCoordinates(gameBoard);
    expect(leftCoordinates).toEqual([3, 5]); 
    computer.attackEnemyBoard(gameBoard, leftCoordinates);

    const rightCoordinates = computer.pickCoordinates(gameBoard);
    expect(rightCoordinates).toEqual([5, 5]); 
    computer.attackEnemyBoard(gameBoard, rightCoordinates);

    const upCoordinates = computer.pickCoordinates(gameBoard);
    expect(upCoordinates).toEqual([4, 4]); 
    computer.attackEnemyBoard(gameBoard, upCoordinates);

    const downCoordinates = computer.pickCoordinates(gameBoard);
    expect(downCoordinates).toEqual([4, 6]); 
  });

  test('AI should go through adjacent positions until it has sunk a ship (horizontal)', () => {
    const computer = ComputerPlayer();
    const gameBoard = GameBoard();
    const coordinates = [ [4, 4], [5, 4], [6, 4], [7, 4], [8, 4] ];
    gameBoard.placeShip(coordinates.length, coordinates[0], true);
    computer.attackEnemyBoard(gameBoard, [6, 4]);

    let attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([5, 4]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([4, 4]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([3, 4]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([7, 4]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([8, 4]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);
  });

  test('AI should go through adjacent positions until it has sunk a ship (vertical)', () => {
    const computer = ComputerPlayer();
    const gameBoard = GameBoard();
    const coordinates = [ [4, 4], [4, 5], [4, 6], [4, 7], [4, 8] ];
    gameBoard.placeShip(coordinates.length, coordinates[0], false);
    computer.attackEnemyBoard(gameBoard, [4, 6]);  

    let attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([3, 6]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([5, 6]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([4, 5]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([4, 4]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([4, 3]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([4, 7]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([4, 8]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);
  });

  test('AI should skip over adjacent coordinates that are invalid (horizontal)', () => {
    const computer = ComputerPlayer();
    const gameBoard = GameBoard();
    const coordinates = [ [0, 3], [1, 3], [2, 3], [3, 3], [4, 3] ];
    gameBoard.placeShip(coordinates.length, coordinates[0], true);
    computer.attackEnemyBoard(gameBoard, [0, 3]);  

    const attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([1, 3]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

  });

  test('AI should skip over adjacent coordinates that are invalid (vertical)', () => {
    const computer = ComputerPlayer();
    const gameBoard = GameBoard();
    const coordinates = [ [4, 0], [4, 1], [4, 2], [4, 3], [4, 4] ];
    gameBoard.placeShip(coordinates.length, coordinates[0], false);
    computer.attackEnemyBoard(gameBoard, [4, 0]);  

    let attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([3, 0]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([5, 0]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

    attackCoordinates = computer.pickCoordinates(gameBoard);
    expect(attackCoordinates).toEqual([4, 1]); 
    computer.attackEnemyBoard(gameBoard, attackCoordinates);

  });
});
