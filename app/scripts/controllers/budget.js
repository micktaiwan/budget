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
- delete a item
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
      $.map(values,function(v,k){return v;}).forEach(function(i){
        $scope.lines.push(Db.newItem(i.label, i.amount, i.type, i.date));
      });
      $scope.periods.push(Db.newPeriod(SeqNumber.new(), new Date('11-01-2013'), $scope.lines));
      $scope.incomeTotal  = $scope.lines.filter(function(a){return a.type=='I' || a.type=='i' || a.type=='IC'}).reduce(function(a,b) {return a+parseInt(b.amount);}, 0);
      $scope.outcomeTotal = $scope.lines.filter(function(a){return a.type=='O' || a.type=='o' || a.type=='OC'}).reduce(function(a,b) {return a+parseInt(b.amount);}, 0);
      console.log('balance: ' + $scope.periods[0].balance());
    });

    $scope.addItem = function(label, amount, type, date) {
      Db.addItem(label, amount, type, date);
  	};
    $scope.deleteItem = function(id) {
      console.log(id);
      //Db.addItem(label, amount, type, date);
    };

  });
