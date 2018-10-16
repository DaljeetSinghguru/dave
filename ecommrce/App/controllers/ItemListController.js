app.controller('ItemListController', ['$scope','$route', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $route, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
        
        var myPassword = "MAKV123456789312";
        $scope.Url = ViewVariablesService.GetBaseAddress();
        $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();
        $scope.ShowCategoryLevel2list = false;
        $scope.ShowCategoryLevel1list = false;
        $scope.ShowITEMlist = false;
        $scope.ItemListDetails = ViewVariablesService.GetDatasendToItemListPage();
        $scope.cartName = "DAVE";

        
        ////////////////////////////////////////////////////////////////////////
        ///
        $scope.topProductshowonfront = ViewVariablesService.GetDataofMenu();
        //$scope.ItemListPageCategory = ViewVariablesService.GetDatasendToItemListPageCategory();
        $scope.dataTreeView = $scope.topProductshowonfront;
        $scope.treeData1 = new kendo.data.HierarchicalDataSource({
            data: $scope.dataTreeView,
           
        });


        //////////////////////////////////////////////////////////





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

        
        //show category
        if ($scope.ItemListDetails == {} || $scope.ItemListDetails == undefined) {
        }
        else {
            $scope.ShowITEMlist = true;
        }
       

        ///show hide box of category and item
       



        $scope.ShowItemDetail = function (ItemData) {

            $scope.SingleItemData = ItemData;
            debugger
            ViewVariablesService.SetSingleItemData($scope.SingleItemData);


            
                var vm = $scope.jobOfferSearchViewModel;
            var path = "/ItemDetail/" + ItemData.ItemStockCode;
                $location.path(path);
           


            //$location.path('ItemDetail/:' + ItemData.ItemStockCode);

          //  $scope.$parent.addTab(data.ExhibitorName, "suppliersearchresults:" + data.ExhibitorSupplierId);
        }

        $scope.ShowItemDetailCategory = function (data) {
            

            //call API FOR GET ITESM
            $scope.CategoryId = data.Value;
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + $scope.CategoryId + ''
            }).
                success(function (data, status, headers, config) {
                    

                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $scope.ShowCategoryLevel2list = false;
                    $scope.ShowCategoryLevel1list = false;
                    $scope.ShowCategorylist = false;
                }).
                error(function (data, status, headers, config) {
                });


           
        }
        $scope.ShowCategoryLevel3 = function (data) {
            $scope.ItemListPageCategory = data;
            ViewVariablesService.SetDatasendToItemListPageCategory(data);
            $scope.ShowCategoryLevel2list = false;
            $scope.ShowCategoryLevel1list = false;
            $scope.ShowCategorylist = true;
        }
        $scope.ShowCategoryLevel1 = function (data) {
            $scope.ItemListPageCategoryLevel2 = data;
            ViewVariablesService.SetDatasendToItemListPageCategoryLevel2(data);
            $scope.ShowCategoryLevel2list = true;
            $scope.ShowCategoryLevel1list = false;
            //$scope.ShowCategorylist = false;

        }




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
                            item = new cartItem1(item.sku, item.name, item.price, item.quantity, item.IsStockPresent, item.ItemImage);
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
        function cartItem1(sku, name, price, quantity, IsStockPresent,image) {
            this.sku = sku;
            this.name = name;

            this.price = price * 1;
            this.quantity = quantity * 1;
            this.IsStockPresent = IsStockPresent;
            this.image = image;

        }

        $scope.itemsChanged = function (e) {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        $scope.loadItems();
    //delete row from cart i.e. from local memory
        $scope.deleteRowFromBasket = function (data) {

            $scope.items.splice($scope.items.indexOf(data), 1);
            localStorage.setItem($scope.cartName + "_items", CryptoJS.AES.encrypt(JSON.stringify($scope.items), myPassword));

        }
       // $scope.decryptedUserName = CryptoJS.AES.decrypt($scope.encryptedUserName, myPassword);
       // $scope.$parent.addTab(data.ExhibitorName, "suppliersearchresults:" + data.ExhibitorSupplierId);


        $scope.showgridviewdata = false;
        $scope.showlistviewdata = true;
        $scope.showgridview = function () {
            debugger
            $scope.showgridviewdata = true;
            $scope.showlistviewdata = false;
        }
        $scope.showListview = function () {
            $scope.showlistviewdata = true;
            $scope.showgridviewdata = false;
        }
    }]);