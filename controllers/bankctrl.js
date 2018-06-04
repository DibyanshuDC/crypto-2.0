'use strict';

angular.module('cryptoCentric')
    .controller('BankCtrl', function ($scope, $http, cons, $window, $route) {
        M.AutoInit();
        $scope.alert = false;


        var token = localStorage.getItem("token");
        var userkey = localStorage.getItem("userkey");
        $scope.username = localStorage.getItem("name");


        $scope.addAccBox = false;
        $scope.addAcchandler = function () {
            $scope.addAccBox = true;
        }

        $scope.cancel = function () {
            $scope.addAccBox = false;
        };

        $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/fetch/banklist',
                method: "GET",
            })
            .then(function (response) {
                // success
                $scope.bankList = response.data;

            });


        $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/fetch/bankaccount?usr_key=' + userkey + '&access_token=' + token,
                method: "GET",
            })
            .then(function (response) {
                // success
                $scope.bankAccs = response.data;
            });


        $scope.confirmAddAcc = function () {

            var bankdetails = {
                "BANK_NAME": $scope.bank_name,
                "USR_NAME": $scope.username,
                "BSB_CODE": $scope.acc_bsb,
                "ACCOUNT_NUMBER": $scope.acc_num,
                "BRANCH_NAME": $scope.acc_branch,
                "USR_KEY": userkey,
                "IS_PRIMARY": "0",
                "DESCRIPTION": $scope.acc_descr,
                "ACCESS_TOKEN": token
            };



            $http({
                url: cons.bs.o + 'DBOperations/rest/UserService/insert/bankaccount',
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
        };




        $scope.deleteAcc = function (acc) {

            $http({
                    url: cons.bs.o + 'DBOperations/rest/UserService/delete/bankaccount',
                    method: "POST",
                    data: {
                        "ACCOUNT_NUMBER": acc.account_number,
                        "USR_KEY": userkey,
                        "ACCESS_TOKEN": token
                    }
                })
                .then(function (response) {
                    // success
                    $route.reload();

                });

        };


        //        $scope.deleteAcc = function (acc) {
        //            $scope.modalInfo = {
        //                "text_dsc": "Are you sure you want to delete " + order.id + " ?",
        //                "buttons": [{
        //                    text: "Cancel",
        //                    class: "gray margin-sm "
        //                }, {
        //                    text: "Confirm",
        //                    class: "red margin-sm "
        //                }]
        //
        //            }
        //            //show a popup
        //            var elem = document.querySelector('#modal1');
        //            var instance = M.Modal.getInstance(elem);
        //            instance.open();
        //        };

        //            $http({
        //                    url: cons.bs.o + 'DBOperations/rest/UserService/fetch/bankaccount?usr_key=' + userkey + '&access_token=' + token,
        //                    method: "GET",
        //                })
        //                .then(function (response) {
        //                    // success
        //                    $scope.bankAccs = response.data;
        //
        //                });



        $scope.makePrimaryAcc = function (acc) {
            $http({
                    url: cons.bs.o + 'DBOperations/rest/UserService/update/bankaccount',
                    method: "PUT",
                    data: {
                        "ACCOUNT_NUMBER": acc.account_number,
                        "USR_KEY": userkey,
                        "ACCESS_TOKEN": token
                    }
                })
                .then(function (response) {
                    // success
                    $route.reload();

                });
        };






    });
