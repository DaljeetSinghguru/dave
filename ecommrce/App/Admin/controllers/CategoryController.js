app.controller('CategoryController', ['$scope', '$http', 'CategoryMasterService', '$anchorScroll', 
    function ($scope, $http, CategoryMasterService, $anchorScroll) {
        
        $anchorScroll();
        $('input').keypress(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
        
        //$scope.abc = function () {

        //    return fetch("https://worldfree4u.ws/url/decode/td6173990/0").then(function (res) {
        //        return res.text();
        //    }).then(function (html) {
        //        console.log(`html = ${html}`);
        //    });
        //}
        //$scope.abc();

        $scope.Category = {};
        $scope.btntextCategory = "Save";

        $scope.ClearFilterData = function () {
            $scope.filterText = "";
            $scope.filterGrid();
            $scope.CategoryDescription1 = false;
        }

        //Get Coutry Data into Grid
        $scope.CategorygridOptions = {
            dataSource: {
                transport: {
                    read: function (e) {
                        
                        CategoryMasterService.GetCategoryGridData().success(function (data, status, headers, config) {
                            
                            if (data != "") {
                                //$scope.data = JSON.parse(data);
                                e.success(data);
                                $scope.dataReset =data;
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
                { field: "CategoryName", title: "Name", width: "150px" },
               // { field: "Active", title: "Active", width: "150px" },
               // { field: "SequenceNo", title: "Sequence", width: "150px" }
            ]
        };

        //Save/Update Data Into Grid 
        $scope.SaveCategory = function () {

            var chkValFields = 0;
            if ($scope.Category.CategoryDescription1 == "" || $scope.Category.CategoryDescription1 == undefined) {
                $scope.CategoryDescription1 = true;
                chkValFields = 1;
            }

            //if (chkValFields == 1) {
            //    toaster.pop('warning', "warning", "Please re-check the input data and fill correctly");
            //}

            if (chkValFields == 0) {
                $scope.Category.CategoryName = $scope.Category.CategoryDescription1;
                //$scope.Category.SequenceNo = $scope.Category.SequenceNo1;
                //$scope.Category.Active = $scope.Category.Active1;
               
if( $scope.btntextCategory=="Save")
{
                CategoryMasterService.InsertCategory($scope.Category).success(function (data, status, headers, config) {
                    $scope.CategoryDescription1 = false;
                        $scope.RefreshCategoryGrid();
                        $scope.Category = {};
                });
            }
 }  

if( $scope.btntextCategory=="Update"){
      CategoryMasterService.UpdateCategory($scope.Category).success(function (data, status, headers, config) {
                    $scope.CategoryDescription1 = false;
                        $scope.RefreshCategoryGrid();
                        $scope.Category = {};
$scope.btntextCategory="Save"
                });
}
   }
        //Fill Data into Controll while click on Grid for Update
        $scope.onChangeCategoryGrid = function (selected, data, dataIteam, angularDataItem) {
            $scope.CategoryDescription1 = false;
            $scope.Category.CategoryDescription1 = data.CategoryName;
            //$scope.Category.SequenceNo1 = data.SequenceNo;
            //$scope.Category.Active1 = data.Active;
            $scope.Category.CategoryId = data.CategoryId;
            $scope.btntextCategory = "Update";
        }
        ///REFRESH GRID 
        $scope.RefreshCategoryGrid = function () {
            $scope.CategoryGridRebind = new kendo.data.DataSource({
                transport: {
                    read: {
                        function(e) {

                        }
                    }
                },
            });
        }


        $scope.filterGrid = function () {

            var grid = $scope.gridCategory;
            if ($scope.filterText != "") {
                grid.dataSource.query({
                    page: 1,
                    pageSize: 100,
                    filter: {
                        logic: "or",
                        filters: [
                            { field: "CategoryDescription", operator: "contains", value: $scope.filterText }
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
        $scope.ClearCategoryFields = function () {

            $scope.Category = {};
            $scope.CategoryDescription1 = false;
            $scope.btntextCategory = "Save";
        }


        //clear validations
        $scope.ClearValMsgCategoryDescription1 = function () {
            $scope.CategoryDescription1 = false;
        }


    }]);
