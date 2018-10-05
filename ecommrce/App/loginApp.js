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
//app.config(['$translateProvider', '$translatePartialLoaderProvider',
//    function ($translateProvider, $translatePartialLoaderProvider) {
//        $translatePartialLoaderProvider.addPart('main');
//        $translateProvider.useLoader('$translatePartialLoader', {
//            urlTemplate: '{part}_{lang}.json'
//        });

//        $translateProvider.preferredLanguage("en");
//    }
//]);
//app.config(['$translateProvider',
//    function ($translateProvider) {
//        $translateProvider.translations('en', {
//            'hello': "Hello!",
//            'subtitle': 'This is running Angular JS v{{ajsVersion}} and angular-translate v{{translateVersion}}!',
//            'text': "Your browser is: {{browser}}"
//        });
//        $translateProvider.translations('de', {
//            'hello': "Hallo!",
//            'subtitle': 'Hier läuft gerade Angular JS v{{ajsVersion}} und angular-translate v{{translateVersion}}!',
//            'text': "Dein Browser ist: {{browser}}"
//        });
//        $translateProvider.preferredLanguage("en");
//    }
//]);

var translationsEN = {
    HEADLINE: 'What an awesome module!',
    PARAGRAPH: 'Srsly!',
    PASSED_AS_TEXT: 'Hey there! I\'m passed as text value!',
    PASSED_AS_ATTRIBUTE: 'I\'m passed as attribute value, cool ha?',
    PASSED_AS_INTERPOLATION: 'Beginners! I\'m interpolated!',
    VARIABLE_REPLACEMENT: 'Hi {{name}}',
    MISSING_TRANSLATION: 'Oops! I have not been translated into German...',
    BUTTON_LANG_FR: 'French',
    BUTTON_LANG_EN: 'English',

    What_are_you_searching_for: 'What are you searching for?',
    Search: 'Search',
    items: 'items',
    VIEW_BASKET: 'VIEW_BASKET',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    Home: 'Home',
};

var translationsFR = {
    HEADLINE: 'Was für ein großartiges Modul!',
    PARAGRAPH: 'Ernsthaft!',
    PASSED_AS_TEXT: 'Hey! Ich wurde als text übergeben!',
    PASSED_AS_ATTRIBUTE: 'Ich wurde als Attribut übergeben, cool oder?',
    PASSED_AS_INTERPOLATION: 'Anfänger! Ich bin interpoliert!',
    VARIABLE_REPLACEMENT: 'Hi {{name}}',
    // MISSING_TRANSLATION is ... missing :)
    BUTTON_LANG_FR: 'français',
    BUTTON_LANG_EN: 'Anglais',


    What_are_you_searching_for: 'Que cherchez-vous?',
    Search: 'Chercher',
    items: 'articles',
    VIEW_BASKET: 'VOIR LE PANIER',
    LOGIN: 'S\'identifier',
    LOGOUT: 'CONNECTEZ - OUT',
    Home: 'Accueil',


};

app.config(['$translateProvider', function ($translateProvider) {
    // add translation tables
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('fr', translationsFR);
    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage('en');
}]);



//app.config(["$translateProvider", function ($translateProvider) {

//    var en_translations = {
//        "language": "Select Your Country",
//        "Welcome": "english"
//    }

//    var sp_translations = {
//        "language": "Selecciona tu pais",
//        "Welcome": "spenish"
//    }

//    $translateProvider.translations('en', en_translations);

//    $translateProvider.translations('sp', sp_translations);

//    $translateProvider.preferredLanguage('en');

//}]);
app.config(['$routeProvider', function ($routeProvider) {

    // $httpProvider.interceptors.push('httpInterceptor');

    $routeProvider

        .when('/Default', {
            templateUrl: 'app/views/Default.html',
            contrller: 'DefaultController'
        })

        .when('/Registerme', {
            templateUrl: 'app/views/Registerme.html',
            contrller: 'RegistermeController'
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


app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

