var app = angular.module('myapp');

app.controller('proyectosCtrl', function($scope, $rootScope, $state, $stateParams, $http, mdDialog, $mdDialog, Proyectos, Campana, Imagen, Evento, Area, Material, Ubicacion) {



    $scope.irProyecto = function(proyecto){

        console.log(proyecto)

        let nombre  =  _.snakeCase(proyecto.nombre);

        $state.go('proyecto', { id : proyecto.id, status: proyecto.status_actual , nombre : nombre } )

    }

    Proyectos.obtener().then(res => {
        $scope.proyectos = res.data;
        $scope.$digest();
    })



});
