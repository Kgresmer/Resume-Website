angular.module('mainPage.skills', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/skills', {
            templateUrl: 'skills/skills.html',
            controller: 'SkillsController'
        });
    }])
    .controller('SkillsController', ['$scope', '$http', function ($scope, $http) {
        
    }]);