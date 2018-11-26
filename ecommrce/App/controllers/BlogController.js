app.controller('BlogsController', ['$scope', '$window', '$location', '$route','$http',
    function ($scope, $window, $location, $route, $http) {

        $http({
            method: 'GET', url: $scope.Url + 'Blog/GetAllBlogData'
        }).
            success(function (data, status, headers, config) {
                debugger
                $scope.BlogData = data;

            }).
            error(function (data, status, headers, config) {
            });

        $scope.openblog = function (Id) {
            debugger

            var path = "/blogdetail/" + Id;
            $location.path(path);


          
        }
    }])



