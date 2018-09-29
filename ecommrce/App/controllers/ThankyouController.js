app.controller('ThankyouController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location, $sce) {
        

        var myPassword = "MAKV123456789312";
        $scope.items = [];
        // print  div PrintMe 
        var items = localStorage != null ? localStorage[$scope.cartName + "_items"] : null;

        $scope.Logincredential = localStorage != null ? localStorage["credential"] : null;
        $scope.Logincredentialusername = JSON.parse($scope.Logincredential).username;
        $scope.Logincredentialpassword = JSON.parse($scope.Logincredential).password;
        $scope.CustId = JSON.parse($scope.Logincredential).UserId;

        $scope.OrderId = "DaveLiveOrder-2018-" + ViewVariablesService.GetOrderId(); "";

        /////////////////////////////////////////////////////////////////

        $http({ method: 'POST', url: $scope.Url + 'login/GetCustomer_Find?Id=' + $scope.CustId + '' }).
            success(function (data, status, headers, config) {
                
               
                $scope.PhoneNumber = data[0].PhoneNumber;
                $scope.AddressLine2 = data[0].AddressLine2;
                $scope.AddressLine3 = data[0].AddressLine3;
                $scope.AddressLine4 = data[0].AddressLine4;
                $scope.AgreeSendSpecialOffer = data[0].AgreeSendSpecialOffer;
                $scope.Company = data[0].Company;
                $scope.HouseNo = data[0].HouseNo;
                $scope.InvoiceAddessLine2 = data[0].InvoiceAddessLine2;
                $scope.InvoiceAddressLine3 = data[0].InvoiceAddressLine3;
                $scope.InvoiceAddressLine4 = data[0].InvoiceAddressLine4;
                $scope.InvoiceName = data[0].InvoiceName;
                $scope.InvoicePostCode = data[0].InvoicePostCode;
                $scope.Name = data[0].Name;
                $scope.Password = data[0].Password;
                $scope.PhoneNumber = data[0].PhoneNumber;
                $scope.PostCode = data[0].PostCode;
                $scope.Email = data[0].Email;




                ////clear storage 
                $window.localStorage.clear();
                $rootScope.DisplayUserName = "";
                $rootScope.showloginbutton = true;
                //$location.path('Default');
              
            }).
            error(function (data, status, headers, config) {
            });


        /////////////////////////////////////////////////////////////////




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

            total = this.toNumber(qty * price);
            return total;
        }
        $scope.getTotalPrice = function (sku) {
            //   
            var total = 0;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (sku == null || item.sku == sku) {
                    total += this.toNumber(item.quantity * item.price);
                }
            }
            return total;
        }
        $scope.totalPrice = $scope.getTotalPrice();
        $scope.loadItems();




        $scope.printReceiptDataFromModal = function (divName) {
            
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=900,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><style type="text/css">.k-grid .k-icon {background: none;display: none;}</style> <link href="ThirdParty/kendo/styles/kendo.common.min.css" rel="stylesheet" /><link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.common-material.min.css" /><link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.material.min.css" /><link href="Content/css/kendo.custom.css" rel="stylesheet" /><link href="Content/css/SlimsStyle.css" rel="stylesheet" /><link href="ThirdParty/MetronixTheme/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.material.mobile.min.css" /><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
            //$scope.modalInstanceCFPExtention.dismiss('cancel');
        }
    }])



