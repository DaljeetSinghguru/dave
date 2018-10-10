app.controller('DefaultController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate','$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
  

 $scope.Logincredential = localStorage != null ? localStorage["credential"] : null;
        if ($scope.Logincredential) {
            $rootScope.DisplayUserName = JSON.parse($scope.Logincredential).UserName;
            if ($rootScope.DisplayUserName != null || $rootScope.DisplayUserName != undefined || $rootScope.DisplayUserName !="") {
                $rootScope.showloginbutton = false;
            }
            else {
                $rootScope.showloginbutton = true;

            }
        }
    
        $http({method: 'GET', url: $scope.Url + 'Category/Category_Get'
                }).
                success(function (data, status, headers, config) {
                    
                    $scope.topProductshowonfront = data;
               
                }).
                error(function (data, status, headers, config) {
            });

        $http({
            method: 'GET', url: $scope.Url + 'Category/GetHotSaleItem'
        }).
            success(function (data, status, headers, config) {

                $scope.topHotSaleItem = data;


            }).
            error(function (data, status, headers, config) {
            });


        $scope.CategoryClick = function (categorydata) {
            
            
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + categorydata.CategoryId + ''
            }).
                success(function (data, status, headers, config) {
                    

                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $location.path('ItemList');

                }).
                error(function (data, status, headers, config) {
                });
        }


        $scope.ItemClick = function (data) {
            debugger
            $scope.SingleItemData = data;

            ViewVariablesService.SetSingleItemData($scope.SingleItemData);
            $location.path('ItemDetail');
        }
}]);