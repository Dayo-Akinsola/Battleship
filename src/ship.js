const Ship = (length, shipCoordinates) => {
  /*
    Each ship coordinate is stored as a key in the object with the 
    value being a boolean showing whether the position has been hit
    or not
  */
  const shipHits = {};
  for (let i = 0; i < length; i += 1) {
    shipHits[shipCoordinates[i]] = false;
  }

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

  return {
    hit,
    isSunk,
    hasCoordinates,
  }
};

export default Ship;