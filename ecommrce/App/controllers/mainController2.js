app.controller('appmainController2', ['$scope', '$route', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $route, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
        debugger
        $window.scrollTo(0, 0);
        //PAYMENT GATEWAY  $scope.customAmount = false;
        $scope.check = function () {
            $location.path('Product');
        }

        $scope.loginme = function () {
            window.location.replace('app_v10.html#/LandingPageVisa');
        }
        $scope.owlOptionsTestimonials = {
            autoPlay: 4000,
            stopOnHover: true,
            slideSpeed: 300,
            paginationSpeed: 600,
            items: 2
        }


        $scope.searchme = function (text) {
            debugger
            $scope.searchtext;
            $http({ method: 'POST', url: $scope.Url + 'Search/Request/?Searchtext=' + $scope.searchtext }).
                success(function (data, status, headers, config) {
                    debugger
                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));
                    if ($location.path() == '/ItemList') {
                        $route.reload();
                    }
                    else {
                        $location.path('ItemList');
                    }

                })

        }

        //////////////////////////////
        ///get latest rate of all country based on euro

        //http://data.fixer.io/api/latest?access_key=af97a3a1617ee07c5e0f15fdd042f507&format=1
        ///Get data for top 8 item show on home page
        $http({
            method: 'GET', url: 'http://data.fixer.io/api/latest?access_key=af97a3a1617ee07c5e0f15fdd042f507&format=1'
        }).
            success(function (data, status, headers, config) {
                debugger
                $scope.data = data;
                $rootScope.ratesofallcountry = data.rates;
            }).
            error(function (data, status, headers, config) {
            });

        $rootScope.currentRate = "1";
       

       
        
        $rootScope.symbolz = '&#163;';
        $scope.changeLanguage = function (langKey) {
            debugger
            $translate.use(langKey);

            if (langKey == 'en') {
                $rootScope.currentRate = $rootScope.ratesofallcountry.EUR;

            }
            if (langKey == 'fr') {
                $rootScope.currentRate = $rootScope.ratesofallcountry.USD;
            }
            if (langKey == 'sp') {
                $rootScope.currentRate = $rootScope.ratesofallcountry.USD;
            }
        };
        $scope.changeCurrency = function (langKey) {
            debugger
         

            if (langKey == 'en') {
                $rootScope.currentRate = $rootScope.ratesofallcountry.EUR;
                $rootScope.symbolz = '&#163;';

            }
            if (langKey == 'fr') {
                $rootScope.currentRate = $rootScope.ratesofallcountry.USD;
                $rootScope.symbolz = '&#8364;';
            }
            if (langKey == 'sp') {
                $rootScope.currentRate = $rootScope.ratesofallcountry.USD;
                $rootScope.symbolz = '&#36;';
            }
        };

        var myPassword = "MAKV123456789312";

        // $scope.Url = "http://localhost:50675/api/";

        $scope.Url = ViewVariablesService.GetBaseAddress();
        $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();



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
        if ($scope.Logincredential == undefined) { $rootScope.showloginbutton = true; }
        /////////////////////////////////////////////////////////////////


        $scope.Country = [
            { text: "English", value: "1" },
            { text: "French", value: "2" },
            { text: "German", value: "3" }
        ];




        /////////////
        //display home page 
        $scope.HomePage = true;
        $scope.IndexPage = false;
        $scope.DetailPage = false;
        $scope.CheckOutpage = false;
        $scope.Loginpage = false;
        $scope.RegistrationPage = false;
        $scope.ThankYouPage = false;

        ///////////////////////////////
        $scope.items = [];
        $scope.cartName = "DAVE";
        $scope.detailpageData = {};
        $scope.DeliveryCharges = "50";
        $scope.UserIsLogIn = false;

        $scope.OpenHomePage = function () {
            $scope.HomePage = true;
            $scope.IndexPage = false;
            $scope.DetailPage = false;
            $scope.CheckOutpage = false;
            $scope.Loginpage = false;
            $scope.RegistrationPage = false;
            $scope.ThankYouPage = false;
        }

        $scope.OpenDetailPage = function () {
            $scope.HomePage = false;
            $scope.IndexPage = true;
            $scope.DetailPage = false;
            $scope.CheckOutpage = false;
            $scope.Loginpage = false;
            $scope.RegistrationPage = false;
            $scope.ThankYouPage = false;
        }
        ///Get data for top 8 item show on home page



        ///Get data for top 8 item show on home page
        $http({
            method: 'GET', url: $scope.Url + 'CategoryMaster/GetMenu'
        }).
            success(function (data, status, headers, config) {


                $scope.AllCategory = data
                ViewVariablesService.SetDataofMenu($scope.AllCategory);
                $window.sessionStorage.setItem('MenuData', angular.toJson(data));

                //$scope.AllCategory1 = data;
                //setTimeout(function () {
                //    $scope.Mousehoveroncat($scope.AllCategory);
                //}, 1000);

            }).
            error(function (data, status, headers, config) {
            });

        $scope.function = function (data) {

            $scope.IndexPage = false;
            $scope.HomePage = false;
            $scope.DetailPage = true;



            //Pass data to detail page
            $scope.detailpageData = data;

            $scope.detailpageData.CourseName = data.CourseName;
            $scope.detailpageData.ItemDescription = data.ItemDescription;
            $scope.detailpageData.ItemId = data.ItemId;
            $scope.detailpageData.ItemImage = data.ItemImage;
            $scope.detailpageData.ItemName = data.ItemName;
            $scope.detailpageData.ItemPrice_FromDate = data.ItemPrice_FromDate;
            $scope.detailpageData.ItemPrice_ToDate = data.ItemPrice_ToDate;
            $scope.detailpageData.ItemType = data.ItemType;
            $scope.detailpageData.MasterCourseId = data.MasterCourseId;
            $scope.detailpageData.Price = data.Price;
            $scope.detailpageData.Quantity = data.Quantity;
            $scope.detailpageData.Remarks = data.Remarks;
            $scope.detailpageData.Sellable = data.Sellable;
            $scope.detailpageData.TestSetDescription = data.TestSetDescription;
            $scope.detailpageData.TestSetId = data.TestSetId;
            $scope.detailpageData.IsStockPresent = data.IsStockPresent;
        }



        // add an item to the cart
        $scope.addItemToCart = function (sku, name, ItemImage, price, quantity, IsStockPresent, ItemType, ItemId) {

            if (IsStockPresent == "In Stock") {
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
            }
            else {
                //item is outof stock
            }
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


        // get the total price for all items currently in the cart
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

        // load items from local storage
        $scope.loadItems = function () {
            //    
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
                    // ign    ore errors while loading...
                }
            }

            // notify listeners of change
            if ($scope.itemsChanged) {
                $scope.itemsChanged();
            }
        }
        function cartItem1(sku, name, price, quantity, IsStockPresent, image) {
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

        $scope.ContinueToBasket = function () {
            $scope.IndexPage = true;
            $scope.DetailPage = false;
            $scope.CheckOutpage = false;
            $scope.Loginpage = false;
            $scope.RegistrationPage = false;
            $scope.ThankYouPage = false;
        }

        //delete row from cart i.e. from local memory
        $scope.deleteRowFromBasket = function (data) {

            $scope.items.splice($scope.items.indexOf(data), 1);
            localStorage.setItem($scope.cartName + "_items", JSON.stringify($scope.items));

        }


        ///calculate pricedetails
        $scope.CalculateTotalPrice = function () {

        }
        //ORDER 

        $scope.Order = function () {
            //check login user or not

            if ($scope.UserIsLogIn == true) {
                $scope.totalPrice = $scope.getTotalPrice();
                //generate Payment nouns from token
                var button = document.querySelector('#submit-button');
                if ($scope.Token) {
                    braintree.dropin.create({
                        authorization: $scope.Token,
                        container: '#dropin-container'
                    }, function (createErr, instance) {
                        button.addEventListener('click', function () {
                            instance.requestPaymentMethod(function (err, payload) {
                                // Submit payload.nonce to your server
                                // payload.nonce
                                $scope.param = { "Amount": $scope.totalPrice, "payment_method_nonce": payload.nonce };
                                $http({ method: 'POST', url: $scope.Url + 'Payment/Request/', data: $scope.param }).
                                    success(function (data, status, headers, config) {


                                        if ($scope.HrUserId == null) {
                                            //GET HRUSERID FROM DATABASE
                                            $scope.param = { "FirstName": $scope.FirstName, "ContactNumber": $scope.ContactNumber };
                                            $http({ method: 'POST', url: $scope.Url + 'HrUserDetail/GetHrUserDetail/', data: $scope.param }).
                                                success(function (data, status, headers, config) {
                                                    $scope.dataSendToHistory = {};
                                                    $scope.dataSendToHistory.HrUserId = data;
                                                    $scope.dataSendToHistory.TransectionId = data;
                                                    // $scope.dataSendToHistory.HrUserId = $scope.HrUserId;
                                                    $scope.dataSendToHistory.ItemsArray = $scope.items;
                                                    $scope.dataSendToHistory.totalPrice = $scope.totalPrice;
                                                    $scope.dataSendToHistory.FirstName = $scope.FirstName;
                                                    $scope.dataSendToHistory.LastName = $scope.LastName;
                                                    $scope.dataSendToHistory.ContactNumber = $scope.ContactNumber;
                                                    $scope.dataSendToHistory.DateOfBirth = $scope.DateOfBirth;
                                                    $scope.dataSendToHistory.BillingAddress = $scope.BillingAddress;
                                                    $scope.dataSendToHistory.ShippingAddress = $scope.ShippingAddress;
                                                    $scope.dataSendToHistory.PINCode = $scope.PINCode;
                                                    $scope.dataSendToHistory.EmailAddress = $scope.EmailAddress;

                                                    $http({ method: 'POST', url: $scope.Url + 'ShipmentHistory/ShipmentHistory/', data: $scope.dataSendToHistory }).
                                                        success(function (data, status, headers, config) {
                                                            $scope.Token = data;
                                                        }).
                                                        error(function (data, status, headers, config) {
                                                        });
                                                    //INSERT DATA INTO ACCOUNT
                                                    $http({ method: 'POST', url: $scope.Url + 'ShopAccount/ShopInsertintoAccount/', data: $scope.dataSendToHistory }).
                                                        success(function (data, status, headers, config) {
                                                            $scope.Token = data;
                                                        }).
                                                        error(function (data, status, headers, config) {
                                                        });
                                                }).
                                                error(function (data, status, headers, config) {
                                                });
                                        }
                                        else {

                                            $scope.dataSendToHistory = {};
                                            $scope.dataSendToHistory.HrUserId = data;
                                            $scope.dataSendToHistory.TransectionId = data;
                                            $scope.dataSendToHistory.HrUserId = $scope.HrUserId;
                                            $scope.dataSendToHistory.ItemsArray = $scope.items;
                                            $scope.dataSendToHistory.totalPrice = $scope.totalPrice;
                                            $scope.dataSendToHistory.FirstName = $scope.FirstName;
                                            $scope.dataSendToHistory.LastName = $scope.LastName;
                                            $scope.dataSendToHistory.ContactNumber = $scope.ContactNumber;
                                            $scope.dataSendToHistory.DateOfBirth = $scope.DateOfBirth;
                                            $scope.dataSendToHistory.BillingAddress = $scope.BillingAddress;
                                            $scope.dataSendToHistory.ShippingAddress = $scope.ShippingAddress;
                                            $scope.dataSendToHistory.PINCode = $scope.PINCode;
                                            $scope.dataSendToHistory.EmailAddress = $scope.EmailAddress;

                                            $http({ method: 'POST', url: $scope.Url + 'ShipmentHistory/ShipmentHistory/', data: $scope.dataSendToHistory }).
                                                success(function (data, status, headers, config) {
                                                    $scope.Token = data;
                                                }).
                                                error(function (data, status, headers, config) {
                                                });
                                            //INSERT DATA INTO ACCOUNT
                                            $http({ method: 'POST', url: $scope.Url + 'ShopAccount/ShopInsertintoAccount/', data: $scope.dataSendToHistory }).
                                                success(function (data, status, headers, config) {
                                                    $scope.Token = data;
                                                }).
                                                error(function (data, status, headers, config) {
                                                });

                                        }


                                        //save transaction into Database and accounts 

                                        $scope.IndexPage = false;
                                        $scope.DetailPage = false;
                                        $scope.CheckOutpage = false;
                                        $scope.Loginpage = false;
                                        $scope.RegistrationPage = false;
                                        $scope.ThankYouPage = true;


                                    }).
                                    error(function (data, status, headers, config) {
                                    });
                            });
                        });
                    });
                }
            }
            else {
                $scope.IndexPage = false;
                $scope.DetailPage = false;
                $scope.CheckOutpage = false;
                $scope.Loginpage = true;
                $scope.RegistrationPage = false;
                $scope.ThankYouPage = false;
            }
        }

        $scope.DisplayLoginPage = function () {
            //if user login hen show its info otherwise show login page
            //if ($scope.UserIsLogIn == true) {
            //    $scope.HomePage = false;
            //    $scope.IndexPage = false;
            //    $scope.DetailPage = false;
            //    $scope.CheckOutpage = false;
            //    $scope.Loginpage = false;
            //    $scope.RegistrationPage = true;
            //    $scope.ThankYouPage = false;

            //}
            //else {
            //    $scope.HomePage = false;
            //    $scope.IndexPage = false;
            //    $scope.DetailPage = false;
            //    $scope.CheckOutpage = false;
            //    $scope.Loginpage = true;
            //    $scope.RegistrationPage = false;
            //    $scope.ThankYouPage = false;
            //}




            //open admin panel
            // window.location.replace('app_v10.html#/LandingPageVisa');
            $scope.Login = {};
            $scope.LoginError = "";
            $scope.btnSaveText = "Submit";
            $scope.Title = "Choose Extension";
            $scope.modalInstanceExtention = $modal.open({
                scope: $scope,
                templateUrl: 'App/views/LoginView.html',
                controller: 'CheckLoginController',
                size: "lg",
            });




        }
        $scope.DisplayRegistrationPage = function () {
            $scope.HomePage = false;
            $scope.IndexPage = false;
            $scope.DetailPage = false;
            $scope.CheckOutpage = false;
            $scope.Loginpage = false;
            $scope.RegistrationPage = true;
            $scope.ThankYouPage = false;
        }



        $scope.Submit = function () {
            $scope.formData = {};
            $scope.formData.FirstName = $scope.FirstName;
            $scope.formData.LastName = $scope.LastName;
            $scope.formData.ContactNumber = $scope.ContactNumber;
            $scope.formData.DateOfBirth = $scope.DateOfBirth;
            $scope.formData.BillingAddress = $scope.BillingAddress;
            $scope.formData.ShippingAddress = $scope.ShippingAddress;
            $scope.formData.PINCode = $scope.PINCode;
            $scope.formData.EmailAddress = $scope.EmailAddress;
            $scope.formData.Password = $scope.Password;
            $scope.formData.ConfirmPassword = $scope.ConfirmPassword;

            $scope.UserName = $scope.FirstName;
            $http({ method: 'POST', url: $scope.Url + 'RegisterUser/Register/', data: $scope.formData }).
                success(function (data, status, headers, config) {
                    if (data == true) {
                        //task to do in if statemnt check cart is empty or not if cart is empty go to index page otherwise goto to cart page 

                        $scope.UserIsLogIn = true;

                        $scope.IndexPage = true;
                        $scope.DetailPage = false;
                        $scope.CheckOutpage = false;
                        $scope.Loginpage = false;
                        $scope.RegistrationPage = false;
                        $scope.ThankYouPage = false;

                        $scope.UserName = $scope.FirstName;

                    }
                    else {

                    }

                }).
                error(function (data, status, headers, config) {
                });

        }



        $scope.LoginFormSubmit = function () {

            $scope.loginDetail = {};
            $scope.loginDetail.Password = $scope.Password;
            $scope.loginDetail.Email = $scope.Email;


            $http({ method: 'POST', url: $scope.Url + 'LoginSellingPortal/CheckUserIsLogin/', data: $scope.loginDetail }).
                success(function (data, status, headers, config) {

                    if (data == true) {
                        $http({ method: 'POST', url: $scope.Url + 'CheckUserLoginSelling/GetloggedinuserInfo/', data: $scope.loginDetail }).
                            success(function (data, status, headers, config) {

                                if (data) {
                                    $scope.UserIsLogIn = true;
                                    //open detial page after login
                                    $scope.IndexPage = true;
                                    $scope.DetailPage = false;
                                    $scope.CheckOutpage = false;
                                    $scope.Loginpage = false;
                                    $scope.RegistrationPage = false;
                                    $scope.ThankYouPage = false;
                                    // fill detail in registration form
                                    $scope.UserName = data[0].FirstName;

                                    $scope.FirstName = data[0].FirstName;
                                    $scope.LastName = data[0].LastName;
                                    $scope.ContactNumber = data[0].ContactNumber;
                                    $scope.DateOfBirth = data[0].DateOfBirth;
                                    $scope.BillingAddress = data[0].BillingAddress;
                                    $scope.ShippingAddress = data[0].ShippingAddress;
                                    $scope.PINCode = data[0].PINCode;
                                    $scope.EmailAddress = data[0].EmailAddress;
                                    $scope.HrUserId = data[0].HrUserId;

                                    //$scope.formData.Password = data.Password;
                                    //$scope.formData.ConfirmPassword = data.ConfirmPassword;
                                }

                            }).
                            error(function (data, status, headers, config) {
                            });
                    }
                    else {

                    }

                }).
                error(function (data, status, headers, config) {
                });

        }



        $scope.LogOutPage = function () {
            $window.localStorage.clear();
            $window.location.href = '/Student/ShopIndex.aspx';
        }


        $scope.LoginintoSlim = function () {
            $window.localStorage.clear();
            $window.location.href = '/login.aspx';
        }



        //apply filter on screen by ItemType
        $scope.applyFilterItemType = function (data) {

            data = data.replace("\"", "");
            $http({ method: 'GET', url: $scope.Url + 'ShopPortalListingByItemType?ItemType=' + data }).
                success(function (data, status, headers, config) {
                    $scope.response = data;
                }).
                error(function (data, status, headers, config) {
                });
        }

        //apply filter on screen by Course
        $scope.applyFilterByCourse = function (data) {

            data = data.replace("\"", "");
            $http({ method: 'GET', url: $scope.Url + 'ShopPortalListingByCourse?Course=' + data }).
                success(function (data, status, headers, config) {
                    $scope.response = data;
                }).
                error(function (data, status, headers, config) {
                });
        }




        ///////////////////////////////////////////////////////////////////////////////////////////////////////



        //////////////////////////////////////////////////////////////////////////////////////////////////////////



        $scope.GOTODestinationPage = function () {

            $scope.Userlogin = {};
            $scope.Userlogin.Name = $scope.sName;
            $scope.Userlogin.Password = $scope.sUserPassword;
            $http({ method: 'POST', url: $scope.Url + 'Login/checkLogin/', data: $scope.Userlogin }).
                success(function (data, status, headers, config) {
                    $scope.Token = data;


                }).
                error(function (data, status, headers, config) {
                });
        }

        $scope.GetSubMenu = function (toplevel, menuId) {


            return toplevel.items.filter(function (obj) {
                if (obj.ParentMenuId == menuId) {
                    return true;
                }
                return false;
            });

        }

        $scope.GetSuperSubMenu = function (supersublevel, menuId) {

            return supersublevel.items.filter(function (obj) {
                if (obj.ParentMenuId == menuId) {
                    return true;
                }
                return false;
            });
        }

        $scope.GetSuperSuperSubMenu = function (suppersupersublevel, menuId1) {

            return suppersupersublevel.items.filter(function (obj) {
                if (obj.ParentMenuId == menuId1) {
                    return true;
                }
                return false;
            });
        }
        //$scope.Mousehoveroncat = function (data) {


        //    $(" .25").hover(function () {

        //        $('.25').addClass('display-on');
        //    });
        //    $(" .29").hover(function () {

        //        $('.29').addClass('display-on');
        //    });
        //    $(" .42").hover(function () {

        //        $('.42').addClass('display-on');
        //    });
        //    $(" .45").hover(function () {

        //        $('.45').addClass('display-on');
        //    });
        //    $(" .50").hover(function () {

        //        $('.50').addClass('display-on');
        //    });
        //    $(" .54").hover(function () {

        //        $('.54').addClass('display-on');
        //    });
        //    $(".drop-down").mouseleave(function () {

        //        $('.mega-menu').removeClass('display-on');
        //    });

        //}


        $http({
            method: 'GET', url: $scope.Url + 'Category/Category_Get'
        }).
            success(function (data, status, headers, config) {

                $scope.topProductshowonfront = data;

            }).
            error(function (data, status, headers, config) {
            });



        $scope.categoryClickLevel1 = function (CategoryId) {
            //   
            debugger
            if (CategoryId.text == 'Blogs') {
                if ($location.path() == '/blog') {
                    $route.reload();
                } else {
                    $location.path('blog');
                }
            } else {

                $window.sessionStorage.setItem('CategoryId', angular.toJson(CategoryId));
                // $rootScope.ItemDetailDataCategoryWiselevel1 = CategoryId;
                //ViewVariablesService.SetDatasendToItemListPageLevel1($scope.ItemDetailDataCategoryWiselevel1);
                //ViewVariablesService.SetDatasendToItemListPage();
                //ViewVariablesService.SetDatasendToItemListPageCategory();
                //ViewVariablesService.SetDatasendToItemListPageCategoryLevel2();

                if ($location.path() == '/ItemListCategory3') {
                    $route.reload();
                } else {
                    $location.path('ItemListCategory3');
                }
                //$location.path('ItemList');

                //on category click send Id to URL and   vm

                // set category to local storagre 

                //var path = "/ItemListCategory3/" + CategoryId;
                //$location.path(path);
            }

        }
        $scope.categoryClicklevel2 = function (CategoryLevel2) {
            //


            $scope.ItemDetailDataCategoryWiselevel2 = CategoryLevel2;
            ViewVariablesService.SetDatasendToItemListPageCategoryLevel2($scope.ItemDetailDataCategoryWiselevel2);
            ViewVariablesService.SetDatasendToItemListPage();
            ViewVariablesService.SetDatasendToItemListPageCategory();
            $window.sessionStorage.setItem('CategoryId', angular.toJson(CategoryLevel2));

            if ($location.path() == '/ItemListCategory2') {
                $route.reload();
            } else {
                $location.path('ItemListCategory2');
            }


        }
        $scope.categoryClicklevel3 = function (CategoryData) {
            //  


            $scope.ItemDetailDataCategoryWiselevel3 = CategoryData;
            //if ($scope.ItemDetailDataCategoryWiselevel4 == undefined) {
            ViewVariablesService.SetDatasendToItemListPage();

            ViewVariablesService.SetDatasendToItemListPageCategory($scope.ItemDetailDataCategoryWiselevel3);
            $window.sessionStorage.setItem('CategoryId', angular.toJson(CategoryData));

            if ($location.path() == '/ItemListCategory1') {
                $route.reload();
            } else {
                $location.path('ItemListCategory1');
            }
            //}



        }
        $scope.categoryClicklevel4 = function (CategoryId) {
            // 
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + CategoryId + ''
            }).
                success(function (data, status, headers, config) {
                    //  

                    $scope.ItemDetailDataCategoryWiselevel4 = data;
                    // if ($scope.ItemDetailDataCategoryWiselevel3 == undefined || $scope.ItemDetailDataCategoryWiselevel3.length == 0) {
                    ViewVariablesService.SetDatasendToItemListPage($scope.ItemDetailDataCategoryWiselevel4);

                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));

                    ViewVariablesService.SetDatasendToItemListPageCategory();
                    if ($location.path() == '/ItemList') {
                        $route.reload();
                    } else {
                        $location.path('ItemList');
                    }
                    // }
                }).
                error(function (data, status, headers, config) {
                });

        }



        ///////////////////////////////////////SHOW CART

        $scope.ShowCart = function () {
            if ($location.path() == '/MyCart') {
                $route.reload();
            }
            else {
                $location.path('MyCart');
            }
        }


        /////////////////////////////////////////////////////////////////////////////////


        //login
        ///////////////////////////
        $scope.login = function () {
            if ($location.path() == '/Login') {
                $route.reload();
            }
            else {
                $location.path('Login');
            }
        }

        $scope.logOut = function () {

            $window.localStorage.clear();
            $rootScope.DisplayUserName = "";
            $rootScope.showloginbutton = true;
            $location.path('Default');
        }
        $scope.gotoDefault = function () {
            $location.path('Default');
        }

        $scope.openTermsandCondition = function () {
            $location.path('TermsandCondition');
        }
        $scope.openPrivacy = function () {
            $location.path('Privacy');

        }

        $scope.openReturn = function () {
            $location.path('Return');

        }

        $scope.openFAQ = function () {
            $location.path('FAQ');

        }
        $scope.openAboutUs = function () {
            $location.path('AboutUs');

        }
        $scope.openContactUs = function () {
            $location.path('ContactUs');

        }

        debugger

        $http({
            method: 'GET', url: $scope.Url + 'Brand/GetBrand'
        }).
            success(function (data, status, headers, config) {
                debugger
                $scope.BrandList = data;
                ViewVariablesService.SetBrandData(data);
                $window.sessionStorage.setItem('BrandData', angular.toJson(data));


            }).
            error(function (data, status, headers, config) {
            });



        //Best Seller Product
        $http({
            method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=161'
        }).
            success(function (data, status, headers, config) {


                $scope.ItemListBestSellerProduct = data;
                ViewVariablesService.SetItemListBestSellerProduct(data);

                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));


            }).
            error(function (data, status, headers, config) {
            });

        //HOT Deals 158
        $http({
            method: 'GET', url: $scope.Url + 'Category/GetHotSaleItem'
        }).
            success(function (data, status, headers, config) {


                $scope.ItemListHotSalesProduct = data;
                ViewVariablesService.SetItemListHotDealsProduct(data);

                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));


            }).
            error(function (data, status, headers, config) {
            });
        //Featured 163
        $http({
            method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=163'
        }).
            success(function (data, status, headers, config) {


                $scope.ItemListFeaturedProduct = data;
                ViewVariablesService.SetItemListFeaturedProduct(data);

                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));


            }).
            error(function (data, status, headers, config) {
            });

        //NewArrivals  162
        $http({
            method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=162'
        }).
            success(function (data, status, headers, config) {


                $scope.ItemListNewArrivalsProduct = data;
                ViewVariablesService.SetItemListNewArrivalsProduct(data);

                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));


            }).
            error(function (data, status, headers, config) {
            });

        //TopProducts 164
        $http({
            method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=164'
        }).
            success(function (data, status, headers, config) {


                $scope.ItemListTopProductsProduct = data;
                ViewVariablesService.SetItemListTopProductsProduct(data);


                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));

            }).
            error(function (data, status, headers, config) {
            });
    }]);