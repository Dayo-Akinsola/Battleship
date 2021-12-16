import ElementCreation from "../elementCreation";

const PlacementEvents = (() => {

  const deployCheck = (playerGameBoard) => {
    const deployButton = document.querySelector('.deploy-btn');
    if (playerGameBoard.isBoardComplete()) {
      deployButton.disabled = false;
    } else {
      deployButton.disabled = true;
    }
  
  }
  const dragStartHandler = (event) => {
    if (event.target.classList[0] === 'ship-display'){
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData('text/plain', event.target.className);
    }
  }

  const dragEnterHandler = (event) => {
    if (event.target.className === 'grid-square placement-square') {
      event.target.style.backgroundColor = '#D6ECE5';
    }
  }

  const dragLeaveHandler = (event) => {
    if (event.target.className === 'grid-square placement-square') {
      event.target.style.backgroundColor = '#A8DADC';
    }
  }

  const dropHandler = (event, playerGameBoard) => {
    event.preventDefault();
    if (event.target.className === 'grid-square placement-square') {
      event.target.style.backgroundColor = '';
      const shipDisplayClassName = event.dataTransfer.getData('text/plain').split(' ');
      const displayContainer = document.querySelector(`.${shipDisplayClassName[0]}.${shipDisplayClassName[1]}`).parentElement;
      const displayCount = displayContainer.querySelector('.display-count');
      const shipLength = document.querySelectorAll(`.${shipDisplayClassName[0]}.${shipDisplayClassName[1]} .grid-square`).length;
      const xCoordinate = parseInt(event.target.dataset.x, 10);
      const yCoordinate = parseInt(event.target.dataset.y, 10);
      /* Only places the ship on the board if there are enough left and if the ships coordinates are valid */
      if ( parseInt(displayCount.dataset.displayCount, 10) > 0) {
        const shipPlacement = playerGameBoard.placeShip(shipLength, [xCoordinate, yCoordinate], true);
        if (shipPlacement) {
          const createdShip = playerGameBoard.getLastCreatedShip();
          const shipCoordinates = createdShip.getShipCoordinates();
          shipCoordinates.forEach((coordinates) => {
            const playerDOMCoordinates = document.querySelector(`.placement-square[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`);
            playerDOMCoordinates.classList.add('ship-placed');
            playerDOMCoordinates.style.backgroundColor = 'rgba(128, 128, 128, 0.329)';
            ElementCreation.createChildElementWithClass('div', 'ship-circle', playerDOMCoordinates);
          });
          displayCount.dataset.displayCount = parseInt(displayCount.dataset.displayCount, 10) - 1;
          displayCount.innerHTML = `&#215;${displayCount.dataset.displayCount}`; 
          deployCheck(playerGameBoard);
        }
      }
    }
  }

  const clickHandlers = (event, playerGameBoard, player, enemyGameBoard) => {

    const removePlacedShipElements = (coordinates) => {
      coordinates.forEach(([x, y]) => {
        const placementSquare = document.querySelector(`.placement-square[data-x="${x}"][data-y="${y}"]`);
        placementSquare.style.backgroundColor = '';
        placementSquare.textContent = '';
        placementSquare.classList.remove('ship-placed');
      });
    }

    const addPlacedShipElements = (coordinates) => {
      coordinates.forEach(([x, y]) => {
        const placementSquare = document.querySelector(`.placement-square[data-x="${x}"][data-y="${y}"]`);
        placementSquare.style.backgroundColor = 'rgba(128, 128, 128, 0.329)';
        ElementCreation.createChildElementWithClass('div', 'ship-circle', placementSquare);
        placementSquare.classList.add('ship-placed');
      });     
    }

    const resetBoard = () => {
      const shipPlacedElements = document.querySelectorAll('.placement-grid .ship-placed');
      shipPlacedElements.forEach((shipElement) => {
        shipElement.classList.remove('ship-placed');
        shipElement.style.backgroundColor = '';
        shipElement.textContent = '';
      });
    }

    const randomlyPopulateBoard = () => {
      resetBoard();
      playerGameBoard.populateBoard();
      const playerBoardCoordinates = playerGameBoard.getAllCoordinates();
      addPlacedShipElements(playerBoardCoordinates);
    }

    const setDisplayCounts = () => {
      const displayCounts = document.querySelectorAll('.display-count');
      let numberOfShips = 1;
      displayCounts.forEach((count) => {
        count.dataset.displayCount = numberOfShips;
        count.innerHTML = `&#215;${count.dataset.displayCount}`;
        numberOfShips += 1;
      });
    }

    const setDisplayCountsToZero = () => {
      const displayCounts = document.querySelectorAll('.display-count');
      displayCounts.forEach((count) =>  {
        count.dataset.displayCount = 0;
        count.innerHTML = `&#215;${count.dataset.displayCount}`;
      })
    }

    const deployShips = () => {
      resetBoard();
      const playerCoordinates = playerGameBoard.getAllCoordinates();
      playerCoordinates.forEach(([x, y]) => {
        const playerDOMCoordinates = document.querySelector(`.player-square[data-x="${x}"][data-y="${y}"]`);
        playerDOMCoordinates.classList.add('ship-placed');
        playerDOMCoordinates.style.backgroundColor = 'rgba(128, 128, 128, 0.329)';
        ElementCreation.createChildElementWithClass('div', 'ship-circle', playerDOMCoordinates);
      });
      const shipPlacementModal = document.querySelector('.ship-placement-modal');
      shipPlacementModal.style.display = 'none';
    }

    let target;
    if (event.target.className === 'ship-circle') {
      target = event.target.parentElement;
    } else {
        target = event.target;
    }
    if (target.className === 'grid-square placement-square ship-placed') {
      /* Rotates a ship when it is clicked */
      const xCoordinate = parseInt(target.dataset.x, 10);
      const yCoordinate = parseInt(target.dataset.y, 10);
      const coordinates = [xCoordinate, yCoordinate];
      const playerShip = player.getPlayerShip(coordinates, playerGameBoard)
      const playerShipCoordinates = playerShip.getShipCoordinates();
      removePlacedShipElements(playerShipCoordinates);
      const rotatedShipCoordinates = player.rotateBoardShip(playerGameBoard, playerShip).getShipCoordinates();
      addPlacedShipElements(rotatedShipCoordinates);
    }

    if (target.className === 'placement-btn random-btn') {
      randomlyPopulateBoard();
      setDisplayCountsToZero();
    }

    if (target.className === 'placement-btn reset-btn') {
      playerGameBoard.clearBoard();
      resetBoard();
      setDisplayCounts();
    }

    if (target.className === 'placement-btn deploy-btn') {
      deployShips();
      enemyGameBoard.populateBoard();
      setDisplayCounts();
    }
    deployCheck(playerGameBoard);
  }

  const placementListeners = (playerGameBoard, player, enemyGameBoard) => {
    const shipPlacementContainer = document.querySelector('.ship-placement-container');
    document.addEventListener('dragstart', dragStartHandler);
    document.addEventListener('dragover', (event) => {
      event.dataTransfer.dropEffect = "copy"
      event.preventDefault();
    });
    document.addEventListener('dragenter', dragEnterHandler);
    document.addEventListener('dragleave', dragLeaveHandler);
    document.addEventListener('drop', (event) => dropHandler(event, playerGameBoard));
    shipPlacementContainer.addEventListener('click', (event) => clickHandlers(event, playerGameBoard, player, enemyGameBoard));
  }

  return {
    placementListeners,
  }

})();

export default PlacementEvents;