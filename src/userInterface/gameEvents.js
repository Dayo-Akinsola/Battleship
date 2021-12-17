import ElementCreation from "../elementCreation";

const GameEvents = (() => {
  const pageClickEvents = (event, player, playerGameBoard, enemy, enemyGameBoard) => {

    const changeGameStatusMessage = (messageType, sunkShipName, playerType) => {
      const messageElement = document.querySelector(`.${messageType}-message`);
      const currentShownMessage = document.querySelector('.game-status-message.shown');

      currentShownMessage.classList.toggle('shown');

      if (messageType === 'player-sink') {
        messageElement.textContent = `You Have Sunk The Enemy's ${sunkShipName}!`;
      } else if (messageType === 'computer-sink') {
        messageElement.textContent = `Your ${sunkShipName} Has Been Sunk!`;
      }

      if (playerType === 'player') {
        messageElement.parentElement.style.backgroundColor = '#457B9D';
      } else if (playerType === 'computer') {
        messageElement.parentElement.style.backgroundColor = '#E63946';
      }

      messageElement.classList.toggle('shown');
    }

    const playerMove = () => {
      const xCoordinate = parseInt(event.target.dataset.x, 10);
      const yCoordinate = parseInt(event.target.dataset.y, 10);
      const shipAttacked = player.attackEnemyBoard(enemyGameBoard, [xCoordinate, yCoordinate]);
      if (shipAttacked) {
        event.target.classList.add('hit');
        ElementCreation.createChildElementWithClass('div', 'hit-circle', event.target);
        changeGameStatusMessage('player-hit', null, 'player');
      } else {
        event.target.classList.add('missed');
        ElementCreation.createChildElementWithClass('div', 'missed-circle', event.target);
        changeGameStatusMessage('player-miss', null, 'player');
      }
    }

    const computerMove = () => {
      const computerAttackCoordinates = enemy.pickCoordinates(playerGameBoard);
      const playerShipAttacked = enemy.attackEnemyBoard(playerGameBoard, computerAttackCoordinates);
      const computerTarget = document.querySelector(`[data-x="${computerAttackCoordinates[0]}"][data-y="${computerAttackCoordinates[1]}"]`);
      if (playerShipAttacked) {
        computerTarget.classList.add('hit');
        computerTarget.childNodes[0].className = 'hit-circle';
        changeGameStatusMessage('computer-hit', null, 'computer');
      } else {
        computerTarget.classList.add('missed');
        ElementCreation.createChildElementWithClass('div', 'missed-circle', computerTarget);
        changeGameStatusMessage('computer-miss', null, 'computer');
      }
    }

    const removeClassName = (className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => {
        element.classList.remove(className);
        element.textContent = '';
        element.style.backgroundColor = '';
      });
    }

    const decrementShipCount = (shipName, owner) => {
      const shipNameLower = shipName.toLowerCase();
      const section = document.querySelector(`.${owner}-section`);
      const shipCountElement = section.querySelector(`.${shipNameLower}-count`);
      shipCountElement.dataset.count -= 1;
      shipCountElement.textContent = shipCountElement.dataset.count;
    }

    const resetShipCount = () => {
      const playerShipCounts = document.querySelectorAll('.player-section .ship-count');
      const opponentShipCounts = document.querySelectorAll('.opponent-section .ship-count');
      
      playerShipCounts.forEach((playerShipCount, index) => {
        playerShipCount.dataset.count = index + 1;
        playerShipCount.textContent = playerShipCount.dataset.count;

        const opponentShipCount = opponentShipCounts[index];
        opponentShipCount.dataset.count = index + 1;
        opponentShipCount.textContent = opponentShipCount.dataset.count;
      });
    }

    const resetGameStatusMessage = () => {
      const resetGameStatusMessages = document.querySelectorAll('.game-status-message');
      resetGameStatusMessages.forEach((message) => message.classList.remove('shown'));
      const waitMessage = document.querySelector('.wait-message')
      waitMessage.classList.add('shown');
      waitMessage.parentElement.style.backgroundColor = '#457B9D';
    }

    const resetGame = () => {
      playerGameBoard.clearBoard();
      enemyGameBoard.clearBoard();
      enemy.resetAttackPattern();
      removeClassName('missed');
      removeClassName('hit');
      removeClassName('ship-placed');
      resetShipCount();
      resetGameStatusMessage();
      const shipPlacementModal = document.querySelector('.ship-placement-modal');
      shipPlacementModal.style.display = 'block';
    }

    const sunkShipCheck = (gameBoard) => {
      const sunkShip = gameBoard.removeSunkShip();
      return sunkShip;
    };

    const disablePlayerActions = () => {
      const opponentGridSquares = document.querySelectorAll('.opponent-square');
      opponentGridSquares.forEach((square) => square.classList.add('disabled'));
    }
 
    const enablePlayerActions = () => {
      const opponentGridSquares = document.querySelectorAll('.opponent-square');
      opponentGridSquares.forEach((square) => square.classList.remove('disabled'));
    }


    if (event.target.className === 'grid-square opponent-square') {
      /* Controls the flow of a game */
      playerMove();
      const playerWin = enemyGameBoard.isGameOver();
      const enemySunkShipCheck = sunkShipCheck(enemyGameBoard);

      if (enemySunkShipCheck) {
        const shipCoordinates = enemySunkShipCheck.getShipCoordinates();
        const shipName = enemySunkShipCheck.getShipName();
        shipCoordinates.forEach(([x, y]) => {
          const gridSquareElement = document.querySelector(`.opponent-square[data-x="${x}"][data-y="${y}"]`);
          gridSquareElement.style.backgroundColor = 'rgba(128, 128, 128, 0.329)';
        });
        decrementShipCount(shipName, 'opponent');
        changeGameStatusMessage('player-sink', shipName, 'player');
      }
      if (playerWin) {
        changeGameStatusMessage('player-win', null, 'player');
        const playAgainBtn = document.querySelector('.play-again-btn-container');
        playAgainBtn.style.display = 'block';
        disablePlayerActions();
        return;
      }
      disablePlayerActions(); /* Stops player from making a move on the computer's turn */
      setTimeout(() => {
        computerMove();
        const computerWin = playerGameBoard.isGameOver();
        const playerSunkShipCheck = sunkShipCheck(playerGameBoard);
        if (playerSunkShipCheck){
          const playerShipName = playerSunkShipCheck.getShipName();
          decrementShipCount(playerShipName, 'player');
          changeGameStatusMessage('computer-sink', playerShipName, 'computer');
        }
        if (computerWin) {
          changeGameStatusMessage('computer-win', null, 'computer');
          const playAgainBtn = document.querySelector('.play-again-btn-container');
          playAgainBtn.style.display = 'block';     
          disablePlayerActions();     
        } else {
          enablePlayerActions();
        }
      }, 2000);
    }

    if (event.target.className === 'game-reset-btn' || event.target.className === 'play-again-btn') {
      resetGame();
      enablePlayerActions();
      const playAgainBtn = document.querySelector('.play-again-btn-container');
      playAgainBtn.style.display = 'none';  
      const deployButton = document.querySelector('.deploy-btn');
      deployButton.disabled = true;
    }
  }

  const pageListeners = (player, playerGameBoard, enemy, enemyGameBoard) => {
    document.addEventListener('click', (event) => {
      pageClickEvents(event, player, playerGameBoard, enemy, enemyGameBoard);
    });
  }

  return {
    pageListeners,
  }
})();

export default GameEvents;