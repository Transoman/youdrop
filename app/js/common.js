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

  $('.inventory__list-wrap').jScrollPane();
  $('.inventory__choice-list').jScrollPane();
  $('.inventory-modal__wrap').jScrollPane({
    autoReinitialise: true
  });

  $('.inventory-modal__item').click(function(e) {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
    }
    else {
      $(this).removeClass('active');
    }
  });

  // $(document).mouseup(function (e){ // событие клика по веб-документу
  //   var div = $(".inventory-modal"); // тут указываем ID элемента
  //   if (!div.is(e.target) // если клик был не по нашему блоку
  //       && div.has(e.target).length === 0) { // и не по его дочерним элементам
  //     div.hide(); // скрываем его
  //   }
  // });

  $('.inventory-out_show').click(function(e) {
    e.preventDefault();
    $('#inventory-out').show();
  });

  $(document).keydown(function(event) { 
    if (event.keyCode == 27) { 
      $('.inventory-modal-wrap').hide();
    }
  });

  function readMore() {
    var elem = $('.terms__wrap');
    var fullHeight = $('.terms__content').innerHeight();
    var maxHeight = 480;
    var moreText = 'Показать все';
    var lessText = 'Спрятать';
    var btn = $('.terms__more');

    $(window).resize(function(event) {
      fullHeight = $('.terms__content').innerHeight();
      console.log(fullHeight);
      if (parseInt(elem.css('height'), 10) != fullHeight && parseInt(elem.css('height'), 10) != maxHeight) {
        elem.css('height', maxHeight).animate({
            height: fullHeight,
            },
            1000, function() {
              
          });
      }
    });

    elem.css({
      height: maxHeight
    })

    btn.click(function(e) {
      e.preventDefault();

      if (parseInt(elem.css('height'), 10) != fullHeight) {
        elem.css('height', maxHeight).animate({
          height: fullHeight,
          },
          1000, function() {
            elem.addClass('active');
            btn.html(lessText);
        });
      }
      else {
        elem.animate({
          height: maxHeight,
          },
          1000, function() {
            elem.css('height', maxHeight);
            elem.removeClass('active');
            btn.html(moreText);
        });
      }

      
    });
  }

  readMore();

});