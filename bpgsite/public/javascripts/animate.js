// fade in code (GSAP)
TweenMax.fromTo("#logo", 6, {x:0, opacity:0}, {x:0, opacity:1});

TweenMax.fromTo("#text", 6, {x:0, opacity:0}, {x:0, opacity:1});


//Scroll code (jQuery - this should only be used to alternate from scroll up to down, but this is how the animation is working so far)

$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
    $('nav').removeClass('big');
      
    $('#logo').addClass('shrink');
    $('#logo').removeClass('big');
      
    $('#text').addClass('shrink');
    $('#text').removeClass('big');
  } else {
    $('nav').removeClass('shrink');
    $('nav').addClass('big');
      
    $('#logo').removeClass('shrink');
    $('#logo').addClass('big');
      
    $('#text').removeClass('shrink');
    $('#text').addClass('big');
  }
});

$(function(){
    $('#logo').data('size','big');
   $('#text').data('size','big');
});

$(window).scroll(function(){
    if($(document).scrollTop() > 50)
    {
        if($('#logo').data('size') == 'big')
        {
            $('#logo').data('size','small');
            $('#logo').stop().animate({
               width:'65.03px',
              height:'56px',
              marginLeft:'-20px'
            },1000);
        }
        
        if($('#text').data('size') == 'big')
        {
            $('#text').data('size','small');
            $('#text').stop().animate({
              width:'50.47px',
              height:'56px',
                opacity:'0' 
            },1000);
        }
    }
    else
    {
        
        if($('#logo').data('size') == 'small')
        {
            $('#logo').data('size','big');
            $('#logo').stop().animate({
               width:'136px',
              height:'90px',
              marginLeft:'-40px' 
            },1000);
        }
        if($('#text').data('size') == 'small')
        {
            $('#text').data('size','big');
            $('#text').stop().animate({
             width:'140px',
              height:'90px',
              opacity: '1',
            },1000);
        } 
    }
});