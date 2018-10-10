app.service('CategoryMasterService', ['$http', 'ViewVariablesService', function ($http, ViewVariablesService) {



    this.baseURl = ViewVariablesService.GetBaseAddress();


    this.GetCategory = function () {
        return $http({ method: 'POST', url: this.baseURl + 'Category/Category_Find?Active=True' });
    }
    this.InsertCategory = function (Object) {
        return $http({ method: 'POST', url: this.baseURl + 'Category/Category_Insert', data: Object });
    }
    this.GetCategoryGridData = function () {
        return $http({ method: 'POST', url: this.baseURl + 'Category/Category_Find?Active=' });
    }
 this.UpdateCategory = function (Object) {
        return $http({ method: 'POST', url: this.baseURl + 'Category/Category_Update', data: Object });
    }




 this.GetCategorywithSubcategoryData = function () {
     return $http({ method: 'GET', url: this.baseURl + 'CategoryMaster/GetMenu' });
 }

 
 //this.SaveCategory = function (a,b) {
 //    return $http({ method: 'POST', url: this.baseURl + 'Category/SaveCategory?name='+a+'&ParentId='+b+'' });
 //}


    this.SaveupdateCategory = function (FileUpload, CategoryName, IsParentMenuId, Active) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", FileUpload[0]);
        dataAsFormData.append("CategoryName", CategoryName);
        dataAsFormData.append("IsParentMenuId", IsParentMenuId);
        dataAsFormData.append("Active", Active);
        return $http({
            url: this.baseURl + 'Category/SaveUpdateCategory',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }

 this.SaveCategory = function (FileUpload, CategoryName, IsParentMenuId,Active) {
     var dataAsFormData = new FormData();
     dataAsFormData.append("Image", FileUpload[0]);
     dataAsFormData.append("CategoryName", CategoryName);
     dataAsFormData.append("IsParentMenuId", IsParentMenuId);
     dataAsFormData.append("Active", Active);
     return $http({
         url: this.baseURl + 'Category/SaveCategory',
         method: "POST",
         data: dataAsFormData,
         transformRequest: angular.identity,
         headers: { 'Content-Type': undefined }
     });
 }
 this.DeleteCategory = function (a) {
     return $http({ method: 'POST', url: this.baseURl + 'Category/DeleteCategory?Id=' + a + '' });
 }

}])
