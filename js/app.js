"use strict";

var app = angular.module('FowApp', []);
app.directive('myAmount', function () {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs) {
      scope.$watch(attrs['ngModel'], function (v) {
        console.log('value changed, new value is: ' + v);
      });
    }
  };
});
// app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
app.controller('oradoresCtrlr', function ($scope) {
  $scope.oradores = [
    {
    id: "01",
    nombre: "Alejandro Melamed",
    foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13569936916510/melamed.jpg",
    rol: "Ambassador",
    descripcion: "Director de Humanize Consulting. Referente en temas del futuro del trabajo, liderazgo y cultura organizacional. Fue VP  de RRHH de Coca Cola, Gerente de RRHH de Molinos Rio de la Plata y consultor senior de Arthur Andersen, entre otras actividades."
  }, 
  {
    id:'02',
    nombre:'Javier Bajer',
    foto:'https://www.nespresso.com/ecom/medias/sys_master/public/13751076880414/bajer.jpg?',
    rol:'Speaker',
    descripcion:'Definido por el periódico The Guardian como ‘Arquitecto Cultural’, con una maestría en Neurociencias y un Doctorado en Cognición Social, Javier trabaja con empresas globales y gobiernos para ayudarlos a acelerar cambios en sus culturas y poder ver los resultados de sus estrategias. Javier es keynote speaker international basado en Londres. En 2019 fue reconocido en la portada de La Nación Revista como uno de los argentinos influyentes en el exterior.'
  },
    {
    id: "03",
    nombre: "Isela Costantini",
    foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13651370082334/costantini.jpg?",
    rol: "Speaker",
    descripcion: "Comunicadora Social. Fue Presidente en GM para Argentina, Uruguay y Paraguay, en Aerolíneas Argentinas y desde el 2017 es Presidente de la holding financiera GST. Reconocida como CEO del Año por la Revista Apertura y PwC. Recibió el premio Merco de reputación empresarial, CEO del año por Ernst & Young y premio Konex por Líderes de Industria."
  }, {
    id: "04",
    nombre: "Facundo Manes",
    foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13569937145886/manes.jpg",
    rol: "Speaker",
    descripcion: "Neurocientífico y neurólogo. Investigador del CONICET y presidente honorario de Fundación INECO. Profesor de neurociencias cognitivas, presidente electo de la ISFTD y consultor del MRC Cognition and Brain Sciences Unit de la Universidad de Cambridge."
  }, {
    id: "05",
    nombre: "Carla Quiroga",
    foto: "https://www.nespresso.com/ecom/medias/sys_master/public/13569937866782/quiroga.jpg",
    rol: "Moderadora",
    descripcion: "Periodista con más de 25 años de experiencia  en los medios. Trabajó en canal 7, 26 TV, Telefe y P&E. También en la revista Negocios, el diario El Cronista y la revista Apertura. Actualmente es editora de los suplementos de propiedades e inmuebles comerciales del diario La Nación y columnista en la LN+."
  }
  
];

  $scope.oradorActivo = $scope.oradores[0];
  $('.owl-oradores').on('translated.owl.carousel', function (e) {
    $scope.oradorActivo = [];
    $('.orador-text').css({
      opacity: 0
    });
    setTimeout(function () {
      var idActivo = $('.owl-oradores .owl-item')[e.item.index];
      idActivo = $(idActivo).children('.item').data('index');

      for (var orador in $scope.oradores) {
        var $this = $scope.oradores[orador];

        if ($this.id == idActivo) {
          $('.orador-text').css({
            opacity: 1
          });
          $scope.oradorActivo = $this;
          $scope.$apply();
        }
      }
    }, 250);
  });
});
