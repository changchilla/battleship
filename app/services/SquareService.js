angular.module('myApp.battleship')
  .service('Square', ['CONSTANTS', function(CONSTANTS) {
    var Square = function() {
      this.state = CONSTANTS.SQUARE_STATES.NO_SHIP;
    };
    Square.prototype.attack = function() {
      if(this.state === CONSTANTS.SQUARE_STATES.HIT || this.state === CONSTANTS.SQUARE_STATES.MISS) {
        throw new Error('already attacked this');
      }
      if(this.state === CONSTANTS.SQUARE_STATES.SHIP) {
        this.state = CONSTANTS.SQUARE_STATES.HIT;
      } else {
        this.state = CONSTANTS.SQUARE_STATES.MISS;
      }
      return this.state;
    };

    return Square;
  }]);