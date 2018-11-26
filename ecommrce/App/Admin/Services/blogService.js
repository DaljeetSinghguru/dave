app.service('blogService', ['$http', 'ViewVariablesService', function ($http, ViewVariablesService) {

    
    this.baseURl = ViewVariablesService.GetBaseAddress();
    //this.baseURl = "http://localhost:50675/api/";
 

    this.InsertData = function (image, Id ) {
        var dataAsFormData = new FormData();
        dataAsFormData.append("Image", image[0]);
        dataAsFormData.append("Id", Id);
        
     
        return $http({
            url: this.baseURl + 'Blog/insertblogwithImage',
            method: "POST",
            data: dataAsFormData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.InsertBlogData = function (Object) {
        return $http({ method: 'POST', url: this.baseURl + 'Blog/InsertblogData', data: Object });
    }
}])
