angular.module('budgetApp.services.period', []).factory('period', function($rootScope) {

  var seq_num = Seqnum.new();

  return {

    balance : function() {
      return 0;
    }

  };

});