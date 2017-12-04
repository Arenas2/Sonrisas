var express = require('express');
var routeAportaciones = express.Router();

var x = require("../controllers/controllerAportaciones");

routeAportaciones.route('/data/aportaciones')
        .get(x.read)
        .post(x.create);

routeAportaciones.route('/data/aportaciones/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeAportaciones;
