import GameBoard from './gameBoard';
import { Player, ComputerPlayer } from './player';
import PageEvents from './userInterface/pageEvents';
import renderGrids  from './userInterface/renderUI';

const gameStart = () => {
  const humanPlayer = Player();
  const humanBoard = GameBoard();
  const computerPlayer = ComputerPlayer();
  const computerBoard = GameBoard();

  humanBoard.populateBoard();
  computerBoard.populateBoard();
  renderGrids(humanBoard.getAllCoordinates());
  PageEvents.pageListeners(humanPlayer, humanBoard, computerPlayer, computerBoard);

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