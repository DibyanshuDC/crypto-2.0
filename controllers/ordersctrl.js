'use strict';

angular.module('cryptoCentric')
    .controller('OrdersCtrl', function ($scope, cons, $http) {

        $scope.alert = false;
        var token = localStorage.getItem("token");
        var userkey = localStorage.getItem("userkey");



        $http({
            url: cons.bs.o + 'DBOperations/rest/UserService/fetch/tradehistory?usr_key=' + userkey + '&access_token=' + token,
            method: "GET"
        }).then(function (response) {
            $scope.orders = response.data;
        });

    });
