
var app = angular.module('webApp', [
    'ngRoute', 'ui.bootstrap',
    'kendo.directives',
]).run(['$rootScope', function ($rootScope, $routeChangeStart) {
    
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
    });
}]);




app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            /////////////// SLIM VISA /////////////////////////
            .when('/LandingPageVisa', {
                templateUrl: 'App/Admin/views/LandingPageVisa.html',
                contrller: 'app/controllers/LandingPageVisaController.js'
            })
            .when('/Category', {

                templateUrl: 'App/Admin/views/CategoryView.html',
                contrller: 'app/controllers/Master/CountryMasterController.js'
            })
            .when('/Brand', {
                templateUrl: 'App/Admin/views/BrandView.html',
                contrller: 'app/controllers/Master/CountryMasterController.js'
            })
            .when('/Item', {
                templateUrl: 'App/Admin/views/ItemView.html',
                contrller: 'app/controllers/Master/CountryMasterController.js'
            })
            .when('/SubCategory', {

                    templateUrl: 'App/Admin/views/SubCategoryView.html',
                    contrller: 'app/controllers/Master/SubCountryMasterController.js'
                })
            .when('/CollegeList', {
                templateUrl: 'app/views/Master/CollegeMasterView.html',
                contrller: 'app/controllers/CollegeMasterController.js'
            })


            /////////////////////// END TASK DEFINED ROUTES ////////////////////

            .otherwise({
                redirectTo: '/Task:Inbox'
            });
    }]);
