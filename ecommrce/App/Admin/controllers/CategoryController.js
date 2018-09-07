app.controller('CategoryController', ['$scope', '$http','$modal', 'CategoryMasterService', '$anchorScroll', 
    function ($scope, $http, $modal, CategoryMasterService, $anchorScroll) {

        CategoryMasterService.GetCategorywithSubcategoryData().success(function (data, status, headers, config) {

            if (data != "") {
                $scope.dataTreeView = data;
                $scope.treeData = new kendo.data.HierarchicalDataSource({
                    data: $scope.dataTreeView,

                });
            }
        });
        $scope.$watchCollection('data', function (newData) {
            if ($scope.treeData) {
                $scope.treeData.data = newData;
            }});
        $scope.treeData = new kendo.data.HierarchicalDataSource({
            data: $scope.dataTreeView,
            
        });

        $scope.click = function (dataItem) {
            alert(dataItem.Value);
        };

        function makeItem() {
            var txt = kendo.toString(new Date(), "HH:mm:ss");
            var value = "20";
            return { text: txt, Value: value };
        };

        $scope.addAfter = function (item) {
            debugger
            $scope.IsParentMenuId = item.ParentMenuId;
            //var array = item.parent();
            //var index = array.indexOf(item);
            //var newItem = makeItem();
            //array.splice(index + 1, 0, newItem);
            $scope.Category = {};
            $scope.modalInstanceaddAfter = $modal.open({
                scope: $scope,
                templateUrl: 'App/Admin/views/Addcategory.html',
                size: "lg",

            });
        };

        $scope.addBelow = function (selectedItem) {
            debugger

            $scope.IsParentMenuId = selectedItem.Value;
            $scope.Category = {};
            //var newItem = makeItem();
            //$scope.tree.append(newItem, $scope.tree.select());
            $scope.modalInstanceaddAfter = $modal.open({
                scope: $scope,
                templateUrl: 'App/Admin/views/Addcategory.html',
                size: "lg",

            });
        };

        $scope.remove = function (item) {
            debugger

            
            CategoryMasterService.DeleteCategory(item.Value)
                .success(function (data, status, headers, config) {
                    debugger
                    if (data != "") {
                        CategoryMasterService.GetCategorywithSubcategoryData().success(function (data, status, headers, config) {

                            if (data != "") {
                                $scope.dataTreeView = data;
                                $scope.treeData = new kendo.data.HierarchicalDataSource({
                                    data: $scope.dataTreeView,

                                });
                            }

                        });
                    }
                })

            //var array = item.parent();
            //var index = array.indexOf(item);
            //array.splice(index, 1);

            //$scope.selectedItem = undefined;
        };

        $scope.SaveCategoryModal = function () {
            
            CategoryMasterService.SaveCategory($scope.FileOfferletterUpload, $scope.Category.CategoryName, $scope.IsParentMenuId, $scope.Category.Active1).success(function (data, status, headers, config) {
                
                if (data != "") {
                    CategoryMasterService.GetCategorywithSubcategoryData().success(function (data, status, headers, config) {

                        if (data != "") {
                            $scope.dataTreeView = data;
                            $scope.treeData = new kendo.data.HierarchicalDataSource({
                                data: $scope.dataTreeView,

                            });
                        }
                        if ($scope.modalInstanceaddAfter) {
                            $scope.modalInstanceaddAfter.dismiss('cancel');
                        }
                    });
                }
            });
        }

        $scope.CancelModal = function () {
            if ($scope.modalInstanceaddAfter) {
                $scope.modalInstanceaddAfter.dismiss('cancel');
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



        }



        //$anchorScroll();
        //$('input').keypress(function (event) {
        //    if (event.keyCode == 13) {
        //        event.preventDefault();
        //    }
        //});
        
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

//        $scope.ClearFilterData = function () {
//            $scope.filterText = "";
//            $scope.filterGrid();
//            $scope.CategoryDescription1 = false;
//        }

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
                { field: "Value", title: "ParentCategoryId", width: "150px" },
               // { field: "MetaDescription", title: "MetaDescription", width: "150px" },
               // { field: "SearchKeyword", title: "SearchKeyword", width: "150px" },
                //{ field: "Active", title: "Active", width: "150px" },
               // { field: "SequenceNo", title: "Sequence", width: "150px" }
            ]
        };

//        //Save/Update Data Into Grid 
//        $scope.SaveCategory = function () {

//            var chkValFields = 0;
//            if ($scope.Category.CategoryDescription1 == "" || $scope.Category.CategoryDescription1 == undefined) {
//                $scope.CategoryDescription1 = true;
//                chkValFields = 1;
//            }

//            //if (chkValFields == 1) {
//            //    toaster.pop('warning', "warning", "Please re-check the input data and fill correctly");
//            //}

//            if (chkValFields == 0) {
//                $scope.Category.CategoryName = $scope.Category.CategoryDescription1;
//                $scope.Category.SearchKeyword = $scope.Category.SearchKeyword1;
//                $scope.Category.MetaDescription = $scope.Category.MetaDescription1;
//                $scope.Category.SequenceNo = $scope.Category.SequenceNo1;
//                $scope.Category.Active = $scope.Category.Active1;
               
//if( $scope.btntextCategory=="Save")
//{
//                CategoryMasterService.InsertCategory($scope.Category).success(function (data, status, headers, config) {
//                    $scope.CategoryDescription1 = false;
//                        $scope.RefreshCategoryGrid();
//                        $scope.Category = {};
//                });
//            }
// }  

//if( $scope.btntextCategory=="Update"){
//      CategoryMasterService.UpdateCategory($scope.Category).success(function (data, status, headers, config) {
//                    $scope.CategoryDescription1 = false;
//                        $scope.RefreshCategoryGrid();
//                        $scope.Category = {};
//$scope.btntextCategory="Save"
//                });
//}
//   }
//        //Fill Data into Controll while click on Grid for Update
//        $scope.onChangeCategoryGrid = function (selected, data, dataIteam, angularDataItem) {
//            $scope.CategoryDescription1 = false;
//            $scope.Category.CategoryDescription1 = data.CategoryName;
//            debugger
//            $scope.Category.SearchKeyword1 = data.SearchKeyword;
//            $scope.Category.MetaDescription1 = data.MetaDescription;
//            if (data.Active == "True") {
//                $scope.Category.Active1 = true;
//            }
//            else { $scope.Category.Active1 = false; }
            
//            $scope.Category.CategoryId = data.CategoryId;
//            $scope.btntextCategory = "Update";
//        }
//        ///REFRESH GRID 
//        $scope.RefreshCategoryGrid = function () {
//            $scope.CategoryGridRebind = new kendo.data.DataSource({
//                transport: {
//                    read: {
//                        function(e) {

//                        }
//                    }
//                },
//            });
//        }


//        $scope.filterGrid = function () {

//            var grid = $scope.gridCategory;
//            if ($scope.filterText != "") {
//                grid.dataSource.query({
//                    page: 1,
//                    pageSize: 100,
//                    filter: {
//                        logic: "or",
//                        filters: [
//                            { field: "CategoryDescription", operator: "contains", value: $scope.filterText }
//                        ]
//                    }
//                });
//            }
//            else {
//                grid.dataSource.query({
//                    page: 1,
//                    pageSize: 10,
//                });
//            }
//        };


//        // clear fields
//        $scope.ClearCategoryFields = function () {

//            $scope.Category = {};
//            $scope.CategoryDescription1 = false;
//            $scope.btntextCategory = "Save";
//        }


//        //clear validations
//        $scope.ClearValMsgCategoryDescription1 = function () {
//            $scope.CategoryDescription1 = false;
//        }


    }]);
