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


    var BrandData = [];
    this.SetBrandData = function (data) {

        this.BrandData = data;
    }
    this.GetBrandData = function (data) {
        return this.BrandData;
    }
    var ImageData1920 = [];
    this.Set1920ImageData = function (data) {

        this.ImageData1920 = data;
    }
    this.Get1920ImageData = function (data) {
        return this.ImageData1920;
    }
    
    var ItemListBestSellerProduct = [];
    this.SetItemListBestSellerProduct = function (data) {

        this.ItemListBestSellerProduct = data;
    }
    this.GetItemListBestSellerProduct = function (data) {
        return this.ItemListBestSellerProduct;
    }
    var ItemListHotDealsProduct = [];
    this.SetItemListHotDealsProduct = function (data) {

        this.ItemListHotDealsProduct = data;
    }
    this.GetItemListHotDealsProduct = function (data) {
        return this.ItemListHotDealsProduct;
    }
    var ItemListFeaturedProduct = [];
    this.SetItemListFeaturedProduct = function (data) {

        this.ItemListFeaturedProduct = data;
    }
    this.GetItemListFeaturedProduct = function (data) {
        return this.ItemListFeaturedProduct;
    }
    var ItemListNewArrivalsProduct = [];
    this.SetItemListNewArrivalsProduct = function (data) {

        this.ItemListNewArrivalsProduct = data;
    }
    this.GetItemListNewArrivalsProduct = function (data) {
        return this.ItemListNewArrivalsProduct;
    }
    var ItemListTopProductsProduct = [];
    this.SetItemListTopProductsProduct = function (data) {

        this.ItemListTopProductsProduct = data;
    }
    this.GetItemListTopProductsProduct = function (data) {
        return this.ItemListTopProductsProduct;
    }
}]);