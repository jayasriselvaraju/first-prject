(function($) {
	"use strict";

	var $window = $(window);
	
	/* Load More
	-------------------------------------------------------*/
	function initLoadMore() {
		$('.deo-load-more__button').on('click', function (e) {
			var button = $(this);

			if ( ! button.is('.clicked') ) {
				button.addClass('clicked');

				e.preventDefault();
				e.stopPropagation();
				
				var widget = button.parent('.deo-load-more').siblings('.deo-load-more-container');
				var widgetRow = widget.find('.row');
				var page = widget.data('page');
				var newPage = page + 1;
				var settings = widget.data('settings');

				var data = {
					action: 'deo_widget_load_more',
					security: deo_elementor_data.ajax_nonce,
					data : {
						page : page,
						settings: settings,
					}
				}

				$.ajax({
					type: 'POST',
					url: deo_elementor_data.ajax_url,
					data: data,
					beforeSend : function (xhr) {
						button.addClass('deo-loading');
						button.append('<div class="loader"><div></div></div>');
					},
					success: function(response) {
						if (response) {
							button.removeClass('deo-loading clicked');
							button.find('.loader').remove();

							widget.data('page', newPage);

							var $items = $(response).hide();
							widgetRow.append($items);

							// recalc masonry items
							widgetRow.imagesLoaded( function() {
								$items.show();
								widgetRow.isotope('appended', $items); 
							});

							if ( widget.data('page_max') == widget.data('page') ) {
								button.remove();
							}
						} else {
							button.remove();
						}  

					}
				});

			}

			return false;

		});
	}


	/* Testimonials Slider
	-------------------------------------------------------*/
	var deoTestimonialsSlider = function( $scope, $ ) {
		var slider = $('.deo-testimonials-slider');
		var settings = slider.data('slider-settings');
		const Swiper = elementorFrontend.utils.swiper;

		if ( slider.length > 0 ) {
			initSwiper();
			async function initSwiper() {
				var swiper = await new Swiper(slider, settings);

				// Watch the changes of spacing control
				if ( elementorFrontend.isEditMode() ) {
					elementor.channels.editor.on( 'change', function( view ) {
						let changed = view.container.settings.changed;

						if ( changed.dots_top_space ) {
							swiper.update();
						}

						if ( changed.space_between ) {
							settings.spaceBetween = +changed.space_between.size;
							swiper.destroy();

							reinitSwiper();
							async function reinitSwiper() {
								swiper = await new Swiper(slider, settings);
							}
						}
					});
				}

			}
			
		}
		
	}


	/* Images Slider
	-------------------------------------------------------*/
	var deoImagesSlider = function( $scope, $ ) {
		var slider = $('.deo-images-slider');
		var settings = slider.data('slider-settings');
		const Swiper = elementorFrontend.utils.swiper;


		if (slider.length > 0 ) {
			initSwiper();
			async function initSwiper() {
				var swiper = await new Swiper(slider, settings);

				// Watch the changes of spacing control
				if ( elementorFrontend.isEditMode() ) {
					elementor.channels.editor.on( 'change', function( view ) {
						let changed = view.container.settings.changed;

						if ( changed.dots_top_space ) {
							swiper.update();
						}

						if ( changed.space_between ) {
							settings.spaceBetween = +changed.space_between.size;
							swiper.destroy();

							reinitSwiper();
							async function reinitSwiper() {
								swiper = await new Swiper(slider, settings);
							}
						}
					});
				}	

			}
		}		

	}

	/* Magnific Popup
	-------------------------------------------------------*/
	var deoMagnificPopup = function( $scope, $ ) {
		$('.lightbox-img, .lightbox-video').magnificPopup({
			callbacks: {
				elementParse: function(item) {
				if(item.el.context.className == 'lightbox-video') {
						item.type = 'iframe';
					} else {
						item.type = 'image';
					}
				},
			},
			type: 'image',
			closeBtnInside:false,
			fixedContentPos: false,
			gallery: {
				enabled:true
			},
			image: {
				titleSrc: 'title',
				verticalFit: true
			}
		});

		// Single video lightbox
		$('.single-video-lightbox').magnificPopup({
			type: 'iframe',
			closeBtnInside: true,
			removalDelay: 500,
			callbacks: {
				beforeOpen: function() {
					// just a hack that adds mfp-anim class to markup 
					this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				},
			},
			fixedContentPos: false,
			tLoading: 'Loading image #%curr%...'
		});
	}


	/* Pricing Toggle
	-------------------------------------------------------*/
	var deoPricingToggle = function( $scope, $ ) {
		$('.deo-toggle__button').on('click', function(e) {
			var tabID = $(this).attr('data-tab-id');
			$(this).parents('.deo-toggle').siblings().find('.' + tabID).stop().show().siblings().hide();
			$(this).addClass('deo-toggle__button--is-active').siblings().removeClass('deo-toggle__button--is-active');
			e.preventDefault();
		});
	}


	/* Animated Text
	-------------------------------------------------------*/
	var deoAnimatedText = function( $scope, $ ) {
		let instance = $scope.find('.deo-typed').eq(0);
		let settings = instance.data('typed');
		let widgetID = instance.data('widget-id');
		let strings = instance.data('typed-strings').split(', ');

		let typed = $('#deo-typed__text-' + widgetID).typed({
			strings: strings,
			loop: settings.loop,
			typeSpeed: settings.typeSpeed,
			backSpeed: settings.backSpeed,
			backDelay: settings.backDelay,
			startDelay: settings.startDelay,
		});
	}


	/* Illustrations
	-------------------------------------------------------*/
	var deoIllustrations = function ( $scope, $ ) {
		let instance = $scope.find('.deo-illustrations');
		let illustration = instance.data('illustration');
		let anim;
		let params = {
			container: document.getElementById('deo-illustrations'),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: deo_elementor_data.plugin_url + '/assets/illustrations/' + illustration + '.json'
		};		

		anim = lottie.loadAnimation(params);

	}


	$(document).ready(function () {
		initLoadMore();
	});


	$window.on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/deo-video-icon.default', deoMagnificPopup);
		elementorFrontend.hooks.addAction('frontend/element_ready/deo-testimonials-slider.default', deoTestimonialsSlider);
		elementorFrontend.hooks.addAction('frontend/element_ready/deo-images-slider.default', deoImagesSlider);
		elementorFrontend.hooks.addAction('frontend/element_ready/deo-pricing-tables.default', deoPricingToggle);
		elementorFrontend.hooks.addAction('frontend/element_ready/deo-animated-text.default', deoAnimatedText);
		elementorFrontend.hooks.addAction('frontend/element_ready/deo-illustrations.default', deoIllustrations);
	});
	

})(jQuery);