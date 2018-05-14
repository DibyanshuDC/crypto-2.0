'use strict';

angular.module('cryptoCentric')
    .controller('BankCtrl', function ($scope) {
        M.AutoInit();
        $scope.alert = true;
        $scope.addAccBox = false;
        $scope.addAcchandler = function () {
            $scope.addAccBox = true;
        }

        $scope.cancel = function () {
            $scope.addAccBox = false;
        }

    });
