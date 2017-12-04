var express = require('express');
var routeTerminado = express.Router();

var x = require("../controllers/controllerTerminado");

routeTerminado.route('/data/terminado')
        .get(x.read)
        .post(x.create);

routeTerminado.route('/data/terminado/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeTerminado;