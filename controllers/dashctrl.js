'use strict';

angular.module('cryptoCentric')
    .controller('DashCtrl', function ($scope, $http, cons) {


        var token = localStorage.getItem("token");
        var userkey = localStorage.getItem("userkey");

        $http({
            url: cons.bs.o + 'DBOperations/rest/UserService/fetch/top/tradehistory?usr_key=' + userkey + '&access_token=' + token,
            method: "GET"
        }).then(function (response) {
            $scope.latestOrders = response.data;
        });



        $http({
            url: cons.bs.m + 'exchange?start=' + '0' + '&limit=' + '200',
            method: "GET"
        }).then(function (response) {
            $scope.coins = response.data;
        });

    });
