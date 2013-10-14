'use strict';

angular.module('budgetApp')
  .controller('LoginCtrl', function ($rootScope, $location, Google, Db) {

    Google.login(function(){
      $rootScope.$apply(function(){
        Db.initAccount(Google.getUser().id);
        $location.path('budget');
      });
    });

  });
