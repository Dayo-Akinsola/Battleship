import Ship from "./ship";

const GameBoard = () => {
  let placedShips = [];
  let missedAttacks = [];
  let hitAttacks = [];
  const boardWidth = 10;
  const boardHeight = 10;

  /* 
    Checks if the coordinates of a ship about to be placed is next to or on the coordinates
    of a ship that is already on the board.
  */
  const isAdjacent = (coordinates, ships) => {
    let allShipCoordinates = ships.map((ship) => ship.getShipCoordinates());
    allShipCoordinates = [].concat(...allShipCoordinates);
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

    const nonAdjacentCoordinates = allShipCoordinates.filter((shipCoordinates) => {
      if (!checkX(shipCoordinates[0]) || !checkY(shipCoordinates[1])) {
        return true;
      }
      return false;
    });

    if (nonAdjacentCoordinates.length === allShipCoordinates.length) {
      return false;
    }

    return true;
  }

  const rotationChoice = () => {
    const choices = [true, false];
    const randomIndex = Math.floor(Math.random() * 2);
    return choices[randomIndex];
  }

  /* 
    Places a ship on the board after checking that the ship's coordinates are within the board 
    and that another ship is not already at the coordinates the new ship wants to occupy 
  */
  const isPositionAvailiable = (length, startCoordinates, rotation, ships) => {
    const shipCoordinates = [];
    for (let i = 0; i < length; i += 1) {
      if (rotation) {
        /* If ship is horizontal */
        if (startCoordinates[0] + i >= boardWidth || startCoordinates[1] >= boardHeight) {
          return false;
        }
        shipCoordinates.push([startCoordinates[0] + i, startCoordinates[1]]);
      } else {
        /* If ship is vertical */
        if (startCoordinates[0] >= boardWidth || startCoordinates[1] + i >= boardHeight) {
          return false;
        }
        shipCoordinates.push([startCoordinates[0], startCoordinates[1] + i]);
      }
    }
    const availiableCoordinates = shipCoordinates.filter((coordinates) => {
      if (isAdjacent(coordinates, ships)) {
        return false;
      }
      return true;
    });

    if (availiableCoordinates.length !== length) {
      return false;
    }
    return shipCoordinates;
  }

  const placeShip = (length, startCoordinates, rotation) => {
    const shipCoordinates = isPositionAvailiable(length, startCoordinates, rotation, placedShips);
    if (shipCoordinates) {
      const ship = new Ship(length, startCoordinates, shipCoordinates);
      placedShips.push(ship);
      return true;
    } 
    return false;
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
    const allCoordinates = placedShips.map((ship) =>  ship.getShipCoordinates());
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
    let i = 0;
    while (shipsPlaced < 10) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      const rotation = rotationChoice();
      const placedShip = placeShip(length, [randomX, randomY], rotation);
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

      i += 1;
      /*
        There are some cases where it is impossible to place another ship due to the board layout resulting
        in a infinite loop. i is here to detect an infinite loop and reset the board and try again when one
        happens.
      */
      if ( i === 1000) {
        clearBoard();
        shipsPlaced = 0;
        length = 5;
        i = 0;
      }
    }
  }

  const getLastCreatedShip = () => {
    const lastShip = placedShips[placedShips.length - 1];
    return lastShip;
  }

  const sunkShipCheck = () => {
    const sunkShip = placedShips.filter((ship) => ship.isSunk());
    if (sunkShip.length === 0) {
      return false;
    }
    return sunkShip;
  }

  const removeSunkShip = () => {
    const sunkShip = sunkShipCheck();
    if (!sunkShip) {
      return false;
    }
    const sunkShipIndex = placedShips.indexOf(sunkShip[0]);
    const removedShip = placedShips.splice(sunkShipIndex, 1);
    sunkShip[0] = null;
    return removedShip[0];
  }

  const copyPlacedShips = () => {
    const copy = [];
    placedShips.forEach((ship) => {
      copy.push(ship);
    });
    return copy;
  }

  const isBoardComplete = () => placedShips.length === 10;

  return {
    placeShip,
    receiveAttack,
    isGameOver,
    isPositionFreeToAttack,
    getAllCoordinates,
    clearBoard,
    populateBoard,
    sunkShipCheck,
    removeSunkShip,
    getLastCreatedShip,
    isPositionAvailiable,
    copyPlacedShips,
    isBoardComplete,
  }
}

export default GameBoard;