var app = angular.module('myapp');

app.controller('proyectosPendientesCtrl', function($interval, $scope, $state, $stateParams, $rootScope, $http, $mdDialog, $localStorage, ProyectosPendientes, Evento, Imagen, Aportaciones, Material, Usuario, Anecdota, Portada, Ubicacion) {

    var self = this;


    if ($stateParams.proyecto === null) {

        $state.go('proyectos.vista1')

    } else {

        var id = $stateParams.proyecto;

        var status = 1;
        if ($scope.usuario === undefined) {
            var token = $localStorage.token;
            Usuario.token(token).then(data => {
                $scope.usuario = data.user;
            })
            console.log('obtuve el usuario');
        }

        $scope.map = {
            center: {
                latitude: 19.1847524,
                longitude: -96.1550328
            },
            zoom: 11
        };

        $scope.markers = [];

        ProyectosPendientes.obtener(id).then(res =>  {


            $scope.proyecto = res.data;
            $scope.loaderProyectoPendiente = false;
            $scope.$digest()


			// data.materiales.forEach(material => {
            //     material.recaudado = 0;
			// 	let index
            //     material.Usuario.forEach(user => {
            //         index++
            //         material.recaudado = material.recaudado + user.Aportaciones.contribucion;
            //     })
            // })

            return res.data.id

        }).then(id => {

            console.log(id)

            Portada.obtener(id).then(res => {
                $scope.portada = res.data;
                console.log(res.data)
            })

            Imagen.obtener(id).then(res => {
                $scope.imagenes = res.data;
                console.log(res);
                $scope.$digest();

            })

            Ubicacion.obtenerConProyecto(id).then(res => {
                $scope.ubicaciones = res.data;
                return res.data
            }).then(result => {
                _.map(result, function(n) {
                    $scope.markers.push({latitude: n.latitude, longitude: n.longitude});
                })
            })


            obtenerMateriales()
            obtenerEventos()

        })
    }

    function obtenerMateriales() {
        let proyecto = $stateParams.proyecto;
        Material.obtenerConProyecto(proyecto).then(res => {
            $scope.materiales = res.data;
        })
    }

    function obtenerEventos() {
		Evento.proyecto(id).then(res => {
	        $scope.eventos = res.data;
	        console.log($scope.eventos);
	    })
        // Evento.obtenerStatus(id, status).then(res => {
        //     $scope.eventos = res.data;
        //     console.log(res)
        // })
    }

    $scope.donarMateriales = function(material, ev) {
        $mdDialog.show({
            templateUrl: '/partials/materiales',
            parent: angular.element(document.body),
            locals: {
                material: material,
                usuario: $scope.usuario
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: $scope.customFullscreen,
            controller: function($scope, $mdDialog, material, usuario) {

                $scope.material = material;
                $scope.usuario = usuario;
                // console.log($scope.usuario);
                // console.log($scope.material);

                $scope.unir = function(cantidad) {
                    union = {
                        id_materiales: material.id,
                        id_usuario: usuario.id,
                        contribucion: cantidad
                    }

                    let proyecto = $stateParams.proyecto;
                    Aportaciones.unir(union).then(data => {
                        let status = true;
                        $mdDialog.hide(status);
                    });
                }

                $scope.close = function() {
                    let status = false;
                    $mdDialog.hide(status);
                }
            }
        }).then(data => {
            obtenerMateriales();
            $scope.$apply();
        });

    }

    $scope.inscribirseEvento = function(evento, ev) {

        $mdDialog.show({
            templateUrl: '/partials/evento',
            parent: angular.element(document.body),
            locals: {
                evento: evento,
                usuario: $scope.usuario
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: $scope.customFullscreen,
            controller: function($scope, $mdDialog, evento, usuario) {

                $scope.evento = evento;
                $scope.usuario = usuario;

                $scope.unir = function() {

                    Evento.unir(evento.id, usuario.id).then(data => {
                        let status = true;
                        $mdDialog.hide(status);
                    });
                }

                $scope.close = function() {
                    let status = false;
                    $mdDialog.hide(status);
                }
            }
        }).then(data => {
            obtenerEvento();
            $scope.$apply();
        });

    }

});
