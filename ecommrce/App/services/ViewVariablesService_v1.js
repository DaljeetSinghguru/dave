app.service('ViewVariablesService', ['$http', function ($http) {
    
    this.GetWebsiteDomain = function () {
         return "http://api.davemuslayah.com/";
      // return "http://localhost:50675/";

    }
    this.GetBaseAddress = function () {
        //return this.GetWebsiteDomain() + "api/";
        return this.GetWebsiteDomain() + "api/";
    }

    var DatasendToItemListPage = {};
    this.SetDatasendToItemListPage = function (data) {
        
        this.DatasendToItemListPage = data;
    }
    this.GetDatasendToItemListPage = function (data) {
        return this.DatasendToItemListPage;
    }

    var DataofMenu = {};
    this.SetDataofMenu = function (data) {
        
        this.DataofMenu = data;
    }
    this.GetDataofMenu = function (data) {
        return this.DataofMenu;
    }

    var SingleItemData = {};
    this.SetSingleItemData = function (data) {
        
        this.SingleItemData = data;
    }
    this.GetSingleItemData = function (data) {
        return this.SingleItemData;
    }

    var DatasendToItemListPageCategory = {};
    this.SetDatasendToItemListPageCategory = function (data) {
        
        this.DatasendToItemListPageCategory = data;
    }
    this.GetDatasendToItemListPageCategory = function (data) {
        return this.DatasendToItemListPageCategory;
    }

    var DatasendToItemListPageCategoryLevel2 = {};
    this.SetDatasendToItemListPageCategoryLevel2 = function (data) {
        
        this.DatasendToItemListPageCategoryLevel2 = data;
    }
    this.GetDatasendToItemListPageCategoryLevel2 = function (data) {
        return this.DatasendToItemListPageCategoryLevel2;
    }
    var DatasendToItemListPageLevel1 = {};
    this.SetDatasendToItemListPageLevel1 = function (data) {
        
        this.DatasendToItemListPageLevel1 = data;
    }
    this.GetDatasendToItemListPageLevel1 = function (data) {
        return this.DatasendToItemListPageLevel1;
    }
    var logindetails = {};
    this.setlogindetails = function (data) {
        
        this.logindetails = data;
    }
    this.Getlogindetails = function (data) {
        return this.logindetails;
    }
    var OrderId = {};
    this.SetOrderId = function (data) {
        
        this.OrderId = data;
    }
    this.GetOrderId = function (data) {
        return this.OrderId;
    }
}]);