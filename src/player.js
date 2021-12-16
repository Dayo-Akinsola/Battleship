const Player = () => {
  const attackEnemyBoard = (enemyGameBoard, attackCoordinates) => {
    /* Returns true if a ship was hit */
    const shipAttacked = enemyGameBoard.receiveAttack(attackCoordinates);
    return shipAttacked;
  }

  const getPlayerShip = (coordinates, playerGameBoard) => {
    const allPlacedShips = playerGameBoard.copyPlacedShips();
    const targetShip = allPlacedShips.filter((ship) => ship.hasCoordinates(coordinates))[0];
    return targetShip;
  }

  const rotateBoardShip = (playerGameBoard, targetShip) => {
    targetShip.rotateShipIfPossible(playerGameBoard);
    return targetShip;
  }

  return {
    attackEnemyBoard,
    rotateBoardShip,
    getPlayerShip,
  }
}

const ComputerPlayer = () => {

  /* Used to store all the attacks made by the computer */
  const successfulAttacks = [];
  const adjacentAttackFunctions = [
    (coordinates) => [coordinates[0] - 1, coordinates[1]], /* Left */
    (coordinates) => [coordinates[0] + 1, coordinates[1]], /* Right */
    (coordinates) => [coordinates[0], coordinates[1] - 1], /* Up */
    (coordinates) => [coordinates[0], coordinates[1] + 1], /* Down */
  ];
  let index = 0;

  const attackEnemyBoard = (enemyGameBoard, attackCoordinates) => {
    const shipAttacked = enemyGameBoard.receiveAttack(attackCoordinates);
    if (shipAttacked) {
      successfulAttacks.push(attackCoordinates);
    } else if (!shipAttacked) {
      if (successfulAttacks.length > 1) {
        successfulAttacks.splice(1);
        index += 1;
      } 
    }

    if (enemyGameBoard.sunkShipCheck()) {
      successfulAttacks.splice(0);
      index = 0;
    }

    return shipAttacked;
  }

  const pickRandomCoordinates = (enemyGameBoard) => {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    let coordinates = [randomX, randomY];
    while (!enemyGameBoard.isPositionFreeToAttack(coordinates)) {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
      coordinates = [randomX, randomY];
    }
    return coordinates;
  }

  const pickAdjacentCoordinates = (enemyGameBoard) => {
    let lastCoordinates = successfulAttacks[successfulAttacks.length - 1];
    let [x, y] = adjacentAttackFunctions[index](lastCoordinates);

    if ( 
      !enemyGameBoard.isPositionFreeToAttack([x, y]) 
      || x > 9 || y > 9  
      || x < 0 || y < 0
      ) {
      successfulAttacks.splice(1);
      lastCoordinates = successfulAttacks[successfulAttacks.length - 1];
    }
 
    while ( 
      !enemyGameBoard.isPositionFreeToAttack([x, y]) 
      || x > 9 || y > 9 
      || x < 0 || y < 0
      ) {
      index += 1;
      [x, y] = adjacentAttackFunctions[index](lastCoordinates);
    }

    return [x, y];
  }

  const pickCoordinates = (enemyGameBoard) => {
    if (successfulAttacks.length === 0) {
      return pickRandomCoordinates(enemyGameBoard);
    }
    return pickAdjacentCoordinates(enemyGameBoard);
  }

  return {
    attackEnemyBoard,
    pickCoordinates,
  }
}

export {
  Player, 
  ComputerPlayer,
}