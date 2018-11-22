app.controller('RegistermeController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location, $sce) {
        
        
        $scope.loginDetail = {};
        $scope.loginDetails = ViewVariablesService.Getlogindetails();
        if ($scope.loginDetails) {
            $scope.loginDetail.FirstName = $scope.loginDetails.FirstName;
            $scope.loginDetail.phone = $scope.loginDetails.PhoneNumber;
            $scope.loginDetail.email = $scope.loginDetails.email;
            $scope.loginDetail.password = $scope.loginDetails.Password;

        }
        $scope.samebillingaddresscheck = function (data) {
            
            if ($scope.checksamebillingaddress == true) {

                
                $scope.loginDetail.InvoiceFirstName = $scope.loginDetail.FirstName;
                $scope.loginDetail.InvoiceCompany = $scope.loginDetail.House;
                $scope.loginDetail.InvoiceHouse = $scope.loginDetail.House;
                $scope.loginDetail.InvoiceAddressLine2 = $scope.loginDetail.AddressLine2;
                $scope.loginDetail.InvoiceAddressLine3 = $scope.loginDetail.AddressLine3;
                $scope.loginDetail.InvoiceAddressLine4 = $scope.loginDetail.AddressLine4;
                $scope.loginDetail.InvoicePostCode = $scope.loginDetail.PostCode;

            }
            else {
                $scope.loginDetail.InvoiceFirstName = "";
                $scope.loginDetail.InvoiceCompany = "";
                $scope.loginDetail.InvoiceHouse = "";
                $scope.loginDetail.InvoiceAddressLine2 = "";
                $scope.loginDetail.InvoiceAddressLine3 = "";
                $scope.loginDetail.InvoiceAddressLine4 = "";
                $scope.loginDetail.InvoicePostCode = "";
            }
        }


        $scope.showtermscond = function () {
            $location.path('TermsandCondition');

        }

        $scope.register = function () {
            debugger
            $scope.loginDetail;
            
            $scope.shownamemandatory = false;
            $scope.showHousemandatory = false;
            $scope.showAddressLine3mandatory = false;
            $scope.showPostCodemandatory = false;
            $scope.showInvoicenamemandatory = false;
            $scope.showInvoiceHousemandatory = false;
            $scope.showInvoiceAddressLine3mandatory = false;
            $scope.showInvoicePostCodemandatory = false;
            $scope.showwantnewsmandatory = false;

            var chkValFields = 0;

            if ($scope.loginDetail.FirstName == "" || $scope.loginDetail.FirstName == undefined) {
                $scope.shownamemandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.House == "" || $scope.loginDetail.House == undefined) {
                $scope.showHousemandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.AddressLine3 == "" || $scope.loginDetail.AddressLine3 == undefined) {
                $scope.showAddressLine3mandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.PostCode == "" || $scope.loginDetail.PostCode == undefined) {
                $scope.showPostCodemandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.InvoiceFirstName == "" || $scope.loginDetail.InvoiceFirstName == undefined) {
                $scope.showInvoicenamemandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.InvoiceHouse == "" || $scope.loginDetail.InvoiceHouse == undefined) {
                $scope.showInvoiceHousemandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.InvoiceAddressLine3 == "" || $scope.loginDetail.InvoiceAddressLine3 == undefined) {
                $scope.showInvoiceAddressLine3mandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.InvoicePostCode == "" || $scope.loginDetail.InvoicePostCode == undefined) {
                $scope.showInvoicePostCodemandatory = true;
                chkValFields = 1;
            }
            if ($scope.AcceptTerm == false || $scope.AcceptTerm == "" || $scope.AcceptTerm == undefined) {
                $scope.showwantnewsmandatory = true;
                chkValFields = 1;
            }

            if (chkValFields == 0) {
                ///call api and store data into db
                $http({ method: 'POST', url: $scope.Url + 'login/Loginsecond_Update/', data: $scope.loginDetail }).
                    success(function (data, status, headers, config) {
                        
                        if (status == 200) {
                            ////check item present in cart if yes then go to cart
                           ///// else go to home page

                            var items = localStorage != null ? localStorage[$scope.cartName + "_items"] : null;
                            $scope.saveusercredential = { "username": $scope.loginDetail.email, "password": $scope.loginDetail.password, "UserId": data.Id, "UserName": data.Name  };
                            
                            localStorage.setItem("credential", JSON.stringify($scope.saveusercredential));
                            $rootScope.DisplayUserName = data.Name;
                            if (items == undefined || items == null) {
                                $location.path('defualt');
                            }
                            else {
                                $location.path('MyCart');
                            }
                        }
                    }).
                    error(function (data, status, headers, config) {
                    });
            }

        }
    }])