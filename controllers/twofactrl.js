'use strict';

angular.module('cryptoCentric')
    .controller('TwoFACtrl', function ($scope, cons, $http) {

        //http://10.0.5.53:7001/DBOperations/rest/UserService/fetch/otp?usr_key=100&access_token=


        var token = localStorage.getItem("token");
        var userkey = localStorage.getItem("userkey");

        $scope.enabled = false;
        $scope.enableBox = function () {
            $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/fetch/enable/2fa?usr_key=' + userkey + '&access_token=' + token,
                method: "POST",
                data: bankdetails,
            }).then(function (response) {
                    $scope.cancel();
                    //Make it primary
                    //push one more account
                    //$scope.bankList = $scope.bankList.push(bankdetails);
                    $route.reload();

                },
                function (error) {
                    alert("Errors in the fields !");
                });
            $scope.enabled = true;
        }

    });
