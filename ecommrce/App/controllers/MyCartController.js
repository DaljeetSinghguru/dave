app.controller('MyCartController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location, $sce) {
        debugger

        $scope.logindetails = ViewVariablesService.Getlogindetails();

        $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();
        $scope.cartName = "DAVE";
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
                        debugger
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
            //   debugger
            var total = 0;

            total = this.toNumber(qty * price);
            return total;
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
        $scope.Token = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJiMzZmNDQ4YTNkNDZkODNiMjBjNzgxMmRhMTU0MWRlYzZkZjMwZjMzODFiMzY1MmE1MzBiNDg4NDRkNmQ2MTc0fGNyZWF0ZWRfYXQ9MjAxOC0wOS0xOVQxMDowMTo0OS4wNTk5ODA1NzUrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgifSwiY2hhbGxlbmdlcyI6W10sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8zNDhwazljZ2YzYmd5dzJiL2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=";



        ////check krna user is login or not if user is not login then goto login page 
        //other wsie go to paymentgateway
        $scope.PlaceOrder = function () {
            if ($scope.logindetails) {
                $scope.Orders();
            }
            else {
               // go to login pagee
               // $scope.Orders();

                $location.path('Login');
            }
        }
          

        $scope.Orders = function () {
            //check login user or not
            debugger


            $scope.items;


            ////////
            ////send mail
            ///////////

            //$scope.totalPrice = $scope.getTotalPrice();
            ////generate Payment nouns from token
            //var button = document.querySelector('#submit-button');
            //if ($scope.Token) {
            //    braintree.dropin.create({
            //        authorization: $scope.Token,
            //        container: '#dropin-container'
            //    }, function (createErr, instance) {
            //        debugger
            //        button.addEventListener('click', function () {
            //            instance.requestPaymentMethod(function (err, payload) {
            //                // Submit payload.nonce to your server
            //                // payload.nonce

            //                $location.path('Thankyou');
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
            //                            $scope.dataSendToHistory.HrUserId = $scope.HrUserId;
            //                            $scope.dataSendToHistory.ItemsArray = $scope.items;
            //                            $scope.dataSendToHistory.totalPrice = $scope.totalPrice;
            //                            $scope.dataSendToHistory.FirstName = $scope.FirstName;
            //                            $scope.dataSendToHistory.LastName = $scope.LastName;
            //                            $scope.dataSendToHistory.ContactNumber = $scope.ContactNumber;
            //                            $scope.dataSendToHistory.DateOfBirth = $scope.DateOfBirth;
            //                            $scope.dataSendToHistory.BillingAddress = $scope.BillingAddress;
            //                            $scope.dataSendToHistory.ShippingAddress = $scope.ShippingAddress;
            //                            $scope.dataSendToHistory.PINCode = $scope.PINCode;
            //                            $scope.dataSendToHistory.EmailAddress = $scope.EmailAddress;



            //                        //if ($scope.HrUserId == null) {
            //                        //    //GET HRUSERID FROM DATABASE
            //                        //    $scope.param = { "FirstName": $scope.FirstName, "ContactNumber": $scope.ContactNumber };
            //                        //    $http({ method: 'POST', url: $scope.Url + 'HrUserDetail/GetHrUserDetail/', data: $scope.param }).
            //                        //        success(function (dataHrUserId, status, headers, config) {

            //                        //            $scope.dataSendToHistory = {};
            //                        //            $scope.dataSendToHistory.HrUserId = dataHrUserId;
            //                        //            $scope.HrUserId = $scope.dataSendToHistory.HrUserId;
            //                        //            $scope.dataSendToHistory.TransectionId = dataTransectionId;
            //                        //            $scope.dataSendToHistory.ItemsArray = $scope.items;
            //                        //            $scope.dataSendToHistory.totalPrice = $scope.totalPrice;
            //                        //            $scope.dataSendToHistory.FirstName = $scope.FirstName;
            //                        //            $scope.dataSendToHistory.LastName = $scope.LastName;
            //                        //            $scope.dataSendToHistory.ContactNumber = $scope.ContactNumber;
            //                        //            $scope.dataSendToHistory.DateOfBirth = $scope.DateOfBirth;
            //                        //            $scope.dataSendToHistory.BillingAddress = $scope.BillingAddress;
            //                        //            $scope.dataSendToHistory.ShippingAddress = $scope.ShippingAddress;
            //                        //            $scope.dataSendToHistory.PINCode = $scope.PINCode;
            //                        //            $scope.dataSendToHistory.EmailAddress = $scope.EmailAddress;

            //                        //            $http({ method: 'POST', url: $scope.Url + 'ShipmentHistory/ShipmentHistory/', data: $scope.dataSendToHistory }).
            //                        //                success(function (data, status, headers, config) {

            //                        //                    $scope.Token = data;
            //                        //                    $window.localStorage.clear();
            //                        //                    $scope.items = [];
            //                        //                }).
            //                        //                error(function (data, status, headers, config) {
            //                        //                });
            //                        //            //INSERT DATA INTO ACCOUNT
            //                        //            //$http({ method: 'POST', url: $scope.Url + 'ShopAccount/ShopInsertintoAccount/', data: $scope.dataSendToHistory }).
            //                        //            //    success(function (data, status, headers, config) {
            //                        //            //        $scope.Token = data;
            //                        //            //    }).
            //                        //            //    error(function (data, status, headers, config) {
            //                        //            //    });
            //                        //        }).
            //                        //        error(function (data, status, headers, config) {
            //                        //        });
            //                        //}
            //                        //else {

            //                        //    $scope.dataSendToHistory = {};
            //                        //    //$scope.dataSendToHistory.HrUserId = data;
            //                        //    $scope.dataSendToHistory.TransectionId = dataTransectionId;
            //                        //    $scope.dataSendToHistory.HrUserId = $scope.HrUserId;
            //                        //    $scope.dataSendToHistory.ItemsArray = $scope.items;
            //                        //    $scope.dataSendToHistory.totalPrice = $scope.totalPrice;
            //                        //    $scope.dataSendToHistory.FirstName = $scope.FirstName;
            //                        //    $scope.dataSendToHistory.LastName = $scope.LastName;
            //                        //    $scope.dataSendToHistory.ContactNumber = $scope.ContactNumber;
            //                        //    $scope.dataSendToHistory.DateOfBirth = $scope.DateOfBirth;
            //                        //    $scope.dataSendToHistory.BillingAddress = $scope.BillingAddress;
            //                        //    $scope.dataSendToHistory.ShippingAddress = $scope.ShippingAddress;
            //                        //    $scope.dataSendToHistory.PINCode = $scope.PINCode;
            //                        //    $scope.dataSendToHistory.EmailAddress = $scope.EmailAddress;

            //                        //    $http({ method: 'POST', url: $scope.Url + 'ShipmentHistory/ShipmentHistory/', data: $scope.dataSendToHistory }).
            //                        //        success(function (data, status, headers, config) {

            //                        //            $scope.Token = data;
            //                        //            $window.localStorage.clear();
            //                        //            $scope.items = [];
            //                        //        }).
            //                        //        error(function (data, status, headers, config) {
            //                        //        });
            //                        //    //INSERT DATA INTO ACCOUNT
            //                        //    //$http({ method: 'POST', url: $scope.Url + 'ShopAccount/ShopInsertintoAccount/', data: $scope.dataSendToHistory }).
            //                        //    //    success(function (data, status, headers, config) {
            //                        //    //        $scope.Token = data;
            //                        //    //    }).
            //                        //    //    error(function (data, status, headers, config) {
            //                        //    //    });

            //                        //}




            //                        //save transaction into Database and accounts 

            //                        //$scope.IndexPage = false;
            //                        //$scope.DetailPage = false;
            //                        //$scope.CheckOutpage = false;
            //                        //$scope.Loginpage = false;
            //                        //$scope.RegistrationPage = false;
            //                        //$scope.ThankYouPage = true;
            //                        //$scope.PaymentPage = false;
            //                        //$scope.OrderHistoryPage = false;
            //                        //$scope.ContactUsPage = false;
            //                        //$scope.ForgetPasswordPage = false;

            //                        //$window.localStorage.clear();
            //                    }).
            //                    error(function (data, status, headers, config) {
            //                    });
            //            });
            //        });
            //    });
            //}


            $window.localStorage.clear();

        }



        $scope.deleteRowFromBasket = function (data) {

            $scope.items.splice($scope.items.indexOf(data), 1);
            localStorage.setItem($scope.cartName + "_items", CryptoJS.AES.encrypt(JSON.stringify($scope.items), myPassword));
            
            $scope.loadItems();
           // $scope.saveItems();
        }

        $scope.getTotalCount = function (sku) {
            //    debugger
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
            //   debugger
            var total = 0;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (sku == null || item.sku == sku) {
                    total += this.toNumber(item.quantity * item.price);
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

    }])


