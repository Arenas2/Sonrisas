var express = require('express');
var routeUbicacion = express.Router();

var x = require("../controllers/controllerUbicacion");

routeUbicacion.route('/data/ubicacion/:id')
        .get(x.read)
        .post(x.create);

routeUbicacion.route('/data/ubicacion/:idubicacion/:idproyectos')
        .post(x.CrearConUbicacion);

routeUbicacion.route('/data/ubicacion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeUbicacion;
