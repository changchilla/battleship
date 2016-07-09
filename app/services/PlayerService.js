angular.module('myApp.battleship')
  .service('Player', [function() {
    var Player = function(name) {
      this.name = name;
    };
    
    return Player;
  }]);