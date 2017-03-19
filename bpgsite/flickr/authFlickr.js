module.exports = function(flick) {
var Flickr = require('flickr-sdk');

var flickr = new Flickr({
	"apiKey":            "5c0ef41286f23c65d07af970db2a8ff9",
	"apiSecret":         "fe895383ed09539a",
	"accessToken":       "72157676031587503-5c9ca915f3c56e87",
	"accessTokenSecret": "e9a1a4b62eadccf0"
});

// Refer to the flickr-sdk github page (https://github.com/flickr/flickr-sdk#responses)
// In this example, the API will search for images of "puppies"

//https://github.com/flickr/flickr-sdk-examples/blob/master/oauth/index.js
flickr
    .request()
    .authentication()
    // Flickr will redirect to this URL when the user authorizes
    .prepareRequestToken('http://localhost:3000')
    .then(function (data) {
		
    });

flickr

.request(Flickr.accessToken, Flickr.accessTokenSecret)
.groups('1699109@N22') // ID or path alias
.media()
.get()
.then(function (response) {

  // Change the index. 0, in this example, will be the first photo found in the set
  var photo = response.body.photos.photo[0];

  // Based on Flickr URLs (https://www.flickr.com/services/api/misc.urls.html)
	var url = "https://farm" + photo.farm +
	 ".staticflickr.com/" + photo.server +
	  "/" + photo.id + "_" + photo.secret + "_m.jpg";
	  console.log(url);
  	




	  
});



}

