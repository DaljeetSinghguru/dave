app.controller('CheckoutController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {

        $scope.Order = function () {
            //check login user or not

            $scope.IndexPage = false;
            $scope.DetailPage = false;
            $scope.CheckOutpage = false;
            $scope.Loginpage = false;
            $scope.RegistrationPage = false;
            $scope.ThankYouPage = false;
            $scope.PaymentPage = true;
            $scope.OrderHistoryPage = false;
            $scope.ContactUsPage = false;
            $scope.ForgetPasswordPage = false;
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
                                    success(function (dataTransectionId, status, headers, config) {


                                        if ($scope.HrUserId == null) {
                                            //GET HRUSERID FROM DATABASE
                                            $scope.param = { "FirstName": $scope.FirstName, "ContactNumber": $scope.ContactNumber };
                                            $http({ method: 'POST', url: $scope.Url + 'HrUserDetail/GetHrUserDetail/', data: $scope.param }).
                                                success(function (dataHrUserId, status, headers, config) {

                                                    $scope.dataSendToHistory = {};
                                                    $scope.dataSendToHistory.HrUserId = dataHrUserId;
                                                    $scope.HrUserId = $scope.dataSendToHistory.HrUserId;
                                                    $scope.dataSendToHistory.TransectionId = dataTransectionId;
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
                                                            $window.localStorage.clear();
                                                            $scope.items = [];
                                                        }).
                                                        error(function (data, status, headers, config) {
                                                        });
                                                    //INSERT DATA INTO ACCOUNT
                                                    //$http({ method: 'POST', url: $scope.Url + 'ShopAccount/ShopInsertintoAccount/', data: $scope.dataSendToHistory }).
                                                    //    success(function (data, status, headers, config) {
                                                    //        $scope.Token = data;
                                                    //    }).
                                                    //    error(function (data, status, headers, config) {
                                                    //    });
                                                }).
                                                error(function (data, status, headers, config) {
                                                });
                                        }
                                        else {

                                            $scope.dataSendToHistory = {};
                                            //$scope.dataSendToHistory.HrUserId = data;
                                            $scope.dataSendToHistory.TransectionId = dataTransectionId;
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
                                                    $window.localStorage.clear();
                                                    $scope.items = [];
                                                }).
                                                error(function (data, status, headers, config) {
                                                });
                                            //INSERT DATA INTO ACCOUNT
                                            //$http({ method: 'POST', url: $scope.Url + 'ShopAccount/ShopInsertintoAccount/', data: $scope.dataSendToHistory }).
                                            //    success(function (data, status, headers, config) {
                                            //        $scope.Token = data;
                                            //    }).
                                            //    error(function (data, status, headers, config) {
                                            //    });

                                        }




                                        //save transaction into Database and accounts 

                                        $scope.IndexPage = false;
                                        $scope.DetailPage = false;
                                        $scope.CheckOutpage = false;
                                        $scope.Loginpage = false;
                                        $scope.RegistrationPage = false;
                                        $scope.ThankYouPage = true;
                                        $scope.PaymentPage = false;
                                        $scope.OrderHistoryPage = false;
                                        $scope.ContactUsPage = false;
                                        $scope.ForgetPasswordPage = false;

                                        $window.localStorage.clear();
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
                $scope.PaymentPage = false;
                $scope.OrderHistoryPage = false;
                $scope.ContactUsPage = false;
                $scope.ForgetPasswordPage = false;

            }
            $window.localStorage.clear();

        }
    }]);