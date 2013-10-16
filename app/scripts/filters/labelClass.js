angular.module('budgetApp.filters.labelClass', [])
  .filter('labelClass', ['$rootScope', function($rootScope) {
    return function(item) {
      if(item.type=="O") {
        return 'r_outcome';
      } else if(item.type=="OC") {
        return 'c_outcome';
      } else if(item.type=="o") {
        return 'o_outcome';
      } else if(item.type=="I") {
        return 'r_income';
      } else if(item.type=="IC") {
        return 'c_income';
      } else if(item.type=="i") {
        return 'o_income';
      }
    return '';
    };
  }]);
