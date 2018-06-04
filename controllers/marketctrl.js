'use strict';

angular.module('cryptoCentric')
    .controller('MarketCtrl', function ($scope, $routeParams, cons, $window, $http) {
        $scope.marketType = $routeParams.type;
        $scope.coinsymbol = $routeParams.symbol;

        var token = localStorage.getItem("token");
        var userkey = localStorage.getItem("userkey");
        var useremail = localStorage.getItem("useremail");

        M.AutoInit();

        $scope.alert = false;

        $scope.coinBAmount = 1;
        $scope.coinSAmount = 1;

        $scope.coinBAmountChange = function () {
            $scope.tradeBAmount = $scope.buyPrice * $scope.coinBAmount;
        }

        $scope.coinSAmountChange = function () {
            $scope.tradeSAmount = $scope.sellPrice * $scope.coinSAmount;
        }


        $scope.tradeBAmountChange = function () {
            $scope.coinBAmount = $scope.tradeBAmount / $scope.buyPrice;
        };

        $scope.tradeSAmountChange = function () {
            $scope.coinSAmount = $scope.tradeSAmount / $scope.sellPrice;
        };


        $http.get(cons.bs.m + 'buySellRate?coinname=' + $scope.marketType + '&eprice=min').then(function (response) {
            // success
            $scope.buyPrice = response.data.price;
            $scope.tradeBAmount = $scope.buyPrice * $scope.coinBAmount;
            M.updateTextFields();
        });

        $http.get(cons.bs.m + 'buySellRate?coinname=' + $scope.marketType + '&eprice=max').then(function (response) {
            // success
            $scope.sellPrice = response.data.price;
            $scope.tradeSAmount = $scope.sellPrice * $scope.coinSAmount;
            M.updateTextFields();
        });


        $http({
            url: cons.bs.m + 'openSellOrders',
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }).then(function (response) {
                // success
                $scope.openSell = response.data;
            },
            function (error) { // optional
                // failed
                alert("Errors !");
            });

        $http({
            url: cons.bs.o + 'DBOperations/rest/UserService/fetch/tradehistory?usr_key=' + userkey + '&access_token=' + token,
            method: "GET"
        }).then(function (response) {
                // success
                $scope.pendingOrders = response.data;
            },
            function (error) { // optional
                // failed
                alert("Errors !");
            });


        $http({
            url: cons.bs.o + 'DBOperations/rest/UserService/fetch/pending/orders?usr_key=' + userkey + '&access_token=' + token + '&coinname=' + $scope.marketType,
            method: "GET"
        }).then(function (response) {
                // success
                $scope.pendingOrders = response.data;
            },
            function (error) { // optional
                // failed
                alert("Errors !");
            });





        M.updateTextFields();




        $scope.buynow = function () {

            var tradeData = {
                "USR_KEY": userkey,
                "USER_ID": useremail,
                "COINS_VOL": $scope.coinBAmount,
                "COINNAME": $scope.marketType,
                "TYPE": "buy",
                "STATUS": "Pending",
                "MARKET": $scope.coinsymbol.toUpperCase() + '/AUD',
                "ACCESS_TOKEN": token
            }



            $http({
                    url: cons.bs.o + 'DBOperations/rest/UserService/insert/buytrade',
                    method: "POST",
                    data: tradeData,
                    headers: {
                        'Content-Type': "application/json"
                    },
                })
                .then(function (response) {


                    var buydata = {
                        "transactionID": response.data.txnid,
                        "usr_key": userkey,
                        "wallet address": response.data.addr,
                        "quantity": $scope.coinBAmount,
                        "coinname": $scope.marketType,
                        "userid": useremail
                    }


                    $http({
                        url: cons.bs.m + 'buyOrder',
                        method: "POST",
                        data: buydata,
                        headers: {
                            'Content-Type': "application/json"
                        },
                    }).then(function (response) {
                            // success
                            $scope.success = "Succesfully Placed";
                            $scope.alert = true;
                        },
                        function (error) { // optional
                            // failed
                            alert("Errors in the fields !");
                        });

                });



        };



        $scope.sellnow = function () {

            var tradeData = {
                "USR_KEY": userkey,
                "USER_ID": useremail,
                "COINS_VOL": $scope.coinSAmount,
                "COINNAME": $scope.marketType,
                "TYPE": "sell",
                "STATUS": "Pending",
                "MARKET": $scope.coinsymbol.toUpperCase() + '/AUD',
                "ACCESS_TOKEN": token
            }



            $http({
                    url: cons.bs.o + 'DBOperations/rest/UserService/insert/selltrade',
                    method: "POST",
                    data: tradeData,
                    headers: {
                        'Content-Type': "application/json"
                    },
                })
                .then(function (response) {


                    var selldata = {
                        "transactionID": response.data.txnid,
                        "usr_key": userkey,
                        "wallet address": response.data.addr,
                        "quantity": $scope.coinSAmount,
                        "coinname": $scope.marketType,
                        "userid": useremail
                    }


                    $http({
                        url: cons.bs.m + 'sellOrder',
                        method: "POST",
                        data: selldata,
                        headers: {
                            'Content-Type': "application/json"
                        },
                    }).then(function (response) {
                            // success
                            $scope.success = "Succesfully Placed";
                            $scope.alert = true;
                            $window.location.href = '#!orders';
                        },
                        function (error) { // optional
                            // failed
                            alert("Errors in the fields !");
                        });

                });



        };




        $scope.deleteOrder = function (order) {
            $scope.modalInfo = {
                "text_dsc": "Are you sure you want to delete " + order.id + " ?",
                "buttons": [{
                    text: "Cancel",
                    class: "gray margin-sm "
                }, {
                    text: "Confirm",
                    class: "red margin-sm "
                }]

            }
            //show a popup
            var elem = document.querySelector('#modal1');
            var instance = M.Modal.getInstance(elem);
            instance.open();
        };

    });
