/*

TODO:
- dynamic data
- initialize current balance by asking the user how much he have now on his account
- timeline
- one time in/outcome with date ( to be able to remember checks in the future)
- unit tests !

*/
'use strict';

angular.module('budgetApp')
  .controller('BudgetCtrl', function ($scope, Db) {
    $scope.lines = Db.getLines();

    $scope.incomeTotal  = $scope.lines.filter(function(a){return a.type=='I' || a.type=='i'}).reduce(function(a,b) {return a+b.amount;}, 0);
    $scope.outcomeTotal = $scope.lines.filter(function(a){return a.type=='O' || a.type=='o'}).reduce(function(a,b) {return a+b.amount;}, 0);

  });
