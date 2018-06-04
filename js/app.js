var app = angular.module("cryptoCentric", ["ngRoute", "vcRecaptcha"])
    .constant('cons', {
        bs: {
            o: 'http://10.0.5.53:7001/',
            m: 'http://10.0.5.52:8081/api/',
            im: 'http://10.0.5.53:14000/',
            am: 'http://10.0.5.53:8888/'
        },
    })
    .config(function ($routeProvider, $locationProvider, $sceDelegateProvider, cons) {

        $sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.  Notice the difference between * and **.
          'http://10.0.5.52/**',
          'http://10.0.5.53/**'
        ]);

        $routeProvider.

        when("/", {
            templateUrl: "views/home.html",
            controller: "HomeCtrl"
        }).
        when("/dashboard", {
            templateUrl: "views/dashboard.html",
            controller: "DashCtrl"
        }).
        when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginCtrl"
        }).
        when("/forgotpassword", {
            templateUrl: "views/forgot.html",
            controller: "PwdCtrl"
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
        when("/market/:type/:symbol", {
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
        when("/pricechange/:coin", {
            templateUrl: "views/pricechange.html",
            controller: "PriceChangeCtrl"
        }).
        otherwise({
            redirectTo: "/"
        });
        //$locationProvider.html5Mode(true).hashPrefix('!');
        // $locationProvider.hashPrefix('!');




    });
