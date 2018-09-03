app.controller('ItemController', ['$scope', '$http','$modal', '$location', 'ItemService', 'brandService', 'SubCategoryService', 'CategoryMasterService',
    function ($scope, $http, $modal, $location, ItemService, brandService, SubCategoryService, CategoryMasterService) {
        


        $scope.SaveItemDone = false;
        $scope.brandList = [];
        $scope.Item = {};
        $scope.Bindbrand = function () {
            $scope.branddata = [];
            brandService.getData().success(function (results) {
                if (results != "") {
                    $scope.brandList = [];
                    $scope.branddata = results;
                    for (var i = 0; i < $scope.branddata.length; i++) {
                        $scope.brandList.push({ "Name": $scope.branddata[i].BrandName, "Id": $scope.branddata[i].BrandId });//    
                    }
                }
                else { }
            }).error(function (data, status, headers, config) {

            });
        }

        $scope.Bindbrand();

        $scope.BrandOptions = {
            change: function (e) {
            },
            select: function () {
            }
        }


        /////////////////////////////////////////////////////////////////////////////////////


        $scope.SubCategoryList = [];

        $scope.BindSubCategory = function (ID) {
            $scope.SubCategorydata = [];
            SubCategoryService.getSubCategoryData(ID).success(function (results) {
                if (results != "") {
                    $scope.SubCategoryList = [];
                    $scope.SubCategorydata = results;
                    for (var i = 0; i < $scope.SubCategorydata.length; i++) {
                        $scope.SubCategoryList.push({ "Name": $scope.SubCategorydata[i].SubCategoryName, "Id": $scope.SubCategorydata[i].SubCategoryId });//    
                    }
                }
                else { }
            }).error(function (data, status, headers, config) {

            });
        }



        $scope.SubCategoryOptions = {
            change: function (e) {
            },
            select: function () {
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////


        $scope.CategoryList = [];

        $scope.BindCategory = function () {
            $scope.Categorydata = [];
            CategoryMasterService.GetCategory().success(function (results) {
                if (results != "") {
                    
                    $scope.CategoryList = [];
                    $scope.Categorydata = results;
                    for (var i = 0; i < $scope.Categorydata.length; i++) {
                        $scope.CategoryList.push({ "Name": $scope.Categorydata[i].CategoryName, "Id": $scope.Categorydata[i].CategoryId });//    
                    }
                }
                else { }
            }).error(function (data, status, headers, config) {

            });
        }

        $scope.BindCategory();

        $scope.CategoryOptions = {
            change: function (e) {
                $scope.SubCategoryList = [];
                $scope.Item.SubCategory = { "Name": "", "Id": ""};
                $scope.BindSubCategory(e.sender._old);
            },
            select: function () {
            }
        }


        $scope.FileNameUpload = "";
        $scope.imagemainUpload = function (event) {
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

            if ($scope.btntextCategory == "Update") {
                ItemService.UpdateImageFile1($scope.FileOfferletterUpload, $scope.Item.ItemId).success(function (data, status, headers, config) {
                    if (data.length > 0) {
                        //toaster.pop('success', "Success", "Offer letter is successfully uploaded");
                    }
                })
            }



        }
        /////////////////////////////////////////////////////////////////////////////FILE NAME UPOAD 1
        $scope.FileNameUpload1 = "";
        $scope.imagemainUpload1 = function (event) {
            $scope.PlsUploadOfferLetter1 = false;
            var files1 = event.target.files; //FileList object
            $scope.FileOfferletterUpload1 = event.target.files;
            for (var i = 0; i < files1.length; i++) {
                var file1 = files1[i];
                var reader = new FileReader();
                reader.onload = $scope.imageIsLoaded;
                reader.readAsDataURL(file1);
            }

            $scope.FileNameUpload1 = files1[0].name;
            $scope.$apply();
            if ($scope.btntextCategory == "Update") {
                ItemService.UpdateImageFile2($scope.FileOfferletterUpload1, $scope.Item.ItemId).success(function (data, status, headers, config) {
                    if (data.length > 0) {
                        //toaster.pop('success', "Success", "Offer letter is successfully uploaded");
                    }
                })
            }
        }

        /////////////////////////////////////////////////////////////////////////////FILE NAME UPOAD 2
        $scope.FileNameUpload2 = "";
        $scope.imagemainUpload2 = function (event) {
            $scope.PlsUploadOfferLetter2 = false;
            var files2 = event.target.files; //FileList object
            $scope.FileOfferletterUpload2 = event.target.files;
            for (var i = 0; i < files2.length; i++) {
                var file2 = files2[i];
                var reader = new FileReader();
                reader.onload = $scope.imageIsLoaded;
                reader.readAsDataURL(file2);
            }

            $scope.FileNameUpload2 = files2[0].name;
            $scope.$apply();
            if ($scope.btntextCategory == "Update") {
                ItemService.UpdateImageFile3($scope.FileOfferletterUpload2, $scope.Item.ItemId).success(function (data, status, headers, config) {
                    if (data.length > 0) {
                        //toaster.pop('success', "Success", "Offer letter is successfully uploaded");
                    }
                })
            }
        }


        /////////////////////////////////////////////////////////////////////////////FILE NAME UPOAD 2
        $scope.FileNameUpload3 = "";
        $scope.imagemainUpload3 = function (event) {
            $scope.PlsUploadOfferLetter3 = false;
            var files3 = event.target.files; //FileList object
            $scope.FileOfferletterUpload3 = event.target.files;
            for (var i = 0; i < files3.length; i++) {
                var file3 = files3[i];
                var reader = new FileReader();
                reader.onload = $scope.imageIsLoaded;
                reader.readAsDataURL(file3);
            }

            $scope.FileNameUpload3 = files3[0].name;
            $scope.$apply();
            if ($scope.btntextCategory == "Update") {
                ItemService.UpdateImageFile4($scope.FileOfferletterUpload3, $scope.Item.ItemId).success(function (data, status, headers, config) {
                    if (data.length > 0) {
                        //toaster.pop('success', "Success", "Offer letter is successfully uploaded");
                    }
                })
            }
        }
        /////////////////////////////////////////////////////////////////////////////FILE NAME UPOAD 2
        $scope.FileNameUpload4 = "";
        $scope.imagemainUpload4 = function (event) {
            $scope.PlsUploadOfferLetter4 = false;
            var files4 = event.target.files; //FileList object
            $scope.FileOfferletterUpload4 = event.target.files;
            for (var i = 0; i < files4.length; i++) {
                var file4 = files4[i];
                var reader = new FileReader();
                reader.onload = $scope.imageIsLoaded;
                reader.readAsDataURL(file4);
            }

            $scope.FileNameUpload4 = files4[0].name;
            $scope.$apply();
            if ($scope.btntextCategory == "Update") {
                ItemService.UpdateImageFile5($scope.FileOfferletterUpload4, $scope.Item.ItemId).success(function (data, status, headers, config) {
                    if (data.length > 0) {
                        //toaster.pop('success', "Success", "Offer letter is successfully uploaded");
                    }
                })
            }
        }
        /////////////////////////////////////////////////////////////////////////////FILE NAME UPOAD 2
        $scope.FileNameUpload5 = "";
        $scope.imagemainUpload5 = function (event) {
            $scope.PlsUploadOfferLetter5 = false;
            var files5 = event.target.files; //FileList object
            $scope.FileOfferletterUpload5 = event.target.files;
            for (var i = 0; i < files5.length; i++) {
                var file5 = files5[i];
                var reader = new FileReader();
                reader.onload = $scope.imageIsLoaded;
                reader.readAsDataURL(file5);
            }

            $scope.FileNameUpload5 = files5[0].name;
            $scope.$apply();
            if ($scope.btntextCategory == "Update") {
                ItemService.UpdateImageFile6($scope.FileOfferletterUpload5, $scope.Item.ItemId).success(function (data, status, headers, config) {
                    if (data.length > 0) {
                        //toaster.pop('success', "Success", "Offer letter is successfully uploaded");
                    }
                })
            }
        }
        ///////////////////////................................////////////////////////////.......................................////////////////////.
        ///////////////////////................................////////////////////////////.......................................////////////////////.
        ///////////////////////................................////////////////////////////.......................................////////////////////.
        $scope.btntextCategory = "Save";
        $scope.SaveItemDetail = function () {
            debugger

            var chkValFields = 0;
            if ($scope.Item.Description == "" || $scope.Item.Description == undefined) {
                $scope.ItemDescriptionval = true;
                chkValFields = 1;
            }
            if ($scope.Item.Stockinhand == "" || $scope.Item.Stockinhand == undefined) {
                $scope.ItemStockinhandval = true;
                chkValFields = 1;
            }
            if ($scope.Item.Price == "" || $scope.Item.Price == undefined) {
                $scope.ItemPriceval = true;
                chkValFields = 1;
            }
            if ($scope.Item.ItemStockCode == "" || $scope.Item.ItemStockCode == undefined) {
                $scope.ItemItemStockCodeval = true;
                chkValFields = 1;
            }
            if ($scope.Item.Title == "" || $scope.Item.Title == undefined) {
                $scope.ItemTitleval = true;
                chkValFields = 1;
            }
            if ($scope.Item.Name == "" || $scope.Item.Name == undefined) {
                $scope.ItemNameval = true;
                chkValFields = 1;
            }
            if ($scope.Item.SubCategory == "" || $scope.Item.SubCategory == undefined) {
                $scope.ItemSubCategoryval = true;
                chkValFields = 1;
            }
            if ($scope.Item.Category == "" || $scope.Item.Category == undefined) {
                $scope.ItemCategoryval = true;
                chkValFields = 1;
            }
            if ($scope.Item.Brand == "" || $scope.Item.Brand == undefined) {
                $scope.ItemBrandval = true;
                chkValFields = 1;
            }



            //if ($scope.FileOfferletterUpload == "" || $scope.FileOfferletterUpload == undefined) {
            //    if ($scope.btntextCategory == "Save") {
            //        $scope.FileOfferletterUploadval = true;
            //        chkValFields = 1;
            //    }
                
            //}
            //if ($scope.FileOfferletterUpload1 == "" || $scope.FileOfferletterUpload1 == undefined) {
            //    if ($scope.btntextCategory == "Save") {
            //        $scope.FileOfferletterUploadval1 = true;
            //        chkValFields = 1;
            //    }
            //}
            //if ($scope.FileOfferletterUpload2 == "" || $scope.FileOfferletterUpload2 == undefined) {
            //    if ($scope.btntextCategory == "Save") {
            //        $scope.FileOfferletterUploadval2 = true;
            //        chkValFields = 1;
            //    }
            //}
            if (chkValFields == 0) {

                if ($scope.btntextCategory == "Save") {
                    ItemService.InsertItemData(
                        //$scope.FileOfferletterUpload,
                        //$scope.FileOfferletterUpload1,
                        //$scope.FileOfferletterUpload2,
                        //$scope.FileOfferletterUpload3,
                        //$scope.FileOfferletterUpload4,
                        //$scope.FileOfferletterUpload5,
                        $scope.Item.Name,
                        $scope.Item.Category.Id,
                        $scope.Item.Brand.Id,
                        $scope.Item.SubCategory.Id, $scope.Item.Description, $scope.Item.ItemStockCode, $scope.Item.Price, $scope.Item.Title, $scope.Item.Stockinhand, $scope.Item.Vat, $scope.Item.SearchKeyword,
                        $scope.Item.MetaDescription, $scope.Item.Active1
                    ).success(function (data, status, headers, config) {
                        $scope.RefreshItemGrid();
                        $scope.FileNameUpload = "";
                        $scope.FileNameUpload1 = "";
                        $scope.FileNameUpload2 = "";
                        $scope.Item = {};
                    })
                }
                if ($scope.btntextCategory == "Update") {
                    ItemService.UpdateItemData(
                        $scope.Item.Name,
                        $scope.Item.Category.Id,
                        $scope.Item.Brand.Id,
                        $scope.Item.SubCategory.Id, $scope.Item.Description, $scope.Item.ItemStockCode, $scope.Item.Price, $scope.Item.Title, $scope.Item.Stockinhand, $scope.Item.ItemId, $scope.Item.Vat, $scope.Item.SearchKeyword,
                        $scope.Item.MetaDescription, $scope.Item.Active1
                    ).success(function (data, status, headers, config) {
                        $scope.RefreshItemGrid();

                        $scope.FileNameUpload = "";
                        $scope.FileNameUpload1 = "";
                        $scope.FileNameUpload2 = "";
                        $scope.Item = {};
                    })
                }
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////BIND GRID DATA///////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        $scope.GridOptionsItem = {
            dataSource: {
                transport: {
                    read: function (e) {
                        
                        ItemService.GetItemGridData().success(function (data, status, headers, config) {
                            if (status == "200") {
                                if (data != "") {
                                    
                                    e.success(data);
                                    $scope.OpenFilterPopup = false;
                                }
                                else { toaster.pop('alert', "Alert", "No Data Found With This Search Selection"); }
                            }
                        }).error(function (data, status, headers, config) {
                            toaster.pop('error', "Error", "Please Contact Admin. Some Error Occur In Connection");
                        });
                    }
                },
                pageSize: 20,
                //serverPaging: true,
                // serverSorting: true
            },
            sortable: true,
            pageable: true,
            columns: [
                { field: "RowId", title: "#", width: "40px", },
              //  { field: "ItemId", title: "ItemId", width: "40px", },
                { field: "Name", title: "Item Name", width: "150px", },
                { field: "Title", title: "Title", width: "150px", },
                { field: "BrandName", title: "Brand", width: "100px" },
                { field: "CategoryName", title: "Category", width: "100px" },
                { field: "SubCategoryName", title: "SubCategoryName", width: "100px" },
                { field: "Price", title: "Price", width: "100px" },
                { field: "ItemStockCode", title: "ItemStockCode", width: "100px" },
                { field: "Description", title: "Description", width: "100px" },
                { field: "StockInHand", title: "StockInHand", width: "100px" }
            ]
        };
        $scope.onChangeGrid = function (selected, data, dataIteam, angularDataItem) {

            debugger
            $scope.Item.Description = data.Description;
            $scope.FileNameUpload2 = data.ItemImage2;
            $scope.FileNameUpload1 = data.ItemImage1;
            $scope.FileNameUpload = data.ItemMainImage;
            $scope.FileNameUpload3 = data.ItemImage3;
            $scope.FileNameUpload4 = data.ItemImage4;
            $scope.FileNameUpload5 = data.ItemImage5;
            $scope.Item.Stockinhand = data.StockInHand;
            $scope.Item.Price = data.Price;
            $scope.Item.ItemStockCode = data.ItemStockCode;
            $scope.Item.Title = data.Title;
            $scope.Item.Name = data.Name;
           
            $scope.Item.SearchKeyword = data.SearchKeyword;
            $scope.Item.MetaDescription = data.MetaDescription;
            $scope.Item.Vat = data.Vat;
            $scope.Item.SubCategory = { "Name": data.SubCategoryName, "Id": data.SubCategoryId };
            $scope.Item.Category = { "Name": data.CategoryName, "Id": data.CategoryId };
            $scope.Item.Brand = { "Name": data.BrandName, "Id": data.BrandId };
            $scope.Item.ItemId = data.ItemId;
            $scope.btntextCategory = "Update";

            if (data.Active == "True") { $scope.Item.Active1 = true; } else {
                $scope.Item.Active1 = false;
            }
            $scope.SaveItemDone = true;
        }


        ///REFRESH GRID 
        $scope.RefreshItemGrid = function () {
            $scope.screenResolution1 = new kendo.data.DataSource({
                transport: {
                    read: {
                        function(e) {

                        }
                    }
                },
            });
        }


        ////////////////////////UploadImages


        $scope.UploadImages = function () {
           
            //$scope.btnSaveText = "Download Offer Documents";
            $scope.Title = "Upload Images";

            $scope.modalInstanceImageUpload = $modal.open({
                scope: $scope,
                templateUrl: 'App/Admin/views/UploadItemImageView.html',
                size: "lg",

            });
        }

        
        $scope.CancelImageUploadModal = function () {
            if ($scope.modalInstanceImageUpload) {
                $scope.modalInstanceImageUpload.dismiss('cancel');
            }
        }

        $scope.filterGrid = function () {

            var grid = $scope.grid;
            if ($scope.filterText != "") {
                grid.dataSource.query({
                    page: 1,
                    pageSize: 100,
                    filter: {
                        logic: "or",
                        filters: [
                            { field: "ItemStockCode", operator: "contains", value: $scope.filterText }
                        ]
                    }
                });
            }
            else {
                grid.dataSource.query({
                    page: 1,
                    pageSize: 10,
                });
            }
        };

        $scope.RelatedImages = function () {
            $scope.Title = "Upload Images";

            $scope.modalInstanceImageUpload = $modal.open({
                scope: $scope,
                templateUrl: 'App/Admin/views/AddRelatedItemView.html',
                size: "lg",

            });
        }




        /////////////////////////////////////////
        ItemService.GetAllItemStockCode()
            .success(function (dataBrands, statusdataBrands, headersdataBrands, configdataBrands) {
                $scope.brandMultiselectOptions = {
                    placeholder: "Select Brands...",
                    dataTextField: "ItemStockCode",
                    dataValueField: "ItemStockCode",
                    valuePrimitive: true,
                    autoBind: false,
                    dataSource: {
                        data: dataBrands
                    },
                    //change: onChange,
                    //select: onSelect,
                    //close: onClose,
                }
            });

       // $scope.selectedIds = [];
        $scope.Linkaccessories = function () {
            debugger
            $scope.Item.ItemStockCode;
            $scope.Item.selectedAccessories;
            $scope.Item.ItemStockCode;
            var SelectedAccesories = JSON.stringify($scope.Item.selectedAccessories);

            ItemService.InsertItemselectedAccessories($scope.Item.ItemStockCode, SelectedAccesories)
                .success(function (dataBrands, statusdataBrands, headersdataBrands, configdataBrands) {
                    debugger
                })
            
        }

        $scope.LinkRelatedItems = function () {
            $scope.Item.ItemStockCode;
            var SelectedAccesories=  JSON.stringify($scope.Item.SelectedRelatedItems);


            ItemService.InsertItemSelectedRelatedItems($scope.Item.ItemStockCode, SelectedAccesories)
                .success(function (dataBrands, statusdataBrands, headersdataBrands, configdataBrands) {
                    debugger
                })
        }
    }]);

