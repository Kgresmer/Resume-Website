'use strict';

angular.module('mainPage.resume', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/resume', {
    templateUrl: 'resume/resume.html',
    controller: 'ResumeController'
  });
}])

.controller('ResumeController', ['$scope', '$http', function($scope, $http) {
  $http.get('json/experience.json')
      .then(function(response) {
          $scope.jobs = response.data;
      });
}]);