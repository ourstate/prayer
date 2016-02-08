jQuery(document).ready(function($) {

	// create functions to determine if element is before or after another element
	// http://stackoverflow.com/questions/7208624/check-if-element-is-before-or-after-another-element-in-jquery
	$.fn.isAfter = function(sel){
	  return this.prevAll(sel).length !== 0;
	}
	$.fn.isBefore= function(sel){
	  return this.nextAll(sel).length !== 0;
	}

	// parallax init
	$.stellar({
		horizontalScrolling: false,
		hideDistantElements: false,
		positionProperty: 'transform'
	});

	// caption displays
	$('.caption .toggle').on('click', function() {
		if ($(this).prev('.text').is(':visible')) {
			$(this).prev('.text').hide(300);
			$(this).removeClass('icon-close').addClass('icon-info');
		} else {
			$(this).prev('.text').show(300);
			$(this).removeClass('icon-info').addClass('icon-close');
		}
	});

	var pageLiked;

	function postToPage() {
		FB.ui({
			method: 'feed',
			to: '92586461482'
		}, function(response) {
			console.log(response);
		});
	}

	/*$('.contribute a').click(function(e) {
		e.preventDefault();
		postToPage();
	});*/

	// CTA share button popups
	$('.share a').on('click', function(e) {
		e.preventDefault();
		var href = $(this).attr('href');

		window.open(href, 'Share This', 'width=450,height=300&scrollbars=1');
	});

/************
 ************ HOME
 ***********/
if ($('body').hasClass('home')) {

	// home page feature slideshow
	/*$('#feature-slideshow .slides').bxSlider({
		pagerCustom: '#feature-slideshow .pager'
	});*/

	/*$('#pager .cycle-slide').click(function() {
		var index = $('#pager').data('cycle.API').getSlideIndex(this);
		slideshows.cycle('goto', index%16);
	});

	$('#pager').on('cycle-update-view', function(event, optionHash, slideOptionsHash, currentSlide) {
		$(currentSlide);
	});*/

	var defaultCSS = {
		width: 95
	};
	var centerCSS = {
		width: 364
	};
	var leftCSS = {
		left: 0,
		right: 'auto'
	};
	var rightCSS = {
		right: 0,
		left: 'auto'
	};

	var distance = 'auto';

	var pager_left;

	$('#pager').children().css(defaultCSS);
	$('#pager').children().eq(8).css(centerCSS).addClass('center');

	var thumbs = $('#pager').carouFredSel({
		width: '100%',
		align: false,
		scroll: {
			items: 1,
			duration: 1000,
			timeoutDuration: 3000,
			onBefore: function(data) {
				var center = $('#pager .item.center');
				// expand center item
				if (data.scroll.direction == "next") {
					/*data.items.visible.eq(8).find('img').css(rightCSS)
					data.items.visible.eq(8).animate(centerCSS, {queue: false, duration: 1000}).addClass('center');
					data.items.old.eq(8).find('img').css(leftCSS)
					data.items.old.eq(8).animate(defaultCSS, {queue: false, duration: 1000}).removeClass('center');

					if ($('html').hasClass('lt-ie9')) {*/
					if (distance == 'adjacent' || distance == 'auto') {
						center.next().find('img').css(rightCSS);
						center.next().animate(centerCSS, {queue: false, duration: 1000}).addClass('center');
						center.find('img').css(leftCSS);
						center.animate(defaultCSS, {queue: false, duration: 1000}).removeClass('center');
					}
					//}
				} else {
					/*data.items.visible.eq(8).find('img').css(leftCSS)
					data.items.visible.eq(8).animate(centerCSS, {queue: false, duration: 1000}).addClass('center');
					data.items.old.eq(8).find('img').css(rightCSS)
					data.items.old.eq(8).animate(defaultCSS, {queue: false, duration: 1000}).removeClass('center');

					if ($('html').hasClass('lt-ie9')) {*/
					if (distance == 'adjacent' || distance == 'auto') {
						center.prev().find('img').css(leftCSS);
						center.prev().animate(centerCSS, {queue: false, duration: 1000}).addClass('center');
						center.find('img').css(rightCSS);
						center.animate(defaultCSS, {queue: false, duration: 1000}).removeClass('center');
					}
					//}
				}

				// get slide index of center item
				var slide_index = data.items.visible.eq(8).data('slide-index');
				//console.log(slide_index);
			},
			onAfter: function(data) {
				var center = $('#pager .item.center');
				if (!center.is(':nth-child(9)')) {
					n = center.index();
					offset_n = 8-n;
					$('#pager').css({'margin-left': parseFloat(pager_left) + parseInt(95*offset_n)});
				}
			}
		},
		auto: {play: false},
		onCreate: function() {
			// center thumbnail slideshow
			// get width of window
			var window_width = $(window).width();

			// width of slideshow is all elements added up
			var pager_width = 1789;

			// difference divided by 2
			var offset = (window_width - pager_width) / 2;

			// had to subtract 47 to keep everything lined up in the end
			$('#pager').css({'margin-left': offset - 47});

			pager_left = offset - 47;
		}
	}).find('.item').on('click', function() {
		if (!$('html').hasClass('lt-ie9')) {

			// expand center slide
			var center = $('#pager .item.center')
			var next = center.next();
			var prev = center.prev();
			if (!next.is(this) && !prev.is(this)) {
				distance = 'far';
				if ($(this).isAfter(center)) {
					$(this).find('img').css(rightCSS);
					$(this).animate(centerCSS, {queue: false, duration: 1000}).addClass('center');
					center.find('img').css(leftCSS);
					center.animate(defaultCSS, {queue: false, duration: 1000}).removeClass('center');
				} else if ($(this).isBefore(center)) {
					$(this).find('img').css(leftCSS);
					$(this).animate(centerCSS, {queue: false, duration: 1000}).addClass('center');
					center.find('img').css(rightCSS);
					center.animate(defaultCSS, {queue: false, duration: 1000}).removeClass('center');
				}
			} else if (center.is(this)) {
				distance = 'this';
				$(this).find('img').css(rightCSS);
				$(this).css(centerCSS, {queue: false, duration: 1000});
			} else {
				distance = 'adjacent';
			}

			// trigger carousel to advance
			$('#pager').trigger('slideTo', [$(this), -8]);

			// find index of clicked item
			var slide_index = $(this).data('slide-index');

			// transition main slide and title box to new index
			$('#slides').cycle('goto', slide_index);
			$('#title-slides').cycle('goto', slide_index);
		}
	}).css('cursor', 'pointer');

	// on resize re-center slideshow
	$(window).smartresize(function() {
		// get width of window
		var window_width = $(window).width();

		// width of slideshow is all elements added up
		var pager_width = 1789;

		// difference divided by 2
		var offset = (window_width - pager_width) / 2;

		// had to subtract 47 to keep everything lined up in the end
		$('#pager').css({'margin-left': offset - 47});
	});

	// move thumbnails along with slideshow
	$('#slides').on('cycle-before', function(e, opts, prev, next, forward) {
		if (forward == true) {
			thumbs.trigger('next');
			//$('#title-slides').cycle('next');
		} else {
			thumbs.trigger('prev');
			//$('#title-slides').cycle('prev');
		}
	});

	// fade in 'how this came to be' section
	$('#how-this-came-to-be .centered').waypoint(function(direction) {
		if (direction == 'down') {
			$(this).fadeTo(500, 1);
		} else {
			$(this).fadeTo(500, 0);
		}
	}, { offset: '70%' });

	var section_height, background_height;

	$(window).resize(function(){
		section_height = $('#recent-prayers').height();
		background_height = $('#recent-prayers .background').height();
	});

	$(window).load(function() {
		section_height = $('#recent-prayers').height(),
		background_height = $('#recent-prayers .background').height();
		// sticky background in prayers section
		$('#recent-prayers .background, #page-footer .background').waypoint(function(direction) {
			// make sure this doesn't trigger the waypoint on mobile when it's hidden because when it comes back into view, it is BROKE
			if (!$('html').hasClass('lt-ie10')) {
				if (matchMedia('only screen and (min-width: 767px)').matches) {
					if (section_height > background_height) {
						if (direction == 'down') {
							//console.log('recent-down');
							$(this).addClass('stuck');
							$(this).next('.caption').addClass('stuck');
						} else {
							//console.log('recent-up');
							$(this).removeClass('stuck');
							$(this).next('.caption').removeClass('stuck');
						}
					}
				}
			} else {
				// if this is old IE that doesn't support media queries anyway, then make the waypoints work
				if (section_height > background_height) {
					if (direction == 'down') {
						//console.log('recent-down');
						$(this).addClass('stuck');
						$(this).next('.caption').addClass('stuck');
					} else {
						//console.log('recent-up');
						$(this).removeClass('stuck');
						$(this).next('.caption').removeClass('stuck');
					}
				}
			}
		}, { offset: 'bottom-in-view' });

		// unstick sticky background when footer comes into view
		$('#upcoming-prayers').waypoint(function(direction) {
			// make sure this doesn't trigger the waypoint on mobile when it's hidden because when it comes back into view, it is BROKE
			if (!$('html').hasClass('lt-ie10')) {
				if (matchMedia('only screen and (min-width: 767px)').matches) {
					if (section_height > background_height) {
						if (direction == 'down') {
							//console.log('footer-down');
							$('#recent-prayers .background').removeClass('stuck').addClass('bottom')
							.next('.caption').removeClass('stuck');
						} else {
							//console.log('footer-up');
							$('#recent-prayers .background').removeClass('bottom').addClass('stuck')
							.next('.caption').addClass('stuck');
						}
					} else {
						$('#recent-prayers .background').removeClass('stuck').removeClass('bottom')
						.next('.caption').removeClass('stuck');
					}
				}
			} else {
				// if this is old IE that doesn't support media queries anyway, then make the waypoints work
				if (section_height > background_height) {
					if (direction == 'down') {
						//console.log('footer-down');
						$('#recent-prayers .background').removeClass('stuck').addClass('bottom')
						.next('.caption').removeClass('stuck');
					} else {
						//console.log('footer-up');
						$('#recent-prayers .background').removeClass('bottom').addClass('stuck')
						.next('.caption').addClass('stuck');
					}
				} else {
					$('#recent-prayers .background').removeClass('stuck').removeClass('bottom')
					.next('.caption').removeClass('stuck');
				}
			}
		}, { offset: '100%' });
	});

	// hover states for recent prayers
	function prayers_over() {
		$(this).closest('li').removeClass('fade');
		$(this).closest('li').siblings().addClass('fade');
	}
	function prayers_out() {
		$(this).find('li').removeClass('fade');
	}
	function nothing() {}
	/*$('#recent-prayers .inner').hoverIntent({
		over: prayers_over,
		out: nothing,
		interval: 50
	});
	$('#recent-prayers ul.block-grid').hoverIntent({
		over: nothing,
		out: prayers_out,
		interval: 50
	});*/

	// same height of prayer excerpts on load
	$(window).load(function() {
		var max_height = 0,
			count = $('#recent-prayers .full .excerpt').length;
		$('#recent-prayers .full .excerpt').each(function(i) {
			if ($(this).innerHeight() > max_height) max_height = $(this).innerHeight();
			//console.log(i);
			if (i+1 == count) {
				$('#recent-prayers .full .excerpt').css({height: max_height});
			}
		});
	});

}

/************
 ************ SINGLE
 ***********/
if ($('body').hasClass('single')) {

	// show dropdown menu
	function show_menu() {
		$('#main-nav #prayers').addClass('show');
	}
	function hide_menu() {
		$('#main-nav #prayers').removeClass('show');
	}
	function nothing() {}
	$('#main-nav #logo a').hoverIntent({
		over: show_menu,
		out: nothing,
		interval: 50
	});
	$('#main-nav').hoverIntent({
		over: nothing,
		out: hide_menu,
		timeout: 150,
		interval: 50
	});

	// check out this tutorial:
	//http://webdesign.tutsplus.com/tutorials/complete-websites/create-a-parallax-scrolling-website-using-stellar-js/

	// create lavalamp menu
	var $active_menu_item = $('#inner-nav li.active');
	$('#inner-nav').append('<div id="lavalamp"></div>');

	// make lavalamp appear with active item on load
	var pos = $active_menu_item.find('a').position();
	var width = $active_menu_item.find('a').width();
	if (pos != undefined) {
		$('#lavalamp').css({'left':pos.left, 'width':width}).show();
	}

	// hover activity for nav menu
	function lavaon() {
		var pos = $('#inner-nav li.hover a').position();
		var width = $('#inner-nav li.hover a').width();
		var lavapos = $('#lavalamp').position();
		$('#lavalamp').css({'left':pos.left, 'width':width}).fadeIn(500);
	}
	function lavaoff() {
		//console.log('off');
		var pos = $('#inner-nav li.active a').position();
		var width =  $('#inner-nav li.active a').width();
		if (pos != undefined) {
			$('#lavalamp').css({'left':pos.left, 'width':width});
		} else {
			$('#lavalamp').fadeOut(500);
		}
	}
	function hoveron() {
		$(this).parent('li').addClass('hover');
		$active_menu_item.removeClass('active');
		$('#top-header').addClass('over');
		lavaon();
	}
	function hoveroff() {
		$(this).parent('li').removeClass('hover');
	}
	function activeon() {
		$active_menu_item.addClass('active');
		$('#top-header').removeClass('over');
		lavaoff();
	}

	$('#inner-nav a').hoverIntent({
		over: hoveron,
		out: hoveroff
	});

	$('#inner-nav').hoverIntent({
		over: nothing,
		out: activeon,
		timeout: 200
	});

	// add active class to current section
	$('section').waypoint(function(direction) {
		var name = $(this).attr('id');
		if (direction == 'down') {
			$active_menu_item = $('#inner-nav a[href*="'+name+'"]').parent('li');
			$('#inner-nav a[href*="'+name+'"]').parent('li').addClass('active').prev().removeClass('active');
			lavaoff();
		} else {
			$active_menu_item = $('#inner-nav a[href*="'+name+'"]').parent('li').prev();
			$('#inner-nav a[href*="'+name+'"]').parent('li').removeClass('active').prev().addClass('active');
			lavaoff();
		}
	}, { offset: '50%' }
	);

	// sticky header
	$('#sticky-nav').waypoint('sticky', {offset: -1});

	// scroll down to sections
	$('#inner-nav a').click(function(e) {
		e.preventDefault();
		var target = this.hash,
			offset_top = $(target).offset().top;
		if (offset_top > 173) {
			if (target == '#prayer') {
				$.scrollTo(offset_top-147, 1000, {easing: 'easeInQuad'});
			} else {
				$.scrollTo(offset_top-107, 1000, {easing: 'easeInQuad'});
			}
		} else {
			$.scrollTo(0, 1000, {easing: 'easeInQuad'});
		}
	});

	// fade out "scroll to expore" text
	$('#scroll').waypoint(function(direction) {
		if (direction == 'down') {
			$(this).fadeTo(500, 0);
		} else {
			$(this).fadeTo(500, 1);
		}
	}, { offset: '50%' });

	// fade in to reveal prayer paragraphs on scroll
	$('#prayer .inner-scroll p, #prayer .inner-scroll .share, #prayer .inner-scroll h2, #prayer .inner-scroll h3').each(function() {
		// coming in from bottom
		$(this).waypoint(function(direction) {
			if (direction == 'down') {
				$(this).fadeTo(500, 1);
			} else {
				$(this).not(":first-of-type").fadeTo(500, 0);
				if ($(this).hasClass('share')) {
					$(this).fadeTo(500, 0);
				}
			}
		}, { offset: '70%' });
		// disappearing off top 2
		$(this).waypoint(function(direction) {
			if (direction == 'down') {
				$(this).fadeTo(500, 0);
			} else {
				$(this).fadeTo(500, 1);
			}
		}, { offset: function() {
				if ($('body').hasClass('logged-in')) {
					return 108;
				} else {
					return 80;
				}
			}
		});
	});

	// stick prayer section on scroll until prayer is completely scrolled through
	var bio_pic_width = $('#prayer .bio-pic').innerWidth();

	$('#prayer').waypoint(function(direction) {
		if (!$('body').hasClass('iphone')) {
			if (direction == 'down') {
				$(this).addClass('moving').find('.bio-pic').css({
					'left': $('#prayer .bio-pic').offset().left,
					'width': bio_pic_width
				});
			} else {
				$(this).removeClass('moving').find('.bio-pic').removeAttr('style');
			}
		}
	}, { offset: function() {
			if (!$('html').hasClass('lt-ie10')) {
				if (matchMedia('only screen and (min-height: 746px)').matches) {
					if ($('body').hasClass('logged-in')) {
						return 173;
					} else {
						return 145;
					}
				} else {
					if ($('body').hasClass('logged-in')) {
						return 120;
					} else {
						return 92;
					}
				}
			} else {
				if ($('body').hasClass('logged-in')) {
					return 120;
				} else {
					return 92;
				}
			}
		}
	});

	// unstick prayer section on scroll when supplementary sections come into view
	$('#sections').waypoint(function(direction) {
		if (!$('body').hasClass('iphone')) {
			if (direction == 'down') {
				$('#prayer').removeClass('moving').addClass('bottom').find('.bio-pic').removeAttr('style');
				$('#prayer .inner-scroll p, #prayer .inner-scroll .share').fadeTo(500, 1);
			} else {
				$('#prayer .inner-scroll p, #prayer .inner-scroll .share').fadeTo(500, 0);
				$('#prayer').removeClass('bottom').addClass('moving').find('.bio-pic').css({
					'left': $('#prayer .bio-pic').offset().left,
					'width': bio_pic_width
				});
			}
		}
	}, { offset: function() {
			if (!$('html').hasClass('lt-ie10')) {
				if (matchMedia('only screen and (min-height: 746px)').matches) {
					if ($('body').hasClass('logged-in')) {
						return $('#prayer .bio-pic').height() + 107 + 173;
					} else {
						return $('#prayer .bio-pic').height() + 107 + 145;
					}
				} else {
					if ($('body').hasClass('logged-in')) {
						return $('#prayer .bio-pic').height() + 107 + 120;
					} else {
						return $('#prayer .bio-pic').height() + 107 + 92;
					}
				}
			} else {
				if ($('body').hasClass('logged-in')) {
					return $('#prayer .bio-pic').height() + 107 + 120;
				} else {
					return $('#prayer .bio-pic').height() + 107 + 92;
				}
			}
		}
	});

	// sticky background
	$('.background').waypoint(function(direction) {
		if (direction == 'down') {
			$(this).addClass('stuck');
			$(this).next('.caption').addClass('stuck');
		} else {
			$(this).removeClass('stuck');
			$(this).next('.caption').removeClass('stuck');
		}
	}, { offset: 'bottom-in-view' });

	// unstick sticky background when footer comes into view
	$('#page-footer').waypoint(function(direction) {
		if (direction == 'down') {
			$('#sections .background').removeClass('stuck').addClass('bottom')
			.next('.caption').removeClass('stuck');
		} else {
			$('#sections .background').removeClass('bottom').addClass('stuck')
			.next('.caption').addClass('stuck');
		}
	}, { offset: '100%' });

	// fade in section titles and pullquotes when they come into view
	$('.supplemental h2.section, .supplemental h3.pullquote').waypoint(function(direction) {
		if (direction == 'down') {
			$(this).fadeTo(500, 1);
		} else {
			$(this).fadeTo(500, 0);
		}
	}, { offset: '70%' });

	// equal height columns in sections
	// from http://codepen.io/micahgodbolt/pen/FgqLc
	equalheight = function(container){
		var currentTallest = 0,
			currentRowStart = 0,
			rowDivs = new Array(),
			$el,
			topPosition = 0;
		$(container).each(function() {

			$el = $(this);
			$($el).height('auto');
			topPostion = $el.position().top;

			if (currentRowStart != topPostion) {
				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
				rowDivs.length = 0; // empty the array
				currentRowStart = topPostion;
				currentTallest = $el.height();
				rowDivs.push($el);
			} else {
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			}
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
		});
	}

	$(window).load(function() {
		if (!$('html').hasClass('lt-ie10') && !$('body').hasClass('iphone')) {
			if (matchMedia('only screen and (min-width: 768px)').matches) {
				equalheight('.supp-1 .outer.row > .columns');
				equalheight('.supp-2 .outer.row > .columns');
				equalheight('.supp-3 .outer.row > .columns');
			}
		}
	});

	$(window).resize(function(){
		if (!$('html').hasClass('lt-ie10') && !$('body').hasClass('iphone')) {
			if (matchMedia('only screen and (min-width: 768px)').matches) {
				equalheight('.supp-1 .outer.row > .columns');
				equalheight('.supp-2 .outer.row > .columns');
				equalheight('.supp-3 .outer.row > .columns');
			}
		}
	});

	// display captions for audio files on hover
	function show_audio_caption() {
		$(this).find('.desc').show('blind', {direction: 'right', easing: 'easeInOutQuad'}, 300);
	}
	function hide_audio_caption() {
		$(this).not('.stick').find('.desc').hide('blind', {direction: 'right', easing: 'easeInOutQuad'}, 300);
	}
	$('.asset.type-audio').hoverIntent({
		over: show_audio_caption,
		out: hide_audio_caption,
		timeout: 300
	});

	// play audio on image click too
	$('.asset.type-audio img').click(function() {
		$(this).siblings('.jp-audio').find('.jp-controls').find('a:visible').trigger('click');
	});

	// make sure captions display for audio on click
	$('.asset.type-audio .jp-controls a').on('click', function() {
		if ($(this).closest('.asset.type-audio').hasClass('stick')) {
			$(this).closest('.asset.type-audio').removeClass('stick');
		} else {
			$(this).closest('.asset.type-audio').addClass('stick');
		}
	});

	// follow links in audio captions
	$('.asset.type-audio .desc a').click(function(e) {
		window.open($(this).attr('href'));
	});

	// show video caption on hover
	function show_video_caption() {
		$(this).find('.desc').show('blind', {direction: 'right', easing: 'easeInOutQuad'}, 300);
	}
	function hide_video_caption() {
		$(this).find('.desc').hide('blind', {direction: 'right', easing: 'easeInOutQuad'}, 300);
	}
	$('.asset.type-video').hoverIntent({
		over: show_video_caption,
		out: hide_video_caption,
		timeout: 300
	});

	// Youtube video lightbox
	$('a.fancybox-media').fancybox({
		padding: 10,
		helpers: {
			media: {},
			overlay: {
				css: {
					'background' : 'rgba(255, 255, 255, .7)'
				}
			}
		}
	});

	// Hover states for Learn More links in footer
	function hover_bar_on() {
		$(this).find('.hover-bar').fadeTo(500, 0.5);
	}
	function hover_bar_off() {
		$(this).find('.hover-bar').fadeTo(500, 0);
	}
	$('#learn-more .four.columns').hoverIntent({
		over: hover_bar_on,
		out: hover_bar_off,
		timeout: 300,
		interval: 50
	});

}

});