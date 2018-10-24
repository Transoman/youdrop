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

  $('.btn-filter').click(function(e) {
    e.preventDefault();
    $('.filters').toggleClass('active');
  });

  $('.filters__close').click(function(e) {
    e.preventDefault();
    $('.filters').removeClass('active');
  });

  $('.drophistory__item').mouseover(function(e){
    var offset = $(this).offset().left - 25;

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

  $('.inventory__list-wrap').jScrollPane({
    autoReinitialise: true
  });
  $('.inventory__choice-list').jScrollPane({
    autoReinitialise: true
  });
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

  $('.account__trade-link').click(function() {
    $(this).select();
  });

   $('.inventory-modal').popup();

  function readMore() {
    var elem = $('.terms__wrap');
    var fullHeight = $('.terms__content').innerHeight();
    var maxHeight = 480;
    var moreText = 'Показать все';
    var lessText = 'Спрятать';
    var btn = $('.terms__more');

    $(window).resize(function(event) {
      fullHeight = $('.terms__content').innerHeight();
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

  $('.how-tabs').tabslet();

  function hideStickerSelect() {
    var radio = $('input[name=sticker]');
    var radioAny = $('#sticker-any');
    var selectHide = $('select[name=sticker_type]').parent();

    function checkRadio() {
      if (radioAny.prop('checked')) {
        selectHide.hide();
      }
      else {
        selectHide.show();
      }
    }

    checkRadio();

    radio.change(function(event) {
      checkRadio();
    });
  }

  hideStickerSelect();

  if ($('.filters__price')) {
    var sliderPrice = document.getElementById('filters__price');

    var minInput = document.querySelector('.form__field[name=price_from]');
    var maxInput = document.querySelector('.form__field[name=price_to]');

    var minPrice = parseInt(document.querySelector('.form__field[name=price_from]').getAttribute('min'), 10);
    var maxPrice = parseInt(document.querySelector('.form__field[name=price_to]').getAttribute('max'), 10);

    noUiSlider.create(sliderPrice, {
      start: [minPrice, maxPrice / 1.5 ],
      step: 1,
      connect: true,
      range: {
        'min': minPrice,
        'max': maxPrice
      }
    });

    sliderPrice.noUiSlider.on('update', function (values, handle) {
      minInput.value = parseInt(values[0], 10);
      maxInput.value = parseInt(values[1], 10);
    });

    minInput.addEventListener('change', function () {
      sliderPrice.noUiSlider.set([this.value,]);
    });

    maxInput.addEventListener('change', function () {
      sliderPrice.noUiSlider.set([,this.value]);
    });
  }

});