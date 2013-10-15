angular.module('budgetApp.services.db', []).factory('Db', function($rootScope) {

  var ref;
  var firstConnection = true;

  return {

    initAccount : function(user_id){
        ref = new Firebase('https://mick-budget.firebaseio.com/'+user_id);
    },

    onValues : function(callbackSuccess){
        ref.on('value', function(snapshot) {
            if(snapshot.val() !== null) {
                if(firstConnection){
                    $rootScope.$apply(function(){
                        callbackSuccess(snapshot.val());
                    });
                }else{
                    callbackSuccess(snapshot.val());
                }
            }
            firstConnection = false;
        });
    },

    addItem : function(label, amount, type, date){
        ref.push({type: type, label: label, amount: amount, date: date});
    },

    getLines: function() {
      return [
      { type: 'I', label: 'Salaire', amount: 1000, date: '2013-10-03'},
      { type: 'I', label: 'Location', amount: 100, date: '2013-10-05'},
      { type: 'Oc', label: 'Bouffe', amount: 100},
      { type: 'Oc', label: 'Enfants', amount: 200, date: '2013-10-05'},
      { type: 'O', label: 'Appart', amount: 300, date: '2013-10-25'},
      { type: 'O', label: 'Dentiste', amount: 300, date: '2013-10-25', check: '200934'}
      ];
    },

    remove : function(id){
        ref.child(id).remove();
    }

/*    setDone : function(id, done){
      ref.child(id).update({
          done : done
      });
    },

    setText : function(id, text){
      ref.child(id).update({
          text : text
      });
    }*/
  };

});