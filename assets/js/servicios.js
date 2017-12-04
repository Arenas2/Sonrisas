app.service('Proyectos', function($http, alertas) {
    //this.crear              = function(data) { return axios.post('/data/CrearProyecto', data) }
	this.crear              = function(proyecto) { return axios.post('/data/proyectos', proyecto) }

    this.one                = function(id) { return axios('/data/proyectos/' + id) }
    this.obtener            = function() { return axios('/data/proyectos') }
    this.obtenerTodosLite   = function() { return axios('/data/proyectosLite')}
    this.obtenerOne         = function(id) { return axios('/data/ProyectoStatus/' + id)}
    this.eliminar           = function(id) { return axios.delete('/data/proyectos/' + id)}
    this.editarProyecto     = function(proyectos) { return axios.put('/data/proyectos/' + proyectos.id, proyectos)}
    this.filtro             = function(peticion) { return axios.post('/data/proyectos/filtro/' + 1, peticion)}
});

app.service('ProyectosPendientes', function($http, alertas, $q) {
    this.obtener = function(id) { return axios('/data/proyecto/pendiente/' + id) }
});

app.service('ProyectosProgreso', function($http, alertas, $q) {
    this.obtener = function(id) { return axios('/data/proyecto/progreso/' + id) }
});

app.service('ProyectosTerminado', function($http, alertas, $q) {
    this.obtener = function(id) { return axios('/data/proyecto/terminado/' + id) }
});

app.service('Imagen', function($http, alertas, $q) {

    this.crear = function(imagen) { return axios.post('data/imagenes', imagen) }
    // - this.crear = function(ruta, status, imagen) { return axios.post('data/' + ruta + '/' + status, imagen) }
    this.obtener = function(id) { return axios('/data/imagenXproyecto/' + id) }
    this.one = function(id) { return axios('/data/imagenes/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/imagenes/' + id) }
    this.obtenerStatus = function(proyecto, status) { return axios('data/imagenesProyectosStatus/' + proyecto + '/' + status) }
    this.portadaBorrar = function(id, imagen) { return axios.post('/data/portada/' + id, imagen) }
    this.portadaCrear = function(imagen) { return axios.post('/data/portada', imagen) }
	this.obtenerPortada = function(id) { return axios('/data/portada/' + id) }

});

app.service('Portada', function($http, alertas, $q) {
    this.portadaBorrar = function(id, imagen) { return axios.post('/data/portada/' + id, imagen) }
    this.portadaCrear = function(imagen) { return axios.post('/data/portada', imagen) }
    this.obtener = function(id) { return axios('/data/portada/' + id) }

});

app.service('Campana', function($http, alertas, $q) {
    this.unir = function(campana, proyecto) { return axios.post('/data/campanas/' + campana + '/' + proyecto) }
    this.crear = function(data, callback) { return axios.post('/data/campanas', data) }
    this.editar = function(campana) { return axios.put('/data/campanas/' + campana.id, campana) }
    this.obtenerOne = function(id) { return axios('/data/campanas/' + id) }
    this.eliminar = function(id) { return axios.delete('/data/campanas/' + id) }
    this.obtenerCampana = function(id) { return axios('/data/campanas') }
});

app.service('Evento', function($http, alertas, $q) {

    this.obtener = function(campana, proyecto) { return axios('/data/eventos') }
    this.crear = function(evento) { return axios.post('/data/eventos', evento) }
    this.obtenerStatus = function(proyecto, status) { return axios('data/eventosProyectosStatus/' + proyecto + '/' + status) }
    this.obtenerOne = function(id) { return axios('/data/eventos/' + id) }
    this.editar = function(evento) { return axios.put('/data/eventos/' + evento.id, evento) }
    this.unir = function(evento, usuario) { return axios.post('/data/eventosusuario/' + evento + '/' + usuario) }
    this.proyecto = function(id) { return axios('/data/eventosXproyecto/' + id) }

});

app.service('Area', function($http, alertas, $q) {
    this.obtenerLite = function() { return axios('/data/areasLite') }
    this.obtener = function() { return axios('/data/areas') }
    this.unir = function(area, proyecto) { return axios.post('/data/areas/' + area + '/' + proyecto) }
    this.eliminar = function(id) { return axios.delete('/data/areas/' + id) }

});

app.service('Ubicacion', function($http, alertas, $q) {
    this.crear = function(ubicacion, id) { return axios.post('/data/ubicacion/' + id, ubicacion) }
    this.obtenerOne = function(id) { return axios('/data/ubicacion/' + id) }
    this.unir = function(ubicacion, proyecto) { return axios.post('/data/ubicacion/' + ubicacion + '/' + proyecto) }
    this.editar = function(ubicacion) { return axios.put('/data/ubicacion/' + ubicacion.id, ubicacion) }
    this.eliminar = function(id) { return axios.delete('/data/ubicacion/' + id) }
    this.obtenerConProyecto = function(proyecto) { return axios('/data/proyectoUbicacion/' + proyecto) }
    this.obtener = function(proyecto) { return axios('/data/ubicacion') }
});

app.service('Material', function($http, alertas, $q) {
    this.crear = function(data) { return axios.post('/data/material', data) }
    this.obtener  = function() { return axios('/data/material') }
    this.obtenerConProyecto = function(proyecto) { return axios('data/materialConProyecto/' + proyecto) }
    this.editar = function(material) { return axios.put('/data/materiales/' + material.id, material) }
});

app.service('Aportaciones', function($http, alertas, $q) {
    this.unir = function(data) { return axios.post('/data/aportaciones/', data) }
});

app.service('Anecdota', function($http, alertas, $q) {
    this.obtener = function(id) { return axios('/data/anecdotaproyecto/' + id) }
    this.crear = function(id) { return axios.post('/data/anecdota/', anecdota) }
});

app.service('Facebook', function($http, alertas, $q) {
    this.crear = function(contenido, usuario) { FB.api('/113124472034820', function(response) { console.log(response);}); }
});
