/*

TODO:
- algorythm
    need to have a period object (default to the month) and a start date (begining of the period)
    analyse current day date and determine first period
    then add all amounts for the next period taking into account their type
      caution the date is virtual if the type is reccurent or budget
    store the result in a temp variable 'balance' associated to the period and inject it to the next period
- delete a item
- form validation
- initialize current balance by asking the user how much he have now on his account
- timeline
- correct datepicker
- one time in/outcome with date (to be able to remember checks in the future)
- unit tests !

*/
'use strict';

angular.module('budgetApp')
  .controller('BudgetCtrl', function ($scope, $location, Db, Google) {

    if(Google.getUser() == null) {
      $location.path('/');
      return;
    }

    $scope.user = Google.getUser();
    $scope.lines = [];

    Db.onValues(function(values) {
      console.log(values);
      $scope.lines = $.map(values,function(v,k){return v;});;
      $scope.incomeTotal  = $scope.lines.filter(function(a){return a.type=='I' || a.type=='i' || a.type=='IC'}).reduce(function(a,b) {return a+parseInt(b.amount);}, 0);
      $scope.outcomeTotal = $scope.lines.filter(function(a){return a.type=='O' || a.type=='o' || a.type=='OC'}).reduce(function(a,b) {return a+parseInt(b.amount);}, 0);
    });

    //$scope.lines = Db.getLines();

    $scope.addItem = function() {
      Db.addItem($scope.label, $scope.amount, $scope.type, $scope.date);
/*      if(String(add_form.elements.type.value) != "undefined") {
      Db.addItem($scope.label, $scope.amount, $scope.type, $scope.date);
    }
    else
    {
      alert('not valid');
    }*/
  	//$scope.lines.push({label: $scope.label, amount: $scope.amount, type: $scope.type, date: $scope.date});
  	};;

  });
