$(function () {
    $.ajax({
        url: "https://api.flickr.com/services/rest/",
        data: {
            method: "flickr.people.getPhotos",
            user_id : "103635947@N03",
            api_key: "5c0ef41286f23c65d07af970db2a8ff9",
            format: "json",
            per_page: 30,
            nojsoncallback: 1,
        },
        success: function (response) {
           $.each(response.photos.photo, function (index, value) {
            console.log(value);
          var url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '_b.jpg';
          var imgurl = 'https://www.flickr.com/photos/' + '103635947@N03' + '/' + value.id;
          //$(".slick-slide").css({"background-image":"url("+url+")"});
          var img = $('<div>').addClass("slick-slide").css({"background-image":"url("+url+")"});
          var title = $('<div>').addClass("title");
          var a = $('<a>').attr({href: imgurl, target: "_blank"}).text(value.title);
          img.append(title);
          title.append(a);
          
          $("#dc_flickr_slider").append(img);
            }); 
            $('#dc_flickr_slider').slickflickrfeed({
                limit: 30, // number of images to show
                
            // Small images: {{image_s}}
            // Medium images: {{image}}
            // Large images: {{image_b}}
           //itemTemplate: '<div class="slick-slide" style="" data-thumb="{{image_b}}"><a href="{{image_b}}"><div>{{title}}</div></a></div>'
        }, function(data) {
            $('#dc_flickr_slider').cycle({
                timeout: 60000, // ms before next slide  (60000 = 1 minute)
                fx: 'scrollHorz', // scrollHorz, scrollVert, fade, shuffle, turnDown, zoom, wipe, fadeZoom, toss, uncover, curtainX, curtainY
                prev: '#flickr_slider_prev', 
                next: '#flickr_slider_next',
                customPaging : function(slider, i) {
		var thumb = $(slider.$slides[i]).data('thumb');
		return '<a><div class="img" style="background: url('+thumb+'); background-repeat: no-repeat; background-size: cover; background-position: 50%;"></div></a>';
        }
            }); 
/*
            $('.banner-slider').slick({
        infinite: true,
        limit: 30,
        slidesToShow: 30,
        slidesToScroll: 1,
        dots:true,
        customPaging : function(slider, i) {
		var thumb = $(slider.$slides[i]).data('thumb');
		return '<a><div class="img" style="background: url('+thumb+'); background-repeat: no-repeat; background-size: cover; background-position: 50%;"></div></a>';
        }
            }); */
            $('#dc_flickr_slider li').hover(function(){
                $(this).children('div').show();
            },function(){
                $(this).children('div').hide();
            }); 
        });
    }
    });
})

/* API key: 5c0ef41286f23c65d07af970db2a8ff9 Secret: fe895383ed09539a */