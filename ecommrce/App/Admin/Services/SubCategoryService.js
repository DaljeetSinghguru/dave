app.service('SubCategoryService', ['$http',  function ($http) {


    this.baseURl = "http://api.davemuslayah.com/api/";


    this.getData = function () {
        return $http({ method: 'GET', url: this.baseURl + 'Subcategory/GetData' });
    }
    
    this.getSubCategoryData = function (ID) {
        return $http({ method: 'GET', url: this.baseURl + 'Subcategory/GetSubCategoryData?Id='+ID+'' });
    }
}])
