/**
 * code used to animate and change the height of the navbar and logos
**/

$( document ).ready(function() {      
    var is_mobile = false;

    if( $('#text').css('display')=='none') {
        is_mobile = true;       
    }

    // now i can use is_mobile to run javascript conditionally

    if (is_mobile == true) {
        //Conditional script here
        $('#logo').addClass('noAnimate');
  
  $('.navbar.navbar-inverse.navbar-fixed-top').addClass('shrink');
  $('.navbar.navbar-inverse.navbar-fixed-top').removeClass('big');
    } else {
        // Scroll code

$(window).scroll(function() {
    // If it scrolls more than 50 add the scrink class and remove the big class
  if ($(document).scrollTop() > 50) {
      
    $('nav').addClass('shrink');
    $('nav').removeClass('big');
      
    $('#logo').addClass('shrink');
    $('#logo').removeClass('big');
      
    $('#text').addClass('shrink');
    $('#text').removeClass('big');
   } else {
    // Else, add the big class and remove the shrink class
    $('nav').removeClass('shrink');
    $('nav').addClass('big');
      
    $('#logo').removeClass('shrink');
    $('#logo').addClass('big');
      
    $('#text').removeClass('shrink');
    $('#text').addClass('big');
  }
  // If the inner width of the device is less than 700, remove the classes
  if (window.innerWidth < 700) {
      
    $('#logo').removeClass('shrink');
    $('#logo').removeClass('big');
  }

});

// The below code changes the heights/widths of the logo and text

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
 });