app.config([
    '$ocLazyLoadProvider',
    function($ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: true,
            modules: [
                {
                    name: 'ozHome',
                    files: ['js/main/frags/home.js']
                }, {
                    name: 'ozProyectos',
                    files: ['js/main/frags/proyectos.js']
                }, {
                    name: 'ozAdminProyectos',
                    files: ['js/admin/frags/proyectos.js']
                },{
                   name: 'ozAdminProyecto',
                   files: ['js/admin/frags/proyecto.js']
               }, {
                    name: 'ozNosotros',
                    files: ['js/main/frags/nosotros.js']
                }, {
                    name: 'ozPerfil',
                    files: ['js/main/frags/perfil.js']
                }, {
                    name: 'ozProyectosPendientes',
                    files: ['js/main/frags/proyectosPendientes.js']
                }, {
                    name: 'ozProyectosProgreso',
                    files: ['js/main/frags/proyectosProgreso.js']
                }, {
                    name: 'ozProyectosTerminado',
                    files: ['js/main/frags/proyectosTerminado.js']
                },
                {
                    name: 'ozinfo',
                    files: ['js/admin/frags/partials/info.js']
                },
                {
                    name: 'ozeventos',
                    files: ['js/admin/frags/partials/eventos.js']
                },
                {
                    name: 'ozUbicaciones',
                    files: ['js/admin/frags/partials/ubicaciones.js']
                },
                {
                    name: 'ozMaterias',
                    files: ['js/admin/frags/partials/materiales.js']
                },
                {
                    name: 'ozimagenes',
                    files: ['js/admin/frags/partials/imagenes.js']
                },
				{
                    name: 'ozNuevoproyecto',
                    files: ['js/admin/frags/nuevoproyecto.js']
                }
            ]
        });
    }
]);
