var app = angular.module('myapp');

app.controller('proyectosTerminadoCtrl', function($scope, $state, $stateParams, $localStorage, $rootScope, $http, mdDialog, ProyectosTerminado, Evento, Imagen, Usuario) {

    $scope.loaderProyectoTerminado = true;
    if($stateParams.proyecto === null){
        $state.go('proyectos.vista1')
    }else{
        var idproyecto = $stateParams.proyecto;
        var status = 3;
        if($scope.usuario === undefined){
            var token = $localStorage.token;
            Usuario.token(token).then(data => {
                $scope.usuario = data.user;
            })
            console.log('obtuve el usuario');
        }

        ProyectosTerminado.obtener(idproyecto).then(function(data){

            $scope.proyecto = data;
            $scope.loaderProyectoTerminado = false;
            console.log(data);
            $scope.fotoportada = _.find(data.Status.Terminado.Imagenes, ['portada', 1]);
        })

        // Imagen.obtenerStatus($stateParams.proyecto,status).then(function(data){
        //     $scope.imagenes = data;
        //     console.log(data);
        // })

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
        ]

    }

});
