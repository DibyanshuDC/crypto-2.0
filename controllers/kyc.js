'use strict';

angular.module('cryptoCentric')
    .controller('KycCtrl', function ($scope, $filter) {
        M.AutoInit();
        $scope.alert = true;
        $scope.max_steps = 4;
        var next = false;
        next = true; // delete
        $scope.progress = 2;
        $scope.save = function () {

        }

        $scope.supportdocs = [{}];
        $scope.updateDocs = function (item) {
            $scope.score = $scope.score + item.value;
            $scope.supportdocs.push({});
            $filter('filterName')($scope.docs, item.value);
        }

        $scope.score = 0;

        $scope.docs = [
            {
                idType: "Passport",
                value: 70
        }, {
                idType: "Birth Certificate",
                value: 70
        },
            {
                idType: "Citizenship",
                value: 70
        },
            {
                idType: "ICard Public Employee",
                value: 40
        },
            {
                idType: "ICard Public Employee",
                value: 40
        },
            {
                idType: "Other Auth by State ",
                value: 35
        },
            {
                idType: "Mortgage/Land Tax",
                value: 35
        },
            {
                idType: "Credit Card",
                value: 25
        },
            {
                idType: "Rent Agreement",
                value: 25
        }];

        $scope.submit = function () {
            $scope.save();
            if (next && ($scope.progress < $scope.max_steps)) {
                $scope.progress = $scope.progress + 1;
                //save the new progress on server
            }

        };


        //        var elem1 = document.querySelector('select');
        //var instance = M.FormSelect.init(elem1, {});
        //        var elems = document.querySelectorAll('select');
        //        var instances = M.FormSelect.init(elems, {});
        //        var instance = M.FormSelect.getInstance(instances);





    });
