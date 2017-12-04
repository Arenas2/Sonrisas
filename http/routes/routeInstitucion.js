var express = require('express');
var routeInstitucion = express.Router();

var x = require("../controllers/controllerInstitucion");

routeInstitucion.route('/data/institucion')
        .get(x.read)
        .post(x.create);


routeInstitucion.route('/data/institucion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeInstitucion;