app.controller('DefaultController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate','$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
  
debugger
    
        $http({method: 'GET', url: $scope.Url + 'Category/Category_Get'
                }).
                success(function (data, status, headers, config) {
                    
                    $scope.topProductshowonfront = data;
               
                }).
                error(function (data, status, headers, config) {
            });


        $scope.CategoryClick = function (categorydata) {
            debugger
            
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + categorydata.CategoryId + ''
            }).
                success(function (data, status, headers, config) {
                    debugger

                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $location.path('ItemList');

                }).
                error(function (data, status, headers, config) {
                });
        }
}]);