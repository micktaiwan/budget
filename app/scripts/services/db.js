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
      ref.push({label: label, amount: parseInt(amount), type: type, date: date});
    },

    deleteItem : function(id){
        ref.child(id).remove();
    },

    newItem : function (id, label, amount, type, date) {
      return {
        id: id,
        label: label,
        amount : amount,
        type: type,
        date: new Date(date),
        period_date: function (period_start_date) {
          if(!period_start_date) {period_start_date = new Date();}
          if(this.type=="O" || this.type=="OC" || this.type=="I" || this.type=="IC") {
            if(new Date(this.date) > period_start_date) {
              return this.date;
            } else {
              return (new Date(this.date)).setMonth(period_start_date.getMonth());
            }
          }
          return this.date;
        }
      }
    },

    newPeriod : function(id, period_start_date, slines, initial_balance) {
      // TODO: the date is virtual and shall be recalculated if the type is reccurent or budget
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
        ];
      var _id = id;
      var _lines = slines.filter(function(item) {
        return isDateInPeriod(item, period_start_date);
      });
      function isDateInPeriod(item, period_start_date) {
        if(item.date < period_start_date.getTime() && (item.type=='I' || item.type=='IC' || item.type=='O' || item.type=='OC'))
          return true;
        else
          d =  new Date(item.date).getTime();
        period_end_date = (new Date(period_start_date)).setMonth(period_start_date.getMonth()+1);
        return d >= period_start_date.getTime() && d < period_end_date;
      };
      return {
        id: _id,
        start_date: new Date(period_start_date),
        lines: _lines,
        initial_balance: initial_balance,
        name: monthNames[period_start_date.getMonth()],
        balance: function() {
          var rv = initial_balance || 0;
          _lines.forEach(function(l) {
            if(l.type=='I' || l.type=='i' || l.type=='IC') rv += l.amount;
            else rv -= l.amount;
          });
          return rv;
        },
        incomeTotal: function() {return _lines.filter(function(a){return a.type=='I' || a.type=='i' || a.type=='IC'}).reduce(function(a,b) {return a+parseInt(b.amount);}, 0)},
        outcomeTotal: function() {return _lines.filter(function(a){return a.type=='O' || a.type=='o' || a.type=='OC'}).reduce(function(a,b) {return a+parseInt(b.amount);}, 0)}
      };
    }

  };

});
