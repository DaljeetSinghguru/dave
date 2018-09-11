app.controller('DefaultController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate','$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
  
debugger
    
        $http({
                method: 'GET', url: $scope.Url + 'Category/Category_Get'
                }).
                success(function (data, status, headers, config) {
                    
                    $scope.topProductshowonfront = data;
               
                }).
                error(function (data, status, headers, config) {
            });
}]);