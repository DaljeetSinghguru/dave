app.controller('ItemListController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
        debugger;

        $scope.Url = ViewVariablesService.GetBaseAddress();
        $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();
        $scope.ShowCategoryLevel2list = false;
        $scope.ShowCategoryLevel1list = false;
        $scope.ItemListDetails = ViewVariablesService.GetDatasendToItemListPage();
        //if ($scope.ItemListDetails == {} || $scope.ItemListDetails == undefined) {
        //    $scope.ShowCategorylist = true;
        //}
        //else {
        //    $scope.ShowCategorylist = false;
        //}
        $scope.ItemListPageCategory = ViewVariablesService.GetDatasendToItemListPageCategory();
        //if ($scope.ItemListPageCategory == {} || $scope.ItemListPageCategory == undefined) {
        //    $scope.ShowCategoryLevel2list = true;
        //}
        //else {
        //    $scope.ShowCategoryLevel2list = false;
        //}
        $scope.ItemListPageCategoryLevel2 = ViewVariablesService.GetDatasendToItemListPageCategoryLevel2();
        //if ($scope.ItemListPageCategoryLevel2 == {} || $scope.ItemListPageCategoryLevel2 == undefined) {
        //    $scope.ShowCategoryLevel1list = true;
        //}
        //else {
        //    $scope.ShowCategoryLevel1list = false;
        //}
        $scope.ItemListPageCategoryLevel1 = ViewVariablesService.GetDatasendToItemListPageLevel1();
        $scope.topProductshowonfront = ViewVariablesService.GetDataofMenu();


        ///show hide box of category and item

        if ($scope.ItemListPageCategoryLevel1.filename != undefined || $scope.ItemListPageCategoryLevel1.filename == null)
        {
            $scope.ShowCategoryLevel1list = true;
        }




        $scope.ShowItemDetail = function (ItemData) {

            $scope.SingleItemData = ItemData;

            ViewVariablesService.SetSingleItemData($scope.SingleItemData);
            $location.path('ItemDetail');
        }

        $scope.ShowItemDetailCategory = function (data) {
            debugger

            //call API FOR GET ITESM
            $scope.CategoryId = data.Value;
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategoryId?CategoryId=' + $scope.CategoryId + ''
            }).
                success(function (data, status, headers, config) {
                    debugger

                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $scope.ShowCategoryLevel2list = false;
                    $scope.ShowCategoryLevel1list = false;
                    $scope.ShowCategorylist = false;
                }).
                error(function (data, status, headers, config) {
                });


           
        }
        $scope.ShowCategoryLevel3 = function (data) {
            $scope.ItemListPageCategory = data;
            ViewVariablesService.SetDatasendToItemListPageCategory(data);
            $scope.ShowCategoryLevel2list = false;
            $scope.ShowCategoryLevel1list = false;
            $scope.ShowCategorylist = true;
        }
        $scope.ShowCategoryLevel1 = function (data) {
            $scope.ItemListPageCategoryLevel2 = data;
            ViewVariablesService.SetDatasendToItemListPageCategoryLevel2(data);
            $scope.ShowCategoryLevel2list = true;
            $scope.ShowCategoryLevel1list = false;
            //$scope.ShowCategorylist = false;

        }



    }]);