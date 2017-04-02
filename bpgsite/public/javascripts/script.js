
$(document).ready(function() {
    var characterTemplate = $("#character-template").html();

    var compiledCharacterTemplate = Handlebars.compile(characterTemplate);

    $.ajax("./json/upcomingEvents.json").done(function(upcomingEvents){
      var wrapper = {"eventList":[upcomingEvents]};
      console.log(wrapper);
      console.log(compiledCharacterTemplate(wrapper));
      console.log(compiledCharacterTemplate(upcomingEvents));
      console.log(compiledCharacterTemplate(wrapper));
      console.log(compiledCharacterTemplate(upcomingEvents[0]));
      $("#character-list-container").html(compiledCharacterTemplate(wrapper));
}); 
/*
    $.ajax("./json/eventlist.json").done(function(eventlist) {
      
      console.log(eventlist);
      console.log(compiledCharacterTemplate(eventlist));
      $(".character-list-container").html(compiledCharacterTemplate(eventlist));
    });

    */
    //$("#eventTemplate").html(compiledTemplate(upcomingEvents));
    //console.log(compiledTemplate(cast.characters[0]));
});