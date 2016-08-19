'use strict';

angular.module('mainPage.work', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/work', {
    templateUrl: 'work/work.html',
    controller: 'WorkController'
  });
}])

.controller('WorkController', [function() {

}]);