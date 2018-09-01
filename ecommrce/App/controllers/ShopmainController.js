app.controller('ShopmainController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 
            function ($scope, $window, $location, $modal,  $rootScope, $http) {
  
        $scope.Url = "http://api.davemuslayah.com/api/";


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
        $scope.cartName = "touchStone";
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
        $http({
            method: 'GET', url: $scope.Url + 'ShopPortalListing/get'
        }).
            success(function (data, status, headers, config) {
                $scope.top8response = data;
            }).
            error(function (data, status, headers, config) {
            });


        ///Get data for top 8 item show on home page
        $http({
            method: 'GET', url: $scope.Url + 'Menu/get'
        }).
            success(function (data, status, headers, config) {

                
                $scope.AllCategory =  JSON.parse(data)
                //$scope.AllCategory1 = data;
            }).
            error(function (data, status, headers, config) {
            });
        ////Get Data for hotsale top4 product
        //$http({ method: 'GET', url: $scope.Url + 'HomeShopHotSaleListing' }).
        //    success(function (data, status, headers, config) {
        //        $scope.HotsaleResponse = data;
        //    }).
        //    error(function (data, status, headers, config) {
        //    });

        //$http({ method: 'GET', url: $scope.Url + 'ShopPortalListing?Country=India' }).
        //    success(function (data, status, headers, config) {
        //        $scope.CountrySymbol = "\u20B9";
        //        $scope.response = data;
        //    }).
        //    error(function (data, status, headers, config) {
        //    });


        ////Get Token Request for braintree paymentgateway
        //$scope.param = { "Amount": "11", "payment_method_nonce": "" };
        //$http({ method: 'POST', url: $scope.Url + 'Payment/Request/', data: $scope.param }).
        //    success(function (data, status, headers, config) {
        //        $scope.Token = data;
        //    }).
        //    error(function (data, status, headers, config) {
        //    });
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

        $scope.ShowCart = function () {
            $scope.HomePage = false;
            $scope.IndexPage = false;
            $scope.DetailPage = false;
            $scope.CheckOutpage = true;
            $scope.Loginpage = false;
            $scope.RegistrationPage = false;
            $scope.ThankYouPage = false;
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
                localStorage[$scope.cartName + "_items"] = JSON.stringify($scope.items);
            }
        }

        // load items from local storage
        $scope.loadItems = function () {

            // empty list
            $scope.items.splice(0, $scope.items.length);

            // load from local storage
            var items = localStorage != null ? localStorage[$scope.cartName + "_items"] : null;
            if (items != null && JSON != null) {
                try {
                    var items = JSON.parse(items);
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


                $scope.login = function () {
                    
                    window.location.replace('app_v10.html#/LandingPageVisa');
                }
    }]);