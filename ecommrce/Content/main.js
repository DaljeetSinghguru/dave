/* jQuery Script Goes Here */

$(document).ready(function() { //if the DOM is ready

	/* Main Navigation */

	var selected_animation = 'animation-hingeTop'; //default animation value, change to fit your needs;
	var window_width = report_window_width();
	var timer;
	var speed = 120;

	var is_clicked = true;

	/* Tab Navigation */

	$(document).on('click', '.tab-menu .tab-marker li', function() { 

		var _this = $(this);
		var input_id = _this.children('input').attr('id');
		var tab_content = _this.parents('.tab-menu').siblings('tr').find("td." + input_id); //find td that matches the input id
		
		tab_content.siblings('td').hide(); 
		tab_content.show();
		

	});

	/* Tab Navigation Book Menu (mega-menu-9) */

	$(document).on('change', '#book-category', function () {

		_this = $(this);

		var category_value = _this.val();
		var tab_content = _this.parents('.tab-menu').siblings('tr').find("td." + category_value);
		var tab_marker_radio = _this.siblings('.tab-marker').find('li').children('input');

		tab_content.siblings('td').hide();
		tab_content.show();

		$.each(tab_marker_radio, function(index, element) {

			if ($(element).hasClass(category_value)) {

				$(element).prop('checked', true);

			} else {

				$(element).prop('checked', false);

			}

		});

		
	});

	/* Home Menu Hover */

	$(document).on('mouseover', '.home-menu li', function() { //this is the home-menu (Phones, Tablets etc.)

		var _this = $(this); //just defined a _this variable, so that no more objects are created
		var data_attribute = _this.attr('data-menu'); // get the 'data-menu' attribute of each li on .home-menu

	 	_this.addClass('is-active').siblings('li').removeAttr('class'); //add class 'is-active' onmouseover
	 	_this.parents('.home-menu').siblings('.side-menu-wide').removeClass('is-active'); //remove is-active class on all side-menu-wide
	 	_this.parents('.home-menu').siblings(".side-menu-wide" + "." + data_attribute).addClass('is-active'); //add is-active from data-menu attributes

	});

	/* Add animation class sub-menus */

	$(document).on('mouseover', '.main-nav > li', function() { //change sub-menu-1 animation here

		var _this = $(this);
		load_animation(_this, selected_animation); //plug animation values here

	});

	/* Add and remove animation-swivel class, mega-menu-6 */

	$(document).on({

		mouseenter: function() {

			var _this = $(this);
			var swivel_lists = _this.find('.swivel-lists > li');

			swivel_lists.removeAttr('class');

			clearTimeout(timer);
			
			$.each(swivel_lists, function(index, element) {

				timer = setTimeout(function() {

					$(element).addClass('animation-swivel').fadeIn(500);

				}, (index * 111));

			});

		},

		mouseleave: function() {

			clearTimeout(timer);

			$('.swivel-lists > li').hide().removeAttr('class');
			
		}


	}, ".main-nav.main-nav-swivel.trigger-hover > li");


	$(document).on({

		click: function() {

			var _this = $(this);
			var swivel_lists = _this.find('.swivel-lists > li');

			swivel_lists.removeAttr('class');

			clearTimeout(timer);
			
			$.each(swivel_lists, function(index, element) {

				timer = setTimeout(function() {

					$(element).addClass('animation-swivel').fadeIn(500);

				}, (index * 111));

			});

		}, 

		mouseleave: function() {

			clearTimeout(timer);

			$('.swivel-lists > li').removeAttr('class');
			
		}

	}, ".main-nav.main-nav-swivel.trigger-click > li");

	/* trigger-hover on mobile */

	$(document).on('click', '.main-nav.trigger-hover > li > a', function() {

		var _this = $(this);
		var parent_li = _this.parent('li');

		window_width = report_window_width();

		if (window_width < 965) {

			parent_li.toggleClass('is-not-active');

		}
		
	});

	/* trigger-click */

	$(document).on('click', '.main-nav.trigger-click > li > a', function() {

		var _this = $(this);
		var parent_li = _this.parent('li');

		parent_li.toggleClass('is-click-active');
		parent_li.siblings('li').removeClass('is-click-active');
		
	});

	/* trigger-click, outside #navigation */

	$(document).on('click', 'html', function(event) {

		if ($(event.target).closest('#navigation').length === 0) {

			$('body .trigger-click > li').removeClass('is-click-active');

		} 

	});

	/* on window resize */

	$(window).on('resize', function() {

		window_width = report_window_width();

		if (window_width <= 965) {

			$('#book-category').prop('selectedIndex', 0);
			
		} else {

			$('.main-nav > li:gt(0)').show();

		}

	});

	$(document).on('click', '#menu', function() { //for showing first menu only (#menu)

		var _this = $(this);

		_this.parent('.main-nav').toggleClass('main-nav-first-only');

			$.each(_this.siblings(), function(index, element) {

				$(element).removeAttr('style');
				removeClassRegEx($(element), /^animation-/);

				setTimeout(function() {

					$(element).addClass('animation-zoomIn').fadeIn();

				}, (index * 60));

			});

		
	});

	/* Settings Menu */

	$('#select-animation').on('change', function() {

		var _this = $(this);
		selected_animation = _this.val();
		load_animation(_this, selected_animation);

	});

	$('#select-mega-menu').on('change', function() {

		var _this = $(this);
		selected_mega_menu = _this.val();

		if (selected_mega_menu === "mega-menu-6") {

			$('#select-animation').prop('disabled', true).css('background','gray');

		} else {

			$('#select-animation').prop('disabled', false).css('background','white');

		}

		$('#navigation').load("ajax/" + selected_mega_menu + ".html");

		$('#mega-menu-changer').find('select').not(_this).prop('selectedIndex', 0);

	});

	$('#select-responsiveness').on('change', function() {

		var _this = $(this);
		responsiveness_value = _this.val();

		if (responsiveness_value == 'cover') {

			$('.main-nav').removeClass('uncover');

		} else {

			$('.main-nav').addClass('uncover'); // add class 'uncover' to class 'main-nav' to change responsiveness

		}
	
	});

	$('#select-trigger').on('change', function() {

		var _this = $(this);
		var trigger_value = _this.val();

		$('.main-nav').removeClass('trigger-hover trigger-click');
		$('.main-nav').addClass(trigger_value);
	
	});

	$('#select-version').on('change', function() {

		var _this = $(this);
		var version_value = _this.val();

		if (version_value === 'version-3') {

			window.location.href = '../mega-menu-v3/index.html';

		} else if (version_value === 'version-2') {

			window.location.href = '../mega-menu-v2/index.html';

		} else {

			window.location.href = '../mega-menu-bootstrap/index.html';

		}

	});

	/* theme - changer, this is the script for theme changer, delete or comment this code to remove functionality */

	$('#theme-changer').on('click', 'li', function() {

		var _this = $(this);
		var css_path = "css/";
		var theme_id = _this.attr('id') + '.css'; //theme-01.css, them-02 + '.css'
		
		_this.css('transform','scale(1.2)').siblings('li').css('transform','scale(1)');

		$('link#themes').attr('href', css_path + theme_id);
		
	});



});

//CUSTOMS FUNCTIONS HERE

function load_animation(_this, selected_animation) {

	//change sub-menu-1 animation here

	var _animation = selected_animation;

	var animation_1 = ['animation-fadeIn','animation-hingeTop', 'animation-hingeLeft', 'animation-slideDown', 'animation-slideUp'];
	var animation_2 = ['animation-slideLeft', 'animation-slideRight', 'animation-zoomIn','animation-pivotTopLeft', 'animation-recoil'];

	var array_merge = $.merge(animation_1, animation_2);

	for (var x in array_merge) { //remove all occurence of classes stated in the array

		_this.children('div.animated').removeClass(array_merge[x]); //assign animation only to div that has a class of "animated"

	}

	_this.children('div.animated').addClass(_animation);

}

function report_window_width() {

	var ww = $(window).width();

	return ww;

}

/* Custom Functions for removing specific class base from a regular expression */

function removeClassRegEx(target_element,target_pattern) { //target pattern must be a regular expression

	var target = target_element;
	var pattern = target_pattern;

	var classes;

	if (target.attr('class') != undefined) { //if the target attribute 'class' is not existing

		classes = target.attr('class').split(" "); //attribute classes to array

		for (x in classes) { //iterate each array and remove class based on the pattern match

			if (classes[x].match(pattern)) {

				target.removeClass(classes[x]);

			} 

		}

	}
	
}