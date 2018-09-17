app.controller('MyCartController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location, $sce) {
        debugger
        var myPassword = "MAKV123456789312";
        $scope.items = [];
        // load items from local storage
        // load items from local storage
        $scope.loadItems = function () {
            debugger
            // empty list
            $scope.items.splice(0, $scope.items.length);
            var items = localStorage != null ? localStorage[$scope.cartName + "_items"] : null;


            // load from local storage
            if (items != null && JSON != null) {
                try {
                    $scope.decryptedUserName = CryptoJS.AES.decrypt(items, myPassword);
                    var decryptItems = $scope.decryptedUserName.toString(CryptoJS.enc.Utf8);

                    var items = JSON.parse(decryptItems);
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
                            item = new cartItem(item.sku, item.name, item.price, item.quantity, item.IsStockPresent);
                            $scope.items.push(item);
                        }
                    }
                }
                catch (err) {
                    // ignore errors while loading...
                }
            }

            // notify listeners of change
            if ($scope.itemsChanged) {
                $scope.itemsChanged();
            }
        }
        $scope.itemsChanged = function (e) {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        function cartItem(sku, name,  price, quantity, IsStockPresent) {
            this.sku = sku;
            this.name = name;
           
            this.price = price * 1;
            this.quantity = quantity * 1;
            this.IsStockPresent = IsStockPresent;
           
           
        }
        $scope.loadItems();



       // $scope.CheckOut = function () {
            debugger

            //check if it is already login then go to payment gate way 
            //otherwaisego to login page

            //if ($location.path() == '/Login') {
            //    $route.reload();
            //}
            //else {
            //    $location.path('Login');
            //}
            $scope.getCartPrice = "100";
            $scope.CheckOut = function () {
                //$modal.open({
                //    templateUrl: 'App/views/Checkout.html',
                //    controller: 'App/controllers/CheckoutController',
                //    resolve: {
                //        totalAmount: $scope.getCartPrice
                //    }
                //});

                $scope.modalInstanceExtention = $modal.open({
                    scope: $scope,
                    templateUrl: 'App/views/Checkout.html',
                   // controller: 'App/controllers/CheckoutController',
                    size: "lg",
                });
            };
        //}

            $scope.totalAmount = "100";

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

    }])