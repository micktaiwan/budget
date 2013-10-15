/*

TODO:
- it seems that we are not logged after reload
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
  .controller('BudgetCtrl', function ($scope, $location, Db, Google) {

    if(Google.getUser() == null) {
        $location.path('/');
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
    	//$scope.lines.push({label: $scope.label, amount: $scope.amount, type: $scope.type, date: $scope.date});
    	Db.addItem($scope.label, $scope.amount, $scope.type, $scope.date);
    	};;

  });
