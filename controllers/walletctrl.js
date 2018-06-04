'use strict';

angular.module('cryptoCentric')
    .controller('WalletsCtrl', function ($scope, $http, cons, $routeParams, $location, $filter) {

        var token = localStorage.getItem("token");
        var userkey = localStorage.getItem("userkey")
        $scope.alert = false;




        $scope.walletName = $routeParams.type;


        //use $scope.walletName to get data
        $scope.depositData = {};
        $scope.withdrawData = {};



        $scope.cancel = function () {
            $scope.depositbox = false;
            $scope.withdrawbox = false;
            $scope.sendbox = false;
            $scope.transbox = true;
            M.AutoInit();
        };

        $scope.wallets = [{
            id: ' ',
            type: ' ',
            bal: ' ',
            locked: ' '
        }];


        $http({
            url: cons.bs.o + 'DBOperations/rest/UserService/fetch/wallets?usr_key=' + userkey + '&access_token=' + token,
            method: "GET"
        }).then(function (response) {
            $scope.wallets = response.data;

            $scope.selectedWallet = $filter('filter')($scope.wallets, {
                id: $scope.walletName
            })[0];


            $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/fetch/wallet/' + $scope.selectedWallet.name + '?usr_key=' + userkey + '&access_token=' + token,
                method: "GET"
            }).then(function (response) {
                $scope.myWalletData = response.data;
                M.updateTextFields();
            });


        });



        $scope.cancel();

        $scope.deposit = function () {
            $scope.depositbox = true;
            $scope.withdrawbox = false;
            $scope.transbox = false;
            M.AutoInit();
        };

        $scope.send = function () {
            $scope.sendbox = true;
            $scope.transbox = false;
            M.AutoInit();
        };

        $scope.withdraw = function () {
            $scope.depositbox = false;
            $scope.withdrawbox = true;
            $scope.transbox = false;
            M.AutoInit();
        };

        $scope.DEPOSIT = function () {

        };

        $scope.WITHDRAW = function () {

        };



        $http({
            url: cons.bs.o + 'DBOperations/rest/UserService/fetch/bankaccount?usr_key=' + userkey + '&access_token=' + token,
            method: "GET"
        }).then(function (response) {
            $scope.deposithistory = response.data;
        });

        $http({
            url: cons.bs.o + 'DBOperations/rest/UserService/fetch/bankaccount?usr_key=' + userkey + '&access_token=' + token,
            method: "GET"
        }).then(function (response) {
            $scope.withdrawhistory = response.data;
        });


        $http({
            url: cons.bs.o + 'DBOperations/rest/UserService/fetch/bankaccount?usr_key=' + userkey + '&access_token=' + token,
            method: "GET"
        }).then(function (response) {
            $scope.myAccs = response.data;
        });

    });
