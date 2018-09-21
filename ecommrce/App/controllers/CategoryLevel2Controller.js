app.controller('CategoryLevel2Controller', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
        debugger;
        var myPassword = "MAKV123456789312";
        $scope.Url = ViewVariablesService.GetBaseAddress();
        $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();
        $scope.ShowCategoryLevel2list = false;
        $scope.ShowCategoryLevel1list = false;
        $scope.ShowITEMlist = false;
        $scope.ItemListDetails = ViewVariablesService.GetDatasendToItemListPage();
      
        $scope.ItemListPageCategory = ViewVariablesService.GetDatasendToItemListPageCategory();
      
        $scope.ItemListPageCategoryLevel2 = ViewVariablesService.GetDatasendToItemListPageCategoryLevel2();

      //////////////////////////////////////////////////////////////////////////////////////////////////
        $scope.topProductshowonfront = ViewVariablesService.GetDataofMenu();

        $scope.dataTreeView = $scope.topProductshowonfront;
        $scope.treeData1 = new kendo.data.HierarchicalDataSource({
            data: $scope.dataTreeView,

        });
        $scope.OpenReleventItemByCategory = function (data) {
            debugger
            $scope.categoryID = (data.Value);
            //pass this category id to database and get all item present in category and display in browser
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + $scope.categoryID + ''
            }).
                success(function (data, status, headers, config) {
                    debugger

                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    if ($location.path() == '/ItemList') {
                        $route.reload();
                    }
                    else {
                        $location.path('ItemList');
                    }
                })

        }


        /////////////////////////////////////////////////////////////////////////////////////////////////////
        //show level 2 category
        if ($scope.ItemListPageCategoryLevel2 == {} || $scope.ItemListPageCategoryLevel2 == undefined) {
            $scope.ShowCategoryLevel1list = false;
            $scope.ShowCategorylist = false;
            $scope.ShowITEMlist = false;
        }
        else {
            $scope.ShowCategoryLevel2list = true;
        }
      

        ///show hide box of category and item
       


        
        $scope.ShowCategoryLevel3 = function (data) {
            debugger
            $scope.ItemListPageCategory = data;
            ViewVariablesService.SetDatasendToItemListPageCategory(data);
            $location.path('ItemListCategory1');

        }
        $scope.ShowCategoryLevel1 = function (data) {
            $scope.ItemListPageCategoryLevel2 = data;
            ViewVariablesService.SetDatasendToItemListPageCategoryLevel2(data);
            $scope.ShowCategoryLevel2list = true;
            $scope.ShowCategoryLevel1list = false;
            //$scope.ShowCategorylist = false;

        }



        
    }]);