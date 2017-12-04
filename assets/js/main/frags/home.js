var app = angular.module('myapp');

app.controller('homeCtrl', function($scope, $state, $rootScope, $timeout ,$stateParams, $http, Facebook, $transitions) {


    FB.getAccessToken(function(response) {
    });

    FB.getLoginStatus(function(response) {
    });

    $scope.posteo = function(){
        mensaje = {message: 'Esto es un mensaje'}
        FB.api('/me/feed', 'post', function(data){
            console.log(data);
        })
    }

    $scope.vistas = [
        {destino: 'home.primero'},
        {destino: 'home.segundo'},
        {destino: 'home.tercero'}
    ];

    $scope.currentIndex = 0;
    $scope.actualvista = $scope.vistas[0];

    $scope.next = function(actualvista) {
        $scope.currentIndex < $scope.vistas.length - 1
            ? $scope.currentIndex++
            : $scope.currentIndex = 0;

        $state.go($scope.vistas[$scope.currentIndex].destino)

    };

    $scope.prev = function() {
        $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.vistas.length - 1;
    };

    $scope.$watch('currentIndex', function() {
        $scope.vistas.forEach(function(image) {
            image.visible = false;
        });
    });

    var sliderFunc = function(valor) {

        $scope.timer = $timeout(function() {
            $scope.next($scope.actualvista.id);


                    sliderFunc();

            }, 5000);
    };

    $transitions.onStart({}, trans => {

        $timeout.cancel($scope.timer)
        console.log('se cancelo');

    });

    sliderFunc();

    $scope.anecdotas = [
        {
            imagen: 'https://instagram.fpbc1-1.fna.fbcdn.net/t51.2885-19/s320x320/14474410_1811007275853200_3038384840148779008_a.jpg',
            nombre: 'Ulises',
            comentario: 'Me gusto mucho participar en este lugar',
            proyecto: 'Recojer Basura'
        },
        {
            imagen: 'https://instagram.fpbc1-1.fna.fbcdn.net/t51.2885-19/s320x320/14240449_855726721193810_1534148475_a.jpg',
            nombre: 'Arely',
            comentario: 'Me gusto mucho participar en este lugar',
            proyecto: 'Construcción de vivienda en Xalapa'
        },
        {
            imagen: 'https://instagram.fpbc1-1.fna.fbcdn.net/t51.2885-19/s320x320/16464952_1235677669802878_9101300798490411008_a.jpg',
            nombre: 'Maggy',
            comentario: 'Me gusto mucho participar en este lugar',
            proyecto: 'Entrega de dulces en hospital'
        },
        {
            imagen: 'https://instagram.fpbc1-1.fna.fbcdn.net/t51.2885-19/s320x320/20635138_452155238499575_9067443605655781376_a.jpg',
            nombre: 'Monica',
            comentario: 'Me gusto mucho participar en este lugar',
            proyecto: 'Construcción de casa en algún otro lugar'
        }
    ];

});
