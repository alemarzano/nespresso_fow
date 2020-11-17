"use strict";

var icon = $('#click');
var overlay = $("#overlay");
var menuLinks = $('#menulinks');

function openNav() {

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
      link: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/909864595&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"'
    }, {
      evento: 'future',
      link: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/930959860&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
    }];

    var infos = [{
      evento: 'inteligencia',
      link: 'https://www.nespresso.com/ecom/medias/sys_master/public/13600473481246/infografia-inteligencia.jpg?'
    }, {
      evento: 'skill',
      link: 'https://www.nespresso.com/ecom/medias/sys_master/public/13699919478814/infografia-reskilling.jpg?'
    }, {
      evento: 'future',
      link: './media/infografia_future.jpg'
    }];

    var papers = [{
      evento: 'inteligencia',
      link: 'https://www.nespresso.com/ecom/medias/sys_master/public/13651366346782/paper-inteligencia.jpg?'
    }, {
      evento: 'skill',
      link: 'https://www.nespresso.com/ecom/medias/sys_master/public/13751079436318/paper-skill.jpg?'
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
    window.location.href = "https://www.nespresso.com/pro/ar/es/open-coffee-work-nespresso-professional"; //window.open('https://www.nespresso.com/ar/es/open-coffee-work-nespresso-professional')
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

  //* VIDEO WRAPPER * //

  $('.js-videoPoster').on('click', function (ev) {
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


  /**** QUOTES ******/
  var owlInv = $('#owl-inv');
  var citas = [{
      evento: 'inteligencia',
      quote: "La clave es el <strong>propósito</strong> que hay detrás de todo lo que se haga. Sin un propósito es más difícil sostener la <strong>motivación</strong> de las personas.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651367723038/quote-natura.jpg?",
      nombre: "Carolina Vincenzini",
      puesto: "Gerente RRHH",
      empresa: "Natura"
    },
    {
      evento: 'inteligencia',
      quote: "El primer desafío es convencernos de que los <strong>equipos colaborativos</strong> pueden tener una efectividad mayor.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651366936606/quote-bayer.jpg?",
      nombre: "Paula Curtale ",
      puesto: "Directora RRHH",
      empresa: "Bayer"
    },
    {
      evento: 'inteligencia',
      quote: "El desafío es desarrollar la capacidad de adaptarnos al <strong>futuro</strong> teniendo en cuenta las <strong>exigencias del presente</strong>.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651368378398/quote-toyota.jpg?",
      nombre: "Andrés Massuh",
      puesto: "Director RRHH",
      empresa: "Toyota"
    },
    {
      evento: 'inteligencia',
      quote: "Tenemos que desarrollar a nuestros talentos en la <strong>empatía</strong> y la <strong>colaboración</strong>.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651367526430/quote-disney.jpg?",
      nombre: "Mercedes De Belaustegui",
      puesto: "VP RRHH",
      empresa: "Disney"
    },
    {
      evento: 'inteligencia',
      quote: "La clave de la transformación es formar organizaciones <strong>ágiles, dinámicas y vivas</strong>.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651367657502/quote-galicia.jpg?",
      nombre: "Rafael Bergés",
      puesto: "Gerente de Personas",
      empresa: "Banco Galicia"
    },
    {
      evento: 'inteligencia',
      quote: "Tenemos que generar <strong>experiencias relevantes y significativas</strong> para que la gente sienta el placer de cambiar.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651368017950/quote-oracle.jpg?",
      nombre: "Carolina Florez",
      puesto: "VP Global Women in Tech",
      empresa: "Oracle"
    },
    {
      evento: 'inteligencia',
      quote: "Lo importante es generar entornos para que la <strong>creatividad</strong> exista pero para que también se transforme en una <strong>acción concreta</strong>.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651366805534/quote-accenture.jpg?",
      nombre: "Gastón Podestá",
      puesto: "Director RRHH",
      empresa: "Accenture"
    },
    {
      evento: 'inteligencia',
      quote: "Nuestro compromiso es atraer talentos y eso se logra con <strong>innovación, buen ambiente laboral y desafíos profesionales</strong>.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651368312862/quote-salesforce.jpg?",
      nombre: "Guido Ipszman",
      puesto: "CEO",
      empresa: "Salesforce"
    },
    {
      evento: 'inteligencia',
      quote: "Creo que las organizaciones tienen que tener una <strong>cultura</strong> fuerte, <strong>valores</strong> compartidos y <strong>líderes</strong> bien plantados.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651368181790/quote-pae.jpg?",
      nombre: "Romina Cavanna ",
      puesto: "VP RRHH",
      empresa: "Pan American Energy"
    },
    {
      evento: 'inteligencia',
      quote: "Lo importante es entender no sólo cómo <strong>colaboramos</strong> con nuestras personas sino también cómo <strong>trabajamos y aprendemos</strong> con el afuera.",
      foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651367788574/quote-nestle.jpg?",
      nombre: "María Fernanda Amado",
      puesto: "Directora RRHH",
      empresa: "Nestlé"
    },
    {
      evento:'skill',
      quote:'El desafío más importante es aprender a desaprender lo que uno viene haciendo hace mucho tiempo.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751079501854/quotes-dugarte.jpg?',
      nombre:'Marianella Dugarte',
      puesto:'Southern Cone People & Organization Head',
      empresa:'Novartis'
    },
    {
      evento:'skill',
      quote:'Tiene que haber un propósito inspirador para que la gente tenga ganas de aprender cosas nuevas como parte de la construcción de un todo distinto.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751079567390/quotes-aggio.jpg?',
      nombre:'José Manuel Aggio',
      puesto:'Vice Presidente RRHH',
      empresa:'YPF'
    },
    {
      evento:'skill',
      quote:'Es clave la incorporación de mentalidades distintas, aquellas que generan disrupción.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751079632926/quotes-gabrielloni.jpg?',
      nombre:'Natalia Gabrielloni',
      puesto:'Gerente Corporativo de Gestión Humana',
      empresa:'Falabella'
    },
    {
      evento:'skill',
      quote:'Un gran desafío es cómo reconvertimos y formamos en habilidades digitales a aquellas posiciones que van a tender a desaparecer.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751079698462/quotes-ibero.jpg?',
      nombre:'Mariana Ibero',
      puesto:'Directora de Capital Humano',
      empresa:'Farmacity'
    },
    {
      evento:'skill',
      quote:'Hay que hacer un ejercicio de mirar para adentro, mirar a los costados y ver dónde está el error para poder ser mejores y evolucionar.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751079927838/quotes-quinones.jpg?',
      nombre:'Constanza Quiñones',
      puesto:'Directora de RRHH',
      empresa:'SAP'
    },
    {
      evento:'skill',
      quote:'El primer paso para poder aprender es reconocerse uno mismo.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751080353822/quotes-cao.jpg?',
      nombre:'Melina Cao',
      puesto:'Directora de RRHH Cono Sur',
      empresa:'Unilever'
    },
    {
      evento:'skill',
      quote:'Uno mismo es responsable de gestionar su propio crecimiento.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751080452126/quotes-cura.jpg?',
      nombre:'Ines Cura',
      puesto:'COO Argentina Uruguay Paraguay',
      empresa:'IBM'
    },
    {
      evento:'skill',
      quote:'A la hora de construir equipos nos basamos en dos pilares: el learning agility de las personas y una cultura de beta continuo.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751081533470/quotes-silva.jpg?',
      nombre:'Sebastian Fernandez Silva',
      puesto:'Chief People Officer',
      empresa:'Mercado Libre'
    },
    {
      evento:'skill',
      quote:'El líder tiene un rol clave, es quien modela e impulsa la cultura.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751081599006/quotes-petrasso.jpg?',
      nombre:'Etel Petrasso',
      puesto:'Gerente de Cultura',
      empresa:'Nestlé'
    },
    {
      evento:'skill',
      quote:'Diversidad significa también generar herramientas de aprendizaje para distintos estilos de aprendizaje.',
      foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751081664542/quotes-vatausky.jpg?',
      nombre:'Veronica Vatausky',
      puesto:'Directora de RRHH',
      empresa:'L&#39;oréal'
    }, 
    {
      evento:'future',
      quote:'El desafío de RRHH es entender cómo podemos ser facilitadores para incentivar el propósito en los líderes.',
      foto:'./images/quotes/future/quote_kimberly.jpg',
      nombre:'Martín Pando',
      puesto:'HR Director South LAO',
      empresa:'Kimberly Clark'
    },
    {
      evento:'future',
      quote:'Creemos en líderes que dejen de tener respuestas y hagan preguntas, que dejen de tener al éxito como factor dominante, que sean vulnerables frente al error.',
      foto:'./images/quotes/future/quote_quilmes.jpg',
      nombre:'Santos Videla',
      puesto:'Director de Gente AR & UY',
      empresa:'Cervecería Quilmes'
    },
    {
      evento:'future',
      quote:'Las organizaciones tenemos el gran desafío post pandemia de trabajar en la empatía de los líderes.',
      foto:'./images/quotes/future/quote_companc.jpg',
      nombre:'Pablo Maison',
      puesto:'Chief Human Resources Officer',
      empresa:'Grupo Pérez Companc'
    },
    {
      evento:'future',
      quote:'Buscamos que cada colaborador pueda ser uno mismo, donde se sienta bien y pueda crecer',
      foto:'./images/quotes/future/quote_gsk.jpg',
      nombre:'Juan Martín Cassullo',
      puesto:'HR Director AR & UY',
      empresa:'GSK'
    },
    {
      evento:'future',
      quote:'Tenemos que trabajar en conectar el propósito individual con el propósito de las organizaciones.',
      foto:'./images/quotes/future/quote_pwc.jpg',
      nombre:'Pablo Granado',
      puesto:'Director de Capital Humano',
      empresa:'PWC'
    },
    {
      evento:'future',
      quote:'Lo fundamental es que cada una de las personas que trabajamos en una organización nos sintamos identificadas con el propósito.',
      foto:'./images/quotes/future/quote_santander.jpg',
      nombre:'Verónica Climent',
      puesto:'Directora de Gestión de Personas, Costos, Inmuebles y Seguridad',
      empresa:'Santander Argentina'
    },
    {
      evento:'future',
      quote:'Estamos trabajando en espacios que reflejen una conexión entre el hogar y la oficina para potenciar los vínculos profesionales y personales.',
      foto:'./images/quotes/future/quote_microsoft.jpg',
      nombre:'Silvina Uviz D&#39;Agostino',
      puesto:'HR Director AR, Enterprise & Public Sector LATAM',
      empresa:'Microsoft'
    },
    {
      evento:'future',
      quote:'El desafío es ver cómo generamos nuevas creencias para impulsar la cultura que queremos.',
      foto:'./images/quotes/future/quote_naranja.jpg',
      nombre:'Eugenia Patiño',
      puesto:'Subdirectora de Relaciones Humanas',
      empresa:'Naranja'
    },
    {
      evento:'future',
      quote:'Si bien lo virtual vino para quedarse, en la oficina se viven ciertos rituales de la organización donde la cultura se hace mucho más permeable.',
      foto:'./images/quotes/future/quote_nestle.jpg',
      nombre:'María Fernanda Amado',
      puesto:'HR Director Región Plata',
      empresa:'Nestlé'
    }
  ]

  var tabcontent = $('.tabcontent');
  tabcontent[0].style.display = "block";
  listarQuotes('inteligencia')
  $('.tablinks').on('click', function () {
    var buttonID = $(this).attr('id');
    listarQuotes(buttonID)
    $(tabcontent).each(function () {
      var tabID = $(this).attr('id');
      $(this).hide();
      if (tabID == buttonID) {
        $(this).show()
      }
    })
    $('.tablinks').each(function () {
      $(this).removeClass('active')
    })
    $(this).addClass('active');
  })

  function listarQuotes(tabEvent) {
    var listado = '';
    owlInv.empty();
    owlInv.trigger('destroy.owl.carousel')
    for (let unaCita = 0; unaCita < citas.length; unaCita++) {
      var autor = citas[unaCita];
      if (autor.evento == tabEvent) {
        listado += `
      <div class="item ">
        <img class="logo" src="https://www.nespresso.com/ecom/medias/sys_master/public/13570075426846/opencoffework.png?" alt="logo open coffee work">
        <h3>"${autor.quote}"</h3>
        <div class="autor">
          <div class="img" style="background-image: url('${autor.foto}');"></div>
          <div class="name">
            <h4>${autor.nombre}</h4>
            <p>${autor.puesto} - ${autor.empresa}</p>
          </div>
        </div>
      </div>`
      }

    }
    owlInv.append(listado)


    owlInv.owlCarousel({
      loop: true,
      nav: true,
      navText: ["<img src='https://www.nespresso.com/ecom/medias/sys_master/public/13569944813598/left.svg?'>", "<img src='https://www.nespresso.com/ecom/medias/sys_master/public/13570078375966/right.svg?'>"],
      dots: false,
      items: 1,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        767: {
          items: 2,
          slideBy: 1
        }
      }
    });
  }


});
