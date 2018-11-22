app.controller('MyAccountController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
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
            if ($rootScope.DisplayUserName != null || $rootScope.DisplayUserName != undefined || $rootScope.DisplayUserName != "") {
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
        function cartItem(sku, name, price, quantity, IsStockPresent, image) {
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

        $scope.ContinueToBasket = function () {
            $location.path('Default');
        }




        $scope.logOut = function () {

            $window.localStorage.clear();
            $rootScope.DisplayUserName = "";
            $rootScope.showloginbutton = true;
            $location.path('Default');
        }
        $scope.showOrders = true;

        $scope.openorder = function () {
            $scope.showOrders = true;
            $scope.showDownloads = false;
            $scope.showAddresses = false;
            $scope.showAccountdetail = false;

        }
        $scope.openDownloads = function () {
            $scope.showOrders = false;
            $scope.showDownloads = true;
            $scope.showAddresses = false;
            $scope.showAccountdetail = false;

        }
        $scope.openAddresses = function () {
            $scope.showOrders = false;
            $scope.showDownloads = false;
            $scope.showAddresses = true;
            $scope.showAccountdetail = false;

        }
        $scope.openAccount = function () {
            $scope.showOrders = false;
            $scope.showDownloads = false;
            $scope.showAddresses = false;
            $scope.showAccountdetail = true;

        }

        ///SHOW DATA IN ORDER GRID 
        $scope.Logincredential = localStorage != null ? localStorage["credential"] : null;
        $scope.Logincredentialusername = JSON.parse($scope.Logincredential).username;
        $scope.Logincredentialpassword = JSON.parse($scope.Logincredential).password;
        $scope.CustId = JSON.parse($scope.Logincredential).UserId;

        $http({
            method: 'GET', url: $scope.Url + 'Order/getordercustomerwise?custid=' + $scope.CustId+''
        }).
            success(function (data, status, headers, config) {
                debugger
                $scope.Orderhistory = data;

                    $scope.Name = $scope.Orderhistory[0].Name;
                    $scope.PhoneNumber = $scope.Orderhistory[0].PhoneNumber;
                    $scope.Email = $scope.Orderhistory[0].Email;
                    $scope.HouseNo = $scope.Orderhistory[0].HouseNo;
                    $scope.AddressLine2 = $scope.Orderhistory[0].AddressLine2;
                    $scope.AddressLine3 = $scope.Orderhistory[0].AddressLine3;
                    $scope.AddressLine4 = $scope.Orderhistory[0].AddressLine4;
                    $scope.PostCode = $scope.Orderhistory[0].PostCode;
                    $scope.InvoiceName = $scope.Orderhistory[0].InvoiceName;
                    $scope.Company = $scope.Orderhistory[0].Company;
                    $scope.InvoiceAddessLine2 = $scope.Orderhistory[0].InvoiceAddessLine2;
                    $scope.InvoiceAddressLine3 = $scope.Orderhistory[0].InvoiceAddressLine3;
                    $scope.InvoiceAddressLine4 = $scope.Orderhistory[0].InvoiceAddressLine4;
                    $scope.InvoicePostCode = $scope.Orderhistory[0].InvoicePostCode;
            }).
            error(function (data, status, headers, config) {
            });




    }])


