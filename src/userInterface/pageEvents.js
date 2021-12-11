const PageEvents = (() => {
  const pageClickEvents = (event, player, playerGameBoard, enemy, enemyGameBoard) => {

    const playerMove = () => {
      const xCoordinate = parseInt(event.target.dataset.x, 10);
      const yCoordinate = parseInt(event.target.dataset.y, 10);
      const shipAttacked = player.attackEnemyBoard(enemyGameBoard, [xCoordinate, yCoordinate]);
      if (shipAttacked) {
        event.target.classList.add('hit');
      } else {
        event.target.classList.add('missed');
      }
    }

    const computerMove = () => {
      const computerCoordinates = enemy.pickRandomCoordinates(playerGameBoard);
      const playerShipAttacked = enemy.attackEnemyBoard(playerGameBoard, computerCoordinates);
      const computerTarget = document.querySelector(`[data-x="${computerCoordinates[0]}"][data-y="${computerCoordinates[1]}"]`);
      if (playerShipAttacked) {
        computerTarget.classList.add('hit');
      } else {
        computerTarget.classList.add('missed');
      }
    }

    const removeClassName = (className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => element.classList.remove(className));
    }

    const resetGame = () => {
      playerGameBoard.clearBoard();
      enemyGameBoard.clearBoard();
      removeClassName('missed');
      removeClassName('hit');
      removeClassName('ship-placed');

    }

    if (event.target.className === 'grid-square opponent-square') {
      playerMove();
      const playerWin = enemyGameBoard.isGameOver();
      if (playerWin) {
        console.log('Player has won the game!');
        resetGame();
        return;
      }
      setTimeout(() => {
        computerMove();
      }, 500);

      const computerWin = playerGameBoard.isGameOver();
      if (computerWin) {
        console.log('Computer has won the game!');
        resetGame();
      }
     
    }
  }

  const pageListeners = (player, playerGameBoard, enemy, enemyGameBoard) => {
    /* remove event stops user from making a move while waiting for the computer */ 
    document.removeEventListener('click', (event) => {
      pageClickEvents(event, player, playerGameBoard, enemy, enemyGameBoard);
    });
    document.addEventListener('click', (event) => {
      pageClickEvents(event, player, playerGameBoard, enemy, enemyGameBoard);
    });
  }

  return {
    pageListeners,
  }
})();

export default PageEvents;