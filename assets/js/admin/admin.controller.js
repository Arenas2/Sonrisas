app.controller('adminCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $stateParams, $mdSidenav, alertas, $state, Area, Campana, Proyectos, Imagen, Material, Ubicacion) {


    $scope.secciones = [
        {
            nombre: 'home',
            href: 'home',
            icon: 'home'
        }, {
            nombre: 'Proyectos',
            href: 'proyectos',
            icon: 'work'
        }, {
            nombre: 'Areas',
            href: 'areas',
            icon: 'folder'
        }, {
            nombre: 'Programas',
            href: 'campanas',
            icon: 'folder'
        }
    ]

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.proyecto = {}
    $scope.pendiente = {}
    $scope.progreso = {}
    $scope.terminado = {}

    $scope.IngresarProyecto = function() {
        console.log($scope.proyecto.status_actual)
        switch ($scope.proyecto.status_actual) {
            case 1:
                $scope.proyectos = {
                    "nombre": $scope.proyecto.nombre,
                    "descripcion": $scope.proyecto.descripcion,
                    "status_actual": $scope.proyecto.status_actual,
                    "campana_actual": $scope.proyecto.Id_campana,
                    "area_actual": $scope.proyecto.Id_area,
                    "id_campanas": $scope.proyecto.Id_campana,
                    "Status": $scope.pendientes = {
                        "Pendiente": $scope.pendientes = {
                            "objetivos": $scope.pendiente.objetivo,
                            "tareas": $scope.pendiente.tareas
                        },
                        "Progreso": {},
                        "Terminado": {}
                    }
                }

                break;
            case 2:
                $scope.proyectos = {
                    "nombre": $scope.proyecto.nombre,
                    "descripcion": $scope.proyecto.descripcion,
                    "status_actual": $scope.proyecto.status_actual,
                    "campana_actual": $scope.proyecto.Id_campana,
                    "area_actual": $scope.proyecto.Id_area,
                    "id_campanas": $scope.proyecto.Id_campana,
                    "Status": $scope.progreso = {
                        "Pendiente": {},
                        "Progreso": $scope.progreso = {
                            "reportes_avance": $scope.progreso.avances,
                            "fechas_avance": $scope.progreso.fechas
                        },
                        "Terminado": {}
                    }
                }

                break;
            case 3:
                $scope.proyectos = {
                    "nombre": $scope.proyecto.nombre,
                    "descripcion": $scope.proyecto.descripcion,
                    "status_actual": $scope.proyecto.status_actual,
                    "campana_actual": $scope.proyecto.Id_campana,
                    "area_actual": $scope.proyecto.Id_area,
                    "id_campanas": $scope.proyecto.Id_campana,
                    "Status": $scope.terminado = {
                        "Pendiente": {},
                        "Progreso": {},
                        "Terminado": $scope.terminado = {
                            "resultados": $scope.terminado.resultados,
                            "duracion": $scope.terminado.duracion
                        }
                    }
                }

                break;

            default:
        }

        var proyectos = $scope.proyectos;
        console.log(proyectos);

        Proyectos.crear(proyectos).then(function(data) {
            $scope.proyectoCreado = data;
            Area.unir($scope.proyectoCreado.area_actual, $scope.proyectoCreado.id).then(function(data) {
                console.log(data);
            })
            //$state.go('paso2', {'idProyecto': data.id});
            $state.go('proyectos')
        })
    };


    $scope.AbrirEvento = function() {
        $scope.formularioEvento = true;
    }
    $scope.CerrarEvento = function() {
        $scope.formularioEvento = false;
    }
    $scope.eventos = [];
    $scope.AgregarEvento = function(evento, proyectoCreado) { //AGREGA UN EVENTO A UN PROYECTO YA CREADO

        console.log(proyectoCreado);

        switch (proyectoCreado.status_actual) {
            case 1:
                evento.id_pendiente = proyectoCreado.id;

                break;
            case 2:
                evento.id_progreso = proyectoCreado.id;

                break;
            case 3:
                evento.id_terminado = proyectoCreado.id;

                break;
        }

        console.log(evento);

        $http.post('/data/eventos', evento).success(function(data) {
            $scope.eventos.push(data);
            console.log(data);
            alertas.mostrarToastEstandar("evento creado");
            $scope.nuevoevento = {};
            $scope.formularioEvento = false;
        }).error(function(err) {
            console.log(err)
            alertas.mostrarToastEstandar("No se pudo crear el evento");
        })

    }

    $scope.Abrir = function() {
        $scope.formularioMaterial = true;
    }
    $scope.Cerrar = function() {
        $scope.formularioMaterial = false;
    }

    $scope.materiales = [];

    $scope.AgregarMaterial = function(material, proyectoCreado) {
        console.log(proyectoCreado.id);
        console.log(material);
        material.id_proyecto = proyectoCreado.id;
        Material.crear(material).then(function(data) {
            $scope.formularioMaterial = false;
            $scope.materiales.push(data);
            console.log(data);
        })

    }

    $scope.AbrirUbicacion = function() {
        $scope.formularioUbicacion = true;
    }
    $scope.CerrarUbicacion = function() {
        $scope.formularioUbicacion = false;
    }

    $scope.ubicaciones = [];

    $scope.nuevaUbicacion = function(ubicacion) {
        var ubicaciones = {
            nombre: ubicacion.nombre,
            latitud: ubicacion.latitud,
            altitud: ubicacion.altitud,
            direccion: ubicacion.direccion,
            apertura: ubicacion.apertura,
            cierre: ubicacion.cierre
        }

        console.log(ubicaciones);

        Ubicacion.crear(ubicaciones).then(function(data) {
            $scope.ubicaciones.push(data);
            console.log(data);

            Ubicacion.unir(data.id, $scope.proyectoCreado.id).then(function(data) {
                console.log(data);
            })
            $scope.formularioUbicacion = false;

        })

    }

    $scope.CampanaDialog = function(ev) {
        mdDialog.mostrardialog('nuevacampana', 'adminCtrl', $scope.customFullscreen, ev);
    };
    $scope.obtenerCampanas = function() {

        Campana.obtenerCampana().then(function(data) {
            $scope.campanas = data.data;
            $scope.$digest();
            console.log(data);
        })
    }

    $scope.obtenerDatos = function() {

        Campana.obtenerCampana().then(function(data) {
            $scope.campanas = data.data;
            console.log(data);
        })

        Area.obtener().then(function(data) {
            $scope.areas = data.data;
            console.log(data);
        })
    }

    $scope.campanas = []
    $scope.areas = []

    $scope.nuevaCampana = function(campana) { //<-AQUI SE VA A AGREGAR LA NUEVA CAMPAÑA

        let imagen = 'data:image/png;base64, ' + campana.foto.base64;

        var campanas = {
            nombre: campana.nombre,
            descripcion: campana.descripcion,
            logo: imagen,
            fecha: campana.fecha
        }

        console.log(campanas);
        Campana.crear(campanas).then(function(data) {
            console.log(data);
            alertas.mostrarToastEstandar("Nuevo Programa Creado");
            $scope.campanas.push(data.data.nombre);
            $scope.$digest();

        })

    }

    $scope.eliminarCampana = function(id, $index) {

        var idCampana = $stateParams.idCampana;

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar el programa?').textContent('Para eliminar de forma permanente dale click en Aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Campana.eliminar(idCampana).then(function(data) {
                $scope.campanas.splice($index, 1)
                $scope.$digest();
                $state.go('campanas');
            })

        }, function() {});
    }

    $scope.eliminarArea = function(id) {

        var idArea = $stateParams.idArea;

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar el Area?').textContent('Para eliminar de forma permanente dale click en Aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Area.eliminar(idArea).then(function(data) {
                $state.go('areas');
            })

        }, function() {});
    }

    $scope.AreaDialog = function(ev) {
        mdDialog.mostrardialog('nuevaarea', 'adminCtrl', $scope.customFullscreen, ev);
    };

    $scope.Obtenerareas = function() {
        $http.get('/data/areas').success(function(data) {
            $scope.areas = data;
            console.log($scope.areas)
        }).error(function(err) {
            console.log(err)
        })
    }

    $scope.area = []

    $scope.nuevaArea = function() {
        console.log($scope.area)

        $http.post('/data/areas', {nombre: $scope.area.nombre}).success(function(data) {
            alertas.mostrarToastEstandar("Nueva Area Creada");
            $scope.area.push($scope.nombre)
            console.log($scope.area)
        }).error(function(err) {
            console.log(err)
        })

    }

    $scope.imagenes = [];

    $scope.agregarGrid = function(foto, proyectoCreado) {

        console.log(proyectoCreado)

        switch (proyectoCreado.status_actual) {
            case 1:
                var IdStatus = proyectoCreado.Status.Pendiente.id;
                var ruta = 'imagenesconpendiente';
                break;
            case 2:
                var IdStatus = proyectoCreado.Status.Progreso.id;
                var ruta = 'imagenesconprogreso';
                break;
            case 3:
                var IdStatus = proyectoCreado.Status.Terminado.id;
                var ruta = 'imagenesconterminado';
                break;
            default:
        }

        var imagen = 'data:image/png;base64,' + foto.base64;

        Imagen.crear(ruta, IdStatus, imagen).then(function(data) {

            $scope.imagenes.push(data.imagen);
            $scope.idImagen = data;

        })

    }

    $scope.quitarGrid = function(index, idImagen) {

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar la imagen?').textContent('Para eliminar una imagen dale en aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            var id = idImagen.id;
            console.log(id);

            Imagen.eliminar(id).then(function(data) {
                console.log(data);
            })

        }, function() {});

    }

    $scope.Dropify = function() {

        $('.dropify').dropify({
            messages: {
                default: 'Agregar',
                replace: 'Reemplazar',
                remove: 'Eliminar',
                error: 'Error'
            }
        });

        $('.dropify').on('change', function() {

            var input = this;
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    // bind new Image to Component
                    $scope.$apply(function() {
                        $scope.inputImage = e.target.result;
                    });
                }

                reader.readAsDataURL(input.files[0]);
            }
        });

    };

    $scope.campana,
    $scope.area = []

    $scope.editarArea = function(areas) {
        var id = areas.id;
        $http.put('/data/areas/' + id, areas).success(function(data) {
            $scope.area.push({nombre: areas.nombre})
            console.log($scope.area);
            $state.go('areas');

        }).error(function(err) {
            console.log(err)
        })
    }

    $scope.editarCampana = function(data) {

        console.log(data);
        Campana.editar(data).then(function(data) {
            alertas.mostrarToastEstandar("Programa Editado Correctamente");
            console.log(data);
            $scope.campanas.push(data.nombre);
            $scope.$digest();
        })

        $state.go('campanas');

    }

});
