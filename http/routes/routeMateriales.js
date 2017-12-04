var express = require('express');
var routeMateriales = express.Router();

var x = require("../controllers/controllerMateriales");

routeMateriales.route('/data/material')
        .get(x.read)
        .post(x.create);

routeMateriales.route('/data/materiales/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeMateriales.route('/data/materialConProyecto/:IdProyecto')
        .get(x.materialProyectos);

module.exports = routeMateriales;
