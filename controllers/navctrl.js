'use strict';

angular.module('cryptoCentric')
    .controller('NavCtrl', function ($scope, $http, cons, $location, $window) {

        var token;
        $scope.userName = "";

        $scope.loggedin = false;

        $scope.$watch('loggedin', function () {
            if ($scope.loggedin) {
                $scope.userName = localStorage.getItem("name");
                if ($scope.userName) {
                    $window.location.href = '/#!/dashboard';
                } else {
                    $window.location.href = '/#!/user/profile';
                }
            } else {

                $window.location.href = '/#!/';
            }
        });


        function verifytoken() {
            if (typeof (Storage) !== "undefined") {

                // Retrieve
                token = localStorage.getItem("token");
                // verify token
                if (token) {
                    $scope.userName = localStorage.getItem("name");
                    $scope.loggedin = true;
                }

            } else {
                alert("Sorry, your browser does not support Web Storage...and so this app won't work");
            }
        }

        verifytoken();

        $http({
            url: cons.bs.m + 'exchange?start=' + '0' + '&limit=' + '5',
            method: "GET"
        }).then(function (response) {
            $scope.coins = response.data;
        });



        $scope.logout = function () {
            localStorage.clear();
            $window.location.href = '/';
        };

        $scope.$watch(function () {
            return $location.path();
        }, function (value) {
            $scope.url_address = $location.path();
            $scope.currentPage = $location.path().substr(1).split('/');

            if (!$scope.url_address) {
                $scope.currentPage = $scope.url_address.substr(1).split('/');
            }

            verifytoken();
        });

        $scope.showMobMenu = function () {
            var elem = document.querySelector('.dropdown-trigger.showMob');
            var instance = M.Dropdown.init(elem, {
                closeOnClick: false,
                coverTrigger: false,
                constrainWidth: false,
                isScrollable: true
            });
            instance.open();
        }

        $scope.userDD = function () {
            var elem = document.querySelector('.dropdown-trigger.userDD');
            var instance = M.Dropdown.init(elem, {
                closeOnClick: true,
                coverTrigger: false
            });
            instance.open();
        }


        $scope.publicMenus = [
            {
                path: '/',
                title: 'Home'
            },
            {
                path: '/login',
                title: 'Login'
            }
        ];

        $scope.menus = [
            {
                path: '/dashboard',
                title: 'Dashboard'
            },
            {
                path: '/wallet/aud',
                title: 'Wallets'
            },
            {
                path: '/orders',
                title: 'Orders'
            },
            {
                path: '/market/Bitcoin/btc',
                title: 'Markets'
            },
            {
                path: '/bank_account',
                title: 'Bank Accounts'
            },
        ];
        $scope.isActive = function (item) {
            return item.path == $scope.url_address;
        };

        //        $scope.myDetails = function (index) {
        //            var elem = document.querySelector('.collapsible.expandable');
        //            var instance = M.Collapsible.init(elem, {
        //                accordion: true
        //            });
        //            var elem1 = document.querySelector('.dropdown-trigger.showMob');
        //            var mobMenu = M.Dropdown.getInstance(elem1);
        //            instance.open(index);
        //            setTimeout(function () {
        //                mobMenu.recalculateDimensions();
        //            }, 2000);
        //
        //        }
    });
