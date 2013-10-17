angular.module('budgetApp.services.seqNumber', []).factory('SeqNumber', function($rootScope) {

  var seq_num = 0;

  return {
    new : function() {
      seq_num += 1;
      console.log("seq number: "+seq_num);
      return seq_num;
    }
  };

});