app.service('ViewVariablesService', ['$http', function ($http) {
    debugger
    this.GetWebsiteDomain = function () {
       // return "http://api.davemuslayah.com/";
        return "http://localhost:50675/";
        
    }
    this.GetBaseAddress = function () {
        //return this.GetWebsiteDomain() + "api/";
        return this.GetWebsiteDomain() + "api/";
    }

    var DatasendToItemListPage = {};
    this.SetDatasendToItemListPage = function (data) {
        debugger
        this.DatasendToItemListPage = data;
    }
    this.GetDatasendToItemListPage = function (data) {
        return this.DatasendToItemListPage;
    }

    var DataofMenu = {};
    this.SetDataofMenu = function (data) {
        debugger
        this.DataofMenu = data;
    }
    this.GetDataofMenu = function (data) {
        return this.DataofMenu;
    }

 var SingleItemData = {};
    this.SetSingleItemData = function (data) {
        debugger
        this.SingleItemData = data;
    }
    this.GetSingleItemData = function (data) {
        return this.SingleItemData;
    }
}]);