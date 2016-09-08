'use strict';

angular.module('mainPage.farkle', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/farkle', {
            templateUrl: 'farkle/farkle.html',
            controller: 'FarkleController'
        });
    }])
    .controller('FarkleController', ['$scope', '$location', function ($scope, $location) {


        $scope.imgPrefix = $location.absUrl().includes('kgresmer.github') ? 'img/' : '../img/';
        $scope.totalScore = 0;
        $scope.dice = [];
        const ONE = { image: $scope.imgPrefix + 'dice-one.png', value: 1 },
            TWO = { image: $scope.imgPrefix + 'dice-two.png', value: 2},
            THREE = { image: $scope.imgPrefix + 'dice-three.png', value: 3},
            FOUR = { image: $scope.imgPrefix + 'dice-four.png', value: 4},
            FIVE = { image: $scope.imgPrefix + 'dice-five.png', value: 5},
            SIX = { image: $scope.imgPrefix + 'dice-six.png', value: 6};

        var getDiceValue = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            var value = Math.floor(Math.random() * (max - min)) + min;
            switch (value) {
                case 1:
                    return ONE;
                    break;
                case 2:
                    return TWO;
                    break;
                case 3:
                    return THREE;
                    break;
                case 4:
                    return FOUR;
                    break;
                case 5:
                    return FIVE;
                    break;
                case 6:
                    return SIX;
                    break;
            }
        };
        
        $scope.rollDice = function() {
            $scope.tempScore = 0;
            $scope.displayDice = [];
            for (var i = 1; i < 7; i++) {
                $scope.dice[i] = getDiceValue(1, 6);
            }
            $scope.getDiceValue();
        };

        $scope.getDiceValue = function() {

            var ones = [], twos = [], threes = [], fours = [], fives = [], sixes = [];
            var allDice = [ones, twos, threes, fours, fives, sixes];
            //Store the values in separate arrays to search for patterns
            for (var i = 1; i < 7; i++) {
                switch ($scope.dice[i].value) {
                    case 1:
                        ones.push($scope.dice[i].value);
                        continue;
                    case 2:
                        twos.push($scope.dice[i].value);
                        continue;
                    case 3:
                        threes.push($scope.dice[i].value);
                        continue;
                    case 4:
                        fours.push($scope.dice[i].value);
                        continue;
                    case 5:
                        fives.push($scope.dice[i].value);
                        continue;
                    case 6:
                        sixes.push($scope.dice[i].value);
                }
            }
            //Check for patterns
            for (var j = 1; j < 7; j++) {
                checkForMultiples(allDice[j]);
            }

            $scope.totalScore += $scope.tempScore;
        };

        //Search for common values
        var checkForMultiples = function(array) {
            if (array.length === 6) {
                $scope.tempScore = array[0] * 600;
                addToDisplay(array[0], 6);
            } else if (array.length === 5) {
                $scope.tempScore += array[0] * 500;
                addToDisplay(array[0], 5);
            } else if (array.length === 4) {
                $scope.tempScore += array[0] * 400;
                addToDisplay(array[0], 4);
            } else if (array.length === 3) {
                if (array[0] === 1) {
                    $scope.tempScore += 1000;
                } else {
                    $scope.tempScore += array[0] * 300;
                }
                addToDisplay(array[0], 3);
            } else if (array.length === 2) {
                addToDisplay(array[0], 2);
                //check for 3 pairs
                //else add ones and fives
            } else if (array.length === 1) {
                addToDisplay(array[0], 1);
                if (array[0] === 1) {
                    $scope.tempScore += 100;
                } else if (array[0] === 5) {
                    $scope.tempScore += 50;
                }
            }
        };

        var addToDisplay = function(value, count) {
            for (var i = 0; i < count; i++) {
                switch (value) {
                    case 1:
                        $scope.displayDice.push(ONE);
                        continue;
                    case 2:
                        $scope.displayDice.push(TWO);
                        continue;
                    case 3:
                        $scope.displayDice.push(THREE);
                        continue;
                    case 4:
                        $scope.displayDice.push(FOUR);
                        continue;
                    case 5:
                        $scope.displayDice.push(FIVE);
                        continue;
                    case 6:
                        $scope.displayDice.push(SIX);
                }
            }
        }

    }]);