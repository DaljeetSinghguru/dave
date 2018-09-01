app.controller('CheckLoginController', ['$scope', '$location', '$modal', '$http',
    function ($scope, $location, $modal, $http) {
        





        $scope.GOTODestinationPage = function () {
            
            window.location.replace('app_v10.html#/LandingPageVisa');
            $scope.Userlogin = {};
            $scope.Userlogin.Name = $scope.sName;
            $scope.Userlogin.Password = $scope.sUserPassword;
            //$http({ method: 'POST', url: $scope.Url + 'Login/checkLogin/', data: $scope.Userlogin }).
            //    success(function (data, status, headers, config) {
            //        
            //        if (data == "login successfully") {
            //            window.location.replace('app_v10.html#/LandingPageVisa');
            //        }
            //        else {
            //            alert("User Name and password is incorrect");
            //        }
                    


            //    }).
            //    error(function (data, status, headers, config) {
            //    });
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
