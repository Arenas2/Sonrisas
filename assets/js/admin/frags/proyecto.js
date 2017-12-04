var app = angular.module('myapp');

app.controller('proyectoCtrl', function($scope, $rootScope, $state, $stateParams, $http, mdDialog, $mdDialog, Proyectos, Campana, Imagen, Evento, Area, Material, Ubicacion) {


    var id = $stateParams.id;

    Proyectos.one(id).then(res => {
        $scope.proyecto = res.data;
        $scope.$digest();
    })

    $scope.irProyecto = function(proyecto){

        console.log(proyecto)

        let nombre  =  _.snakeCase(proyecto.nombre);

        $state.go('proyecto', { id : proyecto.id, status: proyecto.status, nombre : nombre } )

    }

    $scope.status = function(id) {
        switch (id) {
            case 1:
                return 'pendiente'
                break;

            case 2:
                return 'progreso'
                break;

            case 3:

                return 'terminado'
                break;
            default:

        }
    }

    // $scope.editarProyecto = function(info) {
    //     console.log($scope.proyecto.id)
    //     switch ($scope.proyecto.status_actual) {
    //         case 1:
    //             $scope.proyectos = {
    //                 "id": $scope.proyecto.id,
    //                 "nombre": $scope.proyecto.nombre,
    //                 "descripcion": $scope.proyecto.descripcion,
    //                 "status_actual": $scope.proyecto.status_actual,
    //                 "campana_actual": $scope.proyecto.campana_actual,
    //                 "area_actual": $scope.proyecto.area_actual,
    //                 "id_campanas": $scope.proyecto.Id_campana,
    //                 "ubicacion_actual": $scope.proyecto.ubicacion_actual,
    //                 "Status": $scope.pendientes = {
    //                     "Pendiente": $scope.pendientes = {
    //                         "objetivos": info.Status.Pendiente.objetivos,
    //                         "tareas": info.Status.Pendiente.tareas
    //                     },
    //                     "Progreso": {},
    //                     "Terminado": {}
    //                 }
    //             }
    //
    //             break;
    //         case 2:
    //             $scope.proyectos = {
    //                 "id": $scope.proyecto.id,
    //                 "nombre": $scope.proyecto.nombre,
    //                 "descripcion": $scope.proyecto.descripcion,
    //                 "status_actual": $scope.proyecto.status_actual,
    //                 "campana_actual": $scope.proyecto.campana_actual,
    //                 "area_actual": $scope.proyecto.area_actual,
    //                 "id_campanas": $scope.proyecto.Id_campana,
    //                 "ubicacion_actual": $scope.proyecto.ubicacion_actual,
    //                 "Status": $scope.progreso = {
    //                     "Pendiente": {},
    //                     "Progreso": $scope.progreso = {
    //                         "reportes_avance": info.Status.Progreso.reportes_avance,
    //                         "fechas_avance": info.Status.Progreso.fechas_avance
    //                     },
    //                     "Terminado": {}
    //                 }
    //             }
    //
    //             break;
    //         case 3:
    //             $scope.proyectos = {
    //                 "id": $scope.proyecto.id,
    //                 "nombre": $scope.proyecto.nombre,
    //                 "descripcion": $scope.proyecto.descripcion,
    //                 "status_actual": $scope.proyecto.status_actual,
    //                 "campana_actual": $scope.proyecto.campana_actual,
    //                 "area_actual": $scope.proyecto.area_actual,
    //                 "id_campanas": $scope.proyecto.Id_campana,
    //                 "ubicacion_actual": $scope.proyecto.ubicacion_actual,
    //                 "Status": $scope.terminado = {
    //                     "Pendiente": {},
    //                     "Progreso": {},
    //                     "Terminado": $scope.terminado = {
    //                         "resultados": info.Status.Terminado.resultados,
    //                         "duracion": info.Status.Terminado.duracion
    //                     }
    //                 }
    //             }
    //
    //             break;
    //
    //         default:
    //     }
    //
    //     var proyectos = $scope.proyectos;
    //     console.log(proyectos);
    //
    //     Proyectos.editarProyecto($scope.proyectos).then(function(data) {
    //         // $scope.proyectoCreado.push = data;
    //         // $state.go('proyectos');
    //         console.log(data);
    //     })
    // }

    $scope.eliminarProyecto = function(id) {

        var id = $stateParams.id;

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar el proyecto?').textContent('Para eliminar de forma permanente dale en aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Proyectos.eliminar(id).then(function(data) {
                $state.go('proyectos');
            })

        }, function() {});
    }

});
