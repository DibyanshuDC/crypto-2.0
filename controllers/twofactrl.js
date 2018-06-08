'use strict';

angular.module('cryptoCentric')
    .controller('TwoFACtrl', function ($scope, cons, $http) {

        //http://10.0.5.53:7001/DBOperations/rest/UserService/fetch/otp?usr_key=100&access_token=


        var token = localStorage.getItem("token");
        var userkey = localStorage.getItem("userkey");
        var useremail = localStorage.getItem("useremail");

        $scope.enabler = true;
        $scope.enabling = false;
        $scope.enabled = false;

        //check current status if false 
        //check secret key

        $http({
                url: cons.bs.am + 'ms_oauth/resources/userprofile/me',
                method: "GET",
                headers: {
                    'Authorization': token
                }
            })
            .then(function (response) {
                if (response.data.description) {
                    $scope.enabled = true;
                    $scope.enabler = false;
                }
            });



        function getSecret() {
            $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/fetch/secretkey?access_token=' + token,
                method: "GET"
            }).then(function (response) {
                if (response.data.status == "Secret key") {
                    $scope.secretkey = response.data.message;
                    $scope.enabler = false;
                    $scope.enabling = true;
                    var qrcode = new QRCode(document.getElementById("qrcode"), {
                        text: "otpauth://totp/" + useremail + "/cryptocentric?secret=" + $scope.secretkey,
                        width: 246,
                        height: 246,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });

                };
            });
        };

        $scope.disable2fa = function () {
            $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/fetch/disable/2fa?access_token=' + token,
                method: "GET"
            }).then(function (response) {
                $scope.enabled = false;
            });
        }



        $scope.submitOTP = function () {
            $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/fetch/otp?access_token=' + token + '&secret=' + $scope.secretkey + '&code=' + $scope.otp,
                method: 'GET',
            }).then(function (response) {
                $scope.enabled = true;
                $scope.enabling = false;
            });
        };


        $scope.enableBox = function () {
            $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/fetch/enable/2fa?access_token=' + token,
                method: "GET"
            }).then(function (response) {
                getSecret();
            });

        };

    });
