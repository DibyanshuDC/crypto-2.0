'use strict';

angular.module('cryptoCentric')
    .controller('PriceChangeCtrl', function ($scope, $http) {


        $scope.list = [];


        var myVar = setInterval(myTimer, 2000);

        function myTimer() {


            $http({
                    url: 'http://10.0.5.52:8081/api/coinspotAPI',
                    method: "GET"
                })
                .then(function (response_mule) {

                    $http({
                            url: 'http://edutier.com/onlnChallange/scrape.php?type=buy&coin=btc',
                            method: "GET"
                        })
                        .then(function (response) {

                            var data = response_mule.data.split();
                            data.coinspotWeb = response.data;
                            $scope.list.push(data);
                        });

                });


        };
    });
