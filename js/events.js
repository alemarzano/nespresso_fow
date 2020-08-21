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
  $(icon).html("<img src='images/close.svg' alt=''>");
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
  $(icon).html("<img src='images/menu.svg' alt=''>");
}

$(overlay).click(function () {
  closeNav();
});

var tabcontent = document.getElementsByClassName("tabcontent");
tabcontent[0].style.display = "block";

function openCity(evt, cityName) {
  // Declare all variables
  var i, tablinks; // Get all elements with class="tabcontent" and hide them

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  } // Get all elements with class="tablinks" and remove the class "active"


  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  } // Show the current tab, and add an "active" class to the button that opened the tab


  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

$(document).ready(function () {
  /**********/
  var owlInv = $('#owl-inv');
  owlInv.owlCarousel({
    loop: true,
    nav: true,
    navText: ["<img src='./images/left.svg'>", "<img src='./images/right.svg'>"],
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
  /**********/

  var dialog_steps = $("#dialog-steps").dialog({
    autoOpen: false,
    minHeight: 560,
    width: 'auto',
    maxWidth: 600,
    draggable: false,
    modal: true,
    fluid: true,
    resizable: false,
    showTitleBar:false,
    close: closeModal,
    create: function( event, ui ) {
      // Set maxWidth
      $(this).css("maxWidth", "660px");
    },
    position: {
      my: 'center',
      at: 'center'
    }
  });

  var botonModal = $('.open-dialog');
  $(botonModal).on("click", function () {
    dialog_steps.dialog("open");
    $(overlay).show('fade');
  });
  $('.close').on('click', function () {
    dialog_steps.dialog('close');
  });

  function closeModal() {
    $(overlay).hide('fade');
    restartDialog(); // .show()
  }

  function restartDialog() {
    var fieldsets = $('#msform > fieldset');
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
    // window.location.href = "thankyou.html";
    window.open('thankyou.html')
  }
  /**********/


  var current_fs, next_fs, previous_fs; //fieldsets

  var left, opacity, scale; //fieldset properties which we will animate

  var animating; //flag to prevent quick multi-click glitches

  $(".next.btn").click(function () {
    if (animating) return false;
    animating = true;
    current_fs = $(this).parent();
    next_fs = $(this).parent().next(); //show the next fieldset

    next_fs.show(); //hide the current fieldset with style

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

});