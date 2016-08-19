'use strict';

angular.module('mainPage.resume', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/resume', {
    templateUrl: 'resume/resume.html',
    controller: 'ResumeController'
  });
}])

.controller('ResumeController', [function() {

}]);