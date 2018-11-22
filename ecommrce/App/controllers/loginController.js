app.controller('loginController', ['$scope', '$location', function ($scope, $location) {
    
 





    $scope.SignIn = function () {

        //window.location.replace('app.html#/home');
        if ($scope.loginForm.$valid) {
            $scope.LoginError = "";
            $scope.loading = false;
            $scope.SignInSuccess = false;

            var request = {
                username: $scope.UserName,
                password: $scope.UserPassword,
            };

            UserService.auth(request).success(function (response) {

                if ((response.access_token !== undefined) && (response.access_token !== null)) {
                    $.cookie("Token", response.access_token);
                }
                UserService.GetLoggedInUserInfo().then(function (results) {
                    console.log(results);

                    var CurrentUserName = results.data.FirstName + " " + results.data.LastName;
                    //  $scope.$parent.UserName = results.data.FirstName + " " + results.data.LastName;
                    $scope.SignInSuccess = results.data.Authenticated;
                    $scope.DefaultCompanyId = results.data.DefaultCompanyId;
                    $scope.DefaultCompanyIsSet = results.data.DefaultCompanyIsSet;


                    $scope.GetViewableCompanyList(response.access_token);
                    var Menu = JSON.stringify($scope.UserMenuSet);


                    if ($scope.Rememberme == true) {
                        console.log("Remember me");
                        UserService.SetTokenAndMenuWithExpDate(response.access_token, results.data.Authenticated, CurrentUserName, $scope.DefaultCompanyId, $scope.DefaultCompanyIsSet, Menu, results.data.email, results.data.UserId);
                    } else {
                        UserService.SetTokenWithMenu(response.access_token, results.data.Authenticated, CurrentUserName, $scope.DefaultCompanyId, $scope.DefaultCompanyIsSet, Menu, results.data.email, results.data.UserId);
                    }
                    if (results.data.PasswordChangeOption) {
                        localStorage.setItem("IsPasswordChange", true);
                        $location.path("/changepassword");
                    }
                    else {
                        if ($scope.SignInSuccess) {
                            localStorage.setItem("IsPasswordChange", false);
                            window.location.replace('app.html#/home');
                            // $location.path("/companylist");

                        } else {
                            $scope.LoginError = "Invalid user name or password.";
                        }
                    }


                });
            }).error(function () {
                $scope.LoginError = "Invalid user name or password.";
            });

        }
        else {
            $scope.submitted = true;

        }
    }


}]);
