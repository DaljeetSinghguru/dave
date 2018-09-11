﻿var app = angular.module('loginApp', [
    'ngRoute',
    'ui.bootstrap',
    'pascalprecht.translate', 
]);

//app.config(['$httpProvider', function ($httpProvider) {
//    
//    $httpProvider.interceptors.push('httpInterceptor');

//}]);
app.config(["$translateProvider", function ($translateProvider) {

    var en_translations = {
        "language": "Select Your Country",
        "Welcome": "english"
    }

    var sp_translations = {
        "language": "Selecciona tu pais",
        "Welcome": "spenish"
    }

    $translateProvider.translations('en', en_translations);

    $translateProvider.translations('sp', sp_translations);

    $translateProvider.preferredLanguage('en');

}]);
app.config(['$routeProvider',  function ($routeProvider) {
    
   // $httpProvider.interceptors.push('httpInterceptor');

    $routeProvider
        
        .when('/Default', {
            templateUrl: 'app/views/Default.html',
            contrller: 'DefaultController'
        })
        .when('/ItemList', {
            templateUrl: 'app/views/ItemList.html',
            contrller: 'loginController'
        })
        .when('/ItemDetail', {
            templateUrl: 'app/views/ItemDetail.html',
            contrller: 'ItemDetailController'
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
            redirectTo: '/Default'
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

