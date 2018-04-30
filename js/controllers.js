app.controller("myController", function ($scope, $routeParams) {
        $scope.message = "Hello World";
        $scope.type = $routeParams.type;
    })
    .controller("ApiDataController", function ($scope, $http) {
        $http.get("https://jsonplaceholder.typicode.com/posts/1")
            .then(function (response) {
                $scope.responseData = response.data;
            });
    });
