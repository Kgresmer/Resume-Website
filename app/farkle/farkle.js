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
        $scope.rolledDice = [];
        $scope.selectedDice = [];
        $scope.roundScore = 0;
        $scope.emptyDisplayArray = [{},{},{},{},{},{}];
        $scope.totalDiceAvailableToRoll = 6;
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
            $scope.roundScore = 0;
            $scope.displayDice = [];
            $scope.rolledDice = [];
            for (var i = 0; i < $scope.totalDiceAvailableToRoll; i++) {
                $scope.rolledDice[i] = getDiceValue();
            }
            var diceWithNumbers = giveDiceValue($scope.rolledDice);
            var potentialValue = addUpValueOfDice(diceWithNumbers, true);
            if (potentialValue === 0) {
                $scope.farkle = true;
                nextRound();
            }

        };

        function addUpValueOfDice(allDice, buildUpDisplay) {
            var addedValue = 0;
            if ($scope.totalDiceAvailableToRoll === 6 && checkForStraight(allDice)) {
                return 1500;
            } else {
                addedValue += checkForMultiples(allDice, buildUpDisplay);
                return addedValue;
            }
        }

        function giveDiceValue(dice) {
            var ones = [], twos = [], threes = [], fours = [], fives = [], sixes = [];
            var arrayOfDiceObjects = [];
            dice instanceof Array ? arrayOfDiceObjects = dice : arrayOfDiceObjects.push(dice);

            //Store the values in separate arrays to search for patterns
            for (var i = 0; i < arrayOfDiceObjects.length; i++) {
                if (arrayOfDiceObjects[i]) {
                    switch (arrayOfDiceObjects[i].value) {
                        case 1:
                            ones.push(arrayOfDiceObjects[i]);
                            continue;
                        case 2:
                            twos.push(arrayOfDiceObjects[i]);
                            continue;
                        case 3:
                            threes.push(arrayOfDiceObjects[i]);
                            continue;
                        case 4:
                            fours.push(arrayOfDiceObjects[i]);
                            continue;
                        case 5:
                            fives.push(arrayOfDiceObjects[i]);
                            continue;
                        case 6:
                            sixes.push(arrayOfDiceObjects[i]);
                    }
                }
            }

            return [ones, twos, threes, fours, fives, sixes];
        }

        function checkForStraight(arrays) {
            if (arrays[0].length === 1 && arrays[1].length === 1 && arrays[2].length === 1
                && arrays[3].length === 1 && arrays[4].length === 1 && arrays[5].length === 1) {
                $scope.roundScore += 1500;
                $scope.straight = true;
                $scope.displayDice = [ONE, TWO, THREE, FOUR, FIVE, SIX];
                $scope.totalScore += $scope.roundScore;
                return true;
            } else {
                return false;
            }
        }

        //Search for common values
        function checkForMultiples(allDiceArrays, buildUpDisplay) {
            var numberOfPairs = 0;
            var pairArrays = [];
            var addedValue = 0;
            if (allDiceArrays && allDiceArrays.length === 0) {
                return;
            }

            for (var j = 0; j < allDiceArrays.length; j++) {
                var currentNumberArray = allDiceArrays[j];
                if (currentNumberArray.length === 0) {
                    continue;
                }

                if (currentNumberArray.length === 6) {
                    addedValue = currentNumberArray[0].value * 400;
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 6) : '';
                } else if (currentNumberArray.length === 5) {
                    addedValue += currentNumberArray[0].value * 300;
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 5) : '';
                } else if (currentNumberArray.length === 4) {
                    addedValue += currentNumberArray[0].value * 200;
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 4) : '';
                } else if (currentNumberArray.length === 3) {
                    if (currentNumberArray[0].value === 1) {
                        addedValue += 1000;
                    } else {
                        addedValue += currentNumberArray[0].value * 100;
                    }
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 3) : '';
                } else if (currentNumberArray.length === 2) {
                    numberOfPairs += 1;
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 2) : '';
                    pairArrays.push(currentNumberArray);
                } else if (currentNumberArray.length === 1) {
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 1) : '';
                    if (currentNumberArray[0].value === 1) {
                        addedValue += 100;
                    } else if (currentNumberArray[0].value === 5) {
                        addedValue += 50;
                    }
                }
            }
            if (numberOfPairs === 3) {
                addedValue += 1500;
            } else {
                for (var i = 0; i < pairArrays.length; i++) {
                    var current = pairArrays[i];
                    if (current[0].value === 1) {
                        addedValue += 200;
                    } else if (current[0].value === 5) {
                        addedValue += 100;
                    }
                }
            }
            return addedValue;
        }

        function addToDisplay(value, count) {
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

        $scope.selectDice = function (dieObject, index) {
            searchForGroups(dieObject);
            $scope.displayDice.splice(index, 1);
            $scope.totalDiceAvailableToRoll--;
            if ($scope.selectedDice.length < 6) {
                $scope.selectedDice.push(dieObject);
                var selectedDiceInNumberedArrays = giveDiceValue($scope.selectedDice);
                $scope.roundScore = addUpValueOfDice(selectedDiceInNumberedArrays, false);
            }
        };

        $scope.deselectDice = function (dieObject, index) {
            $scope.displayDice.push(dieObject);
            $scope.totalDiceAvailableToRoll++;
            $scope.selectedDice.splice(index, 1);
            var deselectedDiceInNumberedArrays = giveDiceValue(dieObject);
            $scope.roundScore -= addUpValueOfDice(deselectedDiceInNumberedArrays, false);

        };

        $scope.addUpScoreOfSelectedDice = function () {
            $scope.totalScore += $scope.roundScore;
            nextRound();
        };

         function nextRound() {
            $scope.roundScore = 0;
            $scope.selectedDice = [];
            $scope.displayDice = [];
            $scope.totalDiceAvailableToRoll = 6;
        }

        function searchForGroups(die) {
            var group = [];
            for (var i = 0; i < $scope.displayDice.length; i++) {
                if (die.value === $scope.displayDice[i].value) {
                    group.push($scope.displayDice[i]);
                }
            }
        }

    }]);