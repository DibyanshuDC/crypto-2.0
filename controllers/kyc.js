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

        };


        $scope.userdocs = [''];
        var tempuserdocs = [''];


        $scope.updateDocs = function (i) {

            var currEl = $scope.userdocs[i];

            var count = $filter('filter')($scope.userdocs, currEl);
            var def;

            if (count.length > 1) {
                $scope.userdocs[i] = '';
                tempuserdocs[i] = '';
                def = $filter('filter')($scope.supported_docs, {
                    idType: tempuserdocs[i]
                })[0];

                $scope.score -= def.value;
                if ($scope.score < 1) {
                    $scope.score = 0;
                }
            } else {
                var abc = $filter('filter')($scope.supported_docs, {
                    idType: $scope.userdocs[i]
                })[0];


                if ($scope.userdocs[i] != tempuserdocs[i] && tempuserdocs[i] != '') {
                    def = $filter('filter')($scope.supported_docs, {
                        idType: tempuserdocs[i]
                    })[0];

                    $scope.score -= def.value;
                    //if ($scope.score)


                }
                $scope.score += abc.value;
                tempuserdocs = $scope.userdocs.slice();


                //decrease the score
                //then

                if ($scope.score < 100 && !$scope.userdocs.includes('')) {
                    $scope.userdocs.push('');
                    tempuserdocs.push('');
                }

            };
            if ($scope.score >= 100) {

                for (i = 0; i < $scope.userdocs.length; i++) {
                    if ($scope.userdocs[i] == '') {
                        $scope.userdocs.splice(i, 1);
                        tempuserdocs = $scope.userdocs;
                    }
                }


            }

        };

        $scope.score = 0;

        $scope.supported_docs = [
            {
                name: "Passport",
                idType: "passport",
                value: 70
        }, {
                name: "Birth Certificate",
                idType: "dob",
                value: 70
        },
            {
                name: "Citizenship",
                idType: "citizenship",
                value: 70
        },
            {
                name: "ICard Public Employee",
                idType: "employee",
                value: 40
        },
            {
                name: "Other Auth by State ",
                idType: "otherAuth",
                value: 35
        },
            {
                name: "Mortgage/Land Tax",
                idType: "mortgage",
                value: 35
        },
            {
                name: "Credit Card",
                idType: "creditCard",
                value: 25
        },
            {
                name: "Rent Agreement",
                idType: "rent",
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
