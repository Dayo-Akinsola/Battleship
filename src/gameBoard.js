import Ship from "./ship";

const GameBoard = () => {
  const placedShips = [];
  const missedAttacks = [];
  const hitAttacks = [];
  const boardWidth = 10;
  const boardHeight = 10;

  const placeShip = (length, startCoordinates) => {
    const shipCoordinates = [];
    for (let i = 0; i < length; i += 1) {
      if (startCoordinates[0] + 1 >= boardWidth || startCoordinates[1] >= boardHeight) {
        return false;
      }
      shipCoordinates.push([startCoordinates[0] + i, startCoordinates[1]]);
    }

    const ship = new Ship(length, shipCoordinates);
    placedShips.push(ship);
    return true;
  }

  const receiveAttack = (attackCoordinates) => {
    const attackedShip = placedShips.filter((ship) => ship.hasCoordinates(attackCoordinates));
    if (attackedShip.length === 1) {
      hitAttacks.push(attackCoordinates);
      attackedShip[0].hit(attackCoordinates);
      return true;
    } 
    missedAttacks.push(attackCoordinates);
    return false;
  }

  const isGameOver = () => placedShips.every((placedShip) => placedShip.isSunk());

  const isPositionFree = (attackCoordinates) => {
    const positionCheck = (coordinates) => {
      if (coordinates[0] !== attackCoordinates[0] || coordinates[1] !== attackCoordinates[1]) {
        return true;
      }
      return false;
    }
    const freePosition = missedAttacks.every(positionCheck) && hitAttacks.every(positionCheck);
    return freePosition;

  } 

  return {
    placeShip,
    receiveAttack,
    isGameOver,
    isPositionFree,
  }
}

export default GameBoard;