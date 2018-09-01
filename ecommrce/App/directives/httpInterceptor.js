app.factory('httpInterceptor', ['$location', '$q', '$rootScope', function ($location, $q, $rootScope) {

    //dataHelper.responseStatus = {};
    return {
        request: function (config) {
            // console.log("Try to pass token");
            var authToken = $.cookie("Token");
            var rememberMe = $.cookie("rememberMe");
            if (authToken) {
                config.headers['Authorization'] = 'Bearer ' + authToken;
            }
            if (rememberMe) {
                config.headers['Remember-Me'] = rememberMe;
            }
            return config || $q.when(config);
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401", rejection);
                //$rootScope.$apply(function () {
                $.removeCookie('Token');
                $.removeCookie('TokenIsSet');
                $.removeCookie('name');
                $.removeCookie('DefaultCompanyId');
                $.removeCookie('DefaultCompanyIsSet');
                $.removeCookie('email');
                $.removeCookie('UserId');
                $.removeCookie('Menu');
                window.location.replace('index.html');
                // });
            }
            return $q.reject(rejection);
        }
    };
}
]);