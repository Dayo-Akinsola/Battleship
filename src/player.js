const Player = () => {
  const attackEnemyBoard = (enemyGameBoard, attackCoordinates) => {
    if (enemyGameBoard.isPositionFree(attackCoordinates)) {
      enemyGameBoard.receiveAttack(attackCoordinates);
      return true;
    }

    return false;
  }

  return {
    attackEnemyBoard,
  }
}

const ComputerPlayer = () => {

  const pickRandomCoordinates = (enemyGameBoard) => {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    let coordinates = [randomX, randomY];
    while (!enemyGameBoard.isPositionFree(coordinates)) {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
      coordinates = [randomX, randomY];
    }
    return coordinates;
  }

  const attackEnemyBoard = (enemyGameBoard) => {
    const randomCoordinates = pickRandomCoordinates(enemyGameBoard);
    enemyGameBoard.receiveAttack(randomCoordinates);

    return randomCoordinates;
  }

  return {
    attackEnemyBoard,
    pickRandomCoordinates,
  }
}

export {
  Player, 
  ComputerPlayer,
}