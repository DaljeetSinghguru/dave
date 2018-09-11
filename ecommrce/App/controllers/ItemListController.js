app.controller('ItemListController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
        debugger;
        $scope.ItemListDetails = ViewVariablesService.GetDatasendToItemListPage();
        $scope.topProductshowonfront = ViewVariablesService.GetDataofMenu();
        
        //$scope.GetSubMenu = function (toplevel, menuId) {


        //    return toplevel.items.filter(function (obj) {
        //        if (obj.ParentMenuId == menuId) {
        //            return true;
        //        }
        //        return false;
        //    });

        //}

        //$scope.GetSuperSubMenu = function (supersublevel, menuId) {

        //    return supersublevel.items.filter(function (obj) {
        //        if (obj.ParentMenuId == menuId) {
        //            return true;
        //        }
        //        return false;
        //    });
        //}

        //$scope.GetSuperSuperSubMenu = function (suppersupersublevel, menuId1) {

        //    return suppersupersublevel.items.filter(function (obj) {
        //        if (obj.ParentMenuId == menuId1) {
        //            return true;
        //        }
        //        return false;
        //    });
        //}

        //$scope.Mousehoveroncat = function (data) {


        //    $(" .25").hover(function () {

        //        $('.25').addClass('display-on');
        //    });
        //    $(" .29").hover(function () {

        //        $('.29').addClass('display-on');
        //    });
        //    $(" .42").hover(function () {

        //        $('.42').addClass('display-on');
        //    });
        //    $(" .45").hover(function () {

        //        $('.45').addClass('display-on');
        //    });
        //    $(" .50").hover(function () {

        //        $('.50').addClass('display-on');
        //    });
        //    $(" .54").hover(function () {

        //        $('.54').addClass('display-on');
        //    });
        //    $(".drop-down").mouseleave(function () {

        //        $('.mega-menu').removeClass('display-on');
        //    });

        //}

$scope.ShowItemDetail=function(ItemData){

$scope.SingleItemData=ItemData;

 ViewVariablesService.SetSingleItemData($scope.SingleItemData);
  $location.path('ItemDetail');
}



    }]);