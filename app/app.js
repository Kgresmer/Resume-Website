'use strict';

// Declare app level module which depends on views, and components
angular.module('mainPage', [
    'ngRoute',
    'ngAnimate',
    'mainPage.home',
    'mainPage.resume',
    'mainPage.skills',
    'mainPage.work'
])
    .config(['$locationProvider', '$routeProvider', 
        function ($locationProvider, $routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .controller('mainCtrl', ['$scope', function ($scope) {
        $scope.$on('$locationChangeStart', function (event, next, current) {
            if(next.includes('work')) {
                $scope.headshot = 'img/headshot3.jpg';
            } else if(next.includes('resume')) {
                $scope.headshot = 'img/headshot.jpg';
            } else {
                $scope.headshot = 'img/headshot4.jpg';
            }
        });
    }]);
