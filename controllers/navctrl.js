'use strict';

angular.module('cryptoCentric')
    .controller('NavCtrl', function ($scope, $location) {
        $scope.currentPage = $location.path().substr(1).split('/');
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


        $scope.menus = [
            {
                path: '/',
                title: 'Dashboard'
            },
            {
                path: '/wallet/usd',
                title: 'Wallets'
            },
            {
                path: '/orders',
                title: 'Orders'
            },
            {
                path: '/market/usd',
                title: 'Markets'
            },
            {
                path: '/bank_account',
                title: 'Bank Accounts'
            },
        ];
        $scope.isActive = function (item) {
            return item.path == $location.path();
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
