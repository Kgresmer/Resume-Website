angular.module('mainPage.skills', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/skills', {
            templateUrl: 'skills/skills.html',
            controller: 'SkillsController'
        });
    }])
    .controller('SkillsController', ['$scope', '$http', function ($scope, $http) {
        $http.get('json/templates.json').then(function (response) {
            $scope.templates = response.data;
        }, function errorCallback(response) {
            console.log('Error' + response);
        });
    }]);