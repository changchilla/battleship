angular.module('myApp.battleship')
.constant('CONSTANTS', (function(){
  return {
    BOARD_SIZE: 10,
    DIRECTIONS: {UP: 'up', DOWN: 'down', RIGHT: 'right', LEFT: 'left'},
    SHIPS: {aircraft: 5, battleship: 4, submarine: 3, destroyer: 2, patrolboat:2},
    SQUARE_STATES: {HIT: 'hit', MISS: 'miss', NO_SHIP: 'no_ship', SHIP: 'ship'},
  }
})());