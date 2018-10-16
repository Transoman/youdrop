jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $('.header__nav').toggleClass('open');
  });

  $('.nav__close').click(function(e) {
    e.preventDefault();
    $('.header__nav').removeClass('open');
  })

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // $('a[href=#"]').click(function(e) {
  //   e.preventDefault();
  // });

  $('.drophistory__item').mouseover(function(e){
    var offset = $(this).offset().left - 25;
    // console.log();

    if (offset + 250 > $(window).innerWidth()) {
      offset = $(window).innerWidth() - 205;
    }
    else if (offset < 45) {
      offset = 10
    }

    $('.drophistory-hover').css({
      left: offset
    }).removeClass('hidden');
  });

  $('.drophistory__item').mouseout(function() {
    $('.drophistory-hover').addClass('hidden');
  });

});