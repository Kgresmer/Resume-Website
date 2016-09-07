'use strict';

angular.module('mainPage.farkle', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/farkle', {
            templateUrl: 'farkle/farkle.html',
            controller: 'FarkleController'
        });
    }])
    .controller('FarkleController', ['$scope', function ($scope) {

        var getDiceValue = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            var value = Math.floor(Math.random() * (max - min)) + min;
            switch (value) {
                case 1:
                    return 'dice-one';
                    break;
                case 2:
                    return 'dice-two';
                    break;
                case 3:
                    return 'dice-three';
                    break;
                case 4:
                    return 'dice-four';
                    break;
                case 5:
                    return 'dice-five';
                    break;
                case 6:
                    return 'dice-six';
                    break;
            }
        };
        
        $scope.rollDice = function() {
            $scope.dice_one = getDiceValue(1, 6);
            $scope.dice_two = getDiceValue(1, 6);
            $scope.dice_three = getDiceValue(1, 6);
            $scope.dice_four = getDiceValue(1, 6);
            $scope.dice_five = getDiceValue(1, 6);
            $scope.dice_six = getDiceValue(1, 6);
        }

    }]);