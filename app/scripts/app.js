'use strict';

angular.module('budgetApp', [
        'budgetApp.services.db',
        'budgetApp.filters.dateDelta',
        'budgetApp.filters.typeClass',
        'google'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
        .when('/budget', {
            templateUrl: 'views/budget.html',
            controller: 'BudgetCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
