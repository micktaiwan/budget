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

Period = function(id, period_start_date, lines, initial_balance) {
  var id = id;

  // the date is virtual and shall be recalculated if the type is reccurent or budget
  lines = lines.filter(function(a) {
    return isDateInPeriod(a.date, period_start_date);
  });

  console.log("Period lines:");
  console.log(lines);

  this.balance = function() {
    var rv = initial_balance || 0;
    lines.forEach(function(l) {
      if(l.type=='I' || l.type=='i' || l.type=='IC') rv += l.amount;
      else rv -= l.amount;
    });
    return rv;
  };

  function isDateInPeriod(date, period_start_date) {
    return new Date(date).getTime() >= period_start_date.getTime();
  }

};
