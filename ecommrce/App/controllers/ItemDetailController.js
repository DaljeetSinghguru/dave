app.controller('ItemDetailController', ['$scope', '$route', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $route, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location, $sce) {

        debugger

        var StockCode =   $route.current.params.id;
        var paramValue = $route.current.$$route.paramExample;
        $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();
        //$scope.WebsiteDomain = "http://api.davemuslayah.com/";
        $scope.cartName = "DAVE";
        var myPassword = "MAKV123456789312";



        ///get item by sku
        $scope.SingleItemDataInDetail = {};
        $http({
            method: 'GET', url: $scope.Url + 'Category/GetItemDetailByStockCode?ItemStockCode=' + StockCode 
        }).
            success(function (data, status, headers, config) {
                debugger
                $scope.SingleItemDataInDetail = data[0];
                $scope.Description = $sce.trustAsHtml($scope.SingleItemDataInDetail.Description);
                $scope.ItemStockCode = $scope.SingleItemDataInDetail.ItemStockCode;
                //pass this category id to database and get all item present in category and display in browser
                $scope.categoryid = $scope.SingleItemDataInDetail.CategoryId;

                $http({
                    method: 'GET', url: $scope.Url + 'Category/GetRelatedItems?ItemStockCode=' + $scope.ItemStockCode + '&categoryid=' + $scope.categoryid + ''
                }).
                    success(function (data, status, headers, config) {

                        debugger
                        $scope.ifsmiliarexist = false;
                        if (data.length > 0) { $scope.ifsmiliarexist = true; }
                        $scope.relateditemdata = data;
                        //ViewVariablesService.SetDatasendToItemListPage(data);
                        //if ($location.path() == '/ItemList') {
                        //    $route.reload();
                        //}
                        //else {
                        //    $location.path('ItemList');
                        //}


                    }).
                    error(function (data, status, headers, config) {
                    });


            }).
            error(function (data, status, headers, config) {
            });



       // $scope.SingleItemDataInDetail = ViewVariablesService.GetSingleItemData();
        
        //$scope.html = '<ul><li>render me please</li></ul>';
        //$scope.trustedHtml = $sce.trustAsHtml($scope.html);
        //$scope.Description = $scope.SingleItemDataInDetail.Description;

        $scope.topProductshowonfront = ViewVariablesService.GetDataofMenu();

        $scope.dataTreeView = $scope.topProductshowonfront;
        $scope.treeData1 = new kendo.data.HierarchicalDataSource({
            data: $scope.dataTreeView,
        });

        $scope.OpenReleventItemByCategory = function (data) {

            $scope.categoryID = (data.Value);
            //pass this category id to database and get all item present in category and display in browser



            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + $scope.categoryID + ''
            }).
                success(function (data, status, headers, config) {


                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    if ($location.path() == '/ItemList') {
                        $route.reload();
                    }
                    else {
                        $location.path('ItemList');
                    }


                }).
                error(function (data, status, headers, config) {
                });
        }

        $scope.addtobasket = function (SingleItemDataInDetail) {


            $scope.addItemToCart(SingleItemDataInDetail.SKU, SingleItemDataInDetail.Title, SingleItemDataInDetail.ItemMainImage,
                SingleItemDataInDetail.Price, $scope.quantity, SingleItemDataInDetail.StockInHand, SingleItemDataInDetail.CategoryId, SingleItemDataInDetail.ItemId);
        }


        ////////////////////////////



        $scope.addItemToCart = function (sku, name, ItemImage, price, quantity, IsStockPresent, ItemType, ItemId) {


            // if (IsStockPresent == "In Stock") {
            quantity = this.toNumber(quantity);
            if (quantity != 0) {

                // update quantity for existing item
                var found = false;
                for (var i = 0; i < $scope.items.length && !found; i++) {
                    var item = $scope.items[i];
                    if (item.sku == sku) {
                        found = true;
                        item.quantity = this.toNumber(item.quantity + quantity);
                        if (item.quantity <= 0) {
                            $scope.items.splice(i, 1);
                        }
                    }
                }

                // new item, add now
                if (!found) {
                    var item = new cartItem(sku, name, ItemImage, price, quantity, IsStockPresent, ItemType, ItemId);
                    $scope.items.push(item);
                }

                // save changes
                this.saveItems();
            }
            //}
            //else {
            //    //item is outof stock
            //}
        }
        function cartItem(sku, name, ItemImage, price, quantity, IsStockPresent, ItemType, ItemId) {

            this.sku = sku;
            this.name = name;
            this.ItemImage = ItemImage;
            this.price = price * 1;
            this.quantity = quantity * 1;
            this.IsStockPresent = IsStockPresent;
            this.ItemType = ItemType;
            this.ItemId = ItemId;
        }

        $scope.getTotalCount = function (sku) {

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
                localStorage[$scope.cartName + "_items"] = CryptoJS.AES.encrypt(JSON.stringify($scope.items), myPassword);
            }
        }
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
                            item = new cartItem1(item.sku, item.name, item.price, item.quantity, item.IsStockPresent);
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
        function cartItem1(sku, name, price, quantity, IsStockPresent) {
            this.sku = sku;
            this.name = name;

            this.price = price * 1;
            this.quantity = quantity * 1;
            this.IsStockPresent = IsStockPresent;


        }

        $scope.itemsChanged = function (e) {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        debugger
        $scope.ifsmiliarexist = false;

        
        $scope.addItemToCart = function (sku, name, ItemImage, price, quantity, IsStockPresent, ItemType, ItemId) {


            // if (IsStockPresent == "In Stock") {
            quantity = this.toNumber(quantity);
            if (quantity != 0) {

                // update quantity for existing item
                var found = false;
                for (var i = 0; i < $scope.items.length && !found; i++) {
                    var item = $scope.items[i];
                    if (item.sku == sku) {
                        found = true;
                        item.quantity = this.toNumber(item.quantity + quantity);
                        if (item.quantity <= 0) {
                            $scope.items.splice(i, 1);
                        }
                    }
                }

                // new item, add now
                if (!found) {
                    var item = new cartItem(sku, name, ItemImage, price, quantity, IsStockPresent, ItemType, ItemId);
                    $scope.items.push(item);
                }

                // save changes
                this.saveItems();
            }
            //}
            //else {
            //    //item is outof stock
            //}
        }
        function cartItem(sku, name, ItemImage, price, quantity, IsStockPresent, ItemType, ItemId) {
            this.sku = sku;
            this.name = name;
            this.ItemImage = ItemImage;
            this.price = price * 1;
            this.quantity = quantity;
            this.IsStockPresent = IsStockPresent;
            this.ItemType = ItemType;
            this.ItemId = ItemId;
        }
        // get the total price for all items currently in the cart
        $scope.getTotalCount = function (sku) {

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
                localStorage[$scope.cartName + "_items"] = CryptoJS.AES.encrypt(JSON.stringify($scope.items), myPassword);
            }
        }

        $scope.ShowItemDetail = function (ItemData) {

            $scope.SingleItemData = ItemData;

            ViewVariablesService.SetSingleItemData($scope.SingleItemData);
            $route.reload();
        }

    }])