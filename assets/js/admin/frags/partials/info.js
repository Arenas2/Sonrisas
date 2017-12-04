var app = angular.module('myapp');

app.controller('infoCtrl', function($scope, $state, $rootScope, $timeout ,$stateParams, $http, Facebook, Campana, Area, $transitions, Proyectos) {

    $scope.seccion = 'info';

    var idProyecto = $stateParams.idProyecto;

    Campana.obtenerCampana().then(function(data) {
        $scope.campanas = data.data;
        $scope.$digest();
    })

    Area.obtener().then(function(data) {
        $scope.areas = data.data;
    })

	$scope.editar = function(proyecto){

        Proyectos.editarProyecto(proyecto).then(res => {
            // $scope.proyectoCreado.push = data;
            // $state.go('proyectos');
            console.log(data);
        })

	}

});
