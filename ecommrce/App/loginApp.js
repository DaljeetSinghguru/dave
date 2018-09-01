var app = angular.module('loginApp', [
    'ngRoute',
    'ui.bootstrap',

]);

//app.config(['$httpProvider', function ($httpProvider) {
//    
//    $httpProvider.interceptors.push('httpInterceptor');

//}]);

app.config(['$routeProvider',  function ($routeProvider) {
    
   // $httpProvider.interceptors.push('httpInterceptor');

    $routeProvider
        .when('/login', {
            templateUrl: 'app/views/login.html',
            contrller: 'loginController'
        })

        .when('/signup', {
            templateUrl: 'app/views/signup.html',
            contrller: 'signupController'
        })
        .when('/ForgetPassword', {
            templateUrl: 'app/views/ForgetPassword.html',
        })
        //.when('/resetpassword/:code', {
        //    templateUrl: 'app/views/ResetPassword.html',
        //})
        .when('/resetpassword/', {
            url: '?Code&Email',
            templateUrl: 'app/views/ResetPassword.html',
        })
        .when('/changepassword/', {
            templateUrl: 'app/views/changepassword.html',
            contrller: 'ChangePasswordController',
        })
        .otherwise({
            redirectTo: '/login'
        });



}]);
    //.directive('passwordCheck', function () {
    //return {
    //    restrict: 'A',
    //    require: 'ngModel',
    //    link: function (scope, elem, attrs, ctrl) {
    //        var firstPassword = '#' + attrs.passwordCheck;
    //        elem.add(firstPassword).on('keyup', function () {
    //            scope.$apply(function () {
    //                var v = elem.val() === $(firstPassword).val();
    //                ctrl.$setValidity('pwmatch', v);
    //            });
    //        });
    //    }
    //}

    //});
    