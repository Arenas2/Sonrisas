var app = angular.module('myapp');

app.controller('proyectosProgresosCtrl', function($q, $scope, $state, $stateParams, $localStorage, $mdDialog, ProyectosProgreso, Evento, Imagen, Usuario, Anecdota, Material, Portada, Ubicacion, Facebook) {

    $scope.loaderProyectoProgreso = true;
    if($stateParams.proyecto === null){
        $state.go('proyectos.vista1')
    }else{

        var idproyecto = $stateParams.proyecto;

        var status = 2;

        if($scope.usuario === undefined){

            var token = $localStorage.token;

            Usuario.token(token).then(data => {
                $scope.usuario = data.user;
            })

        }


        $scope.map = {
            center: {
                latitude: 19.1847524,
                longitude: -96.1550328
            },
            zoom: 11
        };

        $scope.markers = [];


        ProyectosProgreso.obtener(idproyecto).then(res => {
            $scope.proyecto = res.data;
            console.log(res);
            $scope.loaderProyectoProgreso = false;
            // _.map(data.data.Ubicacion, ubcacionesft)
            // function ubcacionesft(n) {
            //     $scope.markers.push({latitude: n.latitude, longitude: n.longitude});
            // }

            // data.data.materiales.forEach(material => {
            //     material.recaudado = 0;
            //     let index
            //     material.Usuario.forEach(user => {
            //         index++
            //         material.recaudado = material.recaudado + user.Aportaciones.contribucion;
            //     })
            // })

			// $scope.Eventos = data.Status.Progreso.Eventos;

            return res.data.id
        }).then(id => {

            Portada.obtener(id).then(res => {
                $scope.portada = res.data;
            })

            Ubicacion.obtenerConProyecto(id).then(res => {
                $scope.ubicaciones = res.data;
                return res.data
            }).then(result => {
                _.map(result, function(n) {
                    $scope.markers.push({latitude: n.latitude, longitude: n.longitude});
                })
            })

            Evento.proyecto(id).then(res => {
    	        $scope.eventos = res.data;
    	        console.log($scope.eventos);
    	    })

			Imagen.obtener(id).then(res => {
				$scope.imagenes = res.data;
				console.log(res);
				$scope.$digest();

			})

            Material.obtenerConProyecto(id).then(res  => {
                $scope.materiales = res.data;
            })

            Anecdota.obtener(id).then(res => {
                $scope.anecdotas = res.data;
            })

        })
    }

    $scope.facebook = function(){

        let contenido = 'algo'

        Facebook.crear(contenido, $scope.usuario).then(data => {
            console.log(data);
        })
    }

	$scope.crearAnecdota = function(contenido){

		let anecdota = {
			contenido : contenido,
			id_usuario : $scope.usuario.id,
			id_proyecto : idproyecto
		}

		Anecdota.crear(anecdota).then(data => {
			console.log(data);
		})
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
            controller: DialogController
        }).then(data => {
            obtenerMateriales();
            $scope.$apply();
        });
        function DialogController($scope, $mdDialog, material, usuario) {

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
            controller: DialogController
        }).then(data => {
            obtenerEvento();
            $scope.$apply();
        });
        function DialogController($scope, $mdDialog, evento, usuario) {

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
    }

});
