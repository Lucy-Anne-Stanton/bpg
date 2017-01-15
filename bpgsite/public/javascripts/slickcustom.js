(function ($) {
	$.fn.slickflickrfeed = function (settings, callback) {
		settings = $.extend(true, {
			flickrbase: 'http://api.flickr.com/services/feeds/',
			feedapi: 'photos_public.gne',
			limit: 30,
			qstrings: {
				lang: 'en-us',
				format: 'json',
				jsoncallback: '?',
                id: '103635947@N03'
			},
			cleanDescription: true,
			useTemplate: true,
			itemTemplate: '',
			itemCallback: function () {}
		}, settings);
		var url = settings.flickrbase + settings.feedapi + '?';
		var first = true;
		for (var key in settings.qstrings) {
			if (!first) url += '&';
			url += key + '=' + settings.qstrings[key];
			first = false;
		}
		return $(this).each(function () {
			var $container = $(this);
			var container = this;
			$.getJSON(url, function (data) {
				$.each(data.items, function (i, item) {
					if (i < settings.limit) {
						// Clean out the Flickr Description
						if (settings.cleanDescription) {
							var regex = /<p>(.*?)<\/p>/g;
							var input = item.description;
							if (regex.test(input)) {
								item.description = input.match(regex)[2]
								if (item.description != undefined) item.description = item.description.replace('<p>', '').replace('</p>', '');
							}
						}
						// Add Image Sizes
						// http://www.flickr.com/services/api/misc.urls.html
						item['image_s'] = item.media.m.replace('_m', '_s');
						item['image_t'] = item.media.m.replace('_m', '_t');
						item['image_m'] = item.media.m.replace('_m', '_m');
						item['image'] = item.media.m.replace('_m', '');
						item['image_b'] = item.media.m.replace('_m', '_b');
                        item['image_c'] = item.media.m.replace('_m', '_c');
						delete item.media;
						// Use Template
						if (settings.useTemplate) {
							var template = settings.itemTemplate;
							for (var key in item) {
								var rgx = new RegExp('{{' + key + '}}', 'g');
								template = template.replace(rgx, item[key]);
							}
							$container.append(template)
						}
						//itemCallback
						settings.itemCallback.call(container, item);
					}
				});
				if ($.isFunction(callback)) {
					callback.call(container, data);
				}
			});
		});
	}
$('.banner-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:true,
        customPaging : function(slider, i) {
		var thumb = $(slider.$slides[i]).data('thumb');
		return '<a><div class="img" style="background: url('+thumb+'); background-repeat: no-repeat; background-size: cover; background-position: 50%;"></div></a>';
        }
    });

})(jQuery);


$(document).ready(function(){
    $('.banner-slider-2').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:true,
        customPaging : function(slider, i) {
		var thumb = $(slider.$slides[i]).data('thumb');
		return '<a><div class="img" style="background: url('+thumb+'); background-repeat: no-repeat; background-size: cover; background-position: 50%;"></div></a>';
        }
    });
});

/* API key: 5c0ef41286f23c65d07af970db2a8ff9 Secret: fe895383ed09539a */