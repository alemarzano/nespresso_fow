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
app.controller('oradoresCtrlr', function ($scope) {
  $scope.oradores = [{
    "id": "01",
    "nombre": "Alejandro Melamed",
    "foto": "https://www.nespresso.com/ecom/medias/sys_master/public/13569936916510/melamed.jpg",
    "rol": "Ambassador",
    "descripcion": "Director de Humanize Consulting. Referente en temas del futuro del trabajo, liderazgo y cultura organizacional. Fue VP  de RRHH de Coca Cola, Gerente de RRHH de Molinos Rio de la Plata y consultor senior de Arthur Andersen, entre otras actividades."
  }, {
    "id": "02",
    "nombre": "Facundo Manes",
    "foto": "https://www.nespresso.com/ecom/medias/sys_master/public/13569937145886/manes.jpg",
    "rol": "Speaker",
    "descripcion": "Neurocientífico y neurólogo. Investigador del CONICET y presidente honorario de Fundación INECO. Profesor de neurociencias cognitivas, presidente electo de la ISFTD y consultor del MRC Cognition and Brain Sciences Unit de la Universidad de Cambridge."
  }, {
    "id": "03",
    "nombre": "Carla Quiroga",
    "foto": "https://www.nespresso.com/ecom/medias/sys_master/public/13569937866782/quiroga.jpg",
    "rol": "Moderadora",
    "descripcion": "Periodista con más de 25 años de experiencia  en los medios. Trabajó en canal 7, 26 TV, Telefe y P&E. También en la revista Negocios, el diario El Cronista y la revista Apertura. Actualmente es editora de los suplementos de propiedades e inmuebles comerciales del diario La Nación y columnista en la LN+."
  }];
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
app.controller('citasCtrlr', function ($scope) {
  $scope.citas = [{
    "quote": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quae cumque asperiores facere dolorem.Cumque?",
    "foto": "foto.webp",
    "nombre": "Lorem, ipsum",
    "puesto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
  }, {
    "quote": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quae cumque asperiores facere dolorem.Cumque?",
    "foto": "foto.webp",
    "nombre": "Lorem, ipsum",
    "puesto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
  }];
});