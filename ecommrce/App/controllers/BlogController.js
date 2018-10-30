app.controller('BlogController', ['$scope', '$window', '$location', '$route',
    function ($scope, $window, $location, $route) {
        $scope.openblog = function () {
            debugger
            if ($location.path() == '/blogdetail') {
                $route.reload();
            } else {
                $location.path('blogdetail');
            }
        }
    }])



