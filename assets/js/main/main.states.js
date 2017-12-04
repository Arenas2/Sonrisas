app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('home', {
		url: '/',
		views: {
			'main': {
				templateUrl: '/main/home',
				controller: 'homeCtrl as ctrl'
			}
		},
        resolve: {
			login: function($window, AuthService, $localStorage, Usuario, Session){
				if($window.location.pathname.length > 10){
					var url = $window.location.pathname;
					var token = url.split('/');
					Usuario.token(token[1]).then(data => {
						Session.create(token[1]);
						$window.location.pathname = '';
					})
				}
			},
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozHome']);
                }
            ]
        }
	})
	.state('home.primero', {
		url: 'primero',
		views: {
			'home': {
				templateUrl: '/main/home/primero'
			}
		},
		resolver: {
			login: function($window, AuthService, $localStorage, Usuario, Session){
				if($window.location.pathname.length > 10){
					var url = $window.location.pathname;
					var token = url.split('/');
					Usuario.token(token[1]).then(data => {
						Session.create(token[1]);
						$window.location.pathname = '';
					})
				}
			}
		}
	})
	.state('home.segundo', {
		url: 'segundo',
		views: {
			'home': {
				templateUrl: '/main/home/segundo'
			}
		}
	})
	.state('home.tercero', {
		url: 'tercero',
		views: {
			'home': {
				templateUrl: '/main/home/tercero'
			}
		}
	})
	.state('loginyregistro', {
		url: '/loginyregistro',
		views: {
			'main': {
				templateUrl: '/main/loginyregistro'
			}
		}
	})
	.state('nosotros', {
		url: '/nosotros',
		views: {
			'main': {
				templateUrl: '/main/nosotros',
				controller: 'nosotrosCtrl as ctrl'
			}
		},
		resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozNosotros']);
                }
            ]
        }
	})
	.state('tyc', {
		url: '/tyc',
		views: {
			'main': {
				templateUrl: '/main/tyc'
			}
		}
	})
	.state('programa', {
		url: '/nosotros/programa',
		params: {
			'campana' : null
		},
		views: {
			'main': {
				templateUrl: '/main/programa',
				controller: 'nosotrosCtrl as ctrl'
			}
		},
		resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozNosotros']);
                }
            ]
        }
	})
	.state('proyectos', {
		url: '/proyectos',
		views: {
			'main': {
				templateUrl: '/proyectos/proyectos',
				controller: 'proyectosCtrl as ctrl'
			}
		},
        resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozProyectos']);
                }
            ]
        }
	})
	.state('proyectos.vista1', {
		url: '/vista1',
		views: {
			'main': {
				templateUrl: '/main/vistas/vista1'
			}
		}
	}).state('proyectos.vista2', {
		url: '/vista2',
		views: {
			'main': {
				templateUrl: '/main/vistas/vista2'
			}
		}
	})
	.state('registro', {
		url: '/registro',
		views: {
			'main': {
				templateUrl: '/main/registro'
			}
		}
	}).state('perfil', {
		url: '/perfil',
		views: {
			'main': {
				templateUrl: '/main/perfil',
				controller: 'perfilCtrl as ctrl'
			}
		},
		resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozPerfil']);
                }
            ]
        }
	}).state('pendiente', {
		url: '/pendiente/:proyecto/:nombre',
		params: {
			'proyecto' : null,
			'nombre' : null
		},
		views: {
			'main': {
				templateUrl: '/proyectos/Pendiente',
				controller: 'proyectosPendientesCtrl as ctrl'
			}
		},
		resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozProyectosPendientes']);
                }
            ]
        }
	}).state('progreso', {
		url: '/progreso/:proyecto/:nombre',
		params: {
			'proyecto' : null,
			'nombre' : null
		},
		views: {
			'main': {
				templateUrl: '/proyectos/Progreso',
				controller: 'proyectosProgresosCtrl as ctrl'
			}
		},
		resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozProyectosProgreso']);
                }
            ]
        }
	}).state('terminado', {
		url: '/terminado/:proyecto/:nombre',
		params: {
			'proyecto' : null,
			'nombre' : null
		},
		views: {
			'main': {
				templateUrl: '/proyectos/Terminado',
				controller: 'proyectosTerminadoCtrl as ctrl'
			}
		},
		resolve: {
            loadMyCtrl: [
                '$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['ozProyectosTerminado']);
                }
            ]
        }
	});


}]);
