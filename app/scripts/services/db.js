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
      if (!ref) { console.log('no ref while getting values'); $location.path('/'); return;}
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
    },

    newItem : function (label, amount, type, date) {
      return {
        label: label,
        amount : amount,
        type: type,
        date: date,
        period_date: function () {
          if(this.type=="O" || this.type=="OC" || this.type=="I" || this.type=="IC") {
            if(new Date(this.date) > new Date()) {
              return this.date;
            } else {
              return (new Date(this.date)).setMonth(new Date().getMonth());
            }
          }
          return this.date;
        }
      }
    },

/*        lines.forEach(function(l) {
          if(l.type=='I' || l.type=='IC' || l.type=='O' || l.type=='OC') {
            var d = new Date(l.date);
            console.log(d);
            console.log('to');
            d.setMonth(sdate.getMonth()-1);
            console.log(d);
            l.date = d.getTime();
          }
        });
*/

    newPeriod : function(id, period_start_date, lines, initial_balance) {
      console.log("Period lines:");
      console.log(lines);
      function isDateInPeriod(date, period_start_date) {
        return new Date(date).getTime() >= period_start_date.getTime();
      }
      return {
        id: id,
        // the date is virtual and shall be recalculated if the type is reccurent or budget
        lines: lines.filter(function(a) {
          return isDateInPeriod(a.date, period_start_date);
        }),
        balance: function() {
          var rv = initial_balance || 0;
          lines.forEach(function(l) {
            if(l.type=='I' || l.type=='i' || l.type=='IC') rv += l.amount;
            else rv -= l.amount;
          });
          return rv;
        }
      };
    }

  };

});
