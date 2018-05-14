'use strict';

angular.module('cryptoCentric')
    .controller('WalletsCtrl', function ($scope, $routeParams, $location) {


        $scope.alert = true;




        $scope.walletName = $routeParams.type;


        //use $scope.walletName to get data
        $scope.depositData = {};
        $scope.withdrawData = {};

        //        var rowval = document.querySelector('#rowval');
        //        var payOption = document.querySelector('#payOption');
        //        var wthTo = document.querySelector('#wthTo');
        //        var wthIn = document.querySelector('#wthIn');
        //
        //        var rowvalIn = M.FormSelect.init(rowval, {});
        //        var payOptionIn = M.FormSelect.init(payOption, {});
        //        var wthToIn = M.FormSelect.init(wthTo, {});
        //        var wthInIn = M.FormSelect.init(wthIn, {});
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //        var tab_elem = document.querySelector(".tabs");
        //        var tabs = M.Tabs.init(tab_elem, {});




        $scope.cancel = function () {
            $scope.depositbox = false;
            $scope.withdrawbox = false;
            $scope.transbox = true;
            M.AutoInit();
        }
        $scope.wallets = [{
            id: "usd",
            type: "currency",
            bal: '34,2000.00',
            locked: '8000'
        }, {
            id: "btc",
            type: "coin",
            bal: '32000',
            locked: '8000'
        }, {
            id: "eth",
            type: "coin",
            bal: '32000',
            locked: '8000'
        }, {
            id: "ltc",
            type: "coin",
            bal: '32000',
            locked: '8000'
        }, {
            id: "lisk",
            type: "coin",
            bal: '32000',
            locked: '8000'
        }, {
            id: "some",
            type: "coin",
            bal: '32000',
            locked: '8000'
        }];

        $scope.cancel();

        $scope.deposit = function () {
            $scope.depositbox = true;
            $scope.withdrawbox = false;
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

        //        $scope.changeWallet = function (item) {
        //            $location.path("/wallet/" + item);
        //        };




    });
