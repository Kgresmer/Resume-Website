'use strict';

// Declare app level module which depends on views, and components
angular.module('mainPage', [
    'ngRoute',
    'mainPage.home',
    'mainPage.resume',
    'mainPage.work',
    'mainPage.contact',
    'mainPage.algorithm',
    'mainPage.farkle'
])
    .config(['$locationProvider', '$routeProvider', 
        function ($locationProvider, $routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .controller('mainCtrl', ['$scope', function ($scope) {
        $scope.$on('$locationChangeStart', function (event, next, current) {
            if(next.search('work') > -1) {
                $scope.headshot = 'img/headshot3.jpg';
            } else if(next.search('resume') > -1) {
                $scope.headshot = 'img/headshot.jpg';
            } else if(next.search('contact') > -1) {
                $scope.headshot = 'img/headshot2.jpg';
            } else {
                $scope.headshot = 'img/headshot4.jpg';
            }
        });
    }]);
