app.controller('ShopLoginController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location', '$sce',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location, $sce) {
        
        $scope.cartName = "DAVE";
        $scope.Url = ViewVariablesService.GetBaseAddress();
        $scope.loginDetail = {};
        $scope.showpasswordmismatch = false;
        $scope.shownamemandatory = false;
        $scope.showPhoneNumbermandatory = false;
        $scope.showEmailmandatory = false;
        $scope.showPasswordmandatory = false;


        $scope.newuseryes = false;
        $scope.showdiv = function () {
        $scope.newuseryes = true;
        }
        $scope.registerme = function () {
            debugger
            var chkValFields = 0;
            $scope.showpasswordmismatch = false;
            $scope.shownamemandatory = false;
            $scope.showPhoneNumbermandatory = false;
            $scope.showEmailmandatory = false;
            $scope.showPasswordmandatory = false;
            if ($scope.loginDetail.FirstName == "" || $scope.loginDetail.FirstName == undefined) {
                $scope.shownamemandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.PhoneNumber == "" || $scope.loginDetail.PhoneNumber == undefined) {
                $scope.showPhoneNumbermandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.email == "" || $scope.loginDetail.email == undefined) {
                $scope.showEmailmandatory = true;
                chkValFields = 1;
            }
            if ($scope.loginDetail.Password == "" || $scope.loginDetail.Password == undefined) {
                $scope.showPasswordmandatory = true;
                chkValFields = 1;
            }
            /////////////////check krna confirm password te passwoed same ne js ngi
            if ($scope.loginDetail.ConfirmPassword == $scope.loginDetail.Password) {
                $scope.showpasswordmismatch = false;
            }
            else {
                chkValFields = 1;
                $scope.showpasswordmismatch = true;
            }


            if (chkValFields == 0) {
                
                //call api and store data into api
                $http({ method: 'POST', url: $scope.Url + 'login/Loginfirst_Insert/', data: $scope.loginDetail }).
                    success(function (data, status, headers, config) {
                        
                        if (data == "Success") {
                            ViewVariablesService.setlogindetails($scope.loginDetail);
                            $location.path('Registerme');
                        }
                        if (data == "Customer already exist.") {
                            $scope.showalreadyregistermsg = true;
                        }
                    }).
                    error(function (data, status, headers, config) {
                    });
                
            }
            //ConfirmPassword            :            "1234"
            //FirstName            :            "gh"
            //Password            :            "1234"
            //PhoneNumber            :            "1233"
            //email: "daljeetsingh@gmail.bom"
        }

        $scope.user = {};
        $scope.UserLoginCheck = function () {
            debugger
            if ($scope.AdminLogin == true) {
                $http({ method: 'POST', url: $scope.Url + 'Login/checkLogin/', data: $scope.user }).
                    success(function (data, status, headers, config) {

                        if (data == "login successfully") {
                            window.location.replace('app_v10.html#/LandingPageVisa');
                        }
                        else {
                            alert("User Name and Password is incorrect");
                        }



                    }).
                    error(function (data, status, headers, config) {
                    });

            } else {
                $http({ method: 'POST', url: $scope.Url + 'login/checkLogincustomer/', data: $scope.user }).
                    success(function (data, status, headers, config) {
                        debugger
                        if (data != "0") {
                            //////////////////////
                            //if user have added some thing into cart then go to mycart 
                            //else go to home page

                            $scope.saveusercredential = { "username": $scope.user.Name, "password": $scope.user.Password, "UserId": data.Id, "UserName": data.Name };
                            localStorage["credential"] = JSON.stringify($scope.saveusercredential);//{ "username": $scope.user.Name, "password": $scope.user.Password };
                            $rootScope.DisplayUserName = data.Name;
                            var items = localStorage != null ? localStorage[$scope.cartName + "_items"] : null;
                            if (items != null && JSON != null) {
                                $location.path('MyCart');
                            }
                            else {
                                $location.path('Default');
                            }


                        }
                        else {
                            alert("Email and Password is incorrect.");
                        }
                    }).
                    error(function (data, status, headers, config) {
                    });
            }
        }
        

    }])