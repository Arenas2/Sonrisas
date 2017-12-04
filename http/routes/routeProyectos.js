var express = require('express');
var routeProyectos = express.Router();

var x = require("../controllers/controllerProyectos");

routeProyectos.route('/data/proyectos')
        .get(x.read)
        .post(x.create);

routeProyectos.route('/data/CrearProyecto')
        .post(x.CrearConStatus);

routeProyectos.route('/data/proyectosLite')
		.get(x.proyectosLite);

routeProyectos.route('/data/ProyectosCampana/:id')
        .get(x.ProyectoCampana);

routeProyectos.route('/data/ProyectoStatus/:id')
        .get(x.Proyecto);

routeProyectos.route('/data/proyectos/filtro/:idstatus')
        .post(x.filtro);

routeProyectos.route('/data/proyectos/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeProyectos.route('/data/proyecto/pendiente/:id')
        .get(x.pendiente);

routeProyectos.route('/data/proyecto/progreso/:id')
        .get(x.progreso);

routeProyectos.route('/data/proyecto/terminado/:id')
        .get(x.terminado);

routeProyectos.route('/data/proyectoUbicacion/:id')
        .get(x.proyectosConUbicaciones);

module.exports = routeProyectos;
