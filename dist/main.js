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

  var resetAttackPattern = function resetAttackPattern() {
    successfulAttacks.splice(0);
    index = 0;
  };

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
      resetAttackPattern();
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
    pickCoordinates: pickCoordinates,
    resetAttackPattern: resetAttackPattern
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
      enemy.resetAttackPattern();
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n}\n\nbody {\n  font-family: \"Black Ops One\", cursive;\n}\n\n.page-heading {\n  text-align: center;\n  font-size: 3.2rem;\n  margin-top: 0.5em;\n}\n\n.game-reset-container {\n  display: flex;\n  justify-content: center;\n}\n\n.game-reset-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n  width: 50%;\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n.grid-square.ship-placed {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}\n\n.ship-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: grey;\n}\n\n.game-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.game-section .player-section {\n  min-width: 50%;\n}\n.game-section .opponent-section {\n  min-width: 50%;\n}\n.game-section .player-section-heading-container {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  background-color: #457B9D;\n}\n.game-section .opponent-section-heading-container {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  background-color: #E63946;\n}\n.game-section .ship-counts {\n  display: flex;\n  justify-content: space-around;\n}\n.game-section .ship-count-container {\n  display: flex;\n  margin-right: 1em;\n  margin-left: 1em;\n  flex-direction: column;\n}\n.game-section .ship-name {\n  margin-right: 0.3em;\n}\n.game-section .ship-count-section-1 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.game-section .ship-count-section-2 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.game-section .game-status {\n  margin-bottom: 2em;\n  border: 4px solid black;\n  background-color: #457b9d;\n  padding: 0.5em;\n  width: 100%;\n  text-align: center;\n  font-size: 1.1em;\n  color: white;\n}\n.game-section .game-status-message {\n  opacity: 0;\n  display: none;\n}\n.game-section .game-status-message.shown {\n  display: block;\n  opacity: 1;\n  animation-name: reveal;\n  animation-duration: 1s;\n}\n@keyframes reveal {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.game-section .play-again-btn-container {\n  display: none;\n}\n.game-section .play-again-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n  margin-bottom: 1em;\n  font-size: 1.1em;\n  border-style: solid;\n  padding: 0.8em;\n}\n@media (min-width: 650px) {\n  .game-section {\n    flex-direction: row;\n    justify-content: space-around;\n    margin-top: 6em;\n  }\n  .game-section .game-status {\n    position: absolute;\n    top: 10.3em;\n  }\n  .game-section .player-section {\n    min-width: 45%;\n  }\n  .game-section .opponent-section {\n    min-width: 45%;\n  }\n}\n@media (min-width: 1000px) {\n  .game-section .player-section {\n    min-width: 30%;\n  }\n  .game-section .opponent-section {\n    min-width: 30%;\n  }\n}\n@media (min-width: 1400px) {\n  .game-section .ship-circle {\n    margin-top: 0.5em;\n  }\n}\n@media (min-width: 1600px) {\n  .game-section .player-section {\n    min-width: 25%;\n  }\n  .game-section .opponent-section {\n    min-width: 25%;\n  }\n  .game-section .game-status {\n    font-size: 1.3em;\n    top: 8.3em;\n  }\n  .game-section .play-again-btn {\n    font-size: 1.5em;\n  }\n}\n\n.grid-wrapper .ships-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n  margin-top: 2em;\n  margin-bottom: 4em;\n}\n.grid-wrapper .grid-square {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n}\n.grid-wrapper .grid-square:hover {\n  background-color: #D6ECE5;\n}\n.grid-wrapper .missed-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: #1D3557;\n}\n.grid-wrapper .hit-circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n  background-color: #E63946;\n}\n@media (min-width: 1400px) {\n  .grid-wrapper .missed-circle {\n    margin-top: 0.5em;\n  }\n  .grid-wrapper .hit-circle {\n    margin-top: 0.5em;\n  }\n}\n\n.ship-placement-modal {\n  display: block;\n  position: fixed;\n  z-index: 1;\n  padding: 2rem 0;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n.ship-placement-modal .ship-placement-container {\n  background-color: #F1FAEE;\n  margin-top: 2em;\n  max-width: 80%;\n  margin: auto;\n  padding: 1em;\n  border-radius: 8px;\n  -webkit-box-shadow: -10px 0px 13px -7px #ffffff8a, 10px 0px 13px -7px #ffffff8a, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  box-shadow: 0px 13px -7px #ffffff5e, 10px 0px 13px -7px #ffffff77, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n}\n.ship-placement-modal .info-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-bottom: 1em;\n  margin-top: 0.8em;\n}\n.ship-placement-modal .rotate-info {\n  text-align: center;\n}\n.ship-placement-modal .ship-placement-heading {\n  text-align: center;\n}\n.ship-placement-modal .placement-grid-wrapper {\n  max-width: 60%;\n  margin: auto;\n  padding-bottom: 0.1em;\n}\n.ship-placement-modal .display-container {\n  max-width: 100%;\n  text-align: center;\n}\n.ship-placement-modal .placed-ship-display {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n  width: 0%;\n  min-width: 6%;\n  padding-bottom: 6%;\n}\n.ship-placement-modal .ship-circle {\n  margin-top: 0.3em;\n}\n.ship-placement-modal .ship-display {\n  display: flex;\n  padding-bottom: 1em;\n  justify-content: center;\n}\n.ship-placement-modal .placement-grid {\n  margin-bottom: 2em;\n}\n.ship-placement-modal .placement-btns-container {\n  display: flex;\n  justify-content: space-evenly;\n}\n.ship-placement-modal .placement-btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n}\n.ship-placement-modal .random-btn {\n  margin: 0 0.4em;\n}\n.ship-placement-modal .grid-square.placement-square.ship-placed {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}\n@media (min-width: 800px) {\n  .ship-placement-modal .placement-section {\n    display: flex;\n    align-items: center;\n  }\n  .ship-placement-modal .placement-grid-wrapper {\n    min-width: 47%;\n  }\n  .ship-placement-modal .ships-display-container {\n    min-width: 45%;\n  }\n  .ship-placement-modal .placed-ship-display {\n    min-width: 10%;\n    padding-bottom: 10%;\n  }\n}\n@media (min-width: 1000px) {\n  .ship-placement-modal .ship-circle {\n    margin-top: 0.5em;\n  }\n}\n@media (min-width: 1400px) {\n  .ship-placement-modal .ship-placement-container {\n    max-width: 65%;\n    margin-top: 7em;\n  }\n}\n@media (min-width: 1600px) {\n  .ship-placement-modal .ship-placement-container {\n    max-width: 55%;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"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","sourcesContent":["* {\n  margin: 0;\n}\n\n@mixin circle {\n  border-radius: 50%;\n  width: 60%;\n  background-color: grey;\n  height: 0em;\n  padding-bottom: 60%;\n  margin: auto;\n  margin-top: 0.3em;\n}\n\n@mixin square {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  border-style: solid;\n  border-color: white;\n  border-width: 0.1em;\n  cursor: pointer;\n  background-color: #A8DADC;\n}\n\n@mixin headingContainer {\n  text-align: center;\n  padding: 0.4em;\n  font-size: 1em;\n  color: white;\n  max-width: 100%;\n  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151,151,151,0); \n  box-shadow: 0px 10px 13px -7px #000000, 2px 4px 13px 6px rgba(151,151,151,0);\n}\n\n@mixin mainSection {\n  min-width: 50%;\n}\n\n@mixin btn {\n  cursor: pointer;\n  border-style: none;\n  padding: 0.6em;\n  font-size: 1em;\n  width: 100%;\n  font-weight: 600;\n  border-radius: 22px;\n}\n\nbody {\n  font-family: \"Black Ops One\", cursive;\n}\n\n.page-heading {\n\ttext-align: center;\n\tfont-size: 3.2rem;\n  margin-top: 0.5em;\n}\n\n.game-reset-container {\n  display: flex;\n  justify-content: center;\n}\n\n.game-reset-btn {\n  @include btn;\n  width: 50%;\n  margin-top: 1em;\n  margin-bottom: 1em;\n}\n\n\n.grid-square.ship-placed {\n  @include square;\n  background-color: rgba(128, 128, 128, 0.329);\n  border-radius: 2px;\n}\n\n.ship-circle {\n  @include circle();\n  background-color: grey;\n}\n\n.game-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  .player-section {\n    @include mainSection();\n  }\n\n  .opponent-section {\n    @include mainSection();\n  }\n  \n  .player-section-heading-container {\n    @include headingContainer();\n    background-color: #457B9D;\n  }\n\n  .opponent-section-heading-container {\n    @include headingContainer();\n    background-color: #E63946;\n  }\n\n  .ship-counts {\n    display: flex;\n    justify-content: space-around;\n  }\n\n  .ship-count-container {\n    display: flex;\n    margin-right: 1em;\n    margin-left: 1em;\n    flex-direction: column;\n  }\n\n  .ship-name {\n    margin-right: 0.3em;\n  }\n\n  .ship-count-section-1 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .ship-count-section-2 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .game-status {\n    margin-bottom: 2em;\n    border: 4px solid black;\n    background-color: #457b9d;\n    padding: 0.5em;\n    width: 100%;\n    text-align: center;\n    font-size: 1.1em;\n    color: white;\n  }\n\n  .game-status-message {\n    opacity: 0;\n    display: none;\n  }\n\n  .game-status-message.shown {\n    display: block;\n    opacity: 1;\n    animation-name: reveal;\n    animation-duration: 1s;\n  }\n\n  @keyframes reveal {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n\n  .play-again-btn-container {\n    display: none;\n  }\n\n  .play-again-btn {\n    @include btn();\n    margin-bottom: 1em;\n    font-size: 1.1em;\n    border-style: solid;\n    padding: 0.8em;\n  }\n\n  @media (min-width: 650px) {\n\n    flex-direction: row;\n    justify-content: space-around;\n    margin-top: 6em;\n\n    .game-status {\n      position: absolute;\n      top: 10.3em;\n    }\n\n    .player-section {\n      min-width: 45%;\n    }\n\n    .opponent-section {\n      min-width: 45%;\n    }\n  }\n\n  @media (min-width: 1000px) {\n    .player-section {\n      min-width: 30%;\n    }\n\n    .opponent-section {\n      min-width: 30%;\n    }\n  }\n\n  @media (min-width: 1400px) {\n    .ship-circle {\n      margin-top: 0.5em;\n    }\n  }\n\n  @media (min-width: 1600px) {\n    .player-section {\n      min-width: 25%;\n    }\n\n    .opponent-section {\n      min-width: 25%;\n    }\n\n    .game-status {\n      font-size: 1.3em;\n      top: 8.3em;\n    }\n\n    .play-again-btn {\n      font-size: 1.5em;\n    }\n  }\n}\n\n.grid-wrapper {\n\n  .ships-grid {\n    display: grid;\n    grid-template-rows: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n    margin-top: 2em;\n    margin-bottom: 4em;\n    \n  }\n\n  .grid-square {\n    @include square();\n  }\n\n  .grid-square:hover {\n    background-color: #D6ECE5;\n  }\n\n  .missed-circle {\n    @include circle();\n    background-color: #1D3557;\n  }\n\n  .hit-circle {\n    @include circle();\n    background-color: #E63946;\n  }\n\n  @media (min-width: 1400px) {\n    .missed-circle {\n      margin-top: 0.5em;\n    }\n\n    .hit-circle {\n      margin-top: 0.5em;\n    }\n  }\n}\n\n.ship-placement-modal{\n  display: block;\n  position: fixed;\n  z-index: 1;\n  padding: 2rem 0;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgb(0, 0, 0);\n  background-color: rgb(0, 0, 0, 0.4);\n\n  .ship-placement-container {\n    background-color: #F1FAEE;\n    margin-top: 2em;\n    max-width: 80%;\n    margin: auto;\n    padding: 1em;\n    border-radius: 8px;\n    -webkit-box-shadow: -10px 0px 13px -7px #ffffff8a, 10px 0px 13px -7px #ffffff8a, 2px 4px 13px 6px rgba(151,151,151,0); \n    box-shadow: 0px 13px -7px #ffffff5e, 10px 0px 13px -7px #ffffff77, 2px 4px 13px 6px rgba(151, 151, 151, 0);\n  }\n\n  .info-wrapper {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 1em;\n    margin-top: 0.8em;\n  }\n\n  .rotate-info {\n    text-align: center;\n  }\n\n  .ship-placement-heading {\n    text-align: center;\n  }\n\n  .placement-grid-wrapper {\n    max-width: 60%;\n    margin: auto;\n    padding-bottom: 0.1em;\n  }\n\n  .display-container {\n    max-width: 100%;\n    text-align: center;\n  }\n\n  .placed-ship-display {\n    @include square;\n    background-color: rgba(128, 128, 128, 0.329);\n    border-radius: 2px;\n    width: 0%;\n    min-width: 6%;\n    padding-bottom: 6%;\n  }\n\n  .ship-circle {\n    margin-top: 0.3em;\n  }\n\n  .ship-display {\n    display: flex;\n    padding-bottom: 1em;\n    justify-content: center;\n  }\n\n  .placement-grid {\n    margin-bottom: 2em;\n  }\n\n  .placement-btns-container {\n    display: flex;\n    justify-content: space-evenly;\n  }\n\n  .placement-btn {\n    @include btn();\n  }\n\n  .random-btn {\n    margin: 0 0.4em;\n  }\n\n  .grid-square.placement-square.ship-placed {\n    @include square;\n    background-color: rgba(128, 128, 128, 0.329);\n    border-radius: 2px;\n  }\n\n  @media (min-width: 800px) {\n    .placement-section {\n      display: flex;\n      align-items: center;\n    }\n\n    .placement-grid-wrapper {\n      min-width: 47%;\n    }\n\n    .ships-display-container {\n      min-width: 45%;\n    }\n\n    .placed-ship-display {\n      min-width: 10%;\n      padding-bottom: 10%;\n    }\n  }\n\n  @media (min-width: 1000px) {\n    .ship-circle {\n      margin-top: 0.5em;\n    }\n  }\n\n  @media (min-width: 1400px) {\n    .ship-placement-container {\n      max-width: 65%;\n      margin-top: 7em;\n    }\n  }\n\n  @media (min-width: 1600px) {\n    .ship-placement-container {\n      max-width: 55%;\n    }\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxZQUFZLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxNQUFNLFlBQVksV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxNQUFNLEtBQUssV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sWUFBWSxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxZQUFZLE1BQU0sTUFBTSxZQUFZLFVBQVUsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFlBQVksTUFBTSxNQUFNLEtBQUssV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsWUFBWSxXQUFX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RUFBMEIsWUFBWSwrREFBZTtBQUNySDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnVEO0FBQ0o7QUFDc0I7QUFDbEI7QUFDeEM7QUFDZixTQUFTLGlFQUFpQixTQUFTLCtEQUFlLFNBQVMsMEVBQTBCLFNBQVMsaUVBQWlCO0FBQy9HOzs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDdEM7QUFDZjtBQUNBLG9DQUFvQyxnRUFBZ0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGLGdFQUFnQjtBQUN0Rzs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUEwRyxVQUFVLENBQUMsWUFBTTtBQUNmekcsRUFBQUEsdURBQVM7QUFDVixDQUZTLEVBRVAsR0FGTyxDQUFWLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2VsZW1lbnRDcmVhdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVDb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3VzZXJJbnRlcmZhY2UvZ2FtZUV2ZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3VzZXJJbnRlcmZhY2UvcGxhY2VtZW50RXZlbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdXNlckludGVyZmFjZS9yZW5kZXJVSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuc2Nzcz83NWJhIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEVsZW1lbnRDcmVhdGlvbiA9ICgoKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcyA9ICh0YWcsIGNsYXNzTmFtZSwgcGFyZW50RWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUNoaWxkRWxlbWVudFdpdGhJZCA9ICh0YWcsIGlkLCBwYXJlbnRFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBlbGVtZW50LmlkID0gaWQ7XG4gICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzc0FuZElkID0gKHRhZywgY2xhc3NOYW1lLCBpZCwgcGFyZW50RWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgZWxlbWVudC5pZCA9IGlkO1xuICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcyxcbiAgICBjcmVhdGVDaGlsZEVsZW1lbnRXaXRoSWQsXG4gICAgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzQW5kSWQsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBFbGVtZW50Q3JlYXRpb247XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IEdhbWVCb2FyZCA9ICgpID0+IHtcbiAgbGV0IHBsYWNlZFNoaXBzID0gW107XG4gIGxldCBtaXNzZWRBdHRhY2tzID0gW107XG4gIGxldCBoaXRBdHRhY2tzID0gW107XG4gIGNvbnN0IGJvYXJkV2lkdGggPSAxMDtcbiAgY29uc3QgYm9hcmRIZWlnaHQgPSAxMDtcblxuICAvKiBcbiAgICBDaGVja3MgaWYgdGhlIGNvb3JkaW5hdGVzIG9mIGEgc2hpcCBhYm91dCB0byBiZSBwbGFjZWQgaXMgbmV4dCB0byBvciBvbiB0aGUgY29vcmRpbmF0ZXNcbiAgICBvZiBhIHNoaXAgdGhhdCBpcyBhbHJlYWR5IG9uIHRoZSBib2FyZC5cbiAgKi9cbiAgY29uc3QgaXNBZGphY2VudCA9IChjb29yZGluYXRlcywgc2hpcHMpID0+IHtcbiAgICBsZXQgYWxsU2hpcENvb3JkaW5hdGVzID0gc2hpcHMubWFwKChzaGlwKSA9PiBzaGlwLmdldFNoaXBDb29yZGluYXRlcygpKTtcbiAgICBhbGxTaGlwQ29vcmRpbmF0ZXMgPSBbXS5jb25jYXQoLi4uYWxsU2hpcENvb3JkaW5hdGVzKTtcbiAgICBjb25zdCBjaGVja1ggPSAoc2hpcFhDb29yZGluYXRlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHNoaXBYQ29vcmRpbmF0ZSA9PT0gY29vcmRpbmF0ZXNbMF0gfHwgXG4gICAgICAgIHNoaXBYQ29vcmRpbmF0ZSA9PT0gY29vcmRpbmF0ZXNbMF0gLSAxIHx8IFxuICAgICAgICBzaGlwWENvb3JkaW5hdGUgPT09IGNvb3JkaW5hdGVzWzBdICsgMVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjaGVja1kgPSAoc2hpcFlDb29yZGluYXRlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHNoaXBZQ29vcmRpbmF0ZSA9PT0gY29vcmRpbmF0ZXNbMV0gfHwgXG4gICAgICAgIHNoaXBZQ29vcmRpbmF0ZSA9PT0gY29vcmRpbmF0ZXNbMV0gLSAxIHx8IFxuICAgICAgICBzaGlwWUNvb3JkaW5hdGUgPT09IGNvb3JkaW5hdGVzWzFdICsgMVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vbkFkamFjZW50Q29vcmRpbmF0ZXMgPSBhbGxTaGlwQ29vcmRpbmF0ZXMuZmlsdGVyKChzaGlwQ29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGlmICghY2hlY2tYKHNoaXBDb29yZGluYXRlc1swXSkgfHwgIWNoZWNrWShzaGlwQ29vcmRpbmF0ZXNbMV0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgaWYgKG5vbkFkamFjZW50Q29vcmRpbmF0ZXMubGVuZ3RoID09PSBhbGxTaGlwQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCByb3RhdGlvbkNob2ljZSA9ICgpID0+IHtcbiAgICBjb25zdCBjaG9pY2VzID0gW3RydWUsIGZhbHNlXTtcbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgIHJldHVybiBjaG9pY2VzW3JhbmRvbUluZGV4XTtcbiAgfVxuXG4gIC8qIFxuICAgIFBsYWNlcyBhIHNoaXAgb24gdGhlIGJvYXJkIGFmdGVyIGNoZWNraW5nIHRoYXQgdGhlIHNoaXAncyBjb29yZGluYXRlcyBhcmUgd2l0aGluIHRoZSBib2FyZCBcbiAgICBhbmQgdGhhdCBhbm90aGVyIHNoaXAgaXMgbm90IGFscmVhZHkgYXQgdGhlIGNvb3JkaW5hdGVzIHRoZSBuZXcgc2hpcCB3YW50cyB0byBvY2N1cHkgXG4gICovXG4gIGNvbnN0IGlzUG9zaXRpb25BdmFpbGlhYmxlID0gKGxlbmd0aCwgc3RhcnRDb29yZGluYXRlcywgcm90YXRpb24sIHNoaXBzKSA9PiB7XG4gICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHJvdGF0aW9uKSB7XG4gICAgICAgIC8qIElmIHNoaXAgaXMgaG9yaXpvbnRhbCAqL1xuICAgICAgICBpZiAoc3RhcnRDb29yZGluYXRlc1swXSArIGkgPj0gYm9hcmRXaWR0aCB8fCBzdGFydENvb3JkaW5hdGVzWzFdID49IGJvYXJkSGVpZ2h0KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkaW5hdGVzWzBdICsgaSwgc3RhcnRDb29yZGluYXRlc1sxXV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogSWYgc2hpcCBpcyB2ZXJ0aWNhbCAqL1xuICAgICAgICBpZiAoc3RhcnRDb29yZGluYXRlc1swXSA+PSBib2FyZFdpZHRoIHx8IHN0YXJ0Q29vcmRpbmF0ZXNbMV0gKyBpID49IGJvYXJkSGVpZ2h0KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkaW5hdGVzWzBdLCBzdGFydENvb3JkaW5hdGVzWzFdICsgaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBhdmFpbGlhYmxlQ29vcmRpbmF0ZXMgPSBzaGlwQ29vcmRpbmF0ZXMuZmlsdGVyKChjb29yZGluYXRlcykgPT4ge1xuICAgICAgaWYgKGlzQWRqYWNlbnQoY29vcmRpbmF0ZXMsIHNoaXBzKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGlmIChhdmFpbGlhYmxlQ29vcmRpbmF0ZXMubGVuZ3RoICE9PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcztcbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChsZW5ndGgsIHN0YXJ0Q29vcmRpbmF0ZXMsIHJvdGF0aW9uKSA9PiB7XG4gICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gaXNQb3NpdGlvbkF2YWlsaWFibGUobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCByb3RhdGlvbiwgcGxhY2VkU2hpcHMpO1xuICAgIGlmIChzaGlwQ29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgsIHN0YXJ0Q29vcmRpbmF0ZXMsIHNoaXBDb29yZGluYXRlcyk7XG4gICAgICBwbGFjZWRTaGlwcy5wdXNoKHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGF0dGFja0Nvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgYXR0YWNrZWRTaGlwID0gcGxhY2VkU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLmhhc0Nvb3JkaW5hdGVzKGF0dGFja0Nvb3JkaW5hdGVzKSk7XG4gICAgaWYgKGF0dGFja2VkU2hpcC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGhpdEF0dGFja3MucHVzaChhdHRhY2tDb29yZGluYXRlcyk7XG4gICAgICBhdHRhY2tlZFNoaXBbMF0uaGl0KGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gXG4gICAgbWlzc2VkQXR0YWNrcy5wdXNoKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBpc0dhbWVPdmVyID0gKCkgPT4gcGxhY2VkU2hpcHMuZXZlcnkoKHBsYWNlZFNoaXApID0+IHBsYWNlZFNoaXAuaXNTdW5rKCkpO1xuXG4gIGNvbnN0IGlzUG9zaXRpb25GcmVlVG9BdHRhY2sgPSAoYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBwb3NpdGlvbkNoZWNrID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgICBpZiAoY29vcmRpbmF0ZXNbMF0gIT09IGF0dGFja0Nvb3JkaW5hdGVzWzBdIHx8IGNvb3JkaW5hdGVzWzFdICE9PSBhdHRhY2tDb29yZGluYXRlc1sxXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZnJlZVBvc2l0aW9uID0gbWlzc2VkQXR0YWNrcy5ldmVyeShwb3NpdGlvbkNoZWNrKSAmJiBoaXRBdHRhY2tzLmV2ZXJ5KHBvc2l0aW9uQ2hlY2spO1xuICAgIHJldHVybiBmcmVlUG9zaXRpb247XG4gIH0gXG5cbiAgY29uc3QgZ2V0QWxsQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsQ29vcmRpbmF0ZXMgPSBwbGFjZWRTaGlwcy5tYXAoKHNoaXApID0+ICBzaGlwLmdldFNoaXBDb29yZGluYXRlcygpKTtcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLmFsbENvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XG4gICAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3Qgc2hpcEluZGV4ID0gcGxhY2VkU2hpcHMuaW5kZXhPZihzaGlwKTtcbiAgICAgIHBsYWNlZFNoaXBzW3NoaXBJbmRleF0gPSBudWxsO1xuICAgIH0pO1xuICAgIHBsYWNlZFNoaXBzID0gW107XG4gICAgbWlzc2VkQXR0YWNrcyA9IFtdO1xuICAgIGhpdEF0dGFja3MgPSBbXTtcbiAgfVxuXG4gIGNvbnN0IHBvcHVsYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgY2xlYXJCb2FyZCgpO1xuICAgIGxldCBzaGlwc1BsYWNlZCA9IDA7XG4gICAgbGV0IGxlbmd0aCA9IDU7XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChzaGlwc1BsYWNlZCA8IDEwKSB7XG4gICAgICBjb25zdCByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IHJvdGF0aW9uID0gcm90YXRpb25DaG9pY2UoKTtcbiAgICAgIGNvbnN0IHBsYWNlZFNoaXAgPSBwbGFjZVNoaXAobGVuZ3RoLCBbcmFuZG9tWCwgcmFuZG9tWV0sIHJvdGF0aW9uKTtcbiAgICAgIGlmIChwbGFjZWRTaGlwKSB7XG4gICAgICAgIHNoaXBzUGxhY2VkICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoc2hpcHNQbGFjZWQpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGxlbmd0aCA9IDQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBsZW5ndGggPSAzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgbGVuZ3RoID0gMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaSArPSAxO1xuICAgICAgLypcbiAgICAgICAgVGhlcmUgYXJlIHNvbWUgY2FzZXMgd2hlcmUgaXQgaXMgaW1wb3NzaWJsZSB0byBwbGFjZSBhbm90aGVyIHNoaXAgZHVlIHRvIHRoZSBib2FyZCBsYXlvdXQgcmVzdWx0aW5nXG4gICAgICAgIGluIGEgaW5maW5pdGUgbG9vcC4gaSBpcyBoZXJlIHRvIGRldGVjdCBhbiBpbmZpbml0ZSBsb29wIGFuZCByZXNldCB0aGUgYm9hcmQgYW5kIHRyeSBhZ2FpbiB3aGVuIG9uZVxuICAgICAgICBoYXBwZW5zLlxuICAgICAgKi9cbiAgICAgIGlmICggaSA9PT0gMTAwMCkge1xuICAgICAgICBjbGVhckJvYXJkKCk7XG4gICAgICAgIHNoaXBzUGxhY2VkID0gMDtcbiAgICAgICAgbGVuZ3RoID0gNTtcbiAgICAgICAgaSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0TGFzdENyZWF0ZWRTaGlwID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RTaGlwID0gcGxhY2VkU2hpcHNbcGxhY2VkU2hpcHMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGxhc3RTaGlwO1xuICB9XG5cbiAgY29uc3Qgc3Vua1NoaXBDaGVjayA9ICgpID0+IHtcbiAgICBjb25zdCBzdW5rU2hpcCA9IHBsYWNlZFNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG4gICAgaWYgKHN1bmtTaGlwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gc3Vua1NoaXA7XG4gIH1cblxuICBjb25zdCByZW1vdmVTdW5rU2hpcCA9ICgpID0+IHtcbiAgICBjb25zdCBzdW5rU2hpcCA9IHN1bmtTaGlwQ2hlY2soKTtcbiAgICBpZiAoIXN1bmtTaGlwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHN1bmtTaGlwSW5kZXggPSBwbGFjZWRTaGlwcy5pbmRleE9mKHN1bmtTaGlwWzBdKTtcbiAgICBjb25zdCByZW1vdmVkU2hpcCA9IHBsYWNlZFNoaXBzLnNwbGljZShzdW5rU2hpcEluZGV4LCAxKTtcbiAgICBzdW5rU2hpcFswXSA9IG51bGw7XG4gICAgcmV0dXJuIHJlbW92ZWRTaGlwWzBdO1xuICB9XG5cbiAgY29uc3QgY29weVBsYWNlZFNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvcHkgPSBbXTtcbiAgICBwbGFjZWRTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb3B5LnB1c2goc2hpcCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvcHk7XG4gIH1cblxuICBjb25zdCBpc0JvYXJkQ29tcGxldGUgPSAoKSA9PiBwbGFjZWRTaGlwcy5sZW5ndGggPT09IDEwO1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgaXNHYW1lT3ZlcixcbiAgICBpc1Bvc2l0aW9uRnJlZVRvQXR0YWNrLFxuICAgIGdldEFsbENvb3JkaW5hdGVzLFxuICAgIGNsZWFyQm9hcmQsXG4gICAgcG9wdWxhdGVCb2FyZCxcbiAgICBzdW5rU2hpcENoZWNrLFxuICAgIHJlbW92ZVN1bmtTaGlwLFxuICAgIGdldExhc3RDcmVhdGVkU2hpcCxcbiAgICBpc1Bvc2l0aW9uQXZhaWxpYWJsZSxcbiAgICBjb3B5UGxhY2VkU2hpcHMsXG4gICAgaXNCb2FyZENvbXBsZXRlLFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZDsiLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gJy4vZ2FtZUJvYXJkJztcbmltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXJQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgR2FtZUV2ZW50cyBmcm9tICcuL3VzZXJJbnRlcmZhY2UvZ2FtZUV2ZW50cyc7XG5pbXBvcnQgUGxhY2VtZW50RXZlbnRzIGZyb20gJy4vdXNlckludGVyZmFjZS9wbGFjZW1lbnRFdmVudHMnO1xuaW1wb3J0IHJlbmRlckdyaWRzICBmcm9tICcuL3VzZXJJbnRlcmZhY2UvcmVuZGVyVUknO1xuXG5jb25zdCBnYW1lU3RhcnQgPSAoKSA9PiB7XG4gIGNvbnN0IGh1bWFuUGxheWVyID0gUGxheWVyKCk7XG4gIGNvbnN0IGh1bWFuQm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBDb21wdXRlclBsYXllcigpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgcmVuZGVyR3JpZHMoaHVtYW5Cb2FyZC5nZXRBbGxDb29yZGluYXRlcygpKTtcbiAgR2FtZUV2ZW50cy5wYWdlTGlzdGVuZXJzKGh1bWFuUGxheWVyLCBodW1hbkJvYXJkLCBjb21wdXRlclBsYXllciwgY29tcHV0ZXJCb2FyZCk7XG4gIFBsYWNlbWVudEV2ZW50cy5wbGFjZW1lbnRMaXN0ZW5lcnMoaHVtYW5Cb2FyZCwgaHVtYW5QbGF5ZXIsIGNvbXB1dGVyQm9hcmQpO1xuXG4gIHJldHVybiB7XG4gICAgaHVtYW5QbGF5ZXIsXG4gICAgaHVtYW5Cb2FyZCxcbiAgICBjb21wdXRlclBsYXllcixcbiAgICBjb21wdXRlckJvYXJkLFxuICB9XG59XG5cbmV4cG9ydCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XG4gIGdhbWVTdGFydCxcbn0iLCJjb25zdCBQbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGF0dGFja0VuZW15Qm9hcmQgPSAoZW5lbXlHYW1lQm9hcmQsIGF0dGFja0Nvb3JkaW5hdGVzKSA9PiB7XG4gICAgLyogUmV0dXJucyB0cnVlIGlmIGEgc2hpcCB3YXMgaGl0ICovXG4gICAgY29uc3Qgc2hpcEF0dGFja2VkID0gZW5lbXlHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIHNoaXBBdHRhY2tlZDtcbiAgfVxuXG4gIGNvbnN0IGdldFBsYXllclNoaXAgPSAoY29vcmRpbmF0ZXMsIHBsYXllckdhbWVCb2FyZCkgPT4ge1xuICAgIGNvbnN0IGFsbFBsYWNlZFNoaXBzID0gcGxheWVyR2FtZUJvYXJkLmNvcHlQbGFjZWRTaGlwcygpO1xuICAgIGNvbnN0IHRhcmdldFNoaXAgPSBhbGxQbGFjZWRTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAuaGFzQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpKVswXTtcbiAgICByZXR1cm4gdGFyZ2V0U2hpcDtcbiAgfVxuXG4gIGNvbnN0IHJvdGF0ZUJvYXJkU2hpcCA9IChwbGF5ZXJHYW1lQm9hcmQsIHRhcmdldFNoaXApID0+IHtcbiAgICB0YXJnZXRTaGlwLnJvdGF0ZVNoaXBJZlBvc3NpYmxlKHBsYXllckdhbWVCb2FyZCk7XG4gICAgcmV0dXJuIHRhcmdldFNoaXA7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGF0dGFja0VuZW15Qm9hcmQsXG4gICAgcm90YXRlQm9hcmRTaGlwLFxuICAgIGdldFBsYXllclNoaXAsXG4gIH1cbn1cblxuY29uc3QgQ29tcHV0ZXJQbGF5ZXIgPSAoKSA9PiB7XG5cbiAgLyogVXNlZCB0byBzdG9yZSBhbGwgdGhlIGF0dGFja3MgbWFkZSBieSB0aGUgY29tcHV0ZXIgKi9cbiAgY29uc3Qgc3VjY2Vzc2Z1bEF0dGFja3MgPSBbXTtcbiAgY29uc3QgYWRqYWNlbnRBdHRhY2tGdW5jdGlvbnMgPSBbXG4gICAgKGNvb3JkaW5hdGVzKSA9PiBbY29vcmRpbmF0ZXNbMF0gLSAxLCBjb29yZGluYXRlc1sxXV0sIC8qIExlZnQgKi9cbiAgICAoY29vcmRpbmF0ZXMpID0+IFtjb29yZGluYXRlc1swXSArIDEsIGNvb3JkaW5hdGVzWzFdXSwgLyogUmlnaHQgKi9cbiAgICAoY29vcmRpbmF0ZXMpID0+IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0gLSAxXSwgLyogVXAgKi9cbiAgICAoY29vcmRpbmF0ZXMpID0+IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0gKyAxXSwgLyogRG93biAqL1xuICBdO1xuICBsZXQgaW5kZXggPSAwO1xuXG4gIGNvbnN0IHJlc2V0QXR0YWNrUGF0dGVybiA9ICgpID0+IHtcbiAgICBzdWNjZXNzZnVsQXR0YWNrcy5zcGxpY2UoMCk7XG4gICAgaW5kZXggPSAwO1xuICB9XG5cbiAgY29uc3QgYXR0YWNrRW5lbXlCb2FyZCA9IChlbmVteUdhbWVCb2FyZCwgYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBzaGlwQXR0YWNrZWQgPSBlbmVteUdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICBpZiAoc2hpcEF0dGFja2VkKSB7XG4gICAgICBzdWNjZXNzZnVsQXR0YWNrcy5wdXNoKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICB9IGVsc2UgaWYgKCFzaGlwQXR0YWNrZWQpIHtcbiAgICAgIGlmIChzdWNjZXNzZnVsQXR0YWNrcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2tzLnNwbGljZSgxKTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH0gXG4gICAgfVxuXG4gICAgaWYgKGVuZW15R2FtZUJvYXJkLnN1bmtTaGlwQ2hlY2soKSkge1xuICAgICAgcmVzZXRBdHRhY2tQYXR0ZXJuKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoaXBBdHRhY2tlZDtcbiAgfVxuXG4gIGNvbnN0IHBpY2tSYW5kb21Db29yZGluYXRlcyA9IChlbmVteUdhbWVCb2FyZCkgPT4ge1xuICAgIGxldCByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBjb29yZGluYXRlcyA9IFtyYW5kb21YLCByYW5kb21ZXTtcbiAgICB3aGlsZSAoIWVuZW15R2FtZUJvYXJkLmlzUG9zaXRpb25GcmVlVG9BdHRhY2soY29vcmRpbmF0ZXMpKSB7XG4gICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvb3JkaW5hdGVzID0gW3JhbmRvbVgsIHJhbmRvbVldO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICBjb25zdCBwaWNrQWRqYWNlbnRDb29yZGluYXRlcyA9IChlbmVteUdhbWVCb2FyZCkgPT4ge1xuICAgIGxldCBsYXN0Q29vcmRpbmF0ZXMgPSBzdWNjZXNzZnVsQXR0YWNrc1tzdWNjZXNzZnVsQXR0YWNrcy5sZW5ndGggLSAxXTtcbiAgICBsZXQgW3gsIHldID0gYWRqYWNlbnRBdHRhY2tGdW5jdGlvbnNbaW5kZXhdKGxhc3RDb29yZGluYXRlcyk7XG5cbiAgICBpZiAoIFxuICAgICAgIWVuZW15R2FtZUJvYXJkLmlzUG9zaXRpb25GcmVlVG9BdHRhY2soW3gsIHldKSBcbiAgICAgIHx8IHggPiA5IHx8IHkgPiA5ICBcbiAgICAgIHx8IHggPCAwIHx8IHkgPCAwXG4gICAgICApIHtcbiAgICAgIHN1Y2Nlc3NmdWxBdHRhY2tzLnNwbGljZSgxKTtcbiAgICAgIGxhc3RDb29yZGluYXRlcyA9IHN1Y2Nlc3NmdWxBdHRhY2tzW3N1Y2Nlc3NmdWxBdHRhY2tzLmxlbmd0aCAtIDFdO1xuICAgIH1cbiBcbiAgICB3aGlsZSAoIFxuICAgICAgIWVuZW15R2FtZUJvYXJkLmlzUG9zaXRpb25GcmVlVG9BdHRhY2soW3gsIHldKSBcbiAgICAgIHx8IHggPiA5IHx8IHkgPiA5IFxuICAgICAgfHwgeCA8IDAgfHwgeSA8IDBcbiAgICAgICkge1xuICAgICAgaW5kZXggKz0gMTtcbiAgICAgIFt4LCB5XSA9IGFkamFjZW50QXR0YWNrRnVuY3Rpb25zW2luZGV4XShsYXN0Q29vcmRpbmF0ZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBbeCwgeV07XG4gIH1cblxuICBjb25zdCBwaWNrQ29vcmRpbmF0ZXMgPSAoZW5lbXlHYW1lQm9hcmQpID0+IHtcbiAgICBpZiAoc3VjY2Vzc2Z1bEF0dGFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gcGlja1JhbmRvbUNvb3JkaW5hdGVzKGVuZW15R2FtZUJvYXJkKTtcbiAgICB9XG4gICAgcmV0dXJuIHBpY2tBZGphY2VudENvb3JkaW5hdGVzKGVuZW15R2FtZUJvYXJkKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrRW5lbXlCb2FyZCxcbiAgICBwaWNrQ29vcmRpbmF0ZXMsXG4gICAgcmVzZXRBdHRhY2tQYXR0ZXJuLFxuICB9XG59XG5cbmV4cG9ydCB7XG4gIFBsYXllciwgXG4gIENvbXB1dGVyUGxheWVyLFxufSIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCBzaGlwQ29vcmRpbmF0ZXMpID0+IHtcbiAgLypcbiAgICBFYWNoIHNoaXAgY29vcmRpbmF0ZSBpcyBzdG9yZWQgYXMgYSBrZXkgaW4gdGhlIG9iamVjdCB3aXRoIHRoZSBcbiAgICB2YWx1ZSBiZWluZyBhIGJvb2xlYW4gc2hvd2luZyB3aGV0aGVyIHRoZSBwb3NpdGlvbiBoYXMgYmVlbiBoaXRcbiAgICBvciBub3RcbiAgKi9cbiAgY29uc3Qgc2hpcEhpdHMgPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHNoaXBIaXRzW3NoaXBDb29yZGluYXRlc1tpXV0gPSBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHNoaXBOYW1lcyA9IHtcbiAgICAyOiAnRGVzdHJveWVyJyxcbiAgICAzOiAnQ3J1aXNlcicsXG4gICAgNDogJ0JhdHRsZXNoaXAnLFxuICAgIDU6ICdDYXJyaWVyJyxcbiAgfVxuXG4gIGNvbnN0IGdldFNoaXBOYW1lID0gKCkgPT4gc2hpcE5hbWVzW2xlbmd0aF07XG5cbiAgY29uc3QgZ2V0U2hpcENvb3JkaW5hdGVzID0gKCkgPT4gc2hpcENvb3JkaW5hdGVzO1xuXG4gIGNvbnN0IGhhc0Nvb3JkaW5hdGVzID0gKGF0dGFja0Nvb3JkaW5hdGVzKSA9PiB7XG4gICAgbGV0IG1hdGNoRm91bmQgPSBmYWxzZTtcbiAgICBzaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGlmIChhdHRhY2tDb29yZGluYXRlc1swXSA9PT0gY29vcmRpbmF0ZXNbMF0gXG4gICAgICAgICYmIGF0dGFja0Nvb3JkaW5hdGVzWzFdID09PSBjb29yZGluYXRlc1sxXSkge1xuICAgICAgICAgIG1hdGNoRm91bmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbWF0Y2hGb3VuZDtcbiAgfVxuXG4gIGNvbnN0IGhpdCA9IChhdHRhY2tDb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzS2V5ID0gYXR0YWNrQ29vcmRpbmF0ZXMudG9TdHJpbmcoKTtcbiAgICBzaGlwSGl0c1tjb29yZGluYXRlc0tleV0gPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBIaXRCb29scyA9IE9iamVjdC52YWx1ZXMoc2hpcEhpdHMpO1xuICAgIHJldHVybiBzaGlwSGl0Qm9vbHMuZXZlcnkoKGJvb2wpID0+IGJvb2wpO1xuICB9XG5cbiAgLyogQ2hlY2tzIGlmIHkgY29vcmRpbmF0ZXMgb2YgdGhlIHNoaXAgYXJlIHRoZSBzYW1lICovXG4gIGNvbnN0IGlzU2hpcEhvcml6b250YWwgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRTaGlwQ29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCBbIGZpcnN0Q29vcmRpbmF0ZXMsIHNlY29uZENvb3JkaW5hdGVzIF0gPSBjb29yZGluYXRlcztcbiAgICBpZiAoZmlyc3RDb29yZGluYXRlc1sxXSA9PT0gc2Vjb25kQ29vcmRpbmF0ZXNbMV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICBjb25zdCByb3RhdGVTaGlwID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IGlzU2hpcEhvcml6b250YWwoKTtcbiAgICBzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoID0gMDtcbiAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkaW5hdGVzWzBdLCBzdGFydENvb3JkaW5hdGVzWzFdICsgaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSs9IDEpIHtcbiAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRpbmF0ZXNbMF0gKyBpLCBzdGFydENvb3JkaW5hdGVzWzFdXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogXG4gICAgVGhpcyBmdW5jdGlvbiByb3RhdGVzIGEgc2hpcCBvbiB0aGUgZ2FtZWJvYXJkIGFuZCBjaGVja3MgaWYgdGhlIG5ldyBjb29yZGluYXRlcyBhcmUgcG9zc2libGUgb24gdGhlIGdhbWVib2FyZC5cbiAgICBJZiB0aGUgcG9zaXRpb24gaXMgcG9zc2libGUgdGhlIHJvdGF0aW9uIGlzIGtlcHQsIGlmIGl0IGlzIG5vdCB0aGVuIHRoZSBzaGlwIGlzIHJvdGF0ZWQgYmFjayB0byBpdHMgb3JpZ2luYWxcbiAgICBwb3NpdGlvbi5cbiAgKi9cbiAgY29uc3Qgcm90YXRlU2hpcElmUG9zc2libGUgPSAocGxheWVyR2FtZUJvYXJkKSA9PiB7XG4gICAgbGV0IHJvdGF0aW9uID0gaXNTaGlwSG9yaXpvbnRhbCgpO1xuICAgIHJvdGF0ZVNoaXAoKTtcbiAgICByb3RhdGlvbiA9ICFyb3RhdGlvbjtcbiAgICBjb25zdCBwbGFjZWRTaGlwc0NvcHkgPSBwbGF5ZXJHYW1lQm9hcmQuY29weVBsYWNlZFNoaXBzKCk7XG4gICAgLyogRmlsdGVycyBvdXQgdGhlIHNoaXAgdGhhdCBoYXMgYmVlbiByb3RhdGVkICovXG4gICAgY29uc3QgZmlsdGVyZWRTaGlwcyA9IHBsYWNlZFNoaXBzQ29weS5maWx0ZXIoKHBsYWNlZFNoaXApID0+IHBsYWNlZFNoaXAuZ2V0U2hpcENvb3JkaW5hdGVzKClbMF0gIT09IHNoaXBDb29yZGluYXRlc1swXSApO1xuICAgIGlmIChwbGF5ZXJHYW1lQm9hcmQuaXNQb3NpdGlvbkF2YWlsaWFibGUobGVuZ3RoLCBzdGFydENvb3JkaW5hdGVzLCByb3RhdGlvbiwgZmlsdGVyZWRTaGlwcykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gXG4gICAgcm90YXRlU2hpcCgpO1xuICAgIHJvdGF0aW9uID0gIXJvdGF0aW9uO1xuICAgIHJldHVybiBmYWxzZTsgXG4gIH1cblxuICBjb25zdCBnZXRTaGlwTGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuXG5cbiAgcmV0dXJuIHtcbiAgICBnZXRTaGlwTmFtZSxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGhhc0Nvb3JkaW5hdGVzLFxuICAgIGdldFNoaXBDb29yZGluYXRlcyxcbiAgICByb3RhdGVTaGlwSWZQb3NzaWJsZSxcbiAgICBnZXRTaGlwTGVuZ3RoLFxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBFbGVtZW50Q3JlYXRpb24gZnJvbSBcIi4uL2VsZW1lbnRDcmVhdGlvblwiO1xuXG5jb25zdCBHYW1lRXZlbnRzID0gKCgpID0+IHtcbiAgY29uc3QgcGFnZUNsaWNrRXZlbnRzID0gKGV2ZW50LCBwbGF5ZXIsIHBsYXllckdhbWVCb2FyZCwgZW5lbXksIGVuZW15R2FtZUJvYXJkKSA9PiB7XG5cbiAgICBjb25zdCBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSA9IChtZXNzYWdlVHlwZSwgc3Vua1NoaXBOYW1lLCBwbGF5ZXJUeXBlKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke21lc3NhZ2VUeXBlfS1tZXNzYWdlYCk7XG4gICAgICBjb25zdCBjdXJyZW50U2hvd25NZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtc3RhdHVzLW1lc3NhZ2Uuc2hvd24nKTtcblxuICAgICAgY3VycmVudFNob3duTWVzc2FnZS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93bicpO1xuXG4gICAgICBpZiAobWVzc2FnZVR5cGUgPT09ICdwbGF5ZXItc2luaycpIHtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgWW91IEhhdmUgU3VuayBUaGUgRW5lbXkncyAke3N1bmtTaGlwTmFtZX0hYDtcbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZVR5cGUgPT09ICdjb21wdXRlci1zaW5rJykge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IGBZb3VyICR7c3Vua1NoaXBOYW1lfSBIYXMgQmVlbiBTdW5rIWA7XG4gICAgICB9XG5cbiAgICAgIGlmIChwbGF5ZXJUeXBlID09PSAncGxheWVyJykge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNDU3QjlEJztcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyVHlwZSA9PT0gJ2NvbXB1dGVyJykge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjRTYzOTQ2JztcbiAgICAgIH1cblxuICAgICAgbWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvd24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJNb3ZlID0gKCkgPT4ge1xuICAgICAgY29uc3QgeENvb3JkaW5hdGUgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC54LCAxMCk7XG4gICAgICBjb25zdCB5Q29vcmRpbmF0ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnksIDEwKTtcbiAgICAgIGNvbnN0IHNoaXBBdHRhY2tlZCA9IHBsYXllci5hdHRhY2tFbmVteUJvYXJkKGVuZW15R2FtZUJvYXJkLCBbeENvb3JkaW5hdGUsIHlDb29yZGluYXRlXSk7XG4gICAgICBpZiAoc2hpcEF0dGFja2VkKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2hpdC1jaXJjbGUnLCBldmVudC50YXJnZXQpO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgncGxheWVyLWhpdCcsIG51bGwsICdwbGF5ZXInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICAgICAgRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ21pc3NlZC1jaXJjbGUnLCBldmVudC50YXJnZXQpO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgncGxheWVyLW1pc3MnLCBudWxsLCAncGxheWVyJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xuICAgICAgY29uc3QgY29tcHV0ZXJBdHRhY2tDb29yZGluYXRlcyA9IGVuZW15LnBpY2tDb29yZGluYXRlcyhwbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgY29uc3QgcGxheWVyU2hpcEF0dGFja2VkID0gZW5lbXkuYXR0YWNrRW5lbXlCb2FyZChwbGF5ZXJHYW1lQm9hcmQsIGNvbXB1dGVyQXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgY29tcHV0ZXJUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHtjb21wdXRlckF0dGFja0Nvb3JkaW5hdGVzWzBdfVwiXVtkYXRhLXk9XCIke2NvbXB1dGVyQXR0YWNrQ29vcmRpbmF0ZXNbMV19XCJdYCk7XG4gICAgICBpZiAocGxheWVyU2hpcEF0dGFja2VkKSB7XG4gICAgICAgIGNvbXB1dGVyVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBjb21wdXRlclRhcmdldC5jaGlsZE5vZGVzWzBdLmNsYXNzTmFtZSA9ICdoaXQtY2lyY2xlJztcbiAgICAgICAgY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UoJ2NvbXB1dGVyLWhpdCcsIG51bGwsICdjb21wdXRlcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcHV0ZXJUYXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzc2VkJyk7XG4gICAgICAgIEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdtaXNzZWQtY2lyY2xlJywgY29tcHV0ZXJUYXJnZXQpO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgnY29tcHV0ZXItbWlzcycsIG51bGwsICdjb21wdXRlcicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZUNsYXNzTmFtZSA9IChjbGFzc05hbWUpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NOYW1lfWApO1xuICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVtZW50U2hpcENvdW50ID0gKHNoaXBOYW1lLCBvd25lcikgPT4ge1xuICAgICAgY29uc3Qgc2hpcE5hbWVMb3dlciA9IHNoaXBOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7b3duZXJ9LXNlY3Rpb25gKTtcbiAgICAgIGNvbnN0IHNoaXBDb3VudEVsZW1lbnQgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoYC4ke3NoaXBOYW1lTG93ZXJ9LWNvdW50YCk7XG4gICAgICBzaGlwQ291bnRFbGVtZW50LmRhdGFzZXQuY291bnQgLT0gMTtcbiAgICAgIHNoaXBDb3VudEVsZW1lbnQudGV4dENvbnRlbnQgPSBzaGlwQ291bnRFbGVtZW50LmRhdGFzZXQuY291bnQ7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRTaGlwQ291bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBwbGF5ZXJTaGlwQ291bnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllci1zZWN0aW9uIC5zaGlwLWNvdW50Jyk7XG4gICAgICBjb25zdCBvcHBvbmVudFNoaXBDb3VudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtc2VjdGlvbiAuc2hpcC1jb3VudCcpO1xuICAgICAgXG4gICAgICBwbGF5ZXJTaGlwQ291bnRzLmZvckVhY2goKHBsYXllclNoaXBDb3VudCwgaW5kZXgpID0+IHtcbiAgICAgICAgcGxheWVyU2hpcENvdW50LmRhdGFzZXQuY291bnQgPSBpbmRleCArIDE7XG4gICAgICAgIHBsYXllclNoaXBDb3VudC50ZXh0Q29udGVudCA9IHBsYXllclNoaXBDb3VudC5kYXRhc2V0LmNvdW50O1xuXG4gICAgICAgIGNvbnN0IG9wcG9uZW50U2hpcENvdW50ID0gb3Bwb25lbnRTaGlwQ291bnRzW2luZGV4XTtcbiAgICAgICAgb3Bwb25lbnRTaGlwQ291bnQuZGF0YXNldC5jb3VudCA9IGluZGV4ICsgMTtcbiAgICAgICAgb3Bwb25lbnRTaGlwQ291bnQudGV4dENvbnRlbnQgPSBvcHBvbmVudFNoaXBDb3VudC5kYXRhc2V0LmNvdW50O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRHYW1lU3RhdHVzTWVzc2FnZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc2V0R2FtZVN0YXR1c01lc3NhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWUtc3RhdHVzLW1lc3NhZ2UnKTtcbiAgICAgIHJlc2V0R2FtZVN0YXR1c01lc3NhZ2VzLmZvckVhY2goKG1lc3NhZ2UpID0+IG1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd24nKSk7XG4gICAgICBjb25zdCB3YWl0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53YWl0LW1lc3NhZ2UnKVxuICAgICAgd2FpdE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnc2hvd24nKTtcbiAgICAgIHdhaXRNZXNzYWdlLnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM0NTdCOUQnO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc2V0R2FtZSA9ICgpID0+IHtcbiAgICAgIHBsYXllckdhbWVCb2FyZC5jbGVhckJvYXJkKCk7XG4gICAgICBlbmVteUdhbWVCb2FyZC5jbGVhckJvYXJkKCk7XG4gICAgICBlbmVteS5yZXNldEF0dGFja1BhdHRlcm4oKTtcbiAgICAgIHJlbW92ZUNsYXNzTmFtZSgnbWlzc2VkJyk7XG4gICAgICByZW1vdmVDbGFzc05hbWUoJ2hpdCcpO1xuICAgICAgcmVtb3ZlQ2xhc3NOYW1lKCdzaGlwLXBsYWNlZCcpO1xuICAgICAgcmVzZXRTaGlwQ291bnQoKTtcbiAgICAgIHJlc2V0R2FtZVN0YXR1c01lc3NhZ2UoKTtcbiAgICAgIGNvbnN0IHNoaXBQbGFjZW1lbnRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwLXBsYWNlbWVudC1tb2RhbCcpO1xuICAgICAgc2hpcFBsYWNlbWVudE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIGNvbnN0IHN1bmtTaGlwQ2hlY2sgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICBjb25zdCBzdW5rU2hpcCA9IGdhbWVCb2FyZC5yZW1vdmVTdW5rU2hpcCgpO1xuICAgICAgcmV0dXJuIHN1bmtTaGlwO1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNhYmxlUGxheWVyQWN0aW9ucyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG9wcG9uZW50R3JpZFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtc3F1YXJlJyk7XG4gICAgICBvcHBvbmVudEdyaWRTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4gc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJykpO1xuICAgIH1cbiBcbiAgICBjb25zdCBlbmFibGVQbGF5ZXJBY3Rpb25zID0gKCkgPT4ge1xuICAgICAgY29uc3Qgb3Bwb25lbnRHcmlkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC1zcXVhcmUnKTtcbiAgICAgIG9wcG9uZW50R3JpZFNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKSk7XG4gICAgfVxuXG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQtc3F1YXJlIG9wcG9uZW50LXNxdWFyZScpIHtcbiAgICAgIC8qIENvbnRyb2xzIHRoZSBmbG93IG9mIGEgZ2FtZSAqL1xuICAgICAgcGxheWVyTW92ZSgpO1xuICAgICAgY29uc3QgcGxheWVyV2luID0gZW5lbXlHYW1lQm9hcmQuaXNHYW1lT3ZlcigpO1xuICAgICAgY29uc3QgZW5lbXlTdW5rU2hpcENoZWNrID0gc3Vua1NoaXBDaGVjayhlbmVteUdhbWVCb2FyZCk7XG5cbiAgICAgIGlmIChlbmVteVN1bmtTaGlwQ2hlY2spIHtcbiAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gZW5lbXlTdW5rU2hpcENoZWNrLmdldFNoaXBDb29yZGluYXRlcygpO1xuICAgICAgICBjb25zdCBzaGlwTmFtZSA9IGVuZW15U3Vua1NoaXBDaGVjay5nZXRTaGlwTmFtZSgpO1xuICAgICAgICBzaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoW3gsIHldKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ3JpZFNxdWFyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAub3Bwb25lbnQtc3F1YXJlW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xuICAgICAgICAgIGdyaWRTcXVhcmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KSc7XG4gICAgICAgIH0pO1xuICAgICAgICBkZWNyZW1lbnRTaGlwQ291bnQoc2hpcE5hbWUsICdvcHBvbmVudCcpO1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgncGxheWVyLXNpbmsnLCBzaGlwTmFtZSwgJ3BsYXllcicpO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXllcldpbikge1xuICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgncGxheWVyLXdpbicsIG51bGwsICdwbGF5ZXInKTtcbiAgICAgICAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4tYnRuLWNvbnRhaW5lcicpO1xuICAgICAgICBwbGF5QWdhaW5CdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGRpc2FibGVQbGF5ZXJBY3Rpb25zKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc2FibGVQbGF5ZXJBY3Rpb25zKCk7IC8qIFN0b3BzIHBsYXllciBmcm9tIG1ha2luZyBhIG1vdmUgb24gdGhlIGNvbXB1dGVyJ3MgdHVybiAqL1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbXB1dGVyTW92ZSgpO1xuICAgICAgICBjb25zdCBjb21wdXRlcldpbiA9IHBsYXllckdhbWVCb2FyZC5pc0dhbWVPdmVyKCk7XG4gICAgICAgIGNvbnN0IHBsYXllclN1bmtTaGlwQ2hlY2sgPSBzdW5rU2hpcENoZWNrKHBsYXllckdhbWVCb2FyZCk7XG4gICAgICAgIGlmIChwbGF5ZXJTdW5rU2hpcENoZWNrKXtcbiAgICAgICAgICBjb25zdCBwbGF5ZXJTaGlwTmFtZSA9IHBsYXllclN1bmtTaGlwQ2hlY2suZ2V0U2hpcE5hbWUoKTtcbiAgICAgICAgICBkZWNyZW1lbnRTaGlwQ291bnQocGxheWVyU2hpcE5hbWUsICdwbGF5ZXInKTtcbiAgICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgnY29tcHV0ZXItc2luaycsIHBsYXllclNoaXBOYW1lLCAnY29tcHV0ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcHV0ZXJXaW4pIHtcbiAgICAgICAgICBjaGFuZ2VHYW1lU3RhdHVzTWVzc2FnZSgnY29tcHV0ZXItd2luJywgbnVsbCwgJ2NvbXB1dGVyJyk7XG4gICAgICAgICAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4tYnRuLWNvbnRhaW5lcicpO1xuICAgICAgICAgIHBsYXlBZ2FpbkJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgICAgIFxuICAgICAgICAgIGRpc2FibGVQbGF5ZXJBY3Rpb25zKCk7ICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmFibGVQbGF5ZXJBY3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAnZ2FtZS1yZXNldC1idG4nIHx8IGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdwbGF5LWFnYWluLWJ0bicpIHtcbiAgICAgIHJlc2V0R2FtZSgpO1xuICAgICAgZW5hYmxlUGxheWVyQWN0aW9ucygpO1xuICAgICAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4tYnRuLWNvbnRhaW5lcicpO1xuICAgICAgcGxheUFnYWluQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7ICBcbiAgICAgIGNvbnN0IGRlcGxveUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXBsb3ktYnRuJyk7XG4gICAgICBkZXBsb3lCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBhZ2VMaXN0ZW5lcnMgPSAocGxheWVyLCBwbGF5ZXJHYW1lQm9hcmQsIGVuZW15LCBlbmVteUdhbWVCb2FyZCkgPT4ge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBwYWdlQ2xpY2tFdmVudHMoZXZlbnQsIHBsYXllciwgcGxheWVyR2FtZUJvYXJkLCBlbmVteSwgZW5lbXlHYW1lQm9hcmQpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYWdlTGlzdGVuZXJzLFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lRXZlbnRzOyIsImltcG9ydCBFbGVtZW50Q3JlYXRpb24gZnJvbSBcIi4uL2VsZW1lbnRDcmVhdGlvblwiO1xuXG5jb25zdCBQbGFjZW1lbnRFdmVudHMgPSAoKCkgPT4ge1xuXG4gIGNvbnN0IGRlcGxveUNoZWNrID0gKHBsYXllckdhbWVCb2FyZCkgPT4ge1xuICAgIGNvbnN0IGRlcGxveUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXBsb3ktYnRuJyk7XG4gICAgaWYgKHBsYXllckdhbWVCb2FyZC5pc0JvYXJkQ29tcGxldGUoKSkge1xuICAgICAgZGVwbG95QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlcGxveUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICBcbiAgfVxuICBjb25zdCBkcmFnU3RhcnRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3RbMF0gPT09ICdzaGlwLWRpc3BsYXknKXtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gXCJjb3B5XCI7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIGV2ZW50LnRhcmdldC5jbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRyYWdFbnRlckhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQtc3F1YXJlIHBsYWNlbWVudC1zcXVhcmUnKSB7XG4gICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNENkVDRTUnO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRyYWdMZWF2ZUhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2dyaWQtc3F1YXJlIHBsYWNlbWVudC1zcXVhcmUnKSB7XG4gICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNBOERBREMnO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRyb3BIYW5kbGVyID0gKGV2ZW50LCBwbGF5ZXJHYW1lQm9hcmQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAnZ3JpZC1zcXVhcmUgcGxhY2VtZW50LXNxdWFyZScpIHtcbiAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJztcbiAgICAgIGNvbnN0IHNoaXBEaXNwbGF5Q2xhc3NOYW1lID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKS5zcGxpdCgnICcpO1xuICAgICAgY29uc3QgZGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3NoaXBEaXNwbGF5Q2xhc3NOYW1lWzBdfS4ke3NoaXBEaXNwbGF5Q2xhc3NOYW1lWzFdfWApLnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBkaXNwbGF5Q291bnQgPSBkaXNwbGF5Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5kaXNwbGF5LWNvdW50Jyk7XG4gICAgICBjb25zdCBzaGlwTGVuZ3RoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7c2hpcERpc3BsYXlDbGFzc05hbWVbMF19LiR7c2hpcERpc3BsYXlDbGFzc05hbWVbMV19IC5ncmlkLXNxdWFyZWApLmxlbmd0aDtcbiAgICAgIGNvbnN0IHhDb29yZGluYXRlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueCwgMTApO1xuICAgICAgY29uc3QgeUNvb3JkaW5hdGUgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC55LCAxMCk7XG4gICAgICAvKiBPbmx5IHBsYWNlcyB0aGUgc2hpcCBvbiB0aGUgYm9hcmQgaWYgdGhlcmUgYXJlIGVub3VnaCBsZWZ0IGFuZCBpZiB0aGUgc2hpcHMgY29vcmRpbmF0ZXMgYXJlIHZhbGlkICovXG4gICAgICBpZiAoIHBhcnNlSW50KGRpc3BsYXlDb3VudC5kYXRhc2V0LmRpc3BsYXlDb3VudCwgMTApID4gMCkge1xuICAgICAgICBjb25zdCBzaGlwUGxhY2VtZW50ID0gcGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3RoLCBbeENvb3JkaW5hdGUsIHlDb29yZGluYXRlXSwgdHJ1ZSk7XG4gICAgICAgIGlmIChzaGlwUGxhY2VtZW50KSB7XG4gICAgICAgICAgY29uc3QgY3JlYXRlZFNoaXAgPSBwbGF5ZXJHYW1lQm9hcmQuZ2V0TGFzdENyZWF0ZWRTaGlwKCk7XG4gICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gY3JlYXRlZFNoaXAuZ2V0U2hpcENvb3JkaW5hdGVzKCk7XG4gICAgICAgICAgc2hpcENvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJET01Db29yZGluYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGFjZW1lbnQtc3F1YXJlW2RhdGEteD1cIiR7Y29vcmRpbmF0ZXNbMF19XCJdW2RhdGEteT1cIiR7Y29vcmRpbmF0ZXNbMV19XCJdYCk7XG4gICAgICAgICAgICBwbGF5ZXJET01Db29yZGluYXRlcy5jbGFzc0xpc3QuYWRkKCdzaGlwLXBsYWNlZCcpO1xuICAgICAgICAgICAgcGxheWVyRE9NQ29vcmRpbmF0ZXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTI4LCAxMjgsIDEyOCwgMC4zMjkpJztcbiAgICAgICAgICAgIEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdzaGlwLWNpcmNsZScsIHBsYXllckRPTUNvb3JkaW5hdGVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkaXNwbGF5Q291bnQuZGF0YXNldC5kaXNwbGF5Q291bnQgPSBwYXJzZUludChkaXNwbGF5Q291bnQuZGF0YXNldC5kaXNwbGF5Q291bnQsIDEwKSAtIDE7XG4gICAgICAgICAgZGlzcGxheUNvdW50LmlubmVySFRNTCA9IGAmIzIxNTske2Rpc3BsYXlDb3VudC5kYXRhc2V0LmRpc3BsYXlDb3VudH1gOyBcbiAgICAgICAgICBkZXBsb3lDaGVjayhwbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xpY2tIYW5kbGVycyA9IChldmVudCwgcGxheWVyR2FtZUJvYXJkLCBwbGF5ZXIsIGVuZW15R2FtZUJvYXJkKSA9PiB7XG5cbiAgICBjb25zdCByZW1vdmVQbGFjZWRTaGlwRWxlbWVudHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKFt4LCB5XSkgPT4ge1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxhY2VtZW50LXNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcbiAgICAgICAgcGxhY2VtZW50U3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnO1xuICAgICAgICBwbGFjZW1lbnRTcXVhcmUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgcGxhY2VtZW50U3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcGxhY2VkJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRQbGFjZWRTaGlwRWxlbWVudHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKFt4LCB5XSkgPT4ge1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxhY2VtZW50LXNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcbiAgICAgICAgcGxhY2VtZW50U3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KSc7XG4gICAgICAgIEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdzaGlwLWNpcmNsZScsIHBsYWNlbWVudFNxdWFyZSk7XG4gICAgICAgIHBsYWNlbWVudFNxdWFyZS5jbGFzc0xpc3QuYWRkKCdzaGlwLXBsYWNlZCcpO1xuICAgICAgfSk7ICAgICBcbiAgICB9XG5cbiAgICBjb25zdCByZXNldEJvYXJkID0gKCkgPT4ge1xuICAgICAgY29uc3Qgc2hpcFBsYWNlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYWNlbWVudC1ncmlkIC5zaGlwLXBsYWNlZCcpO1xuICAgICAgc2hpcFBsYWNlZEVsZW1lbnRzLmZvckVhY2goKHNoaXBFbGVtZW50KSA9PiB7XG4gICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcGxhY2VkJyk7XG4gICAgICAgIHNoaXBFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnO1xuICAgICAgICBzaGlwRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmFuZG9tbHlQb3B1bGF0ZUJvYXJkID0gKCkgPT4ge1xuICAgICAgcmVzZXRCb2FyZCgpO1xuICAgICAgcGxheWVyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoKTtcbiAgICAgIGNvbnN0IHBsYXllckJvYXJkQ29vcmRpbmF0ZXMgPSBwbGF5ZXJHYW1lQm9hcmQuZ2V0QWxsQ29vcmRpbmF0ZXMoKTtcbiAgICAgIGFkZFBsYWNlZFNoaXBFbGVtZW50cyhwbGF5ZXJCb2FyZENvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZXREaXNwbGF5Q291bnRzID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGlzcGxheUNvdW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaXNwbGF5LWNvdW50Jyk7XG4gICAgICBsZXQgbnVtYmVyT2ZTaGlwcyA9IDE7XG4gICAgICBkaXNwbGF5Q291bnRzLmZvckVhY2goKGNvdW50KSA9PiB7XG4gICAgICAgIGNvdW50LmRhdGFzZXQuZGlzcGxheUNvdW50ID0gbnVtYmVyT2ZTaGlwcztcbiAgICAgICAgY291bnQuaW5uZXJIVE1MID0gYCYjMjE1OyR7Y291bnQuZGF0YXNldC5kaXNwbGF5Q291bnR9YDtcbiAgICAgICAgbnVtYmVyT2ZTaGlwcyArPSAxO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0RGlzcGxheUNvdW50c1RvWmVybyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRpc3BsYXlDb3VudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlzcGxheS1jb3VudCcpO1xuICAgICAgZGlzcGxheUNvdW50cy5mb3JFYWNoKChjb3VudCkgPT4gIHtcbiAgICAgICAgY291bnQuZGF0YXNldC5kaXNwbGF5Q291bnQgPSAwO1xuICAgICAgICBjb3VudC5pbm5lckhUTUwgPSBgJiMyMTU7JHtjb3VudC5kYXRhc2V0LmRpc3BsYXlDb3VudH1gO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBkZXBsb3lTaGlwcyA9ICgpID0+IHtcbiAgICAgIHJlc2V0Qm9hcmQoKTtcbiAgICAgIGNvbnN0IHBsYXllckNvb3JkaW5hdGVzID0gcGxheWVyR2FtZUJvYXJkLmdldEFsbENvb3JkaW5hdGVzKCk7XG4gICAgICBwbGF5ZXJDb29yZGluYXRlcy5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgICAgY29uc3QgcGxheWVyRE9NQ29vcmRpbmF0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyLXNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcbiAgICAgICAgcGxheWVyRE9NQ29vcmRpbmF0ZXMuY2xhc3NMaXN0LmFkZCgnc2hpcC1wbGFjZWQnKTtcbiAgICAgICAgcGxheWVyRE9NQ29vcmRpbmF0ZXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTI4LCAxMjgsIDEyOCwgMC4zMjkpJztcbiAgICAgICAgRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ3NoaXAtY2lyY2xlJywgcGxheWVyRE9NQ29vcmRpbmF0ZXMpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBzaGlwUGxhY2VtZW50TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcC1wbGFjZW1lbnQtbW9kYWwnKTtcbiAgICAgIHNoaXBQbGFjZW1lbnRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGxldCB0YXJnZXQ7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdzaGlwLWNpcmNsZScpIHtcbiAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkLXNxdWFyZSBwbGFjZW1lbnQtc3F1YXJlIHNoaXAtcGxhY2VkJykge1xuICAgICAgLyogUm90YXRlcyBhIHNoaXAgd2hlbiBpdCBpcyBjbGlja2VkICovXG4gICAgICBjb25zdCB4Q29vcmRpbmF0ZSA9IHBhcnNlSW50KHRhcmdldC5kYXRhc2V0LngsIDEwKTtcbiAgICAgIGNvbnN0IHlDb29yZGluYXRlID0gcGFyc2VJbnQodGFyZ2V0LmRhdGFzZXQueSwgMTApO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbeENvb3JkaW5hdGUsIHlDb29yZGluYXRlXTtcbiAgICAgIGNvbnN0IHBsYXllclNoaXAgPSBwbGF5ZXIuZ2V0UGxheWVyU2hpcChjb29yZGluYXRlcywgcGxheWVyR2FtZUJvYXJkKVxuICAgICAgY29uc3QgcGxheWVyU2hpcENvb3JkaW5hdGVzID0gcGxheWVyU2hpcC5nZXRTaGlwQ29vcmRpbmF0ZXMoKTtcbiAgICAgIHJlbW92ZVBsYWNlZFNoaXBFbGVtZW50cyhwbGF5ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3Qgcm90YXRlZFNoaXBDb29yZGluYXRlcyA9IHBsYXllci5yb3RhdGVCb2FyZFNoaXAocGxheWVyR2FtZUJvYXJkLCBwbGF5ZXJTaGlwKS5nZXRTaGlwQ29vcmRpbmF0ZXMoKTtcbiAgICAgIGFkZFBsYWNlZFNoaXBFbGVtZW50cyhyb3RhdGVkU2hpcENvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3BsYWNlbWVudC1idG4gcmFuZG9tLWJ0bicpIHtcbiAgICAgIHJhbmRvbWx5UG9wdWxhdGVCb2FyZCgpO1xuICAgICAgc2V0RGlzcGxheUNvdW50c1RvWmVybygpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAncGxhY2VtZW50LWJ0biByZXNldC1idG4nKSB7XG4gICAgICBwbGF5ZXJHYW1lQm9hcmQuY2xlYXJCb2FyZCgpO1xuICAgICAgcmVzZXRCb2FyZCgpO1xuICAgICAgc2V0RGlzcGxheUNvdW50cygpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAncGxhY2VtZW50LWJ0biBkZXBsb3ktYnRuJykge1xuICAgICAgZGVwbG95U2hpcHMoKTtcbiAgICAgIGVuZW15R2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoKTtcbiAgICAgIHNldERpc3BsYXlDb3VudHMoKTtcbiAgICB9XG4gICAgZGVwbG95Q2hlY2socGxheWVyR2FtZUJvYXJkKTtcbiAgfVxuXG4gIGNvbnN0IHBsYWNlbWVudExpc3RlbmVycyA9IChwbGF5ZXJHYW1lQm9hcmQsIHBsYXllciwgZW5lbXlHYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCBzaGlwUGxhY2VtZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAtcGxhY2VtZW50LWNvbnRhaW5lcicpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydEhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwiY29weVwiXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlckhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZUhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZXZlbnQpID0+IGRyb3BIYW5kbGVyKGV2ZW50LCBwbGF5ZXJHYW1lQm9hcmQpKTtcbiAgICBzaGlwUGxhY2VtZW50Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiBjbGlja0hhbmRsZXJzKGV2ZW50LCBwbGF5ZXJHYW1lQm9hcmQsIHBsYXllciwgZW5lbXlHYW1lQm9hcmQpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGxhY2VtZW50TGlzdGVuZXJzLFxuICB9XG5cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFBsYWNlbWVudEV2ZW50czsiLCJpbXBvcnQgRWxlbWVudENyZWF0aW9uIGZyb20gJy4uL2VsZW1lbnRDcmVhdGlvbic7XG5cbmNvbnN0IHJlbmRlckdyaWRzID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1zZWN0aW9uJyk7XG4gIGNvbnN0IHBsYXllckdyaWRXcmFwcGVyID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2dyaWQtd3JhcHBlciBwbGF5ZXItZ3JpZC13cmFwcGVyJywgcGxheWVyU2VjdGlvbik7XG4gIGNvbnN0IHBsYXllckdyaWQgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnc2hpcHMtZ3JpZCBwbGF5ZXItZ3JpZCcsIHBsYXllckdyaWRXcmFwcGVyKTtcbiAgXG4gIGNvbnN0IG9wcG9uZW50U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHBvbmVudC1zZWN0aW9uJyk7XG4gIGNvbnN0IG9wcG9uZW50R3JpZFdyYXBwZXIgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnZ3JpZC13cmFwcGVyIG9wcG9uZW50LWdyaWQtd3JhcHBlcicsIG9wcG9uZW50U2VjdGlvbik7XG4gIGNvbnN0IG9wcG9uZW50R3JpZCA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdzaGlwcy1ncmlkIG9wcG9uZW50LWdyaWQnLCBvcHBvbmVudEdyaWRXcmFwcGVyKTtcblxuICBjb25zdCBwbGFjZW1lbnRHcmlkV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZW1lbnQtZ3JpZC13cmFwcGVyJyk7XG4gIGNvbnN0IHBsYWNlbWVudEdyaWQgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnc2hpcHMtZ3JpZCBwbGFjZW1lbnQtZ3JpZCcsIHBsYWNlbWVudEdyaWRXcmFwcGVyKTtcblxuICBmb3IgKCBsZXQgaSA9IDA7ICBpIDw9IDkgOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8PSA5OyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHBsYXllclNxdWFyZSA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdncmlkLXNxdWFyZSBwbGF5ZXItc3F1YXJlJywgcGxheWVyR3JpZCk7XG4gICAgICBjb25zdCBvcHBvbmVudFNxdWFyZSA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdncmlkLXNxdWFyZSBvcHBvbmVudC1zcXVhcmUnLCBvcHBvbmVudEdyaWQpO1xuICAgICAgY29uc3QgcGxhY2VtZW50U3F1YXJlID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2dyaWQtc3F1YXJlIHBsYWNlbWVudC1zcXVhcmUnLCBwbGFjZW1lbnRHcmlkKTtcbiAgICAgIHBsYXllclNxdWFyZS5kYXRhc2V0LnggPSBqO1xuICAgICAgcGxheWVyU3F1YXJlLmRhdGFzZXQueSA9IGk7XG4gICAgICBvcHBvbmVudFNxdWFyZS5kYXRhc2V0LnggPSBqO1xuICAgICAgb3Bwb25lbnRTcXVhcmUuZGF0YXNldC55ID0gaTsgXG4gICAgICBwbGFjZW1lbnRTcXVhcmUuZGF0YXNldC54ID0gajtcbiAgICAgIHBsYWNlbWVudFNxdWFyZS5kYXRhc2V0LnkgPSBpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJHcmlkczsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQmxhY2sgT3BzIE9uZVxcXCIsIGN1cnNpdmU7XFxufVxcblxcbi5wYWdlLWhlYWRpbmcge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAzLjJyZW07XFxuICBtYXJnaW4tdG9wOiAwLjVlbTtcXG59XFxuXFxuLmdhbWUtcmVzZXQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWUtcmVzZXQtYnRuIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDAuNmVtO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBib3JkZXItcmFkaXVzOiAyMnB4O1xcbiAgd2lkdGg6IDUwJTtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFlbTtcXG59XFxuXFxuLmdyaWQtc3F1YXJlLnNoaXAtcGxhY2VkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDAlO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItd2lkdGg6IDAuMWVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0E4REFEQztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4zMjkpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4uc2hpcC1jaXJjbGUge1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgd2lkdGg6IDYwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICBoZWlnaHQ6IDBlbTtcXG4gIHBhZGRpbmctYm90dG9tOiA2MCU7XFxuICBtYXJnaW46IGF1dG87XFxuICBtYXJnaW4tdG9wOiAwLjNlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5nYW1lLXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uIHtcXG4gIG1pbi13aWR0aDogNTAlO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gIG1pbi13aWR0aDogNTAlO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5wbGF5ZXItc2VjdGlvbi1oZWFkaW5nLWNvbnRhaW5lciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjRlbTtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMTBweCAxM3B4IC03cHggIzAwMDAwMCwgMnB4IDRweCAxM3B4IDZweCByZ2JhKDE1MSwgMTUxLCAxNTEsIDApO1xcbiAgYm94LXNoYWRvdzogMHB4IDEwcHggMTNweCAtN3B4ICMwMDAwMDAsIDJweCA0cHggMTNweCA2cHggcmdiYSgxNTEsIDE1MSwgMTUxLCAwKTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NTdCOUQ7XFxufVxcbi5nYW1lLXNlY3Rpb24gLm9wcG9uZW50LXNlY3Rpb24taGVhZGluZy1jb250YWluZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC40ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDEwcHggMTNweCAtN3B4ICMwMDAwMDAsIDJweCA0cHggMTNweCA2cHggcmdiYSgxNTEsIDE1MSwgMTUxLCAwKTtcXG4gIGJveC1zaGFkb3c6IDBweCAxMHB4IDEzcHggLTdweCAjMDAwMDAwLCAycHggNHB4IDEzcHggNnB4IHJnYmEoMTUxLCAxNTEsIDE1MSwgMCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTYzOTQ2O1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLWNvdW50cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnNoaXAtY291bnQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtYXJnaW4tcmlnaHQ6IDFlbTtcXG4gIG1hcmdpbi1sZWZ0OiAxZW07XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLW5hbWUge1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjNlbTtcXG59XFxuLmdhbWUtc2VjdGlvbiAuc2hpcC1jb3VudC1zZWN0aW9uLTEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5zaGlwLWNvdW50LXNlY3Rpb24tMiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5nYW1lLXNlY3Rpb24gLmdhbWUtc3RhdHVzIHtcXG4gIG1hcmdpbi1ib3R0b206IDJlbTtcXG4gIGJvcmRlcjogNHB4IHNvbGlkIGJsYWNrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ1N2I5ZDtcXG4gIHBhZGRpbmc6IDAuNWVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMWVtO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5nYW1lLXN0YXR1cy1tZXNzYWdlIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uZ2FtZS1zZWN0aW9uIC5nYW1lLXN0YXR1cy1tZXNzYWdlLnNob3duIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3BhY2l0eTogMTtcXG4gIGFuaW1hdGlvbi1uYW1lOiByZXZlYWw7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xcbn1cXG5Aa2V5ZnJhbWVzIHJldmVhbCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuLmdhbWUtc2VjdGlvbiAucGxheS1hZ2Fpbi1idG4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5nYW1lLXNlY3Rpb24gLnBsYXktYWdhaW4tYnRuIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDAuNmVtO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBib3JkZXItcmFkaXVzOiAyMnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbiAgZm9udC1zaXplOiAxLjFlbTtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBwYWRkaW5nOiAwLjhlbTtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDY1MHB4KSB7XFxuICAuZ2FtZS1zZWN0aW9uIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIG1hcmdpbi10b3A6IDZlbTtcXG4gIH1cXG4gIC5nYW1lLXNlY3Rpb24gLmdhbWUtc3RhdHVzIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDEwLjNlbTtcXG4gIH1cXG4gIC5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiA0NSU7XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiA0NSU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gIC5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiAzMCU7XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiAzMCU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcXG4gIC5nYW1lLXNlY3Rpb24gLnNoaXAtY2lyY2xlIHtcXG4gICAgbWFyZ2luLXRvcDogMC41ZW07XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxNjAwcHgpIHtcXG4gIC5nYW1lLXNlY3Rpb24gLnBsYXllci1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiAyNSU7XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgbWluLXdpZHRoOiAyNSU7XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5nYW1lLXN0YXR1cyB7XFxuICAgIGZvbnQtc2l6ZTogMS4zZW07XFxuICAgIHRvcDogOC4zZW07XFxuICB9XFxuICAuZ2FtZS1zZWN0aW9uIC5wbGF5LWFnYWluLWJ0biB7XFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICB9XFxufVxcblxcbi5ncmlkLXdyYXBwZXIgLnNoaXBzLWdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBtYXJnaW4tdG9wOiAyZW07XFxuICBtYXJnaW4tYm90dG9tOiA0ZW07XFxufVxcbi5ncmlkLXdyYXBwZXIgLmdyaWQtc3F1YXJlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDAlO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItd2lkdGg6IDAuMWVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0E4REFEQztcXG59XFxuLmdyaWQtd3JhcHBlciAuZ3JpZC1zcXVhcmU6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Q2RUNFNTtcXG59XFxuLmdyaWQtd3JhcHBlciAubWlzc2VkLWNpcmNsZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogNjAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMGVtO1xcbiAgcGFkZGluZy1ib3R0b206IDYwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFEMzU1NztcXG59XFxuLmdyaWQtd3JhcHBlciAuaGl0LWNpcmNsZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogNjAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMGVtO1xcbiAgcGFkZGluZy1ib3R0b206IDYwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0U2Mzk0NjtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xcbiAgLmdyaWQtd3JhcHBlciAubWlzc2VkLWNpcmNsZSB7XFxuICAgIG1hcmdpbi10b3A6IDAuNWVtO1xcbiAgfVxcbiAgLmdyaWQtd3JhcHBlciAuaGl0LWNpcmNsZSB7XFxuICAgIG1hcmdpbi10b3A6IDAuNWVtO1xcbiAgfVxcbn1cXG5cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgcGFkZGluZzogMnJlbSAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0YxRkFFRTtcXG4gIG1hcmdpbi10b3A6IDJlbTtcXG4gIG1heC13aWR0aDogODAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgcGFkZGluZzogMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAtMTBweCAwcHggMTNweCAtN3B4ICNmZmZmZmY4YSwgMTBweCAwcHggMTNweCAtN3B4ICNmZmZmZmY4YSwgMnB4IDRweCAxM3B4IDZweCByZ2JhKDE1MSwgMTUxLCAxNTEsIDApO1xcbiAgYm94LXNoYWRvdzogMHB4IDEzcHggLTdweCAjZmZmZmZmNWUsIDEwcHggMHB4IDEzcHggLTdweCAjZmZmZmZmNzcsIDJweCA0cHggMTNweCA2cHggcmdiYSgxNTEsIDE1MSwgMTUxLCAwKTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5pbmZvLXdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbiAgbWFyZ2luLXRvcDogMC44ZW07XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAucm90YXRlLWluZm8ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnNoaXAtcGxhY2VtZW50LWhlYWRpbmcge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1ncmlkLXdyYXBwZXIge1xcbiAgbWF4LXdpZHRoOiA2MCU7XFxuICBtYXJnaW46IGF1dG87XFxuICBwYWRkaW5nLWJvdHRvbTogMC4xZW07XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAuZGlzcGxheS1jb250YWluZXIge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlZC1zaGlwLWRpc3BsYXkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAwO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci13aWR0aDogMC4xZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQThEQURDO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICB3aWR0aDogMCU7XFxuICBtaW4td2lkdGg6IDYlO1xcbiAgcGFkZGluZy1ib3R0b206IDYlO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnNoaXAtY2lyY2xlIHtcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnNoaXAtZGlzcGxheSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcGFkZGluZy1ib3R0b206IDFlbTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1ncmlkIHtcXG4gIG1hcmdpbi1ib3R0b206IDJlbTtcXG59XFxuLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5wbGFjZW1lbnQtYnRucy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG4uc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1idG4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMC42ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAucmFuZG9tLWJ0biB7XFxuICBtYXJnaW46IDAgMC40ZW07XFxufVxcbi5zaGlwLXBsYWNlbWVudC1tb2RhbCAuZ3JpZC1zcXVhcmUucGxhY2VtZW50LXNxdWFyZS5zaGlwLXBsYWNlZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDA7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXdpZHRoOiAwLjFlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNBOERBREM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICAuc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnBsYWNlbWVudC1zZWN0aW9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5zaGlwLXBsYWNlbWVudC1tb2RhbCAucGxhY2VtZW50LWdyaWQtd3JhcHBlciB7XFxuICAgIG1pbi13aWR0aDogNDclO1xcbiAgfVxcbiAgLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5zaGlwcy1kaXNwbGF5LWNvbnRhaW5lciB7XFxuICAgIG1pbi13aWR0aDogNDUlO1xcbiAgfVxcbiAgLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5wbGFjZWQtc2hpcC1kaXNwbGF5IHtcXG4gICAgbWluLXdpZHRoOiAxMCU7XFxuICAgIHBhZGRpbmctYm90dG9tOiAxMCU7XFxuICB9XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gIC5zaGlwLXBsYWNlbWVudC1tb2RhbCAuc2hpcC1jaXJjbGUge1xcbiAgICBtYXJnaW4tdG9wOiAwLjVlbTtcXG4gIH1cXG59XFxuQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xcbiAgLnNoaXAtcGxhY2VtZW50LW1vZGFsIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDY1JTtcXG4gICAgbWFyZ2luLXRvcDogN2VtO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogMTYwMHB4KSB7XFxuICAuc2hpcC1wbGFjZW1lbnQtbW9kYWwgLnNoaXAtcGxhY2VtZW50LWNvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogNTUlO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQUE7QUFDRjs7QUFrREE7RUFDRSxxQ0FBQTtBQS9DRjs7QUFrREE7RUFDQyxrQkFBQTtFQUNBLGlCQUFBO0VBQ0MsaUJBQUE7QUEvQ0Y7O0FBa0RBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBL0NGOztBQWtEQTtFQXhCRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBb0JBLFVBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUF6Q0Y7O0FBNkNBO0VBNURFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtFQW9EQSw0Q0FBQTtFQUNBLGtCQUFBO0FBaENGOztBQW1DQTtFQTVFRSxrQkFBQTtFQUNBLFVBQUE7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QSx5QkFBQTtFQXNWRSw0Q0FBQTtFQUNBLGtCQUFBO0FBUko7QUFXRTtFQUNFO0lBQ0UsYUFBQTtJQUNBLG1CQUFBO0VBVEo7RUFZRTtJQUNFLGNBQUE7RUFWSjtFQWFFO0lBQ0UsY0FBQTtFQVhKO0VBY0U7SUFDRSxjQUFBO0lBQ0EsbUJBQUE7RUFaSjtBQUNGO0FBZUU7RUFDRTtJQUNFLGlCQUFBO0VBYko7QUFDRjtBQWdCRTtFQUNFO0lBQ0UsY0FBQTtJQUNBLGVBQUE7RUFkSjtBQUNGO0FBaUJFO0VBQ0U7SUFDRSxjQUFBO0VBZko7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuQG1peGluIGNpcmNsZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogNjAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIGhlaWdodDogMGVtO1xcbiAgcGFkZGluZy1ib3R0b206IDYwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDAuM2VtO1xcbn1cXG5cXG5AbWl4aW4gc3F1YXJlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDAlO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItd2lkdGg6IDAuMWVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0E4REFEQztcXG59XFxuXFxuQG1peGluIGhlYWRpbmdDb250YWluZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMC40ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDEwcHggMTNweCAtN3B4ICMwMDAwMDAsIDJweCA0cHggMTNweCA2cHggcmdiYSgxNTEsMTUxLDE1MSwwKTsgXFxuICBib3gtc2hhZG93OiAwcHggMTBweCAxM3B4IC03cHggIzAwMDAwMCwgMnB4IDRweCAxM3B4IDZweCByZ2JhKDE1MSwxNTEsMTUxLDApO1xcbn1cXG5cXG5AbWl4aW4gbWFpblNlY3Rpb24ge1xcbiAgbWluLXdpZHRoOiA1MCU7XFxufVxcblxcbkBtaXhpbiBidG4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMC42ZW07XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJCbGFjayBPcHMgT25lXFxcIiwgY3Vyc2l2ZTtcXG59XFxuXFxuLnBhZ2UtaGVhZGluZyB7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMy4ycmVtO1xcbiAgbWFyZ2luLXRvcDogMC41ZW07XFxufVxcblxcbi5nYW1lLXJlc2V0LWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5nYW1lLXJlc2V0LWJ0biB7XFxuICBAaW5jbHVkZSBidG47XFxuICB3aWR0aDogNTAlO1xcbiAgbWFyZ2luLXRvcDogMWVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xcbn1cXG5cXG5cXG4uZ3JpZC1zcXVhcmUuc2hpcC1wbGFjZWQge1xcbiAgQGluY2x1ZGUgc3F1YXJlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi5zaGlwLWNpcmNsZSB7XFxuICBAaW5jbHVkZSBjaXJjbGUoKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5nYW1lLXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuICAucGxheWVyLXNlY3Rpb24ge1xcbiAgICBAaW5jbHVkZSBtYWluU2VjdGlvbigpO1xcbiAgfVxcblxcbiAgLm9wcG9uZW50LXNlY3Rpb24ge1xcbiAgICBAaW5jbHVkZSBtYWluU2VjdGlvbigpO1xcbiAgfVxcbiAgXFxuICAucGxheWVyLXNlY3Rpb24taGVhZGluZy1jb250YWluZXIge1xcbiAgICBAaW5jbHVkZSBoZWFkaW5nQ29udGFpbmVyKCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NTdCOUQ7XFxuICB9XFxuXFxuICAub3Bwb25lbnQtc2VjdGlvbi1oZWFkaW5nLWNvbnRhaW5lciB7XFxuICAgIEBpbmNsdWRlIGhlYWRpbmdDb250YWluZXIoKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0U2Mzk0NjtcXG4gIH1cXG5cXG4gIC5zaGlwLWNvdW50cyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgfVxcblxcbiAgLnNoaXAtY291bnQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07XFxuICAgIG1hcmdpbi1sZWZ0OiAxZW07XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuXFxuICAuc2hpcC1uYW1lIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwLjNlbTtcXG4gIH1cXG5cXG4gIC5zaGlwLWNvdW50LXNlY3Rpb24tMSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuc2hpcC1jb3VudC1zZWN0aW9uLTIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcblxcbiAgLmdhbWUtc3RhdHVzIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMmVtO1xcbiAgICBib3JkZXI6IDRweCBzb2xpZCBibGFjaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzQ1N2I5ZDtcXG4gICAgcGFkZGluZzogMC41ZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMS4xZW07XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gIH1cXG5cXG4gIC5nYW1lLXN0YXR1cy1tZXNzYWdlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG5cXG4gIC5nYW1lLXN0YXR1cy1tZXNzYWdlLnNob3duIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGFuaW1hdGlvbi1uYW1lOiByZXZlYWw7XFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxuICB9XFxuXFxuICBAa2V5ZnJhbWVzIHJldmVhbCB7XFxuICAgIGZyb20ge1xcbiAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG4gIH1cXG5cXG4gIC5wbGF5LWFnYWluLWJ0bi1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcblxcbiAgLnBsYXktYWdhaW4tYnRuIHtcXG4gICAgQGluY2x1ZGUgYnRuKCk7XFxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcXG4gICAgZm9udC1zaXplOiAxLjFlbTtcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgcGFkZGluZzogMC44ZW07XFxuICB9XFxuXFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjUwcHgpIHtcXG5cXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIG1hcmdpbi10b3A6IDZlbTtcXG5cXG4gICAgLmdhbWUtc3RhdHVzIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiAxMC4zZW07XFxuICAgIH1cXG5cXG4gICAgLnBsYXllci1zZWN0aW9uIHtcXG4gICAgICBtaW4td2lkdGg6IDQ1JTtcXG4gICAgfVxcblxcbiAgICAub3Bwb25lbnQtc2VjdGlvbiB7XFxuICAgICAgbWluLXdpZHRoOiA0NSU7XFxuICAgIH1cXG4gIH1cXG5cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnBsYXllci1zZWN0aW9uIHtcXG4gICAgICBtaW4td2lkdGg6IDMwJTtcXG4gICAgfVxcblxcbiAgICAub3Bwb25lbnQtc2VjdGlvbiB7XFxuICAgICAgbWluLXdpZHRoOiAzMCU7XFxuICAgIH1cXG4gIH1cXG5cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcXG4gICAgLnNoaXAtY2lyY2xlIHtcXG4gICAgICBtYXJnaW4tdG9wOiAwLjVlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDE2MDBweCkge1xcbiAgICAucGxheWVyLXNlY3Rpb24ge1xcbiAgICAgIG1pbi13aWR0aDogMjUlO1xcbiAgICB9XFxuXFxuICAgIC5vcHBvbmVudC1zZWN0aW9uIHtcXG4gICAgICBtaW4td2lkdGg6IDI1JTtcXG4gICAgfVxcblxcbiAgICAuZ2FtZS1zdGF0dXMge1xcbiAgICAgIGZvbnQtc2l6ZTogMS4zZW07XFxuICAgICAgdG9wOiA4LjNlbTtcXG4gICAgfVxcblxcbiAgICAucGxheS1hZ2Fpbi1idG4ge1xcbiAgICAgIGZvbnQtc2l6ZTogMS41ZW07XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuLmdyaWQtd3JhcHBlciB7XFxuXFxuICAuc2hpcHMtZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgbWFyZ2luLXRvcDogMmVtO1xcbiAgICBtYXJnaW4tYm90dG9tOiA0ZW07XFxuICAgIFxcbiAgfVxcblxcbiAgLmdyaWQtc3F1YXJlIHtcXG4gICAgQGluY2x1ZGUgc3F1YXJlKCk7XFxuICB9XFxuXFxuICAuZ3JpZC1zcXVhcmU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDZFQ0U1O1xcbiAgfVxcblxcbiAgLm1pc3NlZC1jaXJjbGUge1xcbiAgICBAaW5jbHVkZSBjaXJjbGUoKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFEMzU1NztcXG4gIH1cXG5cXG4gIC5oaXQtY2lyY2xlIHtcXG4gICAgQGluY2x1ZGUgY2lyY2xlKCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNFNjM5NDY7XFxuICB9XFxuXFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XFxuICAgIC5taXNzZWQtY2lyY2xlIHtcXG4gICAgICBtYXJnaW4tdG9wOiAwLjVlbTtcXG4gICAgfVxcblxcbiAgICAuaGl0LWNpcmNsZSB7XFxuICAgICAgbWFyZ2luLXRvcDogMC41ZW07XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuLnNoaXAtcGxhY2VtZW50LW1vZGFse1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgcGFkZGluZzogMnJlbSAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCwgMC40KTtcXG5cXG4gIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjFGQUVFO1xcbiAgICBtYXJnaW4tdG9wOiAyZW07XFxuICAgIG1heC13aWR0aDogODAlO1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIHBhZGRpbmc6IDFlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IC0xMHB4IDBweCAxM3B4IC03cHggI2ZmZmZmZjhhLCAxMHB4IDBweCAxM3B4IC03cHggI2ZmZmZmZjhhLCAycHggNHB4IDEzcHggNnB4IHJnYmEoMTUxLDE1MSwxNTEsMCk7IFxcbiAgICBib3gtc2hhZG93OiAwcHggMTNweCAtN3B4ICNmZmZmZmY1ZSwgMTBweCAwcHggMTNweCAtN3B4ICNmZmZmZmY3NywgMnB4IDRweCAxM3B4IDZweCByZ2JhKDE1MSwgMTUxLCAxNTEsIDApO1xcbiAgfVxcblxcbiAgLmluZm8td3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcXG4gICAgbWFyZ2luLXRvcDogMC44ZW07XFxuICB9XFxuXFxuICAucm90YXRlLWluZm8ge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAuc2hpcC1wbGFjZW1lbnQtaGVhZGluZyB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtZ3JpZC13cmFwcGVyIHtcXG4gICAgbWF4LXdpZHRoOiA2MCU7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgcGFkZGluZy1ib3R0b206IDAuMWVtO1xcbiAgfVxcblxcbiAgLmRpc3BsYXktY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuXFxuICAucGxhY2VkLXNoaXAtZGlzcGxheSB7XFxuICAgIEBpbmNsdWRlIHNxdWFyZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMyOSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgd2lkdGg6IDAlO1xcbiAgICBtaW4td2lkdGg6IDYlO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogNiU7XFxuICB9XFxuXFxuICAuc2hpcC1jaXJjbGUge1xcbiAgICBtYXJnaW4tdG9wOiAwLjNlbTtcXG4gIH1cXG5cXG4gIC5zaGlwLWRpc3BsYXkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtZ3JpZCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDJlbTtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtYnRucy1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIH1cXG5cXG4gIC5wbGFjZW1lbnQtYnRuIHtcXG4gICAgQGluY2x1ZGUgYnRuKCk7XFxuICB9XFxuXFxuICAucmFuZG9tLWJ0biB7XFxuICAgIG1hcmdpbjogMCAwLjRlbTtcXG4gIH1cXG5cXG4gIC5ncmlkLXNxdWFyZS5wbGFjZW1lbnQtc3F1YXJlLnNoaXAtcGxhY2VkIHtcXG4gICAgQGluY2x1ZGUgc3F1YXJlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMzI5KTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgfVxcblxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICAgIC5wbGFjZW1lbnQtc2VjdGlvbiB7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIC5wbGFjZW1lbnQtZ3JpZC13cmFwcGVyIHtcXG4gICAgICBtaW4td2lkdGg6IDQ3JTtcXG4gICAgfVxcblxcbiAgICAuc2hpcHMtZGlzcGxheS1jb250YWluZXIge1xcbiAgICAgIG1pbi13aWR0aDogNDUlO1xcbiAgICB9XFxuXFxuICAgIC5wbGFjZWQtc2hpcC1kaXNwbGF5IHtcXG4gICAgICBtaW4td2lkdGg6IDEwJTtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTAlO1xcbiAgICB9XFxuICB9XFxuXFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAgIC5zaGlwLWNpcmNsZSB7XFxuICAgICAgbWFyZ2luLXRvcDogMC41ZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcXG4gICAgLnNoaXAtcGxhY2VtZW50LWNvbnRhaW5lciB7XFxuICAgICAgbWF4LXdpZHRoOiA2NSU7XFxuICAgICAgbWFyZ2luLXRvcDogN2VtO1xcbiAgICB9XFxuICB9XFxuXFxuICBAbWVkaWEgKG1pbi13aWR0aDogMTYwMHB4KSB7XFxuICAgIC5zaGlwLXBsYWNlbWVudC1jb250YWluZXIge1xcbiAgICAgIG1heC13aWR0aDogNTUlO1xcbiAgICB9XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgeyBnYW1lU3RhcnQgfSBmcm9tICcuL2dhbWVDb250cm9sJztcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIGdhbWVTdGFydCgpO1xufSwgMTAwKTtcbiJdLCJuYW1lcyI6WyJFbGVtZW50Q3JlYXRpb24iLCJjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MiLCJ0YWciLCJjbGFzc05hbWUiLCJwYXJlbnRFbGVtZW50IiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ2hpbGRFbGVtZW50V2l0aElkIiwiaWQiLCJjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3NBbmRJZCIsIlNoaXAiLCJHYW1lQm9hcmQiLCJwbGFjZWRTaGlwcyIsIm1pc3NlZEF0dGFja3MiLCJoaXRBdHRhY2tzIiwiYm9hcmRXaWR0aCIsImJvYXJkSGVpZ2h0IiwiaXNBZGphY2VudCIsImNvb3JkaW5hdGVzIiwic2hpcHMiLCJhbGxTaGlwQ29vcmRpbmF0ZXMiLCJtYXAiLCJzaGlwIiwiZ2V0U2hpcENvb3JkaW5hdGVzIiwiY29uY2F0IiwiY2hlY2tYIiwic2hpcFhDb29yZGluYXRlIiwiY2hlY2tZIiwic2hpcFlDb29yZGluYXRlIiwibm9uQWRqYWNlbnRDb29yZGluYXRlcyIsImZpbHRlciIsInNoaXBDb29yZGluYXRlcyIsImxlbmd0aCIsInJvdGF0aW9uQ2hvaWNlIiwiY2hvaWNlcyIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNQb3NpdGlvbkF2YWlsaWFibGUiLCJzdGFydENvb3JkaW5hdGVzIiwicm90YXRpb24iLCJpIiwicHVzaCIsImF2YWlsaWFibGVDb29yZGluYXRlcyIsInBsYWNlU2hpcCIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tDb29yZGluYXRlcyIsImF0dGFja2VkU2hpcCIsImhhc0Nvb3JkaW5hdGVzIiwiaGl0IiwiaXNHYW1lT3ZlciIsImV2ZXJ5IiwicGxhY2VkU2hpcCIsImlzU3VuayIsImlzUG9zaXRpb25GcmVlVG9BdHRhY2siLCJwb3NpdGlvbkNoZWNrIiwiZnJlZVBvc2l0aW9uIiwiZ2V0QWxsQ29vcmRpbmF0ZXMiLCJhbGxDb29yZGluYXRlcyIsImNsZWFyQm9hcmQiLCJmb3JFYWNoIiwic2hpcEluZGV4IiwiaW5kZXhPZiIsInBvcHVsYXRlQm9hcmQiLCJzaGlwc1BsYWNlZCIsInJhbmRvbVgiLCJyYW5kb21ZIiwiZ2V0TGFzdENyZWF0ZWRTaGlwIiwibGFzdFNoaXAiLCJzdW5rU2hpcENoZWNrIiwic3Vua1NoaXAiLCJyZW1vdmVTdW5rU2hpcCIsInN1bmtTaGlwSW5kZXgiLCJyZW1vdmVkU2hpcCIsInNwbGljZSIsImNvcHlQbGFjZWRTaGlwcyIsImNvcHkiLCJpc0JvYXJkQ29tcGxldGUiLCJQbGF5ZXIiLCJDb21wdXRlclBsYXllciIsIkdhbWVFdmVudHMiLCJQbGFjZW1lbnRFdmVudHMiLCJyZW5kZXJHcmlkcyIsImdhbWVTdGFydCIsImh1bWFuUGxheWVyIiwiaHVtYW5Cb2FyZCIsImNvbXB1dGVyUGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsInBhZ2VMaXN0ZW5lcnMiLCJwbGFjZW1lbnRMaXN0ZW5lcnMiLCJhdHRhY2tFbmVteUJvYXJkIiwiZW5lbXlHYW1lQm9hcmQiLCJzaGlwQXR0YWNrZWQiLCJnZXRQbGF5ZXJTaGlwIiwicGxheWVyR2FtZUJvYXJkIiwiYWxsUGxhY2VkU2hpcHMiLCJ0YXJnZXRTaGlwIiwicm90YXRlQm9hcmRTaGlwIiwicm90YXRlU2hpcElmUG9zc2libGUiLCJzdWNjZXNzZnVsQXR0YWNrcyIsImFkamFjZW50QXR0YWNrRnVuY3Rpb25zIiwiaW5kZXgiLCJyZXNldEF0dGFja1BhdHRlcm4iLCJwaWNrUmFuZG9tQ29vcmRpbmF0ZXMiLCJwaWNrQWRqYWNlbnRDb29yZGluYXRlcyIsImxhc3RDb29yZGluYXRlcyIsIngiLCJ5IiwicGlja0Nvb3JkaW5hdGVzIiwic2hpcEhpdHMiLCJzaGlwTmFtZXMiLCJnZXRTaGlwTmFtZSIsIm1hdGNoRm91bmQiLCJjb29yZGluYXRlc0tleSIsInRvU3RyaW5nIiwic2hpcEhpdEJvb2xzIiwiT2JqZWN0IiwidmFsdWVzIiwiYm9vbCIsImlzU2hpcEhvcml6b250YWwiLCJmaXJzdENvb3JkaW5hdGVzIiwic2Vjb25kQ29vcmRpbmF0ZXMiLCJyb3RhdGVTaGlwIiwiaXNIb3Jpem9udGFsIiwicGxhY2VkU2hpcHNDb3B5IiwiZmlsdGVyZWRTaGlwcyIsImdldFNoaXBMZW5ndGgiLCJwYWdlQ2xpY2tFdmVudHMiLCJldmVudCIsInBsYXllciIsImVuZW15IiwiY2hhbmdlR2FtZVN0YXR1c01lc3NhZ2UiLCJtZXNzYWdlVHlwZSIsInN1bmtTaGlwTmFtZSIsInBsYXllclR5cGUiLCJtZXNzYWdlRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjdXJyZW50U2hvd25NZXNzYWdlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInBsYXllck1vdmUiLCJ4Q29vcmRpbmF0ZSIsInBhcnNlSW50IiwidGFyZ2V0IiwiZGF0YXNldCIsInlDb29yZGluYXRlIiwiYWRkIiwiY29tcHV0ZXJNb3ZlIiwiY29tcHV0ZXJBdHRhY2tDb29yZGluYXRlcyIsInBsYXllclNoaXBBdHRhY2tlZCIsImNvbXB1dGVyVGFyZ2V0IiwiY2hpbGROb2RlcyIsInJlbW92ZUNsYXNzTmFtZSIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImRlY3JlbWVudFNoaXBDb3VudCIsInNoaXBOYW1lIiwib3duZXIiLCJzaGlwTmFtZUxvd2VyIiwidG9Mb3dlckNhc2UiLCJzZWN0aW9uIiwic2hpcENvdW50RWxlbWVudCIsImNvdW50IiwicmVzZXRTaGlwQ291bnQiLCJwbGF5ZXJTaGlwQ291bnRzIiwib3Bwb25lbnRTaGlwQ291bnRzIiwicGxheWVyU2hpcENvdW50Iiwib3Bwb25lbnRTaGlwQ291bnQiLCJyZXNldEdhbWVTdGF0dXNNZXNzYWdlIiwicmVzZXRHYW1lU3RhdHVzTWVzc2FnZXMiLCJtZXNzYWdlIiwid2FpdE1lc3NhZ2UiLCJyZXNldEdhbWUiLCJzaGlwUGxhY2VtZW50TW9kYWwiLCJkaXNwbGF5IiwiZ2FtZUJvYXJkIiwiZGlzYWJsZVBsYXllckFjdGlvbnMiLCJvcHBvbmVudEdyaWRTcXVhcmVzIiwic3F1YXJlIiwiZW5hYmxlUGxheWVyQWN0aW9ucyIsInBsYXllcldpbiIsImVuZW15U3Vua1NoaXBDaGVjayIsImdyaWRTcXVhcmVFbGVtZW50IiwicGxheUFnYWluQnRuIiwic2V0VGltZW91dCIsImNvbXB1dGVyV2luIiwicGxheWVyU3Vua1NoaXBDaGVjayIsInBsYXllclNoaXBOYW1lIiwiZGVwbG95QnV0dG9uIiwiZGlzYWJsZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVwbG95Q2hlY2siLCJkcmFnU3RhcnRIYW5kbGVyIiwiZGF0YVRyYW5zZmVyIiwiZWZmZWN0QWxsb3dlZCIsInNldERhdGEiLCJkcmFnRW50ZXJIYW5kbGVyIiwiZHJhZ0xlYXZlSGFuZGxlciIsImRyb3BIYW5kbGVyIiwicHJldmVudERlZmF1bHQiLCJzaGlwRGlzcGxheUNsYXNzTmFtZSIsImdldERhdGEiLCJzcGxpdCIsImRpc3BsYXlDb250YWluZXIiLCJkaXNwbGF5Q291bnQiLCJzaGlwTGVuZ3RoIiwic2hpcFBsYWNlbWVudCIsImNyZWF0ZWRTaGlwIiwicGxheWVyRE9NQ29vcmRpbmF0ZXMiLCJpbm5lckhUTUwiLCJjbGlja0hhbmRsZXJzIiwicmVtb3ZlUGxhY2VkU2hpcEVsZW1lbnRzIiwicGxhY2VtZW50U3F1YXJlIiwiYWRkUGxhY2VkU2hpcEVsZW1lbnRzIiwicmVzZXRCb2FyZCIsInNoaXBQbGFjZWRFbGVtZW50cyIsInNoaXBFbGVtZW50IiwicmFuZG9tbHlQb3B1bGF0ZUJvYXJkIiwicGxheWVyQm9hcmRDb29yZGluYXRlcyIsInNldERpc3BsYXlDb3VudHMiLCJkaXNwbGF5Q291bnRzIiwibnVtYmVyT2ZTaGlwcyIsInNldERpc3BsYXlDb3VudHNUb1plcm8iLCJkZXBsb3lTaGlwcyIsInBsYXllckNvb3JkaW5hdGVzIiwicGxheWVyU2hpcCIsInBsYXllclNoaXBDb29yZGluYXRlcyIsInJvdGF0ZWRTaGlwQ29vcmRpbmF0ZXMiLCJzaGlwUGxhY2VtZW50Q29udGFpbmVyIiwiZHJvcEVmZmVjdCIsInBsYXllclNlY3Rpb24iLCJwbGF5ZXJHcmlkV3JhcHBlciIsInBsYXllckdyaWQiLCJvcHBvbmVudFNlY3Rpb24iLCJvcHBvbmVudEdyaWRXcmFwcGVyIiwib3Bwb25lbnRHcmlkIiwicGxhY2VtZW50R3JpZFdyYXBwZXIiLCJwbGFjZW1lbnRHcmlkIiwiaiIsInBsYXllclNxdWFyZSIsIm9wcG9uZW50U3F1YXJlIl0sInNvdXJjZVJvb3QiOiIifQ==