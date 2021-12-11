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
  /* Checks the coordinates of placed ships to see if the parameter coordinates match */

  var isPositionOccupied = function isPositionOccupied(coordinates) {
    var _ref;

    var placedShipCoordinates = placedShips.map(function (ship) {
      return ship.shipCoordinates;
    });
    placedShipCoordinates = (_ref = []).concat.apply(_ref, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(placedShipCoordinates));
    var matchFound = false;
    placedShipCoordinates.forEach(function (shipCoordinates) {
      if (shipCoordinates[0] === coordinates[0] && shipCoordinates[1] === coordinates[1]) {
        matchFound = true;
      }
    });
    return matchFound;
  };
  /* 
    Checks if the coordinates of a ship about to be placed is next to the coordinates
    of a ship that is already on the board.
  */


  var isAdjacent = function isAdjacent(coordinates) {
    var _ref2;

    var placedShipCoordinates = placedShips.map(function (ship) {
      return ship.shipCoordinates;
    });
    placedShipCoordinates = (_ref2 = []).concat.apply(_ref2, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(placedShipCoordinates));

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

    var nonAdjacentCoordinates = placedShipCoordinates.filter(function (shipCoordinates) {
      if (!checkX(shipCoordinates[0]) || !checkY(shipCoordinates[1])) {
        return true;
      }

      return false;
    });

    if (nonAdjacentCoordinates.length === placedShipCoordinates.length) {
      return false;
    }

    return true;
  };
  /* 
    Places a ship on the board after checking that the ship's coordinates are within the board 
    and that another ship is not already at the coordinates the new ship wants to occupy 
  */


  var placeShip = function placeShip(length, startCoordinates) {
    var shipCoordinates = [];

    for (var i = 0; i < length; i += 1) {
      if (startCoordinates[0] + i >= boardWidth || startCoordinates[1] >= boardHeight) {
        return false;
      }

      shipCoordinates.push([startCoordinates[0] + i, startCoordinates[1]]);
    }

    var availiableCoordinates = shipCoordinates.filter(function (coordinates) {
      if (isPositionOccupied(coordinates) || isAdjacent(coordinates)) {
        return false;
      }

      return true;
    });

    if (availiableCoordinates.length !== length) {
      return false;
    }

    var ship = new _ship__WEBPACK_IMPORTED_MODULE_1__["default"](length, shipCoordinates);
    placedShips.push(ship);
    return true;
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
    var _ref3;

    var allCoordinates = placedShips.map(function (ship) {
      return ship.shipCoordinates;
    });
    return (_ref3 = []).concat.apply(_ref3, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(allCoordinates));
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

    while (shipsPlaced < 10) {
      var randomX = Math.floor(Math.random() * 10);
      var randomY = Math.floor(Math.random() * 10);
      var placedShip = placeShip(length, [randomX, randomY]);

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
    }
  };

  return {
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    isGameOver: isGameOver,
    isPositionFreeToAttack: isPositionFreeToAttack,
    getAllCoordinates: getAllCoordinates,
    clearBoard: clearBoard,
    isPositionOccupied: isPositionOccupied,
    populateBoard: populateBoard,
    isAdjacent: isAdjacent
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
/* harmony import */ var _userInterface_pageEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userInterface/pageEvents */ "./src/userInterface/pageEvents.js");
/* harmony import */ var _userInterface_renderUI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userInterface/renderUI */ "./src/userInterface/renderUI.js");





var gameStart = function gameStart() {
  var humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)();
  var humanBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.ComputerPlayer)();
  var computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  humanBoard.populateBoard();
  computerBoard.populateBoard();
  (0,_userInterface_renderUI__WEBPACK_IMPORTED_MODULE_3__["default"])(humanBoard.getAllCoordinates());
  _userInterface_pageEvents__WEBPACK_IMPORTED_MODULE_2__["default"].pageListeners(humanPlayer, humanBoard, computerPlayer, computerBoard);
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
var Player = function Player() {
  var attackEnemyBoard = function attackEnemyBoard(enemyGameBoard, attackCoordinates) {
    /* Returns true if a ship was hit */
    var shipAttacked = enemyGameBoard.receiveAttack(attackCoordinates);
    return shipAttacked;
  };

  return {
    attackEnemyBoard: attackEnemyBoard
  };
};

var ComputerPlayer = function ComputerPlayer() {
  var _Player = Player(),
      attackEnemyBoard = _Player.attackEnemyBoard;

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

  return {
    attackEnemyBoard: attackEnemyBoard,
    pickRandomCoordinates: pickRandomCoordinates
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
var Ship = function Ship(length, shipCoordinates) {
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
      return bool === true;
    });
  };

  return {
    getShipName: getShipName,
    hit: hit,
    isSunk: isSunk,
    hasCoordinates: hasCoordinates,
    shipCoordinates: shipCoordinates
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/userInterface/pageEvents.js":
/*!*****************************************!*\
  !*** ./src/userInterface/pageEvents.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var PageEvents = function () {
  var pageClickEvents = function pageClickEvents(event, player, playerGameBoard, enemy, enemyGameBoard) {
    var playerMove = function playerMove() {
      var xCoordinate = parseInt(event.target.dataset.x, 10);
      var yCoordinate = parseInt(event.target.dataset.y, 10);
      var shipAttacked = player.attackEnemyBoard(enemyGameBoard, [xCoordinate, yCoordinate]);

      if (shipAttacked) {
        event.target.classList.add('hit');
      } else {
        event.target.classList.add('missed');
      }
    };

    var computerMove = function computerMove() {
      var computerCoordinates = enemy.pickRandomCoordinates(playerGameBoard);
      var playerShipAttacked = enemy.attackEnemyBoard(playerGameBoard, computerCoordinates);
      var computerTarget = document.querySelector("[data-x=\"".concat(computerCoordinates[0], "\"][data-y=\"").concat(computerCoordinates[1], "\"]"));

      if (playerShipAttacked) {
        computerTarget.classList.add('hit');
      } else {
        computerTarget.classList.add('missed');
      }
    };

    var removeClassName = function removeClassName(className) {
      var elements = document.querySelectorAll(".".concat(className));
      elements.forEach(function (element) {
        return element.classList.remove(className);
      });
    };

    var resetGame = function resetGame() {
      playerGameBoard.clearBoard();
      enemyGameBoard.clearBoard();
      removeClassName('missed');
      removeClassName('hit');
      removeClassName('ship-placed');
    };

    if (event.target.className === 'grid-square opponent-square') {
      playerMove();
      var playerWin = enemyGameBoard.isGameOver();

      if (playerWin) {
        console.log('Player has won the game!');
        resetGame();
        return;
      }

      setTimeout(function () {
        computerMove();
      }, 500);
      var computerWin = playerGameBoard.isGameOver();

      if (computerWin) {
        console.log('Computer has won the game!');
        resetGame();
      }
    }
  };

  var pageListeners = function pageListeners(player, playerGameBoard, enemy, enemyGameBoard) {
    /* remove event stops user from making a move while waiting for the computer */
    document.removeEventListener('click', function (event) {
      pageClickEvents(event, player, playerGameBoard, enemy, enemyGameBoard);
    });
    document.addEventListener('click', function (event) {
      pageClickEvents(event, player, playerGameBoard, enemy, enemyGameBoard);
    });
  };

  return {
    pageListeners: pageListeners
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageEvents);

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


var renderGrids = function renderGrids(humanShipCoordinates) {
  var gridsSection = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'grids-section', document.querySelector('body'));
  var playerGrid = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'ships-grid player-grid', gridsSection);
  var opponentGrid = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'ships-grid opponent-grid', gridsSection);

  for (var i = 0; i <= 9; i += 1) {
    for (var j = 0; j <= 9; j += 1) {
      var playerSquare = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'grid-square player-square', playerGrid);
      var opponentSquare = _elementCreation__WEBPACK_IMPORTED_MODULE_0__["default"].createChildElementWithClass('div', 'grid-square opponent-square', opponentGrid);
      playerSquare.dataset.x = j;
      playerSquare.dataset.y = i;
      opponentSquare.dataset.x = j;
      opponentSquare.dataset.y = i;
    }
  }

  humanShipCoordinates.forEach(function (coordinates) {
    var humanDomCoordinates = document.querySelector(".player-square[data-x=\"".concat(coordinates[0], "\"][data-y=\"").concat(coordinates[1], "\"]"));
    humanDomCoordinates.classList.add('ship-placed');
  });
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
___CSS_LOADER_EXPORT___.push([module.id, ".grids-section {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -webkit-transform: translate(-150%, -100%);\n  max-width: 6.5em;\n  height: 13.3em;\n}\n.grids-section .ships-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n  margin-top: 2em;\n  margin-bottom: 4em;\n}\n.grids-section .grid-square {\n  height: 1.8em;\n  width: 1.8em;\n  border-style: solid;\n  border-color: black;\n  border-width: 0.1em;\n  cursor: pointer;\n}\n.grids-section .grid-square.missed {\n  background-color: aquamarine;\n}\n.grids-section .grid-square.hit {\n  background-color: crimson;\n}\n.grids-section .grid-square.ship-placed {\n  background-color: grey;\n}\n.grids-section .grid-square.ship-placed.hit {\n  background-color: crimson;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,kBAAA;EACA,SAAA;EACA,QAAA;EACA,gCAAA;EACA,oCAAA;EACA,0CAAA;EACA,gBAAA;EACA,cAAA;AACF;AACE;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;EACA,eAAA;EACA,kBAAA;AACJ;AAEE;EACE,aAAA;EACA,YAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;AAAJ;AAGE;EACE,4BAAA;AADJ;AAIE;EACE,yBAAA;AAFJ;AAKE;EACE,sBAAA;AAHJ;AAME;EACE,yBAAA;AAJJ","sourcesContent":[".grids-section {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -webkit-transform: translate(-150%, -100%);\n  max-width: 6.5em;\n  height: 13.3em;\n\n  .ships-grid {\n    display: grid;\n    grid-template-rows: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n    margin-top: 2em;\n    margin-bottom: 4em;\n  }\n\n  .grid-square {\n    height: 1.8em;\n    width: 1.8em;\n    border-style: solid;\n    border-color: black;\n    border-width: 0.1em;\n    cursor: pointer;\n  }\n\n  .grid-square.missed {\n    background-color: aquamarine;\n  }\n\n  .grid-square.hit {\n    background-color: crimson;\n  }\n\n  .grid-square.ship-placed {\n    background-color: grey;\n  }\n\n  .grid-square.ship-placed.hit {\n    background-color: crimson;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUFDLHVEQUFTLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2VsZW1lbnRDcmVhdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVDb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3VzZXJJbnRlcmZhY2UvcGFnZUV2ZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3VzZXJJbnRlcmZhY2UvcmVuZGVyVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRWxlbWVudENyZWF0aW9uID0gKCgpID0+IHtcbiAgY29uc3QgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzID0gKHRhZywgY2xhc3NOYW1lLCBwYXJlbnRFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aElkID0gKHRhZywgaWQsIHBhcmVudEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGVsZW1lbnQuaWQgPSBpZDtcbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzQW5kSWQgPSAodGFnLCBjbGFzc05hbWUsIGlkLCBwYXJlbnRFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBlbGVtZW50LmlkID0gaWQ7XG4gICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzLFxuICAgIGNyZWF0ZUNoaWxkRWxlbWVudFdpdGhJZCxcbiAgICBjcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3NBbmRJZCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEVsZW1lbnRDcmVhdGlvbjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBsZXQgcGxhY2VkU2hpcHMgPSBbXTtcbiAgbGV0IG1pc3NlZEF0dGFja3MgPSBbXTtcbiAgbGV0IGhpdEF0dGFja3MgPSBbXTtcbiAgY29uc3QgYm9hcmRXaWR0aCA9IDEwO1xuICBjb25zdCBib2FyZEhlaWdodCA9IDEwO1xuXG4gIC8qIENoZWNrcyB0aGUgY29vcmRpbmF0ZXMgb2YgcGxhY2VkIHNoaXBzIHRvIHNlZSBpZiB0aGUgcGFyYW1ldGVyIGNvb3JkaW5hdGVzIG1hdGNoICovXG4gIGNvbnN0IGlzUG9zaXRpb25PY2N1cGllZCA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGxldCBwbGFjZWRTaGlwQ29vcmRpbmF0ZXMgPSBwbGFjZWRTaGlwcy5tYXAoKHNoaXApID0+IHNoaXAuc2hpcENvb3JkaW5hdGVzKTtcbiAgICBwbGFjZWRTaGlwQ29vcmRpbmF0ZXMgPSBbXS5jb25jYXQoLi4ucGxhY2VkU2hpcENvb3JkaW5hdGVzKTtcbiAgICBsZXQgbWF0Y2hGb3VuZCA9IGZhbHNlO1xuICAgIHBsYWNlZFNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChzaGlwQ29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGlmIChzaGlwQ29vcmRpbmF0ZXNbMF0gPT09IGNvb3JkaW5hdGVzWzBdICYmIHNoaXBDb29yZGluYXRlc1sxXSA9PT0gY29vcmRpbmF0ZXNbMV0pIHtcbiAgICAgICAgbWF0Y2hGb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWF0Y2hGb3VuZDtcbiAgfVxuXG4gIC8qIFxuICAgIENoZWNrcyBpZiB0aGUgY29vcmRpbmF0ZXMgb2YgYSBzaGlwIGFib3V0IHRvIGJlIHBsYWNlZCBpcyBuZXh0IHRvIHRoZSBjb29yZGluYXRlc1xuICAgIG9mIGEgc2hpcCB0aGF0IGlzIGFscmVhZHkgb24gdGhlIGJvYXJkLlxuICAqL1xuICBjb25zdCBpc0FkamFjZW50ID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgbGV0IHBsYWNlZFNoaXBDb29yZGluYXRlcyA9IHBsYWNlZFNoaXBzLm1hcCgoc2hpcCkgPT4gc2hpcC5zaGlwQ29vcmRpbmF0ZXMpO1xuICAgIHBsYWNlZFNoaXBDb29yZGluYXRlcyA9IFtdLmNvbmNhdCguLi5wbGFjZWRTaGlwQ29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IGNoZWNrWCA9IChzaGlwWENvb3JkaW5hdGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgc2hpcFhDb29yZGluYXRlID09PSBjb29yZGluYXRlc1swXSB8fCBcbiAgICAgICAgc2hpcFhDb29yZGluYXRlID09PSBjb29yZGluYXRlc1swXSAtIDEgfHwgXG4gICAgICAgIHNoaXBYQ29vcmRpbmF0ZSA9PT0gY29vcmRpbmF0ZXNbMF0gKyAxXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGNoZWNrWSA9IChzaGlwWUNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgc2hpcFlDb29yZGluYXRlID09PSBjb29yZGluYXRlc1sxXSB8fCBcbiAgICAgICAgc2hpcFlDb29yZGluYXRlID09PSBjb29yZGluYXRlc1sxXSAtIDEgfHwgXG4gICAgICAgIHNoaXBZQ29vcmRpbmF0ZSA9PT0gY29vcmRpbmF0ZXNbMV0gKyAxXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9uQWRqYWNlbnRDb29yZGluYXRlcyA9IHBsYWNlZFNoaXBDb29yZGluYXRlcy5maWx0ZXIoKHNoaXBDb29yZGluYXRlcykgPT4ge1xuICAgICAgaWYgKCFjaGVja1goc2hpcENvb3JkaW5hdGVzWzBdKSB8fCAhY2hlY2tZKHNoaXBDb29yZGluYXRlc1sxXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBpZiAobm9uQWRqYWNlbnRDb29yZGluYXRlcy5sZW5ndGggPT09IHBsYWNlZFNoaXBDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qIFxuICAgIFBsYWNlcyBhIHNoaXAgb24gdGhlIGJvYXJkIGFmdGVyIGNoZWNraW5nIHRoYXQgdGhlIHNoaXAncyBjb29yZGluYXRlcyBhcmUgd2l0aGluIHRoZSBib2FyZCBcbiAgICBhbmQgdGhhdCBhbm90aGVyIHNoaXAgaXMgbm90IGFscmVhZHkgYXQgdGhlIGNvb3JkaW5hdGVzIHRoZSBuZXcgc2hpcCB3YW50cyB0byBvY2N1cHkgXG4gICovXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChsZW5ndGgsIHN0YXJ0Q29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc3RhcnRDb29yZGluYXRlc1swXSArIGkgPj0gYm9hcmRXaWR0aCB8fCBzdGFydENvb3JkaW5hdGVzWzFdID49IGJvYXJkSGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkaW5hdGVzWzBdICsgaSwgc3RhcnRDb29yZGluYXRlc1sxXV0pO1xuICAgIH1cbiAgICBjb25zdCBhdmFpbGlhYmxlQ29vcmRpbmF0ZXMgPSBzaGlwQ29vcmRpbmF0ZXMuZmlsdGVyKChjb29yZGluYXRlcykgPT4ge1xuICAgICAgaWYgKGlzUG9zaXRpb25PY2N1cGllZChjb29yZGluYXRlcykgfHwgaXNBZGphY2VudChjb29yZGluYXRlcykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoYXZhaWxpYWJsZUNvb3JkaW5hdGVzLmxlbmd0aCAhPT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgsIHNoaXBDb29yZGluYXRlcyk7XG4gICAgcGxhY2VkU2hpcHMucHVzaChzaGlwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSBwbGFjZWRTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAuaGFzQ29vcmRpbmF0ZXMoYXR0YWNrQ29vcmRpbmF0ZXMpKTtcbiAgICBpZiAoYXR0YWNrZWRTaGlwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaGl0QXR0YWNrcy5wdXNoKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICAgIGF0dGFja2VkU2hpcFswXS5oaXQoYXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBcbiAgICBtaXNzZWRBdHRhY2tzLnB1c2goYXR0YWNrQ29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGlzR2FtZU92ZXIgPSAoKSA9PiBwbGFjZWRTaGlwcy5ldmVyeSgocGxhY2VkU2hpcCkgPT4gcGxhY2VkU2hpcC5pc1N1bmsoKSk7XG5cbiAgY29uc3QgaXNQb3NpdGlvbkZyZWVUb0F0dGFjayA9IChhdHRhY2tDb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IHBvc2l0aW9uQ2hlY2sgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgIGlmIChjb29yZGluYXRlc1swXSAhPT0gYXR0YWNrQ29vcmRpbmF0ZXNbMF0gfHwgY29vcmRpbmF0ZXNbMV0gIT09IGF0dGFja0Nvb3JkaW5hdGVzWzFdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBmcmVlUG9zaXRpb24gPSBtaXNzZWRBdHRhY2tzLmV2ZXJ5KHBvc2l0aW9uQ2hlY2spICYmIGhpdEF0dGFja3MuZXZlcnkocG9zaXRpb25DaGVjayk7XG4gICAgcmV0dXJuIGZyZWVQb3NpdGlvbjtcbiAgfSBcblxuICBjb25zdCBnZXRBbGxDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBhbGxDb29yZGluYXRlcyA9IHBsYWNlZFNoaXBzLm1hcCgoc2hpcCkgPT4gIHNoaXAuc2hpcENvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLmFsbENvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XG4gICAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3Qgc2hpcEluZGV4ID0gcGxhY2VkU2hpcHMuaW5kZXhPZihzaGlwKTtcbiAgICAgIHBsYWNlZFNoaXBzW3NoaXBJbmRleF0gPSBudWxsO1xuICAgIH0pO1xuICAgIHBsYWNlZFNoaXBzID0gW107XG4gICAgbWlzc2VkQXR0YWNrcyA9IFtdO1xuICAgIGhpdEF0dGFja3MgPSBbXTtcbiAgfVxuXG4gIGNvbnN0IHBvcHVsYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgY2xlYXJCb2FyZCgpO1xuICAgIGxldCBzaGlwc1BsYWNlZCA9IDA7XG4gICAgbGV0IGxlbmd0aCA9IDU7XG4gICAgd2hpbGUgKHNoaXBzUGxhY2VkIDwgMTApIHtcbiAgICAgIGNvbnN0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgcGxhY2VkU2hpcCA9IHBsYWNlU2hpcChsZW5ndGgsIFtyYW5kb21YLCByYW5kb21ZXSk7XG4gICAgICBpZiAocGxhY2VkU2hpcCkge1xuICAgICAgICBzaGlwc1BsYWNlZCArPSAxO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHNoaXBzUGxhY2VkKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBsZW5ndGggPSA0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgbGVuZ3RoID0gMztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgIGxlbmd0aCA9IDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGlzR2FtZU92ZXIsXG4gICAgaXNQb3NpdGlvbkZyZWVUb0F0dGFjayxcbiAgICBnZXRBbGxDb29yZGluYXRlcyxcbiAgICBjbGVhckJvYXJkLFxuICAgIGlzUG9zaXRpb25PY2N1cGllZCxcbiAgICBwb3B1bGF0ZUJvYXJkLFxuICAgIGlzQWRqYWNlbnQsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkOyIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSAnLi9nYW1lQm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyLCBDb21wdXRlclBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBQYWdlRXZlbnRzIGZyb20gJy4vdXNlckludGVyZmFjZS9wYWdlRXZlbnRzJztcbmltcG9ydCByZW5kZXJHcmlkcyAgZnJvbSAnLi91c2VySW50ZXJmYWNlL3JlbmRlclVJJztcblxuY29uc3QgZ2FtZVN0YXJ0ID0gKCkgPT4ge1xuICBjb25zdCBodW1hblBsYXllciA9IFBsYXllcigpO1xuICBjb25zdCBodW1hbkJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gQ29tcHV0ZXJQbGF5ZXIoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIGh1bWFuQm9hcmQucG9wdWxhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLnBvcHVsYXRlQm9hcmQoKTtcbiAgcmVuZGVyR3JpZHMoaHVtYW5Cb2FyZC5nZXRBbGxDb29yZGluYXRlcygpKTtcbiAgUGFnZUV2ZW50cy5wYWdlTGlzdGVuZXJzKGh1bWFuUGxheWVyLCBodW1hbkJvYXJkLCBjb21wdXRlclBsYXllciwgY29tcHV0ZXJCb2FyZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBodW1hblBsYXllcixcbiAgICBodW1hbkJvYXJkLFxuICAgIGNvbXB1dGVyUGxheWVyLFxuICAgIGNvbXB1dGVyQm9hcmQsXG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcbiAgZ2FtZVN0YXJ0LFxufSIsImNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgYXR0YWNrRW5lbXlCb2FyZCA9IChlbmVteUdhbWVCb2FyZCwgYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICAvKiBSZXR1cm5zIHRydWUgaWYgYSBzaGlwIHdhcyBoaXQgKi9cbiAgICBjb25zdCBzaGlwQXR0YWNrZWQgPSBlbmVteUdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gc2hpcEF0dGFja2VkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhdHRhY2tFbmVteUJvYXJkLFxuICB9XG59XG5cbmNvbnN0IENvbXB1dGVyUGxheWVyID0gKCkgPT4ge1xuXG4gIGNvbnN0IHsgYXR0YWNrRW5lbXlCb2FyZCB9ID0gUGxheWVyKCk7XG5cbiAgY29uc3QgcGlja1JhbmRvbUNvb3JkaW5hdGVzID0gKGVuZW15R2FtZUJvYXJkKSA9PiB7XG4gICAgbGV0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gW3JhbmRvbVgsIHJhbmRvbVldO1xuICAgIHdoaWxlICghZW5lbXlHYW1lQm9hcmQuaXNQb3NpdGlvbkZyZWVUb0F0dGFjayhjb29yZGluYXRlcykpIHtcbiAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29vcmRpbmF0ZXMgPSBbcmFuZG9tWCwgcmFuZG9tWV07XG4gICAgfVxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrRW5lbXlCb2FyZCxcbiAgICBwaWNrUmFuZG9tQ29vcmRpbmF0ZXMsXG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUGxheWVyLCBcbiAgQ29tcHV0ZXJQbGF5ZXIsXG59IiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIHNoaXBDb29yZGluYXRlcykgPT4ge1xuICAvKlxuICAgIEVhY2ggc2hpcCBjb29yZGluYXRlIGlzIHN0b3JlZCBhcyBhIGtleSBpbiB0aGUgb2JqZWN0IHdpdGggdGhlIFxuICAgIHZhbHVlIGJlaW5nIGEgYm9vbGVhbiBzaG93aW5nIHdoZXRoZXIgdGhlIHBvc2l0aW9uIGhhcyBiZWVuIGhpdFxuICAgIG9yIG5vdFxuICAqL1xuICBjb25zdCBzaGlwSGl0cyA9IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgc2hpcEhpdHNbc2hpcENvb3JkaW5hdGVzW2ldXSA9IGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgc2hpcE5hbWVzID0ge1xuICAgIDI6ICdEZXN0cm95ZXInLFxuICAgIDM6ICdDcnVpc2VyJyxcbiAgICA0OiAnQmF0dGxlc2hpcCcsXG4gICAgNTogJ0NhcnJpZXInLFxuICB9XG5cbiAgY29uc3QgZ2V0U2hpcE5hbWUgPSAoKSA9PiBzaGlwTmFtZXNbbGVuZ3RoXTtcblxuICBjb25zdCBoYXNDb29yZGluYXRlcyA9IChhdHRhY2tDb29yZGluYXRlcykgPT4ge1xuICAgIGxldCBtYXRjaEZvdW5kID0gZmFsc2U7XG4gICAgc2hpcENvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrQ29vcmRpbmF0ZXNbMF0gPT09IGNvb3JkaW5hdGVzWzBdIFxuICAgICAgICAmJiBhdHRhY2tDb29yZGluYXRlc1sxXSA9PT0gY29vcmRpbmF0ZXNbMV0pIHtcbiAgICAgICAgICBtYXRjaEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG1hdGNoRm91bmQ7XG4gIH1cblxuICBjb25zdCBoaXQgPSAoYXR0YWNrQ29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBjb29yZGluYXRlc0tleSA9IGF0dGFja0Nvb3JkaW5hdGVzLnRvU3RyaW5nKCk7XG4gICAgc2hpcEhpdHNbY29vcmRpbmF0ZXNLZXldID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwSGl0Qm9vbHMgPSBPYmplY3QudmFsdWVzKHNoaXBIaXRzKTtcbiAgICByZXR1cm4gc2hpcEhpdEJvb2xzLmV2ZXJ5KChib29sKSA9PiBib29sID09PSB0cnVlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0U2hpcE5hbWUsXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBoYXNDb29yZGluYXRlcyxcbiAgICBzaGlwQ29vcmRpbmF0ZXMsXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiY29uc3QgUGFnZUV2ZW50cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHBhZ2VDbGlja0V2ZW50cyA9IChldmVudCwgcGxheWVyLCBwbGF5ZXJHYW1lQm9hcmQsIGVuZW15LCBlbmVteUdhbWVCb2FyZCkgPT4ge1xuXG4gICAgY29uc3QgcGxheWVyTW92ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHhDb29yZGluYXRlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueCwgMTApO1xuICAgICAgY29uc3QgeUNvb3JkaW5hdGUgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC55LCAxMCk7XG4gICAgICBjb25zdCBzaGlwQXR0YWNrZWQgPSBwbGF5ZXIuYXR0YWNrRW5lbXlCb2FyZChlbmVteUdhbWVCb2FyZCwgW3hDb29yZGluYXRlLCB5Q29vcmRpbmF0ZV0pO1xuICAgICAgaWYgKHNoaXBBdHRhY2tlZCkge1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzc2VkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xuICAgICAgY29uc3QgY29tcHV0ZXJDb29yZGluYXRlcyA9IGVuZW15LnBpY2tSYW5kb21Db29yZGluYXRlcyhwbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgY29uc3QgcGxheWVyU2hpcEF0dGFja2VkID0gZW5lbXkuYXR0YWNrRW5lbXlCb2FyZChwbGF5ZXJHYW1lQm9hcmQsIGNvbXB1dGVyQ29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgY29tcHV0ZXJUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHtjb21wdXRlckNvb3JkaW5hdGVzWzBdfVwiXVtkYXRhLXk9XCIke2NvbXB1dGVyQ29vcmRpbmF0ZXNbMV19XCJdYCk7XG4gICAgICBpZiAocGxheWVyU2hpcEF0dGFja2VkKSB7XG4gICAgICAgIGNvbXB1dGVyVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcHV0ZXJUYXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzc2VkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlQ2xhc3NOYW1lID0gKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtjbGFzc05hbWV9YCk7XG4gICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRHYW1lID0gKCkgPT4ge1xuICAgICAgcGxheWVyR2FtZUJvYXJkLmNsZWFyQm9hcmQoKTtcbiAgICAgIGVuZW15R2FtZUJvYXJkLmNsZWFyQm9hcmQoKTtcbiAgICAgIHJlbW92ZUNsYXNzTmFtZSgnbWlzc2VkJyk7XG4gICAgICByZW1vdmVDbGFzc05hbWUoJ2hpdCcpO1xuICAgICAgcmVtb3ZlQ2xhc3NOYW1lKCdzaGlwLXBsYWNlZCcpO1xuXG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdncmlkLXNxdWFyZSBvcHBvbmVudC1zcXVhcmUnKSB7XG4gICAgICBwbGF5ZXJNb3ZlKCk7XG4gICAgICBjb25zdCBwbGF5ZXJXaW4gPSBlbmVteUdhbWVCb2FyZC5pc0dhbWVPdmVyKCk7XG4gICAgICBpZiAocGxheWVyV2luKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGF5ZXIgaGFzIHdvbiB0aGUgZ2FtZSEnKTtcbiAgICAgICAgcmVzZXRHYW1lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb21wdXRlck1vdmUoKTtcbiAgICAgIH0sIDUwMCk7XG5cbiAgICAgIGNvbnN0IGNvbXB1dGVyV2luID0gcGxheWVyR2FtZUJvYXJkLmlzR2FtZU92ZXIoKTtcbiAgICAgIGlmIChjb21wdXRlcldpbikge1xuICAgICAgICBjb25zb2xlLmxvZygnQ29tcHV0ZXIgaGFzIHdvbiB0aGUgZ2FtZSEnKTtcbiAgICAgICAgcmVzZXRHYW1lKCk7XG4gICAgICB9XG4gICAgIFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBhZ2VMaXN0ZW5lcnMgPSAocGxheWVyLCBwbGF5ZXJHYW1lQm9hcmQsIGVuZW15LCBlbmVteUdhbWVCb2FyZCkgPT4ge1xuICAgIC8qIHJlbW92ZSBldmVudCBzdG9wcyB1c2VyIGZyb20gbWFraW5nIGEgbW92ZSB3aGlsZSB3YWl0aW5nIGZvciB0aGUgY29tcHV0ZXIgKi8gXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIHBhZ2VDbGlja0V2ZW50cyhldmVudCwgcGxheWVyLCBwbGF5ZXJHYW1lQm9hcmQsIGVuZW15LCBlbmVteUdhbWVCb2FyZCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIHBhZ2VDbGlja0V2ZW50cyhldmVudCwgcGxheWVyLCBwbGF5ZXJHYW1lQm9hcmQsIGVuZW15LCBlbmVteUdhbWVCb2FyZCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBhZ2VMaXN0ZW5lcnMsXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VFdmVudHM7IiwiaW1wb3J0IEVsZW1lbnRDcmVhdGlvbiBmcm9tICcuLi9lbGVtZW50Q3JlYXRpb24nO1xuXG5jb25zdCByZW5kZXJHcmlkcyA9IChodW1hblNoaXBDb29yZGluYXRlcykgPT4ge1xuICBjb25zdCBncmlkc1NlY3Rpb24gPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnZ3JpZHMtc2VjdGlvbicsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSk7XG4gIGNvbnN0IHBsYXllckdyaWQgPSBFbGVtZW50Q3JlYXRpb24uY3JlYXRlQ2hpbGRFbGVtZW50V2l0aENsYXNzKCdkaXYnLCAnc2hpcHMtZ3JpZCBwbGF5ZXItZ3JpZCcsIGdyaWRzU2VjdGlvbik7XG4gIGNvbnN0IG9wcG9uZW50R3JpZCA9IEVsZW1lbnRDcmVhdGlvbi5jcmVhdGVDaGlsZEVsZW1lbnRXaXRoQ2xhc3MoJ2RpdicsICdzaGlwcy1ncmlkIG9wcG9uZW50LWdyaWQnLCBncmlkc1NlY3Rpb24pO1xuXG4gIGZvciAoIGxldCBpID0gMDsgIGkgPD0gOSA7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDw9IDk7IGogKz0gMSkge1xuICAgICAgY29uc3QgcGxheWVyU3F1YXJlID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2dyaWQtc3F1YXJlIHBsYXllci1zcXVhcmUnLCBwbGF5ZXJHcmlkKTtcbiAgICAgIGNvbnN0IG9wcG9uZW50U3F1YXJlID0gRWxlbWVudENyZWF0aW9uLmNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcygnZGl2JywgJ2dyaWQtc3F1YXJlIG9wcG9uZW50LXNxdWFyZScsIG9wcG9uZW50R3JpZCk7XG4gICAgICBwbGF5ZXJTcXVhcmUuZGF0YXNldC54ID0gajtcbiAgICAgIHBsYXllclNxdWFyZS5kYXRhc2V0LnkgPSBpO1xuICAgICAgb3Bwb25lbnRTcXVhcmUuZGF0YXNldC54ID0gajtcbiAgICAgIG9wcG9uZW50U3F1YXJlLmRhdGFzZXQueSA9IGk7IFxuICAgIH1cbiAgfVxuXG4gIGh1bWFuU2hpcENvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgaHVtYW5Eb21Db29yZGluYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXItc3F1YXJlW2RhdGEteD1cIiR7Y29vcmRpbmF0ZXNbMF19XCJdW2RhdGEteT1cIiR7Y29vcmRpbmF0ZXNbMV19XCJdYCk7XG4gICAgaHVtYW5Eb21Db29yZGluYXRlcy5jbGFzc0xpc3QuYWRkKCdzaGlwLXBsYWNlZCcpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyR3JpZHM7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuZ3JpZHMtc2VjdGlvbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwJSwgLTEwMCUpO1xcbiAgbWF4LXdpZHRoOiA2LjVlbTtcXG4gIGhlaWdodDogMTMuM2VtO1xcbn1cXG4uZ3JpZHMtc2VjdGlvbiAuc2hpcHMtZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIG1hcmdpbi10b3A6IDJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDRlbTtcXG59XFxuLmdyaWRzLXNlY3Rpb24gLmdyaWQtc3F1YXJlIHtcXG4gIGhlaWdodDogMS44ZW07XFxuICB3aWR0aDogMS44ZW07XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcXG4gIGJvcmRlci13aWR0aDogMC4xZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5ncmlkcy1zZWN0aW9uIC5ncmlkLXNxdWFyZS5taXNzZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YW1hcmluZTtcXG59XFxuLmdyaWRzLXNlY3Rpb24gLmdyaWQtc3F1YXJlLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjcmltc29uO1xcbn1cXG4uZ3JpZHMtc2VjdGlvbiAuZ3JpZC1zcXVhcmUuc2hpcC1wbGFjZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuLmdyaWRzLXNlY3Rpb24gLmdyaWQtc3F1YXJlLnNoaXAtcGxhY2VkLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjcmltc29uO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxnQ0FBQTtFQUNBLG9DQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDRjtBQUNFO0VBQ0UsYUFBQTtFQUNBLG1DQUFBO0VBQ0Esc0NBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUVFO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBQUo7QUFHRTtFQUNFLDRCQUFBO0FBREo7QUFJRTtFQUNFLHlCQUFBO0FBRko7QUFLRTtFQUNFLHNCQUFBO0FBSEo7QUFNRTtFQUNFLHlCQUFBO0FBSkpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmdyaWRzLXNlY3Rpb24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogNTAlO1xcbiAgdG9wOiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsIC0xMDAlKTtcXG4gIG1heC13aWR0aDogNi41ZW07XFxuICBoZWlnaHQ6IDEzLjNlbTtcXG5cXG4gIC5zaGlwcy1ncmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBtYXJnaW4tdG9wOiAyZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDRlbTtcXG4gIH1cXG5cXG4gIC5ncmlkLXNxdWFyZSB7XFxuICAgIGhlaWdodDogMS44ZW07XFxuICAgIHdpZHRoOiAxLjhlbTtcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcXG4gICAgYm9yZGVyLXdpZHRoOiAwLjFlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcblxcbiAgLmdyaWQtc3F1YXJlLm1pc3NlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XFxuICB9XFxuXFxuICAuZ3JpZC1zcXVhcmUuaGl0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY3JpbXNvbjtcXG4gIH1cXG5cXG4gIC5ncmlkLXNxdWFyZS5zaGlwLXBsYWNlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICB9XFxuXFxuICAuZ3JpZC1zcXVhcmUuc2hpcC1wbGFjZWQuaGl0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY3JpbXNvbjtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHsgZ2FtZVN0YXJ0IH0gZnJvbSAnLi9nYW1lQ29udHJvbCc7XG5cbmdhbWVTdGFydCgpO1xuIl0sIm5hbWVzIjpbIkVsZW1lbnRDcmVhdGlvbiIsImNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzcyIsInRhZyIsImNsYXNzTmFtZSIsInBhcmVudEVsZW1lbnQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVDaGlsZEVsZW1lbnRXaXRoSWQiLCJpZCIsImNyZWF0ZUNoaWxkRWxlbWVudFdpdGhDbGFzc0FuZElkIiwiU2hpcCIsIkdhbWVCb2FyZCIsInBsYWNlZFNoaXBzIiwibWlzc2VkQXR0YWNrcyIsImhpdEF0dGFja3MiLCJib2FyZFdpZHRoIiwiYm9hcmRIZWlnaHQiLCJpc1Bvc2l0aW9uT2NjdXBpZWQiLCJjb29yZGluYXRlcyIsInBsYWNlZFNoaXBDb29yZGluYXRlcyIsIm1hcCIsInNoaXAiLCJzaGlwQ29vcmRpbmF0ZXMiLCJjb25jYXQiLCJtYXRjaEZvdW5kIiwiZm9yRWFjaCIsImlzQWRqYWNlbnQiLCJjaGVja1giLCJzaGlwWENvb3JkaW5hdGUiLCJjaGVja1kiLCJzaGlwWUNvb3JkaW5hdGUiLCJub25BZGphY2VudENvb3JkaW5hdGVzIiwiZmlsdGVyIiwibGVuZ3RoIiwicGxhY2VTaGlwIiwic3RhcnRDb29yZGluYXRlcyIsImkiLCJwdXNoIiwiYXZhaWxpYWJsZUNvb3JkaW5hdGVzIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja0Nvb3JkaW5hdGVzIiwiYXR0YWNrZWRTaGlwIiwiaGFzQ29vcmRpbmF0ZXMiLCJoaXQiLCJpc0dhbWVPdmVyIiwiZXZlcnkiLCJwbGFjZWRTaGlwIiwiaXNTdW5rIiwiaXNQb3NpdGlvbkZyZWVUb0F0dGFjayIsInBvc2l0aW9uQ2hlY2siLCJmcmVlUG9zaXRpb24iLCJnZXRBbGxDb29yZGluYXRlcyIsImFsbENvb3JkaW5hdGVzIiwiY2xlYXJCb2FyZCIsInNoaXBJbmRleCIsImluZGV4T2YiLCJwb3B1bGF0ZUJvYXJkIiwic2hpcHNQbGFjZWQiLCJyYW5kb21YIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tWSIsIlBsYXllciIsIkNvbXB1dGVyUGxheWVyIiwiUGFnZUV2ZW50cyIsInJlbmRlckdyaWRzIiwiZ2FtZVN0YXJ0IiwiaHVtYW5QbGF5ZXIiLCJodW1hbkJvYXJkIiwiY29tcHV0ZXJQbGF5ZXIiLCJjb21wdXRlckJvYXJkIiwicGFnZUxpc3RlbmVycyIsImF0dGFja0VuZW15Qm9hcmQiLCJlbmVteUdhbWVCb2FyZCIsInNoaXBBdHRhY2tlZCIsInBpY2tSYW5kb21Db29yZGluYXRlcyIsInNoaXBIaXRzIiwic2hpcE5hbWVzIiwiZ2V0U2hpcE5hbWUiLCJjb29yZGluYXRlc0tleSIsInRvU3RyaW5nIiwic2hpcEhpdEJvb2xzIiwiT2JqZWN0IiwidmFsdWVzIiwiYm9vbCIsInBhZ2VDbGlja0V2ZW50cyIsImV2ZW50IiwicGxheWVyIiwicGxheWVyR2FtZUJvYXJkIiwiZW5lbXkiLCJwbGF5ZXJNb3ZlIiwieENvb3JkaW5hdGUiLCJwYXJzZUludCIsInRhcmdldCIsImRhdGFzZXQiLCJ4IiwieUNvb3JkaW5hdGUiLCJ5IiwiY2xhc3NMaXN0IiwiYWRkIiwiY29tcHV0ZXJNb3ZlIiwiY29tcHV0ZXJDb29yZGluYXRlcyIsInBsYXllclNoaXBBdHRhY2tlZCIsImNvbXB1dGVyVGFyZ2V0IiwicXVlcnlTZWxlY3RvciIsInJlbW92ZUNsYXNzTmFtZSIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsInJlc2V0R2FtZSIsInBsYXllcldpbiIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJXaW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImh1bWFuU2hpcENvb3JkaW5hdGVzIiwiZ3JpZHNTZWN0aW9uIiwicGxheWVyR3JpZCIsIm9wcG9uZW50R3JpZCIsImoiLCJwbGF5ZXJTcXVhcmUiLCJvcHBvbmVudFNxdWFyZSIsImh1bWFuRG9tQ29vcmRpbmF0ZXMiXSwic291cmNlUm9vdCI6IiJ9