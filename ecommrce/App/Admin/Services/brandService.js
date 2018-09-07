app.service('brandService', ['$http', 'ViewVariablesService', function ($http, ViewVariablesService) {

    
    this.baseURl = ViewVariablesService.GetBaseAddress();
    //this.baseURl = "http://localhost:50675/api/";
 

    this.InsertBrandData = function (image, BrandName, SearchKeyword, MetaDescription, Active ) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", image[0]);
        dataAsFormData.append("BrandName", BrandName);
        dataAsFormData.append("SearchKeyword", SearchKeyword);
        dataAsFormData.append("MetaDescription", MetaDescription);
        dataAsFormData.append("Active", Active);
        return $http({
            url: this.baseURl + 'Brand/InsertBrandData',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.getData = function () {
        return $http({ method: 'GET', url: this.baseURl + 'Brand/GetBrand_Find?Active=&ss=1' });
    }

    this.UpdateBrandData = function (Object) {
        return $http({ method: 'POST', url: this.baseURl + 'Brand/Brand_Update', data: Object });
    }

 this.UpdateBrandFile = function (image, Id ) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", image[0]);
        dataAsFormData.append("Id", Id);
        return $http({
            url: this.baseURl + 'Brand/UpdateBrandFileData',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
}])
