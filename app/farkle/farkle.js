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
        $scope.turnScore = 0;
        $scope.rolledDice = [];
        $scope.selectedDice = [];
        $scope.roundScore = 0;
        $scope.emptyDisplayArray = [{}, {}, {}, {}, {}, {}];
        $scope.totalDiceAvailableToRoll = 6;
        const ONE = {image: $scope.imgPrefix + 'dice-one.png', value: 1, selectable: false},
            TWO = {image: $scope.imgPrefix + 'dice-two.png', value: 2, selectable: false},
            THREE = {image: $scope.imgPrefix + 'dice-three.png', value: 3, selectable: false},
            FOUR = {image: $scope.imgPrefix + 'dice-four.png', value: 4, selectable: false},
            FIVE = {image: $scope.imgPrefix + 'dice-five.png', value: 5, selectable: false},
            SIX = {image: $scope.imgPrefix + 'dice-six.png', value: 6, selectable: false},
            ONE_SELECTABLE = {image: $scope.imgPrefix + 'dice-one.png', value: 1, selectable: true},
            TWO_SELECTABLE = {image: $scope.imgPrefix + 'dice-two.png', value: 2, selectable: true},
            THREE_SELECTABLE = {image: $scope.imgPrefix + 'dice-three.png', value: 3, selectable: true},
            FOUR_SELECTABLE = {image: $scope.imgPrefix + 'dice-four.png', value: 4, selectable: true},
            FIVE_SELECTABLE = {image: $scope.imgPrefix + 'dice-five.png', value: 5, selectable: true},
            SIX_SELECTABLE = {image: $scope.imgPrefix + 'dice-six.png', value: 6, selectable: true};

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
            $scope.displayDice = [];
            $scope.rolledDice = [];
            if ($scope.totalDiceAvailableToRoll === 0 && $scope.roundScore !== 0) {
                $scope.totalDiceAvailableToRoll = 6;
                $scope.selectedDice = [];
            }
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
                $scope.displayDice = [ONE_SELECTABLE, TWO_SELECTABLE, THREE_SELECTABLE,
                    FOUR_SELECTABLE, FIVE_SELECTABLE, SIX_SELECTABLE];
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
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 6, true) : '';
                } else if (currentNumberArray.length === 5) {
                    addedValue += currentNumberArray[0].value * 300;
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 5, true) : '';
                } else if (currentNumberArray.length === 4) {
                    addedValue += currentNumberArray[0].value * 200;
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 4, true) : '';
                } else if (currentNumberArray.length === 3) {
                    if (currentNumberArray[0].value === 1) {
                        addedValue += 1000;
                    } else {
                        addedValue += currentNumberArray[0].value * 100;
                    }
                    buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 3, true) : '';
                } else if (currentNumberArray.length === 2) {
                    numberOfPairs += 1;
                    pairArrays.push(currentNumberArray);
                } else if (currentNumberArray.length === 1) {
                    if (currentNumberArray[0].value === 1) {
                        buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 1, true) : '';
                        addedValue += 100;
                    } else if (currentNumberArray[0].value === 5) {
                        buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 1, true) : '';
                        addedValue += 50;
                    } else {
                        buildUpDisplay ? addToDisplay(currentNumberArray[0].value, 1, false) : '';
                    }
                }
            }
            if (numberOfPairs === 3) {
                addedValue += 1500;
                buildUpDisplay ? addToDisplay(pairArrays[0].value, 2, true) : '';
                buildUpDisplay ? addToDisplay(pairArrays[1].value, 2, true) : '';
                buildUpDisplay ? addToDisplay(pairArrays[2].value, 2, true) : '';
            } else {
                for (var i = 0; i < pairArrays.length; i++) {
                    var current = pairArrays[i];
                    if (current[0].value === 1) {
                        addedValue += 200;
                        buildUpDisplay ? addToDisplay(current[0].value, 2, true) : '';
                    } else if (current[0].value === 5) {
                        addedValue += 100;
                        buildUpDisplay ? addToDisplay(current[0].value, 2, true) : '';
                    } else {
                        buildUpDisplay ? addToDisplay(current[0].value, 2, false) : '';
                    }

                }
            }
            return addedValue;
        }

        function addToDisplay(value, count, selectable) {
            for (var i = 0; i < count; i++) {
                switch (value) {
                    case 1:
                        if (selectable) {
                            $scope.displayDice.push(ONE_SELECTABLE);
                        } else {
                            $scope.displayDice.push(ONE);
                        }
                        continue;
                    case 2:
                        if (selectable) {
                            $scope.displayDice.push(TWO_SELECTABLE);
                        } else {
                            $scope.displayDice.push(TWO);
                        }
                        continue;
                    case 3:
                        if (selectable) {
                            $scope.displayDice.push(THREE_SELECTABLE);
                        } else {
                            $scope.displayDice.push(THREE);
                        }
                        continue;
                    case 4:
                        if (selectable) {
                            $scope.displayDice.push(FOUR_SELECTABLE);
                        } else {
                            $scope.displayDice.push(FOUR);
                        }
                        continue;
                    case 5:
                        if (selectable) {
                            $scope.displayDice.push(FIVE_SELECTABLE);
                        } else {
                            $scope.displayDice.push(FIVE);
                        }
                        continue;
                    case 6:
                        if (selectable) {
                            $scope.displayDice.push(SIX_SELECTABLE);
                        } else {
                            $scope.displayDice.push(SIX);
                        }
                }
            }
        }

        $scope.selectDice = function (dieObject, index) {
            if (!searchForGroupsToSelect(dieObject)) {
                $scope.displayDice.splice(index, 1);
                $scope.totalDiceAvailableToRoll--;
                $scope.selectedDice.push(dieObject);
                var selectedDiceInNumberedArrays = giveDiceValue(dieObject);
                $scope.roundScore += addUpValueOfDice(selectedDiceInNumberedArrays, false);
            }
        };

        $scope.deselectDice = function (dieObject, index) {
            if (!searchForGroupsToDeSelect(dieObject)) {
                $scope.displayDice.push(dieObject);
                $scope.totalDiceAvailableToRoll++;
                $scope.selectedDice.splice(index, 1);
                var deselectedDiceInNumberedArrays = giveDiceValue(dieObject);
                $scope.roundScore -= addUpValueOfDice(deselectedDiceInNumberedArrays, false);
            }
        };

        $scope.addUpScoreOfSelectedDice = function () {
            $scope.totalScore += $scope.roundScore;
            nextRound();
        };

        function nextRound() {
            $scope.roundScore = 0;
            $scope.turnScore = 0;
            $scope.selectedDice = [];
            $scope.displayDice = [];
            $scope.totalDiceAvailableToRoll = 6;
        }

        function searchForGroupsToSelect(die) {
            var group = [];
            for (var i = 0; i < $scope.displayDice.length; i++) {
                if (die.value === $scope.displayDice[i].value) {
                    group.push($scope.displayDice[i]);
                }
            }
            if (group.length >= 3) {
                for (var j = 0; j < group.length; j++) {
                    $scope.displayDice.splice($scope.displayDice.indexOf(group[j]), 1);
                    $scope.totalDiceAvailableToRoll--;
                    $scope.selectedDice.push(group[j]);
                }
                var selectedDiceInNumberedArrays = giveDiceValue(group);
                $scope.roundScore += addUpValueOfDice(selectedDiceInNumberedArrays, false);
                return true;
            } else {
                return false;
            }
        }

        function searchForGroupsToDeSelect(die) {
            var group = [];
            for (var i = 0; i < $scope.selectedDice.length; i++) {
                if (die.value === $scope.selectedDice[i].value) {
                    group.push($scope.selectedDice[i]);
                }
            }
            if (group.length >= 3) {
                for (var j = 0; j < group.length; j++) {
                    $scope.displayDice.push(group[j]);
                    $scope.displayDice[$scope.displayDice.indexOf(group[j])].selectable = true;
                    $scope.totalDiceAvailableToRoll++;
                    $scope.selectedDice.splice($scope.selectedDice.indexOf(group[j]), 1);
                }
                var selectedDiceInNumberedArrays = giveDiceValue(group);
                $scope.roundScore -= addUpValueOfDice(selectedDiceInNumberedArrays, false);
                return true;
            } else {
                return false;
            }
        }

        $scope.appliedClass = function(dice) {
            if (dice.selectable) {
                return "selectable";
            } else {
                return "not-selectable";
            }
        }

    }]);