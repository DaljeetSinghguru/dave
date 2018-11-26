app.controller('BlogController', ['$scope','$route', '$http','$modal', '$location', 'ItemService', 'blogService', 'SubCategoryService', 'CategoryMasterService',
    function ($scope, $route, $http, $modal, $location, ItemService, blogService, SubCategoryService, CategoryMasterService) {
        
        $scope.btntext = "Save";
        $scope.FileNameUpload = "";
        $scope.Blog = {};

        $scope.imageUpload = function (event) {
            $scope.PlsUploadOfferLetter = false;
            var files = event.target.files; //FileList object
            $scope.FileOfferletterUpload = event.target.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();
                reader.onload = $scope.imageIsLoaded;
                reader.readAsDataURL(file);
            }

            $scope.FileNameUpload = files[0].name;
            $scope.$apply();
            if ($scope.btntext == "Update") {
                blogService.UpdateBrandFile($scope.FileOfferletterUpload, $scope.Brand.BrandId).success(function (data, status, headers, config) {
                    if (data.length > 0) {
                        //toaster.pop('success', "Success", "Offer letter is successfully uploaded");
                        $scope.RefreshBrandGrid();
                        $scope.Brand = {};
                        $scope.FileNameUpload = "";
                        $scope.btntext = "Save";
                    }
                })
            }

        }


        $scope.SaveDetail = function () {
            debugger
            if ($scope.btntext == "Save") {
                blogService.InsertBlogData($scope.Blog).success(function (data, status, headers, config) {
                    debugger
                    blogService.InsertData($scope.FileOfferletterUpload,data).success(function (data, status, headers, config) {
                        $scope.RefreshBrandGrid();
                        $scope.Blog = {};
                        $scope.FileNameUpload = "";
                    })
                })

               
            }

            if ($scope.btntext == "Update") {
                blogService.UpdateData($scope.Brand).success(function (data, status, headers, config) {
                    $scope.RefreshBrandGrid();
                    $scope.Brand = {};
                    $scope.FileNameUpload = "";
                    $scope.btntext = "Save";
                })
            }


        }

        ///REFRESH GRID 
        $scope.RefreshBrandGrid = function () {
            $scope.screenResolution1 = new kendo.data.DataSource({
                transport: {
                    read: {
                        function(e) {

                        }
                    }
                },
            });
        }
     
        $scope.onChange = function (selected, data, dataIteam, angularDataItem) {
            debugger
            $scope.Brand.Name = data.Header;
            $scope.Brand.SearchKeyword1 = data.Description;
           
         
            if (data.Active == "True") {
                $scope.Brand.Active1 = true;
            }
            else { $scope.Brand.Active1 = false; }
            $scope.FileNameUpload = data.filename;
            $scope.BrandDescription1 = false;
            $scope.btntextBrand = "Update";
        }

    }]);

