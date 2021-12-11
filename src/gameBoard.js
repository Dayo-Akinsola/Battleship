import Ship from "./ship";

const GameBoard = () => {
  let placedShips = [];
  let missedAttacks = [];
  let hitAttacks = [];
  const boardWidth = 10;
  const boardHeight = 10;

  /* Checks the coordinates of placed ships to see if the parameter coordinates match */
  const isPositionOccupied = (coordinates) => {
    let placedShipCoordinates = placedShips.map((ship) => ship.shipCoordinates);
    placedShipCoordinates = [].concat(...placedShipCoordinates);
    let matchFound = false;
    placedShipCoordinates.forEach((shipCoordinates) => {
      if (shipCoordinates[0] === coordinates[0] && shipCoordinates[1] === coordinates[1]) {
        matchFound = true;
      }
    });

    return matchFound;
  }

  /* 
    Checks if the coordinates of a ship about to be placed is next to the coordinates
    of a ship that is already on the board.
  */
  const isAdjacent = (coordinates) => {
    let placedShipCoordinates = placedShips.map((ship) => ship.shipCoordinates);
    placedShipCoordinates = [].concat(...placedShipCoordinates);
    const checkX = (shipXCoordinate) => {
      if (
        shipXCoordinate === coordinates[0] || 
        shipXCoordinate === coordinates[0] - 1 || 
        shipXCoordinate === coordinates[0] + 1
      ) {
        return true;
      }
      return false;
    }
    const checkY = (shipYCoordinate) => {
      if (
        shipYCoordinate === coordinates[1] || 
        shipYCoordinate === coordinates[1] - 1 || 
        shipYCoordinate === coordinates[1] + 1
      ) {
        return true;
      }
      return false;
    }

    const nonAdjacentCoordinates = placedShipCoordinates.filter((shipCoordinates) => {
      if (!checkX(shipCoordinates[0]) || !checkY(shipCoordinates[1])) {
        return true;
      }
      return false;
    });

    if (nonAdjacentCoordinates.length === placedShipCoordinates.length) {
      return false;
    }

    return true;
  }

  /* 
    Places a ship on the board after checking that the ship's coordinates are within the board 
    and that another ship is not already at the coordinates the new ship wants to occupy 
  */
  const placeShip = (length, startCoordinates) => {
    const shipCoordinates = [];
    for (let i = 0; i < length; i += 1) {
      if (startCoordinates[0] + i >= boardWidth || startCoordinates[1] >= boardHeight) {
        return false;
      }
      shipCoordinates.push([startCoordinates[0] + i, startCoordinates[1]]);
    }
    const availiableCoordinates = shipCoordinates.filter((coordinates) => {
      if (isPositionOccupied(coordinates) || isAdjacent(coordinates)) {
        return false;
      }
      return true;
    });

    if (availiableCoordinates.length !== length) {
      return false;
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

  const isPositionFreeToAttack = (attackCoordinates) => {
    const positionCheck = (coordinates) => {
      if (coordinates[0] !== attackCoordinates[0] || coordinates[1] !== attackCoordinates[1]) {
        return true;
      }
      return false;
    }
    const freePosition = missedAttacks.every(positionCheck) && hitAttacks.every(positionCheck);
    return freePosition;
  } 

  const getAllCoordinates = () => {
    const allCoordinates = placedShips.map((ship) =>  ship.shipCoordinates);
    return [].concat(...allCoordinates);
  }

  const clearBoard = () => {
    placedShips.forEach((ship) => {
      const shipIndex = placedShips.indexOf(ship);
      placedShips[shipIndex] = null;
    });
    placedShips = [];
    missedAttacks = [];
    hitAttacks = [];
  }

  const populateBoard = () => {
    clearBoard();
    let shipsPlaced = 0;
    let length = 5;
    while (shipsPlaced < 10) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      const placedShip = placeShip(length, [randomX, randomY]);
      if (placedShip) {
        shipsPlaced += 1;
      }

      switch (shipsPlaced) {
        case 1:
          length = 4;
          break;
        case 3:
          length = 3;
          break;
        case 6:
          length = 2;
          break;
        default:
          break;
      }
    }
  }


  return {
    placeShip,
    receiveAttack,
    isGameOver,
    isPositionFreeToAttack,
    getAllCoordinates,
    clearBoard,
    isPositionOccupied,
    populateBoard,
    isAdjacent,
  }
}

export default GameBoard;