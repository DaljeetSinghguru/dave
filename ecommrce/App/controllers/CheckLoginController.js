app.controller('CheckLoginController', ['$scope', '$location', '$modal', '$http','ViewVariablesService',
    function ($scope, $location, $modal, $http, ViewVariablesService) {
        

       

        $scope.Url = ViewVariablesService.GetBaseAddress();

        $scope.login = function () {
            
            //$scope.Login.UserName;
            //$scope.Login.Password;
            
            $http({ method: 'POST', url: $scope.Url + 'Login/checkLogin/', data: $scope.Login }).
                success(function (data, status, headers, config) {
                    
                    if (data == "login successfully") {
                        window.location.replace('app_v10.html#/LandingPageVisa');
                    }
                    else {
                        alert("User Name and password is incorrect");
                    }
                    


                }).
                error(function (data, status, headers, config) {
                });
        }
        $scope.cancel = function () {
            //
            if ($scope.modalInstanceExtention) {
                $scope.modalInstanceExtention.dismiss('cancel');
            }


        }



        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////**********FORGET PASSWORD*****************///////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);
