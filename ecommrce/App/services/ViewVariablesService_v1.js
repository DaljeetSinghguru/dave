app.service('ViewVariablesService', ['$http', function ($http) {
    
    this.GetWebsiteDomain = function () {
       // return "http://api.davemuslayah.com/";
        return "http://localhost:50675/";
        
    }
    this.GetBaseAddress = function () {
        //return this.GetWebsiteDomain() + "api/";
        return this.GetWebsiteDomain() + "api/";
    }
}]);