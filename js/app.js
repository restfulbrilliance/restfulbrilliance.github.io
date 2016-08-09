(function($) {
	"use strict";

  $(document).foundation();

  //Run When Document Ready
  $(document).on('ready', function() { 
  	initPreloader();
    initInlineMenu();
    initOverlayMenu();
    initParallaxFx();
    initCounters();
    initProgressBars();
    initLightboxGallery();
    initMailChimp();
  });

  //Page Preloader
  //===================================
  function initPreloader() {
  	$(".fakeloader").fakeLoader({
      timeToHide:1200,
      bgColor:"#ffffff",
      spinner:"spinner2"
    });

    $(".flbackdrop").remove();
  }

  //Inline Menu
  //===================================
  function initInlineMenu() {
    $('#menuIcon').on('click', function(){
      $(this).toggleClass('open');
    });
  }

  //Overlay Menu
  //===================================
  function initOverlayMenu() {
    $('#menuIcon').on('click', function(){
      $('.menuOverlay').toggleClass('open');
    });
  }

  //Parallax Elements
  //===================================
  function initParallaxFx() {
    $(".parallaxElem").panr({
      moveTarget: $(document),
      sensitivity: 15,
      scale: false,
      panY: true,
      panX: true,
      panDuration: 1.25,
      resetPanOnMouseLeave: true
    });

    // function onEnterFunction(el) {
    //   console.log('on enter' + el);
    // }

    // function onLeaveFunction(el) {
    //   console.log('on leave' + el);
    // }
  }

  //Counters
  //===============================================================================
  function initCounters() {
    $('.timer').appear(function () {
      $(this).countTo();
    });   
  }

  //Progress Bars
  //===============================================================================
  function initProgressBars() {
    $('.pro-bar').each(function(i, elem) {
      var $elem = $(this),
        percent = $elem.attr('data-pro-bar-percent'),
        delay = $elem.attr('data-pro-bar-delay');

      if (!$elem.hasClass('animated'))
      $elem.css({ 'width' : '0%' });

      $(elem).appear(function () {
        setTimeout(function() {
          $elem.animate({ 'width' : percent + '%' }, 2000, 'easeInOutExpo').addClass('animated');
        }, delay);
      });
    });
  }

  //Lightbox Gallery
  //===============================================================================
  function initLightboxGallery() {
    $('.lightboxGallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      fixedContentPos: true,
      overflowY: 'hidden',
      closeBtnInside: false,
      image: {
        verticalFit: true,
        titleSrc: function(item) {
          return item.el.attr('title');
        }
      },
      gallery: {
        enabled: true,
        navigateByImgClick: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        easing: 'ease-in-out',
        opener: function(element) {
          return element.find('img');
        }
      }
      
    });
  }

  //MailChimp
  //===============================================================================
  function initMailChimp() {
    $('#mc_form').ajaxChimp({
        language: 'pix',
        // Replace url with your unique list
        url: 'http://yourusername.us3.list-manage.com/subscribe/post?u=xxxxxxxxxxxxxxxxxxxxxxxxx&id=xxxxxxxxxx'
    });

    //Mailchimp translation
      //
      // Defaults:
      //'submit': 'Submitting...',
      //  0: 'We have sent you a confirmation email',
      //  1: 'Please enter a value',
      //  2: 'An email address must contain a single @',
      //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
      //  4: 'The username portion of the email address is invalid (the portion before the @: )',
      //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.pix = {
        'submit': 'Submitting...',
        0: '<i class="icon-check"></i> Thank you! We have sent you a confirmation email!',
        1: '<i class="icon-cross"></i> You must enter a valid e-mail address.',
        2: '<i class="icon-cross"></i> E-mail address is not valid.',
        3: '<i class="icon-cross"></i> E-mail address is not valid.',
        4: '<i class="icon-cross"></i> E-mail address is not valid.',
        5: '<i class="icon-cross"></i> E-mail address is not valid.'
    };
  }

})(jQuery);

