//http://api.jquery.com/jquery.getjson/

$(function () {
    var site = "http://127.0.0.1:3000/json/upcomingEvents.json";
$.getJSON(site, function (info) {

events = info;

    for (i = 0; i < events.length; i++) {
        event = events[i];
      if(event.name){
        name = event.name;
      }
      if(event.id){
        link = event.id;
      }
      if (event.description) {
        desc = event.description;



    //When photos are added to Meetup, they are placed in the description, which makes it difficult to shorten the amount of text. Because of this, two functions are required instead of one to shorten the description.

        //The wordTrim function is used to trim excess information to prevent the description to be too long
     /*   function wordTrim(value, length, overflowSuffix) {
          //The chosen string is split into arrays by every closing bracket (less than sign)
          if (value.length <= length) return value;
          var strAry = value.split(' ');
          var retLen = strAry[0].length;
          for (var l = 5; l < strAry.length; l++) {
            if(retLen == length || retLen + strAry[l].length + 1 > length) break;
            retLen+= strAry[l].length + 1
          }
            //This starts cutting the string from the third item 
            return strAry.slice(3,l).join(' ') + (overflowSuffix || '');
              
          };
           //The charTrim function is used to find the image and display only that
               function charTrim(value, length) {
                 
            if (value.length <= length) return value;
            var imgAry = value.split(' ');
            var imgLen = imgAry[1].length;
            
            for (var i = 0; i < imgAry.length; i++) {
              if(imgLen == length || imgLen + imgAry[i].length + 1 > length) break;
              imgLen+= imgAry[i].length + 1
            }
            //This cuts the string from the first item to the third
            return imgAry.slice(0,3).join(' ');
            
          }; */
/*
Find how to use angular to make these appear
img = $(desc).filter('img');
          
  */        
          //if (charTrim) {
          //This adds the functions to an img variable and desc variable respectively.
         
        
        //  img = (charTrim(event.description, 3));
          //}
       //   desc = (wordTrim(event.description,500,'...'));
        
      
    }
      
      //The data collected from the Meetup events JSON file is then displayed on the page by appending the div variable to a class used for the chosen div element
        div = "<div class='col-md-4'> <div id='groups' class='box'><h3 class='title'><a href='/event/" + link + " ' target='_blank'>" + name + "</a></h3>" + /*<span class='image'>" + img + "</span> */ "<div class='desc'>" + desc + "</div></div></div>";
      $(".placeholder").append(div);
      
    }
    
    
  });
});