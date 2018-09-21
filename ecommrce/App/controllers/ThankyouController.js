app.controller('ThankyouController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location, $sce) {
        debugger


        // print  div PrintMe 


        $scope.printReceiptDataFromModal = function (divName) {
            debugger
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=900,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><style type="text/css">.k-grid .k-icon {background: none;display: none;}</style> <link href="ThirdParty/kendo/styles/kendo.common.min.css" rel="stylesheet" /><link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.common-material.min.css" /><link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.material.min.css" /><link href="Content/css/kendo.custom.css" rel="stylesheet" /><link href="Content/css/SlimsStyle.css" rel="stylesheet" /><link href="ThirdParty/MetronixTheme/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.material.mobile.min.css" /><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
            //$scope.modalInstanceCFPExtention.dismiss('cancel');
        }
    }])



//WITH cte AS(
//    SELECT  coa.*
//    FROM    Mst_Inv_Category as coa
//        WHERE   coa.CategoryId = 86
//        UNION ALL
//        SELECT  t.*
//    FROM    Mst_Inv_Category t INNER JOIN
//                cte x ON t.IsParentId = x.CategoryId)

//SELECT i.* FROM cte ct inner join daljeet.Trn_LinkCategoryItem li on li.SubCategoryId = ct.CategoryId inner join Mst_Item i on i.ItemStockCode = li.ItemStockCode
