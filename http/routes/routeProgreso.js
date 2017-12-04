var express = require('express');
var routeProgreso = express.Router();

var x = require("../controllers/controllerProgreso");

routeProgreso.route('/data/progreso')
        .get(x.read)
        .post(x.create);

routeProgreso.route('/data/progreso/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeProgreso;