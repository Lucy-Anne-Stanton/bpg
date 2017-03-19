 $(document).ready(function(){
    if (window.innerWidth < 700) {
    $.ajax({
        //URL with API query and parameters.
        url: "https://api.flickr.com/services/rest/",
        data: {
            method: "flickr.groups.pools.getPhotos",
            group_id : "1699109@N22",
            api_key: "5c0ef41286f23c65d07af970db2a8ff9",
            format: "json",
            per_page: 30,
            nojsoncallback: 1,
        },
        //If the query is successful (the API key is valid and the group ID exists), start another function
        success: function (response) {
            //Every photo found will be given a value to be used when creating the URLs and an index to count them.
            $.each(response.photos.photo, function (index, value) {
            //console.log displays the number and the photos' information (this will be deleted on completion). 
            console.log(index);
            console.log(value);
            
            //The url and imgurl are created by following the Flickr API guidance: https://www.flickr.com/services/api/misc.urls.html
            var url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '_z.jpg';
            var imgurl = 'https://www.flickr.com/photos/' + value.owner + '/' + value.id;
            
            //The img variable is given a div element that has a class and a background image of each url that is passed to it.
            var img = $('<div>').addClass("slick-slide").css({"background-image":"url("+url+")"});
            //The title variable is given a div element with a class of 'title'
            var title = $('<div>').addClass("title");
            //The a variable is given an anchor tag with attributes that will link to the Flickr image url and appear in another tab when clicked.
            //It is then given text that states the name of the image and the photographer's name. 
            var a = $('<a>').attr({href: imgurl, target: "_blank"}).text("Image taken by " + value.ownername);
            //Each img variable is given a title, each title is given an anchor tag.
            img.append(title);
            title.append(a);

            //Below is the code created by: http://www.dcodes.net/2/docs/flickr.html for dc_flickr_slider, some of which has been modified for the project.
            $("#dc_flickr_slider").append(img);
            }); 
            $('#dc_flickr_slider').jflickrfeed({
                limit: 30,
                }, function(data) {
                    $('#dc_flickr_slider').cycle({
                        timeout: 60000,
                        fx: 'scrollHorz',
                        prev: '#flickr_slider_prev',
                        next: '#flickr_slider_next'
                    });
                    $('#dc_flickr_slider li').hover(function(){
                        $(this).children('div').show();
                    },function(){
                        $(this).children('div').hide();
                    });
                });
            }
        });
  } else {
 //Ajax is used to make an asynchronous HTTP request 
    $.ajax({
        //URL with API query and parameters.
        url: "https://api.flickr.com/services/rest/",
        data: {
            method: "flickr.groups.pools.getPhotos",
            group_id : "1699109@N22",
            api_key: "5c0ef41286f23c65d07af970db2a8ff9",
            format: "json",
            per_page: 30,
            nojsoncallback: 1,
        },
        //If the query is successful (the API key is valid and the group ID exists), start another function
        success: function (response) {
            //Every photo found will be given a value to be used when creating the URLs and an index to count them.
            $.each(response.photos.photo, function (index, value) {
            //console.log displays the number and the photos' information (this will be deleted on completion). 
            console.log(index);
            console.log(value);
            
            //The url and imgurl are created by following the Flickr API guidance: https://www.flickr.com/services/api/misc.urls.html
            var url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '_b.jpg';
            var imgurl = 'https://www.flickr.com/photos/' + value.owner + '/' + value.id;
            
            //The img variable is given a div element that has a class and a background image of each url that is passed to it.
            var img = $('<div>').addClass("slick-slide").css({"background-image":"url("+url+")"});
            //The title variable is given a div element with a class of 'title'
            var title = $('<div>').addClass("title");
            //The a variable is given an anchor tag with attributes that will link to the Flickr image url and appear in another tab when clicked.
            //It is then given text that states the name of the image and the photographer's name. 
            var a = $('<a>').attr({href: imgurl, target: "_blank"}).text(value.title + ", taken by " + value.ownername);
            //Each img variable is given a title, each title is given an anchor tag.
            img.append(title);
            title.append(a);

            //Below is the code created by: http://www.dcodes.net/2/docs/flickr.html for dc_flickr_slider, some of which has been modified for the project.
            $("#dc_flickr_slider").append(img);
            }); 
            $('#dc_flickr_slider').jflickrfeed({
                limit: 30,
                }, function(data) {
                    $('#dc_flickr_slider').cycle({
                        timeout: 60000,
                        fx: 'scrollHorz',
                        prev: '#flickr_slider_prev',
                        next: '#flickr_slider_next'
                    });
                    $('#dc_flickr_slider li').hover(function(){
                        $(this).children('div').show();
                    },function(){
                        $(this).children('div').hide();
                    });
                });
            }
        });
  }

  })