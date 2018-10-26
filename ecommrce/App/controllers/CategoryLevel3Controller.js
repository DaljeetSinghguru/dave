app.controller('CategoryLevel3Controller', ['$scope', '$route','$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $route,$window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {

        debugger



        $window.scrollTo(0, 0);
        var myPassword = "MAKV123456789312";
        var CategoryId = $route.current.params.id;
        $scope.WebsiteDomain = "http://api.davemuslayah.com/";

        $scope.Url = ViewVariablesService.GetBaseAddress();
       // $scope.WebsiteDomain = ViewVariablesService.GetWebsiteDomain();
        $scope.ShowCategoryLevel2list = false;
        $scope.ShowCategoryLevel1list = false;
        $scope.ShowITEMlist = false;

      //  $scope.ItemListDetails = ViewVariablesService.GetDatasendToItemListPage();

       // $scope.ItemListPageCategory = ViewVariablesService.GetDatasendToItemListPageCategory();

       // $scope.ItemListPageCategoryLevel2 = ViewVariablesService.GetDatasendToItemListPageCategoryLevel2();
        $scope.ItemListPageCategoryLevel1 = angular.fromJson($window.sessionStorage.getItem('CategoryId'))
      //  $scope.ItemListPageCategoryLevel1 = $rootScope.ItemDetailDataCategoryWiselevel1;
        $scope.topProductshowonfront = angular.fromJson($window.sessionStorage.getItem('MenuData'))

        $scope.BrandList = angular.fromJson($window.sessionStorage.getItem('BrandData'))

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   

        $scope.dataTreeView = $scope.topProductshowonfront;
        $scope.treeData1 = new kendo.data.HierarchicalDataSource({
            data: $scope.dataTreeView,

        });
        $scope.OpenReleventItemByCategory = function (data) {
            
            $scope.categoryID = (data.Value);
            //pass this category id to database and get all item present in category and display in browser
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + $scope.categoryID + ''
            }).
                success(function (data, status, headers, config) {
                    

                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));
                    if ($location.path() == '/ItemList') {
                        $route.reload();
                    }
                    else {
                        $location.path('ItemList');
                    }

                })
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //show level 1
        if ($scope.ItemListPageCategoryLevel1) {
            // if ($scope.ItemListPageCategoryLevel1.filename != undefined || $scope.ItemListPageCategoryLevel1.filename == null) {
            $scope.ShowCategoryLevel1list = true;
            $scope.ShowCategoryLevel2list = false;
            $scope.ShowCategorylist = false;
            $scope.ShowITEMlist = false;
            //}
        }
        //        show category


        ///show hide box of category and item
        $scope.ShowCategoryLevel1 = function (data) {


            $scope.ItemListPageCategoryLevel2 = data;
            ViewVariablesService.SetDatasendToItemListPageCategoryLevel2(data);
            $window.sessionStorage.setItem('CategoryId', angular.toJson(data));

            $location.path('ItemListCategory2');
        }


        $scope.showgridviewdata = false;
        $scope.showlistviewdata = true;
        $scope.showgridview = function () {
            
            $scope.showgridviewdata = true;
            $scope.showlistviewdata = false;
        }
        $scope.showListview = function () {
            $scope.showlistviewdata = true;
            $scope.showgridviewdata = false;
        }

        $scope.BrandClick = function (brandData) {
            debugger
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByBrand?BrandId=' + brandData.BrandId + ''
            }).
                success(function (data, status, headers, config) {


                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $window.sessionStorage.setItem('ItemListdata', angular.toJson(data));
                    if ($location.path() == '/ItemList') {
                            $route.reload();
                        }
                        else {
                            $location.path('ItemList');
                        }


                }).
                error(function (data, status, headers, config) {
                });
        }


        $scope.loadbrand = function () {
            debugger

            //     1. Newsletter Popup
            //   ---------------------------* /
            setTimeout(function () {
                $('.popup_wrapper').css({
                    "opacity": "1",
                    "visibility": "visible"
                });
                $('.popup_off').on('click', function () {
                    $(".popup_wrapper").fadeOut(500);
                })
            }, 2500);

            /*----------------------------
            2. Mobile Menu Activation
            -----------------------------*/
            jQuery('.mobile-menu nav').meanmenu({
                meanScreenWidth: "991",
            });

            /*----------------------------
            3 Checkout Page Activation
            -----------------------------*/
            $('.categorie-title').on('click', function () {
                $('.vertical-menu-list').slideToggle();
            });

            $('#showlogin').on('click', function () {
                $('#checkout-login').slideToggle();
            });
            $('#showcoupon').on('click', function () {
                $('#checkout_coupon').slideToggle();
            });
            $('#cbox').on('click', function () {
                $('#cbox_info').slideToggle();
            });
            $('#ship-box').on('click', function () {
                $('#ship-box-info').slideToggle();
            });

            /*----------------------------
            4. NivoSlider Activation
            -----------------------------*/
            $('#slider').nivoSlider({
                effect: 'random',
                animSpeed: 300,
                pauseTime: 5000,
                directionNav: false,
                manualAdvance: true,
                controlNavThumbs: false,
                pauseOnHover: true,
                controlNav: true,
                prevText: "<i class='zmdi zmdi-chevron-left'></i>",
                nextText: "<i class='zmdi zmdi-chevron-right'></i>"
            });

            /*----------------------------------------------------
            5. New Products Activation
            -----------------------------------------------------*/
            $('.new-pro-active').owlCarousel({
                loop: false,
                nav: true,
                dots: false,
                smartSpeed: 1000,

                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                margin: 30,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 2
                    },
                    1000: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }

            })
            /*----------------------------------------------------
            6. New Upsell Product Activation
            -----------------------------------------------------*/
            $('.new-upsell-pro').owlCarousel({
                loop: false,
                nav: true,
                dots: false,
                smartSpeed: 1000,

                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                margin: 30,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }

            })

            /*----------------------------------------------------
            7. Side Product Activation
            -----------------------------------------------------*/
            $('.side-product-list-active')
                .on('changed.owl.carousel initialized.owl.carousel', function (event) {

                    $(event.target)
                        .find('.owl-item').removeClass('last')
                        .eq(event.item.index + event.page.size - 1).addClass('last');
                }).owlCarousel({
                    loop: false,
                    nav: true,
                    dots: false,
                    smartSpeed: 1500,
                    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                    margin: 1,
                    responsive: {
                        0: {
                            items: 1,
                            autoplay: true
                        },
                        480: {
                            items: 2
                        },
                        768: {
                            items: 2
                        },
                        991: {
                            items: 1
                        }
                    }
                })

            /*----------------------------------------------------
            8. Best Seller Activation
            -----------------------------------------------------*/
            $('.best-seller-pro-active')
                .on('changed.owl.carousel initialized.owl.carousel', function (event) {
                    debugger
                    $(event.target)
                        .find('.owl-item').removeClass('last')
                        .eq(event.item.index + event.page.size - 1).addClass('last');
                }).owlCarousel({
                    loop: false,
                    nav: true,
                    dots: false,
                    smartSpeed: 1200,
                    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                    margin: 1,
                    responsive: {
                        0: {
                            items: 1,
                            autoplay: true
                        },
                        480: {
                            items: 2
                        },
                        768: {
                            items: 2
                        },
                        992: {
                            items: 3
                        },
                        1200: {
                            items: 4
                        }
                    }
                })

            /*----------------------------------------------------
            9. Hand Tool Activation
            -----------------------------------------------------*/
            $('.hand-tool-active').owlCarousel({

                loop: false,
                nav: true,
                dots: false,
                smartSpeed: 1200,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                margin: 30,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }
            })
            /*----------------------------------------------------
            10. Brand Banner Activation
            -----------------------------------------------------*/
            $('.brand-banner').on('changed.owl.carousel initialized.owl.carousel', function (event) {
                debugger
                $(event.target)

                    .find('.owl-item').removeClass('last')
                    .eq(event.item.index + event.page.size - 1).addClass('last');

                $(event.target)
                    .find('.owl-item').removeClass('first')
                    .eq(event.item.index).addClass('first')


            }).owlCarousel({
                loop: false,
                nav: false,
                dots: false,
                smartSpeed: 1200,
                margin: 1,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    480: {
                        items: 3
                    },
                    768: {
                        items: 4
                    },
                    1000: {
                        items: 5
                    }
                }
            })

            /*----------------------------------------------------
            11. Blog Activation
            -----------------------------------------------------*/
            $('.blog-active').owlCarousel({
                loop: false,
                nav: true,
                dots: false,
                smartSpeed: 1000,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                margin: 30,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    768: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            })
            /*----------------------------------------------------
            12. Blog two Activation
            -----------------------------------------------------*/
            $('.blog-active2').owlCarousel({
                loop: false,
                nav: true,
                dots: false,
                smartSpeed: 1000,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                margin: 30,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    768: {
                        items: 2
                    },
                    1000: {
                        items: 2
                    }
                }
            })
            /*----------------------------
            13. WOW Js Activation
            -----------------------------*/
            new WOW().init();

            /*----------------------------
            14. ScrollUp Activation
            -----------------------------*/
            $.scrollUp({
                scrollName: 'scrollUp', // Element ID
                topDistance: '550', // Distance from top before showing element (px)
                topSpeed: 1000, // Speed back to top (ms)
                animation: 'fade', // Fade, slide, none
                scrollSpeed: 900,
                animationInSpeed: 1000, // Animation in speed (ms)
                animationOutSpeed: 1000, // Animation out speed (ms)
                scrollText: '<i class="fa fa-angle-up"></i>', // Text for element
                activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
            });

            /*----------------------------
            15. Sticky-Menu Activation
            ------------------------------ */
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 150) {
                    $('.header-sticky').addClass("sticky");
                } else {
                    $('.header-sticky').removeClass("sticky");
                }
            });

            /*----------------------------
            16. Price Slider Activation
            -----------------------------*/
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 80,
                values: [0, 74],
                slide: function (event, ui) {
                    $("#amount").val("$" + ui.values[0] + "  $" + ui.values[1]);
                }
            });
            $("#amount").val("$" + $("#slider-range").slider("values", 0) +
                "  $" + $("#slider-range").slider("values", 1));

            /*--------------------------------
            17. Testimonial Slick Carousel
            -----------------------------------*/
            $('.testext_active').owlCarousel({
                loop: false,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                margin: 15,
                smartSpeed: 1000,
                nav: true,
                dots: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            })

            /*----------------------------------------------------
            18. Best Seller Activation
            -----------------------------------------------------*/
            $('.best-seller-pro').on('changed.owl.carousel initialized.owl.carousel', function (event) {
                $(event.target)
                    .find('.owl-item').removeClass('last')
                    .eq(event.item.index + event.page.size - 1).addClass('last');
            }).owlCarousel({
                loop: false,
                nav: true,
                dots: false,
                smartSpeed: 1000,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                margin: 0,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 2
                    },
                    1000: {
                        items: 1
                    }
                }
            })
            /*----------------------------------------------------
            19. Best Product Activation
            -----------------------------------------------------*/
            $('.best-seller-pro-two')
                .owlCarousel({
                    loop: false,
                    nav: false,
                    dots: false,
                    smartSpeed: 1200,
                    margin: 0,
                    responsive: {
                        0: {
                            items: 1,
                            autoplay: true
                        },
                        768: {
                            items: 3
                        },
                        1000: {
                            items: 1
                        }
                    }
                })

            /*-------------------------------------
            20. Blog Realted Post activation
            --------------------------------------*/
            $('.blog-related-post-active').owlCarousel({
                loop: false,
                margin: 30,
                smartSpeed: 1000,
                nav: false,
                dots: false,
                items: 2,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    480: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        margin: 29,
                        items: 2
                    },
                    1200: {
                        items: 2
                    }
                }
            })

            /*----------------------------------------------------
            21.Best Seller  Unique Activation
            -----------------------------------------------------*/
            $('.best-seller-unique').on('changed.owl.carousel initialized.owl.carousel', function (event) {
                $(event.target)
                    .find('.owl-item').removeClass('last')
                    .eq(event.item.index + event.page.size - 1).addClass('last');
            }).owlCarousel({
                loop: false,
                nav: true,
                dots: false,
                smartSpeed: 1000,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                margin: 0,
                responsive: {
                    0: {
                        items: 1,
                        autoplay: true
                    },
                    768: {
                        items: 2
                    },
                    1000: {
                        items: 1
                    }
                }
            })

        }

        setTimeout(function () {
            $scope.loadbrand();
        }, 3500);

    }]);