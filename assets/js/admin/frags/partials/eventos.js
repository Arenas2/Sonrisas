var app = angular.module('myapp');

app.controller('eventosCtrl', function($scope, $state, $rootScope, $timeout, $stateParams, Proyectos, Evento, alertas) {


    var id = $stateParams.id;
    var status = $stateParams.status

    $scope.seleccion = 0;

    Evento.proyecto(id).then(res => {
        console.log(res)
        $scope.eventos = res.data;
        $scope.$digest();
        console.log($scope.eventos);
    })

    $scope.focus = function(evento){

        console.log('se hizo focus')
        evento ? ($scope.evento = evento) : ($scope.evento = {});
    }

    $scope.clear = function(){

        console.log('se clear')
        delete $scope.evento;
    }

    $scope.submit = function(evento){
        //
        console.log(id)
        evento.id_proyecto = id;

        evento.id === undefined ? (

            console.log(evento),

			Evento.crear(evento).then(res => {
		           alertas.mostrarToastEstandar("Se ha creado el evento");
		           $scope.eventos.push(res.data);
		           delete $scope.evento
		    })

        ) : (

            Evento.editar(evento).then(res => {
                alertas.mostrarToastEstandar("Se ha editado el evento");
		        delete $scope.evento

            })
        );

        console.log(evento)
    }

    $scope.eliminar = function(evento){
        Evento.eliminar(evento.id).then(data => {
            alertas.mostrarToastEstandar("Evento eliminada");
        })
    }

});
