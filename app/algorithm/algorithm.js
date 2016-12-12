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
        for (var i = 0; i < 10000; i++) {
            if (i < 100) hundredNumbers.push(Math.random() * $scope.totalNumber);
            if (i < 1000) thousandNumbers.push(Math.random() * $scope.totalNumber);
            if (i < 10000) tenThousandNumbers.push(Math.random() * $scope.totalNumber);
        }




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

        var bubbleSort = function (items) {
            var length = items.length;
            for (var i = 0; i < length; i++) {
                for (var j = 0; j < length - i - 1; j++) {
                    if (items[j] > items[j + 1]) {
                        var temp = items[j];
                        items[j] = items[j + 1];
                        items[j + 1] = temp;
                    }
                }
            }
            return items;
        };
        
        var mergeSort = function (inputArray) {
            let n = inputArray.length;
            if (n < 2) return inputArray;

            var middle =  Math.floor(n/2);
            var left = inputArray.slice(0, middle);
            var right = inputArray.slice(middle);
            return merge(mergeSort(left), mergeSort(right));
        };

        var merge = function (leftArray, rightArray) {
            //separate out the list of numbers into lists of just one item
            //and then slowly merge all the lists back together again.
            let i = 0, j = 0, leftLength = leftArray.length, rightLength = rightArray.length;
            var result = [];
            while (i < leftLength && j < rightLength) {
                if (leftArray[i] < rightArray[j]) {
                    result.push(leftArray[i++]);
                } else {
                    result.push(rightArray[j++]);
                }
            }
            return result.concat(leftArray.slice(i)).concat(rightArray.slice(j));
        };

        var quickSort = function (a) {
            if (a.length <= 1) return a;
            var left = [], right = [], pivot = a[0];
            for (var i = 1; i < a.length; i++) {
                a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
            }
            return quickSort(left).concat(pivot, quickSort(right));
        };

        var displaySortSpeed = function (sortMethod) {
            var numbers = $scope.getNumbers().slice(0);
            var start = window.performance.now();
            var sortedArray = sortMethod(numbers, 0, numbers.length - 1);
            console.log(sortedArray);
            var end = window.performance.now();
            var sortTime = (end - start).toFixed(3);
            console.log(sortTime);
            return sortTime;
        };

        var completeAlgorithmTests = function () {
            $scope.quickSortTime = displaySortSpeed(quickSort);
            $scope.bubbleSortTime = displaySortSpeed(bubbleSort);
            $scope.mergeSortTime = displaySortSpeed(mergeSort);
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
            var romanNumeral = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX",
                "V", "IV", "I"];
            //Possible roman numerals up to 1000
            var numbers = [1000, 900, 500, 400, 100 ,90, 50, 40, 10, 9, 5, 4, 1];
            for(var i = 0; i < numbers.length; i++) {
                while(num>=numbers[i]) {
                    roman = roman + romanNumeral[i];
                    num = num - numbers[i];
                }
            }
            return roman;
        }
    }]);