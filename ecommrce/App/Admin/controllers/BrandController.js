app.controller('BrandController', ['$scope', '$http', 'brandService', '$anchorScroll', 
    function ($scope, $http, brandService , $anchorScroll) {
        

        $scope.FileNameUpload = "";
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

        }


        $scope.SavebrandDetail = function () {
            
            brandService.InsertBrandData($scope.FileOfferletterUpload, $scope.Brand.Name).success(function (data, status, headers, config) {
                   $scope.RefreshBrandGrid();
                        $scope.Brand = {};
                        $scope.FileNameUpload="";
            })


        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////BIND GRID DATA///////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        $scope.GridOptions = {
            dataSource: {
                transport: {
                    read: function (e) {
                        
                        brandService.getData().success(function (data, status, headers, config) {
                            if (status == "200") {
                                if (data != "") {
                                    e.success(data);
                                    $scope.OpenFilterPopup = false;
                                }
                                else { }
                            }
                        }).error(function (data, status, headers, config) {
                           
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
                { field: "BrandId", title: "#", width: "40px", },
                { field: "BrandName", title: "Name", width: "150px", },
                //{ field: "Filename", title: "File Name", width: "150px", },
                { field: "ImageUrl", title: "Image Url", width: "100px" }
            ]
        };



        
        $scope.Brand = {};
        $scope.btntextBrand = "Save";

        $scope.ClearFilterData = function () {
            $scope.filterText = "";
            $scope.filterGrid();
            $scope.BrandDescription1 = false;
        }

        //Get Coutry Data into Grid
        //$scope.BrandgridOptions = {
        //    dataSource: {
        //        transport: {
        //            read: function (e) {
        //                
        //                BrandMasterService.GetBrand().success(function (data, status, headers, config) {
        //                    
        //                    if (data != "") {
        //                        //$scope.data = JSON.parse(data);
        //                        e.success(data);
        //                        $scope.dataReset =data;
        //                    }

        //                });
        //            }
        //        },
        //        pageSize: 10,
        //        //serverPaging: true,
        //        // serverSorting: true
        //    },
        //    sortable: true,
        //    pageable: true,
        //    selectable: "row",
        //    columns: [
        //        { field: "SrNo", title: "#", width: "50px" },
        //        { field: "BrandName", title: "Name", width: "150px" },
        //        { field: "Active", title: "Active", width: "150px" },
        //        { field: "SequenceNo", title: "Sequence", width: "150px" }
        //    ]
        //};

        //Save/Update Data Into Grid 
        $scope.SaveBrand = function () {

            var chkValFields = 0;
            if ($scope.Brand.BrandDescription1 == "" || $scope.Brand.BrandDescription1 == undefined) {
                $scope.BrandDescription1 = true;
                chkValFields = 1;
            }

            //if (chkValFields == 1) {
            //    toaster.pop('warning', "warning", "Please re-check the input data and fill correctly");
            //}

            if (chkValFields == 0) {
                $scope.Brand.BrandDescription = $scope.Brand.BrandDescription1;
                $scope.Brand.SequenceNo = $scope.Brand.SequenceNo1;
                $scope.Brand.Active = $scope.Brand.Active1;
                if ($scope.Brand.BrandId) { $scope.Brand.BrandId = $scope.Brand.BrandId; }
                brandService.InsertBrand($scope.Brand).success(function (data, status, headers, config) {
                    $scope.BrandDescription1 = false;
                        $scope.RefreshBrandGrid();
                        $scope.Brand = {};
                  
                });
            }
        }
        //Fill Data into Controll while click on Grid for Update
        $scope.onChange = function (selected, data, dataIteam, angularDataItem) {
            debugger
            $scope.BrandDescription1 = false;
            $scope.Brand.Name = data.BrandDescription;
         
            $scope.Brand.BrandId = data.BrandId;
            $scope.btntextBrand = "Update";
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


        $scope.filterGrid = function () {

            var grid = $scope.gridBrand;
            if ($scope.filterText != "") {
                grid.dataSource.query({
                    page: 1,
                    pageSize: 100,
                    filter: {
                        logic: "or",
                        filters: [
                            { field: "BrandDescription", operator: "contains", value: $scope.filterText }
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


        // clear fields
        $scope.ClearBrandFields = function () {

            $scope.Brand = {};
            $scope.BrandDescription1 = false;
            $scope.btntextBrand = "Save";
        }


        //clear validations
        $scope.ClearValMsgBrandDescription1 = function () {
            $scope.BrandDescription1 = false;
        }


    }]);
