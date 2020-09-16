"use strict";

var icon = $('#click');
var overlay = $("#overlay");
var menuLinks = $('#menulinks');

function openNav() {
  // document.getElementById("menulinks").style.width = "250px";
  // document.querySelector('body').style.overflow = "hidden"
  // overlay.style.opacity = '.7'
  // overlay.style.height = '100vh'
  // icon.setAttribute('onclick', 'closeNav()');
  // icon.innerHTML = "<img src='images/close.svg' alt=''>";
  $(menuLinks).css({
    'width': '250px',
    'top': '52px'
  });
  $(overlay).css({
    'opacity': '.7',
    'display': 'block'
  });
  $(icon).attr('onclick', 'closeNav()');
  $(icon).html("<img src='https://www.nespresso.com/ecom/medias/sys_master/public/13569792311326/close.svg?' alt=''>");
}

function closeNav() {
  // document.getElementById("menulinks").style.width = "0";
  // document.querySelector('body').style.overflow = "inherit"
  // overlay.style.opacity = '0';
  // overlay.style.height = '0'
  // icon.setAttribute('onclick', 'openNav()');
  // icon.innerHTML = "<img src='images/menu.svg' alt=''>";
  $(menuLinks).css({
    'width': '0'
  });
  $(overlay).css({
    'display': 'none',
    'opacity': '0'
  });
  $(icon).attr('onclick', 'openNav()');
  $(icon).html("<img src='https://www.nespresso.com/ecom/medias/sys_master/public/13569944748062/menu.svg?' alt=''>");
}

$(overlay).click(function () {
  closeNav();
});
$(document).ready(function () {
  /**********/
  var owlInv = $('#owl-inv');
  owlInv.owlCarousel({
    loop: true,
    nav: true,
    navText: ["<img src='https://www.nespresso.com/ecom/medias/sys_master/public/13569944813598/left.svg?'>", "<img src='https://www.nespresso.com/ecom/medias/sys_master/public/13570078375966/right.svg?'>"],
    dots: false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      767: {
        items: 2,
        slideBy: 2
      }
    }
  });
  /***** POPUP EVENTOS *****/

  var dialog_steps = $("#dialog-steps").dialog({
    autoOpen: false,
    minHeight: 560,
    width: 'auto',
    maxWidth: 600,
    draggable: false,
    modal: true,
    fluid: true,
    resizable: false,
    showTitleBar: false,
    close: closeModal,
    create: function create(event, ui) {
      // Set maxWidth
      $(this).css("maxWidth", "660px");
    },
    position: {
      my: 'center',
      at: 'center'
    }
  });
  var botonModal = $('.open-dialog');
  var audioDiv = dialog_steps.children('form').find('.holder');
  var mp3Player = audioDiv.children('iframe');
  var divVariable = dialog_steps.children('form').find('#contenidoVariable');
  $(botonModal).on("click", function () {
    var content = $(this).data('content');
    var tab = $(this).data('evento');
    var podcasts = [{
      evento: 'inteligencia',
      link: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/893804278&color=%23b99a62&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
    }, {
      evento: 'skill',
      link: './media/podcast_.mp3'
    }, {
      evento: 'future',
      link: './media/podcast_.mp3'
    }];
    var infos = [{
      evento: 'inteligencia',
      link: 'https://www.nespresso.com/ecom/medias/sys_master/public/13600473481246/infografia-inteligencia.jpg?'
    }, {
      evento: 'skill',
      link: './media/'
    }, {
      evento: 'future',
      link: './media/'
    }];
    var papers = [{
      evento: 'inteligencia',
      link: './media/.jpg'
    }, {
      evento: 'skill',
      link: './media/.jpg'
    }, {
      evento: 'future',
      link: './media/.jpg'
    }];
    var imagen = '';

    switch (content) {
      case 'info':
        for (var index in infos) {
          if (tab == infos[index].evento) var link = infos[index].link;
          var imagen = "<img style=\"max-width:100%\" src=\"" + link + "\" alt=\"\">";
        }

        $(divVariable).append(imagen);
        break;

      case 'paper':
        for (var _index in papers) {
          if (tab == papers[_index].evento) var link = papers[_index].link;
          var imagen = "<img style=\"max-width:100%\" src=\"" + link + "\" alt=\"\">";
        }

        $(divVariable).append(imagen);
        break;

      case 'podcast':
        for (var _index2 in podcasts) {
          if (tab == podcasts[_index2].evento) var link = podcasts[_index2].link;
          mp3Player.attr('src', link);
        }
        console.log(mp3Player)
        $(audioDiv).addClass('display');
        // togglePlay();
        break;

      default:
        break;
    }

    dialog_steps.dialog("open");
    $(overlay).show('fade');
  });
  $('.close').on('click', function () {
    dialog_steps.dialog('close');
  });

  function closeModal() {
    $(overlay).hide('fade');
    restartDialog(); // .show()

    if (audioDiv.hasClass('display')) {
      mp3Player.attr('src', '')
      audioDiv.removeClass('display');
    }
  }

  function restartDialog() {
    var fieldsets = $('form > fieldset');
    $(divVariable).empty();
    $(fieldsets).each(function (element, value) {
      $(value).hide().css({
        'transform': 'scale(1)',
        'position': 'relative'
      });
    });
    $(fieldsets[0]).css({
      'opacity': '1',
      'transform': 'scale(1)',
      'position': 'relative',
      'display': 'block'
    });
  }

  function thankYou() {
    window.location.href = "https://www.nespresso.com/ar/es/open-coffee-work-nespresso-professional"; //window.open('https://www.nespresso.com/ar/es/open-coffee-work-nespresso-professional')
  }
  /**** POPUP STEPS******/


  var current_fs, next_fs, previous_fs; //fieldsets

  var left, opacity, scale; //fieldset properties which we will animate

  var animating; //flag to prevent quick multi-click glitches

  $(".next.btn").click(function () {
    if (animating) return false;
    animating = true;
    current_fs = $(this).parent();
    next_fs = $(this).parent().next(); //show the next fieldset

    next_fs.show(); //hide the current fieldset with style

    if ($('.holder').hasClass('display')) {
      mp3Player.attr('src', '')
    }

    current_fs.animate({
      opacity: 0
    }, {
      step: function step(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2; //2. bring next_fs from the right(50%)

        left = now * 50 + "%"; //3. increase opacity of next_fs to 1 as it moves in

        opacity = 1 - now;
        current_fs.css({
          'transform': 'scale(' + scale + ')',
          'position': 'absolute'
        });
        next_fs.css({
          'left': left,
          'opacity': opacity
        });
      },
      duration: 800,
      complete: function complete() {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  });
  $(".previous.btn").click(function () {
    if (animating) return false;
    animating = true;
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev(); //de-activate current step on progressbar

    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active"); //show the previous fieldset

    previous_fs.show(); //hide the current fieldset with style

    current_fs.animate({
      opacity: 0
    }, {
      step: function step(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2; //2. take current_fs to the right(50%) - from 0%

        left = (1 - now) * 50 + "%"; //3. increase opacity of previous_fs to 1 as it moves in

        opacity = 1 - now;
        current_fs.css({
          'left': left
        });
        previous_fs.css({
          'transform': 'scale(' + scale + ')',
          'opacity': opacity,
          'position': 'relative'
        });
      },
      duration: 800,
      complete: function complete() {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  });
  /***** TABS ****/

  var tabcontent = document.getElementsByClassName("tabcontent");
  tabcontent[0].style.display = "block";

  function openTab(evt, tabName) {
    // Declare all variables
    var i, tablinks; // Get all elements with class="tabcontent" and hide them

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    } // Get all elements with class="tablinks" and remove the class "active"


    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    } // Show the current tab, and add an "active" class to the button that opened the tab


    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";


  }
    //* VIDEO WRAPPER * //
    
  $('.js-videoPoster').on('click',function (ev) {
    ev.preventDefault();
    var $poster = $(this);
    var $wrapper = $poster.closest('.js-videoWrapper');
    videoPlay($wrapper);
  });

  // play the targeted video (and hide the poster frame)
  function videoPlay($wrapper) {
    var $iframe = $wrapper.find('.js-videoIframe');
    var src = $iframe.data('src');
    // hide poster
    $wrapper.addClass('videoWrapperActive');
    // add iframe src in, starting the video
    $iframe.attr('src', src);
  }




});