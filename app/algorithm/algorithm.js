'use strict';

angular.module('mainPage.algorithm', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/algorithm', {
            templateUrl: 'algorithm/algorithm.html',
            controller: 'AlgorithmController'
        });
    }])
    .controller('AlgorithmController', ['$scope', function ($scope) {

        $scope.totalNumber = 1000;
        var hundredNumbers = [];
        var thousandNumbers = [];
        var tenThousandNumbers = [];
        for (let i = 0; i < 10000; i++) {
            if (i < 100) hundredNumbers.push(Math.random() * $scope.totalNumber);
            if (i < 1000) thousandNumbers.push(Math.random() * $scope.totalNumber);
            if (i < 10000) tenThousandNumbers.push(Math.random() * $scope.totalNumber);
        }

        var inputOne = document.getElementById('anagramInputOne');
        var inputTwo = document.getElementById('anagramInputTwo');
        inputOne.setAttribute('size', inputOne.getAttribute('placeholder').length);
        inputTwo.setAttribute('size', inputTwo.getAttribute('placeholder').length);


        $scope.getNumbers = function () {
            switch ($scope.totalNumber) {
                case 100:
                    return hundredNumbers;
                    break;
                case 1000:
                    return thousandNumbers;
                    break;
                case 10000:
                    return tenThousandNumbers;
                    break;
            }
            return 0;
        };

        let bubbleSort = function (items) {
            let length = items.length;
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length - i - 1; j++) {
                    if (items[j] > items[j + 1]) {
                        let temp = items[j];
                        items[j] = items[j + 1];
                        items[j + 1] = temp;
                    }
                }
            }
            return items;
        };
        
        let mergeSort = function (inputArray) {
            let n = inputArray.length;
            if (n < 2) return inputArray;

            let middle =  Math.floor(n/2);
            let left = inputArray.slice(0, middle);
            let right = inputArray.slice(middle);
            return merge(mergeSort(left), mergeSort(right));
        };

        let merge = function (leftArray, rightArray) {
            //separate out the list of numbers into lists of just one item
            //and then slowly merge all the lists back together again.
            let i = 0, j = 0, leftLength = leftArray.length, rightLength = rightArray.length;
            let result = [];
            while (i < leftLength && j < rightLength) {
                if (leftArray[i] < rightArray[j]) {
                    result.push(leftArray[i++]);
                } else {
                    result.push(rightArray[j++]);
                }
            }
            return result.concat(leftArray.slice(i)).concat(rightArray.slice(j));
        };

        let quickSort = function (a) {
            if (a.length <= 1) return a;
            let left = [], right = [], pivot = a[0];
            for (let i = 1; i < a.length; i++) {
                a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
            }
            return quickSort(left).concat(pivot, quickSort(right));
        };

        let selectionSort = function (input) {
            for (let j = 0; j < input.length; j++) {
                let lowest = input[j];
                let temp = j;
                for (let i = 1 + j; i < input.length; i++) {
                    if (input[i] < lowest) {
                        temp = i;
                        lowest = input[i];
                    }
                }
                input[temp] = input[j];
                input[j] = lowest;
            }
            return input;
        };

        let insertionSort = function (input) {
            for (let i = 1; i < input.length; i++) {
                let j = i;
                while (j > 0 && input[j-1] > input[j]){
                    let temp = input[j];
                    input[j] = input[j-1];
                    input[j-1] = temp;
                    j--;
                }
            }
            return input;
        };

        let displaySortSpeed = function (sortMethod) {
            let numbers = $scope.getNumbers().slice(0);
            let start = window.performance.now();
            sortMethod(numbers);
            let end = window.performance.now();
            return (end - start).toFixed(3);
        };

        let completeAlgorithmTests = function () {
            $scope.quickSortTime = displaySortSpeed(quickSort);
            $scope.bubbleSortTime = displaySortSpeed(bubbleSort);
            $scope.mergeSortTime = displaySortSpeed(mergeSort);
            $scope.selectionSortTime = displaySortSpeed(selectionSort);
            $scope.insertionSortTime = displaySortSpeed(insertionSort);
        };

        $scope.$watch('totalNumber', function() {
            completeAlgorithmTests();
        });

        $scope.convert = function () {
            let num = $scope.romanInput;
            if (typeof num === "undefined" || num > 1000) {
                return;
            }
            let roman = "";
            let romanNumeral = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX",
                "V", "IV", "I"];
            //Possible roman numerals up to 1000
            let numbers = [1000, 900, 500, 400, 100 ,90, 50, 40, 10, 9, 5, 4, 1];
            for(let i = 0; i < numbers.length; i++) {
                while(num>=numbers[i]) {
                    roman = roman + romanNumeral[i];
                    num = num - numbers[i];
                }
            }
            return roman;
        };

        $scope.testAnagramInput = function () {
            if (!($scope.anagramInputOne && $scope.anagramInputTwo)) {
                $('#anagramPopover').popover("show");
                setTimeout(function () {
                    $('#anagramPopover').popover("hide")
                }, 2000);
                return;
            }
            var inputOne = $scope.anagramInputOne.split(' ').join('');
            var inputTwo = $scope.anagramInputTwo.split(' ').join('');
            if (inputOne.length !== inputTwo.length) {
                $scope.anagramOutput = false;
                return;
            }
            for (var i = 0; i < inputTwo.length; i++) {
                var index = inputOne.indexOf(inputTwo[i]);
                if (index === -1) {
                    $scope.anagramOutput = false;
                    return;
                } else {
                    inputOne = inputOne.slice(index + 1);
                }
            }
            $scope.anagramOutput = true;
        };

        ;

        $scope.binarySearch = function (array, targetValue) {
            let min = 0;
            let max = array.length - 1;
            let guess;
            while (max >= min) {
                guess = (max + min) / 2 | 0;
                if (array[guess] < targetValue) {
                    min = guess + 1;
                } else if (array[guess] > targetValue) {
                    max = guess - 1;
                } else {
                    console.log(guess + " " + array[guess]);
                    return guess;
                }
            }
            return -1;
        };
        $scope.binarySearch([1,7,11,13,17,19,23,25,29,30,31,35,42,56,67,68,69,70,81], 31);

    }]);