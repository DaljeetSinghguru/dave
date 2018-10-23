app.controller('DefaultController', ['$scope', '$window', '$location', '$modal', '$rootScope', '$http', 'ViewVariablesService', '$translate', '$location',
    function ($scope, $window, $location, $modal, $rootScope, $http, ViewVariablesService, $translate, $location) {
        debugger



        $scope.activeTab = '1';

        $scope.showTab1 = function () {
            $scope.activeTab = '1';
        }
        $scope.showTab2 = function () {
            $scope.activeTab = '2';
        }
        $scope.showTab3 = function () {
            $scope.activeTab = '3';
        }




        $scope.quantity = "1";
        $scope.check = function () {
            $location.path('Product');
        }
        $scope.Logincredential = localStorage != null ? localStorage["credential"] : null;
        if ($scope.Logincredential) {
            $rootScope.DisplayUserName = JSON.parse($scope.Logincredential).UserName;
            if ($rootScope.DisplayUserName != null || $rootScope.DisplayUserName != undefined || $rootScope.DisplayUserName != "") {
                $rootScope.showloginbutton = false;
            }
            else {
                $rootScope.showloginbutton = true;

            }
        }
        setTimeout(function () {
            debugger
            $scope.BrandList = ViewVariablesService.GetBrandData();
            $scope.ItemListBestSellerProduct = ViewVariablesService.GetItemListBestSellerProduct();
            $scope.ItemListHotSalesProduct = ViewVariablesService.GetItemListHotDealsProduct();
            $scope.ItemListFeaturedProduct = ViewVariablesService.GetItemListFeaturedProduct();
            $scope.ItemListTopProductsProduct = ViewVariablesService.GetItemListTopProductsProduct();
            $scope.ItemListNewArrivalsProduct = ViewVariablesService.GetItemListNewArrivalsProduct();
        }, 3500);


        ///////on main banner click show item by brand 
        $scope.CategoryFirstClick = function () {
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByBrand?BrandId=1'
            }).
                success(function (data, status, headers, config) {


                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $location.path('ItemList');

                }).
                error(function (data, status, headers, config) {
                });
        }
        $scope.CategorysecondClick = function () {
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByBrand?BrandId=2'
            }).
                success(function (data, status, headers, config) {


                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $location.path('ItemList');

                }).
                error(function (data, status, headers, config) {
                });
        }


        $scope.ShowItemDetail = function (ItemData) {

            $scope.SingleItemData = ItemData;
            debugger
            ViewVariablesService.SetSingleItemData($scope.SingleItemData);



            var vm = $scope.jobOfferSearchViewModel;
            var path = "/ItemDetail/" + ItemData.ItemStockCode;
            $location.path(path);



            //$location.path('ItemDetail/:' + ItemData.ItemStockCode);

            //  $scope.$parent.addTab(data.ExhibitorName, "suppliersearchresults:" + data.ExhibitorSupplierId);
        }
        $http({
            method: 'GET', url: $scope.Url + 'Category/Category_Get370'
        }).
            success(function (data, status, headers, config) {

                $scope.topProductshowonfront = data;

            }).
            error(function (data, status, headers, config) {
            });

        $http({
            method: 'GET', url: $scope.Url + 'Category/Category_Get570'
        }).
            success(function (data, status, headers, config) {

                $scope.topProductshowonfront570 = data;

            }).
            error(function (data, status, headers, config) {
            });
        $http({
            method: 'GET', url: $scope.Url + 'Category/Category_Get870'
        }).
            success(function (data, status, headers, config) {

                $scope.topProductshowonfront870 = data;

            }).
            error(function (data, status, headers, config) {
            });
        $http({
            method: 'GET', url: $scope.Url + 'Category/GetHotSaleItem'
        }).
            success(function (data, status, headers, config) {

                $scope.topHotSaleItem = data;


            }).
            error(function (data, status, headers, config) {
            });


        $scope.CategoryClick = function (categorydata) {


            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByCategory?CategoryId=' + categorydata.CategoryId + ''
            }).
                success(function (data, status, headers, config) {


                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $location.path('ItemList');

                }).
                error(function (data, status, headers, config) {
                });
        }


        $scope.ItemClick = function (data) {
            debugger
            $scope.SingleItemData = data;
            ViewVariablesService.SetSingleItemData($scope.SingleItemData);
            $location.path('ItemDetail');
        }



        $scope.BrandClick = function (brandData) {
            debugger
            $http({
                method: 'GET', url: $scope.Url + 'Category/GetItemByBrand?BrandId=' + brandData.BrandId + ''
            }).
                success(function (data, status, headers, config) {


                    $scope.ItemListDetails = data;
                    ViewVariablesService.SetDatasendToItemListPage(data);
                    $location.path('ItemList');

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