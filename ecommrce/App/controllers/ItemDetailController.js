app.controller('ItemDetailController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location,$sce) {
        debugger
        $scope.SingleItemDataInDetail = ViewVariablesService.GetSingleItemData();
        $scope.Description = $sce.trustAsHtml($scope.SingleItemDataInDetail.Description);
        //$scope.html = '<ul><li>render me please</li></ul>';
        //$scope.trustedHtml = $sce.trustAsHtml($scope.html);
        //$scope.Description = $scope.SingleItemDataInDetail.Description;
    }])