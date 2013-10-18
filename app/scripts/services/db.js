angular.module('budgetApp.services.db', []).factory('Db', function($rootScope, $location) {

  var ref;
  var firstConnection = true;

  return {

    initAccount : function(user_id) {
      console.log("user_id: "+user_id);
      ref = new Firebase('https://mick-budget.firebaseio.com/'+user_id);
      console.log("ref: "+ref);
    },

    onValues : function(callbackSuccess) {
      if (typeof ref == 'undefined') { console.log('no ref while getting values'); $location.path('/'); return;}
      ref.on('value', function(snapshot) {
        if(snapshot.val() !== null) {
            if(firstConnection){
                $rootScope.$apply(function(){
                    callbackSuccess(snapshot.val());
                });
            } else {
                callbackSuccess(snapshot.val());
            }
        }
        firstConnection = false;
      });
    },

    addItem : function(label, amount, type, date) {
      console.log('Db.addItem '+ label + ", " + amount + ", " + type + ", " + date);
      date = (new Date(date)).getTime();
      console.log(date);
      ref.push({label: label, amount: parseInt(amount), type: type, date: date});
    },

    remove : function(id){
        ref.child(id).remove();
    }

  };

});