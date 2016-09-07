'use strict';

angular.module('mainPage.farkle', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/farkle', {
            templateUrl: 'farkle/farkle.html',
            controller: 'FarkleController'
        });
    }])
    .controller('FarkleController', ['$scope', '$location', function ($scope, $location) {


        $scope.imgPrefix = $location.path().includes('kgresmer.github') ? 'img/' : '../img/';
        $scope.tempScore = 0;
        $scope.totalScore = 0;

        var getDiceValue = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            var value = Math.floor(Math.random() * (max - min)) + min;
            switch (value) {
                case 1:
                    return {
                        image: $scope.imgPrefix + 'dice-one.png',
                        value: 1
                    };
                    break;
                case 2:
                    return {
                        image: $scope.imgPrefix + 'dice-two.png',
                        value: 2
                    };
                    break;
                case 3:
                    return {
                        image: $scope.imgPrefix + 'dice-three.png',
                        value: 3
                    };
                    break;
                case 4:
                    return {
                        image: $scope.imgPrefix + 'dice-four.png',
                        value: 4
                    };
                    break;
                case 5:
                    return {
                        image: $scope.imgPrefix + 'dice-five.png',
                        value: 5
                    };
                    break;
                case 6:
                    return {
                        image: $scope.imgPrefix + 'dice-six.png',
                        value: 6
                    };
                    break;
            }
        };
        
        $scope.rollDice = function() {
            $scope.dice = [];
            for (var i = 1; i < 7; i++) {
                $scope.dice[i] = getDiceValue(1, 6);
            }
            $scope.getDiceValue();
        };

        $scope.getDiceValue = function() {
            var totalValue = 0;
            for (var i = 1; i < $scope.dice.length + 1; i++) {
                if (!$scope.dice[i]) {
                    continue;
                }
                //check for
                // 6 of a kind
                // straight
                // two triples
                // three doubles
                

                if ($scope.dice[i].value === 1) {
                    totalValue += 100;
                } else if ($scope.dice[i].value === 5) {
                    totalValue += 50;
                }
            }
            $scope.tempScore = totalValue;
            $scope.totalScore += totalValue;
        }
        
        

    }]);