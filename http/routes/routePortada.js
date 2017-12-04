var express = require('express');
var routePortada = express.Router();

var x = require("../controllers/controllerPortadas");

routePortada.route('/data/portada')
        .get(x.read)
        .post(x.create);

routePortada.route('/data/portada/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routePortada;
