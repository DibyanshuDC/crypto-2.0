'use strict';

angular.module('cryptoCentric')
    .controller('HomeCtrl', function ($scope, $http, cons) {
        $scope.show = false;
        $scope.alert = true;

        function verifytoken() {
            if (typeof (Storage) !== "undefined") {

                // Retrieve
                var token = localStorage.getItem("token");
                // verify token
                if (token) {
                    $scope.show = true;
                }

            } else {
                alert("Sorry, your browser does not support Web Storage...and so this app won't work");
            }
        };

        verifytoken();


        $http({
            url: cons.bs.m + 'exchange?start=' + '0' + '&limit=' + '10',
            method: "GET"
        }).then(function (response) {
            $scope.coins = response.data;
        });


    });
