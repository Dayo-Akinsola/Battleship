import ElementCreation from '../elementCreation';

const renderGrids = (humanShipCoordinates) => {
  const gameSection = ElementCreation.createChildElementWithClass('div', 'game-section', document.querySelector('body'));
  // const gridsSection = ElementCreation.createChildElementWithClass('div', 'grids-section', gameSection);
// 
  // const playerGridHeaderSection = ElementCreation.createChildElementWithClass('div', 'player-grid-heading-section', gridsSection);
  // const playerGridHeading = ElementCreation.createChildElementWithClass('span', 'player-grid-heading,', playerGridHeaderSection);
  // playerGridHeading.textContent = 'Player Grid';
  // const playerGrid = ElementCreation.createChildElementWithClass('div', 'ships-grid player-grid', gridsSection);
// 
  // const opponentGridHeaderSection = ElementCreation.createChildElementWithClass('div', 'player-grid-heading-section', gridsSection);
  // const opponentGridHeading = ElementCreation.createChildElementWithClass('span', 'player-grid-heading,', opponentGridHeaderSection);
  // opponentGridHeading.textContent = 'Opponent Grid';
// 
  // const opponentGrid = ElementCreation.createChildElementWithClass('div', 'ships-grid opponent-grid', gridsSection);
  

  for ( let i = 0;  i <= 9 ; i += 1) {
    for (let j = 0; j <= 9; j += 1) {
      const playerSquare = ElementCreation.createChildElementWithClass('div', 'grid-square player-square', playerGrid);
      const opponentSquare = ElementCreation.createChildElementWithClass('div', 'grid-square opponent-square', opponentGrid);
      playerSquare.dataset.x = j;
      playerSquare.dataset.y = i;
      opponentSquare.dataset.x = j;
      opponentSquare.dataset.y = i; 
    }
  }

  humanShipCoordinates.forEach((coordinates) => {
    const humanDomCoordinates = document.querySelector(`.player-square[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`);
    humanDomCoordinates.classList.add('ship-placed');
    ElementCreation.createChildElementWithClass('div', 'ship-circle', humanDomCoordinates);
  });
}

export default renderGrids;