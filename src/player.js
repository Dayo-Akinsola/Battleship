const Player = () => {
  const attackEnemyBoard = (enemyGameBoard, attackCoordinates) => {
    /* Returns true if a ship was hit */
    const shipAttacked = enemyGameBoard.receiveAttack(attackCoordinates);
    return shipAttacked;
  }

  return {
    attackEnemyBoard,
  }
}

const ComputerPlayer = () => {

  const { attackEnemyBoard } = Player();

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

  return {
    attackEnemyBoard,
    pickRandomCoordinates,
  }
}

export {
  Player, 
  ComputerPlayer,
}