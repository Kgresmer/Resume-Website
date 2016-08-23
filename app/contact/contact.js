'use strict';

angular.module('mainPage.contact', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'contact/contact.html',
            controller: 'ContactController'
        });
    }])
    .controller('ContactController', [function () {

    }]);