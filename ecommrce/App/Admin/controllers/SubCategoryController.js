app.controller('SubCategoryController', ['$scope', '$http', 'SubCategoryMasterService','CategoryMasterService', '$anchorScroll',
    function ($scope, $http, SubCategoryMasterService, CategoryMasterService,$anchorScroll) {
        
        $anchorScroll();
        $('input').keypress(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });






        $scope.Categorydata = [];
        $scope.BindPermanentCategory = function () {
            $scope.PerCategorydata = [];
            CategoryMasterService.GetCategory()
                .success(function (results) {
                    $scope.Categorydata = [];
                    $scope.PerCategorydata = results;
                    for (var i = 0; i < $scope.PerCategorydata.length; i++) {
                        $scope.Categorydata.push({ "Name": $scope.PerCategorydata[i].CategoryName, "Id": $scope.PerCategorydata[i].CategoryId });//    
                    }
                },
                function (errorPayload) {
                });
        }
        $scope.BindPermanentCategory();
        $scope.CategoryOptions = {
            change: function (e) {
                $scope.PermanentCategoryId = e.sender._old;
            $scope.SubCategoryCategory = false;
            },
            select: function () {
            }
        }



        //$scope.abc = function () {

        //    return fetch("https://worldfree4u.ws/url/decode/td6173990/0").then(function (res) {
        //        return res.text();
        //    }).then(function (html) {
        //        console.log(`html = ${html}`);
        //    });
        //}
        //$scope.abc();

        $scope.SubCategory = {};
        $scope.btntextSubCategory = "Save";

        $scope.ClearFilterData = function () {
            $scope.filterText = "";
            $scope.filterGrid();
            $scope.SubCategoryDescription1 = false;
        }

        //Get Coutry Data into Grid
        $scope.SubCategorygridOptions = {
            dataSource: {
                transport: {
                    read: function (e) {
                        
                        SubCategoryMasterService.GetSubCategory().success(function (data, status, headers, config) {
                            
                            if (data != "") {
                                //$scope.data = JSON.parse(data);
                                e.success(data);
                                $scope.dataReset = data;
                            }

                        });
                    }
                },
                pageSize: 10,
                //serverPaging: true,
                // serverSorting: true
            },
            sortable: true,
            pageable: true,
            selectable: "row",
            columns: [
                { field: "RowId", title: "#", width: "50px" },
                { field: "Category", title: "Category Name", width: "150px" },
                { field: "SubCategoryName", title: "Sub Category Name", width: "150px" },
               // { field: "Active", title: "Active", width: "150px" },
                
            ]
        };

        //Save/Update Data Into Grid 
        $scope.SaveSubCategory = function () {
            
            var chkValFields = 0;
            if ($scope.SubCategory.SubCategoryDescription1 == "" || $scope.SubCategory.SubCategoryDescription1 == undefined) {
                $scope.SubCategoryDescription1 = true;
                chkValFields = 1;
            }
                 if ($scope.SubCategory.Category == "" || $scope.SubCategory.Category == undefined) {
                $scope.SubCategoryCategory = true;
                chkValFields = 1;
            }
            //if (chkValFields == 1) {
            //    toaster.pop('warning', "warning", "Please re-check the input data and fill correctly");
            //}

            if (chkValFields == 0) {
                $scope.SubCategory.SubCategoryDescription = $scope.SubCategory.SubCategoryDescription1;
              //  $scope.SubCategory.SequenceNo = $scope.SubCategory.SequenceNo1;
              //  $scope.SubCategory.Active = $scope.SubCategory.Active1;
                if ($scope.SubCategory.Category) { $scope.SubCategory.Category = $scope.SubCategory.Category.Id; }


            if( $scope.btntextSubCategory == "Save"){
                SubCategoryMasterService.InsertSubCategory($scope.SubCategory).success(function (data, status, headers, config) {
                    $scope.SubCategoryDescription1 = false;
                        $scope.RefreshSubCategoryGrid();
                        $scope.SubCategory = {};
                 
                });}
            if($scope.btntextSubCategory == "Update"){
           SubCategoryMasterService.UpdateSubCategory($scope.SubCategory).success(function (data, status, headers, config) {
                    $scope.SubCategoryDescription1 = false;
                        $scope.RefreshSubCategoryGrid();
                        $scope.SubCategory = {};
 $scope.btntextSubCategory = "Save";
                 
                });
}
            }
        }
        //Fill Data into Controll while click on Grid for Update
        $scope.onChangeSubCategoryGrid = function (selected, data, dataIteam, angularDataItem) {


            $scope.SubCategoryDescription1 = false;
            $scope.SubCategory.SubCategoryDescription1 = data.SubCategoryName;
            //$scope.SubCategory.SequenceNo1 = data.SequenceNo;
           // $scope.SubCategory.Active1 = data.Active;
            $scope.SubCategory.SubCategoryId = data.SubCategoryId;
          $scope.SubCategory.CategoryId = data.CategoryId;
            $scope.SubCategory.Category = { "Name":data.Category, "Id": data.CategoryId };
            $scope.btntextSubCategory = "Update";
        }
        ///REFRESH GRID 
        $scope.RefreshSubCategoryGrid = function () {
            $scope.SubCategoryGridRebind = new kendo.data.DataSource({
                transport: {
                    read: {
                        function(e) {

                        }
                    }
                },
            });
        }


        $scope.filterGrid = function () {

            var grid = $scope.gridSubCategory;
            if ($scope.filterText != "") {
                grid.dataSource.query({
                    page: 1,
                    pageSize: 100,
                    filter: {
                        logic: "or",
                        filters: [
                            { field: "SubCategoryDescription", operator: "contains", value: $scope.filterText }
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
        $scope.ClearSubCategoryFields = function () {

            $scope.SubCategory = {};
            $scope.SubCategoryDescription1 = false;
            $scope.btntextSubCategory = "Save";
        }


        //clear validations
        $scope.ClearValMsgSubCategoryDescription1 = function () {
            $scope.SubCategoryDescription1 = false;
        }


    }]);
