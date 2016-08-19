'use strict';

angular.module('mainPage.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController', [ function () {
        
    }]);
