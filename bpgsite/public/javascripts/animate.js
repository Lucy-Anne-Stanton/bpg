$(document).ready(function(){
    if (window.innerWidth < 700) {
    $('#logo').addClass('noAnimate');
  
  $('.navbar.navbar-inverse.navbar-fixed-top').addClass('shrink');
  $('.navbar.navbar-inverse.navbar-fixed-top').removeClass('big');
  }
  else{
      // fade in code (GSAP)



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

  if (window.innerWidth < 700) {
      
    $('#logo').removeClass('shrink');
    $('#logo').removeClass('big');
  }

});

$(function(){
    $('#logo').data('size','big');
   $('#text').data('size','big');
});

$(window).scroll(function(){
    if($(document).scrollTop() > 50) {
        if($('#logo.shrink').data('size') == 'big') {
            $('#logo.shrink').data('size','small');
            $('#logo.shrink').stop().animate({
               width:'3.214rem',
              height:'3.214rem',
              display: 'inline-block'
            },1000);
        }
        
        if($('#text').data('size') == 'big')
        {
            $('#text').data('size','small');
            $('#text').stop().animate({
              width:'3.214rem',
              height:'3.214rem',
              display: 'inline-block',
                opacity:'0' 
            },1000);
        }
    }
    else
    {
        
        if($('#logo.big').data('size') == 'small')
        {
        $('#logo.big').data('size','big');
            $('#logo.big').stop().animate({
               width:'4.286rem',
              height:'4.286rem',
              display: 'inline-block'
            },1000);
        }
        if($('#text').data('size') == 'small')
        {
            $('#text').data('size','big');
            $('#text').stop().animate({
             width:'10.000rem',
              height:'4.286rem',
              opacity: '1',
              display: 'inline-block',
            },1000);
        } 
    }
});
  }
})

