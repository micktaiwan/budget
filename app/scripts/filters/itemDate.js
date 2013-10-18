angular.module('budgetApp.filters.itemDate', [])
  .filter('itemDate', ['$rootScope',  function($rootScope) {
    return function(item) {
      if(item.type=="O" || item.type=="OC" || item.type=="I" || item.type=="IC") {
      	if(new Date(item.date) > new Date()) {
          return new Date(item.date);
      	} else {
	        return (new Date(item.date)).setMonth(new Date().getMonth());
	  	  }
      }
      return new Date(item.date);
    };
  }]);
