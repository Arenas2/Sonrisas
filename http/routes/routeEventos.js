var express = require('express');
var routeEventos = express.Router();

var x = require("../controllers/controllerEventos");

routeEventos.route('/data/eventos')
        .get(x.read)
        .post(x.create);

routeEventos.route('/data/eventosXproyecto/:id')
        .get(x.eventosXproyecto);

routeEventos.route('/data/eventos/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete)

routeEventos.route('/data/eventosProyectosStatus/:IdProyecto/:IdStatus')
        .get(x.eventosProyectosStatus);

routeEventos.route('/data/eventosusuario/:IdEvento/:IdUsuario')
        .post(x.unir);

module.exports = routeEventos;
