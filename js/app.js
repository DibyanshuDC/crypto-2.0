var app = angular.module("cryptoCentric", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "views/dashboard.html",
            controller: "DashCtrl"
        }).
        when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginCtrl"
        }).
        when("/register", {
            templateUrl: "views/register.html",
            controller: "RegCtrl"
        }).
        when("/orders", {
            templateUrl: "views/orders.html",
            controller: "OrdersCtrl"
        }).
        when("/wallet/:type", {
            templateUrl: "views/wallets.html",
            controller: "WalletsCtrl"
        }).
        when("/market/:type", {
            templateUrl: "views/market.html",
            controller: "MarketCtrl"
        }).
        when("/bank_account", {
            templateUrl: "views/bank_account.html",
            controller: "BankCtrl"
        }).
        when("/:username/profile", {
            templateUrl: "views/profile.html",
            controller: "UserCtrl"
        }).
        when("/:username/kyc", {
            templateUrl: "views/kyc.html",
            controller: "KycCtrl"
        }).
        when("/:username/twofa", {
            templateUrl: "views/twofa.html",
            controller: "TwoFACtrl"
        }).
        otherwise({
            redirectTo: "/"
        });
        //$locationProvider.html5Mode(true).hashPrefix('!');
        // $locationProvider.hashPrefix('!');




    });
