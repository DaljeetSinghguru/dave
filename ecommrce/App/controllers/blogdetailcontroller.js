app.controller('blogdetailcontroller', ['$scope', '$window', '$location', '$route', '$http', '$sce','$rootScope',
    function ($scope, $window, $location, $route, $http, $sce, $rootScope ) {

        var blogId = $route.current.params.id;
        $scope.blogId = blogId;
        $scope.shownamemandatory = false;
        $scope.showemailmandatory = false;
        $scope.showwebsitemandatory = false;
        $scope.showsubjectmandatory = false;
        $scope.showmessagemandatory = false;

        $http({
            method: 'GET', url: $scope.Url + 'Blog/GetSingleBlogData?Id=4'// +blogId+''
        }).
            success(function (data, status, headers, config) {
                debugger
                $scope.SinlgeBlogData = data;
                $scope.Description = $sce.trustAsHtml($scope.SinlgeBlogData[0].Description);
                $scope.Date = $scope.SinlgeBlogData[0].Date;
                $scope.ImageUrl = $scope.SinlgeBlogData[0].ImageUrl;
                $scope.Header = $scope.SinlgeBlogData[0].Header;
            }).
            error(function (data, status, headers, config) {
            });
        $http({
            method: 'GET', url: $scope.Url + 'Blog/getcommentdetailuserwise?blogId=4'// +blogId+''
        }).
            success(function (data, status, headers, config) {
                debugger
                $scope.BlogCommentData = data;
               
            }).
            error(function (data, status, headers, config) {
            });


        //$scope.textModel = "";

        //$scope.$watch(function () {
        //    return $scope.textModel;
        //},
        //    function (newValue, oldValue) {

        //        if (newValue == oldValue) { return; }

        //        console.log(newValue);

        //        $scope.textModel = newValue;
        //    }, true);

        $scope.sendcomment = function () {

            ////check login or not
            debugger
            $scope.Logincredential = localStorage != null ? localStorage["credential"] : null;
            if ($scope.Logincredential) {
                $rootScope.DisplayUserName = JSON.parse($scope.Logincredential).username;
                if ($rootScope.DisplayUserName != null || $rootScope.DisplayUserName != undefined || $rootScope.DisplayUserName != "") {
                    $rootScope.showloginbutton = false;

                    //user is login 
                    var chkValFields = 0;
                    $scope.shownamemandatory = false;
                    $scope.showemailmandatory = false;
                    $scope.showwebsitemandatory = false;
                    $scope.showsubjectmandatory = false;
                    $scope.showmessagemandatory = false;
                    if ($scope.blogdata.name == "" || $scope.blogdata.name == undefined) {
                        $scope.shownamemandatory = true;
                        chkValFields = 1;
                    }
                    if ($scope.blogdata.email == "" || $scope.blogdata.email == undefined) {
                        $scope.showemailmandatory = true;
                        chkValFields = 1;
                    }
                    if ($scope.blogdata.website == "" || $scope.blogdata.website == undefined) {
                        $scope.showwebsitemandatory = true;
                        chkValFields = 1;
                    }
                    if ($scope.blogdata.subject == "" || $scope.blogdata.subject == undefined) {
                        $scope.showsubjectmandatory = true;
                        chkValFields = 1;
                    }
                    if ($scope.blogdata.Comment == "" || $scope.blogdata.Comment == undefined) {
                        $scope.showmessagemandatory = true;
                        chkValFields = 1;
                    }


                    if (chkValFields == 0) {
                        $scope.blogdata.useremailid = $rootScope.DisplayUserName;
                        $scope.blogdata.blogid = $scope.blogId;
                        $http({ method: 'POST', url: $scope.Url + 'Blog/InsertSendComment/', data: $scope.blogdata }).
                            success(function (data, status, headers, config) {

                                debugger
                                window.location.replace('index.html#/Default');
                            }).
                            error(function (data, status, headers, config) {
                            });
                    }
                }
                
            } else {
                $rootScope.showloginbutton = true;
                alert("Please Login First. Thanks");
                //user is logout
                window.location.replace('index.html#/Login');
            }



          
           
        }
    }])



