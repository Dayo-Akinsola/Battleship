/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/elementCreation.js":
/*!********************************!*\
  !*** ./src/elementCreation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ElementCreation = function () {
  var createChildElementWithClass = function createChildElementWithClass(tag, className, parentElement) {
    var element = document.createElement(tag);
    element.className = className;
    parentElement.appendChild(element);
    return element;
  };

  var createChildElementWithId = function createChildElementWithId(tag, id, parentElement) {
    var element = document.createElement(tag);
    element.id = id;
    parentElement.appendChild(element);
    return element;
  };

  var createChildElementWithClassAndId = function createChildElementWithClassAndId(tag, className, id, parentElement) {
    var element = document.createElement(tag);
    element.className = className;
    element.id = id;
    parentElement.appendChild(element);
    return element;
  };

  return {
    createChildElementWithClass: createChildElementWithClass,
    createChildElementWithId: createChildElementWithId,
    createChildElementWithClassAndId: createChildElementWithClassAndId
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ElementCreation);

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");



var GameBoard = function GameBoard() {
  var placedShips = [];
  var missedAttacks = [];
  var hitAttacks = [];
  var boardWidth = 10;
  var boardHeight = 10;
  /* 
    Checks if the coordinates of a ship about to be placed is next to or on the coordinates
    of a ship that is already on the board.
  */

  var isAdjacent = function isAdjacent(coordinates, ships) {
    var _ref;

    var allShipCoordinates = ships.map(function (ship) {
      return ship.getShipCoordinates();
    });
    allShipCoordinates = (_ref = []).concat.apply(_ref, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(allShipCoordinates));

    var checkX = function checkX(shipXCoordinate) {
      if (shipXCoordinate === coordinates[0] || shipXCoordinate === coordinates[0] - 1 || shipXCoordinate === coordinates[0] + 1) {
        return true;
      }

      return false;
    };

    var checkY = function checkY(shipYCoordinate) {
      if (shipYCoordinate === coordinates[1] || shipYCoordinate === coordinates[1] - 1 || shipYCoordinate === coordinates[1] + 1) {
        return true;
      }

      return false;
    };

    var nonAdjacentCoordinates = allShipCoordinates.filter(function (shipCoordinates) {
      if (!checkX(shipCoordinates[0]) || !checkY(shipCoordinates[1])) {
        return true;
      }

      return false;
    });

    if (nonAdjacentCoordinates.length === allShipCoordinates.length) {
      return false;
    }

    return true;
  };

  var rotationChoice = function rotationChoice() {
    var choices = [true, false];
    var randomIndex = Math.floor(Math.random() * 2);
    return choices[randomIndex];
  };
  /* 
    Places a ship on the board after checking that the ship's coordinates are within the board 
    and that another ship is not already at the coordinates the new ship wants to occupy 
  */


  var isPositionAvailiable = function isPositionAvailiable(length, startCoordinates, rotation, ships) {
    var shipCoordinates = [];

    for (var i = 0; i < length; i += 1) {
      if (rotation) {
        /* If ship is horizontal */
        if (startCoordinates[0] + i >= boardWidth || startCoordinates[1] >= boardHeight) {
          return false;
        }

        shipCoordinates.push([startCoordinates[0] + i, startCoordinates[1]]);
      } else {
        /* If ship is vertical */
        if (startCoordinates[0] >= boardWidth || startCoordinates[1] + i >= boardHeight) {
          return false;
        }

        shipCoordinates.push([startCoordinates[0], startCoordinates[1] + i]);
      }
    }

    var availiableCoordinates = shipCoordinates.filter(function (coordinates) {
      if (isAdjacent(coordinates, ships)) {
        return false;
      }

      return true;
    });

    if (availiableCoordinates.length !== length) {
      return false;
    }

    return shipCoordinates;
  };

  var placeShip = function placeShip(length, startCoordinates, rotation) {
    var shipCoordinates = isPositionAvailiable(length, startCoordinates, rotation, placedShips);

    if (shipCoordinates) {
      var ship = new _ship__WEBPACK_IMPORTED_MODULE_1__["default"](length, startCoordinates, shipCoordinates);
      placedShips.push(ship);
      return true;
    }

    return false;
  };

  var receiveAttack = function receiveAttack(attackCoordinates) {
    var attackedShip = placedShips.filter(function (ship) {
      return ship.hasCoordinates(attackCoordinates);
    });

    if (attackedShip.length === 1) {
      hitAttacks.push(attackCoordinates);
      attackedShip[0].hit(attackCoordinates);
      return true;
    }

    missedAttacks.push(attackCoordinates);
    return false;
  };

  var isGameOver = function isGameOver() {
    return placedShips.every(function (placedShip) {
      return placedShip.isSunk();
    });
  };

  var isPositionFreeToAttack = function isPositionFreeToAttack(attackCoordinates) {
    var positionCheck = function positionCheck(coordinates) {
      if (coordinates[0] !== attackCoordinates[0] || coordinates[1] !== attackCoordinates[1]) {
        return true;
      }

      return false;
    };

    var freePosition = missedAttacks.every(positionCheck) && hitAttacks.every(positionCheck);
    return freePosition;
  };

  var getAllCoordinates = function getAllCoordinates() {
    var _ref2;

    var allCoordinates = placedShips.map(function (ship) {
      return ship.getShipCoordinates();
    });
    return (_ref2 = []).concat.apply(_ref2, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(allCoordinates));
  };

  var clearBoard = function clearBoard() {
    placedShips.forEach(function (ship) {
      var shipIndex = placedShips.indexOf(ship);
      placedShips[shipIndex] = null;
    });
    placedShips = [];
    missedAttacks = [];
    hitAttacks = [];
  };

  var populateBoard = function populateBoard() {
    clearBoard();
    var shipsPlaced = 0;
    var length = 5;
    var i = 0;

    while (shipsPlaced < 10) {
      var randomX = Math.floor(Math.random() * 10);
      var randomY = Math.floor(Math.random() * 10);
      var rotation = rotationChoice();
      var placedShip = placeShip(length, [randomX, randomY], rotation);

      if (placedShip) {
        shipsPlaced += 1;
      }

      switch (shipsPlaced) {
        case 1:
          length = 4;
          break;

        case 3:
          length = 3;
          break;

        case 6:
          length = 2;
          break;

        default:
          break;
      }

      i += 1;
      /*
        There are some cases where it is impossible to place another ship due to the board layout resulting
        in a infinite loop. i is here to detect an infinite loop and reset the board and try again when one
        happens.
      */

      if (i === 1000) {
        clearBoard();
        shipsPlaced = 0;
        length = 5;
        i = 0;
      }
    }
  };

  var getLastCreatedShip = function getLastCreatedShip() {
    var lastShip = placedShips[placedShips.length - 1];
    return lastShip;
  };

  var sunkShipCheck = function sunkShipCheck() {
    var sunkShip = placedShips.filter(function (ship) {
      return ship.isSunk();
    });

    if (sunkShip.length === 0) {
      return false;
    }

    return sunkShip;
  };

  var removeSunkShip = function removeSunkShip() {
    var sunkShip = sunkShipCheck();

    if (!sunkShip) {
      return false;
    }

    var sunkShipIndex = placedShips.indexOf(sunkShip[0]);
    var removedShip = placedShips.splice(sunkShipIndex, 1);
    sunkShip[0] = null;
    return removedShip[0];
  };

  var copyPlacedShips = function copyPlacedShips() {
    var copy = [];
    placedShips.forEach(function (ship) {
      copy.push(ship);
    });
    return copy;
  };

  var isBoardComplete = function isBoardComplete() {
    return placedShips.length === 10;
  };

  return {
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    isGameOver: isGameOver,
    isPositionFreeToAttack: isPositionFreeToAttack,
    getAllCoordinates: getAllCoordinates,
    clearBoard: clearBoard,
    populateBoard: populateBoard,
    sunkShipCheck: sunkShipCheck,
    removeSunkShip: removeSunkShip,
    getLastCreatedShip: getLastCreatedShip,
    isPositionAvailiable: isPositionAvailiable,
    copyPlacedShips: copyPlacedShips,
    isBoardComplete: isBoardComplete
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);

/***/ }),

/***/ "./src/gameControl.js":
/*!****************************!*\
  !*** ./src/gameControl.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameStart": () => (/* binding */ gameStart)
/* harmony export */ });
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _userInterface_gameEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userInterface/gameEvents */ "./src/userInterface/gameEvents.js");
/* harmony import */ var _userInterface_placementEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userInterface/placementEvents */ "./src/userInterface/placementEvents.js");
/* harmony import */ var _userInterface_renderUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./userInterface/renderUI */ "./src/userInterface/renderUI.js");






var gameStart = function gameStart() {
  var humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)();
  var humanBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.ComputerPlayer)();
  var computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_userInterface_renderUI__WEBPACK_IMPORTED_MODULE_4__["default"])(humanBoard.getAllCoordinates());
  _userInterface_gameEvents__WEBPACK_IMPORTED_MODULE_2__["default"].pageListeners(humanPlayer, humanBoard, computerPlayer, computerBoard);
  _userInterface_placementEvents__WEBPACK_IMPORTED_MODULE_3__["default"].placementListeners(humanBoard, humanPlayer, computerBoard);
  return {
    humanPlayer: humanPlayer,
    humanBoard: humanBoard,
    computerPlayer: computerPlayer,
    computerBoard: computerBoard
  };
};



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "ComputerPlayer": () => (/* binding */ ComputerPlayer)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");


var Player = function Player() {
  var attackEnemyBoard = function attackEnemyBoard(enemyGameBoard, attackCoordinates) {
    /* Returns true if a ship was hit */
    var shipAttacked = enemyGameBoard.receiveAttack(attackCoordinates);
    return shipAttacked;
  };

  var getPlayerShip = function getPlayerShip(coordinates, playerGameBoard) {
    var allPlacedShips = playerGameBoard.copyPlacedShips();
    var targetShip = allPlacedShips.filter(function (ship) {
      return ship.hasCoordinates(coordinates);
    })[0];
    return targetShip;
  };

  var rotateBoardShip = function rotateBoardShip(playerGameBoard, targetShip) {
    targetShip.rotateShipIfPossible(playerGameBoard);
    return targetShip;
  };

  return {
    attackEnemyBoard: attackEnemyBoard,
    rotateBoardShip: rotateBoardShip,
    getPlayerShip: getPlayerShip
  };
};

var ComputerPlayer = function ComputerPlayer() {
  /* Used to store all the attacks made by the computer */
  var successfulAttacks = [];
  var adjacentAttackFunctions = [function (coordinates) {
    return [coordinates[0] - 1, coordinates[1]];
  },
  /* Left */
  function (coordinates) {
    return [coordinates[0] + 1, coordinates[1]];
  },
  /* Right */
  function (coordinates) {
    return [coordinates[0], coordinates[1] - 1];
  },
  /* Up */
  function (coordinates) {
    return [coordinates[0], coordinates[1] + 1];
  }
  /* Down */
  ];
  var index = 0;

  var attackEnemyBoard = function attackEnemyBoard(enemyGameBoard, attackCoordinates) {
    var shipAttacked = enemyGameBoard.receiveAttack(attackCoordinates);

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
  };

  var pickRandomCoordinates = function pickRandomCoordinates(enemyGameBoard) {
    var randomX = Math.floor(Math.random() * 10);
    var randomY = Math.floor(Math.random() * 10);
    var coordinates = [randomX, randomY];

    while (!enemyGameBoard.isPositionFreeToAttack(coordinates)) {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
      coordinates = [randomX, randomY];
    }

    return coordinates;
  };

  var pickAdjacentCoordinates = function pickAdjacentCoordinates(enemyGameBoard) {
    var lastCoordinates = successfulAttacks[successfulAttacks.length - 1];

    var _adjacentAttackFuncti = adjacentAttackFunctions[index](lastCoordinates),
        _adjacentAttackFuncti2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_adjacentAttackFuncti, 2),
        x = _adjacentAttackFuncti2[0],
        y = _adjacentAttackFuncti2[1];

    if (!enemyGameBoard.isPositionFreeToAttack([x, y]) || x > 9 || y > 9 || x < 0 || y < 0) {
      successfulAttacks.splice(1);
      lastCoordinates = successfulAttacks[successfulAttacks.length - 1];
    }

    while (!enemyGameBoard.isPositionFreeToAttack([x, y]) || x > 9 || y > 9 || x < 0 || y < 0) {
      index += 1;

      var _adjacentAttackFuncti3 = adjacentAttackFunctions[index](lastCoordinates);

      var _adjacentAttackFuncti4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_adjacentAttackFuncti3, 2);

      x = _adjacentAttackFuncti4[0];
      y = _adjacentAttackFuncti4[1];
    }

    return [x, y];
  };

  var pickCoordinates = function pickCoordinates(enemyGameBoard) {
    if (successfulAttacks.length === 0) {
      return pickRandomCoordinates(enemyGameBoard);
    }

    return pickAdjacentCoordinates(enemyGameBoard);
  };

  return {
    attackEnemyBoard: attackEnemyBoard,
    pickCoordinates: pickCoordinates
  };
};



/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");


var Ship = function Ship(length, startCoordinates, shipCoordinates) {
  /*
    Each ship coordinate is stored as a key in the object with the 
    value being a boolean showing whether the position has been hit
    or not
  */
  var shipHits = {};

  for (var i = 0; i < length; i += 1) {
    shipHits[shipCoordinates[i]] = false;
  }

  var shipNames = {
    2: 'Destroyer',
    3: 'Cruiser',
    4: 'Battleship',
    5: 'Carrier'
  };

  var getShipName = function getShipName() {
    return shipNames[length];
  };

  var getShipCoordinates = function getShipCoordinates() {
    return shipCoordinates;
  };

  var hasCoordinates = function hasCoordinates(attackCoordinates) {
    var matchFound = false;
    shipCoordinates.forEach(function (coordinates) {
      if (attackCoordinates[0] === coordinates[0] && attackCoordinates[1] === coordinates[1]) {
        matchFound = true;
      }
    });
    return matchFound;
  };

  var hit = function hit(attackCoordinates) {
    var coordinatesKey = attackCoordinates.toString();
    shipHits[coordinatesKey] = true;
  };

  var isSunk = function isSunk() {
    var shipHitBools = Object.values(shipHits);
    return shipHitBools.every(function (bool) {
      return bool;
    });
  };
  /* Checks if y coordinates of the ship are the same */


  var isShipHorizontal = function isShipHorizontal() {
    var coordinates = getShipCoordinates();

    var _coordinates = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(coordinates, 2),
        firstCoordinates = _coordinates[0],
        secondCoordinates = _coordinates[1];

    if (firstCoordinates[1] === secondCoordinates[1]) {
      return true;
    }

    return false;
  };

  var rotateShip = function rotateShip() {
    var isHorizontal = isShipHorizontal();
    shipCoordinates.length = 0;

    if (isHorizontal) {
      for (var _i = 0; _i < length; _i += 1) {
        shipCoordinates.push([startCoordinates[0], startCoordinates[1] + _i]);
      }
    } else {
      for (var _i2 = 0; _i2 < length; _i2 += 1) {
        shipCoordinates.push([startCoordinates[0] + _i2, startCoordinates[1]]);
      }
    }
  };
  /* 
    This function rotates a ship on the gameboard and checks if the new coordinates are possible on the gameboard.
    If the position is possible the rotation is kept, if it is not then the ship is rotated back to its original
    position.
  */


  var rotateShipIfPossible = function rotateShipIfPossible(playerGameBoard) {
    var rotation = isShipHorizontal();
    rotateShip();
    rotation = !rotation;
    var placedShipsCopy = playerGameBoard.copyPlacedShips();
    /* Filters out the ship that has been rotated */

    var filteredShips = placedShipsCopy.filter(function (placedShip) {
      return placedShip.getShipCoordinates()[0] !== shipCoordinates[0];
    });

    if (playerGameBoard.isPositionAvailiable(length, startCoordinates, rotation, filteredShips)) {
      return true;
    }

    rotateShip();
    rotation = !rotation;
    return false;
  };

  var getShipLength = function getShipLength() {
    return length;
  };

  return {
    getShipName: getShipName,
    hit: hit,
    isSunk: isSunk,
    hasCoordinates: hasCoordinates,
    getShipCoordinates: getShipCoordinates,
    rotateShipIfPossible: rotateShipIfPossible,
    getShipLength: getShipLength
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/userInterface/gameEvents.js":
/*!*****************************************!*\
  !*** ./src/userInterface/gameEvents.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _elementCreation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elementCreation */ "./src/elementCreation.js");



var GameEvents = function () {
  var pageClickEvents = function pageClickEvents(event, player, playerGameBoard, enemy, enemyGameBoard) {
    var changeGameStatusMessage = function changeGameStatusMessage(messageType, sunkShipName, playerType) {
      var messageElement = document.querySelector(".".concat(messageType, "-message"));
      var currentShownMessage = document.querySelector('.game-status-message.shown');
      currentShownMessage.classList.toggle('shown');

      if (messageType === 'player-sink') {
        messageElement.textContent = "You Have Sunk The Enemy's ".concat(sunkShipName, "!");
      } else if (messageType === 'computer-sink') {
        messageElement.textContent = "Your ".concat(sunkShipName, " Has Been Sunk!");
      }

      if (playerType === 'player') {
        messageElement.parentElement.style.backgroundColor = '#457B9D';
      } else if (playerType === 'computer') {
        messageElement.parentElement.style.backgroundColor = '#E63946';
      }

      messageElement.classList.toggle('shown');
    };

    var playerMove = function playerMove() {
      var xCoordinate = parseInt(event.target.dataset.x, 10);
      var yCoordinate = parseInt(event.target.dataset.y, 10);
      var shipAttacked = player.attackEnemyBoard(enemyGameBoard, [xCoordinate, yCoordinate]);

      if (shipAttacked) {
        event.target.classList.add('hit');
        _elementCreation__WEBPACK_IMPORTED_MODULE_1__["default"].createChildElementWithClass('div', 'hit-circle', event.target);
        changeGameStatusMessage('player-hit', null, 'player');
      } else {
        event.target.classList.add('missed');
        _elementCreation__WEBPACK_IMPORTED_MODULE_1__["default"].createChildElementWithClass('div', 'missed-circle', event.target);
        changeGameStatusMessage('player-miss', null, 'player');
      }
    };

    var computerMove = function computerMove() {
      var computerAttackCoordinates = enemy.pickCoordinates(playerGameBoard);
      var playerShipAttacked = enemy.attackEnemyBoard(playerGameBoard, computerAttackCoordinates);
      var computerTarget = document.querySelector("[data-x=\"".concat(computerAttackCoordinates[0], "\"][data-y=\"").concat(computerAttackCoordinates[1], "\"]"));

      if (playerShipAttacked) {
        computerTarget.classList.add('hit');
        computerTarget.childNodes[0].className = 'hit-circle';
        changeGameStatusMessage('computer-hit', null, 'computer');
      } else {
        computerTarget.classList.add('missed');
        _elementCreation__WEBPACK_IMPORTED_MODULE_1__["default"].createChildElementWithClass('div', 'missed-circle', computerTarget);
        changeGameStatusMessage('computer-miss', null, 'computer');
      }
    };

    var removeClassName = function removeClassName(className) {
      var elements = document.querySelectorAll(".".concat(className));
      elements.forEach(function (element) {
        element.classList.remove(className);
        element.textContent = '';
        element.style.backgroundColor = '';
      });
    };

    var decrementShipCount = function decrementShipCount(shipName, owner) {
      var shipNameLower = shipName.toLowerCase();
      var section = document.querySelector(".".concat(owner, "-section"));
      var shipCountElement = section.querySelector(".".concat(shipNameLower, "-count"));
      shipCountElement.dataset.count -= 1;
      shipCountElement.textContent = shipCountElement.dataset.count;
    };

    var resetShipCount = function resetShipCount() {
      var playerShipCounts = document.querySelectorAll('.player-section .ship-count');
      var opponentShipCounts = document.querySelectorAll('.opponent-section .ship-count');
      playerShipCounts.forEach(function (playerShipCount, index) {
        playerShipCount.dataset.count = index + 1;
        playerShipCount.textContent = playerShipCount.dataset.count;
        var opponentShipCount = opponentShipCounts[index];
        opponentShipCount.dataset.count = index + 1;
        opponentShipCount.textContent = opponentShipCount.dataset.count;
      });
    };

    var resetGameStatusMessage = function resetGameStatusMessage() {
      var resetGameStatusMessages = document.querySelectorAll('.game-status-message');
      resetGameStatusMessages.forEach(function (message) {
        return message.classList.remove('shown');
      });
      var waitMessage = document.querySelector('.wait-message');
      waitMessage.classList.add('shown');
      waitMessage.parentElement.style.backgroundColor = '#457B9D';
    };

    var resetGame = function resetGame() {
      playerGameBoard.clearBoard();
      enemyGameBoard.clearBoard();
      removeClassName('missed');
      removeClassName('hit');
      removeClassName('ship-placed');
      resetShipCount();
      resetGameStatusMessage();
      var shipPlacementModal = document.querySelector('.ship-placement-modal');
      shipPlacementModal.style.display = 'block';
    };

    var sunkShipCheck = function sunkShipCheck(gameBoard) {
      var sunkShip = gameBoard.removeSunkShip();
      return sunkShip;
    };

    var disablePlayerActions = function disablePlayerActions() {
      var opponentGridSquares = document.querySelectorAll('.opponent-square');
      opponentGridSquares.forEach(function (square) {
        return square.classList.add('disabled');
      });
    };

    var enablePlayerActions = function enablePlayerActions() {
      var opponentGridSquares = document.querySelectorAll('.opponent-square');
      opponentGridSquares.forEach(function (square) {
        return square.classList.remove('disabled');
      });
    };

    if (event.target.className === 'grid-square opponent-square') {
      /* Controls the flow of a game */
      playerMove();
      var playerWin = enemyGameBoard.isGameOver();
      var enemySunkShipCheck = sunkShipCheck(enemyGameBoard);

      if (enemySunkShipCheck) {
        var shipCoordinates = enemySunkShipCheck.getShipCoordinates();
        var shipName = enemySunkShipCheck.getShipName();
        shipCoordinates.forEach(function (_ref) {
          var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
              x = _ref2[0],
              y = _ref2[1];

          var gridSquareElement = document.querySelector(".opponent-square[data-x=\"".concat(x, "\"][data-y=\"").concat(y, "\"]"));
          gridSquareElement.style.backgroundColor = 'rgba(128, 128, 128, 0.329)';
        });
        decrementShipCount(shipName, 'opponent');
        changeGameStatusMessage('player-sink', shipName, 'player');
      }

      if (playerWin) {
        changeGameStatusMessage('player-win', null, 'player');
        var playAgainBtn = document.querySelector('.play-again-btn-container');
        playAgainBtn.style.display = 'block';
        disablePlayerActions();
        return;
      }

      disablePlayerActions();
      /* Stops player from making a move on the computer's turn */

      setTimeout(function () {
        computerMove();
        var computerWin = playerGameBoard.isGameOver();
        var playerSunkShipCheck = sunkShipCheck(playerGameBoard);

        if (playerSunkShipCheck) {
          var playerShipName = playerSunkShipCheck.getShipName();
          decrementShipCount(playerShipName, 'player');
          changeGameStatusMessage('computer-sink', playerShipName, 'computer');
        }

        if (computerWin) {
          changeGameStatusMessage('computer-win', null, 'computer');

          var _playAgainBtn = document.querySelector('.play-again-btn-container');

          _playAgainBtn.style.display = 'block';
          disablePlayerActions();
        } else {
          enablePlayerActions();
        }
      }, 2000);
    }

    if (event.target.className === 'game-reset-btn' || event.target.className === 'play-again-btn') {
      resetGame();
      enablePlayerActions();

      var _playAgainBtn2 = document.querySelector('.play-again-btn-container');

      _playAgainBtn2.style.display = 'none';
      var deployButton = document.querySelector('.deploy-btn');
      deployButton.disabled = true;
    }
  };

  var pageListeners = function pageListeners(player, playerGameBoard, enemy, enemyGameBoard) {
    document.addEventListener('click', function (event) {
      pageClickEvents(event, player, playerGameBoard, enemy, enemyGameBoard);
    });
  };

  return {
    pageListeners: pageListeners
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameEvents);

/***/ }),

/***/ "./src/userInterface/placementEvents.js":
/*!**********************************************!*\
  !*** ./src/userInterface/placementEvents.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _elementCreation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elementCreation */ "./src/elementCreation.js");



var PlacementEvents = function () {
  var deployCheck = function deployCheck(playerGameBoard) {
    var deployButton = document.querySelector('.deploy-btn');

    if (playerGameBoard.isBoardComplete()) {
      deployButton.disabled = false;
    } else {
      deployButton.disabled = true;
    }
  };

  var dragStartHandler = function dragStartHandler(event) {
    if (event.target.classList[0] === 'ship-display') {
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData('text/plain', event.target.className);
    }
  };

  var dragEnterHandler = function dragEnterHandler(event) {
    if (event.target.className === 'grid-square placement-square') {
      event.target.style.backgroundColor = '#D6ECE5';
    }
  };

  var dragLeaveHandler = function dragLeaveHandler(event) {
    if (event.target.className === 'grid-square placement-square') {
      event.target.style.backgroundColor = '#A8DADC';
    }
  };

  var dropHandler = function dropHandler(event, playerGameBoard) {
    event.preventDefault();

    if (event.target.className === 'grid-square placement-square') {
      event.target.style.backgroundColor = '';
      var shipDisplayClassName = event.dataTransfer.getData('text/plain').split(' ');
      var displayContainer = document.querySelector(".".concat(shipDisplayClassName[0], ".").concat(shipDisplayClassName[1])).parentElement;
      var displayCount = displayContainer.querySelector('.display-count');
      var shipLength = document.querySelectorAll(".".concat(shipDisplayClassName[0], ".").concat(shipDisplayClassName[1], " .grid-square")).length;
      var xCoordinate = parseInt(event.target.dataset.x, 10);
      var yCoordinate = parseInt(event.target.dataset.y, 10);
      /* Only places the ship on the board if there are enough left and if the ships coordinates are valid */

      if (parseInt(displayCount.dataset.displayCount, 10) > 0) {
        var shipPlacement = playerGameBoard.placeShip(shipLength, [xCoordinate, yCoordinate], true);

        if (shipPlacement) {
          var createdShip = playerGameBoard.getLastCreatedShip();
          var shipCoordinates = createdShip.getShipCoordinates();
          shipCoordinates.forEach(function (coordinates) {
            var playerDOMCoordinates = document.querySelector(".placement-square[data-x=\"".concat(coordinates[0], "\"][data-y=\"").concat(coordinates[1], "\"]"));
            playerDOMCoordinates.classList.add('ship-placed');
            playerDOMCoordinates.style.backgroundColor = 'rgba(128, 128, 128, 0.329)';
            _elementCreation__WEBPACK_IMPORTED_MODULE_1__["default"].createChildElementWithClass('div', 'ship-circle', playerDOMCoordinates);
          });
          displayCount.dataset.displayCount = parseInt(displayCount.dataset.displayCount, 10) - 1;
          displayCount.innerHTML = "&#215;".concat(displayCount.dataset.displayCount);
          deployCheck(playerGameBoard);
        }
      }
    }
  };

  var clickHandlers = function clickHandlers(event, playerGameBoard, player, enemyGameBoard) {
    var removePlacedShipElements = function removePlacedShipElements(coordinates) {
      coordinates.forEach(function (_ref) {
        var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        var placementSquare = document.querySelector(".placement-square[data-x=\"".concat(x, "\"][data-y=\"").concat(y, "\"]"));
        placementSquare.style.backgroundColor = '';
        placementSquare.textContent = '';
        placementSquare.classList.remove('ship-placed');
      });
    };

    var addPlacedShipElements = function addPlacedShipElements(coordinates) {
      coordinates.forEach(function (_ref3) {
        var _ref4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref3, 2),
            x = _ref4[0],
            y = _ref4[1];

        var placementSquare = document.querySelector(".placement-square[data-x=\"".concat(x, "\"][data-y=\"").concat(y, "\"]"));
        placementSquare.style.backgroundColor = 'rgba(128, 128, 128, 0.329)';
        _elementCreation__WEBPACK_IMPORTED_MODULE_1__["default"].createChildElementWithClass('div', 'ship-circle', placementSquare);
        placementSquare.classList.add('ship-placed');
      });
    };

    var resetBoard = function resetBoard() {
      var shipPlacedElements = document.querySelectorAll('.placement-grid .ship-placed');
      shipPlacedElements.forEach(function (shipElement) {
        shipElement.classList.remove('ship-placed');
        shipElement.style.backgroundColor = '';
        shipElement.textContent = '';
      });
    };

    var randomlyPopulateBoard = function randomlyPopulateBoard() {
      resetBoard();
      playerGameBoard.populateBoard();
      var playerBoardCoordinates = playerGameBoard.getAllCoordinates();
      addPlacedShipElements(playerBoardCoordinates);
    };

    var setDisplayCounts = function setDisplayCounts() {
      var displayCounts = document.querySelectorAll('.display-count');
      var numberOfShips = 1;
      displayCounts.forEach(function (count) {
        count.dataset.displayCount = numberOfShips;
        count.innerHTML = "&#215;".concat(count.dataset.displayCount);
        numberOfShips += 1;
      });
    };

    var setDisplayCountsToZero = function setDisplayCountsToZero() {
      var displayCounts = document.querySelectorAll('.display-count');
      displayCounts.forEach(function (count) {
        count.dataset.displayCount = 0;
        count.innerHTML = "&#215;".concat(count.dataset.displayCount);
      });
    };

    var deployShips = function deployShips() {
      resetBoard();
      var playerCoordinates = playerGameBoard.getAllCoordinates();
      playerCoordinates.forEach(function (_ref5) {
        var _ref6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref5, 2),
            x = _ref6[0],
            y = _ref6[1];

        var playerDOMCoordinates = document.querySelector(".player-square[data-x=\"".concat(x, "\"][data-y=\"").concat(y, "\"]"));
        playerDOMCoordinates.classList.add('ship-placed');
        playerDOMCoordinates.style.backgroundColor = 'rgba(128, 128, 128, 0.329)';
        _elementCreation__WEBPACK_IMPORTED_MODULE_1__["default"].createChildElementWithClass('div', 'ship-circle', playerDOMCoordinates);
      });
      var shipPlacementModal = document.querySelector('.ship-placement-modal');
      shipPlacementModal.style.display = 'none';
    };

    var target;

    if (event.target.className === 'ship-circle') {
      target = event.target.parentElement;
    } else {
      target = event.target;
    }

    if (target.className === 'grid-square placement-square ship-placed') {
      /* Rotates a ship when it is clicked */
      var xCoordinate = parseInt(target.dataset.x, 10);
      var yCoordinate = parseInt(target.dataset.y, 10);
      var coordinates = [xCoordinate, yCoordinate];
      var playerShip = player.getPlayerShip(coordinates, playerGameBoard);
      var playerShipCoordinates = playerShip.getShipCoordinates();
      removePlacedShipElements(playerShipCoordinates);
      var rotatedShipCoordinates = player.rotateBoardShip(playerGameBoard, playerShip).getShipCoordinates();
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
  };

  var placementListeners = function placementListeners(playerGameBoard, player, enemyGameBoard) {
    var shipPlacementContainer = document.querySelector('.ship-placement-container');
    document.addEventListener('dragstart', dragStartHandler);
    document.addEventListener('dragover', function (event) {
      event.dataTransfer.dropEffect = "copy";
      event.preventDefault();
    });
    document.addEventListener('dragenter', dragEnterHandler);
    document.addEventListener('dragleave', dragLeaveHandler);
    document.addEventListener('drop', function (event) {
      return dropHandler(event, playerGameBoard);
    });
    shipPlacementContainer.addEventListener('click', function (event) {
      return clickHandlers(event, playerGameBoard, player, enemyGameBoard);
    });
  };

  return {
    placementListeners: placementListeners
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlacementEvents);

/***/ }),

/***/ "./src/userInterface/renderUI.js":
/*!***************************************!*\
  !*** ./src/userInterface/renderUI.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _elementCreation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elementCreation */ "./src/elementCreation.js");


var renderGrids = function renderGrids() {
  var playerSection = document.querySelector('.player-section');
  var playerGridWrapper = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'grid-wrapper player-grid-wrapper', playerSection);
  var playerGrid = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'ships-grid player-grid', playerGridWrapper);
  var opponentSection = document.querySelector('.opponent-section');
  var opponentGridWrapper = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'grid-wrapper opponent-grid-wrapper', opponentSection);
  var opponentGrid = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'ships-grid opponent-grid', opponentGridWrapper);
  var placementGridWrapper = document.querySelector('.placement-grid-wrapper');
  var placementGrid = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'ships-grid placement-grid', placementGridWrapper);

  for (var i = 0; i <= 9; i += 1) {
    for (var j = 0; j <= 9; j += 1) {
      var playerSquare = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'grid-square player-square', playerGrid);
      var opponentSquare = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'grid-square opponent-square', opponentGrid);
      var placementSquare = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'grid-square placement-square', placementGrid);
      playerSquare.dataset.x = j;
      playerSquare.dataset.y = i;
      opponentSquare.dataset.x = j;
      opponentSquare.dataset.y = i;
      placementSquare.dataset.x = j;
      placementSquare.dataset.y = i;
    }
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderGrids);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n}\n\nbody {\n  font-family: \"Black Ops One\", cursive;\n}\n\n.page-heading {\n  text-align: center;\n  font-size: 3.2rem;\n  margin-top: 0.5em;\n}\n\n.game-reset-container {\n  display: flex;\n  justify-content: center;\n}\n\n.game-reset-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n  width: 50%;\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n.grid-square.ship-placed {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}\n\n.ship-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: grey;\n}\n\n.game-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.game-section .player-section {\n  min-width: 50%;\n}\n.game-section .opponent-section {\n  min-width: 50%;\n}\n.game-section .player-section-heading-container {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  background-color: #457B9D;\n}\n.game-section .opponent-section-heading-container {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  background-color: #E63946;\n}\n.game-section .ship-counts {\n  display: flex;\n  justify-content: space-around;\n}\n.game-section .ship-count-container {\n  display: flex;\n  margin-right: 1em;\n  margin-left: 1em;\n  flex-direction: column;\n}\n.game-section .ship-name {\n  margin-right: 0.3em;\n}\n.game-section .ship-count-section-1 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.game-section .ship-count-section-2 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.game-section .game-status {\n  margin-bottom: 2em;\n  border: 4px solid black;\n  background-color: #457b9d;\n  padding: 0.5em;\n  width: 100%;\n  text-align: center;\n  font-size: 1.1em;\n  color: white;\n}\n.game-section .game-status-message {\n  opacity: 0;\n  display: none;\n}\n.game-section .game-status-message.shown {\n  display: block;\n  opacity: 1;\n  animation-name: reveal;\n  animation-duration: 1s;\n}\n@keyframes reveal {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.game-section .play-again-btn-container {\n  display: none;\n}\n.game-section .play-again-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n  margin-bottom: 1em;\n  font-size: 1.1em;\n  border-style: solid;\n  padding: 0.8em;\n}\n@media (min-width: 650px) {\n  .game-section {\n    flex-direction: row;\n    justify-content: space-around;\n    margin-top: 6em;\n  }\n  .game-section .game-status {\n    position: absolute;\n    top: 10.3em;\n  }\n  .game-section .player-section {\n    min-width: 45%;\n  }\n  .game-section .opponent-section {\n    min-width: 45%;\n  }\n}\n@media (min-width: 1000px) {\n  .game-section .player-section {\n    min-width: 30%;\n  }\n  .game-section .opponent-section {\n    min-width: 30%;\n  }\n}\n@media (min-width: 1400px) {\n  .game-section .ship-circle {\n    margin-top: 0.5em;\n  }\n}\n@media (min-width: 1600px) {\n  .game-section .player-section {\n    min-width: 25%;\n  }\n  .game-section .opponent-section {\n    min-width: 25%;\n  }\n  .game-section .game-status {\n    font-size: 1.3em;\n    top: 8.3em;\n  }\n  .game-section .play-again-btn {\n    font-size: 1.5em;\n  }\n}\n\n.grid-wrapper .ships-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n  margin-top: 2em;\n  margin-bottom: 4em;\n}\n.grid-wrapper .grid-square {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n}\n.grid-wrapper .grid-square:hover {\n  background-color: #D6ECE5;\n}\n.grid-wrapper .missed-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: #1D3557;\n}\n.grid-wrapper .hit-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: #E63946;\n}\n@media (min-width: 1400px) {\n  .grid-wrapper .missed-circle {\n    margin-top: 0.5em;\n  }\n  .grid-wrapper .hit-circle {\n    margin-top: 0.5em;\n  }\n}\n\n.ship-placement-modal {\n  display: block;\n  position: fixed;\n  z-index: 1;\n  padding: 2rem 0;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n.ship-placement-modal .ship-placement-container {\n  background-color: #F1FAEE;\n  margin-top: 2em;\n  max-width: 80%;\n  margin: auto;\n  padding: 1em;\n  border-radius: 8px;\n  -webkit-box-shadow: -10px 0px 13px -7px #ffffff8a, 10px 0px 13px -7px #ffffff8a, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  box-shadow: 0px 13px -7px #ffffff5e, 10px 0px 13px -7px #ffffff77, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n}\n.ship-placement-modal .info-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-bottom: 1em;\n  margin-top: 0.8em;\n}\n.ship-placement-modal .rotate-info {\n  text-align: center;\n}\n.ship-placement-modal .ship-placement-heading {\n  text-align: center;\n}\n.ship-placement-modal .placement-grid-wrapper {\n  max-width: 60%;\n  margin: auto;\n  padding-bottom: 0.1em;\n}\n.ship-placement-modal .display-container {\n  max-width: 100%;\n  text-align: center;\n}\n.ship-placement-modal .placed-ship-display {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n  width: 0%;\n  min-width: 6%;\n  padding-bottom: 6%;\n}\n.ship-placement-modal .ship-circle {\n  margin-top: 0.3em;\n}\n.ship-placement-modal .ship-display {\n  display: flex;\n  padding-bottom: 1em;\n  justify-content: center;\n}\n.ship-placement-modal .placement-grid {\n  margin-bottom: 2em;\n}\n.ship-placement-modal .placement-btns-container {\n  display: flex;\n  justify-content: space-evenly;\n}\n.ship-placement-modal .placement-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n}\n.ship-placement-modal .random-btn {\n  margin: 0 0.4em;\n}\n.ship-placement-modal .grid-square.placement-square.ship-placed {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}\n@media (min-width: 800px) {\n  .ship-placement-modal .placement-section {\n    display: flex;\n    align-items: center;\n  }\n  .ship-placement-modal .placement-grid-wrapper {\n    min-width: 47%;\n  }\n  .ship-placement-modal .ships-display-container {\n    min-width: 45%;\n  }\n  .ship-placement-modal .placed-ship-display {\n    min-width: 10%;\n    padding-bottom: 10%;\n  }\n}\n@media (min-width: 1000px) {\n  .ship-placement-modal .ship-circle {\n    margin-top: 0.5em;\n  }\n}\n@media (min-width: 1400px) {\n  .ship-placement-modal .ship-placement-container {\n    max-width: 65%;\n    margin-top: 7em;\n  }\n}\n@media (min-width: 1600px) {\n  .ship-placement-modal .ship-placement-container {\n    max-width: 55%;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,SAAA;AACF;;AAkDA;EACE,qCAAA;AA/CF;;AAkDA;EACC,kBAAA;EACA,iBAAA;EACC,iBAAA;AA/CF;;AAkDA;EACE,aAAA;EACA,uBAAA;AA/CF;;AAkDA;EAxBE,eAAA;EACA,kBAAA;EACA,cAAA;EACA,cAAA;EACA,WAAA;EACA,gBAAA;EACA,mBAAA;EAoBA,UAAA;EACA,eAAA;EACA,kBAAA;AAzCF;;AA6CA;EA5DE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,SAAA;EACA,oBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;EACA,yBAAA;EAoDA,4CAAA;EACA,kBAAA;AAhCF;;AAmCA;EA5EE,kBAAA;EACA,UAAA;EACA,sBAAA;EACA,WAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;EAwEA,sBAAA;AA1BF;;AA6BA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AA1BF;AA4BE;EArDA,cAAA;AA4BF;AA6BE;EAzDA,cAAA;AA+BF;AA8BE;EAvEA,kBAAA;EACA,cAAA;EACA,cAAA;EACA,YAAA;EACA,eAAA;EACA,uFAAA;EACA,+EAAA;EAmEE,yBAAA;AAtBJ;AAyBE;EA5EA,kBAAA;EACA,cAAA;EACA,cAAA;EACA,YAAA;EACA,eAAA;EACA,uFAAA;EACA,+EAAA;EAwEE,yBAAA;AAjBJ;AAoBE;EACE,aAAA;EACA,6BAAA;AAlBJ;AAqBE;EACE,aAAA;EACA,iBAAA;EACA,gBAAA;EACA,sBAAA;AAnBJ;AAsBE;EACE,mBAAA;AApBJ;AAuBE;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;AArBJ;AAwBE;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;AAtBJ;AAyBE;EACE,kBAAA;EACA,uBAAA;EACA,yBAAA;EACA,cAAA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,YAAA;AAvBJ;AA0BE;EACE,UAAA;EACA,aAAA;AAxBJ;AA2BE;EACE,cAAA;EACA,UAAA;EACA,sBAAA;EACA,sBAAA;AAzBJ;AA4BE;EACE;IACE,UAAA;EA1BJ;EA4BE;IACE,UAAA;EA1BJ;AACF;AA6BE;EACE,aAAA;AA3BJ;AA8BE;EAnIA,eAAA;EACA,kBAAA;EACA,cAAA;EACA,cAAA;EACA,WAAA;EACA,gBAAA;EACA,mBAAA;EA+HE,kBAAA;EACA,gBAAA;EACA,mBAAA;EACA,cAAA;AAtBJ;AAyBE;EAhGF;IAkGI,mBAAA;IACA,6BAAA;IACA,eAAA;EAvBF;EAyBE;IACE,kBAAA;IACA,WAAA;EAvBJ;EA0BE;IACE,cAAA;EAxBJ;EA2BE;IACE,cAAA;EAzBJ;AACF;AA4BE;EACE;IACE,cAAA;EA1BJ;EA6BE;IACE,cAAA;EA3BJ;AACF;AA8BE;EACE;IACE,iBAAA;EA5BJ;AACF;AA+BE;EACE;IACE,cAAA;EA7BJ;EAgCE;IACE,cAAA;EA9BJ;EAiCE;IACE,gBAAA;IACA,UAAA;EA/BJ;EAkCE;IACE,gBAAA;EAhCJ;AACF;;AAsCE;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;EACA,eAAA;EACA,kBAAA;AAnCJ;AAuCE;EA1OA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,SAAA;EACA,oBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;EACA,yBAAA;AAsMF;AA8BE;EACE,yBAAA;AA5BJ;AA+BE;EA5PA,kBAAA;EACA,UAAA;EACA,sBAAA;EACA,WAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;EAwPE,yBAAA;AAvBJ;AA0BE;EAjQA,kBAAA;EACA,UAAA;EACA,sBAAA;EACA,WAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;EA6PE,yBAAA;AAlBJ;AAqBE;EACE;IACE,iBAAA;EAnBJ;EAsBE;IACE,iBAAA;EApBJ;AACF;;AAwBA;EACE,cAAA;EACA,eAAA;EACA,UAAA;EACA,eAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;EACA,uBAAA;EACA,oCAAA;AArBF;AAuBE;EACE,yBAAA;EACA,eAAA;EACA,cAAA;EACA,YAAA;EACA,YAAA;EACA,kBAAA;EACA,wHAAA;EACA,0GAAA;AArBJ;AAwBE;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,kBAAA;EACA,iBAAA;AAtBJ;AAyBE;EACE,kBAAA;AAvBJ;AA0BE;EACE,kBAAA;AAxBJ;AA2BE;EACE,cAAA;EACA,YAAA;EACA,qBAAA;AAzBJ;AA4BE;EACE,eAAA;EACA,kBAAA;AA1BJ;AA6BE;EA1TA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,SAAA;EACA,oBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;EACA,yBAAA;EAkTE,4CAAA;EACA,kBAAA;EACA,SAAA;EACA,aAAA;EACA,kBAAA;AAjBJ;AAoBE;EACE,iBAAA;AAlBJ;AAqBE;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;AAnBJ;AAsBE;EACE,kBAAA;AApBJ;AAuBE;EACE,aAAA;EACA,6BAAA;AArBJ;AAwBE;EA1TA,eAAA;EACA,kBAAA;EACA,cAAA;EACA,cAAA;EACA,WAAA;EACA,gBAAA;EACA,mBAAA;AAqSF;AAmBE;EACE,eAAA;AAjBJ;AAoBE;EA9VA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,SAAA;EACA,oBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;EACA,yBAAA;EAsVE,4CAAA;EACA,kBAAA;AARJ;AAWE;EACE;IACE,aAAA;IACA,mBAAA;EATJ;EAYE;IACE,cAAA;EAVJ;EAaE;IACE,cAAA;EAXJ;EAcE;IACE,cAAA;IACA,mBAAA;EAZJ;AACF;AAeE;EACE;IACE,iBAAA;EAbJ;AACF;AAgBE;EACE;IACE,cAAA;IACA,eAAA;EAdJ;AACF;AAiBE;EACE;IACE,cAAA;EAfJ;AACF","sourcesContent":["* {\n  margin: 0;\n}\n\n@mixin circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n}\n\n@mixin square {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n}\n\n@mixin headingContainer {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151,151,151,0); \n  box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151,151,151,0);\n}\n\n@mixin mainSection {\n  min-width: 50%;\n}\n\n@mixin btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n}\n\nbody {\n  font-family: \"Black Ops One\", cursive;\n}\n\n.page-heading {\n\ttext-align: center;\n\tfont-size: 3.2rem;\n  margin-top: 0.5em;\n}\n\n.game-reset-container {\n  display: flex;\n  justify-content: center;\n}\n\n.game-reset-btn {\n  @include btn;\n  width: 50%;\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n\n.grid-square.ship-placed {\n  @include square;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}\n\n.ship-circle {\n  @include circle();\n  background-color: grey;\n}\n\n.game-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  .player-section {\n    @include mainSection();\n  }\n\n  .opponent-section {\n    @include mainSection();\n  }\n  \n  .player-section-heading-container {\n    @include headingContainer();\n    background-color: #457B9D;\n  }\n\n  .opponent-section-heading-container {\n    @include headingContainer();\n    background-color: #E63946;\n  }\n\n  .ship-counts {\n    display: flex;\n    justify-content: space-around;\n  }\n\n  .ship-count-container {\n    display: flex;\n    margin-right: 1em;\n    margin-left: 1em;\n    flex-direction: column;\n  }\n\n  .ship-name {\n    margin-right: 0.3em;\n  }\n\n  .ship-count-section-1 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .ship-count-section-2 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .game-status {\n    margin-bottom: 2em;\n    border: 4px solid black;\n    background-color: #457b9d;\n    padding: 0.5em;\n    width: 100%;\n    text-align: center;\n    font-size: 1.1em;\n    color: white;\n  }\n\n  .game-status-message {\n    opacity: 0;\n    display: none;\n  }\n\n  .game-status-message.shown {\n    display: block;\n    opacity: 1;\n    animation-name: reveal;\n    animation-duration: 1s;\n  }\n\n  @keyframes reveal {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  .play-again-btn-container {\n    display: none;\n  }\n\n  .play-again-btn {\n    @include btn();\n    margin-bottom: 1em;\n    font-size: 1.1em;\n    border-style: solid;\n    padding: 0.8em;\n  }\n\n  @media (min-width: 650px) {\n\n    flex-direction: row;\n    justify-content: space-around;\n    margin-top: 6em;\n\n    .game-status {\n      position: absolute;\n      top: 10.3em;\n    }\n\n    .player-section {\n      min-width: 45%;\n    }\n\n    .opponent-section {\n      min-width: 45%;\n    }\n  }\n\n  @media (min-width: 1000px) {\n    .player-section {\n      min-width: 30%;\n    }\n\n    .opponent-section {\n      min-width: 30%;\n    }\n  }\n\n  @media (min-width: 1400px) {\n    .ship-circle {\n      margin-top: 0.5em;\n    }\n  }\n\n  @media (min-width: 1600px) {\n    .player-section {\n      min-width: 25%;\n    }\n\n    .opponent-section {\n      min-width: 25%;\n    }\n\n    .game-status {\n      font-size: 1.3em;\n      top: 8.3em;\n    }\n\n    .play-again-btn {\n      font-size: 1.5em;\n    }\n  }\n}\n\n.grid-wrapper {\n\n  .ships-grid {\n    display: grid;\n    grid-template-rows: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n    margin-top: 2em;\n    margin-bottom: 4em;\n    \n  }\n\n  .grid-square {\n    @include square();\n  }\n\n  .grid-square:hover {\n    background-color: #D6ECE5;\n  }\n\n  .missed-circle {\n    @include circle();\n    background-color: #1D3557;\n  }\n\n  .hit-circle {\n    @include circle();\n    background-color: #E63946;\n  }\n\n  @media (min-width: 1400px) {\n    .missed-circle {\n      margin-top: 0.5em;\n    }\n\n    .hit-circle {\n      margin-top: 0.5em;\n    }\n  }\n}\n\n.ship-placement-modal{\n  display: block;\n  position: fixed;\n  z-index: 1;\n  padding: 2rem 0;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgb(0, 0, 0);\n  background-color: rgb(0, 0, 0, 0.4);\n\n  .ship-placement-container {\n    background-color: #F1FAEE;\n    margin-top: 2em;\n    max-width: 80%;\n    margin: auto;\n    padding: 1em;\n    border-radius: 8px;\n    -webkit-box-shadow: -10px 0px 13px -7px #ffffff8a, 10px 0px 13px -7px #ffffff8a, 2px 4px 13px 6px rgba(151,151,151,0); \n    box-shadow: 0px 13px -7px #ffffff5e, 10px 0px 13px -7px #ffffff77, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  }\n\n  .info-wrapper {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 1em;\n    margin-top: 0.8em;\n  }\n\n  .rotate-info {\n    text-align: center;\n  }\n\n  .ship-placement-heading {\n    text-align: center;\n  }\n\n  .placement-grid-wrapper {\n    max-width: 60%;\n    margin: auto;\n    padding-bottom: 0.1em;\n  }\n\n  .display-container {\n    max-width: 100%;\n    text-align: center;\n  }\n\n  .placed-ship-display {\n    @include square;\n    background-color: rgba(128, 128, 128, 0.329);\n    border-radius: 2px;\n    width: 0%;\n    min-width: 6%;\n    padding-bottom: 6%;\n  }\n\n  .ship-circle {\n    margin-top: 0.3em;\n  }\n\n  .ship-display {\n    display: flex;\n    padding-bottom: 1em;\n    justify-content: center;\n  }\n\n  .placement-grid {\n    margin-bottom: 2em;\n  }\n\n  .placement-btns-container {\n    display: flex;\n    justify-content: space-evenly;\n  }\n\n  .placement-btn {\n    @include btn();\n  }\n\n  .random-btn {\n    margin: 0 0.4em;\n  }\n\n  .grid-square.placement-square.ship-placed {\n    @include square;\n    background-color: rgba(128, 128, 128, 0.329);\n    border-radius: 2px;\n  }\n\n  @media (min-width: 800px) {\n    .placement-section {\n      display: flex;\n      align-items: center;\n    }\n\n    .placement-grid-wrapper {\n      min-width: 47%;\n    }\n\n    .ships-display-container {\n      min-width: 45%;\n    }\n\n    .placed-ship-display {\n      min-width: 10%;\n      padding-bottom: 10%;\n    }\n  }\n\n  @media (min-width: 1000px) {\n    .ship-circle {\n      margin-top: 0.5em;\n    }\n  }\n\n  @media (min-width: 1400px) {\n    .ship-placement-container {\n      max-width: 65%;\n      margin-top: 7em;\n    }\n  }\n\n  @media (min-width: 1600px) {\n    .ship-placement-container {\n      max-width: 55%;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _gameControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameControl */ "./src/gameControl.js");


setTimeout(function () {
  (0,_gameControl__WEBPACK_IMPORTED_MODULE_1__.gameStart)();
}, 100);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFlBQVksVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsWUFBWSxNQUFNLE1BQU0sWUFBWSxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxZQUFZLE1BQU0sTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFlBQVksV0FBVyxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxN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Ozs7O0FDTnFEO0FBQ3RDO0FBQ2Y7QUFDQSxvQ0FBb0MsZ0VBQWdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRixnRUFBZ0I7QUFDdEc7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBeUcsVUFBVSxDQUFDLFlBQU07QUFDZnhHLEVBQUFBLHVEQUFTO0FBQ1YsQ0FGUyxFQUVQLEdBRk8sQ0FBVixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9lbGVtZW50Q3JlYXRpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQ29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91c2VySW50ZXJmYWNlL2dhbWVFdmVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91c2VySW50ZXJmYWNlL3BsYWNlbWVudEV2ZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3VzZXJJbnRlcmZhY2UvcmVuZGVyVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFbGVtZW50Q3JlYXRpb24gPSAoKCkgPT4ge1xuICBjb25zdCBjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MgPSAodGFnLCBjbGFzc05hbWUsIHBhcmVudEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVDaGlsZEVsZW1lbnRXaXRoSWQgPSAodGFnLCBpZCwgcGFyZW50RWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgZWxlbWVudC5pZCA9IGlkO1xuICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3NBbmRJZCA9ICh0YWcsIGNsYXNzTmFtZSwgaWQsIHBhcmVudEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIGVsZW1lbnQuaWQgPSBpZDtcbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MsXG4gICAgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aElkLFxuICAgIGNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzc0FuZElkLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRWxlbWVudENyZWF0aW9uO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGxldCBwbGFjZWRTaGlwcyA9IFtdO1xuICBsZXQgbWlzc2VkQXR0YWNrcyA9IFtdO1xuICBsZXQgaGl0QXR0YWNrcyA9IFtdO1xuICBjb25zdCBib2FyZFdpZHRoID0gMTA7XG4gIGNvbnN0IGJvYXJkSGVpZ2h0ID0gMTA7XG5cbiAgLyogXG4gICAgQ2hlY2tzIGlmIHRoZSBjb29yZGluYXRlcyBvZiBhIHNoaXAgYWJvdXQgdG8gYmUgcGxhY2VkIGlzIG5leHQgdG8gb3Igb24gdGhlIGNvb3JkaW5hdGVzXG4gICAgb2YgYSBzaGlwIHRoYXQgaXMgYWxyZWFkeSBvbiB0aGUgYm9hcmQuXG4gICovXG4gIGNvbnN0IGlzQWRqYWNlbnQgPSAoY29vcmRpbmF0ZXMsIHNoaXBzKSA9PiB7XG4gICAgbGV0IGFsbFNoaXBDb29yZGluYXRlcyA9IHNoaXBzLm1hcCgoc2hpcCkgPT4gc2hpcC5nZXRTaGlwQ29vcmRpbmF0ZXMoKSk7XG4gICAgYWxsU2hpcENvb3JkaW5hdGVzID0gW10uY29uY2F0KC4uLmFsbFNoaXBDb29yZGluYXRlcyk7XG4gICAgY29uc3QgY2hlY2tYID0gKHNoaXBYQ29vcmRpbmF0ZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBzaGlwWENvb3JkaW5hdGUgPT09IGNvb3JkaW5hdGVzWzBdIHx8IFxuICAgICAgICBzaGlwWENvb3JkaW5hdGUgPT09IGNvb3JkaW5hdGVzWzBdIC0gMSB8fCBcbiAgICAgICAgc2hpcFhDb29yZGluYXRlID09PSBjb29yZGluYXRlc1swXSArIDFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgY2hlY2tZID0gKHNoaXBZQ29vcmRpbmF0ZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBzaGlwWUNvb3JkaW5hdGUgPT09IGNvb3JkaW5hdGVzWzFdIHx8IFxuICAgICAgICBzaGlwWUNvb3JkaW5hdGUgPT09IGNvb3JkaW5hdGVzWzFdIC0gMSB8fCBcbiAgICAgICAgc2hpcFlDb29yZGluYXRlID09PSBjb29yZGluYXRlc1sxXSArIDFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBub25BZGphY2VudENvb3JkaW5hdGVzID0gYWxsU2hpcENvb3JkaW5hdGVzLmZpbHRlcigoc2hpcENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICBpZiAoIWNoZWNrWChzaGlwQ29vcmRpbmF0ZXNbMF0pIHx8ICFjaGVja1koc2hpcENvb3JkaW5hdGVzWzFdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIGlmIChub25BZGphY2VudENvb3JkaW5hdGVzLmxlbmd0aCA9PT0gYWxsU2hpcENvb3JkaW5hdGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3Qgcm90YXRpb25DaG9pY2UgPSAoKSA9PiB7XG4gICAgY29uc3QgY2hvaWNlcyA9IFt0cnVlLCBmYWxzZV07XG4gICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICByZXR1cm4gY2hvaWNlc1tyYW5kb21JbmRleF07XG4gIH1cblxuICAvKiBcbiAgICBQbGFjZXMgYSBzaGlwIG9uIHRoZSBib2FyZCBhZnRlciBjaGVja2luZyB0aGF0IHRoZSBzaGlwJ3MgY29vcmRpbmF0ZXMgYXJlIHdpdGhpbiB0aGUgYm9hcmQgXG4gICAgYW5kIHRoYXQgYW5vdGhlciBzaGlwIGlzIG5vdCBhbHJlYWR5IGF0IHRoZSBjb29yZGluYXRlcyB0aGUgbmV3IHNoaXAgd2FudHMgdG8gb2NjdXB5IFxuICAqL1xuICBjb25zdCBpc1Bvc2l0aW9uQXZhaWxpYWJsZSA9IChsZW5ndGgsIHN0YXJ0Q29vcmRpbmF0ZXMsIHJvdGF0aW9uLCBzaGlwcykgPT4ge1xuICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChyb3RhdGlvbikge1xuICAgICAgICAvKiBJZiBzaGlwIGlzIGhvcml6b250YWwgKi9cbiAgICAgICAgaWYgKHN0YXJ0Q29vcmRpbmF0ZXNbMF0gKyBpID49IGJvYXJkV2lkdGggfHwgc3RhcnRDb29yZGluYXRlc1sxXSA+PSBib2FyZEhlaWdodCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbc3RhcnRDb29yZGluYXRlc1swXSArIGksIHN0YXJ0Q29vcmRpbmF0ZXNbMV1dKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIHNoaXAgaXMgdmVydGljYWwgKi9cbiAgICAgICAgaWYgKHN0YXJ0Q29vcmRpbmF0ZXNbMF0gPj0gYm9hcmRXaWR0aCB8fCBzdGFydENvb3JkaW5hdGVzWzFdICsgaSA+PSBib2FyZEhlaWdodCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbc3RhcnRDb29yZGluYXRlc1swXSwgc3RhcnRDb29yZGluYXRlc1sxXSArIGldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYXZhaWxpYWJsZUNvb3JkaW5hdGVzID0gc2hpcENvb3JkaW5hdGVzLmZpbHRlcigoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGlmIChpc0FkamFjZW50KGNvb3JkaW5hdGVzLCBzaGlwcykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoYXZhaWxpYWJsZUNvb3JkaW5hdGVzLmxlbmd0aCAhPT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXM7XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCByb3RhdGlvbikgPT4ge1xuICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IGlzUG9zaXRpb25BdmFpbGlhYmxlKGxlbmd0aCwgc3RhcnRDb29yZGluYXRlcywgcm90YXRpb24sIHBsYWNlZFNoaXBzKTtcbiAgICBpZiAoc2hpcENvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCBzaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgcGxhY2VkU2hpcHMucHVzaChzaGlwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChhdHRhY2tDb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IGF0dGFja2VkU2hpcCA9IHBsYWNlZFNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5oYXNDb29yZGluYXRlcyhhdHRhY2tDb29yZGluYXRlcykpO1xuICAgIGlmIChhdHRhY2tlZFNoaXAubGVuZ3RoID09PSAxKSB7XG4gICAgICBoaXRBdHRhY2tzLnB1c2goYXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgICAgYXR0YWNrZWRTaGlwWzBdLmhpdChhdHRhY2tDb29yZGluYXRlcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IFxuICAgIG1pc3NlZEF0dGFja3MucHVzaChhdHRhY2tDb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgaXNHYW1lT3ZlciA9ICgpID0+IHBsYWNlZFNoaXBzLmV2ZXJ5KChwbGFjZWRTaGlwKSA9PiBwbGFjZWRTaGlwLmlzU3VuaygpKTtcblxuICBjb25zdCBpc1Bvc2l0aW9uRnJlZVRvQXR0YWNrID0gKGF0dGFja0Nvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgcG9zaXRpb25DaGVjayA9IChjb29yZGluYXRlcykgPT4ge1xuICAgICAgaWYgKGNvb3JkaW5hdGVzWzBdICE9PSBhdHRhY2tDb29yZGluYXRlc1swXSB8fCBjb29yZGluYXRlc1sxXSAhPT0gYXR0YWNrQ29vcmRpbmF0ZXNbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGZyZWVQb3NpdGlvbiA9IG1pc3NlZEF0dGFja3MuZXZlcnkocG9zaXRpb25DaGVjaykgJiYgaGl0QXR0YWNrcy5ldmVyeShwb3NpdGlvbkNoZWNrKTtcbiAgICByZXR1cm4gZnJlZVBvc2l0aW9uO1xuICB9IFxuXG4gIGNvbnN0IGdldEFsbENvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsbENvb3JkaW5hdGVzID0gcGxhY2VkU2hpcHMubWFwKChzaGlwKSA9PiAgc2hpcC5nZXRTaGlwQ29vcmRpbmF0ZXMoKSk7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5hbGxDb29yZGluYXRlcyk7XG4gIH1cblxuICBjb25zdCBjbGVhckJvYXJkID0gKCkgPT4ge1xuICAgIHBsYWNlZFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGNvbnN0IHNoaXBJbmRleCA9IHBsYWNlZFNoaXBzLmluZGV4T2Yoc2hpcCk7XG4gICAgICBwbGFjZWRTaGlwc1tzaGlwSW5kZXhdID0gbnVsbDtcbiAgICB9KTtcbiAgICBwbGFjZWRTaGlwcyA9IFtdO1xuICAgIG1pc3NlZEF0dGFja3MgPSBbXTtcbiAgICBoaXRBdHRhY2tzID0gW107XG4gIH1cblxuICBjb25zdCBwb3B1bGF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGNsZWFyQm9hcmQoKTtcbiAgICBsZXQgc2hpcHNQbGFjZWQgPSAwO1xuICAgIGxldCBsZW5ndGggPSA1O1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoc2hpcHNQbGFjZWQgPCAxMCkge1xuICAgICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCByb3RhdGlvbiA9IHJvdGF0aW9uQ2hvaWNlKCk7XG4gICAgICBjb25zdCBwbGFjZWRTaGlwID0gcGxhY2VTaGlwKGxlbmd0aCwgW3JhbmRvbVgsIHJhbmRvbVldLCByb3RhdGlvbik7XG4gICAgICBpZiAocGxhY2VkU2hpcCkge1xuICAgICAgICBzaGlwc1BsYWNlZCArPSAxO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHNoaXBzUGxhY2VkKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBsZW5ndGggPSA0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgbGVuZ3RoID0gMztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgIGxlbmd0aCA9IDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGkgKz0gMTtcbiAgICAgIC8qXG4gICAgICAgIFRoZXJlIGFyZSBzb21lIGNhc2VzIHdoZXJlIGl0IGlzIGltcG9zc2libGUgdG8gcGxhY2UgYW5vdGhlciBzaGlwIGR1ZSB0byB0aGUgYm9hcmQgbGF5b3V0IHJlc3VsdGluZ1xuICAgICAgICBpbiBhIGluZmluaXRlIGxvb3AuIGkgaXMgaGVyZSB0byBkZXRlY3QgYW4gaW5maW5pdGUgbG9vcCBhbmQgcmVzZXQgdGhlIGJvYXJkIGFuZCB0cnkgYWdhaW4gd2hlbiBvbmVcbiAgICAgICAgaGFwcGVucy5cbiAgICAgICovXG4gICAgICBpZiAoIGkgPT09IDEwMDApIHtcbiAgICAgICAgY2xlYXJCb2FyZCgpO1xuICAgICAgICBzaGlwc1BsYWNlZCA9IDA7XG4gICAgICAgIGxlbmd0aCA9IDU7XG4gICAgICAgIGkgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldExhc3RDcmVhdGVkU2hpcCA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0U2hpcCA9IHBsYWNlZFNoaXBzW3BsYWNlZFNoaXBzLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBsYXN0U2hpcDtcbiAgfVxuXG4gIGNvbnN0IHN1bmtTaGlwQ2hlY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3Vua1NoaXAgPSBwbGFjZWRTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xuICAgIGlmIChzdW5rU2hpcC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bmtTaGlwO1xuICB9XG5cbiAgY29uc3QgcmVtb3ZlU3Vua1NoaXAgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3Vua1NoaXAgPSBzdW5rU2hpcENoZWNrKCk7XG4gICAgaWYgKCFzdW5rU2hpcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBzdW5rU2hpcEluZGV4ID0gcGxhY2VkU2hpcHMuaW5kZXhPZihzdW5rU2hpcFswXSk7XG4gICAgY29uc3QgcmVtb3ZlZFNoaXAgPSBwbGFjZWRTaGlwcy5zcGxpY2Uoc3Vua1NoaXBJbmRleCwgMSk7XG4gICAgc3Vua1NoaXBbMF0gPSBudWxsO1xuICAgIHJldHVybiByZW1vdmVkU2hpcFswXTtcbiAgfVxuXG4gIGNvbnN0IGNvcHlQbGFjZWRTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBjb3B5ID0gW107XG4gICAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29weS5wdXNoKHNoaXApO1xuICAgIH0pO1xuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgY29uc3QgaXNCb2FyZENvbXBsZXRlID0gKCkgPT4gcGxhY2VkU2hpcHMubGVuZ3RoID09PSAxMDtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGlzR2FtZU92ZXIsXG4gICAgaXNQb3NpdGlvbkZyZWVUb0F0dGFjayxcbiAgICBnZXRBbGxDb29yZGluYXRlcyxcbiAgICBjbGVhckJvYXJkLFxuICAgIHBvcHVsYXRlQm9hcmQsXG4gICAgc3Vua1NoaXBDaGVjayxcbiAgICByZW1vdmVTdW5rU2hpcCxcbiAgICBnZXRMYXN0Q3JlYXRlZFNoaXAsXG4gICAgaXNQb3NpdGlvbkF2YWlsaWFibGUsXG4gICAgY29weVBsYWNlZFNoaXBzLFxuICAgIGlzQm9hcmRDb21wbGV0ZSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQ7IiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdhbWVFdmVudHMgZnJvbSAnLi91c2VySW50ZXJmYWNlL2dhbWVFdmVudHMnO1xuaW1wb3J0IFBsYWNlbWVudEV2ZW50cyBmcm9tICcuL3VzZXJJbnRlcmZhY2UvcGxhY2VtZW50RXZlbnRzJztcbmltcG9ydCByZW5kZXJHcmlkcyAgZnJvbSAnLi91c2VySW50ZXJmYWNlL3JlbmRlclVJJztcblxuY29uc3QgZ2FtZVN0YXJ0ID0gKCkgPT4ge1xuICBjb25zdCBodW1hblBsYXllciA9IFBsYXllcigpO1xuICBjb25zdCBodW1hbkJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gQ29tcHV0ZXJQbGF5ZXIoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIHJlbmRlckdyaWRzKGh1bWFuQm9hcmQuZ2V0QWxsQ29vcmRpbmF0ZXMoKSk7XG4gIEdhbWVFdmVudHMucGFnZUxpc3RlbmVycyhodW1hblBsYXllciwgaHVtYW5Cb2FyZCwgY29tcHV0ZXJQbGF5ZXIsIGNvbXB1dGVyQm9hcmQpO1xuICBQbGFjZW1lbnRFdmVudHMucGxhY2VtZW50TGlzdGVuZXJzKGh1bWFuQm9hcmQsIGh1bWFuUGxheWVyLCBjb21wdXRlckJvYXJkKTtcblxuICByZXR1cm4ge1xuICAgIGh1bWFuUGxheWVyLFxuICAgIGh1bWFuQm9hcmQsXG4gICAgY29tcHV0ZXJQbGF5ZXIsXG4gICAgY29tcHV0ZXJCb2FyZCxcbiAgfVxufVxuXG5leHBvcnQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydFxuICBnYW1lU3RhcnQsXG59IiwiY29uc3QgUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCBhdHRhY2tFbmVteUJvYXJkID0gKGVuZW15R2FtZUJvYXJkLCBhdHRhY2tDb29yZGluYXRlcykgPT4ge1xuICAgIC8qIFJldHVybnMgdHJ1ZSBpZiBhIHNoaXAgd2FzIGhpdCAqL1xuICAgIGNvbnN0IHNoaXBBdHRhY2tlZCA9IGVuZW15R2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBzaGlwQXR0YWNrZWQ7XG4gIH1cblxuICBjb25zdCBnZXRQbGF5ZXJTaGlwID0gKGNvb3JkaW5hdGVzLCBwbGF5ZXJHYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCBhbGxQbGFjZWRTaGlwcyA9IHBsYXllckdhbWVCb2FyZC5jb3B5UGxhY2VkU2hpcHMoKTtcbiAgICBjb25zdCB0YXJnZXRTaGlwID0gYWxsUGxhY2VkU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLmhhc0Nvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSlbMF07XG4gICAgcmV0dXJuIHRhcmdldFNoaXA7XG4gIH1cblxuICBjb25zdCByb3RhdGVCb2FyZFNoaXAgPSAocGxheWVyR2FtZUJvYXJkLCB0YXJnZXRTaGlwKSA9PiB7XG4gICAgdGFyZ2V0U2hpcC5yb3RhdGVTaGlwSWZQb3NzaWJsZShwbGF5ZXJHYW1lQm9hcmQpO1xuICAgIHJldHVybiB0YXJnZXRTaGlwO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhdHRhY2tFbmVteUJvYXJkLFxuICAgIHJvdGF0ZUJvYXJkU2hpcCxcbiAgICBnZXRQbGF5ZXJTaGlwLFxuICB9XG59XG5cbmNvbnN0IENvbXB1dGVyUGxheWVyID0gKCkgPT4ge1xuXG4gIC8qIFVzZWQgdG8gc3RvcmUgYWxsIHRoZSBhdHRhY2tzIG1hZGUgYnkgdGhlIGNvbXB1dGVyICovXG4gIGNvbnN0IHN1Y2Nlc3NmdWxBdHRhY2tzID0gW107XG4gIGNvbnN0IGFkamFjZW50QXR0YWNrRnVuY3Rpb25zID0gW1xuICAgIChjb29yZGluYXRlcykgPT4gW2Nvb3JkaW5hdGVzWzBdIC0gMSwgY29vcmRpbmF0ZXNbMV1dLCAvKiBMZWZ0ICovXG4gICAgKGNvb3JkaW5hdGVzKSA9PiBbY29vcmRpbmF0ZXNbMF0gKyAxLCBjb29yZGluYXRlc1sxXV0sIC8qIFJpZ2h0ICovXG4gICAgKGNvb3JkaW5hdGVzKSA9PiBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdIC0gMV0sIC8qIFVwICovXG4gICAgKGNvb3JkaW5hdGVzKSA9PiBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdICsgMV0sIC8qIERvd24gKi9cbiAgXTtcbiAgbGV0IGluZGV4ID0gMDtcblxuICBjb25zdCBhdHRhY2tFbmVteUJvYXJkID0gKGVuZW15R2FtZUJvYXJkLCBhdHRhY2tDb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IHNoaXBBdHRhY2tlZCA9IGVuZW15R2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgIGlmIChzaGlwQXR0YWNrZWQpIHtcbiAgICAgIHN1Y2Nlc3NmdWxBdHRhY2tzLnB1c2goYXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgIH0gZWxzZSBpZiAoIXNoaXBBdHRhY2tlZCkge1xuICAgICAgaWYgKHN1Y2Nlc3NmdWxBdHRhY2tzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgc3VjY2Vzc2Z1bEF0dGFja3Muc3BsaWNlKDEpO1xuICAgICAgICBpbmRleCArPSAxO1xuICAgICAgfSBcbiAgICB9XG5cbiAgICBpZiAoZW5lbXlHYW1lQm9hcmQuc3Vua1NoaXBDaGVjaygpKSB7XG4gICAgICBzdWNjZXNzZnVsQXR0YWNrcy5zcGxpY2UoMCk7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoaXBBdHRhY2tlZDtcbiAgfVxuXG4gIGNvbnN0IHBpY2tSYW5kb21Db29yZGluYXRlcyA9IChlbmVteUdhbWVCb2FyZCkgPT4ge1xuICAgIGxldCByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBjb29yZGluYXRlcyA9IFtyYW5kb21YLCByYW5kb21ZXTtcbiAgICB3aGlsZSAoIWVuZW15R2FtZUJvYXJkLmlzUG9zaXRpb25GcmVlVG9BdHRhY2soY29vcmRpbmF0ZXMpKSB7XG4gICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvb3JkaW5hdGVzID0gW3JhbmRvbVgsIHJhbmRvbVldO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICBjb25zdCBwaWNrQWRqYWNlbnRDb29yZGluYXRlcyA9IChlbmVteUdhbWVCb2FyZCkgPT4ge1xuICAgIGxldCBsYXN0Q29vcmRpbmF0ZXMgPSBzdWNjZXNzZnVsQXR0YWNrc1tzdWNjZXNzZnVsQXR0YWNrcy5sZW5ndGggLSAxXTtcbiAgICBsZXQgW3gsIHldID0gYWRqYWNlbnRBdHRhY2tGdW5jdGlvbnNbaW5kZXhdKGxhc3RDb29yZGluYXRlcyk7XG5cbiAgICBpZiAoIFxuICAgICAgIWVuZW15R2FtZUJvYXJkLmlzUG9zaXRpb25GcmVlVG9BdHRhY2soW3gsIHldKSBcbiAgICAgIHx8IHggPiA5IHx8IHkgPiA5ICBcbiAgICAgIHx8IHggPCAwIHx8IHkgPCAwXG4gICAgICApIHtcbiAgICAgIHN1Y2Nlc3NmdWxBdHRhY2tzLnNwbGljZSgxKTtcbiAgICAgIGxhc3RDb29yZGluYXRlcyA9IHN1Y2Nlc3NmdWxBdHRhY2tzW3N1Y2Nlc3NmdWxBdHRhY2tzLmxlbmd0aCAtIDFdO1xuICAgIH1cbiBcbiAgICB3aGlsZSAoIFxuICAgICAgIWVuZW15R2FtZUJvYXJkLmlzUG9zaXRpb25GcmVlVG9BdHRhY2soW3gsIHldKSBcbiAgICAgIHx8IHggPiA5IHx8IHkgPiA5IFxuICAgICAgfHwgeCA8IDAgfHwgeSA8IDBcbiAgICAgICkge1xuICAgICAgaW5kZXggKz0gMTtcbiAgICAgIFt4LCB5XSA9IGFkamFjZW50QXR0YWNrRnVuY3Rpb25zW2luZGV4XShsYXN0Q29vcmRpbmF0ZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBbeCwgeV07XG4gIH1cblxuICBjb25zdCBwaWNrQ29vcmRpbmF0ZXMgPSAoZW5lbXlHYW1lQm9hcmQpID0+IHtcbiAgICBpZiAoc3VjY2Vzc2Z1bEF0dGFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gcGlja1JhbmRvbUNvb3JkaW5hdGVzKGVuZW15R2FtZUJvYXJkKTtcbiAgICB9XG4gICAgcmV0dXJuIHBpY2tBZGphY2VudENvb3JkaW5hdGVzKGVuZW15R2FtZUJvYXJkKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrRW5lbXlCb2FyZCxcbiAgICBwaWNrQ29vcmRpbmF0ZXMsXG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGxheWVyLCBcbiAgQ29tcHV0ZXJQbGF5ZXIsXG59IiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIHN0YXJ0Q29vcmRpbmF0ZXMsIHNoaXBDb29yZGluYXRlcykgPT4ge1xuICAvKlxuICAgIEVhY2ggc2hpcCBjb29yZGluYXRlIGlzIHN0b3JlZCBhcyBhIGtleSBpbiB0aGUgb2JqZWN0IHdpdGggdGhlIFxuICAgIHZhbHVlIGJlaW5nIGEgYm9vbGVhbiBzaG93aW5nIHdoZXRoZXIgdGhlIHBvc2l0aW9uIGhhcyBiZWVuIGhpdFxuICAgIG9yIG5vdFxuICAqL1xuICBjb25zdCBzaGlwSGl0cyA9IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgc2hpcEhpdHNbc2hpcENvb3JkaW5hdGVzW2ldXSA9IGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgc2hpcE5hbWVzID0ge1xuICAgIDI6ICdEZXN0cm95ZXInLFxuICAgIDM6ICdDcnVpc2VyJyxcbiAgICA0OiAnQmF0dGxlc2hpcCcsXG4gICAgNTogJ0NhcnJpZXInLFxuICB9XG5cbiAgY29uc3QgZ2V0U2hpcE5hbWUgPSAoKSA9PiBzaGlwTmFtZXNbbGVuZ3RoXTtcblxuICBjb25zdCBnZXRTaGlwQ29vcmRpbmF0ZXMgPSAoKSA9PiBzaGlwQ29vcmRpbmF0ZXM7XG5cbiAgY29uc3QgaGFzQ29vcmRpbmF0ZXMgPSAoYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICBsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuICAgIHNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlcykgPT4ge1xuICAgICAgaWYgKGF0dGFja0Nvb3JkaW5hdGVzWzBdID09PSBjb29yZGluYXRlc1swXSBcbiAgICAgICAgJiYgYXR0YWNrQ29vcmRpbmF0ZXNbMV0gPT09IGNvb3JkaW5hdGVzWzFdKSB7XG4gICAgICAgICAgbWF0Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBtYXRjaEZvdW5kO1xuICB9XG5cbiAgY29uc3QgaGl0ID0gKGF0dGFja0Nvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXNLZXkgPSBhdHRhY2tDb29yZGluYXRlcy50b1N0cmluZygpO1xuICAgIHNoaXBIaXRzW2Nvb3JkaW5hdGVzS2V5XSA9IHRydWU7XG4gIH1cblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcEhpdEJvb2xzID0gT2JqZWN0LnZhbHVlcyhzaGlwSGl0cyk7XG4gICAgcmV0dXJuIHNoaXBIaXRCb29scy5ldmVyeSgoYm9vbCkgPT4gYm9vbCk7XG4gIH1cblxuICAvKiBDaGVja3MgaWYgeSBjb29yZGluYXRlcyBvZiB0aGUgc2hpcCBhcmUgdGhlIHNhbWUgKi9cbiAgY29uc3QgaXNTaGlwSG9yaXpvbnRhbCA9ICgpID0+IHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldFNoaXBDb29yZGluYXRlcygpO1xuICAgIGNvbnN0IFsgZmlyc3RDb29yZGluYXRlcywgc2Vjb25kQ29vcmRpbmF0ZXMgXSA9IGNvb3JkaW5hdGVzO1xuICAgIGlmIChmaXJzdENvb3JkaW5hdGVzWzFdID09PSBzZWNvbmRDb29yZGluYXRlc1sxXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG4gIGNvbnN0IHJvdGF0ZVNoaXAgPSAoKSA9PiB7XG4gICAgY29uc3QgaXNIb3Jpem9udGFsID0gaXNTaGlwSG9yaXpvbnRhbCgpO1xuICAgIHNoaXBDb29yZGluYXRlcy5sZW5ndGggPSAwO1xuICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRpbmF0ZXNbMF0sIHN0YXJ0Q29vcmRpbmF0ZXNbMV0gKyBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKz0gMSkge1xuICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbc3RhcnRDb29yZGluYXRlc1swXSArIGksIHN0YXJ0Q29vcmRpbmF0ZXNbMV1dKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiBcbiAgICBUaGlzIGZ1bmN0aW9uIHJvdGF0ZXMgYSBzaGlwIG9uIHRoZSBnYW1lYm9hcmQgYW5kIGNoZWNrcyBpZiB0aGUgbmV3IGNvb3JkaW5hdGVzIGFyZSBwb3NzaWJsZSBvbiB0aGUgZ2FtZWJvYXJkLlxuICAgIElmIHRoZSBwb3NpdGlvbiBpcyBwb3NzaWJsZSB0aGUgcm90YXRpb24gaXMga2VwdCwgaWYgaXQgaXMgbm90IHRoZW4gdGhlIHNoaXAgaXMgcm90YXRlZCBiYWNrIHRvIGl0cyBvcmlnaW5hbFxuICAgIHBvc2l0aW9uLlxuICAqL1xuICBjb25zdCByb3RhdGVTaGlwSWZQb3NzaWJsZSA9IChwbGF5ZXJHYW1lQm9hcmQpID0+IHtcbiAgICBsZXQgcm90YXRpb24gPSBpc1NoaXBIb3Jpem9udGFsKCk7XG4gICAgcm90YXRlU2hpcCgpO1xuICAgIHJvdGF0aW9uID0gIXJvdGF0aW9uO1xuICAgIGNvbnN0IHBsYWNlZFNoaXBzQ29weSA9IHBsYXllckdhbWVCb2FyZC5jb3B5UGxhY2VkU2hpcHMoKTtcbiAgICAvKiBGaWx0ZXJzIG91dCB0aGUgc2hpcCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQgKi9cbiAgICBjb25zdCBmaWx0ZXJlZFNoaXBzID0gcGxhY2VkU2hpcHNDb3B5LmZpbHRlcigocGxhY2VkU2hpcCkgPT4gcGxhY2VkU2hpcC5nZXRTaGlwQ29vcmRpbmF0ZXMoKVswXSAhPT0gc2hpcENvb3JkaW5hdGVzWzBdICk7XG4gICAgaWYgKHBsYXllckdhbWVCb2FyZC5pc1Bvc2l0aW9uQXZhaWxpYWJsZShsZW5ndGgsIHN0YXJ0Q29vcmRpbmF0ZXMsIHJvdGF0aW9uLCBmaWx0ZXJlZFNoaXBzKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBcbiAgICByb3RhdGVTaGlwKCk7XG4gICAgcm90YXRpb24gPSAhcm90YXRpb247XG4gICAgcmV0dXJuIGZhbHNlOyBcbiAgfVxuXG4gIGNvbnN0IGdldFNoaXBMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG5cblxuICByZXR1cm4ge1xuICAgIGdldFNoaXBOYW1lLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgaGFzQ29vcmRpbmF0ZXMsXG4gICAgZ2V0U2hpcENvb3JkaW5hdGVzLFxuICAgIHJvdGF0ZVNoaXBJZlBvc3NpYmxlLFxuICAgIGdldFNoaXBMZW5ndGgsXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IEVsZW1lbnRDcmVhdGlvbiBmcm9tIFwiLi4vZWxlbWVudENyZWF0aW9uXCI7XG5cbmNvbnN0IEdhbWVFdmVudHMgPSAoKCkgPT4ge1xuICBjb25zdCBwYWdlQ2xpY2tFdmVudHMgPSAoZXZlbnQsIHBsYXllciwgcGxheWVyR2FtZUJvYXJkLCBlbmVteSwgZW5lbXlHYW1lQm9hcmQpID0+IHtcblxuICAgIGNvbnN0IGNoYW5nZUdhbWVTdGF0dXNNZXNzYWdlID0gKG1lc3NhZ2VUeXBlLCBzdW5rU2hpcE5hbWUsIHBsYXllclR5cGUpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7bWVzc2FnZVR5cGV9LW1lc3NhZ2VgKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRTaG93bk1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1zdGF0dXMtbWVzc2FnZS5zaG93bicpO1xuXG4gICAgICBjdXJyZW50U2hvd25NZXNzYWdlLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3duJyk7XG5cbiAgICAgIGlmIChtZXNzYWdlVHlwZSA9PT0gJ3BsYXllci1zaW5rJykge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IGBZb3UgSGF2ZSBTdW5rIFRoZSBFbmVteSdzICR7c3Vua1NoaXBOYW1lfSFgO1xuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlVHlwZSA9PT0gJ2NvbXB1dGVyLXNpbmsnKSB7XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gYFlvdXIgJHtzdW5rU2hpcE5hbWV9IEhhcyBCZWVuIFN1bmshYDtcbiAgICAgIH1cblxuICAgICAgaWYgKHBsYXllclR5cGUgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM0NTdCOUQnO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXJUeXBlID09PSAnY29tcHV0ZXInKSB7XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNFNjM5NDYnO1xuICAgICAgfVxuXG4gICAgICBtZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93bicpO1xuICAgIH1cblxuICAgIGNvbnN0IHBsYXllck1vdmUgPSAoKSA9PiB7XG4gICAgICBjb25zdCB4Q29vcmRpbmF0ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LngsIDEwKTtcbiAgICAgIGNvbnN0IHlDb29yZGluYXRlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSwgMTApO1xuICAgICAgY29uc3Qgc2hpcEF0dGFja2VkID0gcGxheWVyLmF0dGFja0VuZW15Qm9hcmQoZW5lbXlHYW1lQm9hcmQsIFt4Q29vcmRpbmF0ZSwgeUNvb3JkaW5hdGVdKTtcbiAgICAgIGlmIChzaGlwQXR0YWNrZWQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnaGl0LWNpcmNsZScsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGNoYW5nZUdhbWVTdGF0dXNNZXNzYWdlKCdwbGF5ZXItaGl0JywgbnVsbCwgJ3BsYXllcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21pc3NlZCcpO1xuICAgICAgICBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnbWlzc2VkLWNpcmNsZScsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGNoYW5nZUdhbWVTdGF0dXNNZXNzYWdlKCdwbGF5ZXItbWlzcycsIG51bGwsICdwbGF5ZXInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wdXRlck1vdmUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjb21wdXRlckF0dGFja0Nvb3JkaW5hdGVzID0gZW5lbXkucGlja0Nvb3JkaW5hdGVzKHBsYXllckdhbWVCb2FyZCk7XG4gICAgICBjb25zdCBwbGF5ZXJTaGlwQXR0YWNrZWQgPSBlbmVteS5hdHRhY2tFbmVteUJvYXJkKHBsYXllckdhbWVCb2FyZCwgY29tcHV0ZXJBdHRhY2tDb29yZGluYXRlcyk7XG4gICAgICBjb25zdCBjb21wdXRlclRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke2NvbXB1dGVyQXR0YWNrQ29vcmRpbmF0ZXNbMF19XCJdW2RhdGEteT1cIiR7Y29tcHV0ZXJBdHRhY2tDb29yZGluYXRlc1sxXX1cIl1gKTtcbiAgICAgIGlmIChwbGF5ZXJTaGlwQXR0YWNrZWQpIHtcbiAgICAgICAgY29tcHV0ZXJUYXJnZXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgIGNvbXB1dGVyVGFyZ2V0LmNoaWxkTm9kZXNbMF0uY2xhc3NOYW1lID0gJ2hpdC1jaXJjbGUnO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgnY29tcHV0ZXItaGl0JywgbnVsbCwgJ2NvbXB1dGVyJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wdXRlclRhcmdldC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICAgICAgRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ21pc3NlZC1jaXJjbGUnLCBjb21wdXRlclRhcmdldCk7XG4gICAgICAgIGNoYW5nZUdhbWVTdGF0dXNNZXNzYWdlKCdjb21wdXRlci1taXNzJywgbnVsbCwgJ2NvbXB1dGVyJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlQ2xhc3NOYW1lID0gKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtjbGFzc05hbWV9YCk7XG4gICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyc7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZW1lbnRTaGlwQ291bnQgPSAoc2hpcE5hbWUsIG93bmVyKSA9PiB7XG4gICAgICBjb25zdCBzaGlwTmFtZUxvd2VyID0gc2hpcE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtvd25lcn0tc2VjdGlvbmApO1xuICAgICAgY29uc3Qgc2hpcENvdW50RWxlbWVudCA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcihgLiR7c2hpcE5hbWVMb3dlcn0tY291bnRgKTtcbiAgICAgIHNoaXBDb3VudEVsZW1lbnQuZGF0YXNldC5jb3VudCAtPSAxO1xuICAgICAgc2hpcENvdW50RWxlbWVudC50ZXh0Q29udGVudCA9IHNoaXBDb3VudEVsZW1lbnQuZGF0YXNldC5jb3VudDtcbiAgICB9XG5cbiAgICBjb25zdCByZXNldFNoaXBDb3VudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHBsYXllclNoaXBDb3VudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLXNlY3Rpb24gLnNoaXAtY291bnQnKTtcbiAgICAgIGNvbnN0IG9wcG9uZW50U2hpcENvdW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC1zZWN0aW9uIC5zaGlwLWNvdW50Jyk7XG4gICAgICBcbiAgICAgIHBsYXllclNoaXBDb3VudHMuZm9yRWFjaCgocGxheWVyU2hpcENvdW50LCBpbmRleCkgPT4ge1xuICAgICAgICBwbGF5ZXJTaGlwQ291bnQuZGF0YXNldC5jb3VudCA9IGluZGV4ICsgMTtcbiAgICAgICAgcGxheWVyU2hpcENvdW50LnRleHRDb250ZW50ID0gcGxheWVyU2hpcENvdW50LmRhdGFzZXQuY291bnQ7XG5cbiAgICAgICAgY29uc3Qgb3Bwb25lbnRTaGlwQ291bnQgPSBvcHBvbmVudFNoaXBDb3VudHNbaW5kZXhdO1xuICAgICAgICBvcHBvbmVudFNoaXBDb3VudC5kYXRhc2V0LmNvdW50ID0gaW5kZXggKyAxO1xuICAgICAgICBvcHBvbmVudFNoaXBDb3VudC50ZXh0Q29udGVudCA9IG9wcG9uZW50U2hpcENvdW50LmRhdGFzZXQuY291bnQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNldEdhbWVTdGF0dXNNZXNzYWdlID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVzZXRHYW1lU3RhdHVzTWVzc2FnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZS1zdGF0dXMtbWVzc2FnZScpO1xuICAgICAgcmVzZXRHYW1lU3RhdHVzTWVzc2FnZXMuZm9yRWFjaCgobWVzc2FnZSkgPT4gbWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93bicpKTtcbiAgICAgIGNvbnN0IHdhaXRNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndhaXQtbWVzc2FnZScpXG4gICAgICB3YWl0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdzaG93bicpO1xuICAgICAgd2FpdE1lc3NhZ2UucGFyZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzQ1N0I5RCc7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRHYW1lID0gKCkgPT4ge1xuICAgICAgcGxheWVyR2FtZUJvYXJkLmNsZWFyQm9hcmQoKTtcbiAgICAgIGVuZW15R2FtZUJvYXJkLmNsZWFyQm9hcmQoKTtcbiAgICAgIHJlbW92ZUNsYXNzTmFtZSgnbWlzc2VkJyk7XG4gICAgICByZW1vdmVDbGFzc05hbWUoJ2hpdCcpO1xuICAgICAgcmVtb3ZlQ2xhc3NOYW1lKCdzaGlwLXBsYWNlZCcpO1xuICAgICAgcmVzZXRTaGlwQ291bnQoKTtcbiAgICAgIHJlc2V0R2FtZVN0YXR1c01lc3NhZ2UoKTtcbiAgICAgIGNvbnN0IHNoaXBQbGFjZW1lbnRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwLXBsYWNlbWVudC1tb2RhbCcpO1xuICAgICAgc2hpcFBsYWNlbWVudE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIGNvbnN0IHN1bmtTaGlwQ2hlY2sgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICBjb25zdCBzdW5rU2hpcCA9IGdhbWVCb2FyZC5yZW1vdmVTdW5rU2hpcCgpO1xuICAgICAgcmV0dXJuIHN1bmtTaGlwO1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNhYmxlUGxheWVyQWN0aW9ucyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG9wcG9uZW50R3JpZFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtc3F1YXJlJyk7XG4gICAgICBvcHBvbmVudEdyaWRTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4gc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJykpO1xuICAgIH1cbiBcbiAgICBjb25zdCBlbmFibGVQbGF5ZXJBY3Rpb25zID0gKCkgPT4ge1xuICAgICAgY29uc3Qgb3Bwb25lbnRHcmlkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC1zcXVhcmUnKTtcbiAgICAgIG9wcG9uZW50R3JpZFNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKSk7XG4gICAgfVxuXG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQtc3F1YXJlIG9wcG9uZW50LXNxdWFyZScpIHtcbiAgICAgIC8qIENvbnRyb2xzIHRoZSBmbG93IG9mIGEgZ2FtZSAqL1xuICAgICAgcGxheWVyTW92ZSgpO1xuICAgICAgY29uc3QgcGxheWVyV2luID0gZW5lbXlHYW1lQm9hcmQuaXNHYW1lT3ZlcigpO1xuICAgICAgY29uc3QgZW5lbXlTdW5rU2hpcENoZWNrID0gc3Vua1NoaXBDaGVjayhlbmVteUdhbWVCb2FyZCk7XG5cbiAgICAgIGlmIChlbmVteVN1bmtTaGlwQ2hlY2spIHtcbiAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gZW5lbXlTdW5rU2hpcENoZWNrLmdldFNoaXBDb29yZGluYXRlcygpO1xuICAgICAgICBjb25zdCBzaGlwTmFtZSA9IGVuZW15U3Vua1NoaXBDaGVjay5nZXRTaGlwTmFtZSgpO1xuICAgICAgICBzaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ3JpZFNxdWFyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAub3Bwb25lbnQtc3F1YXJlW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xuICAgICAgICAgIGdyaWRTcXVhcmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KSc7XG4gICAgICAgIH0pO1xuICAgICAgICBkZWNyZW1lbnRTaGlwQ291bnQoc2hpcE5hbWUsICdvcHBvbmVudCcpO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgncGxheWVyLXNpbmsnLCBzaGlwTmFtZSwgJ3BsYXllcicpO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXllcldpbikge1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgncGxheWVyLXdpbicsIG51bGwsICdwbGF5ZXInKTtcbiAgICAgICAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4tYnRuLWNvbnRhaW5lcicpO1xuICAgICAgICBwbGF5QWdhaW5CdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGRpc2FibGVQbGF5ZXJBY3Rpb25zKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc2FibGVQbGF5ZXJBY3Rpb25zKCk7IC8qIFN0b3BzIHBsYXllciBmcm9tIG1ha2luZyBhIG1vdmUgb24gdGhlIGNvbXB1dGVyJ3MgdHVybiAqL1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbXB1dGVyTW92ZSgpO1xuICAgICAgICBjb25zdCBjb21wdXRlcldpbiA9IHBsYXllckdhbWVCb2FyZC5pc0dhbWVPdmVyKCk7XG4gICAgICAgIGNvbnN0IHBsYXllclN1bmtTaGlwQ2hlY2sgPSBzdW5rU2hpcENoZWNrKHBsYXllckdhbWVCb2FyZCk7XG4gICAgICAgIGlmIChwbGF5ZXJTdW5rU2hpcENoZWNrKXtcbiAgICAgICAgICBjb25zdCBwbGF5ZXJTaGlwTmFtZSA9IHBsYXllclN1bmtTaGlwQ2hlY2suZ2V0U2hpcE5hbWUoKTtcbiAgICAgICAgICBkZWNyZW1lbnRTaGlwQ291bnQocGxheWVyU2hpcE5hbWUsICdwbGF5ZXInKTtcbiAgICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgnY29tcHV0ZXItc2luaycsIHBsYXllclNoaXBOYW1lLCAnY29tcHV0ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcHV0ZXJXaW4pIHtcbiAgICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgnY29tcHV0ZXItd2luJywgbnVsbCwgJ2NvbXB1dGVyJyk7XG4gICAgICAgICAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4tYnRuLWNvbnRhaW5lcicpO1xuICAgICAgICAgIHBsYXlBZ2FpbkJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgICAgIFxuICAgICAgICAgIGRpc2FibGVQbGF5ZXJBY3Rpb25zKCk7ICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmFibGVQbGF5ZXJBY3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAnZ2FtZS1yZXNldC1idG4nIHx8IGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdwbGF5LWFnYWluLWJ0bicpIHtcbiAgICAgIHJlc2V0R2FtZSgpO1xuICAgICAgZW5hYmxlUGxheWVyQWN0aW9ucygpO1xuICAgICAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4tYnRuLWNvbnRhaW5lcicpO1xuICAgICAgcGxheUFnYWluQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7ICBcbiAgICAgIGNvbnN0IGRlcGxveUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXBsb3ktYnRuJyk7XG4gICAgICBkZXBsb3lCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBhZ2VMaXN0ZW5lcnMgPSAocGxheWVyLCBwbGF5ZXJHYW1lQm9hcmQsIGVuZW15LCBlbmVteUdhbWVCb2FyZCkgPT4ge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBwYWdlQ2xpY2tFdmVudHMoZXZlbnQsIHBsYXllciwgcGxheWVyR2FtZUJvYXJkLCBlbmVteSwgZW5lbXlHYW1lQm9hcmQpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYWdlTGlzdGVuZXJzLFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lRXZlbnRzOyIsImltcG9ydCBFbGVtZW50Q3JlYXRpb24gZnJvbSBcIi4uL2VsZW1lbnRDcmVhdGlvblwiO1xuXG5jb25zdCBQbGFjZW1lbnRFdmVudHMgPSAoKCkgPT4ge1xuXG4gIGNvbnN0IGRlcGxveUNoZWNrID0gKHBsYXllckdhbWVCb2FyZCkgPT4ge1xuICAgIGNvbnN0IGRlcGxveUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXBsb3ktYnRuJyk7XG4gICAgaWYgKHBsYXllckdhbWVCb2FyZC5pc0JvYXJkQ29tcGxldGUoKSkge1xuICAgICAgZGVwbG95QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlcGxveUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICBcbiAgfVxuICBjb25zdCBkcmFnU3RhcnRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3RbMF0gPT09ICdzaGlwLWRpc3BsYXknKXtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gXCJjb3B5XCI7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIGV2ZW50LnRhcmdldC5jbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRyYWdFbnRlckhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQtc3F1YXJlIHBsYWNlbWVudC1zcXVhcmUnKSB7XG4gICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNENkVDRTUnO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRyYWdMZWF2ZUhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQtc3F1YXJlIHBsYWNlbWVudC1zcXVhcmUnKSB7XG4gICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNBOERBREMnO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRyb3BIYW5kbGVyID0gKGV2ZW50LCBwbGF5ZXJHYW1lQm9hcmQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAnZ3JpZC1zcXVhcmUgcGxhY2VtZW50LXNxdWFyZScpIHtcbiAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJztcbiAgICAgIGNvbnN0IHNoaXBEaXNwbGF5Q2xhc3NOYW1lID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKS5zcGxpdCgnICcpO1xuICAgICAgY29uc3QgZGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3NoaXBEaXNwbGF5Q2xhc3NOYW1lWzBdfS4ke3NoaXBEaXNwbGF5Q2xhc3NOYW1lWzFdfWApLnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBkaXNwbGF5Q291bnQgPSBkaXNwbGF5Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kaXNwbGF5LWNvdW50Jyk7XG4gICAgICBjb25zdCBzaGlwTGVuZ3RoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7c2hpcERpc3BsYXlDbGFzc05hbWVbMF19LiR7c2hpcERpc3BsYXlDbGFzc05hbWVbMV19IC5ncmlkLXNxdWFyZWApLmxlbmd0aDtcbiAgICAgIGNvbnN0IHhDb29yZGluYXRlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueCwgMTApO1xuICAgICAgY29uc3QgeUNvb3JkaW5hdGUgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC55LCAxMCk7XG4gICAgICAvKiBPbmx5IHBsYWNlcyB0aGUgc2hpcCBvbiB0aGUgYm9hcmQgaWYgdGhlcmUgYXJlIGVub3VnaCBsZWZ0IGFuZCBpZiB0aGUgc2hpcHMgY29vcmRpbmF0ZXMgYXJlIHZhbGlkICovXG4gICAgICBpZiAoIHBhcnNlSW50KGRpc3BsYXlDb3VudC5kYXRhc2V0LmRpc3BsYXlDb3VudCwgMTApID4gMCkge1xuICAgICAgICBjb25zdCBzaGlwUGxhY2VtZW50ID0gcGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3RoLCBbeENvb3JkaW5hdGUsIHlDb29yZGluYXRlXSwgdHJ1ZSk7XG4gICAgICAgIGlmIChzaGlwUGxhY2VtZW50KSB7XG4gICAgICAgICAgY29uc3QgY3JlYXRlZFNoaXAgPSBwbGF5ZXJHYW1lQm9hcmQuZ2V0TGFzdENyZWF0ZWRTaGlwKCk7XG4gICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gY3JlYXRlZFNoaXAuZ2V0U2hpcENvb3JkaW5hdGVzKCk7XG4gICAgICAgICAgc2hpcENvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJET01Db29yZGluYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGFjZW1lbnQtc3F1YXJlW2RhdGEteD1cIiR7Y29vcmRpbmF0ZXNbMF19XCJdW2RhdGEteT1cIiR7Y29vcmRpbmF0ZXNbMV19XCJdYCk7XG4gICAgICAgICAgICBwbGF5ZXJET01Db29yZGluYXRlcy5jbGFzc0xpc3QuYWRkKCdzaGlwLXBsYWNlZCcpO1xuICAgICAgICAgICAgcGxheWVyRE9NQ29vcmRpbmF0ZXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTI4LCAxMjgsIDEyOCwgMC4zMjkpJztcbiAgICAgICAgICAgIEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdzaGlwLWNpcmNsZScsIHBsYXllckRPTUNvb3JkaW5hdGVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkaXNwbGF5Q291bnQuZGF0YXNldC5kaXNwbGF5Q291bnQgPSBwYXJzZUludChkaXNwbGF5Q291bnQuZGF0YXNldC5kaXNwbGF5Q291bnQsIDEwKSAtIDE7XG4gICAgICAgICAgZGlzcGxheUNvdW50LmlubmVySFRNTCA9IGAmIzIxNTske2Rpc3BsYXlDb3VudC5kYXRhc2V0LmRpc3BsYXlDb3VudH1gOyBcbiAgICAgICAgICBkZXBsb3lDaGVjayhwbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xpY2tIYW5kbGVycyA9IChldmVudCwgcGxheWVyR2FtZUJvYXJkLCBwbGF5ZXIsIGVuZW15R2FtZUJvYXJkKSA9PiB7XG5cbiAgICBjb25zdCByZW1vdmVQbGFjZWRTaGlwRWxlbWVudHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKFt4LCB5XSkgPT4ge1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxhY2VtZW50LXNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcbiAgICAgICAgcGxhY2VtZW50U3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnO1xuICAgICAgICBwbGFjZW1lbnRTcXVhcmUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgcGxhY2VtZW50U3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcGxhY2VkJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRQbGFjZWRTaGlwRWxlbWVudHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKFt4LCB5XSkgPT4ge1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxhY2VtZW50LXNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcbiAgICAgICAgcGxhY2VtZW50U3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KSc7XG4gICAgICAgIEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdzaGlwLWNpcmNsZScsIHBsYWNlbWVudFNxdWFyZSk7XG4gICAgICAgIHBsYWNlbWVudFNxdWFyZS5jbGFzc0xpc3QuYWRkKCdzaGlwLXBsYWNlZCcpO1xuICAgICAgfSk7ICAgICBcbiAgICB9XG5cbiAgICBjb25zdCByZXNldEJvYXJkID0gKCkgPT4ge1xuICAgICAgY29uc3Qgc2hpcFBsYWNlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYWNlbWVudC1ncmlkIC5zaGlwLXBsYWNlZCcpO1xuICAgICAgc2hpcFBsYWNlZEVsZW1lbnRzLmZvckVhY2goKHNoaXBFbGVtZW50KSA9PiB7XG4gICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcGxhY2VkJyk7XG4gICAgICAgIHNoaXBFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnO1xuICAgICAgICBzaGlwRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmFuZG9tbHlQb3B1bGF0ZUJvYXJkID0gKCkgPT4ge1xuICAgICAgcmVzZXRCb2FyZCgpO1xuICAgICAgcGxheWVyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoKTtcbiAgICAgIGNvbnN0IHBsYXllckJvYXJkQ29vcmRpbmF0ZXMgPSBwbGF5ZXJHYW1lQm9hcmQuZ2V0QWxsQ29vcmRpbmF0ZXMoKTtcbiAgICAgIGFkZFBsYWNlZFNoaXBFbGVtZW50cyhwbGF5ZXJCb2FyZENvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZXREaXNwbGF5Q291bnRzID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGlzcGxheUNvdW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaXNwbGF5LWNvdW50Jyk7XG4gICAgICBsZXQgbnVtYmVyT2ZTaGlwcyA9IDE7XG4gICAgICBkaXNwbGF5Q291bnRzLmZvckVhY2goKGNvdW50KSA9PiB7XG4gICAgICAgIGNvdW50LmRhdGFzZXQuZGlzcGxheUNvdW50ID0gbnVtYmVyT2ZTaGlwcztcbiAgICAgICAgY291bnQuaW5uZXJIVE1MID0gYCYjMjE1OyR7Y291bnQuZGF0YXNldC5kaXNwbGF5Q291bnR9YDtcbiAgICAgICAgbnVtYmVyT2ZTaGlwcyArPSAxO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0RGlzcGxheUNvdW50c1RvWmVybyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRpc3BsYXlDb3VudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlzcGxheS1jb3VudCcpO1xuICAgICAgZGlzcGxheUNvdW50cy5mb3JFYWNoKChjb3VudCkgPT4gIHtcbiAgICAgICAgY291bnQuZGF0YXNldC5kaXNwbGF5Q291bnQgPSAwO1xuICAgICAgICBjb3VudC5pbm5lckhUTUwgPSBgJiMyMTU7JHtjb3VudC5kYXRhc2V0LmRpc3BsYXlDb3VudH1gO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBkZXBsb3lTaGlwcyA9ICgpID0+IHtcbiAgICAgIHJlc2V0Qm9hcmQoKTtcbiAgICAgIGNvbnN0IHBsYXllckNvb3JkaW5hdGVzID0gcGxheWVyR2FtZUJvYXJkLmdldEFsbENvb3JkaW5hdGVzKCk7XG4gICAgICBwbGF5ZXJDb29yZGluYXRlcy5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgICAgY29uc3QgcGxheWVyRE9NQ29vcmRpbmF0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyLXNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcbiAgICAgICAgcGxheWVyRE9NQ29vcmRpbmF0ZXMuY2xhc3NMaXN0LmFkZCgnc2hpcC1wbGFjZWQnKTtcbiAgICAgICAgcGxheWVyRE9NQ29vcmRpbmF0ZXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTI4LCAxMjgsIDEyOCwgMC4zMjkpJztcbiAgICAgICAgRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ3NoaXAtY2lyY2xlJywgcGxheWVyRE9NQ29vcmRpbmF0ZXMpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBzaGlwUGxhY2VtZW50TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcC1wbGFjZW1lbnQtbW9kYWwnKTtcbiAgICAgIHNoaXBQbGFjZW1lbnRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGxldCB0YXJnZXQ7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdzaGlwLWNpcmNsZScpIHtcbiAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkLXNxdWFyZSBwbGFjZW1lbnQtc3F1YXJlIHNoaXAtcGxhY2VkJykge1xuICAgICAgLyogUm90YXRlcyBhIHNoaXAgd2hlbiBpdCBpcyBjbGlja2VkICovXG4gICAgICBjb25zdCB4Q29vcmRpbmF0ZSA9IHBhcnNlSW50KHRhcmdldC5kYXRhc2V0LngsIDEwKTtcbiAgICAgIGNvbnN0IHlDb29yZGluYXRlID0gcGFyc2VJbnQodGFyZ2V0LmRhdGFzZXQueSwgMTApO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbeENvb3JkaW5hdGUsIHlDb29yZGluYXRlXTtcbiAgICAgIGNvbnN0IHBsYXllclNoaXAgPSBwbGF5ZXIuZ2V0UGxheWVyU2hpcChjb29yZGluYXRlcywgcGxheWVyR2FtZUJvYXJkKVxuICAgICAgY29uc3QgcGxheWVyU2hpcENvb3JkaW5hdGVzID0gcGxheWVyU2hpcC5nZXRTaGlwQ29vcmRpbmF0ZXMoKTtcbiAgICAgIHJlbW92ZVBsYWNlZFNoaXBFbGVtZW50cyhwbGF5ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3Qgcm90YXRlZFNoaXBDb29yZGluYXRlcyA9IHBsYXllci5yb3RhdGVCb2FyZFNoaXAocGxheWVyR2FtZUJvYXJkLCBwbGF5ZXJTaGlwKS5nZXRTaGlwQ29vcmRpbmF0ZXMoKTtcbiAgICAgIGFkZFBsYWNlZFNoaXBFbGVtZW50cyhyb3RhdGVkU2hpcENvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3BsYWNlbWVudC1idG4gcmFuZG9tLWJ0bicpIHtcbiAgICAgIHJhbmRvbWx5UG9wdWxhdGVCb2FyZCgpO1xuICAgICAgc2V0RGlzcGxheUNvdW50c1RvWmVybygpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAncGxhY2VtZW50LWJ0biByZXNldC1idG4nKSB7XG4gICAgICBwbGF5ZXJHYW1lQm9hcmQuY2xlYXJCb2FyZCgpO1xuICAgICAgcmVzZXRCb2FyZCgpO1xuICAgICAgc2V0RGlzcGxheUNvdW50cygpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAncGxhY2VtZW50LWJ0biBkZXBsb3ktYnRuJykge1xuICAgICAgZGVwbG95U2hpcHMoKTtcbiAgICAgIGVuZW15R2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoKTtcbiAgICAgIHNldERpc3BsYXlDb3VudHMoKTtcbiAgICB9XG4gICAgZGVwbG95Q2hlY2socGxheWVyR2FtZUJvYXJkKTtcbiAgfVxuXG4gIGNvbnN0IHBsYWNlbWVudExpc3RlbmVycyA9IChwbGF5ZXJHYW1lQm9hcmQsIHBsYXllciwgZW5lbXlHYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCBzaGlwUGxhY2VtZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAtcGxhY2VtZW50LWNvbnRhaW5lcicpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydEhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwiY29weVwiXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlckhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZUhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZXZlbnQpID0+IGRyb3BIYW5kbGVyKGV2ZW50LCBwbGF5ZXJHYW1lQm9hcmQpKTtcbiAgICBzaGlwUGxhY2VtZW50Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiBjbGlja0hhbmRsZXJzKGV2ZW50LCBwbGF5ZXJHYW1lQm9hcmQsIHBsYXllciwgZW5lbXlHYW1lQm9hcmQpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGxhY2VtZW50TGlzdGVuZXJzLFxuICB9XG5cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFBsYWNlbWVudEV2ZW50czsiLCJpbXBvcnQgRWxlbWVudENyZWF0aW9uIGZyb20gJy4uL2VsZW1lbnRDcmVhdGlvbic7XG5cbmNvbnN0IHJlbmRlckdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1zZWN0aW9uJyk7XG4gIGNvbnN0IHBsYXllckdyaWRXcmFwcGVyID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2dyaWQtd3JhcHBlciBwbGF5ZXItZ3JpZC13cmFwcGVyJywgcGxheWVyU2VjdGlvbik7XG4gIGNvbnN0IHBsYXllckdyaWQgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnc2hpcHMtZ3JpZCBwbGF5ZXItZ3JpZCcsIHBsYXllckdyaWRXcmFwcGVyKTtcbiAgXG4gIGNvbnN0IG9wcG9uZW50U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHBvbmVudC1zZWN0aW9uJyk7XG4gIGNvbnN0IG9wcG9uZW50R3JpZFdyYXBwZXIgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnZ3JpZC13cmFwcGVyIG9wcG9uZW50LWdyaWQtd3JhcHBlcicsIG9wcG9uZW50U2VjdGlvbik7XG4gIGNvbnN0IG9wcG9uZW50R3JpZCA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdzaGlwcy1ncmlkIG9wcG9uZW50LWdyaWQnLCBvcHBvbmVudEdyaWRXcmFwcGVyKTtcblxuICBjb25zdCBwbGFjZW1lbnRHcmlkV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZW1lbnQtZ3JpZC13cmFwcGVyJyk7XG4gIGNvbnN0IHBsYWNlbWVudEdyaWQgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnc2hpcHMtZ3JpZCBwbGFjZW1lbnQtZ3JpZCcsIHBsYWNlbWVudEdyaWRXcmFwcGVyKTtcblxuICBmb3IgKCBsZXQgaSA9IDA7ICBpIDw9IDkgOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8PSA5OyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHBsYXllclNxdWFyZSA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdncmlkLXNxdWFyZSBwbGF5ZXItc3F1YXJlJywgcGxheWVyR3JpZCk7XG4gICAgICBjb25zdCBvcHBvbmVudFNxdWFyZSA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdncmlkLXNxdWFyZSBvcHBvbmVudC1zcXVhcmUnLCBvcHBvbmVudEdyaWQpO1xuICAgICAgY29uc3QgcGxhY2VtZW50U3F1YXJlID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2dyaWQtc3F1YXJlIHBsYWNlbWVudC1zcXVhcmUnLCBwbGFjZW1lbnRHcmlkKTtcbiAgICAgIHBsYXllclNxdWFyZS5kYXRhc2V0LnggPSBqO1xuICAgICAgcGxheWVyU3F1YXJlLmRhdGFzZXQueSA9IGk7XG4gICAgICBvcHBvbmVudFNxdWFyZS5kYXRhc2V0LnggPSBqO1xuICAgICAgb3Bwb25lbnRTcXVhcmUuZGF0YXNldC55ID0gaTsgXG4gICAgICBwbGFjZW1lbnRTcXVhcmUuZGF0YXNldC54ID0gajtcbiAgICAgIHBsYWNlbWVudFNxdWFyZS5kYXRhc2V0LnkgPSBpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJHcmlkczsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQmxhY2sgT3BzIE9uZVxcXCIsIGN1cnNpdmU7XFxufVxcblxcbi5wYWdlLWhlYWRpbmcge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAzLjJyZW07XFxuICBtYXJnaW4tdG9wOiAwLjVlbTtcXG59XFxuXFxuLmdhbWUtcmVzZXQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWUtcmVzZXQtYnRuIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDAuNmVtO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBib3JkZXItcmFkaXVzOiAyMnB4O1xcbiAgd2lkdGg6IDUwJTtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFlbTtcXG59XFxuXFxuLmdyaWQtc3F1YXJlLnNoaXAtcGxhY2VkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDAlO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItd2lkdGg6IDAuMWVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0E4REFEQztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4zMjkpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4uc2hpcC1jaXJjbGUge1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgd2lkdGg6IDYwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICBoZWlnaHQ6IDBlbTtcXG4gIHBhZGRpbmctYm90dG9tOiA2MCU7XFxuICBtYXJnaW46IGF1dG87XFxuICBtYXJnaW4tdG9wOiAwLjNlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5nYW1lLXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uIHtcXG4gIG1pbi13aWR0aDogNTAlO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gIG1pbi13aWR0aDogNTAlO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5wbGF5ZXItc2VjdGlvbi1oZWFkaW5nLWNvbnRhaW5lciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjRlbTtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMTBweCAxM3B4IC03cHggIzAwMDAwMCwgMnB4IDRweCAxM3B4IDZweCByZ2JhKDE1MSwgMTUxLCAxNTEsIDApO1xcbiAgYm94LXNoYWRvdzogMHB4IDEwcHggMTNweCAtN3B4ICMwMDAwMDAsIDJweCA0cHggMTNweCA2cHggcmdiYSgxNTEsIDE1MSwgMTUxLCAwKTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NTdCOUQ7XFxufVxcbi5nYW1lLXNlY3Rpb24gLm9wcG9uZW50LXNlY3Rpb24taGVhZGluZy1jb250YWluZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC40ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDEwcHggMTNweCAtN3B4ICMwMDAwMDAsIDJweCA0cHggMTNweCA2cHggcmdiYSgxNTEsIDE1MSwgMTUxLCAwKTtcXG4gIGJveC1zaGFkb3c6IDBweCAxMHB4IDEzcHggLTdweCAjMDAwMDAwLCAycHggNHB4IDEzcHggNnB4IHJnYmEoMTUxLCAxNTEsIDE1MSwgMCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTYzOTQ2O1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLWNvdW50cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnNoaXAtY291bnQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tcmlnaHQ6IDFlbTtcXG4gIG1hcmdpbi1sZWZ0OiAxZW07XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLW5hbWUge1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjNlbTtcXG59XFxuLmdhbWUtc2VjdGlvbiAuc2hpcC1jb3VudC1zZWN0aW9uLTEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLWNvdW50LXNlY3Rpb24tMiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5nYW1lLXNlY3Rpb24gLmdhbWUtc3RhdHVzIHtcXG4gIG1hcmdpbi1ib3R0b206IDJlbTtcXG4gIGJvcmRlcjogNHB4IHNvbGlkIGJsYWNrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ1N2I5ZDtcXG4gIHBhZGRpbmc6IDAuNWVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMWVtO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5nYW1lLXN0YXR1cy1tZXNzYWdlIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5nYW1lLXN0YXR1cy1tZXNzYWdlLnNob3duIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3BhY2l0eTogMTtcXG4gIGFuaW1hdGlvbi1uYW1lOiByZXZlYWw7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcbn1cXG5Aa2V5ZnJhbWVzIHJldmVhbCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuLmdhbWUtc2VjdGlvbiAucGxheS1hZ2Fpbi1idG4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnBsYXktYWdhaW4tYnRuIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDAuNmVtO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBib3JkZXItcmFkaXVzOiAyMnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbiAgZm9udC1zaXplOiAxLjFlbTtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBwYWRkaW5nOiAwLjhlbTtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDY1MHB4KSB7XFxuICAuZ2FtZS1zZWN0aW9uIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIG1hcmdpbi10b3A6IDZlbTtcXG4gIH1cXG4gIC5nYW1lLXNlY3Rpb24gLmdhbWUtc3RhdHVzIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDEwLjNlbTtcXG4gIH1cXG4gIC5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiA0NSU7XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiA0NSU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gIC5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiAzMCU7XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiAzMCU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcXG4gIC5nYW1lLXNlY3Rpb24gLnNoaXAtY2lyY2xlIHtcXG4gICAgbWFyZ2luLXRvcDogMC41ZW07XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxNjAwcHgpIHtcXG4gIC5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiAyNSU7XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiAyNSU7XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5nYW1lLXN0YXR1cyB7XFxuICAgIGZvbnQtc2l6ZTogMS4zZW07XFxuICAgIHRvcDogOC4zZW07XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5wbGF5LWFnYWluLWJ0biB7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICB9XFxufVxcblxcbi5ncmlkLXdyYXBwZXIgLnNoaXBzLWdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBtYXJnaW4tdG9wOiAyZW07XFxuICBtYXJnaW4tYm90dG9tOiA0ZW07XFxufVxcbi5ncmlkLXdyYXBwZXIgLmdyaWQtc3F1YXJlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDAlO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItd2lkdGg6IDAuMWVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0E4REFEQztcXG59XFxuLmdyaWQtd3JhcHBlciAuZ3JpZC1zcXVhcmU6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Q2RUNFNTtcXG59XFxuLmdyaWQtd3JhcHBlciAubWlzc2VkLWNpcmNsZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogNjAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMGVtO1xcbiAgcGFkZGluZy1ib3R0b206IDYwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFEMzU1NztcXG59XFxuLmdyaWQtd3JhcHBlciAuaGl0LWNpcmNsZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogNjAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMGVtO1xcbiAgcGFkZGluZy1ib3R0b206IDYwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0U2Mzk0NjtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xcbiAgLmdyaWQtd3JhcHBlciAubWlzc2VkLWNpcmNsZSB7XFxuICAgIG1hcmdpbi10b3A6IDAuNWVtO1xcbiAgfVxcbiAgLmdyaWQtd3JhcHBlciAuaGl0LWNpcmNsZSB7XFxuICAgIG1hcmdpbi10b3A6IDAuNWVtO1xcbiAgfVxcbn1cXG5cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgcGFkZGluZzogMnJlbSAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0YxRkFFRTtcXG4gIG1hcmdpbi10b3A6IDJlbTtcXG4gIG1heC13aWR0aDogODAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgcGFkZGluZzogMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAtMTBweCAwcHggMTNweCAtN3B4ICNmZmZmZmY4YSwgMTBweCAwcHggMTNweCAtN3B4ICNmZmZmZmY4YSwgMnB4IDRweCAxM3B4IDZweCByZ2JhKDE1MSwgMTUxLCAxNTEsIDApO1xcbiAgYm94LXNoYWRvdzogMHB4IDEzcHggLTdweCAjZmZmZmZmNWUsIDEwcHggMHB4IDEzcHggLTdweCAjZmZmZmZmNzcsIDJweCA0cHggMTNweCA2cHggcmdiYSgxNTEsIDE1MSwgMTUxLCAwKTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5pbmZvLXdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbiAgbWFyZ2luLXRvcDogMC44ZW07XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAucm90YXRlLWluZm8ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnNoaXAtcGxhY2VtZW50LWhlYWRpbmcge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1ncmlkLXdyYXBwZXIge1xcbiAgbWF4LXdpZHRoOiA2MCU7XFxuICBtYXJnaW46IGF1dG87XFxuICBwYWRkaW5nLWJvdHRvbTogMC4xZW07XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAuZGlzcGxheS1jb250YWluZXIge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlZC1zaGlwLWRpc3BsYXkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAwO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci13aWR0aDogMC4xZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQThEQURDO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICB3aWR0aDogMCU7XFxuICBtaW4td2lkdGg6IDYlO1xcbiAgcGFkZGluZy1ib3R0b206IDYlO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnNoaXAtY2lyY2xlIHtcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnNoaXAtZGlzcGxheSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcGFkZGluZy1ib3R0b206IDFlbTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1ncmlkIHtcXG4gIG1hcmdpbi1ib3R0b206IDJlbTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5wbGFjZW1lbnQtYnRucy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1idG4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMC42ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAucmFuZG9tLWJ0biB7XFxuICBtYXJnaW46IDAgMC40ZW07XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAuZ3JpZC1zcXVhcmUucGxhY2VtZW50LXNxdWFyZS5zaGlwLXBsYWNlZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDA7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjFlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNBOERBREM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICAuc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1zZWN0aW9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5zaGlwLXBsYWNlbWVudC1tb2RhbCAucGxhY2VtZW50LWdyaWQtd3JhcHBlciB7XFxuICAgIG1pbi13aWR0aDogNDclO1xcbiAgfVxcbiAgLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5zaGlwcy1kaXNwbGF5LWNvbnRhaW5lciB7XFxuICAgIG1pbi13aWR0aDogNDUlO1xcbiAgfVxcbiAgLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5wbGFjZWQtc2hpcC1kaXNwbGF5IHtcXG4gICAgbWluLXdpZHRoOiAxMCU7XFxuICAgIHBhZGRpbmctYm90dG9tOiAxMCU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gIC5zaGlwLXBsYWNlbWVudC1tb2RhbCAuc2hpcC1jaXJjbGUge1xcbiAgICBtYXJnaW4tdG9wOiAwLjVlbTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xcbiAgLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDY1JTtcXG4gICAgbWFyZ2luLXRvcDogN2VtO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTYwMHB4KSB7XFxuICAuc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnNoaXAtcGxhY2VtZW50LWNvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogNTUlO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQUE7QUFDRjs7QUFrREE7RUFDRSxxQ0FBQTtBQS9DRjs7QUFrREE7RUFDQyxrQkFBQTtFQUNBLGlCQUFBO0VBQ0MsaUJBQUE7QUEvQ0Y7O0FBa0RBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBL0NGOztBQWtEQTtFQXhCRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBb0JBLFVBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUF6Q0Y7O0FBNkNBO0VBNURFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtFQW9EQSw0Q0FBQTtFQUNBLGtCQUFBO0FBaENGOztBQW1DQTtFQTVFRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQXdFQSxzQkFBQTtBQTFCRjs7QUE2QkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBMUJGO0FBNEJFO0VBckRBLGNBQUE7QUE0QkY7QUE2QkU7RUF6REEsY0FBQTtBQStCRjtBQThCRTtFQXZFQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSx1RkFBQTtFQUNBLCtFQUFBO0VBbUVFLHlCQUFBO0FB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bnRcIjpbXCIqIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuQG1peGluIGNpcmNsZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogNjAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMGVtO1xcbiAgcGFkZGluZy1ib3R0b206IDYwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbn1cXG5cXG5AbWl4aW4gc3F1YXJlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDAlO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItd2lkdGg6IDAuMWVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0E4REFEQztcXG59XFxuXFxuQG1peGluIGhlYWRpbmdDb250YWluZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC40ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDEwcHggMTNweCAtN3B4ICMwMDAwMDAsIDJweCA0cHggMTNweCA2cHggcmdiYSgxNTEsMTUxLDE1MSwwKTsgXFxuICBib3gtc2hhZG93OiAwcHggMTBweCAxM3B4IC03cHggIzAwMDAwMCwgMnB4IDRweCAxM3B4IDZweCByZ2JhKDE1MSwxNTEsMTUxLDApO1xcbn1cXG5cXG5AbWl4aW4gbWFpblNlY3Rpb24ge1xcbiAgbWluLXdpZHRoOiA1MCU7XFxufVxcblxcbkBtaXhpbiBidG4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMC42ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJCbGFjayBPcHMgT25lXFxcIiwgY3Vyc2l2ZTtcXG59XFxuXFxuLnBhZ2UtaGVhZGluZyB7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMy4ycmVtO1xcbiAgbWFyZ2luLXRvcDogMC41ZW07XFxufVxcblxcbi5nYW1lLXJlc2V0LWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5nYW1lLXJlc2V0LWJ0biB7XFxuICBAaW5jbHVkZSBidG47XFxuICB3aWR0aDogNTAlO1xcbiAgbWFyZ2luLXRvcDogMWVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbn1cXG5cXG5cXG4uZ3JpZC1zcXVhcmUuc2hpcC1wbGFjZWQge1xcbiAgQGluY2x1ZGUgc3F1YXJlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi5zaGlwLWNpcmNsZSB7XFxuICBAaW5jbHVkZSBjaXJjbGUoKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5nYW1lLXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuICAucGxheWVyLXNlY3Rpb24ge1xcbiAgICBAaW5jbHVkZSBtYWluU2VjdGlvbigpO1xcbiAgfVxcblxcbiAgLm9wcG9uZW50LXNlY3Rpb24ge1xcbiAgICBAaW5jbHVkZSBtYWluU2VjdGlvbigpO1xcbiAgfVxcbiAgXFxuICAucGxheWVyLXNlY3Rpb24taGVhZGluZy1jb250YWluZXIge1xcbiAgICBAaW5jbHVkZSBoZWFkaW5nQ29udGFpbmVyKCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NTdCOUQ7XFxuICB9XFxuXFxuICAub3Bwb25lbnQtc2VjdGlvbi1oZWFkaW5nLWNvbnRhaW5lciB7XFxuICAgIEBpbmNsdWRlIGhlYWRpbmdDb250YWluZXIoKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0U2Mzk0NjtcXG4gIH1cXG5cXG4gIC5zaGlwLWNvdW50cyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgfVxcblxcbiAgLnNoaXAtY291bnQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07XFxuICAgIG1hcmdpbi1sZWZ0OiAxZW07XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuXFxuICAuc2hpcC1uYW1lIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwLjNlbTtcXG4gIH1cXG5cXG4gIC5zaGlwLWNvdW50LXNlY3Rpb24tMSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuc2hpcC1jb3VudC1zZWN0aW9uLTIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgLmdhbWUtc3RhdHVzIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMmVtO1xcbiAgICBib3JkZXI6IDRweCBzb2xpZCBibGFjaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ1N2I5ZDtcXG4gICAgcGFkZGluZzogMC41ZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMS4xZW07XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gIH1cXG5cXG4gIC5nYW1lLXN0YXR1cy1tZXNzYWdlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gIC5nYW1lLXN0YXR1cy1tZXNzYWdlLnNob3duIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGFuaW1hdGlvbi1uYW1lOiByZXZlYWw7XFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxuICB9XFxuXFxuICBAa2V5ZnJhbWVzIHJldmVhbCB7XFxuICAgIGZyb20ge1xcbiAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG4gIH1cXG5cXG4gIC5wbGF5LWFnYWluLWJ0bi1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcblxcbiAgLnBsYXktYWdhaW4tYnRuIHtcXG4gICAgQGluY2x1ZGUgYnRuKCk7XFxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcXG4gICAgZm9udC1zaXplOiAxLjFlbTtcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgcGFkZGluZzogMC44ZW07XFxuICB9XFxuXFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjUwcHgpIHtcXG5cXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIG1hcmdpbi10b3A6IDZlbTtcXG5cXG4gICAgLmdhbWUtc3RhdHVzIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiAxMC4zZW07XFxuICAgIH1cXG5cXG4gICAgLnBsYXllci1zZWN0aW9uIHtcXG4gICAgICBtaW4td2lkdGg6IDQ1JTtcXG4gICAgfVxcblxcbiAgICAub3Bwb25lbnQtc2VjdGlvbiB7XFxuICAgICAgbWluLXdpZHRoOiA0NSU7XFxuICAgIH1cXG4gIH1cXG5cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnBsYXllci1zZWN0aW9uIHtcXG4gICAgICBtaW4td2lkdGg6IDMwJTtcXG4gICAgfVxcblxcbiAgICAub3Bwb25lbnQtc2VjdGlvbiB7XFxuICAgICAgbWluLXdpZHRoOiAzMCU7XFxuICAgIH1cXG4gIH1cXG5cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcXG4gICAgLnNoaXAtY2lyY2xlIHtcXG4gICAgICBtYXJnaW4tdG9wOiAwLjVlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDE2MDBweCkge1xcbiAgICAucGxheWVyLXNlY3Rpb24ge1xcbiAgICAgIG1pbi13aWR0aDogMjUlO1xcbiAgICB9XFxuXFxuICAgIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgICBtaW4td2lkdGg6IDI1JTtcXG4gICAgfVxcblxcbiAgICAuZ2FtZS1zdGF0dXMge1xcbiAgICAgIGZvbnQtc2l6ZTogMS4zZW07XFxuICAgICAgdG9wOiA4LjNlbTtcXG4gICAgfVxcblxcbiAgICAucGxheS1hZ2Fpbi1idG4ge1xcbiAgICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuLmdyaWQtd3JhcHBlciB7XFxuXFxuICAuc2hpcHMtZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgbWFyZ2luLXRvcDogMmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiA0ZW07XFxuICAgIFxcbiAgfVxcblxcbiAgLmdyaWQtc3F1YXJlIHtcXG4gICAgQGluY2x1ZGUgc3F1YXJlKCk7XFxuICB9XFxuXFxuICAuZ3JpZC1zcXVhcmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDZFQ0U1O1xcbiAgfVxcblxcbiAgLm1pc3NlZC1jaXJjbGUge1xcbiAgICBAaW5jbHVkZSBjaXJjbGUoKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFEMzU1NztcXG4gIH1cXG5cXG4gIC5oaXQtY2lyY2xlIHtcXG4gICAgQGluY2x1ZGUgY2lyY2xlKCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNFNjM5NDY7XFxuICB9XFxuXFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XFxuICAgIC5taXNzZWQtY2lyY2xlIHtcXG4gICAgICBtYXJnaW4tdG9wOiAwLjVlbTtcXG4gICAgfVxcblxcbiAgICAuaGl0LWNpcmNsZSB7XFxuICAgICAgbWFyZ2luLXRvcDogMC41ZW07XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuLnNoaXAtcGxhY2VtZW50LW1vZGFse1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgcGFkZGluZzogMnJlbSAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCwgMC40KTtcXG5cXG4gIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjFGQUVFO1xcbiAgICBtYXJnaW4tdG9wOiAyZW07XFxuICAgIG1heC13aWR0aDogODAlO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIHBhZGRpbmc6IDFlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IC0xMHB4IDBweCAxM3B4IC03cHggI2ZmZmZmZjhhLCAxMHB4IDBweCAxM3B4IC03cHggI2ZmZmZmZjhhLCAycHggNHB4IDEzcHggNnB4IHJnYmEoMTUxLDE1MSwxNTEsMCk7IFxcbiAgICBib3gtc2hhZG93OiAwcHggMTNweCAtN3B4ICNmZmZmZmY1ZSwgMTBweCAwcHggMTNweCAtN3B4ICNmZmZmZmY3NywgMnB4IDRweCAxM3B4IDZweCByZ2JhKDE1MSwgMTUxLCAxNTEsIDApO1xcbiAgfVxcblxcbiAgLmluZm8td3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcXG4gICAgbWFyZ2luLXRvcDogMC44ZW07XFxuICB9XFxuXFxuICAucm90YXRlLWluZm8ge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuc2hpcC1wbGFjZW1lbnQtaGVhZGluZyB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtZ3JpZC13cmFwcGVyIHtcXG4gICAgbWF4LXdpZHRoOiA2MCU7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgcGFkZGluZy1ib3R0b206IDAuMWVtO1xcbiAgfVxcblxcbiAgLmRpc3BsYXktY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAucGxhY2VkLXNoaXAtZGlzcGxheSB7XFxuICAgIEBpbmNsdWRlIHNxdWFyZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgd2lkdGg6IDAlO1xcbiAgICBtaW4td2lkdGg6IDYlO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogNiU7XFxuICB9XFxuXFxuICAuc2hpcC1jaXJjbGUge1xcbiAgICBtYXJnaW4tdG9wOiAwLjNlbTtcXG4gIH1cXG5cXG4gIC5zaGlwLWRpc3BsYXkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtZ3JpZCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDJlbTtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtYnRucy1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtYnRuIHtcXG4gICAgQGluY2x1ZGUgYnRuKCk7XFxuICB9XFxuXFxuICAucmFuZG9tLWJ0biB7XFxuICAgIG1hcmdpbjogMCAwLjRlbTtcXG4gIH1cXG5cXG4gIC5ncmlkLXNxdWFyZS5wbGFjZW1lbnQtc3F1YXJlLnNoaXAtcGxhY2VkIHtcXG4gICAgQGluY2x1ZGUgc3F1YXJlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgfVxcblxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICAgIC5wbGFjZW1lbnQtc2VjdGlvbiB7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIC5wbGFjZW1lbnQtZ3JpZC13cmFwcGVyIHtcXG4gICAgICBtaW4td2lkdGg6IDQ3JTtcXG4gICAgfVxcblxcbiAgICAuc2hpcHMtZGlzcGxheS1jb250YWluZXIge1xcbiAgICAgIG1pbi13aWR0aDogNDUlO1xcbiAgICB9XFxuXFxuICAgIC5wbGFjZWQtc2hpcC1kaXNwbGF5IHtcXG4gICAgICBtaW4td2lkdGg6IDEwJTtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTAlO1xcbiAgICB9XFxuICB9XFxuXFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAgIC5zaGlwLWNpcmNsZSB7XFxuICAgICAgbWFyZ2luLXRvcDogMC41ZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcXG4gICAgLnNoaXAtcGxhY2VtZW50LWNvbnRhaW5lciB7XFxuICAgICAgbWF4LXdpZHRoOiA2NSU7XFxuICAgICAgbWFyZ2luLXRvcDogN2VtO1xcbiAgICB9XFxuICB9XFxuXFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTYwMHB4KSB7XFxuICAgIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgICAgIG1heC13aWR0aDogNTUlO1xcbiAgICB9XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgeyBnYW1lU3RhcnQgfSBmcm9tICcuL2dhbWVDb250cm9sJztcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIGdhbWVTdGFydCgpO1xufSwgMTAwKTtcbiJdLCJuYW1lcyI6WyJFbGVtZW50Q3JlYXRpb24iLCJjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MiLCJ0YWciLCJjbGFzc05hbWUiLCJwYXJlbnRFbGVtZW50IiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ2hpbGRFbGVtZW50V2l0aElkIiwiaWQiLCJjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3NBbmRJZCIsIlNoaXAiLCJHYW1lQm9hcmQiLCJwbGFjZWRTaGlwcyIsIm1pc3NlZEF0dGFja3MiLCJoaXRBdHRhY2tzIiwiYm9hcmRXaWR0aCIsImJvYXJkSGVpZ2h0IiwiaXNBZGphY2VudCIsImNvb3JkaW5hdGVzIiwic2hpcHMiLCJhbGxTaGlwQ29vcmRpbmF0ZXMiLCJtYXAiLCJzaGlwIiwiZ2V0U2hpcENvb3JkaW5hdGVzIiwiY29uY2F0IiwiY2hlY2tYIiwic2hpcFhDb29yZGluYXRlIiwiY2hlY2tZIiwic2hpcFlDb29yZGluYXRlIiwibm9uQWRqYWNlbnRDb29yZGluYXRlcyIsImZpbHRlciIsInNoaXBDb29yZGluYXRlcyIsImxlbmd0aCIsInJvdGF0aW9uQ2hvaWNlIiwiY2hvaWNlcyIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNQb3NpdGlvbkF2YWlsaWFibGUiLCJzdGFydENvb3JkaW5hdGVzIiwicm90YXRpb24iLCJpIiwicHVzaCIsImF2YWlsaWFibGVDb29yZGluYXRlcyIsInBsYWNlU2hpcCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tDb29yZGluYXRlcyIsImF0dGFja2VkU2hpcCIsImhhc0Nvb3JkaW5hdGVzIiwiaGl0IiwiaXNHYW1lT3ZlciIsImV2ZXJ5IiwicGxhY2VkU2hpcCIsImlzU3VuayIsImlzUG9zaXRpb25GcmVlVG9BdHRhY2siLCJwb3NpdGlvbkNoZWNrIiwiZnJlZVBvc2l0aW9uIiwiZ2V0QWxsQ29vcmRpbmF0ZXMiLCJhbGxDb29yZGluYXRlcyIsImNsZWFyQm9hcmQiLCJmb3JFYWNoIiwic2hpcEluZGV4IiwiaW5kZXhPZiIsInBvcHVsYXRlQm9hcmQiLCJzaGlwc1BsYWNlZCIsInJhbmRvbVgiLCJyYW5kb21ZIiwiZ2V0TGFzdENyZWF0ZWRTaGlwIiwibGFzdFNoaXAiLCJzdW5rU2hpcENoZWNrIiwic3Vua1NoaXAiLCJyZW1vdmVTdW5rU2hpcCIsInN1bmtTaGlwSW5kZXgiLCJyZW1vdmVkU2hpcCIsInNwbGljZSIsImNvcHlQbGFjZWRTaGlwcyIsImNvcHkiLCJpc0JvYXJkQ29tcGxldGUiLCJQbGF5ZXIiLCJDb21wdXRlclBsYXllciIsIkdhbWVFdmVudHMiLCJQbGFjZW1lbnRFdmVudHMiLCJyZW5kZXJHcmlkcyIsImdhbWVTdGFydCIsImh1bWFuUGxheWVyIiwiaHVtYW5Cb2FyZCIsImNvbXB1dGVyUGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsInBhZ2VMaXN0ZW5lcnMiLCJwbGFjZW1lbnRMaXN0ZW5lcnMiLCJhdHRhY2tFbmVteUJvYXJkIiwiZW5lbXlHYW1lQm9hcmQiLCJzaGlwQXR0YWNrZWQiLCJnZXRQbGF5ZXJTaGlwIiwicGxheWVyR2FtZUJvYXJkIiwiYWxsUGxhY2VkU2hpcHMiLCJ0YXJnZXRTaGlwIiwicm90YXRlQm9hcmRTaGlwIiwicm90YXRlU2hpcElmUG9zc2libGUiLCJzdWNjZXNzZnVsQXR0YWNrcyIsImFkamFjZW50QXR0YWNrRnVuY3Rpb25zIiwiaW5kZXgiLCJwaWNrUmFuZG9tQ29vcmRpbmF0ZXMiLCJwaWNrQWRqYWNlbnRDb29yZGluYXRlcyIsImxhc3RDb29yZGluYXRlcyIsIngiLCJ5IiwicGlja0Nvb3JkaW5hdGVzIiwic2hpcEhpdHMiLCJzaGlwTmFtZXMiLCJnZXRTaGlwTmFtZSIsIm1hdGNoRm91bmQiLCJjb29yZGluYXRlc0tleSIsInRvU3RyaW5nIiwic2hpcEhpdEJvb2xzIiwiT2JqZWN0IiwidmFsdWVzIiwiYm9vbCIsImlzU2hpcEhvcml6b250YWwiLCJmaXJzdENvb3JkaW5hdGVzIiwic2Vjb25kQ29vcmRpbmF0ZXMiLCJyb3RhdGVTaGlwIiwiaXNIb3Jpem9udGFsIiwicGxhY2VkU2hpcHNDb3B5IiwiZmlsdGVyZWRTaGlwcyIsImdldFNoaXBMZW5ndGgiLCJwYWdlQ2xpY2tFdmVudHMiLCJldmVudCIsInBsYXllciIsImVuZW15IiwiY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UiLCJtZXNzYWdlVHlwZSIsInN1bmtTaGlwTmFtZSIsInBsYXllclR5cGUiLCJtZXNzYWdlRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjdXJyZW50U2hvd25NZXNzYWdlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInBsYXllck1vdmUiLCJ4Q29vcmRpbmF0ZSIsInBhcnNlSW50IiwidGFyZ2V0IiwiZGF0YXNldCIsInlDb29yZGluYXRlIiwiYWRkIiwiY29tcHV0ZXJNb3ZlIiwiY29tcHV0ZXJBdHRhY2tDb29yZGluYXRlcyIsInBsYXllclNoaXBBdHRhY2tlZCIsImNvbXB1dGVyVGFyZ2V0IiwiY2hpbGROb2RlcyIsInJlbW92ZUNsYXNzTmFtZSIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImRlY3JlbWVudFNoaXBDb3VudCIsInNoaXBOYW1lIiwib3duZXIiLCJzaGlwTmFtZUxvd2VyIiwidG9Mb3dlckNhc2UiLCJzZWN0aW9uIiwic2hpcENvdW50RWxlbWVudCIsImNvdW50IiwicmVzZXRTaGlwQ291bnQiLCJwbGF5ZXJTaGlwQ291bnRzIiwib3Bwb25lbnRTaGlwQ291bnRzIiwicGxheWVyU2hpcENvdW50Iiwib3Bwb25lbnRTaGlwQ291bnQiLCJyZXNldEdhbWVTdGF0dXNNZXNzYWdlIiwicmVzZXRHYW1lU3RhdHVzTWVzc2FnZXMiLCJtZXNzYWdlIiwid2FpdE1lc3NhZ2UiLCJyZXNldEdhbWUiLCJzaGlwUGxhY2VtZW50TW9kYWwiLCJkaXNwbGF5IiwiZ2FtZUJvYXJkIiwiZGlzYWJsZVBsYXllckFjdGlvbnMiLCJvcHBvbmVudEdyaWRTcXVhcmVzIiwic3F1YXJlIiwiZW5hYmxlUGxheWVyQWN0aW9ucyIsInBsYXllcldpbiIsImVuZW15U3Vua1NoaXBDaGVjayIsImdyaWRTcXVhcmVFbGVtZW50IiwicGxheUFnYWluQnRuIiwic2V0VGltZW91dCIsImNvbXB1dGVyV2luIiwicGxheWVyU3Vua1NoaXBDaGVjayIsInBsYXllclNoaXBOYW1lIiwiZGVwbG95QnV0dG9uIiwiZGlzYWJsZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVwbG95Q2hlY2siLCJkcmFnU3RhcnRIYW5kbGVyIiwiZGF0YVRyYW5zZmVyIiwiZWZmZWN0QWxsb3dlZCIsInNldERhdGEiLCJkcmFnRW50ZXJIYW5kbGVyIiwiZHJhZ0xlYXZlSGFuZGxlciIsImRyb3BIYW5kbGVyIiwicHJldmVudERlZmF1bHQiLCJzaGlwRGlzcGxheUNsYXNzTmFtZSIsImdldERhdGEiLCJzcGxpdCIsImRpc3BsYXlDb250YWluZXIiLCJkaXNwbGF5Q291bnQiLCJzaGlwTGVuZ3RoIiwic2hpcFBsYWNlbWVudCIsImNyZWF0ZWRTaGlwIiwicGxheWVyRE9NQ29vcmRpbmF0ZXMiLCJpbm5lckhUTUwiLCJjbGlja0hhbmRsZXJzIiwicmVtb3ZlUGxhY2VkU2hpcEVsZW1lbnRzIiwicGxhY2VtZW50U3F1YXJlIiwiYWRkUGxhY2VkU2hpcEVsZW1lbnRzIiwicmVzZXRCb2FyZCIsInNoaXBQbGFjZWRFbGVtZW50cyIsInNoaXBFbGVtZW50IiwicmFuZG9tbHlQb3B1bGF0ZUJvYXJkIiwicGxheWVyQm9hcmRDb29yZGluYXRlcyIsInNldERpc3BsYXlDb3VudHMiLCJkaXNwbGF5Q291bnRzIiwibnVtYmVyT2ZTaGlwcyIsInNldERpc3BsYXlDb3VudHNUb1plcm8iLCJkZXBsb3lTaGlwcyIsInBsYXllckNvb3JkaW5hdGVzIiwicGxheWVyU2hpcCIsInBsYXllclNoaXBDb29yZGluYXRlcyIsInJvdGF0ZWRTaGlwQ29vcmRpbmF0ZXMiLCJzaGlwUGxhY2VtZW50Q29udGFpbmVyIiwiZHJvcEVmZmVjdCIsInBsYXllclNlY3Rpb24iLCJwbGF5ZXJHcmlkV3JhcHBlciIsInBsYXllckdyaWQiLCJvcHBvbmVudFNlY3Rpb24iLCJvcHBvbmVudEdyaWRXcmFwcGVyIiwib3Bwb25lbnRHcmlkIiwicGxhY2VtZW50R3JpZFdyYXBwZXIiLCJwbGFjZW1lbnRHcmlkIiwiaiIsInBsYXllclNxdWFyZSIsIm9wcG9uZW50U3F1YXJlIl0sInNvdXJjZVJvb3QiOiIifQ==