'use strict';

// Declare app level module which depends on views, and components
angular.module('mainPage', [
  'ngRoute',
  'mainPage.home',
  'mainPage.resume',
  'mainPage.skills',
  'mainPage.work'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
