angular.module('budgetApp.filters.typeClass', [])
  .filter('typeClass', ['$rootScope', function($rootScope) {
    return function(type) {
      if(type == 'O' || type == 'OC' || type == 'o') {
        return 'amount outcome'
      } else {
        return 'amount income'
      }
    };
  }]);
