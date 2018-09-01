app.controller('ShopDetailCtrl', function ($scope, $http,  $window, $rootScope, ShopService) {
   

    
    $scope.$watch(function () { return ShopService.getXxx(); }, function (newValue, oldValue) {
        
        if (newValue != null) {
            //update Controller2's xxx value
            $scope.xxx = newValue;
        }
    }, true);


});