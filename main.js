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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n}\n\nbody {\n  font-family: \"Black Ops One\", cursive;\n}\n\n.page-heading {\n  text-align: center;\n  font-size: 3.2rem;\n}\n\n.game-reset-container {\n  display: flex;\n  justify-content: center;\n}\n\n.game-reset-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n  width: 50%;\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n.grid-square.ship-placed {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}\n\n.ship-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: grey;\n}\n\n.game-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.game-section .player-section {\n  min-width: 50%;\n}\n.game-section .opponent-section {\n  min-width: 50%;\n}\n.game-section .player-section-heading-container {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n  background-color: #457B9D;\n}\n.game-section .opponent-section-heading-container {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n  background-color: #E63946;\n}\n.game-section .ship-counts {\n  display: flex;\n  justify-content: space-around;\n}\n.game-section .ship-count-container {\n  display: flex;\n  margin-right: 1em;\n  margin-left: 1em;\n  flex-direction: column;\n}\n.game-section .ship-name {\n  margin-right: 0.3em;\n}\n.game-section .ship-count-section-1 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.game-section .ship-count-section-2 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.game-section .game-status {\n  margin-bottom: 2em;\n  border: 4px solid black;\n  background-color: #457b9d;\n  padding: 0.5em;\n  width: 100%;\n  text-align: center;\n  font-size: 1.1em;\n}\n.game-section .game-status-message {\n  opacity: 0;\n  display: none;\n}\n.game-section .game-status-message.shown {\n  display: block;\n  opacity: 1;\n  animation-name: reveal;\n  animation-duration: 1s;\n}\n@keyframes reveal {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.game-section .play-again-btn-container {\n  display: none;\n}\n.game-section .play-again-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n  margin-bottom: 1em;\n  font-size: 1.1em;\n  border-style: solid;\n  padding: 0.8em;\n}\n\n.grid-wrapper .ships-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n  margin-top: 2em;\n  margin-bottom: 4em;\n}\n.grid-wrapper .grid-square {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n}\n.grid-wrapper .grid-square:hover {\n  background-color: #D6ECE5;\n}\n.grid-wrapper .missed-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: #1D3557;\n}\n.grid-wrapper .hit-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: #E63946;\n}\n\n.ship-placement-modal {\n  display: block;\n  position: fixed;\n  z-index: 1;\n  padding: 2rem 0;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n.ship-placement-modal .ship-placement-container {\n  background-color: #F1FAEE;\n  margin-top: 2em;\n  max-width: 80%;\n  margin: auto;\n  padding: 1em;\n  border-radius: 8px;\n}\n.ship-placement-modal .info-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-bottom: 1em;\n  margin-top: 0.8em;\n}\n.ship-placement-modal .rotate-info {\n  text-align: center;\n}\n.ship-placement-modal .ship-placement-heading {\n  text-align: center;\n}\n.ship-placement-modal .placement-grid-wrapper {\n  max-width: 60%;\n  margin: auto;\n  padding-bottom: 0.1em;\n}\n.ship-placement-modal .display-container {\n  max-width: 100%;\n  text-align: center;\n}\n.ship-placement-modal .placed-ship-display {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n  width: 0%;\n  min-width: 6%;\n  padding-bottom: 6%;\n}\n.ship-placement-modal .ship-display {\n  display: flex;\n  padding-bottom: 1em;\n  justify-content: center;\n}\n.ship-placement-modal .placement-grid {\n  margin-bottom: 2em;\n}\n.ship-placement-modal .placement-btns-container {\n  display: flex;\n  justify-content: space-evenly;\n}\n.ship-placement-modal .placement-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n}\n.ship-placement-modal .random-btn {\n  margin: 0 0.4em;\n}\n.ship-placement-modal .grid-square.placement-square.ship-placed {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"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","sourcesContent":["* {\n  margin: 0;\n}\n\n@mixin circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n}\n\n@mixin square {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n}\n\n@mixin headingContainer {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n}\n\n@mixin mainSection {\n  min-width: 50%;\n}\n\n@mixin btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n}\n\nbody {\n  font-family: \"Black Ops One\", cursive;\n}\n\n.page-heading {\n\ttext-align: center;\n\tfont-size: 3.2rem;\n}\n\n.game-reset-container {\n  display: flex;\n  justify-content: center;\n}\n\n.game-reset-btn {\n  @include btn;\n  width: 50%;\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n\n.grid-square.ship-placed {\n  @include square;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}\n\n.ship-circle {\n  @include circle();\n  background-color: grey;\n}\n\n.game-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  .player-section {\n    @include mainSection();\n  }\n\n  .opponent-section {\n    @include mainSection();\n  }\n  \n  .player-section-heading-container {\n    @include headingContainer();\n    background-color: #457B9D;\n  }\n\n  .opponent-section-heading-container {\n    @include headingContainer();\n    background-color: #E63946;\n  }\n\n  .ship-counts {\n    display: flex;\n    justify-content: space-around;\n  }\n\n  .ship-count-container {\n    display: flex;\n    margin-right: 1em;\n    margin-left: 1em;\n    flex-direction: column;\n  }\n\n  .ship-name {\n    margin-right: 0.3em;\n  }\n\n  .ship-count-section-1 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .ship-count-section-2 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .game-status {\n    margin-bottom: 2em;\n    border: 4px solid black;\n    background-color: #457b9d;\n    padding: 0.5em;\n    width: 100%;\n    text-align: center;\n    font-size: 1.1em;\n  }\n\n  .game-status-message {\n    opacity: 0;\n    display: none;\n  }\n\n  .game-status-message.shown {\n    display: block;\n    opacity: 1;\n    animation-name: reveal;\n    animation-duration: 1s;\n  }\n\n  @keyframes reveal {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  .play-again-btn-container {\n    display: none;\n  }\n\n  .play-again-btn {\n    @include btn();\n    margin-bottom: 1em;\n    font-size: 1.1em;\n    border-style: solid;\n    padding: 0.8em;\n  }\n}\n\n.grid-wrapper {\n\n  .ships-grid {\n    display: grid;\n    grid-template-rows: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n    margin-top: 2em;\n    margin-bottom: 4em;\n  }\n\n  .grid-square {\n    @include square();\n  }\n\n  .grid-square:hover {\n    background-color: #D6ECE5;\n  }\n\n  .missed-circle {\n    @include circle();\n    background-color: #1D3557;\n  }\n\n  .hit-circle {\n    @include circle();\n    background-color: #E63946;\n  }\n}\n\n.ship-placement-modal{\n  display: block;\n  position: fixed;\n  z-index: 1;\n  padding: 2rem 0;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgb(0, 0, 0);\n  background-color: rgb(0, 0, 0, 0.4);\n\n  .ship-placement-container {\n    background-color: #F1FAEE;\n    margin-top: 2em;\n    max-width: 80%;\n    margin: auto;\n    padding: 1em;\n    border-radius: 8px;\n  }\n\n  .info-wrapper {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 1em;\n    margin-top: 0.8em;\n  }\n\n  .rotate-info {\n    text-align: center;\n  }\n\n  .ship-placement-heading {\n    text-align: center;\n  }\n\n  .placement-grid-wrapper {\n    max-width: 60%;\n    margin: auto;\n    padding-bottom: 0.1em;\n  }\n\n  .display-container {\n    max-width: 100%;\n    text-align: center;\n  }\n\n  .placed-ship-display {\n    @include square;\n    background-color: rgba(128, 128, 128, 0.329);\n    border-radius: 2px;\n    width: 0%;\n    min-width: 6%;\n    padding-bottom: 6%;\n  }\n\n  .ship-display {\n    display: flex;\n    padding-bottom: 1em;\n    justify-content: center;\n  }\n\n  .placement-grid {\n    margin-bottom: 2em;\n  }\n\n  .placement-btns-container {\n    display: flex;\n    justify-content: space-evenly;\n  }\n\n  .placement-btn {\n    @include btn();\n  }\n\n  .random-btn {\n    margin: 0 0.4em;\n  }\n\n  .grid-square.placement-square.ship-placed {\n    @include square;\n    background-color: rgba(128, 128, 128, 0.329);\n    border-radius: 2px;\n  }\n}\n"],"sourceRoot":""}]);
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


(0,_gameControl__WEBPACK_IMPORTED_MODULE_1__.gameStart)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsWUFBWSxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFlBQVksVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsWUFBWSxLQUFLLE1BQU0sWUFBWSxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLEtBQUssS0FBSyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFdBQVcsS0FBSyxNQUFNLFVBQVUsVUFBVSxXQUFXLEtBQUssTUFBTSxVQUFVLFdBQVcsS0FBSyxNQUFNLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxZQUFZLFdBQVcsVUFBVSxVQUFVLFdBQVcsS0FBSyxLQUFLLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxVQUFVLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFdBQVcsV0FB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O0FBQ3JIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOdUQ7QUFDSjtBQUNzQjtBQUNsQjtBQUN4QztBQUNmLFNBQVMsaUVBQWlCLFNBQVMsK0RBQWUsU0FBUywwRUFBMEIsU0FBUyxpRUFBaUI7QUFDL0c7Ozs7Ozs7Ozs7Ozs7OztBQ05xRDtBQUN0QztBQUNmO0FBQ0Esb0NBQW9DLGdFQUFnQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxzRkFBc0YsZ0VBQWdCO0FBQ3RHOzs7Ozs7VUNSQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFFQUMsdURBQVMsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZWxlbWVudENyZWF0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdXNlckludGVyZmFjZS9nYW1lRXZlbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdXNlckludGVyZmFjZS9wbGFjZW1lbnRFdmVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91c2VySW50ZXJmYWNlL3JlbmRlclVJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzPzc1YmEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRWxlbWVudENyZWF0aW9uID0gKCgpID0+IHtcbiAgY29uc3QgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzID0gKHRhZywgY2xhc3NOYW1lLCBwYXJlbnRFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aElkID0gKHRhZywgaWQsIHBhcmVudEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGVsZW1lbnQuaWQgPSBpZDtcbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzQW5kSWQgPSAodGFnLCBjbGFzc05hbWUsIGlkLCBwYXJlbnRFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBlbGVtZW50LmlkID0gaWQ7XG4gICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzLFxuICAgIGNyZWF0ZUNoaWxkRWxlbWVudFdpdGhJZCxcbiAgICBjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3NBbmRJZCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEVsZW1lbnRDcmVhdGlvbjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBsZXQgcGxhY2VkU2hpcHMgPSBbXTtcbiAgbGV0IG1pc3NlZEF0dGFja3MgPSBbXTtcbiAgbGV0IGhpdEF0dGFja3MgPSBbXTtcbiAgY29uc3QgYm9hcmRXaWR0aCA9IDEwO1xuICBjb25zdCBib2FyZEhlaWdodCA9IDEwO1xuXG4gIC8qIFxuICAgIENoZWNrcyBpZiB0aGUgY29vcmRpbmF0ZXMgb2YgYSBzaGlwIGFib3V0IHRvIGJlIHBsYWNlZCBpcyBuZXh0IHRvIG9yIG9uIHRoZSBjb29yZGluYXRlc1xuICAgIG9mIGEgc2hpcCB0aGF0IGlzIGFscmVhZHkgb24gdGhlIGJvYXJkLlxuICAqL1xuICBjb25zdCBpc0FkamFjZW50ID0gKGNvb3JkaW5hdGVzLCBzaGlwcykgPT4ge1xuICAgIGxldCBhbGxTaGlwQ29vcmRpbmF0ZXMgPSBzaGlwcy5tYXAoKHNoaXApID0+IHNoaXAuZ2V0U2hpcENvb3JkaW5hdGVzKCkpO1xuICAgIGFsbFNoaXBDb29yZGluYXRlcyA9IFtdLmNvbmNhdCguLi5hbGxTaGlwQ29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IGNoZWNrWCA9IChzaGlwWENvb3JkaW5hdGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgc2hpcFhDb29yZGluYXRlID09PSBjb29yZGluYXRlc1swXSB8fCBcbiAgICAgICAgc2hpcFhDb29yZGluYXRlID09PSBjb29yZGluYXRlc1swXSAtIDEgfHwgXG4gICAgICAgIHNoaXBYQ29vcmRpbmF0ZSA9PT0gY29vcmRpbmF0ZXNbMF0gKyAxXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGNoZWNrWSA9IChzaGlwWUNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgc2hpcFlDb29yZGluYXRlID09PSBjb29yZGluYXRlc1sxXSB8fCBcbiAgICAgICAgc2hpcFlDb29yZGluYXRlID09PSBjb29yZGluYXRlc1sxXSAtIDEgfHwgXG4gICAgICAgIHNoaXBZQ29vcmRpbmF0ZSA9PT0gY29vcmRpbmF0ZXNbMV0gKyAxXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9uQWRqYWNlbnRDb29yZGluYXRlcyA9IGFsbFNoaXBDb29yZGluYXRlcy5maWx0ZXIoKHNoaXBDb29yZGluYXRlcykgPT4ge1xuICAgICAgaWYgKCFjaGVja1goc2hpcENvb3JkaW5hdGVzWzBdKSB8fCAhY2hlY2tZKHNoaXBDb29yZGluYXRlc1sxXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBpZiAobm9uQWRqYWNlbnRDb29yZGluYXRlcy5sZW5ndGggPT09IGFsbFNoaXBDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHJvdGF0aW9uQ2hvaWNlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNob2ljZXMgPSBbdHJ1ZSwgZmFsc2VdO1xuICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgcmV0dXJuIGNob2ljZXNbcmFuZG9tSW5kZXhdO1xuICB9XG5cbiAgLyogXG4gICAgUGxhY2VzIGEgc2hpcCBvbiB0aGUgYm9hcmQgYWZ0ZXIgY2hlY2tpbmcgdGhhdCB0aGUgc2hpcCdzIGNvb3JkaW5hdGVzIGFyZSB3aXRoaW4gdGhlIGJvYXJkIFxuICAgIGFuZCB0aGF0IGFub3RoZXIgc2hpcCBpcyBub3QgYWxyZWFkeSBhdCB0aGUgY29vcmRpbmF0ZXMgdGhlIG5ldyBzaGlwIHdhbnRzIHRvIG9jY3VweSBcbiAgKi9cbiAgY29uc3QgaXNQb3NpdGlvbkF2YWlsaWFibGUgPSAobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCByb3RhdGlvbiwgc2hpcHMpID0+IHtcbiAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAocm90YXRpb24pIHtcbiAgICAgICAgLyogSWYgc2hpcCBpcyBob3Jpem9udGFsICovXG4gICAgICAgIGlmIChzdGFydENvb3JkaW5hdGVzWzBdICsgaSA+PSBib2FyZFdpZHRoIHx8IHN0YXJ0Q29vcmRpbmF0ZXNbMV0gPj0gYm9hcmRIZWlnaHQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRpbmF0ZXNbMF0gKyBpLCBzdGFydENvb3JkaW5hdGVzWzFdXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBJZiBzaGlwIGlzIHZlcnRpY2FsICovXG4gICAgICAgIGlmIChzdGFydENvb3JkaW5hdGVzWzBdID49IGJvYXJkV2lkdGggfHwgc3RhcnRDb29yZGluYXRlc1sxXSArIGkgPj0gYm9hcmRIZWlnaHQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRpbmF0ZXNbMF0sIHN0YXJ0Q29vcmRpbmF0ZXNbMV0gKyBpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGF2YWlsaWFibGVDb29yZGluYXRlcyA9IHNoaXBDb29yZGluYXRlcy5maWx0ZXIoKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgICBpZiAoaXNBZGphY2VudChjb29yZGluYXRlcywgc2hpcHMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKGF2YWlsaWFibGVDb29yZGluYXRlcy5sZW5ndGggIT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzO1xuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGxlbmd0aCwgc3RhcnRDb29yZGluYXRlcywgcm90YXRpb24pID0+IHtcbiAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBpc1Bvc2l0aW9uQXZhaWxpYWJsZShsZW5ndGgsIHN0YXJ0Q29vcmRpbmF0ZXMsIHJvdGF0aW9uLCBwbGFjZWRTaGlwcyk7XG4gICAgaWYgKHNoaXBDb29yZGluYXRlcykge1xuICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCwgc3RhcnRDb29yZGluYXRlcywgc2hpcENvb3JkaW5hdGVzKTtcbiAgICAgIHBsYWNlZFNoaXBzLnB1c2goc2hpcCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSBwbGFjZWRTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAuaGFzQ29vcmRpbmF0ZXMoYXR0YWNrQ29vcmRpbmF0ZXMpKTtcbiAgICBpZiAoYXR0YWNrZWRTaGlwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaGl0QXR0YWNrcy5wdXNoKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICAgIGF0dGFja2VkU2hpcFswXS5oaXQoYXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBcbiAgICBtaXNzZWRBdHRhY2tzLnB1c2goYXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGlzR2FtZU92ZXIgPSAoKSA9PiBwbGFjZWRTaGlwcy5ldmVyeSgocGxhY2VkU2hpcCkgPT4gcGxhY2VkU2hpcC5pc1N1bmsoKSk7XG5cbiAgY29uc3QgaXNQb3NpdGlvbkZyZWVUb0F0dGFjayA9IChhdHRhY2tDb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IHBvc2l0aW9uQ2hlY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGlmIChjb29yZGluYXRlc1swXSAhPT0gYXR0YWNrQ29vcmRpbmF0ZXNbMF0gfHwgY29vcmRpbmF0ZXNbMV0gIT09IGF0dGFja0Nvb3JkaW5hdGVzWzFdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBmcmVlUG9zaXRpb24gPSBtaXNzZWRBdHRhY2tzLmV2ZXJ5KHBvc2l0aW9uQ2hlY2spICYmIGhpdEF0dGFja3MuZXZlcnkocG9zaXRpb25DaGVjayk7XG4gICAgcmV0dXJuIGZyZWVQb3NpdGlvbjtcbiAgfSBcblxuICBjb25zdCBnZXRBbGxDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBhbGxDb29yZGluYXRlcyA9IHBsYWNlZFNoaXBzLm1hcCgoc2hpcCkgPT4gIHNoaXAuZ2V0U2hpcENvb3JkaW5hdGVzKCkpO1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4uYWxsQ29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcbiAgICBwbGFjZWRTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBzaGlwSW5kZXggPSBwbGFjZWRTaGlwcy5pbmRleE9mKHNoaXApO1xuICAgICAgcGxhY2VkU2hpcHNbc2hpcEluZGV4XSA9IG51bGw7XG4gICAgfSk7XG4gICAgcGxhY2VkU2hpcHMgPSBbXTtcbiAgICBtaXNzZWRBdHRhY2tzID0gW107XG4gICAgaGl0QXR0YWNrcyA9IFtdO1xuICB9XG5cbiAgY29uc3QgcG9wdWxhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBjbGVhckJvYXJkKCk7XG4gICAgbGV0IHNoaXBzUGxhY2VkID0gMDtcbiAgICBsZXQgbGVuZ3RoID0gNTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKHNoaXBzUGxhY2VkIDwgMTApIHtcbiAgICAgIGNvbnN0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3Qgcm90YXRpb24gPSByb3RhdGlvbkNob2ljZSgpO1xuICAgICAgY29uc3QgcGxhY2VkU2hpcCA9IHBsYWNlU2hpcChsZW5ndGgsIFtyYW5kb21YLCByYW5kb21ZXSwgcm90YXRpb24pO1xuICAgICAgaWYgKHBsYWNlZFNoaXApIHtcbiAgICAgICAgc2hpcHNQbGFjZWQgKz0gMTtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChzaGlwc1BsYWNlZCkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgbGVuZ3RoID0gNDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGxlbmd0aCA9IDM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICBsZW5ndGggPSAyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpICs9IDE7XG4gICAgICAvKlxuICAgICAgICBUaGVyZSBhcmUgc29tZSBjYXNlcyB3aGVyZSBpdCBpcyBpbXBvc3NpYmxlIHRvIHBsYWNlIGFub3RoZXIgc2hpcCBkdWUgdG8gdGhlIGJvYXJkIGxheW91dCByZXN1bHRpbmdcbiAgICAgICAgaW4gYSBpbmZpbml0ZSBsb29wLiBpIGlzIGhlcmUgdG8gZGV0ZWN0IGFuIGluZmluaXRlIGxvb3AgYW5kIHJlc2V0IHRoZSBib2FyZCBhbmQgdHJ5IGFnYWluIHdoZW4gb25lXG4gICAgICAgIGhhcHBlbnMuXG4gICAgICAqL1xuICAgICAgaWYgKCBpID09PSAxMDAwKSB7XG4gICAgICAgIGNsZWFyQm9hcmQoKTtcbiAgICAgICAgc2hpcHNQbGFjZWQgPSAwO1xuICAgICAgICBsZW5ndGggPSA1O1xuICAgICAgICBpID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRMYXN0Q3JlYXRlZFNoaXAgPSAoKSA9PiB7XG4gICAgY29uc3QgbGFzdFNoaXAgPSBwbGFjZWRTaGlwc1twbGFjZWRTaGlwcy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gbGFzdFNoaXA7XG4gIH1cblxuICBjb25zdCBzdW5rU2hpcENoZWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHN1bmtTaGlwID0gcGxhY2VkU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcbiAgICBpZiAoc3Vua1NoaXAubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzdW5rU2hpcDtcbiAgfVxuXG4gIGNvbnN0IHJlbW92ZVN1bmtTaGlwID0gKCkgPT4ge1xuICAgIGNvbnN0IHN1bmtTaGlwID0gc3Vua1NoaXBDaGVjaygpO1xuICAgIGlmICghc3Vua1NoaXApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3Qgc3Vua1NoaXBJbmRleCA9IHBsYWNlZFNoaXBzLmluZGV4T2Yoc3Vua1NoaXBbMF0pO1xuICAgIGNvbnN0IHJlbW92ZWRTaGlwID0gcGxhY2VkU2hpcHMuc3BsaWNlKHN1bmtTaGlwSW5kZXgsIDEpO1xuICAgIHN1bmtTaGlwWzBdID0gbnVsbDtcbiAgICByZXR1cm4gcmVtb3ZlZFNoaXBbMF07XG4gIH1cblxuICBjb25zdCBjb3B5UGxhY2VkU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3QgY29weSA9IFtdO1xuICAgIHBsYWNlZFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGNvcHkucHVzaChzaGlwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY29weTtcbiAgfVxuXG4gIGNvbnN0IGlzQm9hcmRDb21wbGV0ZSA9ICgpID0+IHBsYWNlZFNoaXBzLmxlbmd0aCA9PT0gMTA7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBpc0dhbWVPdmVyLFxuICAgIGlzUG9zaXRpb25GcmVlVG9BdHRhY2ssXG4gICAgZ2V0QWxsQ29vcmRpbmF0ZXMsXG4gICAgY2xlYXJCb2FyZCxcbiAgICBwb3B1bGF0ZUJvYXJkLFxuICAgIHN1bmtTaGlwQ2hlY2ssXG4gICAgcmVtb3ZlU3Vua1NoaXAsXG4gICAgZ2V0TGFzdENyZWF0ZWRTaGlwLFxuICAgIGlzUG9zaXRpb25BdmFpbGlhYmxlLFxuICAgIGNvcHlQbGFjZWRTaGlwcyxcbiAgICBpc0JvYXJkQ29tcGxldGUsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkOyIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSAnLi9nYW1lQm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyLCBDb21wdXRlclBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBHYW1lRXZlbnRzIGZyb20gJy4vdXNlckludGVyZmFjZS9nYW1lRXZlbnRzJztcbmltcG9ydCBQbGFjZW1lbnRFdmVudHMgZnJvbSAnLi91c2VySW50ZXJmYWNlL3BsYWNlbWVudEV2ZW50cyc7XG5pbXBvcnQgcmVuZGVyR3JpZHMgIGZyb20gJy4vdXNlckludGVyZmFjZS9yZW5kZXJVSSc7XG5cbmNvbnN0IGdhbWVTdGFydCA9ICgpID0+IHtcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgY29uc3QgaHVtYW5Cb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlclBsYXllciA9IENvbXB1dGVyUGxheWVyKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuICByZW5kZXJHcmlkcyhodW1hbkJvYXJkLmdldEFsbENvb3JkaW5hdGVzKCkpO1xuICBHYW1lRXZlbnRzLnBhZ2VMaXN0ZW5lcnMoaHVtYW5QbGF5ZXIsIGh1bWFuQm9hcmQsIGNvbXB1dGVyUGxheWVyLCBjb21wdXRlckJvYXJkKTtcbiAgUGxhY2VtZW50RXZlbnRzLnBsYWNlbWVudExpc3RlbmVycyhodW1hbkJvYXJkLCBodW1hblBsYXllciwgY29tcHV0ZXJCb2FyZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBodW1hblBsYXllcixcbiAgICBodW1hbkJvYXJkLFxuICAgIGNvbXB1dGVyUGxheWVyLFxuICAgIGNvbXB1dGVyQm9hcmQsXG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcbiAgZ2FtZVN0YXJ0LFxufSIsImNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgYXR0YWNrRW5lbXlCb2FyZCA9IChlbmVteUdhbWVCb2FyZCwgYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICAvKiBSZXR1cm5zIHRydWUgaWYgYSBzaGlwIHdhcyBoaXQgKi9cbiAgICBjb25zdCBzaGlwQXR0YWNrZWQgPSBlbmVteUdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gc2hpcEF0dGFja2VkO1xuICB9XG5cbiAgY29uc3QgZ2V0UGxheWVyU2hpcCA9IChjb29yZGluYXRlcywgcGxheWVyR2FtZUJvYXJkKSA9PiB7XG4gICAgY29uc3QgYWxsUGxhY2VkU2hpcHMgPSBwbGF5ZXJHYW1lQm9hcmQuY29weVBsYWNlZFNoaXBzKCk7XG4gICAgY29uc3QgdGFyZ2V0U2hpcCA9IGFsbFBsYWNlZFNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5oYXNDb29yZGluYXRlcyhjb29yZGluYXRlcykpWzBdO1xuICAgIHJldHVybiB0YXJnZXRTaGlwO1xuICB9XG5cbiAgY29uc3Qgcm90YXRlQm9hcmRTaGlwID0gKHBsYXllckdhbWVCb2FyZCwgdGFyZ2V0U2hpcCkgPT4ge1xuICAgIHRhcmdldFNoaXAucm90YXRlU2hpcElmUG9zc2libGUocGxheWVyR2FtZUJvYXJkKTtcbiAgICByZXR1cm4gdGFyZ2V0U2hpcDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrRW5lbXlCb2FyZCxcbiAgICByb3RhdGVCb2FyZFNoaXAsXG4gICAgZ2V0UGxheWVyU2hpcCxcbiAgfVxufVxuXG5jb25zdCBDb21wdXRlclBsYXllciA9ICgpID0+IHtcblxuICAvKiBVc2VkIHRvIHN0b3JlIGFsbCB0aGUgYXR0YWNrcyBtYWRlIGJ5IHRoZSBjb21wdXRlciAqL1xuICBjb25zdCBzdWNjZXNzZnVsQXR0YWNrcyA9IFtdO1xuICBjb25zdCBhZGphY2VudEF0dGFja0Z1bmN0aW9ucyA9IFtcbiAgICAoY29vcmRpbmF0ZXMpID0+IFtjb29yZGluYXRlc1swXSAtIDEsIGNvb3JkaW5hdGVzWzFdXSwgLyogTGVmdCAqL1xuICAgIChjb29yZGluYXRlcykgPT4gW2Nvb3JkaW5hdGVzWzBdICsgMSwgY29vcmRpbmF0ZXNbMV1dLCAvKiBSaWdodCAqL1xuICAgIChjb29yZGluYXRlcykgPT4gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSAtIDFdLCAvKiBVcCAqL1xuICAgIChjb29yZGluYXRlcykgPT4gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSArIDFdLCAvKiBEb3duICovXG4gIF07XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgY29uc3QgYXR0YWNrRW5lbXlCb2FyZCA9IChlbmVteUdhbWVCb2FyZCwgYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBzaGlwQXR0YWNrZWQgPSBlbmVteUdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICBpZiAoc2hpcEF0dGFja2VkKSB7XG4gICAgICBzdWNjZXNzZnVsQXR0YWNrcy5wdXNoKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICB9IGVsc2UgaWYgKCFzaGlwQXR0YWNrZWQpIHtcbiAgICAgIGlmIChzdWNjZXNzZnVsQXR0YWNrcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2tzLnNwbGljZSgxKTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH0gXG4gICAgfVxuXG4gICAgaWYgKGVuZW15R2FtZUJvYXJkLnN1bmtTaGlwQ2hlY2soKSkge1xuICAgICAgc3VjY2Vzc2Z1bEF0dGFja3Muc3BsaWNlKDApO1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBzaGlwQXR0YWNrZWQ7XG4gIH1cblxuICBjb25zdCBwaWNrUmFuZG9tQ29vcmRpbmF0ZXMgPSAoZW5lbXlHYW1lQm9hcmQpID0+IHtcbiAgICBsZXQgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbcmFuZG9tWCwgcmFuZG9tWV07XG4gICAgd2hpbGUgKCFlbmVteUdhbWVCb2FyZC5pc1Bvc2l0aW9uRnJlZVRvQXR0YWNrKGNvb3JkaW5hdGVzKSkge1xuICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb29yZGluYXRlcyA9IFtyYW5kb21YLCByYW5kb21ZXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgY29uc3QgcGlja0FkamFjZW50Q29vcmRpbmF0ZXMgPSAoZW5lbXlHYW1lQm9hcmQpID0+IHtcbiAgICBsZXQgbGFzdENvb3JkaW5hdGVzID0gc3VjY2Vzc2Z1bEF0dGFja3Nbc3VjY2Vzc2Z1bEF0dGFja3MubGVuZ3RoIC0gMV07XG4gICAgbGV0IFt4LCB5XSA9IGFkamFjZW50QXR0YWNrRnVuY3Rpb25zW2luZGV4XShsYXN0Q29vcmRpbmF0ZXMpO1xuXG4gICAgaWYgKCBcbiAgICAgICFlbmVteUdhbWVCb2FyZC5pc1Bvc2l0aW9uRnJlZVRvQXR0YWNrKFt4LCB5XSkgXG4gICAgICB8fCB4ID4gOSB8fCB5ID4gOSAgXG4gICAgICB8fCB4IDwgMCB8fCB5IDwgMFxuICAgICAgKSB7XG4gICAgICBzdWNjZXNzZnVsQXR0YWNrcy5zcGxpY2UoMSk7XG4gICAgICBsYXN0Q29vcmRpbmF0ZXMgPSBzdWNjZXNzZnVsQXR0YWNrc1tzdWNjZXNzZnVsQXR0YWNrcy5sZW5ndGggLSAxXTtcbiAgICB9XG4gXG4gICAgd2hpbGUgKCBcbiAgICAgICFlbmVteUdhbWVCb2FyZC5pc1Bvc2l0aW9uRnJlZVRvQXR0YWNrKFt4LCB5XSkgXG4gICAgICB8fCB4ID4gOSB8fCB5ID4gOSBcbiAgICAgIHx8IHggPCAwIHx8IHkgPCAwXG4gICAgICApIHtcbiAgICAgIGluZGV4ICs9IDE7XG4gICAgICBbeCwgeV0gPSBhZGphY2VudEF0dGFja0Z1bmN0aW9uc1tpbmRleF0obGFzdENvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG5cbiAgY29uc3QgcGlja0Nvb3JkaW5hdGVzID0gKGVuZW15R2FtZUJvYXJkKSA9PiB7XG4gICAgaWYgKHN1Y2Nlc3NmdWxBdHRhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHBpY2tSYW5kb21Db29yZGluYXRlcyhlbmVteUdhbWVCb2FyZCk7XG4gICAgfVxuICAgIHJldHVybiBwaWNrQWRqYWNlbnRDb29yZGluYXRlcyhlbmVteUdhbWVCb2FyZCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGF0dGFja0VuZW15Qm9hcmQsXG4gICAgcGlja0Nvb3JkaW5hdGVzLFxuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBsYXllciwgXG4gIENvbXB1dGVyUGxheWVyLFxufSIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCBzaGlwQ29vcmRpbmF0ZXMpID0+IHtcbiAgLypcbiAgICBFYWNoIHNoaXAgY29vcmRpbmF0ZSBpcyBzdG9yZWQgYXMgYSBrZXkgaW4gdGhlIG9iamVjdCB3aXRoIHRoZSBcbiAgICB2YWx1ZSBiZWluZyBhIGJvb2xlYW4gc2hvd2luZyB3aGV0aGVyIHRoZSBwb3NpdGlvbiBoYXMgYmVlbiBoaXRcbiAgICBvciBub3RcbiAgKi9cbiAgY29uc3Qgc2hpcEhpdHMgPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHNoaXBIaXRzW3NoaXBDb29yZGluYXRlc1tpXV0gPSBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHNoaXBOYW1lcyA9IHtcbiAgICAyOiAnRGVzdHJveWVyJyxcbiAgICAzOiAnQ3J1aXNlcicsXG4gICAgNDogJ0JhdHRsZXNoaXAnLFxuICAgIDU6ICdDYXJyaWVyJyxcbiAgfVxuXG4gIGNvbnN0IGdldFNoaXBOYW1lID0gKCkgPT4gc2hpcE5hbWVzW2xlbmd0aF07XG5cbiAgY29uc3QgZ2V0U2hpcENvb3JkaW5hdGVzID0gKCkgPT4gc2hpcENvb3JkaW5hdGVzO1xuXG4gIGNvbnN0IGhhc0Nvb3JkaW5hdGVzID0gKGF0dGFja0Nvb3JkaW5hdGVzKSA9PiB7XG4gICAgbGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcbiAgICBzaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGlmIChhdHRhY2tDb29yZGluYXRlc1swXSA9PT0gY29vcmRpbmF0ZXNbMF0gXG4gICAgICAgICYmIGF0dGFja0Nvb3JkaW5hdGVzWzFdID09PSBjb29yZGluYXRlc1sxXSkge1xuICAgICAgICAgIG1hdGNoRm91bmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbWF0Y2hGb3VuZDtcbiAgfVxuXG4gIGNvbnN0IGhpdCA9IChhdHRhY2tDb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzS2V5ID0gYXR0YWNrQ29vcmRpbmF0ZXMudG9TdHJpbmcoKTtcbiAgICBzaGlwSGl0c1tjb29yZGluYXRlc0tleV0gPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBIaXRCb29scyA9IE9iamVjdC52YWx1ZXMoc2hpcEhpdHMpO1xuICAgIHJldHVybiBzaGlwSGl0Qm9vbHMuZXZlcnkoKGJvb2wpID0+IGJvb2wpO1xuICB9XG5cbiAgLyogQ2hlY2tzIGlmIHkgY29vcmRpbmF0ZXMgb2YgdGhlIHNoaXAgYXJlIHRoZSBzYW1lICovXG4gIGNvbnN0IGlzU2hpcEhvcml6b250YWwgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRTaGlwQ29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCBbIGZpcnN0Q29vcmRpbmF0ZXMsIHNlY29uZENvb3JkaW5hdGVzIF0gPSBjb29yZGluYXRlcztcbiAgICBpZiAoZmlyc3RDb29yZGluYXRlc1sxXSA9PT0gc2Vjb25kQ29vcmRpbmF0ZXNbMV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICBjb25zdCByb3RhdGVTaGlwID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IGlzU2hpcEhvcml6b250YWwoKTtcbiAgICBzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoID0gMDtcbiAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkaW5hdGVzWzBdLCBzdGFydENvb3JkaW5hdGVzWzFdICsgaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSs9IDEpIHtcbiAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRpbmF0ZXNbMF0gKyBpLCBzdGFydENvb3JkaW5hdGVzWzFdXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogXG4gICAgVGhpcyBmdW5jdGlvbiByb3RhdGVzIGEgc2hpcCBvbiB0aGUgZ2FtZWJvYXJkIGFuZCBjaGVja3MgaWYgdGhlIG5ldyBjb29yZGluYXRlcyBhcmUgcG9zc2libGUgb24gdGhlIGdhbWVib2FyZC5cbiAgICBJZiB0aGUgcG9zaXRpb24gaXMgcG9zc2libGUgdGhlIHJvdGF0aW9uIGlzIGtlcHQsIGlmIGl0IGlzIG5vdCB0aGVuIHRoZSBzaGlwIGlzIHJvdGF0ZWQgYmFjayB0byBpdHMgb3JpZ2luYWxcbiAgICBwb3NpdGlvbi5cbiAgKi9cbiAgY29uc3Qgcm90YXRlU2hpcElmUG9zc2libGUgPSAocGxheWVyR2FtZUJvYXJkKSA9PiB7XG4gICAgbGV0IHJvdGF0aW9uID0gaXNTaGlwSG9yaXpvbnRhbCgpO1xuICAgIHJvdGF0ZVNoaXAoKTtcbiAgICByb3RhdGlvbiA9ICFyb3RhdGlvbjtcbiAgICBjb25zdCBwbGFjZWRTaGlwc0NvcHkgPSBwbGF5ZXJHYW1lQm9hcmQuY29weVBsYWNlZFNoaXBzKCk7XG4gICAgLyogRmlsdGVycyBvdXQgdGhlIHNoaXAgdGhhdCBoYXMgYmVlbiByb3RhdGVkICovXG4gICAgY29uc3QgZmlsdGVyZWRTaGlwcyA9IHBsYWNlZFNoaXBzQ29weS5maWx0ZXIoKHBsYWNlZFNoaXApID0+IHBsYWNlZFNoaXAuZ2V0U2hpcENvb3JkaW5hdGVzKClbMF0gIT09IHNoaXBDb29yZGluYXRlc1swXSApO1xuICAgIGlmIChwbGF5ZXJHYW1lQm9hcmQuaXNQb3NpdGlvbkF2YWlsaWFibGUobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCByb3RhdGlvbiwgZmlsdGVyZWRTaGlwcykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gXG4gICAgcm90YXRlU2hpcCgpO1xuICAgIHJvdGF0aW9uID0gIXJvdGF0aW9uO1xuICAgIHJldHVybiBmYWxzZTsgXG4gIH1cblxuICBjb25zdCBnZXRTaGlwTGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuXG5cbiAgcmV0dXJuIHtcbiAgICBnZXRTaGlwTmFtZSxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGhhc0Nvb3JkaW5hdGVzLFxuICAgIGdldFNoaXBDb29yZGluYXRlcyxcbiAgICByb3RhdGVTaGlwSWZQb3NzaWJsZSxcbiAgICBnZXRTaGlwTGVuZ3RoLFxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBFbGVtZW50Q3JlYXRpb24gZnJvbSBcIi4uL2VsZW1lbnRDcmVhdGlvblwiO1xuXG5jb25zdCBHYW1lRXZlbnRzID0gKCgpID0+IHtcbiAgY29uc3QgcGFnZUNsaWNrRXZlbnRzID0gKGV2ZW50LCBwbGF5ZXIsIHBsYXllckdhbWVCb2FyZCwgZW5lbXksIGVuZW15R2FtZUJvYXJkKSA9PiB7XG5cbiAgICBjb25zdCBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSA9IChtZXNzYWdlVHlwZSwgc3Vua1NoaXBOYW1lLCBwbGF5ZXJUeXBlKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke21lc3NhZ2VUeXBlfS1tZXNzYWdlYCk7XG4gICAgICBjb25zdCBjdXJyZW50U2hvd25NZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtc3RhdHVzLW1lc3NhZ2Uuc2hvd24nKTtcblxuICAgICAgY3VycmVudFNob3duTWVzc2FnZS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93bicpO1xuXG4gICAgICBpZiAobWVzc2FnZVR5cGUgPT09ICdwbGF5ZXItc2luaycpIHtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgWW91IEhhdmUgU3VuayBUaGUgRW5lbXkncyAke3N1bmtTaGlwTmFtZX0hYDtcbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZVR5cGUgPT09ICdjb21wdXRlci1zaW5rJykge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IGBZb3VyICR7c3Vua1NoaXBOYW1lfSBIYXMgQmVlbiBTdW5rIWA7XG4gICAgICB9XG5cbiAgICAgIGlmIChwbGF5ZXJUeXBlID09PSAncGxheWVyJykge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNDU3QjlEJztcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyVHlwZSA9PT0gJ2NvbXB1dGVyJykge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjRTYzOTQ2JztcbiAgICAgIH1cblxuICAgICAgbWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvd24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJNb3ZlID0gKCkgPT4ge1xuICAgICAgY29uc3QgeENvb3JkaW5hdGUgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC54LCAxMCk7XG4gICAgICBjb25zdCB5Q29vcmRpbmF0ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnksIDEwKTtcbiAgICAgIGNvbnN0IHNoaXBBdHRhY2tlZCA9IHBsYXllci5hdHRhY2tFbmVteUJvYXJkKGVuZW15R2FtZUJvYXJkLCBbeENvb3JkaW5hdGUsIHlDb29yZGluYXRlXSk7XG4gICAgICBpZiAoc2hpcEF0dGFja2VkKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2hpdC1jaXJjbGUnLCBldmVudC50YXJnZXQpO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgncGxheWVyLWhpdCcsIG51bGwsICdwbGF5ZXInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICAgICAgRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ21pc3NlZC1jaXJjbGUnLCBldmVudC50YXJnZXQpO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgncGxheWVyLW1pc3MnLCBudWxsLCAncGxheWVyJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xuICAgICAgY29uc3QgY29tcHV0ZXJBdHRhY2tDb29yZGluYXRlcyA9IGVuZW15LnBpY2tDb29yZGluYXRlcyhwbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgY29uc3QgcGxheWVyU2hpcEF0dGFja2VkID0gZW5lbXkuYXR0YWNrRW5lbXlCb2FyZChwbGF5ZXJHYW1lQm9hcmQsIGNvbXB1dGVyQXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgY29tcHV0ZXJUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHtjb21wdXRlckF0dGFja0Nvb3JkaW5hdGVzWzBdfVwiXVtkYXRhLXk9XCIke2NvbXB1dGVyQXR0YWNrQ29vcmRpbmF0ZXNbMV19XCJdYCk7XG4gICAgICBpZiAocGxheWVyU2hpcEF0dGFja2VkKSB7XG4gICAgICAgIGNvbXB1dGVyVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBjb21wdXRlclRhcmdldC5jaGlsZE5vZGVzWzBdLmNsYXNzTmFtZSA9ICdoaXQtY2lyY2xlJztcbiAgICAgICAgY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UoJ2NvbXB1dGVyLWhpdCcsIG51bGwsICdjb21wdXRlcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcHV0ZXJUYXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzc2VkJyk7XG4gICAgICAgIEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdtaXNzZWQtY2lyY2xlJywgY29tcHV0ZXJUYXJnZXQpO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgnY29tcHV0ZXItbWlzcycsIG51bGwsICdjb21wdXRlcicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZUNsYXNzTmFtZSA9IChjbGFzc05hbWUpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NOYW1lfWApO1xuICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVtZW50U2hpcENvdW50ID0gKHNoaXBOYW1lLCBvd25lcikgPT4ge1xuICAgICAgY29uc3Qgc2hpcE5hbWVMb3dlciA9IHNoaXBOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7b3duZXJ9LXNlY3Rpb25gKTtcbiAgICAgIGNvbnN0IHNoaXBDb3VudEVsZW1lbnQgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoYC4ke3NoaXBOYW1lTG93ZXJ9LWNvdW50YCk7XG4gICAgICBzaGlwQ291bnRFbGVtZW50LmRhdGFzZXQuY291bnQgLT0gMTtcbiAgICAgIHNoaXBDb3VudEVsZW1lbnQudGV4dENvbnRlbnQgPSBzaGlwQ291bnRFbGVtZW50LmRhdGFzZXQuY291bnQ7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRTaGlwQ291bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBwbGF5ZXJTaGlwQ291bnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllci1zZWN0aW9uIC5zaGlwLWNvdW50Jyk7XG4gICAgICBjb25zdCBvcHBvbmVudFNoaXBDb3VudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtc2VjdGlvbiAuc2hpcC1jb3VudCcpO1xuICAgICAgXG4gICAgICBwbGF5ZXJTaGlwQ291bnRzLmZvckVhY2goKHBsYXllclNoaXBDb3VudCwgaW5kZXgpID0+IHtcbiAgICAgICAgcGxheWVyU2hpcENvdW50LmRhdGFzZXQuY291bnQgPSBpbmRleCArIDE7XG4gICAgICAgIHBsYXllclNoaXBDb3VudC50ZXh0Q29udGVudCA9IHBsYXllclNoaXBDb3VudC5kYXRhc2V0LmNvdW50O1xuXG4gICAgICAgIGNvbnN0IG9wcG9uZW50U2hpcENvdW50ID0gb3Bwb25lbnRTaGlwQ291bnRzW2luZGV4XTtcbiAgICAgICAgb3Bwb25lbnRTaGlwQ291bnQuZGF0YXNldC5jb3VudCA9IGluZGV4ICsgMTtcbiAgICAgICAgb3Bwb25lbnRTaGlwQ291bnQudGV4dENvbnRlbnQgPSBvcHBvbmVudFNoaXBDb3VudC5kYXRhc2V0LmNvdW50O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRHYW1lU3RhdHVzTWVzc2FnZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc2V0R2FtZVN0YXR1c01lc3NhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWUtc3RhdHVzLW1lc3NhZ2UnKTtcbiAgICAgIHJlc2V0R2FtZVN0YXR1c01lc3NhZ2VzLmZvckVhY2goKG1lc3NhZ2UpID0+IG1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd24nKSk7XG4gICAgICBjb25zdCB3YWl0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53YWl0LW1lc3NhZ2UnKVxuICAgICAgd2FpdE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnc2hvd24nKTtcbiAgICAgIHdhaXRNZXNzYWdlLnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM0NTdCOUQnO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc2V0R2FtZSA9ICgpID0+IHtcbiAgICAgIHBsYXllckdhbWVCb2FyZC5jbGVhckJvYXJkKCk7XG4gICAgICBlbmVteUdhbWVCb2FyZC5jbGVhckJvYXJkKCk7XG4gICAgICByZW1vdmVDbGFzc05hbWUoJ21pc3NlZCcpO1xuICAgICAgcmVtb3ZlQ2xhc3NOYW1lKCdoaXQnKTtcbiAgICAgIHJlbW92ZUNsYXNzTmFtZSgnc2hpcC1wbGFjZWQnKTtcbiAgICAgIHJlc2V0U2hpcENvdW50KCk7XG4gICAgICByZXNldEdhbWVTdGF0dXNNZXNzYWdlKCk7XG4gICAgICBjb25zdCBzaGlwUGxhY2VtZW50TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcC1wbGFjZW1lbnQtbW9kYWwnKTtcbiAgICAgIHNoaXBQbGFjZW1lbnRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBjb25zdCBzdW5rU2hpcENoZWNrID0gKGdhbWVCb2FyZCkgPT4ge1xuICAgICAgY29uc3Qgc3Vua1NoaXAgPSBnYW1lQm9hcmQucmVtb3ZlU3Vua1NoaXAoKTtcbiAgICAgIHJldHVybiBzdW5rU2hpcDtcbiAgICB9O1xuXG4gICAgY29uc3QgZGlzYWJsZVBsYXllckFjdGlvbnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBvcHBvbmVudEdyaWRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wcG9uZW50LXNxdWFyZScpO1xuICAgICAgb3Bwb25lbnRHcmlkU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpKTtcbiAgICB9XG4gXG4gICAgY29uc3QgZW5hYmxlUGxheWVyQWN0aW9ucyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG9wcG9uZW50R3JpZFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtc3F1YXJlJyk7XG4gICAgICBvcHBvbmVudEdyaWRTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4gc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJykpO1xuICAgIH1cblxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkLXNxdWFyZSBvcHBvbmVudC1zcXVhcmUnKSB7XG4gICAgICAvKiBDb250cm9scyB0aGUgZmxvdyBvZiBhIGdhbWUgKi9cbiAgICAgIHBsYXllck1vdmUoKTtcbiAgICAgIGNvbnN0IHBsYXllcldpbiA9IGVuZW15R2FtZUJvYXJkLmlzR2FtZU92ZXIoKTtcbiAgICAgIGNvbnN0IGVuZW15U3Vua1NoaXBDaGVjayA9IHN1bmtTaGlwQ2hlY2soZW5lbXlHYW1lQm9hcmQpO1xuXG4gICAgICBpZiAoZW5lbXlTdW5rU2hpcENoZWNrKSB7XG4gICAgICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IGVuZW15U3Vua1NoaXBDaGVjay5nZXRTaGlwQ29vcmRpbmF0ZXMoKTtcbiAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBlbmVteVN1bmtTaGlwQ2hlY2suZ2V0U2hpcE5hbWUoKTtcbiAgICAgICAgc2hpcENvb3JkaW5hdGVzLmZvckVhY2goKFt4LCB5XSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGdyaWRTcXVhcmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm9wcG9uZW50LXNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcbiAgICAgICAgICBncmlkU3F1YXJlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSknO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVjcmVtZW50U2hpcENvdW50KHNoaXBOYW1lLCAnb3Bwb25lbnQnKTtcbiAgICAgICAgY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UoJ3BsYXllci1zaW5rJywgc2hpcE5hbWUsICdwbGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGF5ZXJXaW4pIHtcbiAgICAgICAgY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UoJ3BsYXllci13aW4nLCBudWxsLCAncGxheWVyJyk7XG4gICAgICAgIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWFnYWluLWJ0bi1jb250YWluZXInKTtcbiAgICAgICAgcGxheUFnYWluQnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBkaXNhYmxlUGxheWVyQWN0aW9ucygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNhYmxlUGxheWVyQWN0aW9ucygpOyAvKiBTdG9wcyBwbGF5ZXIgZnJvbSBtYWtpbmcgYSBtb3ZlIG9uIHRoZSBjb21wdXRlcidzIHR1cm4gKi9cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb21wdXRlck1vdmUoKTtcbiAgICAgICAgY29uc3QgY29tcHV0ZXJXaW4gPSBwbGF5ZXJHYW1lQm9hcmQuaXNHYW1lT3ZlcigpO1xuICAgICAgICBjb25zdCBwbGF5ZXJTdW5rU2hpcENoZWNrID0gc3Vua1NoaXBDaGVjayhwbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgICBpZiAocGxheWVyU3Vua1NoaXBDaGVjayl7XG4gICAgICAgICAgY29uc3QgcGxheWVyU2hpcE5hbWUgPSBwbGF5ZXJTdW5rU2hpcENoZWNrLmdldFNoaXBOYW1lKCk7XG4gICAgICAgICAgZGVjcmVtZW50U2hpcENvdW50KHBsYXllclNoaXBOYW1lLCAncGxheWVyJyk7XG4gICAgICAgICAgY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UoJ2NvbXB1dGVyLXNpbmsnLCBwbGF5ZXJTaGlwTmFtZSwgJ2NvbXB1dGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXB1dGVyV2luKSB7XG4gICAgICAgICAgY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UoJ2NvbXB1dGVyLXdpbicsIG51bGwsICdjb21wdXRlcicpO1xuICAgICAgICAgIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWFnYWluLWJ0bi1jb250YWluZXInKTtcbiAgICAgICAgICBwbGF5QWdhaW5CdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7ICAgICBcbiAgICAgICAgICBkaXNhYmxlUGxheWVyQWN0aW9ucygpOyAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5hYmxlUGxheWVyQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dhbWUtcmVzZXQtYnRuJyB8fCBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAncGxheS1hZ2Fpbi1idG4nKSB7XG4gICAgICByZXNldEdhbWUoKTtcbiAgICAgIGVuYWJsZVBsYXllckFjdGlvbnMoKTtcbiAgICAgIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWFnYWluLWJ0bi1jb250YWluZXInKTtcbiAgICAgIHBsYXlBZ2FpbkJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAgXG4gICAgICBjb25zdCBkZXBsb3lCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVwbG95LWJ0bicpO1xuICAgICAgZGVwbG95QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwYWdlTGlzdGVuZXJzID0gKHBsYXllciwgcGxheWVyR2FtZUJvYXJkLCBlbmVteSwgZW5lbXlHYW1lQm9hcmQpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgcGFnZUNsaWNrRXZlbnRzKGV2ZW50LCBwbGF5ZXIsIHBsYXllckdhbWVCb2FyZCwgZW5lbXksIGVuZW15R2FtZUJvYXJkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGFnZUxpc3RlbmVycyxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZUV2ZW50czsiLCJpbXBvcnQgRWxlbWVudENyZWF0aW9uIGZyb20gXCIuLi9lbGVtZW50Q3JlYXRpb25cIjtcblxuY29uc3QgUGxhY2VtZW50RXZlbnRzID0gKCgpID0+IHtcblxuICBjb25zdCBkZXBsb3lDaGVjayA9IChwbGF5ZXJHYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCBkZXBsb3lCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVwbG95LWJ0bicpO1xuICAgIGlmIChwbGF5ZXJHYW1lQm9hcmQuaXNCb2FyZENvbXBsZXRlKCkpIHtcbiAgICAgIGRlcGxveUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXBsb3lCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgXG4gIH1cbiAgY29uc3QgZHJhZ1N0YXJ0SGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0WzBdID09PSAnc2hpcC1kaXNwbGF5Jyl7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9IFwiY29weVwiO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBldmVudC50YXJnZXQuY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBkcmFnRW50ZXJIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkLXNxdWFyZSBwbGFjZW1lbnQtc3F1YXJlJykge1xuICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjRDZFQ0U1JztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkcmFnTGVhdmVIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkLXNxdWFyZSBwbGFjZW1lbnQtc3F1YXJlJykge1xuICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjQThEQURDJztcbiAgICB9XG4gIH1cblxuICBjb25zdCBkcm9wSGFuZGxlciA9IChldmVudCwgcGxheWVyR2FtZUJvYXJkKSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQtc3F1YXJlIHBsYWNlbWVudC1zcXVhcmUnKSB7XG4gICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyc7XG4gICAgICBjb25zdCBzaGlwRGlzcGxheUNsYXNzTmFtZSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJykuc3BsaXQoJyAnKTtcbiAgICAgIGNvbnN0IGRpc3BsYXlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzaGlwRGlzcGxheUNsYXNzTmFtZVswXX0uJHtzaGlwRGlzcGxheUNsYXNzTmFtZVsxXX1gKS5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgZGlzcGxheUNvdW50ID0gZGlzcGxheUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuZGlzcGxheS1jb3VudCcpO1xuICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3NoaXBEaXNwbGF5Q2xhc3NOYW1lWzBdfS4ke3NoaXBEaXNwbGF5Q2xhc3NOYW1lWzFdfSAuZ3JpZC1zcXVhcmVgKS5sZW5ndGg7XG4gICAgICBjb25zdCB4Q29vcmRpbmF0ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LngsIDEwKTtcbiAgICAgIGNvbnN0IHlDb29yZGluYXRlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSwgMTApO1xuICAgICAgLyogT25seSBwbGFjZXMgdGhlIHNoaXAgb24gdGhlIGJvYXJkIGlmIHRoZXJlIGFyZSBlbm91Z2ggbGVmdCBhbmQgaWYgdGhlIHNoaXBzIGNvb3JkaW5hdGVzIGFyZSB2YWxpZCAqL1xuICAgICAgaWYgKCBwYXJzZUludChkaXNwbGF5Q291bnQuZGF0YXNldC5kaXNwbGF5Q291bnQsIDEwKSA+IDApIHtcbiAgICAgICAgY29uc3Qgc2hpcFBsYWNlbWVudCA9IHBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aCwgW3hDb29yZGluYXRlLCB5Q29vcmRpbmF0ZV0sIHRydWUpO1xuICAgICAgICBpZiAoc2hpcFBsYWNlbWVudCkge1xuICAgICAgICAgIGNvbnN0IGNyZWF0ZWRTaGlwID0gcGxheWVyR2FtZUJvYXJkLmdldExhc3RDcmVhdGVkU2hpcCgpO1xuICAgICAgICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IGNyZWF0ZWRTaGlwLmdldFNoaXBDb29yZGluYXRlcygpO1xuICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxheWVyRE9NQ29vcmRpbmF0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxhY2VtZW50LXNxdWFyZVtkYXRhLXg9XCIke2Nvb3JkaW5hdGVzWzBdfVwiXVtkYXRhLXk9XCIke2Nvb3JkaW5hdGVzWzFdfVwiXWApO1xuICAgICAgICAgICAgcGxheWVyRE9NQ29vcmRpbmF0ZXMuY2xhc3NMaXN0LmFkZCgnc2hpcC1wbGFjZWQnKTtcbiAgICAgICAgICAgIHBsYXllckRPTUNvb3JkaW5hdGVzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KSc7XG4gICAgICAgICAgICBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnc2hpcC1jaXJjbGUnLCBwbGF5ZXJET01Db29yZGluYXRlcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGlzcGxheUNvdW50LmRhdGFzZXQuZGlzcGxheUNvdW50ID0gcGFyc2VJbnQoZGlzcGxheUNvdW50LmRhdGFzZXQuZGlzcGxheUNvdW50LCAxMCkgLSAxO1xuICAgICAgICAgIGRpc3BsYXlDb3VudC5pbm5lckhUTUwgPSBgJiMyMTU7JHtkaXNwbGF5Q291bnQuZGF0YXNldC5kaXNwbGF5Q291bnR9YDsgXG4gICAgICAgICAgZGVwbG95Q2hlY2socGxheWVyR2FtZUJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsaWNrSGFuZGxlcnMgPSAoZXZlbnQsIHBsYXllckdhbWVCb2FyZCwgcGxheWVyLCBlbmVteUdhbWVCb2FyZCkgPT4ge1xuXG4gICAgY29uc3QgcmVtb3ZlUGxhY2VkU2hpcEVsZW1lbnRzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgICBjb29yZGluYXRlcy5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgICAgY29uc3QgcGxhY2VtZW50U3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYWNlbWVudC1zcXVhcmVbZGF0YS14PVwiJHt4fVwiXVtkYXRhLXk9XCIke3l9XCJdYCk7XG4gICAgICAgIHBsYWNlbWVudFNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJztcbiAgICAgICAgcGxhY2VtZW50U3F1YXJlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHBsYWNlbWVudFNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLXBsYWNlZCcpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkUGxhY2VkU2hpcEVsZW1lbnRzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgICBjb29yZGluYXRlcy5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgICAgY29uc3QgcGxhY2VtZW50U3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYWNlbWVudC1zcXVhcmVbZGF0YS14PVwiJHt4fVwiXVtkYXRhLXk9XCIke3l9XCJdYCk7XG4gICAgICAgIHBsYWNlbWVudFNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSknO1xuICAgICAgICBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnc2hpcC1jaXJjbGUnLCBwbGFjZW1lbnRTcXVhcmUpO1xuICAgICAgICBwbGFjZW1lbnRTcXVhcmUuY2xhc3NMaXN0LmFkZCgnc2hpcC1wbGFjZWQnKTtcbiAgICAgIH0pOyAgICAgXG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHNoaXBQbGFjZWRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGFjZW1lbnQtZ3JpZCAuc2hpcC1wbGFjZWQnKTtcbiAgICAgIHNoaXBQbGFjZWRFbGVtZW50cy5mb3JFYWNoKChzaGlwRWxlbWVudCkgPT4ge1xuICAgICAgICBzaGlwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLXBsYWNlZCcpO1xuICAgICAgICBzaGlwRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJztcbiAgICAgICAgc2hpcEVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJhbmRvbWx5UG9wdWxhdGVCb2FyZCA9ICgpID0+IHtcbiAgICAgIHJlc2V0Qm9hcmQoKTtcbiAgICAgIHBsYXllckdhbWVCb2FyZC5wb3B1bGF0ZUJvYXJkKCk7XG4gICAgICBjb25zdCBwbGF5ZXJCb2FyZENvb3JkaW5hdGVzID0gcGxheWVyR2FtZUJvYXJkLmdldEFsbENvb3JkaW5hdGVzKCk7XG4gICAgICBhZGRQbGFjZWRTaGlwRWxlbWVudHMocGxheWVyQm9hcmRDb29yZGluYXRlcyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0RGlzcGxheUNvdW50cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRpc3BsYXlDb3VudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlzcGxheS1jb3VudCcpO1xuICAgICAgbGV0IG51bWJlck9mU2hpcHMgPSAxO1xuICAgICAgZGlzcGxheUNvdW50cy5mb3JFYWNoKChjb3VudCkgPT4ge1xuICAgICAgICBjb3VudC5kYXRhc2V0LmRpc3BsYXlDb3VudCA9IG51bWJlck9mU2hpcHM7XG4gICAgICAgIGNvdW50LmlubmVySFRNTCA9IGAmIzIxNTske2NvdW50LmRhdGFzZXQuZGlzcGxheUNvdW50fWA7XG4gICAgICAgIG51bWJlck9mU2hpcHMgKz0gMTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNldERpc3BsYXlDb3VudHNUb1plcm8gPSAoKSA9PiB7XG4gICAgICBjb25zdCBkaXNwbGF5Q291bnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpc3BsYXktY291bnQnKTtcbiAgICAgIGRpc3BsYXlDb3VudHMuZm9yRWFjaCgoY291bnQpID0+ICB7XG4gICAgICAgIGNvdW50LmRhdGFzZXQuZGlzcGxheUNvdW50ID0gMDtcbiAgICAgICAgY291bnQuaW5uZXJIVE1MID0gYCYjMjE1OyR7Y291bnQuZGF0YXNldC5kaXNwbGF5Q291bnR9YDtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgZGVwbG95U2hpcHMgPSAoKSA9PiB7XG4gICAgICByZXNldEJvYXJkKCk7XG4gICAgICBjb25zdCBwbGF5ZXJDb29yZGluYXRlcyA9IHBsYXllckdhbWVCb2FyZC5nZXRBbGxDb29yZGluYXRlcygpO1xuICAgICAgcGxheWVyQ29vcmRpbmF0ZXMuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllckRPTUNvb3JkaW5hdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllci1zcXVhcmVbZGF0YS14PVwiJHt4fVwiXVtkYXRhLXk9XCIke3l9XCJdYCk7XG4gICAgICAgIHBsYXllckRPTUNvb3JkaW5hdGVzLmNsYXNzTGlzdC5hZGQoJ3NoaXAtcGxhY2VkJyk7XG4gICAgICAgIHBsYXllckRPTUNvb3JkaW5hdGVzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KSc7XG4gICAgICAgIEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdzaGlwLWNpcmNsZScsIHBsYXllckRPTUNvb3JkaW5hdGVzKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgc2hpcFBsYWNlbWVudE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAtcGxhY2VtZW50LW1vZGFsJyk7XG4gICAgICBzaGlwUGxhY2VtZW50TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBsZXQgdGFyZ2V0O1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAnc2hpcC1jaXJjbGUnKSB7XG4gICAgICB0YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgfVxuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnZ3JpZC1zcXVhcmUgcGxhY2VtZW50LXNxdWFyZSBzaGlwLXBsYWNlZCcpIHtcbiAgICAgIC8qIFJvdGF0ZXMgYSBzaGlwIHdoZW4gaXQgaXMgY2xpY2tlZCAqL1xuICAgICAgY29uc3QgeENvb3JkaW5hdGUgPSBwYXJzZUludCh0YXJnZXQuZGF0YXNldC54LCAxMCk7XG4gICAgICBjb25zdCB5Q29vcmRpbmF0ZSA9IHBhcnNlSW50KHRhcmdldC5kYXRhc2V0LnksIDEwKTtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW3hDb29yZGluYXRlLCB5Q29vcmRpbmF0ZV07XG4gICAgICBjb25zdCBwbGF5ZXJTaGlwID0gcGxheWVyLmdldFBsYXllclNoaXAoY29vcmRpbmF0ZXMsIHBsYXllckdhbWVCb2FyZClcbiAgICAgIGNvbnN0IHBsYXllclNoaXBDb29yZGluYXRlcyA9IHBsYXllclNoaXAuZ2V0U2hpcENvb3JkaW5hdGVzKCk7XG4gICAgICByZW1vdmVQbGFjZWRTaGlwRWxlbWVudHMocGxheWVyU2hpcENvb3JkaW5hdGVzKTtcbiAgICAgIGNvbnN0IHJvdGF0ZWRTaGlwQ29vcmRpbmF0ZXMgPSBwbGF5ZXIucm90YXRlQm9hcmRTaGlwKHBsYXllckdhbWVCb2FyZCwgcGxheWVyU2hpcCkuZ2V0U2hpcENvb3JkaW5hdGVzKCk7XG4gICAgICBhZGRQbGFjZWRTaGlwRWxlbWVudHMocm90YXRlZFNoaXBDb29yZGluYXRlcyk7XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdwbGFjZW1lbnQtYnRuIHJhbmRvbS1idG4nKSB7XG4gICAgICByYW5kb21seVBvcHVsYXRlQm9hcmQoKTtcbiAgICAgIHNldERpc3BsYXlDb3VudHNUb1plcm8oKTtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3BsYWNlbWVudC1idG4gcmVzZXQtYnRuJykge1xuICAgICAgcGxheWVyR2FtZUJvYXJkLmNsZWFyQm9hcmQoKTtcbiAgICAgIHJlc2V0Qm9hcmQoKTtcbiAgICAgIHNldERpc3BsYXlDb3VudHMoKTtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3BsYWNlbWVudC1idG4gZGVwbG95LWJ0bicpIHtcbiAgICAgIGRlcGxveVNoaXBzKCk7XG4gICAgICBlbmVteUdhbWVCb2FyZC5wb3B1bGF0ZUJvYXJkKCk7XG4gICAgICBzZXREaXNwbGF5Q291bnRzKCk7XG4gICAgfVxuICAgIGRlcGxveUNoZWNrKHBsYXllckdhbWVCb2FyZCk7XG4gIH1cblxuICBjb25zdCBwbGFjZW1lbnRMaXN0ZW5lcnMgPSAocGxheWVyR2FtZUJvYXJkLCBwbGF5ZXIsIGVuZW15R2FtZUJvYXJkKSA9PiB7XG4gICAgY29uc3Qgc2hpcFBsYWNlbWVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwLXBsYWNlbWVudC1jb250YWluZXInKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnRIYW5kbGVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcImNvcHlcIlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXJIYW5kbGVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmVIYW5kbGVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGV2ZW50KSA9PiBkcm9wSGFuZGxlcihldmVudCwgcGxheWVyR2FtZUJvYXJkKSk7XG4gICAgc2hpcFBsYWNlbWVudENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gY2xpY2tIYW5kbGVycyhldmVudCwgcGxheWVyR2FtZUJvYXJkLCBwbGF5ZXIsIGVuZW15R2FtZUJvYXJkKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBsYWNlbWVudExpc3RlbmVycyxcbiAgfVxuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQbGFjZW1lbnRFdmVudHM7IiwiaW1wb3J0IEVsZW1lbnRDcmVhdGlvbiBmcm9tICcuLi9lbGVtZW50Q3JlYXRpb24nO1xuXG5jb25zdCByZW5kZXJHcmlkcyA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItc2VjdGlvbicpO1xuICBjb25zdCBwbGF5ZXJHcmlkV3JhcHBlciA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdncmlkLXdyYXBwZXIgcGxheWVyLWdyaWQtd3JhcHBlcicsIHBsYXllclNlY3Rpb24pO1xuICBjb25zdCBwbGF5ZXJHcmlkID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ3NoaXBzLWdyaWQgcGxheWVyLWdyaWQnLCBwbGF5ZXJHcmlkV3JhcHBlcik7XG4gIFxuICBjb25zdCBvcHBvbmVudFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3Bwb25lbnQtc2VjdGlvbicpO1xuICBjb25zdCBvcHBvbmVudEdyaWRXcmFwcGVyID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2dyaWQtd3JhcHBlciBvcHBvbmVudC1ncmlkLXdyYXBwZXInLCBvcHBvbmVudFNlY3Rpb24pO1xuICBjb25zdCBvcHBvbmVudEdyaWQgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnc2hpcHMtZ3JpZCBvcHBvbmVudC1ncmlkJywgb3Bwb25lbnRHcmlkV3JhcHBlcik7XG5cbiAgY29uc3QgcGxhY2VtZW50R3JpZFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxhY2VtZW50LWdyaWQtd3JhcHBlcicpO1xuICBjb25zdCBwbGFjZW1lbnRHcmlkID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ3NoaXBzLWdyaWQgcGxhY2VtZW50LWdyaWQnLCBwbGFjZW1lbnRHcmlkV3JhcHBlcik7XG5cbiAgZm9yICggbGV0IGkgPSAwOyAgaSA8PSA5IDsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPD0gOTsgaiArPSAxKSB7XG4gICAgICBjb25zdCBwbGF5ZXJTcXVhcmUgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnZ3JpZC1zcXVhcmUgcGxheWVyLXNxdWFyZScsIHBsYXllckdyaWQpO1xuICAgICAgY29uc3Qgb3Bwb25lbnRTcXVhcmUgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnZ3JpZC1zcXVhcmUgb3Bwb25lbnQtc3F1YXJlJywgb3Bwb25lbnRHcmlkKTtcbiAgICAgIGNvbnN0IHBsYWNlbWVudFNxdWFyZSA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdncmlkLXNxdWFyZSBwbGFjZW1lbnQtc3F1YXJlJywgcGxhY2VtZW50R3JpZCk7XG4gICAgICBwbGF5ZXJTcXVhcmUuZGF0YXNldC54ID0gajtcbiAgICAgIHBsYXllclNxdWFyZS5kYXRhc2V0LnkgPSBpO1xuICAgICAgb3Bwb25lbnRTcXVhcmUuZGF0YXNldC54ID0gajtcbiAgICAgIG9wcG9uZW50U3F1YXJlLmRhdGFzZXQueSA9IGk7IFxuICAgICAgcGxhY2VtZW50U3F1YXJlLmRhdGFzZXQueCA9IGo7XG4gICAgICBwbGFjZW1lbnRTcXVhcmUuZGF0YXNldC55ID0gaTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyR3JpZHM7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIkJsYWNrIE9wcyBPbmVcXFwiLCBjdXJzaXZlO1xcbn1cXG5cXG4ucGFnZS1oZWFkaW5nIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMy4ycmVtO1xcbn1cXG5cXG4uZ2FtZS1yZXNldC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZS1yZXNldC1idG4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMC42ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XFxuICB3aWR0aDogNTAlO1xcbiAgbWFyZ2luLXRvcDogMWVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbn1cXG5cXG4uZ3JpZC1zcXVhcmUuc2hpcC1wbGFjZWQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAwO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci13aWR0aDogMC4xZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQThEQURDO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi5zaGlwLWNpcmNsZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogNjAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMGVtO1xcbiAgcGFkZGluZy1ib3R0b206IDYwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLmdhbWUtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLmdhbWUtc2VjdGlvbiAucGxheWVyLXNlY3Rpb24ge1xcbiAgbWluLXdpZHRoOiA1MCU7XFxufVxcbi5nYW1lLXNlY3Rpb24gLm9wcG9uZW50LXNlY3Rpb24ge1xcbiAgbWluLXdpZHRoOiA1MCU7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uLWhlYWRpbmctY29udGFpbmVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNGVtO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICBjb2xvcjogd2hpdGU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU3QjlEO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uLWhlYWRpbmctY29udGFpbmVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNGVtO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICBjb2xvcjogd2hpdGU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTYzOTQ2O1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLWNvdW50cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnNoaXAtY291bnQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tcmlnaHQ6IDFlbTtcXG4gIG1hcmdpbi1sZWZ0OiAxZW07XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLW5hbWUge1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjNlbTtcXG59XFxuLmdhbWUtc2VjdGlvbiAuc2hpcC1jb3VudC1zZWN0aW9uLTEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLWNvdW50LXNlY3Rpb24tMiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5nYW1lLXNlY3Rpb24gLmdhbWUtc3RhdHVzIHtcXG4gIG1hcmdpbi1ib3R0b206IDJlbTtcXG4gIGJvcmRlcjogNHB4IHNvbGlkIGJsYWNrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ1N2I5ZDtcXG4gIHBhZGRpbmc6IDAuNWVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMWVtO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5nYW1lLXN0YXR1cy1tZXNzYWdlIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5nYW1lLXN0YXR1cy1tZXNzYWdlLnNob3duIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3BhY2l0eTogMTtcXG4gIGFuaW1hdGlvbi1uYW1lOiByZXZlYWw7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcbn1cXG5Aa2V5ZnJhbWVzIHJldmVhbCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuLmdhbWUtc2VjdGlvbiAucGxheS1hZ2Fpbi1idG4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnBsYXktYWdhaW4tYnRuIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDAuNmVtO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBib3JkZXItcmFkaXVzOiAyMnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbiAgZm9udC1zaXplOiAxLjFlbTtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBwYWRkaW5nOiAwLjhlbTtcXG59XFxuXFxuLmdyaWQtd3JhcHBlciAuc2hpcHMtZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIG1hcmdpbi10b3A6IDJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDRlbTtcXG59XFxuLmdyaWQtd3JhcHBlciAuZ3JpZC1zcXVhcmUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAwO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci13aWR0aDogMC4xZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQThEQURDO1xcbn1cXG4uZ3JpZC13cmFwcGVyIC5ncmlkLXNxdWFyZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDZFQ0U1O1xcbn1cXG4uZ3JpZC13cmFwcGVyIC5taXNzZWQtY2lyY2xlIHtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHdpZHRoOiA2MCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgaGVpZ2h0OiAwZW07XFxuICBwYWRkaW5nLWJvdHRvbTogNjAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMC4zZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUQzNTU3O1xcbn1cXG4uZ3JpZC13cmFwcGVyIC5oaXQtY2lyY2xlIHtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHdpZHRoOiA2MCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgaGVpZ2h0OiAwZW07XFxuICBwYWRkaW5nLWJvdHRvbTogNjAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMC4zZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTYzOTQ2O1xcbn1cXG5cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgcGFkZGluZzogMnJlbSAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0YxRkFFRTtcXG4gIG1hcmdpbi10b3A6IDJlbTtcXG4gIG1heC13aWR0aDogODAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgcGFkZGluZzogMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLmluZm8td3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tYm90dG9tOiAxZW07XFxuICBtYXJnaW4tdG9wOiAwLjhlbTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5yb3RhdGUtaW5mbyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAuc2hpcC1wbGFjZW1lbnQtaGVhZGluZyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAucGxhY2VtZW50LWdyaWQtd3JhcHBlciB7XFxuICBtYXgtd2lkdGg6IDYwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHBhZGRpbmctYm90dG9tOiAwLjFlbTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5kaXNwbGF5LWNvbnRhaW5lciB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAucGxhY2VkLXNoaXAtZGlzcGxheSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDA7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjFlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNBOERBREM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIHdpZHRoOiAwJTtcXG4gIG1pbi13aWR0aDogNiU7XFxuICBwYWRkaW5nLWJvdHRvbTogNiU7XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAuc2hpcC1kaXNwbGF5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwYWRkaW5nLWJvdHRvbTogMWVtO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAucGxhY2VtZW50LWdyaWQge1xcbiAgbWFyZ2luLWJvdHRvbTogMmVtO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1idG5zLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAucGxhY2VtZW50LWJ0biB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwLjZlbTtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgYm9yZGVyLXJhZGl1czogMjJweDtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5yYW5kb20tYnRuIHtcXG4gIG1hcmdpbjogMCAwLjRlbTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5ncmlkLXNxdWFyZS5wbGFjZW1lbnQtc3F1YXJlLnNoaXAtcGxhY2VkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDAlO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItd2lkdGg6IDAuMWVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0E4REFEQztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4zMjkpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQUE7QUFDRjs7QUFnREE7RUFDRSxxQ0FBQTtBQTdDRjs7QUFnREE7RUFDQyxrQkFBQTtFQUNBLGlCQUFBO0FBN0NEOztBQWdEQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQTdDRjs7QUFnREE7RUF2QkUsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQW1CQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBdkNGOztBQTJDQTtFQXpERSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7RUFpREEsNENBQUE7RUFDQSxrQkFBQTtBQTlCRjs7QUFpQ0E7RUF6RUUsa0JBQUE7RUFDQSxVQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFxRUEsc0JBQUE7QUF4QkY7O0FBMkJB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QVNFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFQSjtBQVVFO0VBQ0Usa0JBQUE7QUFSSjtBQVdFO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0FBVEo7QUFZRTtFQWhQQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBdU9GO0FBT0U7RUFDRSxlQUFBO0FBTEo7QUFRRTtFQWxSQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7RUEwUUUsNENBQUE7RUFDQSxrQkFBQTtBQUlKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5AbWl4aW4gY2lyY2xlIHtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHdpZHRoOiA2MCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgaGVpZ2h0OiAwZW07XFxuICBwYWRkaW5nLWJvdHRvbTogNjAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMC4zZW07XFxufVxcblxcbkBtaXhpbiBzcXVhcmUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAwO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci13aWR0aDogMC4xZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQThEQURDO1xcbn1cXG5cXG5AbWl4aW4gaGVhZGluZ0NvbnRhaW5lciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjRlbTtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cXG5AbWl4aW4gbWFpblNlY3Rpb24ge1xcbiAgbWluLXdpZHRoOiA1MCU7XFxufVxcblxcbkBtaXhpbiBidG4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMC42ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJCbGFjayBPcHMgT25lXFxcIiwgY3Vyc2l2ZTtcXG59XFxuXFxuLnBhZ2UtaGVhZGluZyB7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMy4ycmVtO1xcbn1cXG5cXG4uZ2FtZS1yZXNldC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZS1yZXNldC1idG4ge1xcbiAgQGluY2x1ZGUgYnRuO1xcbiAgd2lkdGg6IDUwJTtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFlbTtcXG59XFxuXFxuXFxuLmdyaWQtc3F1YXJlLnNoaXAtcGxhY2VkIHtcXG4gIEBpbmNsdWRlIHNxdWFyZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4zMjkpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4uc2hpcC1jaXJjbGUge1xcbiAgQGluY2x1ZGUgY2lyY2xlKCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4uZ2FtZS1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgLnBsYXllci1zZWN0aW9uIHtcXG4gICAgQGluY2x1ZGUgbWFpblNlY3Rpb24oKTtcXG4gIH1cXG5cXG4gIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgQGluY2x1ZGUgbWFpblNlY3Rpb24oKTtcXG4gIH1cXG4gIFxcbiAgLnBsYXllci1zZWN0aW9uLWhlYWRpbmctY29udGFpbmVyIHtcXG4gICAgQGluY2x1ZGUgaGVhZGluZ0NvbnRhaW5lcigpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU3QjlEO1xcbiAgfVxcblxcbiAgLm9wcG9uZW50LXNlY3Rpb24taGVhZGluZy1jb250YWluZXIge1xcbiAgICBAaW5jbHVkZSBoZWFkaW5nQ29udGFpbmVyKCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNFNjM5NDY7XFxuICB9XFxuXFxuICAuc2hpcC1jb3VudHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIH1cXG5cXG4gIC5zaGlwLWNvdW50LWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1hcmdpbi1yaWdodDogMWVtO1xcbiAgICBtYXJnaW4tbGVmdDogMWVtO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLnNoaXAtbmFtZSB7XFxuICAgIG1hcmdpbi1yaWdodDogMC4zZW07XFxuICB9XFxuXFxuICAuc2hpcC1jb3VudC1zZWN0aW9uLTEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgLnNoaXAtY291bnQtc2VjdGlvbi0yIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5nYW1lLXN0YXR1cyB7XFxuICAgIG1hcmdpbi1ib3R0b206IDJlbTtcXG4gICAgYm9yZGVyOiA0cHggc29saWQgYmxhY2s7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NTdiOWQ7XFxuICAgIHBhZGRpbmc6IDAuNWVtO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDEuMWVtO1xcbiAgfVxcblxcbiAgLmdhbWUtc3RhdHVzLW1lc3NhZ2Uge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcblxcbiAgLmdhbWUtc3RhdHVzLW1lc3NhZ2Uuc2hvd24ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHJldmVhbDtcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXG4gIH1cXG5cXG4gIEBrZXlmcmFtZXMgcmV2ZWFsIHtcXG4gICAgZnJvbSB7XFxuICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbiAgfVxcblxcbiAgLnBsYXktYWdhaW4tYnRuLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxuXFxuICAucGxheS1hZ2Fpbi1idG4ge1xcbiAgICBAaW5jbHVkZSBidG4oKTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbiAgICBmb250LXNpemU6IDEuMWVtO1xcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgICBwYWRkaW5nOiAwLjhlbTtcXG4gIH1cXG59XFxuXFxuLmdyaWQtd3JhcHBlciB7XFxuXFxuICAuc2hpcHMtZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgbWFyZ2luLXRvcDogMmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiA0ZW07XFxuICB9XFxuXFxuICAuZ3JpZC1zcXVhcmUge1xcbiAgICBAaW5jbHVkZSBzcXVhcmUoKTtcXG4gIH1cXG5cXG4gIC5ncmlkLXNxdWFyZTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNENkVDRTU7XFxuICB9XFxuXFxuICAubWlzc2VkLWNpcmNsZSB7XFxuICAgIEBpbmNsdWRlIGNpcmNsZSgpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUQzNTU3O1xcbiAgfVxcblxcbiAgLmhpdC1jaXJjbGUge1xcbiAgICBAaW5jbHVkZSBjaXJjbGUoKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0U2Mzk0NjtcXG4gIH1cXG59XFxuXFxuLnNoaXAtcGxhY2VtZW50LW1vZGFse1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgcGFkZGluZzogMnJlbSAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCwgMC40KTtcXG5cXG4gIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjFGQUVFO1xcbiAgICBtYXJnaW4tdG9wOiAyZW07XFxuICAgIG1heC13aWR0aDogODAlO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIHBhZGRpbmc6IDFlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgfVxcblxcbiAgLmluZm8td3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcXG4gICAgbWFyZ2luLXRvcDogMC44ZW07XFxuICB9XFxuXFxuICAucm90YXRlLWluZm8ge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuc2hpcC1wbGFjZW1lbnQtaGVhZGluZyB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtZ3JpZC13cmFwcGVyIHtcXG4gICAgbWF4LXdpZHRoOiA2MCU7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgcGFkZGluZy1ib3R0b206IDAuMWVtO1xcbiAgfVxcblxcbiAgLmRpc3BsYXktY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAucGxhY2VkLXNoaXAtZGlzcGxheSB7XFxuICAgIEBpbmNsdWRlIHNxdWFyZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgd2lkdGg6IDAlO1xcbiAgICBtaW4td2lkdGg6IDYlO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogNiU7XFxuICB9XFxuXFxuICAuc2hpcC1kaXNwbGF5IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZy1ib3R0b206IDFlbTtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxuXFxuICAucGxhY2VtZW50LWdyaWQge1xcbiAgICBtYXJnaW4tYm90dG9tOiAyZW07XFxuICB9XFxuXFxuICAucGxhY2VtZW50LWJ0bnMtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICB9XFxuXFxuICAucGxhY2VtZW50LWJ0biB7XFxuICAgIEBpbmNsdWRlIGJ0bigpO1xcbiAgfVxcblxcbiAgLnJhbmRvbS1idG4ge1xcbiAgICBtYXJnaW46IDAgMC40ZW07XFxuICB9XFxuXFxuICAuZ3JpZC1zcXVhcmUucGxhY2VtZW50LXNxdWFyZS5zaGlwLXBsYWNlZCB7XFxuICAgIEBpbmNsdWRlIHNxdWFyZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCB7IGdhbWVTdGFydCB9IGZyb20gJy4vZ2FtZUNvbnRyb2wnO1xuXG5nYW1lU3RhcnQoKTtcbiJdLCJuYW1lcyI6WyJFbGVtZW50Q3JlYXRpb24iLCJjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MiLCJ0YWciLCJjbGFzc05hbWUiLCJwYXJlbnRFbGVtZW50IiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ2hpbGRFbGVtZW50V2l0aElkIiwiaWQiLCJjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3NBbmRJZCIsIlNoaXAiLCJHYW1lQm9hcmQiLCJwbGFjZWRTaGlwcyIsIm1pc3NlZEF0dGFja3MiLCJoaXRBdHRhY2tzIiwiYm9hcmRXaWR0aCIsImJvYXJkSGVpZ2h0IiwiaXNBZGphY2VudCIsImNvb3JkaW5hdGVzIiwic2hpcHMiLCJhbGxTaGlwQ29vcmRpbmF0ZXMiLCJtYXAiLCJzaGlwIiwiZ2V0U2hpcENvb3JkaW5hdGVzIiwiY29uY2F0IiwiY2hlY2tYIiwic2hpcFhDb29yZGluYXRlIiwiY2hlY2tZIiwic2hpcFlDb29yZGluYXRlIiwibm9uQWRqYWNlbnRDb29yZGluYXRlcyIsImZpbHRlciIsInNoaXBDb29yZGluYXRlcyIsImxlbmd0aCIsInJvdGF0aW9uQ2hvaWNlIiwiY2hvaWNlcyIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNQb3NpdGlvbkF2YWlsaWFibGUiLCJzdGFydENvb3JkaW5hdGVzIiwicm90YXRpb24iLCJpIiwicHVzaCIsImF2YWlsaWFibGVDb29yZGluYXRlcyIsInBsYWNlU2hpcCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tDb29yZGluYXRlcyIsImF0dGFja2VkU2hpcCIsImhhc0Nvb3JkaW5hdGVzIiwiaGl0IiwiaXNHYW1lT3ZlciIsImV2ZXJ5IiwicGxhY2VkU2hpcCIsImlzU3VuayIsImlzUG9zaXRpb25GcmVlVG9BdHRhY2siLCJwb3NpdGlvbkNoZWNrIiwiZnJlZVBvc2l0aW9uIiwiZ2V0QWxsQ29vcmRpbmF0ZXMiLCJhbGxDb29yZGluYXRlcyIsImNsZWFyQm9hcmQiLCJmb3JFYWNoIiwic2hpcEluZGV4IiwiaW5kZXhPZiIsInBvcHVsYXRlQm9hcmQiLCJzaGlwc1BsYWNlZCIsInJhbmRvbVgiLCJyYW5kb21ZIiwiZ2V0TGFzdENyZWF0ZWRTaGlwIiwibGFzdFNoaXAiLCJzdW5rU2hpcENoZWNrIiwic3Vua1NoaXAiLCJyZW1vdmVTdW5rU2hpcCIsInN1bmtTaGlwSW5kZXgiLCJyZW1vdmVkU2hpcCIsInNwbGljZSIsImNvcHlQbGFjZWRTaGlwcyIsImNvcHkiLCJpc0JvYXJkQ29tcGxldGUiLCJQbGF5ZXIiLCJDb21wdXRlclBsYXllciIsIkdhbWVFdmVudHMiLCJQbGFjZW1lbnRFdmVudHMiLCJyZW5kZXJHcmlkcyIsImdhbWVTdGFydCIsImh1bWFuUGxheWVyIiwiaHVtYW5Cb2FyZCIsImNvbXB1dGVyUGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsInBhZ2VMaXN0ZW5lcnMiLCJwbGFjZW1lbnRMaXN0ZW5lcnMiLCJhdHRhY2tFbmVteUJvYXJkIiwiZW5lbXlHYW1lQm9hcmQiLCJzaGlwQXR0YWNrZWQiLCJnZXRQbGF5ZXJTaGlwIiwicGxheWVyR2FtZUJvYXJkIiwiYWxsUGxhY2VkU2hpcHMiLCJ0YXJnZXRTaGlwIiwicm90YXRlQm9hcmRTaGlwIiwicm90YXRlU2hpcElmUG9zc2libGUiLCJzdWNjZXNzZnVsQXR0YWNrcyIsImFkamFjZW50QXR0YWNrRnVuY3Rpb25zIiwiaW5kZXgiLCJwaWNrUmFuZG9tQ29vcmRpbmF0ZXMiLCJwaWNrQWRqYWNlbnRDb29yZGluYXRlcyIsImxhc3RDb29yZGluYXRlcyIsIngiLCJ5IiwicGlja0Nvb3JkaW5hdGVzIiwic2hpcEhpdHMiLCJzaGlwTmFtZXMiLCJnZXRTaGlwTmFtZSIsIm1hdGNoRm91bmQiLCJjb29yZGluYXRlc0tleSIsInRvU3RyaW5nIiwic2hpcEhpdEJvb2xzIiwiT2JqZWN0IiwidmFsdWVzIiwiYm9vbCIsImlzU2hpcEhvcml6b250YWwiLCJmaXJzdENvb3JkaW5hdGVzIiwic2Vjb25kQ29vcmRpbmF0ZXMiLCJyb3RhdGVTaGlwIiwiaXNIb3Jpem9udGFsIiwicGxhY2VkU2hpcHNDb3B5IiwiZmlsdGVyZWRTaGlwcyIsImdldFNoaXBMZW5ndGgiLCJwYWdlQ2xpY2tFdmVudHMiLCJldmVudCIsInBsYXllciIsImVuZW15IiwiY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UiLCJtZXNzYWdlVHlwZSIsInN1bmtTaGlwTmFtZSIsInBsYXllclR5cGUiLCJtZXNzYWdlRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjdXJyZW50U2hvd25NZXNzYWdlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInBsYXllck1vdmUiLCJ4Q29vcmRpbmF0ZSIsInBhcnNlSW50IiwidGFyZ2V0IiwiZGF0YXNldCIsInlDb29yZGluYXRlIiwiYWRkIiwiY29tcHV0ZXJNb3ZlIiwiY29tcHV0ZXJBdHRhY2tDb29yZGluYXRlcyIsInBsYXllclNoaXBBdHRhY2tlZCIsImNvbXB1dGVyVGFyZ2V0IiwiY2hpbGROb2RlcyIsInJlbW92ZUNsYXNzTmFtZSIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImRlY3JlbWVudFNoaXBDb3VudCIsInNoaXBOYW1lIiwib3duZXIiLCJzaGlwTmFtZUxvd2VyIiwidG9Mb3dlckNhc2UiLCJzZWN0aW9uIiwic2hpcENvdW50RWxlbWVudCIsImNvdW50IiwicmVzZXRTaGlwQ291bnQiLCJwbGF5ZXJTaGlwQ291bnRzIiwib3Bwb25lbnRTaGlwQ291bnRzIiwicGxheWVyU2hpcENvdW50Iiwib3Bwb25lbnRTaGlwQ291bnQiLCJyZXNldEdhbWVTdGF0dXNNZXNzYWdlIiwicmVzZXRHYW1lU3RhdHVzTWVzc2FnZXMiLCJtZXNzYWdlIiwid2FpdE1lc3NhZ2UiLCJyZXNldEdhbWUiLCJzaGlwUGxhY2VtZW50TW9kYWwiLCJkaXNwbGF5IiwiZ2FtZUJvYXJkIiwiZGlzYWJsZVBsYXllckFjdGlvbnMiLCJvcHBvbmVudEdyaWRTcXVhcmVzIiwic3F1YXJlIiwiZW5hYmxlUGxheWVyQWN0aW9ucyIsInBsYXllcldpbiIsImVuZW15U3Vua1NoaXBDaGVjayIsImdyaWRTcXVhcmVFbGVtZW50IiwicGxheUFnYWluQnRuIiwic2V0VGltZW91dCIsImNvbXB1dGVyV2luIiwicGxheWVyU3Vua1NoaXBDaGVjayIsInBsYXllclNoaXBOYW1lIiwiZGVwbG95QnV0dG9uIiwiZGlzYWJsZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVwbG95Q2hlY2siLCJkcmFnU3RhcnRIYW5kbGVyIiwiZGF0YVRyYW5zZmVyIiwiZWZmZWN0QWxsb3dlZCIsInNldERhdGEiLCJkcmFnRW50ZXJIYW5kbGVyIiwiZHJhZ0xlYXZlSGFuZGxlciIsImRyb3BIYW5kbGVyIiwicHJldmVudERlZmF1bHQiLCJzaGlwRGlzcGxheUNsYXNzTmFtZSIsImdldERhdGEiLCJzcGxpdCIsImRpc3BsYXlDb250YWluZXIiLCJkaXNwbGF5Q291bnQiLCJzaGlwTGVuZ3RoIiwic2hpcFBsYWNlbWVudCIsImNyZWF0ZWRTaGlwIiwicGxheWVyRE9NQ29vcmRpbmF0ZXMiLCJpbm5lckhUTUwiLCJjbGlja0hhbmRsZXJzIiwicmVtb3ZlUGxhY2VkU2hpcEVsZW1lbnRzIiwicGxhY2VtZW50U3F1YXJlIiwiYWRkUGxhY2VkU2hpcEVsZW1lbnRzIiwicmVzZXRCb2FyZCIsInNoaXBQbGFjZWRFbGVtZW50cyIsInNoaXBFbGVtZW50IiwicmFuZG9tbHlQb3B1bGF0ZUJvYXJkIiwicGxheWVyQm9hcmRDb29yZGluYXRlcyIsInNldERpc3BsYXlDb3VudHMiLCJkaXNwbGF5Q291bnRzIiwibnVtYmVyT2ZTaGlwcyIsInNldERpc3BsYXlDb3VudHNUb1plcm8iLCJkZXBsb3lTaGlwcyIsInBsYXllckNvb3JkaW5hdGVzIiwicGxheWVyU2hpcCIsInBsYXllclNoaXBDb29yZGluYXRlcyIsInJvdGF0ZWRTaGlwQ29vcmRpbmF0ZXMiLCJzaGlwUGxhY2VtZW50Q29udGFpbmVyIiwiZHJvcEVmZmVjdCIsInBsYXllclNlY3Rpb24iLCJwbGF5ZXJHcmlkV3JhcHBlciIsInBsYXllckdyaWQiLCJvcHBvbmVudFNlY3Rpb24iLCJvcHBvbmVudEdyaWRXcmFwcGVyIiwib3Bwb25lbnRHcmlkIiwicGxhY2VtZW50R3JpZFdyYXBwZXIiLCJwbGFjZW1lbnRHcmlkIiwiaiIsInBsYXllclNxdWFyZSIsIm9wcG9uZW50U3F1YXJlIl0sInNvdXJjZVJvb3QiOiIifQ==