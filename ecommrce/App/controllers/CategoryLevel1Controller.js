app.controller('CategoryLevel1Controller', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
        
        var myPassword = "MAKV123456789312";
        $scope.Url = ViewVariablesService.GetBaseAddress();
        $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();
        $scope.ShowCategoryLevel2list = false;
        $scope.ShowCategoryLevel1list = false;
        $scope.ShowITEMlist = false;
        $scope.ItemListDetails = ViewVariablesService.GetDatasendToItemListPage();

        $scope.ItemListPageCategory = ViewVariablesService.GetDatasendToItemListPageCategory();

        $scope.ItemListPageCategoryLevel2 = ViewVariablesService.GetDatasendToItemListPageCategoryLevel2();

        ///////////////////////////////////////////////////////////////////////////////
        $scope.topProductshowonfront = ViewVariablesService.GetDataofMenu();

        $scope.dataTreeView = $scope.topProductshowonfront;
        $scope.treeData1 = new kendo.data.HierarchicalDataSource({
            data: $scope.dataTreeView,

        });
        $scope.OpenReleventItemByCategory = function (data) {
            
            $scope.categoryID = (data.Value);
            //pass this category id to database and get all item present in category and display in browser



            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + $scope.categoryID  + ''
            }).
                success(function (data, status, headers, config) {
                    

                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    if ($location.path() == '/ItemList') {
                        $route.reload();
                    }
                    else {
                        $location.path('ItemList');
                    }
                   

                }).
                error(function (data, status, headers, config) {
                });
        }


        ///////////////////////////////////////////////////////////////////////////////
        ////show level 1
        //if ($scope.ItemListPageCategoryLevel1) {
        //    if ($scope.ItemListPageCategoryLevel1.filename != undefined || $scope.ItemListPageCategoryLevel1.filename == null) {
        //        $scope.ShowCategoryLevel1list = true;
        //        $scope.ShowCategoryLevel2list = false;
        //        $scope.ShowCategorylist = false;
        //        $scope.ShowITEMlist = false;
        //    }
        //}
        //Show level 3 category
        if ($scope.ItemListPageCategory == {} || $scope.ItemListPageCategory == undefined) {
            $scope.ShowCategoryLevel2list = false;
            $scope.ShowCategorylist = false;
            $scope.ShowITEMlist = false;
        }
        else {
            $scope.ShowCategoryLevel1list = true;
        }
        $scope.ShowItemDetailCategory = function (data) {
            

            //call API FOR GET ITESM
            $scope.CategoryId = data.Value;
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + $scope.CategoryId + ''
            }).
                success(function (data, status, headers, config) {
                    

                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $location.path('ItemList');

                }).
                error(function (data, status, headers, config) {
                });



        }
        $scope.showgridviewdata = false;
        $scope.showlistviewdata = true;
        $scope.showgridview = function () {
            debugger
            $scope.showgridviewdata = true;
            $scope.showlistviewdata = false;
        }
        $scope.showListview = function () {
            $scope.showlistviewdata = true;
            $scope.showgridviewdata = false;
        }
    }]);