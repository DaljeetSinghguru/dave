//Stripe.setPublishableKey('pk_test_aj305u5jk2uN1hrDQWdH0eyl');

var app = angular.module('loginApp', [
    'ngRoute',
    'ui.bootstrap',
    'pascalprecht.translate', 'ngSanitize', 'kendo.directives',
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
        .when('/Login', {
            templateUrl: 'app/views/Login.html',
            contrller: 'loginController'
        })
        .when('/Thankyou', {
            templateUrl: 'app/views/Thankyou.html',
            contrller: 'ThankyouController'
        })
        .when('/ItemDetail', {
            templateUrl: 'app/views/ItemDetail.html',
            contrller: 'ItemDetailController'
        })
        .when('/ItemListCategory3', {
            templateUrl: 'app/views/CategoryLevel3.html',
            contrller: 'loginController'
        })
        .when('/ItemListCategory2', {
            templateUrl: 'app/views/CategoryLevel2.html',
            contrller: 'loginController'
        })
        .when('/ItemListCategory1', {
            templateUrl: 'app/views/CategoryLevel1.html',
            contrller: 'loginController'
        })
        .when('/MyCart', {
            templateUrl: 'app/views/MyCart.html',
            contrller: 'MyCartController'
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

app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });
