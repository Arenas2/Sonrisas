var app = angular.module('myapp');

app.controller('nuevoproyectoCtrl', function($scope, $state, Proyectos, Campana, Area) {

    $scope.proyecto = {
        pendiente : {},
        progreso : {},
        terminado : {}
    }

    Campana.obtenerCampana().then(function(data) {
        $scope.campanas = data.data;
        console.log(data);
    })

    Area.obtener().then(function(data) {
        $scope.areas = data.data;
        console.log(data);
    })

    $scope.cambiar = function(status) {
        switch (status) {
            case 1:
                $state.go('paso1.pendiente')
                break;
            case 2:
                $state.go('paso1.progreso')
                break;
            case 3:
                $state.go('paso1.terminado')
                break;
            default:

        }
    }

    $scope.submit = (proyecto) => {

        console.log(proyecto)
        console.log($scope.proyecto)

        Proyectos.crear(proyecto).then(res => {
            console.log(res)
        })

    }


});
