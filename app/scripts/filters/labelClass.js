angular.module('budgetApp.filters.labelClass', [])
  .filter('labelClass', ['$rootScope', function($rootScope) {
    return function(item) {
      if(item.type=="O") {
        return 'r_outcome glyphicon glyphicon-repeat';
      } else if(item.type=="OC") {
        return 'c_outcome glyphicon glyphicon-folder-open';
      } else if(item.type=="o") {
        return 'o_outcome glyphicon glyphicon-minus';
      } else if(item.type=="I") {
        return 'r_income glyphicon glyphicon-repeat';
      } else if(item.type=="IC") {
        return 'c_income glyphicon glyphicon-folder-open';
      } else if(item.type=="i") {
        return 'o_income glyphicon glyphicon-plus';
      }
    return '';
    };
  }]);
