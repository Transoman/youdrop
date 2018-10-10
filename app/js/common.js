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

  $('a[href=#]').click(function(e) {
    e.preventDefault();
  });

});