'use strict';

angular.module('cryptoCentric')
    .controller('LoginCtrl', function ($scope, vcRecaptchaService, $http, cons, $window) {
        $scope.captcha = true;

        $scope.email = "";
        $scope.password = "";
        $scope.login = function () {

            //            if (vcRecaptchaService.getResponse() === "") {
            //                alert("Please resolve the captcha and submit!");
            //            } else {
            //                $http({
            //                        url: cons.bs.o + "DBOperations/rest/UserService/insert/captcha",
            //                        method: "POST",
            //                        data: {
            //                            "recaptcha": vcRecaptchaService.getResponse()
            //                        },
            //                        headers: {
            //                            "Content-Type": "application/json"
            //                        },
            //                    })
            //                    .then(function (response) {
            //
            //                        if (response.data.success) {



            localStorage.setItem("useremail", $scope.email);
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
                        localStorage.setItem("refresh", token_response.data.refresh_token);
                        $http({
                            url: cons.bs.im + 'idaas/im/scim/v1/Me',
                            method: "GET",
                            headers: {
                                "Authorization": 'Bearer ' + token_response.data.access_token
                            }
                        }).then(function (response) {
                            localStorage.setItem("userkey", response.data.id);
                            localStorage.setItem("name", response.data.name.givenName);
                            localStorage.setItem("email", response.data.emails[0].value);
                            $window.location.href = '/#!/dashboard';
                        });
                    },
                    function (e) {
                        console.log("Errors in request", e);
                    });

            //}



            //});
            //}
        };




    });
