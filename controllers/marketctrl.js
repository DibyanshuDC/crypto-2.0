'use strict';

angular.module('cryptoCentric')
    .controller('MarketCtrl', function ($scope, $routeParams, cons, $http) {
        $scope.marketType = $routeParams.type;

        M.AutoInit();
        $scope.alert = false;


        $http.get(cons.bs.m + 'buyOrderbuySellRate?coinname=' + $scope.marketType + '&eprice=max')



        $scope.buynow = function () {

            var buydata = {
                "transactionID": "6e14f23b-92c0-4dec-be9b-df375b759d64",
                "usr_key": "100",
                "wallet address": "miKNL2BkjZfT5BzyEQjUYjg8u7wxEKrewDs",
                "quantity": "2",
                "coinname": "Bitcoin",
                "userid": "rogercharlie@gmail.com"
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
                    $scope.success = response.data;
                    $scope.alert = true;
                    setTimeout(function () {
                        $window.location.href = '#!orders';
                    }, 5000);

                },
                function (error) { // optional
                    // failed
                    alert("Errors in the fields !");
                });
        };




        $scope.sellnow = function () {

            var selldata = {
                "transactionID": "9e363f67-272e-40a0-b432-dfec325a5ea1",
                "usr_key": "100",
                "walletaddress": "rwehgerh43tl4n3ltjkntkjnkj",
                "quantity": "4",
                "coinname": "Bitcoin",
                "userid": "RogerCharlie123@gmail.com"
            }


            $http({
                url: cons.bs.m + 'sellOrder',
                method: "POST",
                data: selldata,
                headers: {
                    'Authorization': 'Basic eGVsc3lzYWRtOldlbGNvbWUx',
                    'Content-Type': "application/scim+json"
                },
            }).then(function (response) {
                    // success
                    $scope.success = "success";
                    $scope.alert = true;
                    setTimeout(function () {
                        $window.location.href = '#!login';
                    }, 5000);

                },
                function (error) { // optional
                    // failed
                    alert("Errors in the fields !");
                });
        };


        $scope.cancel = function (index) {
            console.log(index);
            //show a popup
            var instance = M.Modal.getInstance("modal1");
            instance.open();
        }

    });
