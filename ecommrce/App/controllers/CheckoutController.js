app.controller('CheckoutController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {

        debugger

        $scope.totalAmount = totalAmount;

        $scope.onSubmit = function () {
            $scope.processing = true;
        };

        $scope.stripeCallback = function (code, result) {
            $scope.processing = false;
            $scope.hideAlerts();
            if (result.error) {
                $scope.stripeError = result.error.message;
            } else {
                $scope.stripeToken = result.id;
            }
        };

        $scope.hideAlerts = function () {
            $scope.stripeError = null;
            $scope.stripeToken = null;
        };
    }]);