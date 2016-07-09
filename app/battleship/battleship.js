'use strict';

angular.module('myApp.battleship', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/battleship', {
      templateUrl: 'battleship/battleship.html',
      controller: 'BattleshipCtrl'
    });
  }])
  .controller('BattleshipCtrl', ['Square', 'Player', 'Board', '$scope', 'CONSTANTS', function(Square, Player, Board, $scope, CONSTANTS) {
    var player1, board1, player2, board2;
    $scope.canTakeTurn = true;
    $scope.showDebugBoard = false;
    $scope.toggleDebugBoard = function() {
      $scope.showDebugBoard = !$scope.showDebugBoard;
    };
    $scope.init = function(){
      $scope.gameOver = false;
      player1 = new Player('Player 1');
      board1 = new Board(CONSTANTS.BOARD_SIZE, player1);
      board1.addShipsRandomly();
      player2 = new Player('Player 2');
      board2 = new Board(CONSTANTS.BOARD_SIZE, player2);
      board2.addShipsRandomly();

      $scope.currentTurn = {
        playerBoard: board1,
        opponentBoard: board2
      }
    };

    $scope.switchTurns = function() {
      $scope.attackResult = null;
      $scope.shipSunk = null;

      if($scope.currentTurn.playerBoard.belongsTo === player1) {
        $scope.currentTurn = {
          playerBoard: board2,
          opponentBoard: board1
        }
      } else {
        $scope.currentTurn = {
          playerBoard: board1,
          opponentBoard: board2
        }
      }
    };
    
    $scope.takeATurn = function(square) {
      if($scope.attackResult) {
        alert('Please switch players');
        return;
      }
      if($scope.gameOver) {
        alert('The game is over!');
        return;
      }
      $scope.attackResult = square.attack();
      // check if attack led to ship being sunk
      if(square.ship && square.ship.isSunk()) {
        $scope.currentTurn.opponentBoard.numShipsSunk++;
        $scope.shipSunk = square.ship.type;
      }
      // check if all ships have been sunk
      if($scope.currentTurn.opponentBoard.allShipsSunk()){
        $scope.gameOver = true;
      }
    };
  }]);