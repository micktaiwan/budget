/*

TODO:
- dynamic data
- introduces dates for income and outcome
  - what to do with general amount like "food"
- introduces reccurent concept
	- why limit to month ?
- initialize current solde by asking the user how much he have now on his account

*/
'use strict';

angular.module('budgetApp')
  .controller('BudgetCtrl', function ($scope) {
    $scope.incomes = [
    { label: 'Salaire', amount: 1000},
    { label: 'Location', amount: 100}
    ];
    $scope.outcomes = [
    { label: 'Bouffe', amount: 100},
    { label: 'Enfants', amount: 200},
    { label: 'Appart', amount: 300}
    ];

    $scope.incomeTotal  = $scope.incomes.reduce  (function(a,b) {return a+b.amount;}, 0);
    $scope.outcomeTotal = $scope.outcomes.reduce (function(a,b) {return a+b.amount;}, 0);

  });
