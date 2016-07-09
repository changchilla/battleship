angular.module('myApp.battleship')
  .service('Board', ['Square', 'Ship', 'CONSTANTS', function(Square, Ship, CONSTANTS) {
    var Board = function(gridDim, player) {
      this.belongsTo = player;
      this.grid = [];
      this.gridDim = gridDim;
      this.numShips = 0;
      this.numShipsSunk = 0;
      // initialize board with squares
      for(var i=0; i < gridDim; i++) {
        this.grid.push([]);
        for(var j=0; j < gridDim; j++) {
          this.grid[i].push(new Square());
        }
      }
    };
    var SHIPS = CONSTANTS.SHIPS;

    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomDirection() {
      if(Math.random()<0.25){
        return CONSTANTS.DIRECTIONS.UP;
      } else if(Math.random()<0.5){
        return CONSTANTS.DIRECTIONS.RIGHT;
      } else if(Math.random()<0.75){
        return CONSTANTS.DIRECTIONS.DOWN;
      } else {
        return CONSTANTS.DIRECTIONS.LEFT;
      }
    }

    /**
     * Returns end value of a ship location given a ship starting point, length, and direction
     * @param {Object} start - coordinate for a starting ship point
     * @param {String} direction - direction of the ship from Starting point
     * @param {Number} length - length of the ship
     * @returns {Object} - row/col values of end of ship
     * findEndValue({row:1, col:1}, down, 3) => {row:3, col:1}
     */
    function findEndValue(start, direction, length) {
      var endValue;

      switch(direction) {
        case CONSTANTS.DIRECTIONS.UP:
          endValue = start.row - length + 1;
          break;
        case CONSTANTS.DIRECTIONS.DOWN:
          endValue = start.row + length - 1;
          break;
        case CONSTANTS.DIRECTIONS.RIGHT:
          endValue = start.col + length - 1;
          break;
        case CONSTANTS.DIRECTIONS.LEFT:
          endValue = start.col - length + 1;
          break;
      }
      if (direction === CONSTANTS.DIRECTIONS.UP || direction === CONSTANTS.DIRECTIONS.DOWN) {
        return {row: endValue, col: start.col};
      }
      return {row: start.row, col: endValue}
    }

    /**
     * Checks if a row column value is out of grid bounds
     * @param {Number} gridDim - grid dimension (10 => 10x10)
     * @param {Object} rowColValue - {row: row, col: col}
     * @returns {Boolean}
     */
    function inBounds(gridDim, rowColValue) {
      var row = rowColValue.row;
      var col = rowColValue.col;
      if (row >= gridDim || col >= gridDim  || row < 0 || col < 0) {
        return false;
      }
      return true;
    }

    /**
     * Return array of coordinates for a ship
     * @param {Object} start - {row: row, col: col}
     * @param {Object} end - {row: row, col: col}
     * @param {String} direction - direction of the ship from Starting point
     * @returns {Array} - [{row: row, col:col}, {row: row1, col:col1}...]
     */
    function getCoordinatesBetween(start, end, direction) {
      var rowColValues=[];
      switch(direction) {
        case CONSTANTS.DIRECTIONS.UP:
          for(var i=start.row; i>=end.row; i--) {
            rowColValues.push({row: i, col: start.col});
          }
          break;
        case CONSTANTS.DIRECTIONS.DOWN:
          for(var i=start.row; i<=end.row; i++) {
            rowColValues.push({row: i, col: start.col});
          }
          break;
        case CONSTANTS.DIRECTIONS.RIGHT:
          for(var i=start.col; i<=end.col; i++) {
            rowColValues.push({row: start.row, col: i});
          }
          break;
        case CONSTANTS.DIRECTIONS.LEFT:
          for(var i=start.col; i>=end.col; i--) {
            rowColValues.push({row: start.row, col: i});
          }
          break;
      }
      return rowColValues;
    }

    /**
     * Determine whether a specific row and column already contains a ship
     * @param {Object} grid instance
     * @param {Array} coordinates [{row: row, col:col}, {row: row1, col:col1}]
     * @returns {Boolean}
     */
    function containsShip(grid, coordinates) {
      for(var i=0; i<coordinates.length; i++){
        if(grid[coordinates[i].row][coordinates[i].col].ship) {
          return true;
        }
      }
      return false;
    }

    /**
     * Generate coordinates for a ship
     * @param {Number} length - length of the ship
     * @returns {Array} - array of objects containing row/col values for a ship
     * generateShipCoordinates(2) => [{row: row, col:col}, {row: row1, col:col1}]
     */
    Board.prototype.generateShipCoordinates = function(length) {
      var direction = getRandomDirection();
      var startCoordinate = {row: getRandomIntInclusive(0,this.gridDim -1), col: getRandomIntInclusive(0,this.gridDim -1)};
      var endCoordinate = findEndValue(startCoordinate, direction, length);
      if(!inBounds(this.gridDim, endCoordinate)){
        return this.generateShipCoordinates(length);
      }
      var coordinates = getCoordinatesBetween(startCoordinate, endCoordinate, direction);
      if(containsShip(this.grid, coordinates)){
        return this.generateShipCoordinates(length);
      }
      return coordinates;
    };

    /**
     * Randomly places all ships on the Board
     */
    Board.prototype.addShipsRandomly = function() {
      this.numShips = Object.keys(SHIPS).length;
      for(var key in SHIPS) {
        var shipType = key;
        var shipLength = SHIPS[shipType];
        var shipCoordinates = this.generateShipCoordinates(shipLength);
        var shipObj = new Ship(shipType, shipLength);
        for(var j=0; j<shipCoordinates.length; j++) {
          var coordinate = shipCoordinates[j];
          this.grid[coordinate.row][coordinate.col].ship = shipObj;
          this.grid[coordinate.row][coordinate.col].state = CONSTANTS.SQUARE_STATES.SHIP;
          shipObj.squares.push(this.grid[coordinate.row][coordinate.col]); // this method seems like could/should be moved to ship. ^^ isn't because we need access the the grid's board...unless we want to pass the grid through as a param?
        }
      }
    };

    Board.prototype.allShipsSunk = function() {
      return this.numShips === this.numShipsSunk
    };

    return Board;
}]);