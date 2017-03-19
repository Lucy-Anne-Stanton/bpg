//The below code displays the meetup information as required, but all authentication is done via browser and so is not secure.
var signedURL = "https://api.meetup.com/Bristol-Photography-Group/events?scroll=next_upcoming&photo-host=public&page=3&sig_id=215630158&sig=f9924b737a9715fd1c13b8a71768ec2521f2a55b&callback=?";


$(function () {
  //The signed URL is used to display the information regarding the events via Get JSON.
  $.getJSON(signedURL, function (info) {
    //Finds the data objects in the JSON file and adds them to the events variable
    events = info.data;

   // window.alert(JSON.stringify(events));
    var jsonData = JSON.stringify(events);
/*
    function download(text, name, type) {
      var a = document.createElement("a");
      var file = new Blob([text], {type: type});
      a.href = URL.createObjectURL(file);
      a.download = name;
      a.click();
    }
    download(jsonData, 'test.json', 'application/json');
    */
    //For each event, find the name, link and description and add them all to respective variables
    for (i = 0; i < events.length; i++) {
      event = events[i];
      if(event.name){
        name = event.name;
      }
      if(event.link){
        link = event.link;
      }
      if (event.description) {
        desc = event.description;



        //When photos are added to Meetup, they are placed in the description, which makes it difficult to shorten the amount of text. Because of this, two functions are required instead of one to shorten the description.

        //The wordTrim function is used to trim excess information to prevent the description to be too long
        function wordTrim(value, length, overflowSuffix) {
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
            
          };
          
          
          //if (charTrim) {
          //This adds the functions to an img variable and desc variable respectively.
          img = (charTrim(event.description, 3));
          //}
          desc = (wordTrim(event.description,500,'...'));
        
      
    }
      
      //The data collected from the Meetup events JSON file is then displayed on the page by appending the div variable to a class used for the chosen div element
        div = "<div class='col-md-4'> <div id='groups' class='box'><h3 class='title'><a href='" + link + " ' target='_blank'>" + name + "</a></h3><span class='image'>" + img + "</span><div class='desc'>" + desc + "</div></div></div>";
      $(".placeholder").append(div);
      
    }
    
    
  });
});