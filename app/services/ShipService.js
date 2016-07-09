angular.module('myApp.battleship')
  .service('Ship', ['CONSTANTS', function(CONSTANTS){
  var Ship = function(type, length){
    this.type = type;
    this.length = length;
    this.squares = [];
  };

  Ship.prototype.isSunk = function() {
    for(var i=0; i<this.squares.length; i++) {
      if(this.squares[i].state !== CONSTANTS.SQUARE_STATES.HIT) {
        return false;
      }
    }
    return true;
  };

  return Ship;
}]);