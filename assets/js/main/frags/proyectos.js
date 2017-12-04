var app = angular.module('myapp');

app.controller('proyectosCtrl', function($scope, $state, $rootScope, $http, mdDialog, Proyectos, Area, Campana) {

    $scope.bandera = {
        numero: 1,
        icon: 'view_column'
    }

    $scope.loadingPendientes = true;
    $scope.loadingProgresos = true;
    $scope.loadingTerminados = true;

    Proyectos.obtenerTodosLite().then(data => {
        $scope.proyectos = data;
    })

    $scope.loadingArea = true;
    Area.obtenerLite().then(function(data){
        $scope.areas = data;
        $scope.loadingArea = false;
    })

    $scope.loadingPrograma = true;
    Campana.obtenerCampana().then(function(data){
        $scope.programas = data;
        $scope.loadingPrograma = false;
    })

	$scope.irProyecto = function(status, proyecto){

		let nombre  =  _.snakeCase(proyecto.nombre);

        switch (status) {
            case 1:
                $state.go('pendiente', {'proyecto': proyecto.id, 'nombre': nombre})
                break;
            case 2:
                $state.go('progreso', {'proyecto': proyecto.id, 'nombre': nombre})
                break;
            case 3:
                $state.go('terminado', {'proyecto': proyecto.id, 'nombre': nombre})
                break;
            default:
        }
	}

    $scope.cambiar = function(bandera){

        switch (bandera.numero) {
            case 1:

                $scope.bandera = {
                    numero: 2,
                    icon: 'view_column'
                }

                $state.go('proyectos.vista2');

            case 2:

                $scope.bandera = {
                    numero: 1,
                    icon: 'format_list_bulleted'
                }

                $state.go('proyectos.vista1');

                break;
            default:

        }
    }

    $scope.busquedaPendiente = {
        offset : 0,
        limit : 5,
        where: {
            status_actual: 1
        },
        include : []
    }

    $scope.busquedaProgresos = {
        offset : 0,
        limit : 5,
        where: {
            status_actual: 2
        },
        include : []
    }

    $scope.busquedaTerminados = {
        offset : 0,
        limit : 5,
        where: {
            status_actual: 3,
        },
        include : []
    }

    $scope.next = function(array){

        switch (array.where.status_actual) {
            case 1:
                $scope.busquedaPendiente.offset+++$scope.busquedaPendiente;
                $scope.pedirPendientes();
                break;
            case 2:
                $scope.busquedaProgresos.offset+++$scope.busquedaProgresos;
                $scope.pedirProgresos();
                break;
            case 3:
                $scope.busquedaTerminados.offset+++$scope.busquedaTerminados;
                $scope.pedirTerminados();
                break;
            default:

        }
    }

    $scope.before = function(array){

        switch (array.where.status_actual) {
            case 1:
                $scope.busquedaPendiente.offset---$scope.busquedaPendiente;
                $scope.pedirPendientes();
                break;
            case 2:
                $scope.busquedaProgresos.offset---$scope.busquedaProgresos;
                $scope.pedirProgresos();
                break;
            case 3:
                $scope.busquedaTerminados.offset---$scope.busquedaTerminados;
                $scope.pedirTerminados();
                break;
            default:
        }
    }

    $scope.pedirPendientes = function(){

        $scope.loadingPendientes = true;
        Proyectos.filtro($scope.busquedaPendiente).then(function(data){
            $scope.pendientes = data.data;
            $scope.loadingPendientes = false;
            console.log(data);
        })
    }

    $scope.pedirProgresos = function(){

        $scope.loadingProgresos = true;
        Proyectos.filtro($scope.busquedaProgresos).then(function(data){
            $scope.progresos = data.data;
            $scope.loadingProgresos = false;
            console.log(data);
        })
    }

    $scope.pedirTerminados = function(){

        $scope.loadingTerminados = true;
        Proyectos.filtro($scope.busquedaTerminados).then(function(data){
            $scope.terminados = data.data;
            $scope.loadingTerminados = false;
            console.log(data);
        })
    }

    self = this;

    self.BuscarAreaChange = function(text) {}
    self.AreaSeleccionadoChange = function (item) {

        let peticion = [
            {
                model: 'areas',
                as: 'Areas',
                where: {
                    id: item.id
                }
            }
        ]

        $scope.busquedaPendiente.include = peticion;
        $scope.pedirPendientes();
        $scope.busquedaProgresos.include = peticion;
        $scope.pedirProgresos();
        $scope.busquedaTerminados.include = peticion;
        $scope.pedirTerminados();

    }


    self.BuscarProgramaChange = function(text) {}
    self.ProgramaSeleccionadoChange = function (item) {

        $scope.busquedaPendiente.where.id_campanas = item.id;
        $scope.pedirPendientes();
        $scope.busquedaProgresos.where.id_campanas = item.id;
        $scope.pedirProgresos();
        $scope.busquedaTerminados.where.id_campanas = item.id;
        $scope.pedirTerminados();

        console.log($scope.busquedaPendiente);
        console.log($scope.busquedaProgresos);
        console.log($scope.busquedaTerminados);
    }

});
