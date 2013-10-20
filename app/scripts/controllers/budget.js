/*

TODO:
- get rif of labelClass and use ng_class instead
- algorithm
    need to have a period object (default to the month) and a start date (begining of the period)
    analyse current day date and determine first period
    then add all amounts for the next period taking into account their type
      caution the date is virtual if the type is reccurent or budget
    store the result in a 'balance' item associated to the period and inject it to the next period
- initialize current balance by asking the user how much he have now on his account
    or simply edit the balance item
- deploy on github pages ! :)
- form validation
- correct datepicker
- unit tests !

*/
'use strict';

angular.module('budgetApp')
  .controller('BudgetCtrl', function ($scope, $location, Db, Google, SeqNumber) {

    if(Google.getUser() == null) {
      $location.path('/');
      return;
    }

    $scope.user = Google.getUser();
    $scope.lines = [];
    $scope.periods = [];

    Db.onValues(function(values) {
      var lines = [];
      for(var i in values) {
        lines.push(Db.newItem(i, values[i].label, values[i].amount, values[i].type, values[i].date));
      };
      $scope.periods = [];
      $scope.periods.push(Db.newPeriod(SeqNumber.new(), new Date('10-01-2013'), lines, 0));
      $scope.periods.push(Db.newPeriod(SeqNumber.new(), new Date('11-01-2013'), lines, $scope.periods[0].balance()));
      $scope.periods.push(Db.newPeriod(SeqNumber.new(), new Date('12-01-2013'), lines, $scope.periods[1].balance()));
      console.log('balance: ' + $scope.periods[$scope.periods.length-1].balance());
    });

    $scope.addItem = function(label, amount, type, date) {
      Db.addItem(label, amount, type, date);
  	};

    $scope.deleteItem = function(id) {
      var item = findItemById(id);
      $scope.label  = item.label;
      $scope.amount = item.amount;
      var d         = new Date(item.date);
      $scope.date   = (d.getMonth()+1) + "-" + d.getDate() + "-" + d.getFullYear();
      Db.deleteItem(id);
    };

    var findItemById = function(id) {
      for(var i in $scope.lines) {
        if($scope.lines[i].id == id) {
          return $scope.lines[i];
        }
      }
      return null;
    };


  });
