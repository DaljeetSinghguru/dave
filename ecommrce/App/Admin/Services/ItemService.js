app.service('ItemService', ['$http', 'ViewVariablesService', function ($http, ViewVariablesService) {


    this.baseURl = ViewVariablesService.GetBaseAddress();
    


    this.InsertItemData = function (Object) {
        return $http({ method: 'POST', url: this.baseURl + 'Item/InsertItemData', data: Object });
     }
    this.UpdateItemData = function (Object) {
        return $http({ method: 'POST', url: this.baseURl + 'Item/UpdateItemData', data: Object });
    }
    //this.UpdateItemData = function (
    //    Name,
    //    //CategoryId,
    //    BrandId,
    //    //SubCategoryId, 
    //    Description, ItemStockCode, Price, Title, Stockinhand, ItemId, VAT, SearchKeyword, MetaDescription, Active) {
    //    var dataAsFormData = new FormData();

    //    dataAsFormData.append("ItemName", Name);
    //    //dataAsFormData.append("CategoryId", CategoryId);
    //    dataAsFormData.append("BrandId", BrandId);
    //    //dataAsFormData.append("SubCategoryId", SubCategoryId);
    //    dataAsFormData.append("Description", Description);
    //    dataAsFormData.append("ItemStockCode", ItemStockCode);
    //    dataAsFormData.append("Price", Price);
    //    dataAsFormData.append("Title", Title);
    //    dataAsFormData.append("Stockinhand", Stockinhand);
    //    dataAsFormData.append("ItemId", ItemId);
    //    dataAsFormData.append("VAT", VAT);
    //    dataAsFormData.append("SearchKeyword", SearchKeyword);
    //    dataAsFormData.append("MetaDescription", MetaDescription);
    //    dataAsFormData.append("Active", Active);
    //    return $http({
    //        url: this.baseURl + 'Item/UpdateItemData',
    //        method: "POST",
    //        data: dataAsFormData,
    //        transformRequest: angular.identity,
    //        headers: { 'Content-Type': undefined }
    //    });
    //}
    this.getData = function () {
        return $http({ method: 'GET', url: this.baseURl + 'Item/GetData' });
    }
    this.GetItemGridData = function () {
        return $http({ method: 'GET', url: this.baseURl + 'Item/GetItemGridData' });
    }

    this.UpdateImageFile1 = function (FileOfferletterUpload, ItemId) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", FileOfferletterUpload[0]);
        dataAsFormData.append("ItemId", ItemId);
        return $http({
            url: this.baseURl + 'Item/UpdateImageFile1',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.UpdateImageFile2 = function (FileOfferletterUpload, ItemId) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", FileOfferletterUpload[0]);
        dataAsFormData.append("ItemId", ItemId);
        return $http({
            url: this.baseURl + 'Item/UpdateImageFile2',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.UpdateImageFile3 = function (FileOfferletterUpload, ItemId) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", FileOfferletterUpload[0]);
        dataAsFormData.append("ItemId", ItemId);
        return $http({
            url: this.baseURl + 'Item/UpdateImageFile3',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.UpdateImageFile4 = function (FileOfferletterUpload, ItemId) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", FileOfferletterUpload[0]);
        dataAsFormData.append("ItemId", ItemId);
        return $http({
            url: this.baseURl + 'Item/UpdateImageFile4',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.UpdateImageFile5 = function (FileOfferletterUpload, ItemId) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", FileOfferletterUpload[0]);
        dataAsFormData.append("ItemId", ItemId);
        return $http({
            url: this.baseURl + 'Item/UpdateImageFile5',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }

    this.UpdateImageFile6 = function (FileOfferletterUpload, ItemId) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", FileOfferletterUpload[0]);
        dataAsFormData.append("ItemId", ItemId);
        return $http({
            url: this.baseURl + 'Item/UpdateImageFile6',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }


    this.GetAllItemStockCode = function () {
        return $http({ method: 'GET', url: this.baseURl + 'Item/GetAllItemStockCode' });
    }

   
    this.InsertItemSelectedRelatedItems = function (a, b) {
        return $http({ method: 'POST', url: this.baseURl + 'Item/InsertItemSelectedRelatedItems?ItemStockCode=' + a + '&SelectedRelatedItems=' + b + '', });
    }
    this.InsertItemselectedAccessories = function (a,b) {
        return $http({ method: 'POST', url: this.baseURl + 'Item/InsertItemselectedAccessories?ItemStockCode=' + a +'&SelectedAccesories='+b+'', });
    }

    this.LinkCategorywithSelectedItems = function (a,b) {
        return $http({ method: 'POST', url: this.baseURl + 'Item/LinkCategorywithSelectedItem?ItemStockCode=' + a +'&CategoryId='+b+'', });
    }
}])
