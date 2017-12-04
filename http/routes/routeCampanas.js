var express = require('express');
var routeCampanas = express.Router();

var x = require("../controllers/controllerCampanas");

routeCampanas.route('/data/campanas')
        .get(x.read)
        .post(x.create);

routeCampanas.route('/data/campanasAll')
		.get(x.campanasAll);

routeCampanas.route('/data/campanas/:idcampanas/:idproyectos')
        .post(x.CrearConCampana);

routeCampanas.route('/data/campanas/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeCampanas;
