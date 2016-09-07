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
                unorderedNumbers.push(Math.random() * $scope.totalNumber);
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

        var swap = function(items, firstIndex, secondIndex) {
            var temp = items[firstIndex];
            items[firstIndex] = items[secondIndex];
            items[secondIndex] = temp;
        };

        // $scope.quickSort = function (items, left, right) {
        //     var pivot = items[Math.floor((right + left) / 2)];
        //     var i = left;
        //     var j = right;
        //
        //     while (i <= j) {
        //         while (items[i] < pivot) {
        //             i++;
        //         }
        //
        //         while (items[j] > pivot) {
        //             j--;
        //         }
        //
        //         if (i <= j) {
        //             swap(items, i ,j);
        //             i++;
        //             j--;
        //         }
        //     }
        //
        //     return i;
        // };

        // function quicksort(data) {
        //     if (data.length == 0) return [];
        //
        //     var left = [], right = [], pivot = data[0];
        //
        //     for (var i = 1; i < data.length; i++) {
        //         if(data[i] < pivot)
        //             left.push(data[i]);
        //         else
        //             right.push(data[i]);
        //     }
        //
        //     return quicksort(left).concat(pivot, quicksort(right));
        // }

        $scope.quickSort = function (a) {
            if (a.length <= 1) return a;

            var left = [], right = [], pivot = a[0];

            for (var i = 1; i < a.length; i++) {
                a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
            }

            return $scope.quickSort(left).concat(pivot, $scope.quickSort(right));
        };

        $scope.displaySortSpeed = function (sortMethod) {
            var numbers = $scope.getNumbers().slice(0);
            var start = window.performance.now();
            sortMethod(numbers, 0, numbers.length - 1);
            var end = window.performance.now();
            return (end - start).toFixed(3);
        };
    }]);