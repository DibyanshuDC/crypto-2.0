'use strict';

angular.module('cryptoCentric')
    .controller('RegCtrl', function ($scope, $http, $window, cons) {

        $scope.success = '';


        $scope.alert = false;
        $scope.register = function () {

            if ($scope.password === $scope.password2 && $scope.contact) {


                var userData = {

                    "schemas": [
                        "urn:ietf:params:scim:schemas:core:2.0:User",
                        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
                        "urn:ietf:params:scim:schemas:extension:oracle:2.0:OIG:User"
                    ],
                    "userName": $scope.email,
                    "name": {
                        "familyName": $scope.lname,
                        "fname": $scope.fname

                    },
                    "password": $scope.password,
                    "displayName": $scope.email.split('@'),
                    "phoneNumbers": [
                        {
                            "value": $scope.contact,
                            "type": "work"
                },
                        {
                            "value": $scope.contact,
                            "type": "mobile"
                }
            ],
                    "userType": "Contractor",
                    "urn:ietf:params:scim:schemas:extension:oracle:2.0:OIG:User": {
                        "homeOrganization": {
                            "value": "1",
                            "$ref": cons.bs.im + "idaas/im/scim/v1/Organizations/1"
                        }
                    }

                };

                $http({
                        url: cons.bs.im + 'idaas/im/scim/v1/Users',
                        method: "POST",
                        data: userData,
                        headers: {
                            'Authorization': 'Basic eGVsc3lzYWRtOldlbGNvbWUx',
                            'Content-Type': "application/scim+json"
                        }
                    })
                    .then(function (response) {
                            // success
                            $scope.success = "You are registered";
                            $scope.alert = true;
                            setTimeout(function () {
                                $window.location.href = '#!login';
                            }, 5000);

                        },
                        function (error) { // optional
                            // failed
                            alert("Errors in the fields !");
                        });
            } else {
                console.log("correct details");
            }
        }

    });
