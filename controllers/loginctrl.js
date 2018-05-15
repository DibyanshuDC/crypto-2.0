'use strict';

angular.module('cryptoCentric')
    .controller('LoginCtrl', function ($scope, vcRecaptchaService, $http, cons, $window) {
        $scope.captcha = true;

        $scope.email = "";
        $scope.password = "";
        $scope.login = function () {

            //                        if (vcRecaptchaService.getResponse() === "") {
            //                            alert("Please resolve the captcha and submit!");
            //                        } else {
            //                            $http({
            //                                    url: cons.bs.o + "DBOperations/rest/UserService/insert/captcha",
            //                                    method: "POST",
            //                                    data: {
            //                                        "recaptcha": vcRecaptchaService.getResponse()
            //                                    },
            //                                    headers: {
            //                                        "Content-Type": "application/json"
            //                                    },
            //                                })
            //                                .then(function (response) {
            $http({
                    url: cons.bs.am + 'ms_oauth/oauth2/endpoints/oauthservice/tokens',
                    method: "POST",
                    data: "grant_type=password&username=" + $scope.email + "&password=" + $scope.password + "&scope=UserProfile.me+UserProfile.secretkey.management",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Basic Y3VzdG9tZXJDbGllbnQ6elJwSmJsNzNpRThY"
                    }
                })
                .then(function (token_response) {
                        localStorage.setItem("token", token_response.data.access_token);
                        $http({
                                url: cons.bs.am + "ms_oauth/resources/userprofile/me",
                                method: "GET",
                                headers: {
                                    "Authorization": 'Bearer ' + token_response.data.access_token
                                }
                            })
                            .then(function (response) {
                                localStorage.setItem("username", response.data.uid.split('@')[0]);
                                $http({
                                    url: cons.bs.im + 'idaas/im/scim/v1/Users?attributes=id&filter=(userName eq ' + $scope.email + ')',
                                    method: "GET",
                                    headers: {
                                        "Authorization": 'Bearer ' + token_response.data.access_token
                                    }
                                }).then(function (response) {
                                    localStorage.setItem("userkey", response.data.Resources[0].id);
                                    $window.location.href = '/#!/dashboard';
                                });
                            });
                    },
                    function (e) {
                        // optional
                        // failed
                        console.log("Errors in request", e);
                    });
        };




    });
