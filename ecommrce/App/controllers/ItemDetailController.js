app.controller('ItemDetailController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
        debugger
        $scope.SingleItemDataInDetail = ViewVariablesService.GetSingleItemData();
        $scope.Description = $scope.SingleItemDataInDetail.Description;
        
    }])