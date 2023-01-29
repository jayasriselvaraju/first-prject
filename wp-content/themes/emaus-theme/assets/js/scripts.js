var DEOTHEMES = DEOTHEMES || {};

(function($){
	"use strict";

	// Detect Browser Width
	(function() {
		if (Modernizr.mq('(min-width: 0px)')) {
			// Browsers that support media queries
			minWidth = function (width) {
				return Modernizr.mq('(min-width: ' + width + 'px)');
			};
		}
		else {
			// Fallback for browsers that does not support media queries
			minWidth = function (width) {
				return $window.width() >= width;
			};
		}
	})();


	DEOTHEMES.initialize = {

		init: function() {
			DEOTHEMES.initialize.scrollToTop();
			DEOTHEMES.initialize.mobileNavigation();
			DEOTHEMES.initialize.masonry();
			DEOTHEMES.initialize.masonryFilter();
			DEOTHEMES.initialize.responsiveTables();
			DEOTHEMES.initialize.skipLinkFocus();
			DEOTHEMES.initialize.detectMobile();
			DEOTHEMES.initialize.detectIE();
		},

		preloader: function() {
			$('.loader').fadeOut();
			$('.loader-mask').delay(350).fadeOut('slow');
		},

		triggerResize: function() {
			$window.trigger("resize");
		},

		scrollToTopScroll: function() {
			var scroll = $window.scrollTop();
			if (scroll >= 50) {
				$backToTop.addClass("show");
			} else {
				$backToTop.removeClass("show");
			}
		},

		scrollToTop: function() {
			$backToTop.on('click',function(){
				$('html, body').animate({scrollTop: 0}, 750);
				return false;
			});
		},


		stickyNavbar: function() {
			var $navSticky = $('.nav--sticky');

			if ( $window.scrollTop() > 190 & minWidth(992) ) {
				$navSticky.addClass('sticky');
			} else {
				$navSticky.removeClass('sticky');		
			}

			if ( $window.scrollTop() > 200 & minWidth(992) ) {
				$navSticky.addClass('offset');
			} else {
				$navSticky.removeClass('offset');
			}

			if ( $window.scrollTop() > 500 & minWidth(992) ) {
				$navSticky.addClass('scrolling');
			} else {
				$navSticky.removeClass('scrolling');
			}
		},

		stickyNavbarRemove: function() {
			if ( ! minWidth( 992 ) ) {
				$('.nav--sticky').removeClass('sticky offset scrolling');
			}

			if ( minWidth( 992 ) ) {
				$('.nav__dropdown-menu').css('display', '');
			}
		},

		mobileNavigation: function() {
			var $navDropdown = $('.nav__dropdown');
			var $navDropdownMenu = $('.nav__dropdown-menu');

			$('.nav__dropdown-trigger').on('click', function() {
				var $this = $(this);
				$this.toggleClass('nav__dropdown-trigger--is-open');
				$this.next($navDropdownMenu).slideToggle();
				$this.attr('aria-expanded', function(index, attr){
					return attr == 'true' ? 'false' : 'true';
				});
			});

			if ( $html.hasClass('mobile') ) {
				$body.on('click',function() {
					$navDropdownMenu.addClass('hide-dropdown');
				});

				$navDropdown.on('click', '> a', function(e) {
					e.preventDefault();
				});

				$navDropdown.on('click',function(e) {
					e.stopPropagation();
					$navDropdownMenu.removeClass('hide-dropdown');
				});
			}
		},

		masonry: function() {
			var $grid = $('.masonry-grid').imagesLoaded( function() {
				$grid.isotope({
					itemSelector: '.masonry-item',
					masonry: {
						columnWidth: '.masonry-item:not(.entry--first-post)',
					},
					percentPosition: true,
					stagger: 30,
					hiddenStyle: {
						transform: 'translateY(100px)',
						opacity: 0
					},
					visibleStyle: {
						transform: 'translateY(0px)',
						opacity: 1
					}
				});
			});
		},

		masonryFilter: function () {
			let $grid = $('.masonry-grid');
			$('.project-filter').on( 'click', 'a', function(e) {
				e.preventDefault();
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
				$('.project-filter a').removeClass('active');
				$(this).closest('a').addClass('active');
			});
		},

		responsiveTables: function() {
			var $table = $('.wp-block-table');
			if ( $table.length > 0 ) {
				$table.wrap('<div class="table-responsive"></div>');
			}
		},

		skipLinkFocus: function() {
			var isIe = /(trident|msie)/i.test( navigator.userAgent );

			if ( isIe && document.getElementById && window.addEventListener ) {
				window.addEventListener( 'hashchange', function() {
					var id = location.hash.substring( 1 ),
						element;

					if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
						return;
					}

					element = document.getElementById( id );

					if ( element ) {
						if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
							element.tabIndex = -1;
						}

						element.focus();
					}
				}, false );
			}
		},

		detectMobile: function() {
			if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
				$html.addClass("mobile");
			}
			else {
				$html.removeClass("mobile");
			}
		},

		detectIE: function() {
			if (Function('/*@cc_on return document.documentMode===10@*/')()) { $html.addClass("ie"); }
		}
	};


	DEOTHEMES.documentOnReady = {

		init: function() {
			DEOTHEMES.initialize.init();
		}

	};

	DEOTHEMES.windowOnLoad = {

		init: function() {
			DEOTHEMES.initialize.preloader();
			DEOTHEMES.initialize.triggerResize();
		}

	};

	DEOTHEMES.windowOnResize = {

		init: function() {
			DEOTHEMES.initialize.stickyNavbarRemove();
		}

	}

	DEOTHEMES.windowOnScroll = {

		init: function() {
			DEOTHEMES.initialize.scrollToTopScroll();
			DEOTHEMES.initialize.stickyNavbar();
		}

	}

	var $window = $(window),
			$html = $('html'),
			$body = $('body'),
			$backToTop = $('#back-to-top'),
			minWidth;

	$(document).ready(DEOTHEMES.documentOnReady.init);
	$window.on('load', DEOTHEMES.windowOnLoad.init);
	$window.on('resize', DEOTHEMES.windowOnResize.init);
	$window.on('scroll', DEOTHEMES.windowOnScroll.init);

})(jQuery);