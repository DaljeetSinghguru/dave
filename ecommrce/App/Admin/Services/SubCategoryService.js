app.service('SubCategoryService', ['$http', 'ViewVariablesService', function ($http, ViewVariablesService) {


    this.baseURl = ViewVariablesService.GetBaseAddress();
    this.getData = function () {
        return $http({ method: 'GET', url: this.baseURl + 'Subcategory/GetData' });
    }
    
    this.getSubCategoryData = function (ID) {
        return $http({ method: 'GET', url: this.baseURl + 'Subcategory/GetSubCategoryData?Id='+ID+'' });
    }
}])
