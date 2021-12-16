import ElementCreation from '../elementCreation';

const renderGrids = () => {
  const playerSection = document.querySelector('.player-section');
  const playerGridWrapper = ElementCreation.createChildElementWithClass('div', 'grid-wrapper player-grid-wrapper', playerSection);
  const playerGrid = ElementCreation.createChildElementWithClass('div', 'ships-grid player-grid', playerGridWrapper);
  
  const opponentSection = document.querySelector('.opponent-section');
  const opponentGridWrapper = ElementCreation.createChildElementWithClass('div', 'grid-wrapper opponent-grid-wrapper', opponentSection);
  const opponentGrid = ElementCreation.createChildElementWithClass('div', 'ships-grid opponent-grid', opponentGridWrapper);

  const placementGridWrapper = document.querySelector('.placement-grid-wrapper');
  const placementGrid = ElementCreation.createChildElementWithClass('div', 'ships-grid placement-grid', placementGridWrapper);

  for ( let i = 0;  i <= 9 ; i += 1) {
    for (let j = 0; j <= 9; j += 1) {
      const playerSquare = ElementCreation.createChildElementWithClass('div', 'grid-square player-square', playerGrid);
      const opponentSquare = ElementCreation.createChildElementWithClass('div', 'grid-square opponent-square', opponentGrid);
      const placementSquare = ElementCreation.createChildElementWithClass('div', 'grid-square placement-square', placementGrid);
      playerSquare.dataset.x = j;
      playerSquare.dataset.y = i;
      opponentSquare.dataset.x = j;
      opponentSquare.dataset.y = i; 
      placementSquare.dataset.x = j;
      placementSquare.dataset.y = i;
    }
  }
}

export default renderGrids;