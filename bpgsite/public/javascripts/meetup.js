var signedURL = "https://api.meetup.com/Bristol-Photography-Group/events?scroll=next_upcoming&photo-host=public&page=3&sig_id=215630158&sig=f9924b737a9715fd1c13b8a71768ec2521f2a55b&callback=?";
var events;

$(function () {
  $.getJSON(signedURL, function (info) {
    events = info.data;
    for (i = 0; i < events.length; i++) {
      event = events[i];
      if(event.name){
        name = event.name;
      }
      if (event.description) {
        
        desc = event.description;
        
          function wordTrim(value, length, overflowSuffix) {
               
            if (value.length <= length) return value;
            var strAry = value.split('>');
            var retLen = strAry[0].length;
            for (var l = 3; l < strAry.length; l++) {
              if(retLen == length || retLen + strAry[l].length + 1 > length) break;
              retLen+= strAry[l].length + 1
            }
            return strAry.slice(3,l).join('>') + (overflowSuffix || '');
              
          };
            
               function charTrim(value, length, overflowSuffix) {
                 
            if (value.length <= length) return value;
            var imgAry = value.split('>');
            var imgLen = imgAry[1].length;
            
            for (var i = 0; i < imgAry.length; i++) {
              if(imgLen == length || imgLen + imgAry[i].length + 1 > length) break;
              imgLen+= imgAry[i].length + 1
            }
            return imgAry.slice(1,3).join('>');
          
               };
            
          if (charTrim) {
          img = (charTrim(event.description)) + '>';
          }
          desc = (wordTrim(event.description,500,'...'));
          
          //alert ('' + desc);
          //alert ('' + img);
        
      
    }
      
      
        div = "<div class='col-md-4'> <div id='groups' class='box'> <h3 class='title'>" + name + "</h3><span class='image'>" + img + "</span><div class='desc'>" + desc + "</div></div></div>";
      $(".placeholder").append(div);
      
    }
    
    
  });
});