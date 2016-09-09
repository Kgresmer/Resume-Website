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
        const ONE = {image: $scope.imgPrefix + 'dice-one.png', value: 1},
            TWO = {image: $scope.imgPrefix + 'dice-two.png', value: 2},
            THREE = {image: $scope.imgPrefix + 'dice-three.png', value: 3},
            FOUR = {image: $scope.imgPrefix + 'dice-four.png', value: 4},
            FIVE = {image: $scope.imgPrefix + 'dice-five.png', value: 5},
            SIX = {image: $scope.imgPrefix + 'dice-six.png', value: 6};

        var getDiceValue = function () {
            var value = Math.floor(Math.random() * 6) + 1;
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

        $scope.rollDice = function () {
            $scope.farkle = false;
            $scope.straight = false;
            $scope.tempScore = 0;
            $scope.displayDice = [];
            for (var i = 1; i < 7; i++) {
                $scope.dice[i] = getDiceValue();
            }
            getTotalDiceValue();
        };

        var getTotalDiceValue = function () {

            var ones = [], twos = [], threes = [], fours = [], fives = [], sixes = [];

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
            var allDice = [ones, twos, threes, fours, fives, sixes];
            //Check for patterns
            if (checkForStraight(allDice)) {
                
            } else {
                checkForMultiples(allDice);
                if ($scope.tempScore === 0) {
                    $scope.farkle = true;
                }
                $scope.totalScore += $scope.tempScore;
            }
        };

        var checkForStraight = function (arrays) {
            if (arrays[0].length === 1 && arrays[1].length === 1 && arrays[2].length === 1
                && arrays[3].length === 1 && arrays[4].length === 1 && arrays[5].length === 1) {
                $scope.tempScore += 1500;
                $scope.straight = true;
                $scope.displayDice = [ONE, TWO, THREE, FOUR, FIVE, SIX];
                $scope.totalScore += $scope.tempScore;
                return true;
            } else {
                return false;
            }
        };

        //Search for common values
        var checkForMultiples = function (allDiceArrays) {
            var numberOfPairs = 0;
            var pairArrays = [];
            for (var j = 0; j < 6; j++) {
                var currentNumberArray = allDiceArrays[j];
                if (currentNumberArray.length === 0) {
                    continue;
                }

                if (currentNumberArray.length === 6) {
                    $scope.tempScore = currentNumberArray[0] * 400;
                    addToDisplay(currentNumberArray[0], 6);
                } else if (currentNumberArray.length === 5) {
                    $scope.tempScore += currentNumberArray[0] * 300;
                    addToDisplay(currentNumberArray[0], 5);
                } else if (currentNumberArray.length === 4) {
                    $scope.tempScore += currentNumberArray[0] * 200;
                    addToDisplay(currentNumberArray[0], 4);
                } else if (currentNumberArray.length === 3) {
                    if (currentNumberArray[0] === 1) {
                        $scope.tempScore += 1000;
                    } else {
                        $scope.tempScore += currentNumberArray[0] * 100;
                    }
                    addToDisplay(currentNumberArray[0], 3);
                } else if (currentNumberArray.length === 2) {
                    numberOfPairs += 1;
                    addToDisplay(currentNumberArray[0], 2);
                    pairArrays.push(currentNumberArray);
                } else if (currentNumberArray.length === 1) {
                    addToDisplay(currentNumberArray[0], 1);
                    if (currentNumberArray[0] === 1) {
                        $scope.tempScore += 100;
                    } else if (currentNumberArray[0] === 5) {
                        $scope.tempScore += 50;
                    }
                }
            }
            if (numberOfPairs === 3) {
                $scope.tempScore += 1500;
            } else {
                for (var i = 0; i < pairArrays.length; i++) {
                    var current = pairArrays[i];
                    if (current[0] === 1) {
                        $scope.tempScore += 200;
                    } else if (current[0] === 5) {
                        $scope.tempScore += 100;
                    }
                }
            }
        };

        var addToDisplay = function (value, count) {
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