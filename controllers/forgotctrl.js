'use strict';

angular.module('cryptoCentric')
    .controller('PwdCtrl', function ($scope, $http, cons) {

        $scope.success = '';


        $scope.progress = 1;



        $scope.alert = false;

        $scope.retrieve = function () {
            $scope.progress = 2;



            //            $http({
            //                    url: cons.bs.im + 'idaas/im/scim/v1/Users',
            //                    method: "POST",
            //                    data: userData,
            //                    headers: {
            //                        'Authorization': 'Basic eGVsc3lzYWRtOldlbGNvbWUx',
            //                        'Content-Type': "application/scim+json"
            //                    },
            //                })
            //                .then(function (response) {
            //                        // success
            //                        $scope.success = "Please check your mail for a password reset link";
            //                        $scope.alert = true;
            //                        setTimeout(function () {
            //                            $window.location.href = '#!login';
            //                        }, 5000);
            //
            //                    },
            //                    function (error) { // optional
            //                        // failed
            //                        alert("Errors in the fields !");
            //                    });

        }
    });
