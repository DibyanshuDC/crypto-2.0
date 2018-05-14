'use strict';

angular.module('cryptoCentric')
    .controller('TwoFACtrl', function ($scope) {

        $scope.enabled = false;
        $scope.enableBox = function () {
            $scope.enabled = true;
        }

    });
