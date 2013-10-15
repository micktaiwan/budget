/*

TODO:
- dynamic data
- form validation
- color the amounts in the timeline
- correct datepicker
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

    $scope.addItem = function() {
    	$scope.lines.push({label: $scope.label, amount: $scope.amount, type: $scope.type, date: $scope.date});
    	};

  });
