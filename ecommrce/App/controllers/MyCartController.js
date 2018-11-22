app.controller('MyCartController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location, $sce) {
        




        $scope.logindetails = ViewVariablesService.Getlogindetails();

        $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();
        $scope.cartName = "DAVE";
        var myPassword = "MAKV123456789312";
        $scope.items = [];

        ////get token

       $scope.Logincredential = localStorage != null ? localStorage["credential"] : null;
        if ($scope.Logincredential) {
            $rootScope.DisplayUserName = JSON.parse($scope.Logincredential).UserName;
            if ($rootScope.DisplayUserName != null || $rootScope.DisplayUserName != undefined || $rootScope.DisplayUserName !="") {
                $rootScope.showloginbutton = false;
            }
            else {
                $rootScope.showloginbutton = true;

            }
        }

        // load items from local storage
        // load items from local storage
        $scope.loadItems = function () {
            
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
                            item = new cartItem(item.sku, item.name, item.price, item.quantity, item.IsStockPresent, item.ItemImage);
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
        function cartItem(sku, name, price, quantity, IsStockPresent,image) {
            this.sku = sku;
            this.name = name;

            this.price = price * 1;
            this.quantity = quantity * 1;
            this.IsStockPresent = IsStockPresent;
            this.image = image

        }

        $scope.getLinePrice = function (price, qty) {
            //   
            var total = 0;
            var Price = price * $rootScope.currentRate;
            total = this.toNumber(qty * Price);
            return total;
        }
        $scope.loadItems();

        $scope.totalPrice = $scope.getTotalPrice();
        //Get Token Request for braintree paymentgateway
        $scope.param = { "Amount": "" + $scope.totalPrice +"", "payment_method_nonce": "" };
        $http({ method: 'POST', url: $scope.Url + 'Payment/RequestToken/' }).
            success(function (data, status, headers, config) {
                $scope.Token = data;
            }).
            error(function (data, status, headers, config) {
            });

        // $scope.CheckOut = function () {
        

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
        //}
      

        ////check krna user is login or not if user is not login then goto login page 
        //other wsie go to paymentgateway
        $scope.PlaceOrder = function () {
            
            $scope.Logincredential = localStorage != null ? localStorage["credential"] : null;

            if ($scope.Logincredential != null) { $scope.Orders(); }
            else { $location.path('Login');}

            //if ($scope.logindetails) {
            //    $scope.Orders();
            //}
            //else {
            //   // go to login pagee
            //   // $scope.Orders();

            //    $location.path('Login');
            //}
        }
          

        $scope.Orders = function () {
            //check login user or not
            
             $scope.dataSendToHistory = {};
             $scope.dataSendToHistory.TransectionId = "TESTTOKEN";
    
             $scope.dataSendToHistory.ItemsArray = $scope.items;
             $scope.dataSendToHistory.totalPrice = $scope.totalPrice;
             $scope.dataSendToHistory.Logincredentialusername = JSON.parse($scope.Logincredential).username;
             $scope.dataSendToHistory.Logincredentialpassword = JSON.parse($scope.Logincredential).password;
             $scope.dataSendToHistory.CustId = JSON.parse($scope.Logincredential).UserId;
             $http({ method: 'POST', url: $scope.Url + 'Order/ShipmentHistory/', data: $scope.dataSendToHistory }).
                                            success(function (data, status, headers, config) {
                                                if (status == "200") {
                                                    if (data != "") {
                                                        

                                                        ViewVariablesService.SetOrderId(data);
                                                        //$scope.Token = data;
                                                        //$window.localStorage.clear();
                                       //$scope.items = [];

                                       $location.path('Thankyou');


                                       /////send mail to user





                                   }
                               }

                           }).
                           error(function (data, status, headers, config) {
                           });


            //$scope.items;


            //////////
            //////send mail
            /////////////



            //$scope.totalPrice = $scope.getTotalPrice();
            ////generate Payment nouns from token
            //var button = document.querySelector('#submit-button');
            //if ($scope.Token) {
            //    braintree.dropin.create({
            //        authorization: $scope.Token,
            //        container: '#dropin-container'
            //    }, function (createErr, instance) {
                    
            //        button.addEventListener('click', function () {
            //            instance.requestPaymentMethod(function (err, payload) {
            //                // Submit payload.nonce to your server
            //                // payload.nonce

            //                //$location.path('Thankyou');
            //                $scope.param = { "Amount": $scope.totalPrice, "payment_method_nonce": payload.nonce };
            //                $http({ method: 'POST', url: $scope.Url + 'Payment/Request/', data: $scope.param }).
            //                    success(function (dataTransectionId, status, headers, config) {



                                   
                                    
            //                        ///////////////////////////
            //                        ///////when user login its relevent all detail will get 
            //                        //from database and store that into 
            //                        /////////////////////view variable service 
            //                        /////////////////////get that save data from service and 
            //                        //send order history to thankyou page
            //                        ///////////////////////
            //                        ///////////////////////////create order history
            //                        /////////////////////////////descrese stock from inventory
            //                        /////////////////////////////email slip to customer 
            //                        //////////////////////////// send data to thankyou page 


            //                            $scope.dataSendToHistory = {};
            //                            $scope.dataSendToHistory.TransectionId = dataTransectionId;
    
            //                            $scope.dataSendToHistory.ItemsArray = $scope.items;
            //                            $scope.dataSendToHistory.totalPrice = $scope.totalPrice;
            //                            $scope.dataSendToHistory.Logincredentialusername = JSON.parse($scope.Logincredential).username;
            //                            $scope.dataSendToHistory.Logincredentialpassword = JSON.parse($scope.Logincredential).password;
            //                            $scope.dataSendToHistory.CustId = JSON.parse($scope.Logincredential).UserId;
            //                            $http({ method: 'POST', url: $scope.Url + 'Order/ShipmentHistory/', data: $scope.dataSendToHistory }).
            //                                success(function (data, status, headers, config) {
            //                                    if (status == "200") {
            //                                        if (data != "") {
                                                        

            //                                            ViewVariablesService.SetOrderId(data);
            //                                            //$scope.Token = data;
            //                                            //$window.localStorage.clear();
            //                                            //$scope.items = [];

            //                                            $location.path('Thankyou');


            //                                            /////send mail to user





            //                                        }
            //                                    }

            //                                }).
            //                                error(function (data, status, headers, config) {
            //                                });


                                  

            //                    }).
            //                    error(function (data, status, headers, config) {
            //                    });
            //            });
            //        });
            //    });
            //}


            //$window.localStorage.clear();

        }



        $scope.deleteRowFromBasket = function (data) {

            $scope.items.splice($scope.items.indexOf(data), 1);
            localStorage.setItem($scope.cartName + "_items", CryptoJS.AES.encrypt(JSON.stringify($scope.items), myPassword));
            
            $scope.loadItems();
           // $scope.saveItems();
        }

        $scope.getTotalCount = function (sku) {
            //    
            var count = 0;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (sku == null || item.sku == sku) {
                    count += this.toNumber(item.quantity);
                }
            }
            return count;
        }
        // get the total price for all items currently in the cart
        $scope.getTotalPrice = function (sku) {
            //   
            var total = 0;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (sku == null || item.sku == sku) {
                    var totalamount = item.price * $rootScope.currentRate;
                    total += this.toNumber(item.quantity * totalamount);
                }
            }
            return total;
        }
        $scope.toNumber = function (value) {
            value = value * 1;
            return isNaN(value) ? 0 : value;
        }
        $scope.saveItems = function () {

            if (localStorage != null && JSON != null) {
                localStorage[$scope.cartName + "_items"] = JSON.stringify($scope.items);
            }
        }

$scope.ContinueToBasket=function(){
$location.path('Default');
}

    }])


