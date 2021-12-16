const Ship = (length, startCoordinates, shipCoordinates) => {
  /*
    Each ship coordinate is stored as a key in the object with the 
    value being a boolean showing whether the position has been hit
    or not
  */
  const shipHits = {};
  for (let i = 0; i < length; i += 1) {
    shipHits[shipCoordinates[i]] = false;
  }

  const shipNames = {
    2: 'Destroyer',
    3: 'Cruiser',
    4: 'Battleship',
    5: 'Carrier',
  }

  const getShipName = () => shipNames[length];

  const getShipCoordinates = () => shipCoordinates;

  const hasCoordinates = (attackCoordinates) => {
    let matchFound = false;
    shipCoordinates.forEach((coordinates) => {
      if (attackCoordinates[0] === coordinates[0] 
        && attackCoordinates[1] === coordinates[1]) {
          matchFound = true;
        }
    })
    return matchFound;
  }

  const hit = (attackCoordinates) => {
    const coordinatesKey = attackCoordinates.toString();
    shipHits[coordinatesKey] = true;
  }

  const isSunk = () => {
    const shipHitBools = Object.values(shipHits);
    return shipHitBools.every((bool) => bool);
  }

  /* Checks if y coordinates of the ship are the same */
  const isShipHorizontal = () => {
    const coordinates = getShipCoordinates();
    const [ firstCoordinates, secondCoordinates ] = coordinates;
    if (firstCoordinates[1] === secondCoordinates[1]) {
      return true;
    } 
    return false;
  }


  const rotateShip = () => {
    const isHorizontal = isShipHorizontal();
    shipCoordinates.length = 0;
    if (isHorizontal) {
      for (let i = 0; i < length; i += 1) {
        shipCoordinates.push([startCoordinates[0], startCoordinates[1] + i]);
      }
    } else {
      for (let i = 0; i < length; i+= 1) {
        shipCoordinates.push([startCoordinates[0] + i, startCoordinates[1]]);
      }
    }
  }

  /* 
    This function rotates a ship on the gameboard and checks if the new coordinates are possible on the gameboard.
    If the position is possible the rotation is kept, if it is not then the ship is rotated back to its original
    position.
  */
  const rotateShipIfPossible = (playerGameBoard) => {
    let rotation = isShipHorizontal();
    rotateShip();
    rotation = !rotation;
    const placedShipsCopy = playerGameBoard.copyPlacedShips();
    /* Filters out the ship that has been rotated */
    const filteredShips = placedShipsCopy.filter((placedShip) => placedShip.getShipCoordinates()[0] !== shipCoordinates[0] );
    if (playerGameBoard.isPositionAvailiable(length, startCoordinates, rotation, filteredShips)) {
      return true;
    } 
    rotateShip();
    rotation = !rotation;
    return false; 
  }

  const getShipLength = () => length;


  return {
    getShipName,
    hit,
    isSunk,
    hasCoordinates,
    getShipCoordinates,
    rotateShipIfPossible,
    getShipLength,
  }
};

export default Ship;