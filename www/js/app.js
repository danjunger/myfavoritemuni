'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MFM', ['ionic',
  'mfm.services.nextmuni',
  'mfm.controllers.home',
  'mfm.controllers.addfav',
  'mfm.controllers.edit',
  'mfm.services.storage',
  'mfm.services.cache'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: 'HomeCtrl'
    })
    .state('add', {
      url: "/add",
      templateUrl: "templates/addfav.html",
      controller: 'AddFavCtrl'
    })
    .state('edit', {
      url: "/edit",
      templateUrl: "templates/edit.html",
      controller: 'EditCtrl'
    })
    
    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("/home");
})