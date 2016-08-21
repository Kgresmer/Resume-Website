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

    $scope.javaSquares = [{}, {}, {}, {}, {}, {}];
    $scope.springSquares = [{}, {}, {}, {}, {}];
    $scope.axonSquares = [{}, {}, {}, {}, {}];
    $scope.kafkaSquares = [{}, {}, {}, {}, {}];
    $scope.nodeSquares = [{}, {}, {}, {}, {}];
    $scope.gruntSquares = [{}, {}, {}, {}, {}];
    $scope.bowerSquares = [{}, {}, {}, {}, {}];
    $scope.angularSquares = [{}, {}, {}, {}, {}];
    $scope.typeSquares = [{}, {}, {}, {}, {}];
    $scope.javascriptSquares = [{}, {}, {}, {}, {}];
    $scope.sassSquares = [{}, {}, {}, {}, {}];
    $scope.cssSquares = [{}, {}, {}, {}, {}];
    $scope.htmlSquares = [{}, {}, {}, {}, {}];
    $scope.h2Squares = [{}, {}, {}, {}, {}];
    $scope.db2Squares = [{}, {}, {}, {}, {}];
    $scope.postSquares = [{}, {}, {}, {}, {}];
}]);