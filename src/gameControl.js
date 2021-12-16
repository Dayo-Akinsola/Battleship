import GameBoard from './gameBoard';
import { Player, ComputerPlayer } from './player';
import GameEvents from './userInterface/gameEvents';
import PlacementEvents from './userInterface/placementEvents';
import renderGrids  from './userInterface/renderUI';

const gameStart = () => {
  const humanPlayer = Player();
  const humanBoard = GameBoard();
  const computerPlayer = ComputerPlayer();
  const computerBoard = GameBoard();

  renderGrids(humanBoard.getAllCoordinates());
  GameEvents.pageListeners(humanPlayer, humanBoard, computerPlayer, computerBoard);
  PlacementEvents.placementListeners(humanBoard, humanPlayer, computerBoard);

  return {
    humanPlayer,
    humanBoard,
    computerPlayer,
    computerBoard,
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  gameStart,
}