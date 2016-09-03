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

        $scope.getNumbers = function() {
            var unorderedNumbers = [];
            for (var i = 0; i < $scope.totalNumber; i++) {
                unorderedNumbers.push(Math.random() * 1000);
            }
            return unorderedNumbers;
        };

        $scope.bubbleSort = function (items) {
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

        // $scope.displayBubbleSort = function () {
        //     var start = window.performance.now();
        //     bubbleSort(getNumbers());
        //     var end = window.performance.now();
        //     return (end - start).toFixed(3);
        // };

        var swap = function(items, firstIndex, secondIndex) {
            var temp = items[firstIndex];
            items[firstIndex] = items[secondIndex];
            items[secondIndex] = temp;
        };

        $scope.quickSort = function (items, left, right) {
            var pivot = items[Math.floor((right + left) / 2)];
            var i = left;
            var j = right;

            while (i <= j) {
                while (items[i] < pivot) {
                    i++;
                }

                while (items[j] > pivot) {
                    j--;
                }

                if (i <= j) {
                    swap(items, i ,j);
                    i++;
                    j--;
                }
            }

            return i;
        };

        $scope.displaySortSpeed = function (sortMethod) {
            var numbers = $scope.getNumbers().slice(0);
            var start = window.performance.now();
            sortMethod(numbers, 0, 9999);
            var end = window.performance.now();
            return (end - start).toFixed(3);
        };
    }]);