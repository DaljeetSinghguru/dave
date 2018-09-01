app.service('SubCategoryMasterService', ['$http', 'ViewVariablesService', function ($http, ViewVariablesService) {



    this.baseURl = ViewVariablesService.GetBaseAddress();
    this.GetSubCategory = function () {
        return $http({ method: 'POST', url: this.baseURl + 'SubCategory/SubCategory_Find?Active=True' });
    }
    this.InsertSubCategory = function (Object) {
        return $http({ method: 'POST', url: this.baseURl + 'SubCategory/SubCategory_Insert', data: Object });
    }
    this.UpdateSubCategory = function (Object) {
        return $http({ method: 'POST', url: this.baseURl + 'SubCategory/SubCategory_Update', data: Object });
    }
}])
