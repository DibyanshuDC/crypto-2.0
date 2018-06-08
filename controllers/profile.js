'use strict';

angular.module('cryptoCentric')
    .controller('UserCtrl', function ($scope, cons, $http) {
        M.AutoInit();
        $scope.alert = false;
        var token = localStorage.getItem("token");


        $scope.changePass = false;
        $scope.changeProfile = false;


        $scope.changePassAct = function () {
            $scope.changePass = true;
        }

        $scope.changeProfileAct = function () {
            $scope.changeProfile = true;
        }

        $scope.cancelbox = function () {
            $scope.changePass = false;
            $scope.changeProfile = false;
        }


        $http({
            url: cons.bs.im + 'idaas/im/scim/v1/Me',
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token
            }
        }).then(function (response) {
            $scope.profile = response.data;
            setTimeout(function () {
                M.updateTextFields();
            }, 1000);

        });





    });
